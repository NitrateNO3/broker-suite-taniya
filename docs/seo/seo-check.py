"""Crawl a BrokrSuite build and fail on SEO regressions. Read-only.

Usage: python3 -I docs/seo/seo-check.py http://localhost:3000
"""
import json, re, sys, urllib.error, urllib.request
from collections import Counter
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

BASE = sys.argv[1].rstrip('/')
CANON_HOST = 'https://www.brokrsuite.in'
# Claims the site must not make until verified in the app (see docs/seo/REPORT.md).
FORBIDDEN = [r'multi-?tenant', r'role-based', r'watermark', r'attendance', r'bank-grade', r'enterprise',
             r'free trial', r'free subscription', r'\bimport(ing)?\b', r'web dashboard', r'\bAI\b',
             r'artificial intelligence', r'most popular']


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''; self.meta = {}; self.canonical = None; self.links = []; self.h1 = 0
        self.ld = []; self.text = []; self._in = None; self._skip = 0; self._buf = ''; self.imgs = []

    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag in ('script', 'style'):
            self._skip += 1
            if a.get('type') == 'application/ld+json':
                self._in = 'ld'; self._buf = ''
        elif tag == 'title':
            self._in = 'title'
        elif tag == 'meta' and (a.get('name') or a.get('property')):
            self.meta.setdefault(a.get('name') or a.get('property'), []).append(a.get('content', ''))
        elif tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = a.get('href')
        elif tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        elif tag == 'h1':
            self.h1 += 1
        elif tag == 'img':
            self.imgs.append((a.get('src'), a.get('alt')))

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self._skip -= 1
            if self._in == 'ld':
                self.ld.append(self._buf); self._in = None
        elif tag == 'title':
            self._in = None

    def handle_data(self, d):
        if self._in == 'title':
            self.title += d
        elif self._in == 'ld':
            self._buf += d
        elif not self._skip:
            self.text.append(d)


def fetch(url):
    try:
        r = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'seo-check'}))
        return r.status, r.read().decode('utf-8', 'replace')
    except urllib.error.HTTPError as e:
        return e.code, ''


problems, pages, inbound = [], {}, Counter()
queue, seen = ['/'], set()
while queue:
    path = queue.pop(0)
    if path in seen:
        continue
    seen.add(path)
    code, html = fetch(BASE + path)
    if code != 200:
        problems.append(f'{path}: HTTP {code}')
        continue
    p = Page(); p.feed(html)
    pages[path] = p
    for href in p.links:
        u = urlparse(urljoin(BASE + path, href))
        if u.netloc == urlparse(BASE).netloc and u.scheme.startswith('http'):
            target = u.path or '/'
            if target != path:
                inbound[target] += 1
            if target not in seen:
                queue.append(target)

print(f'{"page":46} {"title":>5} {"desc":>4} {"words":>5} {"in":>3}  schema')
for path, p in sorted(pages.items()):
    desc = (p.meta.get('description') or [''])[0]
    words = len(' '.join(p.text).split())
    types = []
    for raw in p.ld:
        try:
            types.append(json.loads(raw).get('@type'))
        except json.JSONDecodeError:
            problems.append(f'{path}: invalid JSON-LD')
    print(f'{path:46} {len(p.title):>5} {len(desc):>4} {words:>5} {inbound[path]:>3}  {",".join(types)}')
    if not 15 <= len(p.title) <= 65: problems.append(f'{path}: title length {len(p.title)}')
    if not 70 <= len(desc) <= 170: problems.append(f'{path}: description length {len(desc)}')
    if p.h1 != 1: problems.append(f'{path}: {p.h1} <h1>')
    if p.canonical != CANON_HOST + path: problems.append(f'{path}: canonical {p.canonical}')
    if len(p.meta.get('robots', [])) > 1: problems.append(f'{path}: {len(p.meta["robots"])} robots tags')
    if types.count('FAQPage') > 1: problems.append(f'{path}: multiple FAQPage blocks')
    if inbound[path] == 0 and path != '/': problems.append(f'{path}: orphan (no inbound links)')
    for src, alt in p.imgs:
        if alt is None: problems.append(f'{path}: img {src} has no alt')
    visible = ' '.join(p.text)
    for pat in FORBIDDEN:
        for m in re.finditer(pat, visible, re.I):
            if path in ('/privacy/', '/delete-account/'):  # legal copy mirrors the app verbatim
                continue
            problems.append(f'{path}: forbidden claim "{m.group(0)}" … {visible[max(0, m.start()-40):m.end()+40]!r}')

for field, label in ((lambda p: p.title, 'title'), (lambda p: (p.meta.get('description') or [''])[0], 'description')):
    for value, n in Counter(field(p) for p in pages.values()).items():
        if n > 1: problems.append(f'duplicate {label} on {n} pages: {value!r}')

code, xml = fetch(BASE + '/sitemap.xml')
in_sitemap = {u.replace(CANON_HOST, '') for u in re.findall(r'<loc>([^<]+)</loc>', xml)}
for path in sorted(in_sitemap - set(pages)): problems.append(f'sitemap lists uncrawled {path}')
for path in sorted(set(pages) - in_sitemap): problems.append(f'crawled page missing from sitemap: {path}')

print(f'\n{len(pages)} pages crawled, {len(in_sitemap)} in sitemap')
print('\n'.join(['PROBLEMS:'] + problems) if problems else 'No problems found.')
sys.exit(1 if problems else 0)

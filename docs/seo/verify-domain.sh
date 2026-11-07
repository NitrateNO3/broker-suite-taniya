#!/usr/bin/env bash
# Read-only checks for the brokrsuite.in domain fix. Changes nothing.
# Usage: bash docs/seo/verify-domain.sh
set -u
WWW=https://www.brokrsuite.in
fail=0

check() { # url expected_code [expected_location]
  local out code loc
  out=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$1")
  code=${out%% *}; loc=${out#* }
  if [[ "$code" == "$2" && ( -z "${3:-}" || "$loc" == "$3" ) ]]; then
    printf 'PASS  %-45s %s %s\n' "$1" "$code" "$loc"
  else
    printf 'FAIL  %-45s got %s %s (want %s %s)\n' "$1" "$code" "$loc" "$2" "${3:-}"; fail=1
  fi
}

echo '== Apex and http must 301/308 straight to https://www.brokrsuite.in/'
# Vercel always upgrades http -> https on the same host first, so the http apex
# is two permanent hops; check that it lands on www rather than its first hop.
out=$(curl -sL -o /dev/null -w '%{http_code} %{url_effective} %{num_redirects}' http://brokrsuite.in/)
case "$out" in
  "200 $WWW/ "[12]) printf 'PASS  %-45s %s\n' http://brokrsuite.in/ "$out (final, hops)" ;;
  *) printf 'FAIL  %-45s %s\n' http://brokrsuite.in/ "$out"; fail=1 ;;
esac
for u in https://brokrsuite.in/ http://www.brokrsuite.in/; do
  out=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$u")
  case "$out" in
    "301 $WWW/"|"308 $WWW/") printf 'PASS  %-45s %s\n' "$u" "$out" ;;
    *) printf 'FAIL  %-45s %s\n' "$u" "$out"; fail=1 ;;
  esac
done
check https://brokrsuite.in/features/ 308 "$WWW/features/"

echo '== Public pages on www must return 200'
for p in / /features/ /how-it-works/ /pricing/ /book-a-demo/ /about/ /help/ /privacy/ /delete-account/ /blog/ \
  /real-estate-broker-crm/ /real-estate-lead-management/ /property-inventory-management/ \
  /real-estate-agency-software/ /real-estate-sales-management/ /real-estate-crm-app/ /robots.txt /sitemap.xml; do
  check "$WWW$p" 200
done

echo '== Retired trial page must 308 to the demo page'
check "$WWW/free-trial/" 308 "$WWW/book-a-demo/"

echo '== Unknown URL must return 404'
check "$WWW/this-page-does-not-exist/" 404

echo '== Canonical and sitemap must use www'
curl -s "$WWW/" | grep -o '<link rel="canonical" href="[^"]*"' | head -1
curl -s "$WWW/sitemap.xml" | grep -o '<loc>[^<]*' | head -2
curl -s "$WWW/robots.txt" | grep -i sitemap

exit $fail

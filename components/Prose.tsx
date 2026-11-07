import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Block } from '@/config/blog';

/** Renders `[label](/path)` links and `**bold**` inside a text run. */
function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      const href = match[2];
      parts.push(
        href.startsWith('/') ? (
          <Link key={match.index} href={href}>
            {match[1]}
          </Link>
        ) : (
          <a key={match.index} href={href} target="_blank" rel="noopener noreferrer">
            {match[1]}
          </a>
        ),
      );
    } else {
      parts.push(<strong key={match.index}>{match[3]}</strong>);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

/** Blog article body, styled with the site's existing prose typography. */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="legal-prose article-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={i}>{block.text}</h2>;
          case 'h3':
            return <h3 key={i}>{block.text}</h3>;
          case 'p':
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case 'ul':
          case 'ol': {
            const List = block.type;
            return (
              <List key={i}>
                {block.items.map((item) => (
                  <li key={item}>
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
        }
      })}
    </div>
  );
}

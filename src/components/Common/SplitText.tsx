import React from 'react';
import { cn } from '../../utils/cn';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  charClassName?: string;
  mode?: 'words' | 'chars';
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  wordClassName,
  charClassName,
  mode = 'chars',
}) => {
  const words = text.split(' ');

  return (
    <span className={cn('inline-block', className)}>
      {words.map((word, wordIdx) => {
        if (mode === 'words') {
          return (
            <span
              key={wordIdx}
              className={cn(
                'inline-block overflow-hidden vertical-align-bottom mr-[0.25em]',
                wordClassName
              )}
            >
              <span className="inline-block split-word will-change-transform">
                {word}
              </span>
            </span>
          );
        }

        // Chars mode
        const chars = Array.from(word);
        return (
          <span
            key={wordIdx}
            className={cn('inline-block whitespace-nowrap mr-[0.25em]', wordClassName)}
          >
            {chars.map((char, charIdx) => (
              <span
                key={charIdx}
                className="inline-block overflow-hidden vertical-align-bottom"
              >
                <span
                  className={cn(
                    'inline-block split-char will-change-transform translate-y-full opacity-0',
                    charClassName
                  )}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
};

export default SplitText;

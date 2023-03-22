// components/TextWithCode.tsx
import React from 'react';

type Props = {
  text: string;
};

const parseText = (text: string) => {
  const codeBlockRegex = /```([\s\S]*?)```/g;
  const parsedText = [];

  let match;
  let lastIndex = 0;

  while ((match = codeBlockRegex.exec(text))) {
    const code = match[1];
    const textBeforeCode = text.slice(lastIndex, match.index);
    lastIndex = codeBlockRegex.lastIndex;

    if (textBeforeCode.trim()) {
      parsedText.push({ type: 'text', content: textBeforeCode.trim() });
    }

    if (code?.trim()) {
      parsedText.push({ type: 'code', content: code.trim() });
    }
  }

  const textAfterLastCode = text.slice(lastIndex);
  if (textAfterLastCode.trim()) {
    parsedText.push({ type: 'text', content: textAfterLastCode.trim() });
  }

  return parsedText;
};

export const TextWithCode: React.FC<Props> = ({ text }) => {
  const parsedText = parseText(text);

  return (
    <div>
      {parsedText.map((item, index) =>
        item.type === 'text' ? (
          <p key={index}>{item.content}</p>
        ) : (
          <pre key={index} className="text-black bg-gray-200 text-shadow text-xs font-mono whitespace-pre-wrap break-words no-hyphens leading-5 tab-size-4 p-4 my-2 overflow-auto">
            <code>{item.content}</code>
          </pre>
        )
      )}
    </div>
  );
};

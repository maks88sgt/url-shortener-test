import { useState } from 'react';

interface ShortUrlResultProps {
  shortUrl: string | null;
}

export function ShortUrlResult({ shortUrl }: ShortUrlResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!shortUrl) return null;

  return (
    <div className="mt-4 p-4 bg-zinc-800 rounded flex items-center justify-between max-w-md mx-auto">
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline truncate max-w-[80%]"
      >
        {shortUrl}
      </a>
      <button
        onClick={handleCopy}
        className="ml-4 p-2 rounded bg-zinc-700 hover:bg-zinc-600 transition"
        aria-label="Копировать ссылку"
      >
        {copied ? (
          <span className="text-green-400 font-semibold">Скопировано!</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

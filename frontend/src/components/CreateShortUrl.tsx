import { useState } from "react";
import { useCreateShortUrlMutation } from "../api/shortUrlApi";
import { ShortUrlResult } from "./ShortUrlResult";

export function CreateShortUrl() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [createShortUrl] = useCreateShortUrlMutation();

  const handleCreate = async () => {
    try {
      const response = await createShortUrl({ originalUrl, alias }).unwrap();
      setShortUrl(response.shortUrl);
    } catch (err) {
      // TODO: improve error ghandlers and typing
      //@ts-ignore
      if (err?.data?.message === "Alias already in use") {
        alert("Такой алиас уже используется");
        return;
      }
      alert("Ошибка при создании ссылки");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-zinc-900 rounded-lg shadow-lg mt-8 px-4">
      <h1 className="text-2xl font-bold text-white text-center">
        Сократить ссылку
      </h1>
      <input
        type="url"
        className="border p-3 w-full rounded bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Введите ссылку"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <input
        className="border p-3 w-full rounded bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Alias (необязательно)"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleCreate}
        disabled={!originalUrl.trim()}
      >
        Сократить
      </button>
      <ShortUrlResult shortUrl={shortUrl} />
    </div>
  );
}

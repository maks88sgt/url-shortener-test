import { useState } from 'react';
import { useCreateShortUrlMutation, useDeleteShortUrlMutation } from '../api/shortUrlApi';
import { ShortUrlResult } from '../components/ShortUrlResult';

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [alias, setAlias] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const [createShortUrl] = useCreateShortUrlMutation();
  const [deleteShortUrl] = useDeleteShortUrlMutation();

  const handleCreate = async () => {
    try {
      const response = await createShortUrl({ originalUrl, alias }).unwrap();
      setShortUrl(response.shortUrl);
    } catch (err) {
      alert('Ошибка при создании ссылки');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteShortUrl(alias).unwrap();
      alert('Ссылка удалена');
      setShortUrl(null);
      setAlias('');
      setOriginalUrl('');
    } catch (err) {
      alert('Ошибка при удалении ссылки');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4 bg-zinc-900 rounded-lg shadow-lg mt-8 px-4">
      <h1 className="text-2xl font-bold text-white text-center">Сократить ссылку</h1>
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
      <div className="flex gap-4 justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold"
          onClick={handleCreate}
        >
          Сократить
        </button>
        <button
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition font-semibold"
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
      <ShortUrlResult shortUrl={shortUrl} />
    </div>
  );
}

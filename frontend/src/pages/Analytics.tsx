import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import { useGetAnalyticsQuery, useDeleteShortUrlMutation } from '../api/shortUrlApi';
import { extractAlias } from '../lib/utils';

export default function Analytics() {
  const [inputValue, setInputValue] = useState('');
  const alias = extractAlias(inputValue) ?? '';

  const { data, isLoading, error, refetch } = useGetAnalyticsQuery(alias, {
    skip: !alias,
  });

  const [deleteShortUrl, { isLoading: isDeleting, error: deleteError }] = useDeleteShortUrlMutation();

  const handleDelete = async () => {
    if (!alias) return;

    if (!confirm(`Удалить ссылку с alias "${alias}"? Это действие необратимо.`)) return;

    try {
      await deleteShortUrl(alias).unwrap();
      alert('Ссылка успешно удалена.');
      setInputValue('');
      window.location.reload();
    } catch (err) {
      alert('Ошибка при удалении ссылки.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-zinc-900 rounded-lg shadow-lg mt-8 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-white text-center">
        Аналитика
      </h1>

      <input
        type="text"
        className="block w-full p-3 mb-6 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Введите короткий alias или полный URL"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {isLoading && <p className="text-gray-400 text-center mb-4">Загрузка...</p>}
      {error && (
        <p className="text-red-500 text-center mb-4">
          Ошибка при получении данных
        </p>
      )}

      {data && (
        <>
          <div className="bg-zinc-800 p-4 rounded shadow mb-6 text-white">
            <p>
              <strong>Оригинальная ссылка:</strong> {data.originalUrl}
            </p>
            <p>
              <strong>Всего переходов:</strong> {data.totalClicks}
            </p>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white disabled:opacity-50 transition"
            >
              {isDeleting ? 'Удаление...' : 'Удалить ссылку'}
            </button>
            {deleteError && (
              <p className="mt-2 text-red-500">Ошибка при удалении ссылки.</p>
            )}
          </div>

          {data.dailyClicks && data.dailyClicks.length > 0 && (
            <div className="h-64 mb-6 bg-zinc-800 p-4 rounded shadow">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyClicks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis allowDecimals={false} stroke="#ccc" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '0.375rem' }}
                    labelStyle={{ color: '#93c5fd' }}
                    itemStyle={{ color: '#bfdbfe' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {data.last5Clicks && data.last5Clicks.length > 0 && (
            <div className="bg-zinc-800 rounded shadow p-4 text-white">
              <h2 className="text-lg font-semibold mb-4">Последние 5 переходов:</h2>
              <ul className="space-y-2 text-sm">
                {data.last5Clicks.map((click, index) => (
                  <li key={index} className="flex justify-between border-b border-zinc-700 pb-2">
                    <span className="font-medium">{click.ipAddress}</span>
                    <span className="text-zinc-400">
                      {new Date(click.clickedAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

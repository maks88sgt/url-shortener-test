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
import { useGetAnalyticsQuery } from '../api/shortUrlApi';

export default function Analytics() {
  const [shortUrl, setShortUrl] = useState('');
  const { data, isLoading, error } = useGetAnalyticsQuery(shortUrl, {
    skip: !shortUrl,
  });

  return (
    <div className="p-6 max-w-3xl mx-auto bg-zinc-900 rounded-lg shadow-lg mt-8 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-white text-center">
        Аналитика
      </h1>

      <input
        type="text"
        className="block w-full p-3 mb-6 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Введите короткий alias"
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
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

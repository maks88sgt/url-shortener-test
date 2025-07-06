import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { useState } from 'react'
import { useGetAnalyticsQuery } from '../api/shortUrlApi'

export default function Analytics() {
  const [shortUrl, setShortUrl] = useState('')
  const { data, isLoading, error } = useGetAnalyticsQuery(shortUrl, {
    skip: !shortUrl,
  })

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Аналитика</h1>

      <input
        className="border p-2 w-full"
        placeholder="Введите короткий alias"
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
      />

      {isLoading && <p className="text-gray-500">Загрузка...</p>}
      {error && <p className="text-red-500">Ошибка при получении данных</p>}

      {data && (
        <>
          <div className="bg-gray-100 p-4 rounded shadow space-y-2">
            <p>
              <strong>Оригинальная ссылка:</strong>{' '}
              <a href={data.originalUrl} className="text-blue-600 underline" target="_blank">
                {data.originalUrl}
              </a>
            </p>
            <p>
              <strong>Всего переходов:</strong> {data.totalClicks}
            </p>
          </div>

          {data.dailyClicks && data.dailyClicks.length > 0 && (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.dailyClicks}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  )
}

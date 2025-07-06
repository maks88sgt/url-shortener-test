import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"
import { useState } from "react"
import { BarChart3, ExternalLink, TrendingUp, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useGetAnalyticsQuery } from "../api/shortUrlApi"

export default function Analytics() {
  const [shortUrl, setShortUrl] = useState("")
  const { data, isLoading, error } = useGetAnalyticsQuery(shortUrl, {
    skip: !shortUrl,
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Аналитика
          </h1>
          <p className="text-gray-600">Отслеживайте статистику переходов по вашим ссылкам</p>
        </div>

        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">Поиск статистики</CardTitle>
            <CardDescription>Введите короткий псевдоним для просмотра аналитики</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="short-url" className="text-sm font-medium">
                  Короткий псевдоним
                </Label>
                <Input
                  id="short-url"
                  placeholder="my-alias"
                  value={shortUrl}
                  onChange={(e) => setShortUrl(e.target.value)}
                  className="h-12 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2 py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
                <span className="text-gray-600">Загрузка данных...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="shadow-lg border-0 bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <Eye className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-red-600 font-medium">Ошибка при получении данных</p>
                <p className="text-red-500 text-sm mt-1">Проверьте правильность введённого псевдонима</p>
              </div>
            </CardContent>
          </Card>
        )}

        {data && (
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-purple-600" />
                  <span>Информация о ссылке</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">Оригинальная ссылка</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={data.originalUrl} readOnly className="flex-1 bg-gray-50" />
                    <Button asChild size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <a href={data.originalUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Всего переходов</p>
                      <p className="text-2xl font-bold text-purple-600">{data.totalClicks}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Активная ссылка
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {data.dailyClicks && data.dailyClicks.length > 0 && (
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span>График переходов по дням</span>
                  </CardTitle>
                  <CardDescription>Статистика кликов за последние дни</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.dailyClicks}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                        <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="url(#gradient)"
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, fill: "#7c3aed" }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

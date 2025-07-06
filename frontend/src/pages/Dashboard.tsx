import { useState } from "react"
import { LinkIcon, Scissors, Trash2, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useCreateShortUrlMutation, useDeleteShortUrlMutation } from "../api/shortUrlApi"

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState("")
  const [alias, setAlias] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [createShortUrl, { isLoading: isCreating }] = useCreateShortUrlMutation()
  const [deleteShortUrl, { isLoading: isDeleting }] = useDeleteShortUrlMutation()
  const { toast } = useToast()

  const handleCreate = async () => {
    try {
      const response = await createShortUrl({ originalUrl, alias }).unwrap()
      setShortUrl(response.shortUrl)
      toast({
        title: "Успешно!",
        description: "Ссылка успешно сокращена",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать ссылку",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    try {
      await deleteShortUrl(alias)
      setShortUrl("")
      toast({
        title: "Удалено",
        description: "Ссылка успешно удалена",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить ссылку",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    toast({
      title: "Скопировано!",
      description: "Ссылка скопирована в буфер обмена",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Сократить ссылку
          </h1>
          <p className="text-gray-600">Превратите длинные ссылки в короткие и красивые</p>
        </div>

        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl">Создать короткую ссылку</CardTitle>
            <CardDescription>Введите ссылку и получите её сокращённую версию</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="original-url" className="text-sm font-medium">
                Оригинальная ссылка
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="original-url"
                  placeholder="https://example.com/very-long-url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alias" className="text-sm font-medium">
                Псевдоним (необязательно)
              </Label>
              <Input
                id="alias"
                placeholder="my-custom-alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="h-12 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCreate}
                disabled={!originalUrl || isCreating}
                className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
              >
                {isCreating ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Создание...</span>
                  </div>
                ) : (
                  <>
                    <Scissors className="mr-2 h-4 w-4" />
                    Сократить
                  </>
                )}
              </Button>

              <Button
                onClick={handleDelete}
                disabled={!alias || isDeleting}
                variant="outline"
                className="h-12 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 bg-transparent"
              >
                {isDeleting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            {shortUrl && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Готово!</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input value={shortUrl} readOnly className="flex-1 bg-white border-green-200" />
                    <Button onClick={copyToClipboard} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

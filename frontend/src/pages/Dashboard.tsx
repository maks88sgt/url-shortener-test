import { useCreateShortUrlMutation, useDeleteShortUrlMutation } from '../api/shortUrlApi'
import { useState } from 'react'

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [createShortUrl] = useCreateShortUrlMutation()
  const [deleteShortUrl] = useDeleteShortUrlMutation()

  const handleCreate = async () => {
    if (!originalUrl.trim()) {
      alert('Пожалуйста, введите ссылку')
      return
    }
    try {
      const response = await createShortUrl({ originalUrl, alias }).unwrap()
      alert(`Сокращенная ссылка: ${response.shortUrl}`)
      setOriginalUrl('')
      setAlias('')
    } catch (error) {
      alert('Ошибка при создании ссылки')
    }
  }

  const handleDelete = async () => {
    if (!alias.trim()) {
      alert('Пожалуйста, введите alias для удаления')
      return
    }
    try {
      await deleteShortUrl(alias)
      alert('Ссылка удалена')
      setAlias('')
    } catch (error) {
      alert('Ошибка при удалении ссылки')
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-zinc-900 rounded-lg shadow-lg mt-8 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-white text-center">
        Сократить ссылку
      </h1>
      <input
        type="url"
        className="block w-full p-3 mb-4 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Введите ссылку"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <input
        className="block w-full p-3 mb-6 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Alias (необязательно)"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleCreate}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-md font-semibold shadow-md"
        >
          Сократить
        </button>
        <button
          onClick={handleDelete}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-3 rounded-md font-semibold shadow-md"
        >
          Удалить
        </button>
      </div>
    </div>
  )
}
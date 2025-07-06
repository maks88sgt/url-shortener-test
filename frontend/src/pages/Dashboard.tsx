import { useCreateShortUrlMutation, useDeleteShortUrlMutation } from '../api/shortUrlApi'
import { useState } from 'react'

export default function Dashboard() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [createShortUrl] = useCreateShortUrlMutation()
  const [deleteShortUrl] = useDeleteShortUrlMutation()

  const handleCreate = async () => {
    const response = await createShortUrl({ originalUrl, alias }).unwrap()
    alert(`Сокращенная ссылка: ${response.shortUrl}`)
  }

  const handleDelete = async () => {
    await deleteShortUrl(alias)
    alert('Ссылка удалена')
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Сократить ссылку</h1>
      <input
        className="border p-2 w-full"
        placeholder="Введите ссылку"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Alias (необязательно)"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreate}>
        Сократить
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
        Удалить
      </button>
    </div>
  )
}

import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-zinc-900 text-white px-8 py-4 flex justify-center gap-10 border-b border-zinc-700 shadow-md">
      <Link
        to="/"
        className={`transition-colors duration-300 hover:text-blue-400 ${
          pathname === '/' ? 'font-semibold text-blue-500 underline' : 'font-medium'
        }`}
      >
        Создать ссылку
      </Link>
      <Link
        to="/analytics"
        className={`transition-colors duration-300 hover:text-blue-400 ${
          pathname === '/analytics' ? 'font-semibold text-blue-500 underline' : 'font-medium'
        }`}
      >
        Аналитика
      </Link>
    </nav>
  )
}

import { Link, useLocation } from "react-router-dom"
import { BarChart3, LinkIcon, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <LinkIcon className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LinkCute
            </span>
          </div>

          <div className="flex items-center space-x-1 rounded-full bg-gray-100 p-1">
            <Link
              to="/"
              className={cn(
                "flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                pathname === "/" ? "bg-white text-purple-600 shadow-sm" : "text-gray-600 hover:text-purple-600",
              )}
            >
              <Sparkles className="h-4 w-4" />
              <span>Создать ссылку</span>
            </Link>
            <Link
              to="/analytics"
              className={cn(
                "flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                pathname === "/analytics"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-600 hover:text-purple-600",
              )}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Аналитика</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

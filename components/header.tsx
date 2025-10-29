"use client"

import { useEffect, useState } from "react"
import { Search, Grid3x3, FolderOpen, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [user, setUser] = useState<any>(null)

  // 🔹 Получить данные текущего юзера
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me")
        setUser(res.data.user)
      } catch {
        // не залогинен — ничего страшного
      }
    }
    fetchUser()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Grid3x3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">3D Models Atym</span>
          </Link>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search 3D models..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
  <Button asChild variant="ghost" size="sm">
    <Link href="/explore">
      <FolderOpen className="mr-2 h-4 w-4" /> Explore
    </Link>
  </Button>

  <Button asChild variant="ghost" size="sm">
    <Link href="/categories">Categories</Link>
  </Button>

  <Button asChild variant="default" size="sm">
    <Link href="/upload">
      <Upload className="mr-2 h-4 w-4" /> Upload
    </Link>
  </Button>

  {user ? (
    <Button asChild variant="ghost" size="sm" className="flex items-center gap-2">
      <Link href="/profile">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-6 h-6 rounded-full"
        />
        <span>{user.username}</span>
      </Link>
    </Button>
  ) : (
    <Button asChild variant="default" size="sm">
      <Link href="/auth/login">Войти</Link>
    </Button>
  )}
</nav>
        </div>
      </div>
    </header>
  )
}
"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FolderOpen, AlertCircle } from "lucide-react"

interface Category {
  id: number
  name: string
  description?: string
  modelCount?: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories")
        setCategories(res.data.categories || [])
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err)
        setError("Не удалось загрузить категории. Попробуйте позже.")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="p-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FolderOpen className="h-6 w-6" />
        Категории моделей
      </h1>

      {categories.length === 0 ? (
        <p className="text-muted-foreground">Категорий пока нет 😕</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {category.description || "Без описания"}
                </p>
                {category.modelCount !== undefined && (
                  <p className="text-xs mt-2 text-muted-foreground">
                    Моделей: {category.modelCount}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
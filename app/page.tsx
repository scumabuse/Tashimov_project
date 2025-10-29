"use client"

import api from "@/lib/api"
import { useEffect, useState, useMemo } from "react"
import { Header } from "@/components/header"
import { ModelsGrid } from "@/components/models-grid"
// ❌ Удалим mockModels, потому что теперь модели приходят с бэкенда
// import { mockModels } from "@/lib/mock-data"

export default function HomePage() {
  // 🔹 Поиск
  const [searchQuery, setSearchQuery] = useState("")

  // 🔹 Модели из бэкенда
  const [models, setModels] = useState<any[]>([])

  // 🔹 Загружаем модели при открытии страницы
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await api.get("/models")
        setModels(res.data.models)
      } catch (err) {
        console.error("Ошибка загрузки моделей", err)
      }
    }

    fetchModels()
  }, [])

  // 🔹 Фильтрация по поиску
  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) {
      return models
    }

    const query = searchQuery.toLowerCase()
    return models.filter(
      (model) =>
        model.title?.toLowerCase().includes(query) ||
        model.author?.username?.toLowerCase().includes(query)
    )
  }, [searchQuery, models])

  // 🔹 Отображение
  return (
    <div className="min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">
            Discover Amazing 3D Models
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse thousands of high-quality 3D printable models
          </p>
        </div>

        {/* 🔹 Если хочешь просто проверить без ModelsGrid */}
        {/* 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredModels.map((m) => (
            <div key={m._id} className="bg-white p-4 rounded shadow">
              <img
                src={m.previewUrls?.[0]}
                alt={m.title}
                className="rounded-lg mb-2 object-cover w-full h-48"
              />
              <h3 className="font-semibold">{m.title}</h3>
              <p className="text-sm text-gray-500">{m.author?.username}</p>
            </div>
          ))}
        </div>
        */}

        {/* 🔹 Если хочешь использовать уже существующий компонент */}
        <ModelsGrid models={filteredModels} />
      </main>
    </div>
  )
}
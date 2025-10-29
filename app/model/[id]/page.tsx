"use client"

import api from "@/lib/api"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Download, Share2, Calendar, User, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ModelCard } from "@/components/model-card"

export default function ModelPage() {
  // 🔹 Получаем ID модели из URL
  const { id } = useParams()

  // 🔹 Состояния
  const [model, setModel] = useState<any>(null)
  const [similarModels, setSimilarModels] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // 🔹 Получаем данные модели
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await api.get(`/models/${id}`)
        setModel(res.data.model)
      } catch (err) {
        console.error("Ошибка загрузки модели:", err)
      }
    }
    fetchModel()
  }, [id])

  // 🔹 Получаем похожие модели
  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await api.get("/models")
        const all = res.data.models
        if (model) {
          const similar = all
            .filter((m: any) => m._id !== model._id && m.tags.some((t: string) => model.tags.includes(t)))
            .slice(0, 4)
          setSimilarModels(similar)
        }
      } catch (err) {
        console.error("Ошибка загрузки похожих моделей:", err)
      }
    }

    if (model) fetchSimilar()
  }, [model])

  if (!model) {
    return (
      <div className="min-h-screen">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Загрузка модели...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        {/* 🔹 Кнопка назад */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к галерее
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 🔹 Превью модели */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <Image
              src={model.previewUrls?.[0] || "/placeholder.svg"}
              alt={model.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 🔹 Инфо о модели */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-3 text-balance">{model.title}</h1>

              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{model.author?.username || "Неизвестный автор"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(model.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {model.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 🔹 Статистика */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{model.likes || 0}</p>
                      <p className="text-sm text-muted-foreground">Лайки</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{model.downloads || 0}</p>
                      <p className="text-sm text-muted-foreground">Скачивания</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 🔹 Кнопки действий */}
            <div className="flex gap-3 mb-6">
              <Button size="lg" className="flex-1" onClick={() => window.open(model.fileUrl)}>
                <Download className="mr-2 h-5 w-5" />
                Скачать
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="mr-2 h-5 w-5" />
                Лайк
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* 🔹 Описание */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">{model.description || "Нет описания"}</p>
            </div>
          </div>
        </div>

        {/* 🔹 Похожие модели */}
        {similarModels.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Похожие модели</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarModels.map((similarModel) => (
                <ModelCard key={similarModel._id} model={similarModel} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
"use client"

import { Heart, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import type { Model3D } from "@/lib/mock-data"
import api from "@/lib/api" // 🔹 Добавлено

interface ModelCardProps {
  model: Model3D
}

export function ModelCard({ model }: ModelCardProps) {
  // 🔹 Функция лайка
  const toggleLike = async (id: string) => {
    try {
      const res = await api.post(`/likes/${id}/toggle`)
      console.log(res.data.liked ? "Liked" : "Unliked")
    } catch (err) {
      console.error("Ошибка лайка", err)
    }
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <Link href={`/model/${model.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={model.image || "/placeholder.svg"}
            alt={model.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{model.name}</h3>
          {/* 🔹 Кнопка лайка */}
          <button
            onClick={() => toggleLike(model.id)}
            className="flex items-center gap-1 text-red-500 hover:scale-110 transition-transform"
          >
            <Heart className="h-4 w-4" />
            <span>{model.likes.toLocaleString()}</span>
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-3">by {model.author}</p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{model.downloads.toLocaleString()}</span>
          </div>
          <div className="flex gap-1">
            {model.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
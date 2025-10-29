"use client"

import { Heart, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import type { Model3D } from "@/lib/mock-data"

interface ModelCardProps {
  model: Model3D
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <Link href={`/model/${model.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={model.image || "/placeholder.svg"}
            alt={model.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur">
              <Heart className="mr-1 h-3 w-3" />
              {model.likes.toLocaleString()}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 text-balance">{model.name}</h3>
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
    </Link>
  )
}

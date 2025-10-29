"use client"

import { use } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Download, Share2, Calendar, User, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { mockModels } from "@/lib/mock-data"
import { ModelCard } from "@/components/model-card"
import { useState } from "react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ModelPage({ params }: PageProps) {
  const { id } = use(params)
  const [searchQuery, setSearchQuery] = useState("")

  const model = mockModels.find((m) => m.id === id)

  if (!model) {
    return (
      <div className="min-h-screen">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Model not found</p>
        </main>
      </div>
    )
  }

  const similarModels = mockModels
    .filter((m) => m.id !== id && m.tags.some((tag) => model.tags.includes(tag)))
    .slice(0, 4)

  return (
    <div className="min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gallery
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Model Preview */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <Image src={model.image || "/placeholder.svg"} alt={model.name} fill className="object-cover" priority />
          </div>

          {/* Model Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-3 text-balance">{model.name}</h1>

              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{model.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(model.publishedDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {model.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{model.likes.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Likes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{model.downloads.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Downloads</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button size="lg" className="flex-1">
                <Download className="mr-2 h-5 w-5" />
                Download
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="mr-2 h-5 w-5" />
                Like
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{model.description}</p>
            </div>
          </div>
        </div>

        {/* Similar Models */}
        {similarModels.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Models</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarModels.map((similarModel) => (
                <ModelCard key={similarModel.id} model={similarModel} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

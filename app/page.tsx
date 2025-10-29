"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { ModelsGrid } from "@/components/models-grid"
import { mockModels } from "@/lib/mock-data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockModels
    }

    const query = searchQuery.toLowerCase()
    return mockModels.filter(
      (model) =>
        model.name.toLowerCase().includes(query) ||
        model.author.toLowerCase().includes(query) ||
        model.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }, [searchQuery])

  return (
    <div className="min-h-screen">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">Discover Amazing 3D Models</h1>
          <p className="text-muted-foreground text-lg">Browse thousands of high-quality 3D printable models</p>
        </div>

        <ModelsGrid models={filteredModels} />
      </main>
    </div>
  )
}

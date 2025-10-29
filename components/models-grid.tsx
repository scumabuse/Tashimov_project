"use client"

import { ModelCard } from "@/components/model-card"
import type { Model3D } from "@/lib/mock-data"

interface ModelsGridProps {
  models: Model3D[]
}

export function ModelsGrid({ models }: ModelsGridProps) {
  if (models.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-xl text-muted-foreground mb-2">No models found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search query</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  )
}

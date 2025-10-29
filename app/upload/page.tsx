"use client"

import { useState } from "react"
import api from "@/lib/api"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function UploadPage() {
  // 🔹 Состояния формы
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [modelFile, setModelFile] = useState<File | null>(null)
  const [previewImages, setPreviewImages] = useState<File[]>([])

  // 🔹 Загрузка модели
  const handleUpload = async (e: any) => {
    e.preventDefault()

    if (!title || !modelFile) {
      alert("Введите название и выберите файл модели!")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("file", modelFile)
    previewImages.forEach((img) => formData.append("previews", img))

    try {
      const res = await api.post("/models", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      alert("Модель успешно загружена!")
      window.location.href = `/models/${res.data.model._id}`
    } catch (err) {
      console.error(err)
      alert("Ошибка загрузки модели!")
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Загрузка 3D модели</h1>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            {/* 🔹 Форма */}
            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <Label htmlFor="title">Название модели</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите название"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите вашу модель"
                />
              </div>

              <div>
                <Label htmlFor="category">Категория</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Например: архитектура, персонажи, техника..."
                />
              </div>

              <div>
                <Label htmlFor="modelFile">Файл модели (.obj, .fbx, .glb)</Label>
                <Input
                  id="modelFile"
                  type="file"
                  accept=".obj,.fbx,.glb,.gltf,.zip"
                  onChange={(e) => setModelFile(e.target.files?.[0] || null)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="preview">Превью (до 3 изображений)</Label>
                <Input
                  id="preview"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setPreviewImages(Array.from(e.target.files || []))}
                />
              </div>

              {/* 🔹 Превьюшки перед загрузкой */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {previewImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={URL.createObjectURL(img)}
                      alt={`preview-${idx}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              <Button type="submit" className="w-full">
                Загрузить модель
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
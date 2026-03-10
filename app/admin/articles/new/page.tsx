"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"
import { uploadArticleImage } from "@/lib/supabase/storage"

export default function NewArticlePage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    category: "General",
    read_time: 5,
    image: "",
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const adminSession = document.cookie.includes("admin_session=true")
    if (!adminSession) {
      router.push("/admin/login")
    }
  }, [router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      setError("")
      const imageUrl = await uploadArticleImage(file)
      setFormData({ ...formData, image: imageUrl })
      setImagePreview(imageUrl)
    } catch (err) {
      setError("Failed to upload image. Please try again.")
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.title || !formData.content || !formData.author) {
      setError("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create article")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/articles")
      }, 1000)
    } catch (err) {
      setError("Failed to create article. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!document.cookie.includes("admin_session=true")) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Create New Article</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
            <p className="text-green-700">Article created successfully! Redirecting...</p>
          </div>
        )}

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input placeholder="Article title" value={formData.title} onChange={handleTitleChange} required />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Slug</label>
              <Input placeholder="auto-generated-slug" value={formData.slug} readOnly disabled />
              <p className="text-xs text-muted-foreground mt-1">Auto-generated from title</p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Excerpt</label>
              <Input
                placeholder="Short summary of the article"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Article content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-48"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Author name"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Life Path</option>
                <option>Angel Numbers</option>
                <option>Destiny</option>
                <option>Relationships</option>
                <option>Master Numbers</option>
                <option>Career</option>
                <option>General</option>
              </select>
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Read Time (minutes)</label>
              <Input
                type="number"
                placeholder="5"
                value={formData.read_time}
                onChange={(e) => setFormData({ ...formData, read_time: Number.parseInt(e.target.value) || 5 })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Article Image</label>
              <div className="space-y-3">
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Upload className="text-muted-foreground mb-2" size={24} />
                    <span className="text-sm text-muted-foreground">
                      {uploading ? "Uploading..." : "Click to upload image or drag and drop"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Article"}
              </Button>
              <Link href="/admin/articles">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

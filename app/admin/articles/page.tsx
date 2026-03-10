"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, Plus, Edit, Trash2, Search } from "lucide-react"

interface Article {
  id: string
  title: string
  slug: string
  category: string
  author: string
  created_at: string
  read_time: number
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const adminSession = document.cookie.includes("admin_session=true")
    if (!adminSession) {
      router.push("/admin/login")
    }
    fetchArticles()
  }, [router])

  async function fetchArticles() {
    try {
      setLoading(true)
      const response = await fetch("/api/articles")
      if (!response.ok) throw new Error("Failed to fetch articles")
      const data = await response.json()
      setArticles(data || [])
    } catch (err) {
      setError("Failed to load articles")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function deleteArticle(id: string) {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      setDeleting(id)
      const response = await fetch(`/api/articles/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      setArticles(articles.filter((a) => a.id !== id))
    } catch (err) {
      setError("Failed to delete article")
      console.error(err)
    } finally {
      setDeleting(null)
    }
  }

  const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))

  if (!document.cookie.includes("admin_session=true")) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Manage Articles</h1>
          <Link href="/admin/articles/new">
            <Button className="gap-2">
              <Plus size={20} />
              Create Article
            </Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        {/* Articles Table */}
        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading articles...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No articles found. Create your first article!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Created</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{article.title}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{article.category}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{article.author}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(article.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/articles/edit/${article.id}`}>
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              <Edit size={16} />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteArticle(article.id)}
                            disabled={deleting === article.id}
                            className="gap-2"
                          >
                            <Trash2 size={16} />
                            {deleting === article.id ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/admin/dashboard">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

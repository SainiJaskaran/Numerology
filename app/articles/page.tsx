"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Calendar, User } from "lucide-react"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  author: string
  created_at: string
  category: string
  read_time: number
  image: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [categories, setCategories] = useState<string[]>(["All"])

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles")
        if (!response.ok) throw new Error("Failed to fetch articles")
        const data = await response.json()
        setArticles(data || [])

        const uniqueCategories = Array.from(new Set(data.map((a: Article) => a.category)))
        setCategories(["All", ...(uniqueCategories as string[])])
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
                Numerology Articles & Insights
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our collection of articles exploring the mysteries of numbers and their profound impact on your
                life.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-3.5 text-muted-foreground" size={20} />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-base rounded-full border-primary/20"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-foreground hover:bg-secondary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">Loading articles...</p>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.slug}`}>
                    <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-secondary">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col h-full">
                        <div className="mb-3">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {article.category}
                          </span>
                        </div>

                        <h3 className="font-heading text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>

                        {/* Meta */}
                        <div className="space-y-2 border-t border-border pt-4">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <User size={14} />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              <span>{new Date(article.created_at).toLocaleDateString()}</span>
                            </div>
                            <span>{article.read_time} min read</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

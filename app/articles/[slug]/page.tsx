import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { Calendar, User, Clock, ArrowLeft } from "lucide-react"
// import { createServerClient } from "@/lib/supabase/server"

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  created_at: string
  category: string
  read_time: number
  image: string
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let article: Article | null = null
  let error: string | null = null

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/articles?slug=eq.${slug}&select=*`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      error = "Failed to load article"
    } else {
      const data = await response.json()
      if (data && data.length > 0) {
        article = data[0] as Article
      }
    }
  } catch (err) {
    error = "Failed to load article"
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="pt-32 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">{error || "Sorry, this article doesn't exist."}</p>
            <Link href="/articles">
              <Button>Back to Articles</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="pt-20 min-h-screen">
        {/* Hero Section with Overlay Title */}
        <div className="relative h-96 w-full overflow-hidden bg-secondary">
          {/* Background Image */}
          <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
          {/* Dark overlay and title positioning */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

          {/* Title Overlay */}
          <div className="absolute inset-0 flex items-end p-8">
            <div className="max-w-3xl w-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-accent bg-accent/80 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{article.title}</h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-16 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link href="/articles" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
              <ArrowLeft size={16} />
              <span>Back to Articles</span>
            </Link>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-b border-border pb-6 mb-8">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{article.read_time} min read</span>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-invert max-w-none">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-primary/10 border border-primary/20 rounded-xl text-center">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                Ready to Discover Your Numerology?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Schedule a personalized consultation to explore how numerology can guide your journey.
              </p>
              <Link href="/appointment">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

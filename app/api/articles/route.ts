import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("[v0] Missing Supabase environment variables")
      return Response.json({ error: "Database configuration missing" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Supabase error:", error)
      throw error
    }

    console.log("[v0] Fetched articles:", data?.length)
    return Response.json(data || [])
  } catch (error) {
    console.error("[v0] Error fetching articles:", error)
    return Response.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return Response.json({ error: "Database configuration missing" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const body = await request.json()

    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          title: body.title,
          slug: body.slug,
          excerpt: body.excerpt,
          content: body.content,
          author: body.author,
          category: body.category,
          read_time: body.read_time,
          image: body.image,
        },
      ])
      .select()

    if (error) throw error

    return Response.json(data?.[0] || {}, { status: 201 })
  } catch (error) {
    console.error("Error creating article:", error)
    return Response.json({ error: "Failed to create article" }, { status: 500 })
  }
}

import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const { data, error } = await supabase.from("articles").select("*").eq("id", id).single()

    if (error) throw error

    return Response.json(data)
  } catch (error) {
    console.error("Error fetching article:", error)
    return Response.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from("articles")
      .update({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        author: body.author,
        category: body.category,
        read_time: body.read_time,
        image: body.image,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) throw error

    return Response.json(data?.[0] || {})
  } catch (error) {
    console.error("Error updating article:", error)
    return Response.json({ error: "Failed to update article" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const { error } = await supabase.from("articles").delete().eq("id", id)

    if (error) throw error

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error deleting article:", error)
    return Response.json({ error: "Failed to delete article" }, { status: 500 })
  }
}

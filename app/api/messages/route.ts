import { createServiceRoleClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServiceRoleClient()

    const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return Response.json({ error: "Failed to fetch messages" }, { status: 500 })
    }

    return Response.json(data || [])
  } catch (error) {
    console.error("API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log("[v0] Received form data:", { name, email, subject, message })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("[v0] Missing required fields")
      return Response.json({ error: "All fields are required" }, { status: 400 })
    }

    console.log("[v0] Creating Supabase client...")
    const supabase = createServiceRoleClient()
    console.log("[v0] Supabase client created successfully")

    // Insert message into database
    console.log("[v0] Inserting message into database...")
    const { error } = await supabase.from("messages").insert([
      {
        name,
        email,
        subject,
        message,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("[v0] Supabase error:", error)
      return Response.json({ error: `Failed to save message: ${error.message}` }, { status: 500 })
    }

    console.log("[v0] Message saved successfully")
    return Response.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("[v0] API error:", error)
    const errorMessage = error?.message || String(error)
    return Response.json({ error: `Internal server error: ${errorMessage}` }, { status: 500 })
  }
}

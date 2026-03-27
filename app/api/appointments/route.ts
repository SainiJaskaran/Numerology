import { createClient } from "@supabase/supabase-js"

const ADMIN_EMAIL = "js9815286568@gmail.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, birthDate, service, date, time } = body

    console.log("[v0] Appointment submission received:", { fullName, email, service })

    // Validate required fields
    if (!fullName || !email || !phone || !birthDate || !service || !date || !time) {
      return Response.json({ error: "All fields are required" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[v0] Missing Supabase configuration")
      return Response.json({ error: "Database configuration missing" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert appointment into database
    console.log("[v0] Inserting appointment into database...")
    const { data, error } = await supabase.from("appointments").insert([
      {
        full_name: fullName,
        email: email,
        phone: phone,
        birth_date: birthDate,
        service: service,
        consultation_date: date,
        consultation_time: time,
      },
    ])

    if (error) {
      console.error("[v0] Supabase error:", error)
      return Response.json({ error: `Failed to save appointment: ${error.message}` }, { status: 500 })
    }

    console.log("[v0] Appointment saved successfully")

    return Response.json(
      { success: true, message: "Appointment booked successfully" },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("[v0] API error:", error)
    return Response.json({ error: `Internal server error: ${error.message}` }, { status: 500 })
  }
}

// GET endpoint to fetch appointments (optionally filtered by date)
export async function GET(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return Response.json({ error: "Database configuration missing" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")

    let query = supabase
      .from("appointments")
      .select("*")
      .order("consultation_date", { ascending: true })

    if (date) {
      query = query.eq("consultation_date", date)
    }

    const { data, error } = await query

    if (error) {
      console.error("[v0] Error fetching appointments:", error)
      return Response.json({ error: "Failed to fetch appointments" }, { status: 500 })
    }

    console.log("[v0] Fetched appointments:", data?.length)
    return Response.json(data || [])
  } catch (error) {
    console.error("[v0] API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

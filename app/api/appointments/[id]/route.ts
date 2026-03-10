import { createClient } from "@supabase/supabase-js"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const appointmentId = params.id

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return Response.json({ error: "Database configuration missing" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log("[v0] Deleting appointment:", appointmentId)
    const { error } = await supabase.from("appointments").delete().eq("id", appointmentId)

    if (error) {
      console.error("[v0] Error deleting appointment:", error)
      return Response.json({ error: "Failed to delete appointment" }, { status: 500 })
    }

    console.log("[v0] Appointment deleted successfully")
    return Response.json({ success: true })
  } catch (error) {
    console.error("[v0] API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

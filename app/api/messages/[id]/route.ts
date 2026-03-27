import { createServiceRoleClient } from "@/lib/supabase/server"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = createServiceRoleClient()

    const { error } = await supabase.from("messages").delete().eq("id", id)

    if (error) {
      console.error("Error deleting message:", error)
      return Response.json({ error: "Failed to delete message" }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

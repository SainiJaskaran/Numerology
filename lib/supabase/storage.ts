import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadArticleImage(file: File): Promise<string> {
  try {
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
    const { data, error } = await supabase.storage.from("articles").upload(`images/${fileName}`, file)

    if (error) throw error

    const { data: publicUrl } = supabase.storage.from("articles").getPublicUrl(`images/${fileName}`)

    return publicUrl.publicUrl
  } catch (error) {
    console.error("Image upload error:", error)
    throw error
  }
}

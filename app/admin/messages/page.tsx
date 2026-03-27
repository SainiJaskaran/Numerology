"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, Mail, Trash2, Search, MessageSquare, ArrowLeft } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const adminSession = document.cookie.includes("admin_access=granted")
    if (!adminSession) {
      router.push("/admin/login")
      return
    }
    setIsAuthenticated(true)
    fetchMessages()
  }, [router])

  async function fetchMessages() {
    try {
      setLoading(true)
      const response = await fetch("/api/messages")
      if (!response.ok) throw new Error("Failed to fetch messages")
      const data = await response.json()
      setMessages(data || [])
    } catch (err) {
      setError("Failed to load messages")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      setDeleting(id)
      const response = await fetch(`/api/messages/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      setMessages(messages.filter((m) => m.id !== id))
    } catch (err) {
      setError("Failed to delete message")
      console.error(err)
    } finally {
      setDeleting(null)
    }
  }

  function replyViaGmail(email: string, subject: string, name: string) {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(`Re: ${subject}`)}&body=${encodeURIComponent(`Hi ${name},\n\n`)}`
    window.open(gmailUrl, "_blank")
  }

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/admin/dashboard">
          <Button variant="outline" size="sm" className="mb-4 gap-2 bg-transparent">
            <ArrowLeft size={16} /> Back to Dashboard
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground mt-2">View and manage all messages sent by users</p>
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
              placeholder="Search messages by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading messages...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto mb-4 text-muted-foreground" size={48} />
              <p className="text-muted-foreground">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <Card key={msg.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{msg.subject}</h3>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">New</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      <p className="font-medium text-foreground">{msg.name}</p>
                      <a href={`mailto:${msg.email}`} className="text-primary hover:underline">
                        {msg.email}
                      </a>
                    </div>
                    <p className="text-foreground mb-4 whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent"
                      onClick={() => replyViaGmail(msg.email, msg.subject, msg.name)}
                      title="Reply via Gmail"
                    >
                      <Mail size={16} />
                      Reply
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMessage(msg.id)}
                      disabled={deleting === msg.id}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

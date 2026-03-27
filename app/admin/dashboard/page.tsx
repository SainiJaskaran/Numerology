"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, FileText, Mail, Plus, Calendar } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if admin session exists
    const sessionCookie = document.cookie.split("; ").find((row) => row.startsWith("admin_access="))

    if (!sessionCookie) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      setIsLoading(false)
    }
  }, [router])

  function handleLogout() {
    // Clear session cookie
    document.cookie = "admin_access=; path=/; max-age=0"
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted pt-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 bg-transparent"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground">Manage your articles and messages from here</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Articles Management Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Articles</h3>
                  <p className="text-sm text-muted-foreground">View and manage all articles</p>
                </div>
              </div>
            </div>
            <Link href="/admin/articles" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Manage Articles</Button>
            </Link>
          </Card>

          {/* Create New Article Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Create New</h3>
                  <p className="text-sm text-muted-foreground">Add a new article</p>
                </div>
              </div>
            </div>
            <Link href="/admin/articles/new" className="block">
              <Button variant="outline" className="w-full border-green-200 hover:bg-green-50 bg-transparent">
                Create Article
              </Button>
            </Link>
          </Card>

          {/* Appointments Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar size={24} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Appointments</h3>
                  <p className="text-sm text-muted-foreground">View all consultation bookings</p>
                </div>
              </div>
            </div>
            <Link href="/admin/appointments" className="block">
              <Button
                variant="outline"
                className="w-full border-orange-200 hover:bg-orange-50 text-orange-600 bg-transparent"
              >
                View Appointments
              </Button>
            </Link>
          </Card>

          {/* Messages Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail size={24} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Messages</h3>
                  <p className="text-sm text-muted-foreground">View contact form submissions from visitors</p>
                </div>
              </div>
            </div>
            <Link href="/admin/messages" className="block">
              <Button
                variant="outline"
                className="w-full border-purple-200 hover:bg-purple-50 text-purple-600 bg-transparent"
              >
                View Messages
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  )
}

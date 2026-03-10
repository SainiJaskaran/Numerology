"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // Hardcoded credentials
  const ADMIN_USERNAME = "admin"
  const ADMIN_PASSWORD = "numerology123"

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set cookie for session
      document.cookie = `admin_session=true; path=/; max-age=86400` // 24 hours
      setSuccess(true)
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 500)
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Access the article management panel</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              <p className="text-green-700 text-sm">Login successful! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Username</label>
              <Input
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 font-medium mb-2">Demo Credentials:</p>
            <p className="text-sm text-blue-600">
              Username: <code className="font-mono">admin</code>
            </p>
            <p className="text-sm text-blue-600">
              Password: <code className="font-mono">numerology123</code>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, Phone, Mail, User, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  full_name: string
  email: string
  phone: string
  birth_date: string
  service: string
  consultation_date: string
  consultation_time: string
  created_at: string
}

export default function AdminAppointmentsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Check if admin session exists
    const sessionCookie = document.cookie.split("; ").find((row) => row.startsWith("admin_access="))

    if (!sessionCookie) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchAppointments()
    }
  }, [router])

  const fetchAppointments = async () => {
    try {
      console.log("[v0] Fetching appointments...")
      const response = await fetch("/api/appointments")
      const data = await response.json()
      console.log("[v0] Fetched appointments:", data.length)
      setAppointments(data)
    } catch (error) {
      console.error("[v0] Error fetching appointments:", error)
      alert("Failed to fetch appointments")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setAppointments(appointments.filter((apt) => apt.id !== id))
        console.log("[v0] Appointment deleted successfully")
      } else {
        alert("Failed to delete appointment")
      }
    } catch (error) {
      console.error("[v0] Error deleting appointment:", error)
      alert("Error deleting appointment")
    }
  }

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm)
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <p className="text-slate-600">Loading appointments...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm" className="mb-4 gap-2 bg-transparent">
              <ArrowLeft size={16} /> Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-600 mt-1">Manage all consultation bookings</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <Card className="p-8 text-center bg-white border-0">
            <p className="text-slate-600">No appointments found</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-slate-900 font-semibold mb-1">
                        <User size={16} className="text-amber-600" />
                        {appointment.full_name}
                      </div>
                      <p className="text-sm text-slate-600">Date of Birth: {appointment.birth_date}</p>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={16} className="text-amber-600" />
                      <a href={`mailto:${appointment.email}`} className="hover:text-amber-600">
                        {appointment.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone size={16} className="text-amber-600" />
                      <a href={`tel:${appointment.phone}`} className="hover:text-amber-600">
                        {appointment.phone}
                      </a>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Service</p>
                      <p className="font-semibold text-slate-900">{appointment.service}</p>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={16} className="text-amber-600" />
                        <span>{appointment.consultation_date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock size={16} className="text-amber-600" />
                        <span>{appointment.consultation_time}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      Booked: {new Date(appointment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Delete Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

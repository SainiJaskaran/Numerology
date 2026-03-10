"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2 } from "lucide-react"
import emailjs from "@emailjs/browser"

const services = [
  "Numerology Chart",
  "Name Numerology",
  "Car Numerology",
  "Mobile Numerology",
  "Business Numerology",
  "Career Numerology",
  "Marriage/Relationship Numerology",
  "Tarot Reading",
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

const upcomingDates = Array.from({ length: 14 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() + i + 1)
  return date
}).filter((date) => date.getDay() !== 0 && date.getDay() !== 6) // Exclude weekends

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    service: "",
    date: "",
    time: "",
  })

  const [submitted, setSubmitted] = useState(false)

  // Initialize EmailJS
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting appointment:", formData)
    
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("[v0] Appointment error:", result.error)
        alert(`Error: ${result.error}`)
        return
      }

      console.log("[v0] Appointment submitted successfully, sending emails...")

      // Send emails using EmailJS
      try {
        const consultationDate = new Date(formData.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })

        // Send confirmation email to customer
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
          {
            to_email: formData.email,
            to_name: formData.fullName,
            from_name: "Numerology Consultation",
            subject: `Appointment Confirmation - ${formData.service}`,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            birth_date: formData.birthDate,
            service: formData.service,
            consultation_date: consultationDate,
            consultation_time: formData.time,
            message: `Thank you for booking your ${formData.service} consultation with us. Your appointment has been confirmed.`,
          }
        )

        console.log("[v0] Confirmation email sent to customer:", formData.email)

        // Send notification email to admin using separate template
        try {
          const adminResponse = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
            "template_863npyt",
            {
              to_email: "js9815286568@gmail.com",
              to_name: "Admin",
              from_name: formData.fullName,
              subject: `New Appointment Booking: ${formData.fullName}`,
              full_name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              birth_date: formData.birthDate,
              service: formData.service,
              consultation_date: consultationDate,
              consultation_time: formData.time,
              message: `New appointment has been booked for ${formData.fullName}.`,
            }
          )
          console.log("[v0] Notification email sent to admin, response:", adminResponse)
        } catch (adminEmailError) {
          console.error("[v0] Admin email sending failed:", adminEmailError)
        }
      } catch (emailError) {
        console.error("[v0] Customer email sending failed:", emailError)
      }

      setSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          birthDate: "",
          service: "",
          date: "",
          time: "",
        })
        setSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("[v0] Submission error:", error)
      alert("Failed to book appointment. Please try again.")
    }
  }



  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">Book An Appointment</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Schedule your personalized numerology consultation and discover your unique path.
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="bg-white border border-amber-200 rounded-lg p-12 text-center">
                <CheckCircle2 size={64} className="text-amber-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Appointment Confirmed!</h2>
                <p className="text-lg text-slate-600 mb-6">
                  Thank you for booking your consultation. We&apos;ll send you a confirmation email shortly.
                </p>
                <Link href="/">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-8 py-2 font-semibold">
                    Return Home
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name (as on official documents) *</label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number *</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Date Of Birth (dd/mm/yyyy) *</label>
                  <Input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "")
                      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2)
                      if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5, 9)
                      setFormData(prev => ({ ...prev, birthDate: value }))
                    }}
                    placeholder="dd/mm/yyyy"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>

                {/* Date for Consultation */}
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-slate-900 mb-2">
                    Choose date for consultation *
                  </label>
                  <select
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="">Select a date...</option>
                    {upcomingDates.map((date) => (
                      <option key={date.toISOString()} value={date.toISOString().split("T")[0]}>
                        {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time for Consultation */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Choose time for consultation *</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="">Select a time...</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-slate-900 mb-2">
                    Choose service *
                  </label>
                  <select
                    name="service"
                    id="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  >
                    <option value="">Select a service...</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={
                    !formData.fullName ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.birthDate ||
                    !formData.date ||
                    !formData.time ||
                    !formData.service
                  }
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Appointment
                </Button>

                <p className="text-center text-sm text-slate-600">
                  We respect your privacy. Your information will only be used to confirm your consultation.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

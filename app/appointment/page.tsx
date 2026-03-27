"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckCircle2, ArrowRight, Shield, Clock, Star, Users, CalendarIcon } from "lucide-react"
import emailjs from "@emailjs/browser"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const servicesList = ["Numerology Chart", "Name Numerology", "Car Numerology", "Mobile Numerology", "Business Numerology", "Career Numerology", "Marriage/Relationship Numerology", "Tarot Reading"]
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export default function AppointmentPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", birthDate: "", service: "", date: "", time: "" })
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [consultDate, setConsultDate] = useState<Date | undefined>(undefined)
  const [birthPickerOpen, setBirthPickerOpen] = useState(false)
  const [consultPickerOpen, setConsultPickerOpen] = useState(false)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  useScrollReveal()

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const maxConsultDate = new Date(today)
  maxConsultDate.setMonth(today.getMonth() + 1)

  const upcomingDates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1); return d
  }).filter((d) => d <= maxConsultDate)

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
  }, [])

  useEffect(() => {
    if (!formData.date) {
      setBookedSlots([])
      return
    }
    async function fetchBookedSlots() {
      setLoadingSlots(true)
      try {
        const res = await fetch(`/api/appointments?date=${formData.date}`)
        const data = await res.json()
        const times = Array.isArray(data) ? data.map((a: { consultation_time: string }) => a.consultation_time) : []
        setBookedSlots(times)
      } catch {
        setBookedSlots([])
      } finally {
        setLoadingSlots(false)
      }
    }
    fetchBookedSlots()
    // Clear selected time if date changes
    setFormData(p => ({ ...p, time: "" }))
  }, [formData.date])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
      const result = await response.json()
      if (!response.ok) { alert(`Error: ${result.error}`); return }

      try {
        const consultationDate = new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
        await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID1 || "", {
          to_email: formData.email, to_name: formData.fullName, from_name: "Numerology Consultation",
          subject: `Appointment Confirmation - ${formData.service}`, full_name: formData.fullName,
          email: formData.email, phone: formData.phone, birth_date: formData.birthDate,
          service: formData.service, consultation_date: consultationDate, consultation_time: formData.time,
          message: `Thank you for booking your ${formData.service} consultation with us. Your appointment has been confirmed.`,
        })
        try {
          await emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID2 || "", {
            to_email: "js9815286568@gmail.com", to_name: "Admin", from_name: formData.fullName,
            subject: `New Appointment Booking: ${formData.fullName}`, full_name: formData.fullName,
            email: formData.email, phone: formData.phone, birth_date: formData.birthDate,
            service: formData.service, consultation_date: consultationDate, consultation_time: formData.time,
            message: `New appointment has been booked for ${formData.fullName}.`,
          })
        } catch (e) { console.error("[v0] Admin email failed:", e) }
      } catch (e) { console.error("[v0] Customer email failed:", e) }

      setSubmitted(true)
    } catch (error) { alert("Failed to book appointment. Please try again.") }
  }

  const selectClass = "w-full px-4 py-3 border border-[#e5e0d5] rounded-lg bg-white text-[#1a1a1a] text-sm focus:outline-none form-input"

  return (
    <>
      <Navbar />
      <main className="pt-[68px] pb-20">
        {/* Hero */}
        <section className="py-28 hero-bg relative overflow-hidden">
          <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] bg-[#b48c3c]/[0.05] rounded-full blur-[100px] animate-glow pointer-events-none" />
          <div className="absolute bottom-[10%] left-[8%] w-[250px] h-[250px] bg-[#d4a843]/[0.04] rounded-full blur-[80px] animate-glow pointer-events-none" style={{ animationDelay: '2s' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl reveal">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d4a843]/60 mb-4">Schedule Now</p>
              <h1 className="text-5xl md:text-[3.5rem] font-bold mb-6 text-white leading-[1.08]">
                Book your <span className="text-gradient-animate">consultation</span>.
              </h1>
              <p className="text-[17px] text-white/45 leading-relaxed">
                Schedule a personalized session and take the first step toward clarity and alignment.
              </p>
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {submitted ? (
              <div className="max-w-xl mx-auto" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div className="bg-[#faf8f4] rounded-xl p-14 text-center border border-[#f0ece4]">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">Appointment Confirmed</h2>
                  <p className="text-[#999] mb-8">You&apos;ll receive a confirmation email shortly.</p>
                  <Link href="/"><Button className="btn-gold text-white rounded-lg px-8 py-5 text-sm font-medium group">Return Home <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" /></Button></Link>
                </div>
              </div>
            ) : (
              <div className="grid lg:grid-cols-5 gap-16">
                {/* Left Panel */}
                <div className="lg:col-span-2 reveal-left">
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3">How it works</h2>
                  <p className="text-[#999] text-sm leading-relaxed mb-10">
                    Fill in your details, choose a service and time. I&apos;ll confirm via email within 24 hours.
                  </p>

                  <div className="space-y-8 mb-10">
                    {[
                      { step: "01", title: "Fill your details", desc: "Provide your name, contact, and birth date for an accurate reading." },
                      { step: "02", title: "Select a service", desc: "Choose the consultation type that best matches your needs." },
                      { step: "03", title: "Pick a time", desc: "Select a convenient date and time from available slots." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#b48c3c]/10 to-[#d4a843]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#b48c3c] font-bold text-xs">{item.step}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1a1a1a] text-[15px] mb-1">{item.title}</h4>
                          <p className="text-xs text-[#999] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="section-line mb-8" />

                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { icon: Clock, label: "Flexible scheduling" },
                      { icon: Shield, label: "100% confidential" },
                      { icon: Star, label: "Expert guidance" },
                      { icon: Users, label: "500+ clients served" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#faf8f4] flex items-center justify-center">
                          <item.icon size={14} className="text-[#b48c3c]" />
                        </div>
                        <span className="text-xs text-[#999]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-3 reveal-right">
                  <form onSubmit={handleSubmit} className="bg-[#faf8f4] rounded-xl p-8 md:p-10 space-y-5 border border-[#f0ece4]">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Full Name *</label><Input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="As on documents" required className="rounded-lg border-[#e5e0d5] bg-white py-5 form-input" /></div>
                      <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Email *</label><Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required className="rounded-lg border-[#e5e0d5] bg-white py-5 form-input" /></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Phone *</label><Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" required className="rounded-lg border-[#e5e0d5] bg-white py-5 form-input" /></div>
                      <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Date of Birth *</label>
                        <Popover open={birthPickerOpen} onOpenChange={setBirthPickerOpen}>
                          <PopoverTrigger asChild>
                            <button type="button" className="w-full flex items-center justify-between px-4 py-3 border border-[#e5e0d5] rounded-lg bg-white text-sm text-left form-input">
                              <span className={formData.birthDate ? "text-[#1a1a1a]" : "text-[#999]"}>{formData.birthDate || "Select date of birth"}</span>
                              <CalendarIcon size={16} className="text-[#b48c3c]" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              captionLayout="dropdown"
                              selected={birthDate}
                              onSelect={(date) => {
                                setBirthDate(date)
                                if (date) {
                                  setFormData(p => ({ ...p, birthDate: date.toLocaleDateString("en-GB") }))
                                }
                                setBirthPickerOpen(false)
                              }}
                              defaultMonth={birthDate || new Date(2000, 0)}
                              fromYear={1930}
                              toYear={new Date().getFullYear()}
                              disabled={{ after: new Date() }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Service *</label><select name="service" value={formData.service} onChange={handleInputChange} required className={selectClass}><option value="">Select a service...</option>{servicesList.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Consultation Date *</label>
                        <div className="flex gap-2">
                          <select
                            name="date"
                            value={formData.date}
                            onChange={(e) => {
                              const val = e.target.value
                              setFormData(p => ({ ...p, date: val }))
                              setConsultDate(val ? new Date(val + "T00:00:00") : undefined)
                            }}
                            required
                            className={selectClass + " flex-1"}
                          >
                            <option value="">Select a date...</option>
                            {upcomingDates.map((d) => (
                              <option key={d.toISOString()} value={d.toISOString().split("T")[0]}>
                                {d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                              </option>
                            ))}
                          </select>
                          <Popover open={consultPickerOpen} onOpenChange={setConsultPickerOpen}>
                            <PopoverTrigger asChild>
                              <button type="button" className="px-3 py-3 border border-[#e5e0d5] rounded-lg bg-white hover:bg-[#faf8f4] transition-colors" title="Open calendar">
                                <CalendarIcon size={18} className="text-[#b48c3c]" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                              <Calendar
                                mode="single"
                                selected={consultDate}
                                onSelect={(date) => {
                                  setConsultDate(date)
                                  if (date) {
                                    setFormData(p => ({ ...p, date: date.toISOString().split("T")[0] }))
                                  }
                                  setConsultPickerOpen(false)
                                }}
                                disabled={{ before: tomorrow, after: maxConsultDate }}
                                defaultMonth={today}
                                fromMonth={today}
                                toMonth={maxConsultDate}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Time *</label>
                        {loadingSlots ? (
                          <div className="w-full px-4 py-3 border border-[#e5e0d5] rounded-lg bg-white text-sm text-[#999]">Loading available slots...</div>
                        ) : (
                          <select name="time" value={formData.time} onChange={handleInputChange} required className={selectClass}>
                            <option value="">{formData.date ? "Select a time..." : "Select a date first"}</option>
                            {timeSlots.map((t) => {
                              const isBooked = bookedSlots.includes(t)
                              return <option key={t} value={t} disabled={isBooked}>{t}{isBooked ? " — Booked" : ""}</option>
                            })}
                          </select>
                        )}
                      </div>
                    </div>

                    <div className="section-line" />

                    <Button type="submit" disabled={!formData.fullName || !formData.email || !formData.phone || !formData.birthDate || !formData.date || !formData.time || !formData.service}
                      className="w-full btn-gold text-white rounded-lg py-6 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed group">
                      Confirm Appointment <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                    <p className="text-center text-xs text-[#bbb] flex items-center justify-center gap-1.5"><Shield size={12} className="text-[#b48c3c]" />Your information is kept strictly confidential.</p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

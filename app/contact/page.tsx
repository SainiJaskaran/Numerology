"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Instagram, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send message")
      }

      setSubmitted(true)
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setSubmitted(false)
      }, 3000)
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-5xl md:text-6xl mb-6 text-foreground">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? I&apos;d love to hear from you. Reach out and let&apos;s start a conversation.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Contact Info Cards */}
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Mail size={32} className="text-accent mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:hello@numerology.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@numerology.com
                </a>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Phone size={32} className="text-accent mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Phone</h3>
                <a href="tel:+1(555)123-4567" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <MapPin size={32} className="text-accent mx-auto mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">Available for in-person and online consultations</p>
              </div>
            </div>

            {/* Contact Form and Social */}
            <div className="grid md:grid-cols-3 gap-12">
              {/* Form */}
              <div className="md:col-span-2">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Send a Message</h2>

                {submitted ? (
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 text-center">
                    <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3">
                        <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                        <p className="text-red-700">{error}</p>
                      </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            required
                            className="rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                            className="rounded-lg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Subject *</label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What is this about?"
                          required
                          className="rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Your message here..."
                          rows={6}
                          required
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full py-3 font-semibold"
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </>
                )}
              </div>

              {/* Social Links & Hours */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Connect With Me</h3>
                  <div className="space-y-3">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Instagram size={20} />
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle size={20} />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="mailto:hello@numerology.com"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail size={20} />
                      <span>Email</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">Consultation Hours</h3>
                  <div className="space-y-2 text-muted-foreground text-sm">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: By appointment</p>
                  </div>
                </div>

                <div className="bg-secondary/10 border border-border rounded-lg p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">Response Time</h3>
                  <p className="text-muted-foreground text-sm">I typically respond to inquiries within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-secondary/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-4xl md:text-5xl text-center mb-12 text-foreground">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "How long does a consultation last?",
                  a: "Consultation lengths vary by service type, ranging from 30 minutes (Monthly Forecast) to 90 minutes (Compatibility Analysis). Check the Services page for specific details.",
                },
                {
                  q: "Is numerology based on science?",
                  a: "Numerology is an ancient spiritual practice that uses numbers to gain insight into life and personality. While not scientifically proven, many find tremendous value in the guidance it provides.",
                },
                {
                  q: "Can you predict the future?",
                  a: "Numerology doesn't predict the future. Instead, it reveals patterns and tendencies that can help you make more informed decisions and understand your path better.",
                },
                {
                  q: "Do you offer online consultations?",
                  a: "Yes! I offer both in-person and online consultations. Online sessions are just as effective and allow you to connect from anywhere.",
                },
                {
                  q: "What information do I need for a reading?",
                  a: "For most consultations, I need your full name and birth date. Some services may require additional information, which you can provide during booking.",
                },
                {
                  q: "Can I reschedule my appointment?",
                  a: "Yes, you can reschedule your appointment up to 48 hours in advance. Please contact me directly to make changes.",
                },
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

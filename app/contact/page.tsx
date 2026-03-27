"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Instagram, MessageCircle, CheckCircle2, AlertCircle, ArrowRight, ChevronDown } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  useScrollReveal()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError("")
    try {
      const response = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) })
      if (!response.ok) { const d = await response.json(); throw new Error(d.error || "Failed to send message") }
      setSubmitted(true)
      setTimeout(() => { setFormData({ name: "", email: "", subject: "", message: "" }); setSubmitted(false) }, 3000)
    } catch (err: any) { setError(err.message || "Failed to send message.") } finally { setLoading(false) }
  }

  const faqs = [
    { q: "How long does a consultation last?", a: "Consultation lengths vary by service type, ranging from 30 minutes to 90 minutes. Check the Services page for details." },
    { q: "Is numerology based on science?", a: "Numerology is an ancient spiritual practice. While not scientifically proven, many find tremendous value in the guidance it provides." },
    { q: "Can you predict the future?", a: "Numerology reveals patterns and tendencies that help you make informed decisions — it doesn't predict the future." },
    { q: "Do you offer online consultations?", a: "Yes. Both in-person and online consultations are available. Online sessions are just as effective." },
    { q: "What information do I need?", a: "For most consultations, your full name and birth date. Some services require additional information provided during booking." },
    { q: "Can I reschedule?", a: "Yes, up to 48 hours in advance. Contact me directly to make changes." },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-[68px] pb-20">
        {/* Hero */}
        <section className="py-28 bg-[#faf8f4] relative overflow-hidden">
          <div className="absolute top-10 right-[10%] w-[250px] h-[250px] bg-[#b48c3c]/[0.04] rounded-full blur-[80px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl reveal">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c3c] mb-4">Get in Touch</p>
              <h1 className="text-5xl md:text-[3.5rem] mb-6 text-[#1a1a1a] leading-[1.08]">
                Let&apos;s start a <span className="text-gradient">conversation</span>.
              </h1>
              <p className="text-[17px] text-[#777] leading-relaxed">
                Have questions about numerology? I&apos;d love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: Mail, title: "Email", value: "hello@numerology.com", href: "mailto:hello@numerology.com" },
                { icon: Phone, title: "Phone", value: "+1 (555) 123-4567", href: "tel:+1(555)123-4567" },
                { icon: MapPin, title: "Location", value: "In-person & Online", href: null },
              ].map((item, i) => (
                <div key={i} className={`reveal delay-${i + 1} group bg-[#faf8f4] rounded-xl p-8 text-center border border-[#f0ece4] card-premium`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1a1a1a] mb-1">{item.title}</h3>
                  {item.href ? <a href={item.href} className="text-sm text-[#999] hover:text-[#b48c3c] transition-colors">{item.value}</a> : <p className="text-sm text-[#999]">{item.value}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-16">
              <div className="md:col-span-2 reveal">
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Send a <span className="text-gradient">Message</span></h2>
                {submitted ? (
                  <div className="bg-[#faf8f4] rounded-xl p-12 text-center border border-[#f0ece4]">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={28} className="text-white" /></div>
                    <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Message Sent</h3>
                    <p className="text-[#999]">I&apos;ll respond within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    {error && <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6 flex gap-3"><AlertCircle className="text-red-500 flex-shrink-0" size={18} /><p className="text-red-700 text-sm">{error}</p></div>}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Name *</label><Input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your name" required className="rounded-lg border-[#e5e0d5] py-5 form-input" /></div>
                        <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Email *</label><Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required className="rounded-lg border-[#e5e0d5] py-5 form-input" /></div>
                      </div>
                      <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Subject *</label><Input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="What is this about?" required className="rounded-lg border-[#e5e0d5] py-5 form-input" /></div>
                      <div><label className="block text-xs font-semibold text-[#1a1a1a] mb-2 uppercase tracking-wider">Message *</label><textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your message..." rows={5} required className="w-full px-4 py-3 border border-[#e5e0d5] rounded-lg bg-white text-[#1a1a1a] focus:outline-none resize-none form-input" /></div>
                      <Button type="submit" disabled={loading} className="btn-gold text-white rounded-lg px-8 py-5 text-sm font-medium group">
                        {loading ? "Sending..." : <>Send Message <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" /></>}
                      </Button>
                    </form>
                  </>
                )}
              </div>

              <div className="space-y-8 reveal-right">
                <div>
                  <h3 className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wider mb-5">Connect</h3>
                  <div className="space-y-4">
                    {[
                      { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
                      { href: "https://wa.me/1234567890", icon: MessageCircle, label: "WhatsApp" },
                      { href: "mailto:hello@numerology.com", icon: Mail, label: "Email" },
                    ].map((s, i) => (
                      <a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 text-[#999] hover:text-[#b48c3c] transition-colors text-sm group">
                        <div className="w-9 h-9 rounded-lg bg-[#faf8f4] group-hover:bg-[#b48c3c]/10 flex items-center justify-center transition-colors"><s.icon size={15} /></div>
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="section-line" />
                <div>
                  <h3 className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wider mb-5">Hours</h3>
                  <div className="space-y-2.5 text-sm">
                    {[["Mon – Fri", "9 AM – 6 PM"], ["Saturday", "10 AM – 4 PM"], ["Sunday", "By appointment"]].map(([d, t], i) => (
                      <div key={i} className="flex justify-between"><span className="text-[#bbb]">{d}</span><span className="text-[#666]">{t}</span></div>
                    ))}
                  </div>
                </div>
                <div className="section-line" />
                <div className="bg-[#faf8f4] rounded-xl p-6 border border-[#f0ece4]">
                  <p className="text-sm text-[#777]">Typical response time: <strong className="text-[#1a1a1a]">within 24 hours</strong></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-28 bg-[#faf8f4]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 reveal">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c3c] mb-4">FAQ</p>
              <h2 className="text-4xl md:text-[2.8rem] font-bold text-[#1a1a1a]">Common Questions</h2>
            </div>
            <div className="space-y-0">
              {faqs.map((item, i) => (
                <div key={i} className={`reveal delay-${(i % 3) + 1} border-b border-[#e8e3d8] last:border-0`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left py-6 flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-[#1a1a1a] text-[15px]">{item.q}</h3>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openFaq === i ? "bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] border-transparent rotate-180" : "border-[#e0d5c0]"
                    }`}><ChevronDown size={14} className={openFaq === i ? "text-white" : "text-[#b48c3c]"} /></div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ${openFaq === i ? "max-h-[200px] opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
                    <p className="text-[#999] leading-relaxed text-[15px]">{item.a}</p>
                  </div>
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

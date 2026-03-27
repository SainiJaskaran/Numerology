"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Heart, Sparkles } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const credentials = [
  { icon: Award, number: "15+", label: "Years of Practice" },
  { icon: Users, number: "500+", label: "Clients Served" },
  { icon: Heart, number: "98%", label: "Satisfaction Rate" },
  { icon: Sparkles, number: "Certified", label: "Master Numerologist" },
]

const journey = [
  { title: "Early Fascination", desc: "From childhood, I was drawn to the mysterious ways numbers appeared in nature and human affairs. This curiosity led me to study numerology formally." },
  { title: "Professional Training", desc: "I studied under master numerologists and spiritual teachers, earning my certification and deepening my understanding of this ancient practice." },
  { title: "Helping Others", desc: "For over a decade, I've dedicated myself to helping clients find clarity, purpose, and spiritual alignment through personalized consultations." },
  { title: "Continued Growth", desc: "I continue to study and evolve my practice, integrating new insights while honoring the timeless wisdom of numerology." },
]

export default function AboutPage() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <main className="pt-[68px]">
        {/* Hero */}
        <section className="py-28 bg-[#faf8f4] relative overflow-hidden">
          <div className="absolute top-10 right-[5%] w-[300px] h-[300px] bg-[#b48c3c]/[0.04] rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="reveal-left">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c3c] mb-4">About</p>
                <h1 className="text-5xl md:text-[3.5rem] font-bold mb-8 text-[#1a1a1a] leading-[1.08]">
                  A decade of guiding lives through <span className="text-gradient">numbers</span>.
                </h1>
                <p className="text-[17px] text-[#777] leading-relaxed mb-6">
                  I&apos;m a seasoned Numerologist and Tarot Reader with over a decade of experience guiding individuals toward clarity, purpose, and balance.
                </p>
                <p className="text-[17px] text-[#777] leading-relaxed">
                  Beyond the spiritual realm, I believe that mind, body, and soul work best in harmony — and I bring that philosophy into every reading.
                </p>
              </div>
              <div className="reveal-right">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-[#b48c3c]/10 to-[#d4a843]/5 rounded-2xl blur-2xl" />
                  <div className="relative aspect-[4/5] rounded-xl bg-[#e8e4dc] overflow-hidden shadow-xl">
                    <img src="/placeholder.svg?key=about01" alt="Numerologist" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] rounded-xl flex items-center justify-center shadow-lg animate-float">
                    <Sparkles size={28} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-16 reveal">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c3c] mb-4">Core Beliefs</p>
              <h2 className="text-4xl md:text-[2.8rem] font-bold text-[#1a1a1a] leading-tight">My Philosophy</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Numbers Don't Lie", desc: "Numbers are the universal language of the cosmos. Every digit carries a unique vibration. Understanding your personal numbers reveals your true nature and potential." },
                { title: "Empower Your Choices", desc: "A numerology reading isn't about predicting the future — it's about understanding yourself better so you can make conscious, aligned choices." },
                { title: "Spiritual Growth", desc: "Each consultation is an opportunity for self-discovery and growth toward greater self-awareness and alignment with your life purpose." },
                { title: "Holistic Approach", desc: "I consider your complete picture — personal, professional, and spiritual — ensuring your reading addresses all aspects of life." },
              ].map((item, i) => (
                <div key={i} className={`reveal delay-${i + 1} group bg-[#faf8f4] rounded-xl p-8 border border-[#f0ece4] card-premium`}>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#b48c3c]/10 to-[#d4a843]/10 flex items-center justify-center mb-5 group-hover:from-[#b48c3c] group-hover:to-[#d4a843] transition-all duration-500">
                    <span className="text-[#b48c3c] font-bold text-sm group-hover:text-white transition-colors duration-500">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-3">{item.title}</h3>
                  <p className="text-[#888] leading-relaxed text-[15px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-28 hero-bg relative overflow-hidden">
          <div className="absolute top-10 left-[10%] w-[200px] h-[200px] bg-[#b48c3c]/[0.05] rounded-full blur-[80px] animate-glow pointer-events-none" />
          <div className="absolute bottom-10 right-[10%] w-[250px] h-[250px] bg-[#d4a843]/[0.04] rounded-full blur-[100px] animate-glow pointer-events-none" style={{ animationDelay: '2s' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 reveal">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d4a843]/60 mb-4">Track Record</p>
              <h2 className="text-4xl md:text-[2.8rem] font-bold text-white">Experience & Expertise</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {credentials.map((item, i) => (
                <div key={i} className={`reveal-scale delay-${i + 1} text-center py-10 px-6 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-400`}>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <item.icon size={24} className="text-white" />
                  </div>
                  <p className="text-3xl font-bold text-gradient mb-2">{item.number}</p>
                  <p className="text-sm text-white/40">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 reveal">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c3c] mb-4">My Story</p>
              <h2 className="text-4xl md:text-[2.8rem] font-bold text-[#1a1a1a]">The Journey</h2>
            </div>

            <div className="relative">
              <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#b48c3c] via-[#d4a843] to-[#b48c3c]/20 timeline-line" />
              <div className="space-y-10">
                {journey.map((item, i) => (
                  <div key={i} className={`reveal delay-${i + 1} relative pl-12`}>
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-[#b48c3c] to-[#d4a843] shadow-md shadow-[#b48c3c]/30 flex items-center justify-center timeline-dot">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="bg-[#faf8f4] rounded-xl p-7 border border-[#f0ece4] card-subtle">
                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                      <p className="text-[#888] leading-relaxed text-[15px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 hero-bg relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.03] rounded-full animate-spin-slow pointer-events-none" />
          <div className="absolute top-10 left-[15%] w-[200px] h-[200px] bg-[#b48c3c]/[0.04] rounded-full blur-[80px] animate-glow pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Ready to begin your <span className="text-gradient-animate">journey</span>?
            </h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto leading-relaxed">
              Let&apos;s explore your numbers together and uncover the guidance waiting for you.
            </p>
            <Link href="/appointment">
              <Button className="btn-gold text-white rounded-lg px-10 py-6 text-sm font-medium tracking-wide group">
                Schedule a Consultation
                <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

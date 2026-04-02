"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { ArrowRight, Sparkles, Star, TrendingUp, Hash, Layers, Briefcase, Car, Smartphone, Heart } from "lucide-react"
import { OrbitingNumbers } from "@/components/orbiting-numbers"

const services = [
  { icon: Layers, title: "Complete Numerology Chart", desc: "A comprehensive numerology chart that decodes your core numbers — Date of Birth, Life Path, Soul Number, and Name Number — while also mapping your Pinnacles, Challenges, and Time Cycles to guide your journey.", serviceId: 1 },
  { icon: Sparkles, title: "Name Numerology", desc: "Align your name with your life purpose to create clarity, flow, and alignment in your journey. ", serviceId: 2 },
  { icon: Car, title: "Car Numerology", desc: "A detailed analysis of your vehicle number and its alignment with your Core Numbers, offering insights into safety, ease, financial flow, and remedies for better alignment.", serviceId: 3 },
  { icon: Smartphone, title: "Mobile Numerology", desc: "A personalized analysis of your mobile number and its alignment with your energy, influencing communication, opportunities, and overall life flow.", serviceId: 4 },
  { icon: Briefcase, title: "Career Numerology", desc: "See how your numbers shape your professional strengths, ideal career paths, work style, and success patterns.", serviceId: 5 },
  { icon: Heart, title: "Marriage/Relationship Numerology", desc: "Understand how two individual's core numbers interact to determine compatibility, emotional connection, communication patterns, and long-term harmony.", serviceId: 6 },
]

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  useScrollReveal()
  useEffect(() => { setIsLoaded(true) }, [])

  return (
    <>
      <Navbar />
      <main className="pt-[68px]">
        {/* ===== HERO — Dark, immersive ===== */}
        <section className="relative min-h-[93vh] hero-bg flex items-center overflow-hidden">
          {/* Ambient glow orbs */}
          <div className="absolute top-[15%] right-[12%] w-[350px] h-[350px] bg-[#b48c3c]/[0.06] rounded-full blur-[120px] animate-glow pointer-events-none" />
          <div className="absolute bottom-[10%] left-[8%] w-[280px] h-[280px] bg-[#d4a843]/[0.05] rounded-full blur-[100px] animate-glow pointer-events-none" style={{ animationDelay: '2s' }} />

          {/* Orbiting numbers animation */}
          <OrbitingNumbers />

          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="max-w-2xl">
              <div className={`space-y-8 transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-sm rounded-full border border-white/[0.08]">
                  <Sparkles size={13} className="text-[#d4a843]" />
                  <span className="text-[12px] font-medium tracking-widest uppercase text-[#d4a843]">Numerology & Tarot</span>
                </div>

                <h1 className="text-5xl md:text-[4.5rem] font-bold leading-[1.06] tracking-tight text-white">
                  Guiding Your Path<br />
                  Through <span className="text-gradient-animate">Numbers</span><br />
                  & Cards.
                </h1>

                <p className="text-[17px] text-white/50 leading-relaxed max-w-lg">
                  Every journey is guided by unseen energies — answers encoded in numbers and stories whispered through the cards. 
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link href="/appointment">
                    <Button className="btn-gold text-white rounded-lg px-8 py-6 text-sm font-medium tracking-wide group">
                      Book a Consultation
                      <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" className="bg-white/[0.02] rounded-lg px-8 py-6 text-sm font-medium tracking-wide border-white/1 text-white/70 hover:bg-white/[0.07] hover:text-white transition-all duration-300">
                      Explore Services
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-10 pt-10 border-t border-white/[0.06]">
                  {[
                    { num: "500+", label: "Clients Served" },
                    { num: "10+", label: "Years Experience" },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-2xl font-bold text-gradient">{s.num}</p>
                      <p className="text-[11px] text-white/35 mt-1 tracking-wider uppercase">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHAT WE DO ===== */}
        <section className="py-28 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-20 items-start">
              <div className="reveal">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c3c] mb-4">What We Offer</p>
                <h2 className="text-4xl md:text-[2.8rem] font-bold text-[#1a1a1a] leading-tight mb-6">
                  Numerology helps transform understanding into action.
                </h2>
                <p className="text-[#777] leading-relaxed mb-8">
                  Unlock the hidden messages within your numbers and discover the path to personal growth, clarity, and spiritual alignment.
                </p>
                <Link href="/services">
                  <Button variant="outline" className="rounded-lg px-6 py-5 text-sm font-medium border-[#b48c3c] text-[#1a1a1a] hover:bg-[#b48c3c] hover:text-white transition-all duration-300 group">
                    Explore All Services
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div>
                {[
                  { icon: Star, title: "Destiny", desc: "Understand current issues in your life and discover the path forward through numerological guidance and deep insight." },
                  { icon: TrendingUp, title: "Life Path", desc: "Discover your innate abilities and unlock the potential that has been within you all along through your birth numbers." },
                ].map((item, i) => (
                  <div key={i} className={`reveal delay-${i + 1} group flex gap-5 py-8 ${i === 0 ? 'border-b border-[#f0ece4]' : ''}`}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b48c3c]/10 to-[#d4a843]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#b48c3c] group-hover:to-[#d4a843] transition-all duration-500">
                      <item.icon size={20} className="text-[#b48c3c] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                      <p className="text-[#888] leading-relaxed text-[15px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== SERVICES GRID ===== */}
        <section className="py-28 bg-[#faf8f4] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b48c3c]/20 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c3c] mb-4">Our Expertise</p>
                <h2 className="text-4xl md:text-[2.8rem] font-bold text-[#1a1a1a] leading-tight">Our Services</h2>
              </div>
              <Link href="/services" className="text-sm text-[#b48c3c] hover:text-[#8a6b25] transition-colors flex items-center gap-1.5 font-medium group">
                View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <Link key={i} href={`/services?open=${s.serviceId}`} className={`reveal delay-${(i % 3) + 1} group bg-white rounded-xl p-7 border border-[#f0ece4] card-premium cursor-pointer block`}>
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#b48c3c]/10 to-[#d4a843]/10 flex items-center justify-center mb-5 group-hover:from-[#b48c3c] group-hover:to-[#d4a843] transition-all duration-500">
                    <s.icon size={19} className="text-[#b48c3c] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-2 group-hover:text-[#8a6b25] transition-colors">{s.title}</h3>
                  <p className="text-sm text-[#999] leading-relaxed">{s.desc}</p>
                  <div className="mt-5 flex items-center text-[#b48c3c] text-[13px] font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    Learn more <ArrowRight size={13} className="ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA — Dark with atmosphere ===== */}
        <section className="py-28 hero-bg relative overflow-hidden">
          <div className="absolute top-10 left-[15%] w-[250px] h-[250px] bg-[#b48c3c]/[0.05] rounded-full blur-[100px] animate-glow pointer-events-none" />
          <div className="absolute bottom-10 right-[15%] w-[200px] h-[200px] bg-[#d4a843]/[0.04] rounded-full blur-[80px] animate-glow pointer-events-none" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.03] rounded-full animate-spin-slow pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 reveal">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d4a843]/60 mb-4">Start Today</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to discover what your<br /><span className="text-gradient-animate">numbers reveal</span>?
            </h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto leading-relaxed">
              Your birth date holds the key to understanding your unique path. Begin your journey toward clarity and purpose.
            </p>
            <Link href="/appointment">
              <Button className="btn-gold text-white rounded-lg px-10 py-6 text-sm font-medium tracking-wide group">
                Book Your Consultation
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

"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const services = [
  { id: 1, title: "Complete Numerology Chart", includedTitle: "Your Personalized Numerology Experience Includes:", description: "A comprehensive numerology chart that decodes your core numbers — Date of Birth, Life Path, Soul Number, and Name Number — while also mapping your Pinnacles, Challenges, and Time Cycles to guide your journey.", features: ["A detailed decoding of your core numbers — revealing your strengths, patterns, and life direction", "Clear guidance for career, business, and financial decisions", "Deep insight into relationships and emotional alignment", "Awareness of health tendencies and energetic balance", "Identification of karmic debts and how to work through them", "Practical remedies to enhance and harmonize your numbers", "A comprehensive written report plus a personalized consultation for clarity and direction"] },
  { id: 2, title: "Name Numerology", includedTitle: "What's Included", description: "Align your name with your life purpose to create clarity, flow, and alignment in your journey. ", features: ["In-Depth Name Analysis", "Alignment with Your Core Numbers", "Strengths and Hidden Blocks", "Personalized Name Corrections", "Remedies and Activation"] },
  { id: 3, title: "Car Numerology", includedTitle: "What's Included", description: "A detailed analysis of your vehicle number and its alignment with your Core Numbers, offering insights into safety, ease, financial flow, and remedies for better alignment.", features: ["Vehicle Number Analysis - whether it brings ease, protection, or challenges", "Compatibility with Owner's Numbers", "Ideal Vehicle Number Suggestions (Pre-Purchase)", "Practical remedies if the current number is not aligned"] },
  { id: 4, title: "Mobile Numerology", includedTitle: "What's Included", description: "A personalized analysis of your mobile number and its alignment with your energy, influencing communication, opportunities, and overall life flow.", features: ["Mobile Number Analysis", "Compatibility with Your Core Numbers", "Impact on Key Areas of Life", "Recommendations for choosing a more aligned number (if needed)"] },
  { id: 5, title: "Career Numerology", includedTitle: "What's Included", description: "See how your numbers shape your professional strengths, ideal career paths, work style, and success patterns.", features: ["Core Number Analysis for Career", "Ideal Career Paths and Industries", "Work Style and Strengths", "Patterns Causing Stagnation, Job Dissatisfaction, or Instability ", "Misalignment Between Effort and Results", "Financial and Growth Potential","Timing and Career Cycles"] },
  { id: 6, title: "Marriage/Relationship Numerology", includedTitle: "What's Included", description: "Understand how two individual's core numbers interact to determine compatibility, emotional connection, communication patterns, and long-term harmony.", features: ["Matching of core numbers (Life Path, Soul, Name Number) ", "Overall harmony between partners ", "Natural ease vs areas of friction ", "Emotional & Communication Dynamics", "Strengths of the Relationship", "Challenges & Conflict Patterns","Long-Term Compatibility","Favorable periods for: Marriage/ Engagement"] },
  { id: 7, title: "Tarot Reading", includedTitle: "What's Included", description: "Gain clarity and direction through intuitive tarot guidance for your current situation and potential outcomes.", features: ["Deeper look into the issue or question you're facing ", "What's really happening beneath the surface", "Things you may not be seeing clearly", "Multiple possibilities (not fixed predictions, but guidance-based outcomes)", "Clear, intuitive direction on what actions to take ", "What to embrace, avoid, or shift"] },
]

const testimonials = [
  { name: "Sarah Mitchell", role: "Entrepreneur", text: "The numerology reading completely transformed my understanding of myself and my career path. Incredibly accurate.", rating: 5 },
  { name: "James Chen", role: "Life Coach", text: "I recommend my clients to get a reading. The depth and clarity provided is unmatched. Truly transformative.", rating: 5 },
  { name: "Maria Rodriguez", role: "Artist", text: "Understanding my life path number helped me align with my purpose. Enlightening and empowering.", rating: 5 },
  { name: "David Thompson", role: "Corporate Professional", text: "I was skeptical at first, but the insights were surprisingly profound and relevant to my life.", rating: 5 },
  { name: "Emma Watson", role: "Wellness Coach", text: "The compatibility analysis was eye-opening. It brought us closer and helped us understand each other.", rating: 5 },
  { name: "Alex Kumar", role: "Digital Marketer", text: "The business numerology consultation gave me clarity on the right timing for my ventures.", rating: 5 },
]

export default function ServicesPage() {
  return (
    <Suspense>
      <ServicesContent />
    </Suspense>
  )
}

function ServicesContent() {
  const searchParams = useSearchParams()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const serviceRefs = useRef<Record<number, HTMLDivElement | null>>({})
  useScrollReveal()

  useEffect(() => {
    const openId = searchParams.get("open")
    if (openId) {
      const id = parseInt(openId, 10)
      setSelectedService(id)
      // Scroll to the service after a short delay for DOM to render
      setTimeout(() => {
        serviceRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 400)
    }
  }, [searchParams])

  return (
    <>
      <Navbar />
      <main className="pt-[68px]">
        {/* Hero */}
        <section className="py-28 hero-bg relative overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-[#b48c3c]/[0.05] rounded-full blur-[100px] animate-glow pointer-events-none" />
          <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] bg-[#d4a843]/[0.04] rounded-full blur-[80px] animate-glow pointer-events-none" style={{ animationDelay: '2s' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl reveal">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d4a843]/60 mb-4">What We Offer</p>
              <h1 className="text-5xl md:text-[3.5rem] font-bold mb-6 text-white leading-[1.08]">
                Services tailored to your <span className="text-gradient-animate">journey</span>.
              </h1>
              <p className="text-[17px] text-white/45 leading-relaxed">
                Your journey is no accident — it&apos;s written in numbers. It can be revealed through the cards.<br></br>
                Through personalized services tailored to your unique path, each consultation is designed to bring clarity, direction, and alignment to your journey.

              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-0">
              {services.map((service, index) => (
                <div key={service.id} ref={(el) => { serviceRefs.current[service.id] = el }} className={`reveal delay-${(index % 4) + 1} border-b border-[#f0ece4] last:border-0`}>
                  <div className="py-7 cursor-pointer group" onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}>
                    <div className="flex items-start md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-2">
                          <h3 className="text-lg font-bold text-[#1a1a1a] group-hover:text-[#b48c3c] transition-colors duration-300">{service.title}</h3>
                        </div>
                        <p className="text-sm text-[#999] leading-relaxed max-w-2xl">{service.description}</p>
                      </div>
                      <div className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        selectedService === service.id ? "bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] border-transparent" : "border-[#e0d5c0] group-hover:border-[#b48c3c]"
                      }`}>
                        {selectedService === service.id ? <ChevronUp size={15} className="text-white" /> : <ChevronDown size={15} className="text-[#b48c3c]" />}
                      </div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ${selectedService === service.id ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"}`}>
                      <div className="bg-[#faf8f4] rounded-xl p-7 flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <h4 className="text-[11px] font-semibold text-[#b48c3c] uppercase tracking-wider mb-4">{service.includedTitle}</h4>
                          <ul className="space-y-2.5">
                            {service.features.map((f, idx) => (
                              <li key={idx} className="flex items-center gap-3 text-sm text-[#666]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#b48c3c] flex-shrink-0" /> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-end">
                          <Link href="/appointment">
                            <Button className="btn-gold text-white rounded-lg px-6 py-5 text-sm font-medium group/btn">
                              Book This Service <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-28 bg-[#faf8f4]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b48c3c]/20 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 reveal">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#b48c3c] mb-4">Testimonials</p>
              <h2 className="text-4xl md:text-[2.8rem] font-bold text-[#1a1a1a] leading-tight">What clients say</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <div key={i} className={`reveal delay-${(i % 3) + 1} bg-white rounded-xl p-7 border border-[#f0ece4] card-premium`}>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={13} className="fill-[#d4a843] text-[#d4a843]" />
                    ))}
                  </div>
                  <p className="text-[#666] leading-relaxed mb-6 text-[15px]">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#b48c3c] to-[#d4a843] flex items-center justify-center text-white font-semibold text-xs">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a1a1a] text-sm">{t.name}</p>
                      <p className="text-xs text-[#bbb]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 hero-bg relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.03] rounded-full animate-spin-slow pointer-events-none" />
          <div className="absolute top-10 left-[15%] w-[200px] h-[200px] bg-[#b48c3c]/[0.04] rounded-full blur-[80px] animate-glow pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">Ready to begin?</h2>
            <p className="text-white/40 mb-10 max-w-xl mx-auto leading-relaxed">
              Choose the service that resonates with you and book your consultation today.
            </p>
            <Link href="/appointment">
              <Button className="btn-gold text-white rounded-lg px-10 py-6 text-sm font-medium tracking-wide group">
                Book Your Consultation <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

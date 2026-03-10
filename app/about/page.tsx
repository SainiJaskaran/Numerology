"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Award, Users, Heart, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">About Me</h1>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  I&apos;m a seasoned Numerologist and Tarot Reader with over a decade of experience guiding individuals toward clarity, purpose, and balance. My approach blends ancient wisdom with practical insight, helping people understand their life path, unlock their potential, and align their energies with their true goals.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Beyond the spiritual realm, I&apos;m a fitness enthusiast who believes that mind, body, and soul work best in harmony — and I bring that philosophy into every reading and consultation I do.
                </p>
              </div>
              <div className="h-96 md:h-full rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src="/placeholder.svg?key=about01"
                  alt="Numerologist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900">My Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Numbers Don&apos;t Lie</h3>
                <p className="text-slate-700 leading-relaxed">
                  Numbers are the universal language of the cosmos. Every digit carries a unique vibration and meaning.
                  By understanding your personal numbers, you gain insight into your true nature, purpose, and
                  potential.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Empower Your Choices</h3>
                <p className="text-slate-700 leading-relaxed">
                  I believe in empowering clients with knowledge and clarity. A numerology reading isn&apos;t about
                  predicting the future—it&apos;s about understanding yourself better so you can make conscious, aligned
                  choices.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Spiritual Growth</h3>
                <p className="text-slate-700 leading-relaxed">
                  Each consultation is an opportunity for spiritual growth and self-discovery. I&apos;m here to guide
                  you toward greater self-awareness, authenticity, and alignment with your life purpose.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Holistic Approach</h3>
                <p className="text-slate-700 leading-relaxed">
                  I consider your complete picture—personal, professional, and spiritual dimensions. This holistic
                  approach ensures that your numerology reading addresses all aspects of your life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials & Highlights */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
              Experience & Expertise
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 border border-slate-200 rounded-lg p-8 text-center">
                <Award size={32} className="text-amber-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">15+</h3>
                <p className="text-slate-600">Years of Practice</p>
              </div>
              <div className="bg-gray-50 border border-slate-200 rounded-lg p-8 text-center">
                <Users size={32} className="text-amber-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">500+</h3>
                <p className="text-slate-600">Satisfied Clients</p>
              </div>
              <div className="bg-gray-50 border border-slate-200 rounded-lg p-8 text-center">
                <Heart size={32} className="text-amber-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">98%</h3>
                <p className="text-slate-600">Client Satisfaction</p>
              </div>
              <div className="bg-gray-50 border border-slate-200 rounded-lg p-8 text-center">
                <Sparkles size={32} className="text-amber-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Certified</h3>
                <p className="text-slate-600">Master Numerologist</p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900">My Journey</h2>
            <div className="space-y-8">
              <div className="relative pl-8 pb-8 border-l-2 border-amber-600">
                <div className="absolute w-4 h-4 bg-amber-600 rounded-full -left-3 top-1 mt-1"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Early Fascination</h3>
                <p className="text-slate-700 leading-relaxed">
                  From childhood, I was drawn to the mysterious ways numbers appeared in nature and human affairs. This
                  curiosity led me to study numerology formally.
                </p>
              </div>
              <div className="relative pl-8 pb-8 border-l-2 border-amber-600">
                <div className="absolute w-4 h-4 bg-amber-600 rounded-full -left-3 top-1 mt-1"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Professional Training</h3>
                <p className="text-slate-700 leading-relaxed">
                  I studied under master numerologists and spiritual teachers, earning my certification and deepening my
                  understanding of this ancient practice.
                </p>
              </div>
              <div className="relative pl-8 pb-8 border-l-2 border-amber-600">
                <div className="absolute w-4 h-4 bg-amber-600 rounded-full -left-3 top-1 mt-1"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Helping Others</h3>
                <p className="text-slate-700 leading-relaxed">
                  For over a decade, I&apos;ve dedicated myself to helping clients find clarity, purpose, and spiritual
                  alignment through personalized numerology consultations and readings.
                </p>
              </div>
              <div className="relative pl-8 border-l-2 border-amber-600">
                <div className="absolute w-4 h-4 bg-amber-600 rounded-full -left-3 top-1 mt-1"></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Continued Growth</h3>
                <p className="text-slate-700 leading-relaxed">
                  I continue to study and evolve my practice, integrating new insights and methods while honoring the
                  timeless wisdom of numerology and the holistic balance of mind, body, and soul.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Ready to Begin Your Journey?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Let&apos;s explore your numbers together and uncover the guidance waiting for you.
            </p>
            <Link href="/appointment">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-10 py-3 text-base font-semibold">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

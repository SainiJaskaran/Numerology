"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Scene3D } from "@/components/scene-3d"
import { Sparkles } from "lucide-react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="min-h-screen bg-white flex items-center relative overflow-hidden pt-10 md:pt-0">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              <div
                className={`space-y-6 transition-all duration-1000 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="inline-block">
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-amber-700 text-sm font-semibold">
                    <Sparkles size={16} />
                    POWER OF NUMBERS
                  </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                  Guiding Your Path Through Numbers and Cards.
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  Every journey is shaped by subtle energies — the patterns written in numbers and the stories whispered by the cards. I invite you to step into deeper clarity and reconnect with the wisdom already present within your life.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/appointment">
                    <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-8 py-3 text-base font-semibold">
                      Get started
                    </Button>
                  </Link>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-8 pt-12">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">500+</p>
                    <p className="text-sm text-slate-600">Happy Clients</p>
                  </div>
                  <div className="w-px h-12 bg-slate-200"></div>
                  <div>
                    <p className="text-3xl font-bold text-slate-900">15+</p>
                    <p className="text-sm text-slate-600">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">What we do</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Numerology helps to transform you. Unlock the hidden messages within your numbers and discover the path to personal growth and spiritual alignment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Destiny */}
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Destiny</h3>
                <p className="text-slate-600 leading-relaxed">
                  Understand current issues in your life and discover the path forward through numerological guidance.
                </p>
              </div>

              {/* Life Path */}
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Life path</h3>
                <p className="text-slate-600 leading-relaxed">
                  Discover your innate abilities and unlock the potential that has been within you all along.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our services</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We&apos;ll explain what each number means and how it applies to your life journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Life path number", description: "Discover the core essence of who you are and your life's purpose." },
                { title: "Your core numbers", description: "Understand the three primary numbers that shape your personality." },
                { title: "Your birth day number", description: "Learn about your natural talents and inherent strengths." },
                { title: "Your expression number", description: "Explore how you communicate and express yourself to the world." },
                { title: "Your name numerology", description: "Discover the vibration and power of your name." },
                { title: "Annual Forecast", description: "Get personalized insights for the year ahead." },
              ].map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">For beginners</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Your birth date reveals your unique powers. Start your numerology journey today and discover the hidden guidance within your numbers.
            </p>
            <Link href="/appointment">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-10 py-3 text-base font-semibold">
                Get started
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

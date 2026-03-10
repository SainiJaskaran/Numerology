"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Complete Numerology Chart",
    price: "Custom",
    duration: "Comprehensive",
    description:
      "A detailed core numerology analysis based on your date of birth covering Fate, Life Path, Soul Urge, and Personality numbers. Includes name and signature analysis, career and money guidance, relationship dynamics, health indicators, and ethical remedies with a comprehensive written report and one-on-one explanation session.",
    features: [
      "Core numerology analysis",
      "Name and signature analysis",
      "Career and money guidance",
      "Relationship and family analysis",
      "Health and energy indicators",
      "Ethical remedies and balancing tools",
      "Written report and consultation",
    ],
  },
  {
    id: 2,
    title: "Name Numerology",
    price: "Custom",
    duration: "45 minutes",
    description:
      "Your name is an active energy spoken and thought about daily. This service aligns your external identity with your inner life purpose through energetic alignment—no superstition involved.",
    features: [
      "Name vibration analysis",
      "Impact on opportunities",
      "Spelling corrections",
      "Letter adjustments",
      "Signature energy alignment",
      "Energetic alignment guidance",
    ],
  },
  {
    id: 3,
    title: "Car Numerology",
    price: "Custom",
    duration: "30 minutes",
    description:
      "Analyse your vehicle's registration number to understand how its energy aligns with your date of birth and life path. A favourable car number supports ease, protection, and fewer breakdowns.",
    features: [
      "Registration number analysis",
      "Vehicle energy assessment",
      "Safety and comfort alignment",
      "Number modification options",
      "Personal numerology matching",
      "Energetic alignment tool",
    ],
  },
  {
    id: 4,
    title: "Mobile Numerology",
    price: "Custom",
    duration: "30 minutes",
    description:
      "Analyse your mobile phone number to understand how its vibration influences communication, relationships, workflow, and finances. Align your phone number with your personal energy.",
    features: [
      "Mobile number analysis",
      "Communication impact",
      "Professional visibility",
      "Financial patterns",
      "Number optimization",
      "Personal energy alignment",
    ],
  },
  {
    id: 5,
    title: "Business Numerology",
    price: "Custom",
    duration: "60 minutes",
    description:
      "Ensure your business name, registration, and launch dates align with your purpose and birth numbers. A well-aligned business number supports growth, visibility, and consistent financial progress.",
    features: [
      "Business name analysis",
      "Registration details review",
      "Launch date recommendations",
      "Growth potential assessment",
      "Branding alignment",
      "Cash-flow optimization",
    ],
  },
  {
    id: 6,
    title: "Career Numerology",
    price: "Custom",
    duration: "60 minutes",
    description:
      "Identify careers and roles energetically aligned with your life path, strengths, and motivation patterns. Get clarity on your best-fit career path and timing for professional moves.",
    features: [
      "Career path analysis",
      "Talent identification",
      "Work environment guidance",
      "Job selection clarity",
      "Career change timing",
      "Professional growth insights",
    ],
  },
  {
    id: 7,
    title: "Marriage/Relationship Numerology",
    price: "Custom",
    duration: "75 minutes",
    description:
      "Understand emotional compatibility, communication styles, and long-term harmony between partners. Assess partner compatibility and improve understanding for mutual growth.",
    features: [
      "Compatibility analysis",
      "Communication patterns",
      "Emotional needs assessment",
      "Relationship dynamics",
      "Marriage timing guidance",
      "Harmony improvement strategies",
    ],
  },
  {
    id: 8,
    title: "Tarot Reading",
    price: "Custom",
    duration: "45 minutes",
    description:
      "An intuitive guidance tool using tarot cards to gain insight into current situations and possible outcomes. Used for relationships, career decisions, personal growth, and life transitions.",
    features: [
      "Intuitive card guidance",
      "Situation clarity",
      "Underlying influences",
      "Future possibilities",
      "Decision support",
      "Self-awareness increase",
    ],
  },
]

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Entrepreneur",
    text: "The numerology reading completely transformed my understanding of myself and my career path. The guidance was incredibly accurate and helpful.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Life Coach",
    text: "I recommend my clients to get a reading. The depth and clarity provided by this numerologist is unmatched. Truly transformative.",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "Artist",
    text: "Finally understanding my life path number helped me align with my purpose. The consultation was enlightening and empowering.",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Corporate Professional",
    text: "I was skeptical at first, but the insights were surprisingly profound and relevant to my current life situation. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emma Watson",
    role: "Wellness Coach",
    text: "The compatibility analysis my partner and I received was eye-opening. It brought us closer and helped us understand each other better.",
    rating: 5,
  },
  {
    name: "Alex Kumar",
    role: "Digital Marketer",
    text: "The business numerology consultation gave me clarity on the right timing for my ventures. Invaluable guidance!",
    rating: 5,
  },
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">Our Services</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the perfect consultation to gain clarity, direction, and spiritual alignment in your life.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-lg p-8 transition-all duration-300 cursor-pointer bg-white ${
                    selectedService === service.id
                      ? "border-amber-600 shadow-lg"
                      : "border-slate-200 hover:border-amber-600"
                  }`}
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-amber-600 font-bold text-lg mb-1">{service.price}</p>
                  <p className="text-slate-600 text-sm mb-4">{service.duration}</p>
                  <p className="text-slate-700 mb-6 leading-relaxed text-sm">{service.description}</p>

                  {/* Features - Show/Hide based on selection */}
                  {selectedService === service.id && (
                    <div className="mb-6 pb-6 border-t border-slate-200 pt-6">
                      <h4 className="font-semibold text-slate-900 mb-3">What&apos;s Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                            <span className="text-amber-600 mt-1">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link href="/appointment">
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold">
                      Book Now
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">What Our Clients Say</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Discover how numerology has transformed the lives of hundreds of clients just like you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-slate-200 rounded-lg p-8 hover:shadow-md transition-shadow"
                >
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-600 text-amber-600" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-700 mb-6 leading-relaxed italic">&quot;{testimonial.text}&quot;</p>

                  {/* Author */}
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Ready to Begin Your Journey?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Choose the service that resonates with you and book your consultation today.
            </p>
            <Link href="/appointment">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg px-10 py-3 text-base font-semibold">
                Book Your Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

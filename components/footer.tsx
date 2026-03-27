import Link from "next/link"
import { Mail, Instagram, MessageCircle, Sparkles, ArrowUpRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#111118] text-white overflow-hidden">
      {/* Gold accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#b48c3c] to-transparent opacity-60" />

      {/* Subtle glow */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-[#b48c3c]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] flex items-center justify-center">
                <Sparkles size={13} className="text-white" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Numerology</h3>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Professional numerology consultations to guide your journey with clarity and purpose.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/services", label: "Services" }, { href: "/contact", label: "Contact" }].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/45 hover:text-[#d4a843] transition-colors duration-300 text-sm group flex items-center gap-1">
                    {link.label}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-5">Services</h4>
            <ul className="space-y-3">
              {["Numerology Chart", "Name Analysis", "Tarot Reading", "Business Numerology"].map((item, i) => (
                <li key={i}>
                  <Link href="/services" className="text-white/45 hover:text-[#d4a843] transition-colors duration-300 text-sm group flex items-center gap-1">
                    {item}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-5">Connect</h4>
            <div className="flex gap-3 mb-6">
              {[
                { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
                { href: "https://wa.me/1234567890", icon: MessageCircle, label: "WhatsApp" },
                { href: "mailto:hello@numerology.com", icon: Mail, label: "Email" },
              ].map((s, i) => (
                <a key={i} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-[#b48c3c]/50 hover:bg-[#b48c3c]/10 flex items-center justify-center text-white/35 hover:text-[#d4a843] transition-all duration-300">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <div className="text-sm text-white/30 space-y-1.5">
              <p>Mon – Fri: 9 AM – 6 PM</p>
              <p>Sat: 10 AM – 4 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/25">
          <p>&copy; {currentYear} Numerology Consultations. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

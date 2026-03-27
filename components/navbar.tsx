"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, LogOut, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/articles", label: "Articles" },
    { href: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    const adminCookie = document.cookie.split("; ").find((row) => row.startsWith("admin_access="))
    setIsAdmin(!!adminCookie)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    document.cookie = "admin_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setIsAdmin(false)
    router.push("/")
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? "navbar-scrolled" : "bg-white/60 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[68px]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b48c3c] to-[#8a6b25] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-[#1a1a1a] tracking-wide">Numerology</span>
          </Link>

          <div className="hidden md:flex gap-7 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-[#555] hover:text-[#1a1a1a] transition-colors duration-200 text-[13px] font-medium tracking-wide nav-link">
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <>
                <span className="text-[11px] text-[#b48c3c] bg-[#b48c3c]/10 px-2.5 py-1 rounded-full font-semibold tracking-wide">Admin</span>
                <button onClick={handleLogout} className="text-[#555] hover:text-[#1a1a1a] transition-colors text-[13px] font-medium flex items-center gap-1.5">
                  <LogOut size={13} /> Logout
                </button>
              </>
            )}
          </div>

          <div className="hidden md:block">
            <Link href="/appointment">
              <Button className="btn-gold text-white text-[13px] font-medium tracking-wide px-6 py-2.5 rounded-lg">
                Book Consultation
              </Button>
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-400 ${isOpen ? "max-h-[420px] opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
          <div className="pt-3 border-t border-[#eee] space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="block py-3 px-3 text-[#555] hover:text-[#1a1a1a] hover:bg-[#fafaf8] rounded-lg text-sm font-medium transition-all"
                onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <button onClick={() => { handleLogout(); setIsOpen(false) }}
                className="block py-3 px-3 text-[#555] hover:text-[#1a1a1a] text-sm font-medium flex items-center gap-2 w-full text-left">
                <LogOut size={14} /> Logout
              </button>
            )}
            <div className="pt-3">
              <Link href="/appointment" onClick={() => setIsOpen(false)}>
                <Button className="w-full btn-gold text-white text-sm font-medium py-3 rounded-lg">Book Consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

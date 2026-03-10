"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/articles", label: "Articles" },
    { href: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    // Check for admin session cookie
    const adminCookie = document.cookie.split("; ").find((row) => row.startsWith("admin_session="))
    setIsAdmin(!!adminCookie)
  }, [])

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setIsAdmin(false)
    router.push("/")
  }

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl font-bold text-primary hover:text-accent transition-colors">
            Numerology
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium text-sm nav-link"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin ? (
              <>
                <span className="text-sm text-muted-foreground">Admin</span>
                <button
                  onClick={handleLogout}
                  className="text-foreground hover:text-primary transition-colors font-medium text-sm flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="text-foreground hover:text-primary transition-colors font-medium text-sm nav-link"
              >
                Admin Login
              </Link>
            )}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/appointment">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
                Book Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-foreground hover:text-primary hover:underline transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin ? (
              <>
                <div className="py-2 text-sm text-muted-foreground">Admin</div>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2 w-full text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="block py-2 text-foreground hover:text-primary hover:underline transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            )}
            <Link href="/appointment" className="block mt-4" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
                Book Consultation
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function useScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observe = () => {
      const elements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale, .timeline-line, .timeline-dot"
      )

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible")
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      )

      elements.forEach((el) => {
        // Reset visibility on route change so animations replay
        el.classList.remove("visible")
        observer.observe(el)
      })

      return () => observer.disconnect()
    }

    // Small delay to ensure DOM is ready after navigation
    const timer = setTimeout(observe, 50)
    return () => clearTimeout(timer)
  }, [pathname])
}

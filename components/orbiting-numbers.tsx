"use client"

import { useEffect, useRef } from "react"

const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

export function OrbitingNumbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener("resize", resize)

    const centerX = () => canvas.width / (2 * dpr)
    const centerY = () => canvas.height / (2 * dpr)

    // Each number starts at a random angle spread around the circle
    const particles = NUMBERS.map((num, i) => {
      const orbitIndex = i % 3
      const baseRadius = [110, 155, 205][orbitIndex]
      const radiusVariation = (Math.random() - 0.5) * 25

      // Random starting angle — evenly spread with randomness
      const startAngle = (i / NUMBERS.length) * Math.PI * 2 + (Math.random() - 0.5) * 1.2

      return {
        num,
        radius: baseRadius + radiusVariation,
        startAngle,
        speed: (0.12 + Math.random() * 0.18) * (i % 2 === 0 ? 1 : -1),
        fontSize: 18 + Math.random() * 12,
        opacity: 0.25 + Math.random() * 0.25,
        wobbleSpeed: 0.4 + Math.random() * 0.8,
        wobbleAmount: 4 + Math.random() * 8,
      }
    })

    const rings = [
      { radius: 110, opacity: 0.08, speed: 0.25 },
      { radius: 155, opacity: 0.12, speed: -0.18 },
      { radius: 205, opacity: 0.06, speed: 0.12 },
    ]

    const draw = (time: number) => {
      const t = time / 1000
      const cx = centerX()
      const cy = centerY()

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      // Orbit rings
      rings.forEach((ring) => {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(t * ring.speed * 0.05)
        ctx.beginPath()
        ctx.arc(0, 0, ring.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(212, 168, 67, ${ring.opacity})`
        ctx.lineWidth = 1
        ctx.setLineDash([5, 10])
        ctx.lineDashOffset = t * ring.speed * 15
        ctx.stroke()
        ctx.restore()
      })

      // Numbers orbiting from their own starting positions
      particles.forEach((p) => {
        const angle = p.startAngle + t * p.speed
        const wobble = Math.sin(t * p.wobbleSpeed) * p.wobbleAmount
        const x = cx + Math.cos(angle) * (p.radius + wobble)
        const y = cy + Math.sin(angle) * (p.radius + wobble)

        const pulseOpacity = p.opacity + Math.sin(t * 1.5 + p.startAngle) * 0.08

        ctx.save()
        ctx.font = `bold ${p.fontSize}px "Playfair Display", Georgia, serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = `rgba(212, 168, 67, ${pulseOpacity})`
        ctx.fillText(p.num, x, y)
        ctx.restore()
      })

      // Center glow
      const glowOpacity = 0.2 + Math.sin(t * 2) * 0.08
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35)
      gradient.addColorStop(0, `rgba(212, 168, 67, ${glowOpacity})`)
      gradient.addColorStop(1, "rgba(212, 168, 67, 0)")
      ctx.beginPath()
      ctx.arc(cx, cy, 35, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[450px] h-[450px] hidden lg:block pointer-events-none"
    />
  )
}

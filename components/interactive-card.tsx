"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverEffect?: "tilt" | "scale" | "glow" | "lift" | "none"
  glowColor?: string
}

export default function InteractiveCard({
  children,
  className,
  onClick,
  hoverEffect = "tilt",
  glowColor = "rgba(139, 92, 246, 0.4)",
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || hoverEffect !== "tilt") return

    const { clientX, clientY } = e
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()

    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    setTilt({ x: x * 10, y: -y * 10 })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const getHoverStyles = () => {
    switch (hoverEffect) {
      case "tilt":
        return {
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.2s ease-out",
        }
      case "scale":
        return {
          transform: isHovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.2s ease-out",
        }
      case "glow":
        return {
          boxShadow: isHovered ? `0 0 20px ${glowColor}` : "none",
          transition: "box-shadow 0.3s ease-out",
        }
      case "lift":
        return {
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          transition: "transform 0.2s ease-out",
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={getHoverStyles()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
      {hoverEffect === "glow" && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, rgba(0, 0, 0, 0) 70%)`,
            opacity: 0.4,
          }}
        />
      )}
    </motion.div>
  )
}

"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glareEnabled?: boolean
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  perspective?: number
}

export default function TiltCard({
  children,
  className = "",
  glareEnabled = true,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  perspective = 1000,
}: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glarePosition: { x: 0, y: 0 } })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()

    const x = (clientX - left) / width
    const y = (clientY - top) / height

    const tiltX = tiltMaxAngleY / 2 - x * tiltMaxAngleY
    const tiltY = tiltMaxAngleX / 2 - y * tiltMaxAngleX

    setTilt({
      x: tiltX,
      y: -tiltY,
      glarePosition: { x, y },
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glarePosition: { x: 0.5, y: 0.5 } })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: tilt.y,
        rotateY: tilt.x,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}

      {glareEnabled && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.glarePosition.x * 100}% ${tilt.glarePosition.y * 100}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 60%)`,
          }}
        />
      )}
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingShapesProps {
  count?: number
  className?: string
  colors?: string[]
  shapes?: ("circle" | "square" | "triangle" | "donut")[]
  minSize?: number
  maxSize?: number
}

export default function FloatingShapes({
  count = 15,
  className,
  colors = ["#8b5cf6", "#06b6d4", "#f472b6", "#10b981"],
  shapes = ["circle", "square", "triangle", "donut"],
  minSize = 10,
  maxSize = 40,
}: FloatingShapesProps) {
  const shapesArray = Array.from({ length: count }, (_, i) => {
    const size = Math.floor(Math.random() * (maxSize - minSize) + minSize)
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    const color = colors[Math.floor(Math.random() * colors.length)]
    const left = `${Math.random() * 100}%`
    const top = `${Math.random() * 100}%`
    const duration = Math.random() * 20 + 10
    const delay = Math.random() * 5

    return { id: i, size, shape, color, left, top, duration, delay }
  })

  const renderShape = (shape: string, size: number, color: string) => {
    switch (shape) {
      case "circle":
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        )
      case "square":
        return (
          <div
            className="rounded-md"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          />
        )
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        )
      case "donut":
        return (
          <div
            className="rounded-full border-4"
            style={{
              width: size,
              height: size,
              borderColor: color,
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {shapesArray.map((item) => (
        <motion.div
          key={item.id}
          className="absolute opacity-30"
          style={{
            left: item.left,
            top: item.top,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {renderShape(item.shape, item.size, item.color)}
        </motion.div>
      ))}
    </div>
  )
}

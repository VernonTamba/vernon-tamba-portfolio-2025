"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string
  variant?: "wave" | "angle" | "curve" | "zigzag"
  position?: "top" | "bottom"
  fillColor?: string
}

export default function SectionDivider({
  className,
  variant = "wave",
  position = "bottom",
  fillColor = "hsl(222, 47%, 11%)",
}: SectionDividerProps) {
  const isTop = position === "top"
  const transform = isTop ? "rotate(180deg)" : ""

  const renderPath = () => {
    switch (variant) {
      case "wave":
        return (
          <path
            d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,64L1392,64C1344,64,1248,64,1152,64C1056,64,960,64,864,64C768,64,672,64,576,64C480,64,384,64,288,64C192,64,96,64,48,64L0,64Z"
            fill={fillColor}
          />
        )
      case "angle":
        return <path d="M0,0L1440,64L1440,64L0,64Z" fill={fillColor} />
      case "curve":
        return <path d="M0,64L1440,0L1440,64L0,64Z" fill={fillColor} />
      case "zigzag":
        return (
          <path
            d="M0,32L120,48C240,64,480,96,720,96C960,96,1200,64,1320,48L1440,32L1440,64L1320,64C1200,64,960,64,720,64C480,64,240,64,120,64L0,64Z"
            fill={fillColor}
          />
        )
      default:
        return <path d="M0,0L1440,64L1440,64L0,64Z" fill={fillColor} />
    }
  }

  return (
    <motion.div
      className={cn("w-full overflow-hidden", className)}
      style={{ transform }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        preserveAspectRatio="none"
        width="100%"
        height="64"
        viewBox="0 0 1440 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderPath()}
      </svg>
    </motion.div>
  )
}

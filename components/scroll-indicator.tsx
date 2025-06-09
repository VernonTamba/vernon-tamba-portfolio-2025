"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
  className?: string
  targetId?: string
}

export default function ScrollIndicator({ className, targetId = "about" }: ScrollIndicatorProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div
      className={cn("flex flex-col items-center cursor-pointer", className)}
      onClick={handleClick}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <motion.div
        className="text-gray-400 text-sm mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        Scroll Down
      </motion.div>
      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
        <ChevronDown className="w-6 h-6 text-primary" />
      </motion.div>
    </motion.div>
  )
}

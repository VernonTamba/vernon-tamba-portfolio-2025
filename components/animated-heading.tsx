"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedHeadingProps {
  title: string
  icon?: React.ReactNode
  subtitle?: string
}

export default function AnimatedHeading({ title, icon, subtitle }: AnimatedHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Split title into characters for animation
  const characters = title.split("")

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center mb-16 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {icon && (
        <motion.div
          className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="text-primary"
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>

          {/* Decorative circles */}
          <motion.div
            className="absolute w-28 h-28 rounded-full border border-primary/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div
            className="absolute w-36 h-36 rounded-full border border-primary/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.div>
      )}

      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center overflow-hidden flex flex-wrap justify-center neon-text">
          {characters.map((char, index) => (
            <motion.span
              key={index}
              className={char === " " ? "mr-3" : "inline-block"}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.03 * index }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>

        <motion.div
          className="h-1 bg-gradient-to-r from-primary via-purple-400 to-accent rounded-full mt-4 mx-auto"
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {subtitle && (
          <motion.p
            className="text-gray-400 text-center mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

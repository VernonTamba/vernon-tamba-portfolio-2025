"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface TimelineItem {
  company?: string
  institution?: string
  position?: string
  degree?: string
  period: string
  description: string
  icon: React.ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function TimelineComponent({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-5 bottom-5 w-0.5 bg-gradient-to-b from-purple-500 via-purple-500/50 to-transparent" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="relative pl-16"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Icon */}
      <motion.div
        className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gray-800 border-2 border-purple-500 flex items-center justify-center z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2, type: "spring" }}
      >
        <div className="text-purple-500">{item.icon}</div>
      </motion.div>

      <div className="bg-gray-900/70 p-6 rounded-lg border border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-bold text-white">{item.company || item.institution}</h3>
          <span className="text-sm text-purple-400 mt-1 md:mt-0">{item.period}</span>
        </div>
        <h4 className="text-lg font-medium text-gray-300 mb-3">{item.position || item.degree}</h4>
        <p className="text-gray-400">{item.description}</p>
      </div>
    </motion.div>
  )
}

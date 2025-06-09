"use client"

import type React from "react"

import { motion } from "framer-motion"
import AnimatedCounter from "./animated-counter"
import { cn } from "@/lib/utils"

interface Stat {
  value: number
  label: string
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
}

interface StatsCounterProps {
  stats: Stat[]
  className?: string
}

export default function StatsCounter({ stats, className }: StatsCounterProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-6", className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-card/70 rounded-lg p-6 text-center border border-border backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)" }}
        >
          {stat.icon && (
            <motion.div
              className="flex justify-center mb-3"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
            >
              <div className="p-2 rounded-full bg-primary/20 text-primary">{stat.icon}</div>
            </motion.div>
          )}
          <AnimatedCounter
            end={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            delay={0.2 + index * 0.1}
            className="text-3xl font-bold text-white"
          />
          <p className="text-gray-200 mt-2">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

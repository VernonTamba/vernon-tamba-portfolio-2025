"use client"

import { motion } from "framer-motion"

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left elements */}
      <motion.div
        className="absolute top-20 left-[10%] w-16 h-16 rounded-full bg-purple-500/10 blur-xl"
        animate={{
          y: [0, 15, 0],
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Top right elements */}
      <motion.div
        className="absolute top-40 right-[15%] w-24 h-24 rounded-full bg-cyan-500/10 blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Middle left elements */}
      <motion.div
        className="absolute top-[40%] left-[5%] w-32 h-32 rounded-full bg-purple-600/10 blur-xl"
        animate={{
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Middle right elements */}
      <motion.div
        className="absolute top-[60%] right-[8%] w-20 h-20 rounded-full bg-cyan-600/10 blur-xl"
        animate={{
          x: [0, -15, 0],
          y: [0, 10, 0],
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Bottom elements */}
      <motion.div
        className="absolute bottom-[15%] left-[30%] w-28 h-28 rounded-full bg-purple-500/10 blur-xl"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Small floating elements */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-purple-400/30"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() > 0.5 ? 20 : -20, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  )
}

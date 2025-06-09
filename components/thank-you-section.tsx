"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Code, Users, Sparkles } from "lucide-react"
import FloatingShapes from "./floating-shapes"

export default function ThankYouSection() {
  return (
    <section className="py-20 bg-secondary/5 relative overflow-hidden">
      <FloatingShapes />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Hand Wave */}
          <motion.div
            className="text-8xl mb-8"
            animate={{
              rotate: [0, 14, -8, 14, -4, 10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          >
            👋
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 gradient-text neon-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Thank You!
          </motion.h2>

          <motion.p
            className="text-xl text-white mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Thank you for taking the time to explore my portfolio. I'm excited about the possibility of working together
            and bringing your ideas to life!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              className="border-accent text-white hover:bg-accent/20"
              onClick={() => window.open("mailto:vernon.tamba777@gmail.com")}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </motion.div>

          {/* Decorative elements */}
          <div className="mt-12 flex justify-center space-x-8">
            {[
              { icon: <Code />, label: "Clean Code" },
              { icon: <Users />, label: "Team Player" },
              { icon: <Sparkles />, label: "Creative" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2 text-primary">
                  {item.icon}
                </div>
                <span className="text-sm text-gray-200">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

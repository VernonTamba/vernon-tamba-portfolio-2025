"use client"

import type React from "react"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  company: string
  description: string
  role: string
  contributions: string[]
  technologies: string[]
  image: string
  icon?: React.ReactNode
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover rounded-t-lg"
            onError={(e) => {
              e.currentTarget.src = "/images/fallback-project.jpg"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-2">
            <span className="text-sm text-purple-400">{project.company}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h2>
          <p className="text-gray-300 mb-6">{project.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="w-1 h-6 bg-purple-500 mr-3 rounded-full"></span>
              Role
            </h3>
            <p className="text-gray-300 ml-4">{project.role}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="w-1 h-6 bg-purple-500 mr-3 rounded-full"></span>
              Contributions
            </h3>
            <ul className="list-disc pl-10 space-y-2 text-gray-300">
              {project.contributions.map((contribution, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {contribution}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <span className="w-1 h-6 bg-purple-500 mr-3 rounded-full"></span>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

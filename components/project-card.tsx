"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import SkillIcon from "./skill-icon"

interface ProjectCardProps {
  id: string
  title: string
  company: string
  description: string
  technologies: string[]
  image: string
  icon?: React.ReactNode
  delay?: number
  onClick: () => void
}

export default function ProjectCard({
  id,
  title,
  company,
  description,
  technologies,
  image,
  icon,
  delay = 0,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.div
      className="bg-card/70 rounded-lg overflow-hidden border border-border h-full flex flex-col group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "rgba(139, 92, 246, 0.5)",
      }}
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/images/fallback-project.jpg"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {icon && (
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-border/50">
            <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }} className="text-primary">
              {icon}
            </motion.div>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs text-gray-200">{company}</span>
        </div>
        <motion.h3
          className="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-200 mb-4 flex-1 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-3 mt-auto mb-4">
          {technologies.slice(0, 5).map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <SkillIcon name={tech} size={18} />
            </motion.div>
          ))}
          {technologies.length > 5 && (
            <motion.span
              className="text-xs px-2 py-1 bg-secondary/50 rounded-full text-white flex items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.2)" }}
            >
              +{technologies.length - 5} more
            </motion.span>
          )}
        </div>

        <motion.div
          className="flex items-center text-primary text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ x: 5 }}
        >
          View Details <ExternalLink className="ml-1 h-3 w-3" />
        </motion.div>
      </div>
    </motion.div>
  )
}

"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Terminal, MessageSquare } from "lucide-react"

interface Skill {
  name: string
  level: number
}

interface SkillsVisualizerProps {
  technicalSkills: Skill[]
  toolsSkills: Skill[]
  softSkills: string[]
}

export default function SkillsVisualizer({ technicalSkills, toolsSkills, softSkills }: SkillsVisualizerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-8">
        <SkillCategory title="Technical Skills" icon={<Code />} skills={technicalSkills} />
        <SkillCategory title="Tools & Platforms" icon={<Terminal />} skills={toolsSkills} />
      </div>
      <div>
        <SoftSkills title="Soft Skills" icon={<MessageSquare />} skills={softSkills} />
      </div>
    </div>
  )
}

function SkillCategory({ title, icon, skills }: { title: string; icon: React.ReactNode; skills: Skill[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="bg-gray-900/70 p-6 rounded-lg border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
          <div className="text-purple-500">{icon}</div>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="space-y-2"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between">
              <span className="text-gray-300">{skill.name}</span>
              <span className="text-purple-400">{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function SoftSkills({ title, icon, skills }: { title: string; icon: React.ReactNode; skills: string[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="bg-gray-900/70 p-6 rounded-lg border border-gray-800 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
          <div className="text-purple-500">{icon}</div>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/50 p-4 rounded-lg flex items-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
          >
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
            </div>
            <span className="text-gray-300">{skill}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

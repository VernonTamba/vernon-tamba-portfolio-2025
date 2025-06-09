"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Code,
  Database,
  Layers,
  Terminal,
  Palette,
  Globe,
  Server,
  GitBranch,
  FileCode,
  Layout,
  Cpu,
  Settings,
  MessageSquare,
  Users,
  Zap,
  Search,
  CheckCircle,
} from "lucide-react"

interface SkillCategory {
  name: string
  skills: string[]
  icon: React.ReactNode
}

export default function SkillGrid() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Layout size={24} />,
      skills: ["HTML", "CSS/SCSS", "JavaScript", "TypeScript", "React JS", "Next.js", "Angular", "Tailwind CSS"],
    },
    {
      name: "Tools & Version Control",
      icon: <GitBranch size={24} />,
      skills: ["Git", "GitHub", "GitLab", "BitBucket", "VS Code", "Figma", "Jira", "Confluence"],
    },
    {
      name: "API & Backend",
      icon: <Server size={24} />,
      skills: ["RESTful API", "Postman", "Swagger", "Node.js", "C#/.NET", "SQL Server"],
    },
    {
      name: "Soft Skills",
      icon: <MessageSquare size={24} />,
      skills: ["Communication", "Problem Solving", "Teamwork", "Detail-oriented", "High-principled"],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skillCategories.map((category, index) => (
        <SkillCategory key={category.name} category={category} index={index} />
      ))}
    </div>
  )
}

function SkillCategory({ category, index }: { category: SkillCategory; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="bg-card/70 p-6 rounded-lg border border-border backdrop-blur-sm card-3d"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ boxShadow: "0 0 25px rgba(139, 92, 246, 0.2)" }}
    >
      <div className="flex items-center mb-6 card-3d-content">
        <motion.div
          className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2, type: "spring" }}
        >
          <div className="text-primary">{category.icon}</div>
        </motion.div>
        <h3 className="text-xl font-bold">{category.name}</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {category.skills.map((skill, skillIndex) => (
          <SkillItem key={skill} skill={skill} index={skillIndex} isInView={isInView} />
        ))}
      </div>
    </motion.div>
  )
}

function SkillItem({ skill, index, isInView }: { skill: string; index: number; isInView: boolean }) {
  // Map skill names to icons
  const getSkillIcon = (skillName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      HTML: <Code size={18} />,
      "CSS/SCSS": <Palette size={18} />,
      JavaScript: <FileCode size={18} />,
      TypeScript: <FileCode size={18} />,
      "React JS": <Code size={18} />,
      "Next.js": <Layers size={18} />,
      Angular: <Code size={18} />,
      "Tailwind CSS": <Palette size={18} />,
      Git: <GitBranch size={18} />,
      GitHub: <GitBranch size={18} />,
      GitLab: <GitBranch size={18} />,
      BitBucket: <GitBranch size={18} />,
      "VS Code": <Terminal size={18} />,
      Figma: <Layout size={18} />,
      Jira: <Settings size={18} />,
      Confluence: <MessageSquare size={18} />,
      "RESTful API": <Globe size={18} />,
      Postman: <Globe size={18} />,
      Swagger: <Globe size={18} />,
      "Node.js": <Server size={18} />,
      "C#/.NET": <Cpu size={18} />,
      "SQL Server": <Database size={18} />,
      Communication: <MessageSquare size={18} />,
      "Problem Solving": <Zap size={18} />,
      Teamwork: <Users size={18} />,
      "Detail-oriented": <Search size={18} />,
      "High-principled": <CheckCircle size={18} />,
    }

    return iconMap[skillName] || <Code size={18} />
  }

  return (
    <motion.div
      className="bg-secondary/50 rounded-lg p-3 flex items-center gap-2 group card-3d-content"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
      whileHover={{
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <div className="text-primary group-hover:text-accent transition-colors">{getSkillIcon(skill)}</div>
      <span className="text-sm text-white group-hover:text-primary transition-colors">{skill}</span>
    </motion.div>
  )
}

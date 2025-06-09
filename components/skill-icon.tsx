"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiGitlab,
  SiBitbucket,
  SiFigma,
  SiJira,
  SiConfluence,
  SiPostman,
  SiNodedotjs,
  SiDotnet,
} from "react-icons/si"
import {
  Database,
  Code,
  FileCode,
  Globe,
  MessageSquare,
  Lightbulb,
  Users,
  Eye,
  Shield,
  Layout,
  Layers,
} from "lucide-react" // Import additional Lucide icons
import type { IconType } from "react-icons"

interface SkillIconProps {
  name: string
  size?: number
  className?: string
  showTooltip?: boolean
}

export default function SkillIcon({ name, size = 24, className, showTooltip = true }: SkillIconProps) {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "")

  // Create a wrapper for Lucide icons to match the react-icons interface
  const createLucideWrapper = (LucideIcon: any) => {
    return ({ size, color }: { size: number; color: string }) => <LucideIcon size={size} color={color} />
  }

  // Lucide icons
  const DatabaseIcon = createLucideWrapper(Database)
  const CodeIcon = createLucideWrapper(Code)
  const FileCodeIcon = createLucideWrapper(FileCode)
  const GlobeIcon = createLucideWrapper(Globe)
  const MessageSquareIcon = createLucideWrapper(MessageSquare)
  const LightbulbIcon = createLucideWrapper(Lightbulb)
  const UsersIcon = createLucideWrapper(Users)
  const EyeIcon = createLucideWrapper(Eye)
  const ShieldIcon = createLucideWrapper(Shield)

  const iconMap: Record<string, { icon: IconType | any; color: string }> = {
    html: { icon: SiHtml5, color: "#E34F26" },
    html5: { icon: SiHtml5, color: "#E34F26" },
    css: { icon: SiCss3, color: "#1572B6" },
    css3: { icon: SiCss3, color: "#1572B6" },
    cssscss: { icon: SiCss3, color: "#1572B6" },
    scss: { icon: SiCss3, color: "#CF649A" },
    javascript: { icon: SiJavascript, color: "#F7DF1E" },
    typescript: { icon: SiTypescript, color: "#3178C6" },
    react: { icon: SiReact, color: "#61DAFB" },
    reactjs: { icon: SiReact, color: "#61DAFB" },
    nextjs: { icon: SiNextdotjs, color: "#ffffff" },
    angular: { icon: SiAngular, color: "#DD0031" },
    tailwind: { icon: SiTailwindcss, color: "#06B6D4" },
    tailwindcss: { icon: SiTailwindcss, color: "#06B6D4" },
    git: { icon: SiGit, color: "#F05032" },
    github: { icon: SiGithub, color: "#ffffff" },
    gitlab: { icon: SiGitlab, color: "#FC6D26" },
    bitbucket: { icon: SiBitbucket, color: "#0052CC" },
    vscode: { icon: CodeIcon, color: "#007ACC" },
    visualstudio: { icon: CodeIcon, color: "#5C2D91" },
    figma: { icon: SiFigma, color: "#F24E1E" },
    jira: { icon: SiJira, color: "#0052CC" },
    confluence: { icon: SiConfluence, color: "#172B4D" },
    primeng: { icon: SiAngular, color: "#DD0031" }, // Using Angular icon for PrimeNG
    primeflex: { icon: createLucideWrapper(Layout), color: "#007ACC" }, // Using Layout icon for PrimeFlex
    metronics: { icon: createLucideWrapper(Layers), color: "#6366F1" }, // Using Layers icon for Metronics
    restfulapi: { icon: GlobeIcon, color: "#4CAF50" },
    restful: { icon: GlobeIcon, color: "#4CAF50" },
    api: { icon: GlobeIcon, color: "#4CAF50" },
    postman: { icon: SiPostman, color: "#FF6C37" },
    swagger: { icon: FileCodeIcon, color: "#85EA2D" },
    nodejs: { icon: SiNodedotjs, color: "#339933" },
    csharp: { icon: SiDotnet, color: "#239120" },
    cnet: { icon: SiDotnet, color: "#512BD4" },
    sqlserver: { icon: DatabaseIcon, color: "#CC2927" },
    sql: { icon: DatabaseIcon, color: "#CC2927" },
    database: { icon: DatabaseIcon, color: "#4479A1" },
    // Soft skills icons
    communication: { icon: MessageSquareIcon, color: "#FF6B6B" },
    problemsolving: { icon: LightbulbIcon, color: "#4ECDC4" },
    problem: { icon: LightbulbIcon, color: "#4ECDC4" },
    solving: { icon: LightbulbIcon, color: "#4ECDC4" },
    teamwork: { icon: UsersIcon, color: "#45B7D1" },
    team: { icon: UsersIcon, color: "#45B7D1" },
    detailoriented: { icon: EyeIcon, color: "#96CEB4" },
    detail: { icon: EyeIcon, color: "#96CEB4" },
    oriented: { icon: EyeIcon, color: "#96CEB4" },
    highprincipled: { icon: ShieldIcon, color: "#FFEAA7" },
    high: { icon: ShieldIcon, color: "#FFEAA7" },
    principled: { icon: ShieldIcon, color: "#FFEAA7" },
  }

  // Find the icon based on the normalized name or parts of it
  const iconEntry = Object.entries(iconMap).find(([key]) => normalizedName.includes(key))

  if (!iconEntry) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <span className="text-gray-400">{name}</span>
      </div>
    )
  }

  const [_, { icon: Icon, color }] = iconEntry

  return (
    <motion.div className={cn("relative group", className)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Icon size={size} color={color} />

      {showTooltip && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  )
}

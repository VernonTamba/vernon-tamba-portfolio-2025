"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <div className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentIcon = () => {
    if (resolvedTheme === "dark") {
      return <Moon className="h-5 w-5 text-blue-400" />
    } else {
      return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <motion.div
            key={resolvedTheme}
            initial={{ scale: 0.8, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {currentIcon()}
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`flex items-center gap-3 cursor-pointer ${theme === "light" ? "bg-primary/20" : ""}`}
        >
          <Sun className="h-4 w-4 text-yellow-500" />
          <span className={theme === "light" ? "font-medium" : ""}>Light</span>
          {theme === "light" && (
            <motion.div
              className="ml-auto w-2 h-2 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-3 cursor-pointer ${theme === "dark" ? "bg-primary/20" : ""}`}
        >
          <Moon className="h-4 w-4 text-blue-400" />
          <span className={theme === "dark" ? "font-medium" : ""}>Dark</span>
          {theme === "dark" && (
            <motion.div
              className="ml-auto w-2 h-2 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`flex items-center gap-3 cursor-pointer ${theme === "system" ? "bg-primary/20" : ""}`}
        >
          <Monitor className="h-4 w-4 text-gray-500" />
          <span className={theme === "system" ? "font-medium" : ""}>System</span>
          {theme === "system" && (
            <motion.div
              className="ml-auto w-2 h-2 rounded-full bg-primary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Layers,
  Briefcase,
  User,
  MapPin,
  Phone,
  GraduationCap,
  Building,
  Award,
  Users,
  Sparkles,
  Clock,
  Coffee,
  CheckCircle,
  Star,
  X,
  FolderOpen,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import EnhancedParticleBackground from "@/components/enhanced-particle-background";
import CustomCursor from "@/components/custom-cursor";
import MagneticButton from "@/components/magnetic-button";
import InteractiveCard from "@/components/interactive-card";
import SectionDivider from "@/components/section-divider";
import ScrollIndicator from "@/components/scroll-indicator";
import FloatingShapes from "@/components/floating-shapes";
import AnimatedTimeline from "@/components/animated-timeline";
import ProjectCard from "@/components/project-card";
import StatsCounter from "@/components/stats-counter";
import SkillIcon from "@/components/skill-icon";
import ThankYouSection from "@/components/thank-you-section";

// Add this component definition after the imports and before the Home component
function NavLink({
  href,
  children,
  isActive = false,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative text-gray-300 hover:text-white transition-colors group ${
        isActive ? "text-white" : ""
      }`}
    >
      {children}
      <motion.span
        className={`absolute left-0 bottom-0 h-0.5 bg-primary ${
          isActive ? "w-full" : "w-0"
        }`}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

// Also add the MobileNavLink component definition
function MobileNavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors"
    >
      <div className="p-2 rounded-full bg-secondary/50 hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  );
}

// And the SocialIcon component
function SocialIcon({
  icon,
  href,
  small = false,
}: {
  icon: React.ReactNode;
  href: string;
  small?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${
        small ? "w-8 h-8" : "w-10 h-10"
      } flex items-center justify-center rounded-full bg-secondary hover:bg-primary transition-colors`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
    </motion.a>
  );
}

// Add ContactButton component for the new Get In Touch section
function ContactButton({
  icon,
  label,
  href,
  color,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl p-8 bg-card/70 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -10,
        boxShadow: `0 20px 40px -10px ${color}40`,
      }}
    >
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: `${color}20` }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ color }}>{icon}</div>
        </motion.div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {label}
        </h3>
        <motion.div
          className="w-12 h-0.5 rounded-full group-hover:w-full transition-all duration-300"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Hover effect background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${color}10 0%, transparent 70%)`,
        }}
      />
    </motion.a>
  );
}

// Futuristic loader component
function FuturisticLoader() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
      </motion.div>

      {/* Grid lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-px w-full bg-primary/50"
            style={{ top: `${i * 5}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.05 }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px h-full bg-primary/50"
            style={{ left: `${i * 5}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.05 }}
          />
        ))}
      </div>

      {/* Central hexagon */}
      <motion.div
        className="relative z-10 mb-12"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="w-32 h-32 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <motion.path
              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
              fill="none"
              stroke="url(#hexGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient
                id="hexGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner rotating elements */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border border-primary/50" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="text-4xl md:text-6xl font-bold text-center z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.5 },
        }}
      >
        <span className="gradient-text neon-text">Welcome to my Portfolio</span>
      </motion.div>

      {/* Loading text with typing effect */}
      <motion.div
        className="mt-8 text-primary/80 font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="inline-block">Initializing</span>
        <motion.span
          className="inline-block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          _
        </motion.span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="mt-6 w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/80"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const isMobile = useMobile();

  // Scroll progress for progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Simulate loading time for welcome animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // Extended loading time to showcase the animation

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events for navbar and section detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = [
        "home",
        "about",
        "experience",
        "projects",
        "skills",
        "education",
        "contact",
      ];

      // Update navbar visibility
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Determine active section
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax background effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);

  // Project data with updated icons
  const projects = [
    {
      id: "kopra",
      title: "Kopra by Mandiri",
      company: "Bank Mandiri Persero Tbk (Lawencon International)",
      description:
        "A digital platform by Bank Mandiri that streamlines corporate financial management with tools for cash management, trade financing, and real-time transaction monitoring.",
      role: "Frontend Developer",
      contributions: [
        "Contributed to the frontend side of the application, specifically in the common features of Cash Management (MCM) and Trade Guarantee (MGT) channels",
        "Converted UI designs into a fully integrated features for the web application",
        "Conducted unit testing and optimization checks to ensure efficiency and safety of the codes",
        "Managed assigned tasks and updated work progress using Jira",
      ],
      technologies: [
        "Angular",
        "React JS",
        "Tailwind CSS",
        "Figma",
        "Jira",
        "Confluence",
        "BitBucket",
        "Git",
      ],
      image: "/images/kopra.png",
      icon: <Layers />,
    },
    {
      id: "dms",
      title: "Document Management System",
      company: "Patra Jasa (Lawencon International)",
      description:
        "A web-based application that has the main purpose to give access for the users to save, store, and access their documents with ease.",
      role: "Frontend Developer",
      contributions: [
        "Developed the user interface of DMS application and integrated the features with the backend APIs",
        "Collaborated with Product Manager and other developers to produce the desired product",
      ],
      technologies: [
        "Angular",
        "SCSS",
        "PrimeNG",
        "PrimeFlex",
        "Swagger",
        "Postman",
        "Git",
        "GitHub",
        "Figma",
      ],
      image: "/images/dms.png",
      icon: <FolderOpen />,
    },
    {
      id: "linovhr",
      title: "LinovHR for KRM",
      company: "Linov Rocket Prestasi (Lawencon International)",
      description:
        "A Human Resource web application that aims to provide an easy and powerful tool to manage HR-related tasks in a business effectively and efficiently.",
      role: "Frontend Developer",
      contributions: [
        "Assigned to develop one of the features in LinovHR, which is Donation Request (submenu of Reimbursement)",
      ],
      technologies: [
        "Angular",
        "SCSS",
        "PrimeNG",
        "PrimeFlex",
        "Swagger",
        "Postman",
        "Git",
        "GitHub",
        "Figma",
      ],
      image: "/images/linovhr.png",
      icon: <UserCheck />,
    },
    {
      id: "hrm",
      title: "Human Resource Management (HRM)",
      company: "Adi Data Informatika",
      description:
        "An internal web-based application that has the main purpose to manage the important data and information needed for the HR department and the whole recruitment process.",
      role: "Frontend Developer",
      contributions: [
        "Contributed to the frontend side of the application which includes the CRUD operations integration",
        "Refactoring some of the codes, fixing bugs or defects",
      ],
      technologies: [
        "React JS",
        "Next JS",
        "PrimeReact",
        "Metronics",
        "Swagger",
        "Postman",
        "Git",
        "GitLab",
      ],
      image: "/images/hrm.png",
      icon: <Users />,
    },
  ];

  // Work experience data
  const experiences = [
    {
      title: "Frontend Developer",
      subtitle: "Adi Data Informatika",
      period: "February 2024 - Present",
      description:
        "Developing an internal web application called Human Resource Management (HRM) for managing HR data and recruitment processes.",
      icon: <Building />,
      tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Frontend Developer",
      subtitle: "Lawencon International (Bank Mandiri Persero Tbk)",
      period: "May 2024 - December 2024",
      description:
        "Developed Kopra by Mandiri, translating UI designs into code and integrating with backend APIs. Collaborated with cross-functional teams to deliver user-focused products.",
      icon: <Building />,
      tags: ["Angular", "React", "Tailwind CSS", "Jira"],
    },
    {
      title: "Frontend Developer",
      subtitle: "Lawencon International (Linov Roket Prestasi)",
      period: "February 2024 - April 2024",
      description:
        "Developed LinovHR for KRM and Document Management System for Patra Jasa. Converted UI designs and integrated with backend APIs.",
      icon: <Building />,
      tags: ["Angular", "SCSS", "PrimeNG", "REST API"],
    },
    {
      title: "SharePoint Developer Intern",
      subtitle: "SRKK UK",
      period: "August 2022 - November 2022",
      description:
        "Learned and built mini applications such as automated workflows and programs using Nintex.",
      icon: <Building />,
      tags: ["SharePoint", "Nintex", "JavaScript"],
    },
  ];

  // Education data
  const education = [
    {
      title: "Fullstack Developer Bootcamp",
      subtitle: "Lawencon International",
      period: "November 2023 - February 2024",
      description:
        "Technologies Used: C#/.NET, SQL Server, Swagger, Postman, Angular",
      icon: <GraduationCap />,
      tags: ["C#/.NET", "SQL Server", "Angular"],
    },
    {
      title: "Bachelor of Science in Information Technology",
      subtitle: "Adventist University of the Philippines",
      period: "August 2019 - May 2023",
      description:
        "Relevant Coursework: Basic Web Development, Advanced Web Development. GPA: 3.95",
      icon: <GraduationCap />,
      tags: ["Web Development", "Database Management", "Programming"],
    },
  ];

  // Skills data
  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        "HTML",
        "CSS/SCSS",
        "JavaScript",
        "TypeScript",
        "React JS",
        "Next.js",
        "Angular",
        "Tailwind CSS",
      ],
    },
    {
      name: "Tools & Version Control",
      skills: [
        "Git",
        "GitHub",
        "GitLab",
        "BitBucket",
        "VS Code",
        "Figma",
        "Jira",
        "Confluence",
      ],
    },
    {
      name: "API & Backend",
      skills: [
        "RESTful API",
        "Postman",
        "Swagger",
        "Node.js",
        "C#/.NET",
        "SQL Server",
      ],
    },
    {
      name: "Soft Skills",
      skills: [
        "Communication",
        "Problem Solving",
        "Teamwork",
        "Detail-oriented",
        "High-principled",
      ],
    },
  ];

  // Stats data
  const stats = [
    {
      value: 1,
      label: "Years Experience",
      icon: <Clock size={24} />,
      suffix: "+",
    },
    {
      value: 4,
      label: "Projects Completed",
      icon: <CheckCircle size={24} />,
      suffix: "+",
    },
    {
      value: 0,
      label: "Coffee Cups",
      icon: <Coffee size={24} />,
    },
    {
      value: 100,
      label: "Integrity",
      icon: <Star size={24} />,
      suffix: "%",
    },
  ];

  // Get selected project
  const selectedProjectData = selectedProject
    ? projects.find((project) => project.id === selectedProject)
    : null;

  return (
    <main className="min-h-screen text-white overflow-x-hidden">
      {/* Custom cursor */}
      {!isMobile && <CustomCursor />}

      {/* Particle background */}
      <EnhancedParticleBackground />

      <AnimatePresence mode="wait">
        {loading ? (
          <FuturisticLoader />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress bar */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
              style={{ scaleX }}
            />

            {/* Navigation */}
            <motion.nav
              className={cn(
                "w-full z-40 transition-all duration-300",
                scrolled
                  ? "fixed top-4 left-0 right-0 mx-auto py-3 backdrop-blur-xl bg-card/80 border border-border shadow-lg rounded-full max-w-[90%] md:max-w-[85%] lg:max-w-[80%] float-menu"
                  : "relative py-5 bg-transparent"
              )}
              initial={{ y: -100 }}
              animate={{
                y: 0,
                opacity: navVisible ? 1 : 0,
                top: scrolled && !navVisible ? -100 : scrolled ? 4 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "flex justify-between items-center mx-auto px-6",
                  scrolled ? "max-w-7xl" : "container"
                )}
              >
                <Link
                  href="/"
                  className="text-xl font-bold gradient-text relative group flex items-center"
                >
                  <span className="mr-2 text-primary">
                    <Code size={24} />
                  </span>
                  Vernon<span className="text-white">Tamba</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                <div className="hidden md:flex space-x-6">
                  <NavLink href="#home" isActive={activeSection === "home"}>
                    Home
                  </NavLink>
                  <NavLink href="#about" isActive={activeSection === "about"}>
                    About
                  </NavLink>
                  <NavLink
                    href="#experience"
                    isActive={activeSection === "experience"}
                  >
                    Experience
                  </NavLink>
                  <NavLink
                    href="#projects"
                    isActive={activeSection === "projects"}
                  >
                    Projects
                  </NavLink>
                  <NavLink href="#skills" isActive={activeSection === "skills"}>
                    Skills
                  </NavLink>
                  <NavLink
                    href="#contact"
                    isActive={activeSection === "contact"}
                  >
                    Contact
                  </NavLink>
                </div>
                <div className="flex items-center gap-2">
                  <MagneticButton>
                    <Mail size={16} className="mr-2" /> Contact Me
                  </MagneticButton>
                </div>
              </div>
            </motion.nav>

            {/* Mobile menu button */}
            {isMobile && (
              <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <Button
                  size="icon"
                  className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                  onClick={() => {
                    const menu = document.getElementById("mobile-menu");
                    menu?.classList.toggle("translate-y-full");
                  }}
                >
                  <ChevronDown />
                </Button>
              </motion.div>
            )}

            {/* Mobile menu */}
            <div
              id="mobile-menu"
              className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border p-4 z-40 transform translate-y-full transition-transform duration-300 md:hidden"
            >
              <div className="flex justify-around">
                <MobileNavLink
                  href="#home"
                  icon={<User size={20} />}
                  label="Home"
                />
                <MobileNavLink
                  href="#about"
                  icon={<User size={20} />}
                  label="About"
                />
                <MobileNavLink
                  href="#experience"
                  icon={<Briefcase size={20} />}
                  label="Experience"
                />
                <MobileNavLink
                  href="#projects"
                  icon={<Code size={20} />}
                  label="Projects"
                />
                <MobileNavLink
                  href="#skills"
                  icon={<Award size={20} />}
                  label="Skills"
                />
              </div>
            </div>

            {/* Hero section with parallax */}
            <section
              id="home"
              className="relative min-h-screen flex items-center overflow-hidden"
            >
              <FloatingShapes />

              <motion.div
                className="absolute inset-0 z-0 opacity-20"
                style={{ y: backgroundY }}
              >
                <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/30 blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
              </motion.div>

              <div className="container mx-auto px-4 z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center md:text-left"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="mb-4 flex items-center justify-center md:justify-start"
                    >
                      <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium flex items-center gap-1">
                        <Sparkles size={14} className="animate-pulse" />
                        Web Developer
                      </span>
                    </motion.div>
                    <motion.h1
                      className="text-4xl md:text-6xl font-bold mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      Hi, I'm{" "}
                      <motion.span
                        className="gradient-text inline-block neon-text"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        Vernon Tamba
                      </motion.span>
                    </motion.h1>
                    <motion.p
                      className="text-xl text-white mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      Enthusiastic frontend developer with a strong foundation
                      in modern web technologies, specializing in creating
                      responsive and user-friendly web applications.
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <MagneticButton
                        variant="default"
                        className="bg-primary hover:bg-primary/90 text-white group"
                        onClick={() =>
                          document
                            .getElementById("projects")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        View My Work
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </MagneticButton>
                      <MagneticButton
                        variant="outline"
                        className="border-accent text-white hover:bg-accent/20"
                        onClick={() =>
                          document
                            .getElementById("contact")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        Contact Me
                      </MagneticButton>
                    </motion.div>

                    {/* Contact info */}
                    <motion.div
                      className="mt-8 flex flex-col gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2 text-white">
                        <Mail size={16} className="text-primary" />
                        <span>vernon.tamba777@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Phone size={16} className="text-primary" />
                        <span>(+62) 878-0807-3353</span>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <MapPin size={16} className="text-primary" />
                        <span>Bekasi, Indonesia</span>
                      </div>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                      className="mt-6 flex gap-4 justify-center md:justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                    >
                      <SocialIcon
                        icon={<Github />}
                        href="https://github.com/VernonTamba"
                      />
                      <SocialIcon
                        icon={<Linkedin />}
                        href="https://www.linkedin.com/in/vernon-joseph-yeremia-tamba/"
                      />
                      <SocialIcon
                        icon={<Mail />}
                        href="mailto:vernon.tamba777@gmail.com"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="hidden md:block relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <div className="relative w-full h-[500px]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="relative w-80 h-80 rounded-full bg-gradient-to-r from-primary/20 to-accent/20"
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(139, 92, 246, 0.3)",
                              "0 0 40px rgba(139, 92, 246, 0.6)",
                              "0 0 20px rgba(139, 92, 246, 0.3)",
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="absolute inset-4 rounded-full bg-background"></div>
                        </motion.div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{
                            rotate: [0, 5, 0, -5, 0],
                            y: [0, -10, 0, -5, 0],
                          }}
                          transition={{
                            duration: 6,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <Image
                            src="/images/profile-pic-transformed.png"
                            alt="Vernon Tamba - Frontend Developer"
                            width={300}
                            height={300}
                            className="rounded-[50%] object-cover mb-20"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.svg?height=350&width=350";
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <ScrollIndicator className="absolute bottom-10 left-1/2 transform -translate-x-1/2" />
            </section>

            <SectionDivider variant="wave" fillColor="hsl(222, 47%, 14%)" />

            {/* About section */}
            <section
              id="about"
              className="py-20 bg-secondary/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  className="flex flex-col items-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.div
                      className="text-primary"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <User size={32} />
                    </motion.div>

                    {/* Decorative circles */}
                    <motion.div
                      className="absolute w-28 h-28 rounded-full border border-primary/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute w-36 h-36 rounded-full border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-center neon-text mb-2">
                    About Me
                  </h2>
                  <motion.div
                    className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "6rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <p className="text-gray-200 text-center mt-4 max-w-2xl">
                    Learn more about my background, skills, and what drives me
                    as a developer
                  </p>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-8">
                    <InteractiveCard
                      className="bg-card/70 p-8 rounded-lg border border-border backdrop-blur-sm"
                      hoverEffect="glow"
                    >
                      <motion.h3
                        className="text-2xl font-bold mb-4 gradient-text"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        My Story
                      </motion.h3>
                      <motion.p
                        className="text-white mb-4 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        Enthusiastic junior frontend developer with a passion
                        for creating innovative and user-friendly web
                        applications. I have a strong background in modern web
                        technologies and a keen eye for design. My journey in
                        web development has been filled with learning and
                        bringing ideas and designs to life through code.
                      </motion.p>
                      <motion.p
                        className="text-white mb-4 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        I have been actively involved in building responsive and
                        interactive web applications using modern frameworks
                        like React, Angular, and Next.js. I'm ready to
                        continuously keep learning and expanding my skills in
                        the world of web development. Super excited to build
                        more exciting and impactful projects in the future!
                      </motion.p>
                    </InteractiveCard>

                    <InteractiveCard
                      className="bg-card/70 p-8 rounded-lg border border-border backdrop-blur-sm"
                      hoverEffect="tilt"
                    >
                      <motion.h3
                        className="text-2xl font-bold mb-4 gradient-text"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        Personal Details
                      </motion.h3>

                      <div className="space-y-4">
                        <motion.div
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-200">Full Name</p>
                            <p className="text-white">Vernon Tamba</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Mail className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-200">Email</p>
                            <p className="text-white">
                              vernon.tamba777@gmail.com
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Phone className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-200">Phone</p>
                            <p className="text-white">(+62) 878-0807-3353</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <MapPin className="text-primary" size={20} />
                          </div>
                          <div>
                            <p className="text-sm text-gray-200">Location</p>
                            <p className="text-white">Bekasi, Indonesia</p>
                          </div>
                        </motion.div>
                      </div>
                    </InteractiveCard>
                  </div>

                  {/* Stats Counter */}
                  <div className="mt-16">
                    <StatsCounter stats={stats} />
                  </div>
                </div>
              </div>
            </section>

            <SectionDivider
              variant="curve"
              fillColor="hsl(222, 47%, 11%)"
              position="top"
            />

            {/* Experience section */}
            <section id="experience" className="py-20 relative overflow-hidden">
              <FloatingShapes count={8} />

              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  className="flex flex-col items-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.div
                      className="text-primary"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Briefcase size={32} />
                    </motion.div>

                    {/* Decorative circles */}
                    <motion.div
                      className="absolute w-28 h-28 rounded-full border border-primary/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute w-36 h-36 rounded-full border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-center neon-text mb-2">
                    Work Experience
                  </h2>
                  <motion.div
                    className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "6rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <p className="text-gray-200 text-center mt-4 max-w-2xl">
                    My professional journey and the companies I've worked with
                  </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                  <AnimatedTimeline items={experiences} variant="alternating" />
                </div>
              </div>
            </section>

            <SectionDivider variant="zigzag" fillColor="hsl(222, 47%, 14%)" />

            {/* Projects section */}
            <section
              id="projects"
              className="py-20 bg-secondary/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  className="flex flex-col items-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.div
                      className="text-primary"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Code size={32} />
                    </motion.div>

                    {/* Decorative circles */}
                    <motion.div
                      className="absolute w-28 h-28 rounded-full border border-primary/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute w-36 h-36 rounded-full border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-center neon-text mb-2">
                    Featured Projects
                  </h2>
                  <motion.div
                    className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "6rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <p className="text-gray-200 text-center mt-4 max-w-2xl">
                    Explore some of my recent work and projects
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      {...project}
                      delay={index * 0.1}
                      onClick={() => setSelectedProject(project.id)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <SectionDivider
              variant="wave"
              fillColor="hsl(222, 47%, 11%)"
              position="top"
            />

            {/* Skills section */}
            <section id="skills" className="py-20 relative overflow-hidden">
              <FloatingShapes count={10} />

              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  className="flex flex-col items-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.div
                      className="text-primary"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Award size={32} />
                    </motion.div>

                    {/* Decorative circles */}
                    <motion.div
                      className="absolute w-28 h-28 rounded-full border border-primary/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute w-36 h-36 rounded-full border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-center neon-text mb-2">
                    Skills & Tools
                  </h2>
                  <motion.div
                    className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "6rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <p className="text-gray-200 text-center mt-4 max-w-2xl">
                    Technologies and tools I have been working with
                  </p>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                  <div className="grid gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                      <InteractiveCard
                        key={category.name}
                        className="bg-card/70 p-8 rounded-lg border border-border backdrop-blur-sm"
                        hoverEffect="glow"
                      >
                        <motion.h3
                          className="text-2xl font-bold mb-6 gradient-text"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        >
                          {category.name}
                        </motion.h3>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill}
                              className="flex flex-col items-center gap-2 skill-item"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.5,
                                delay: 0.1 + skillIndex * 0.05,
                              }}
                              whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                              }}
                            >
                              <div className="w-16 h-16 rounded-full bg-card/50 flex items-center justify-center">
                                <SkillIcon name={skill} size={32} />
                              </div>
                              <span className="text-sm text-center text-gray-200">
                                {skill}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </InteractiveCard>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <SectionDivider variant="angle" fillColor="hsl(222, 47%, 14%)" />

            {/* Education section */}
            <section
              id="education"
              className="py-20 bg-secondary/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  className="flex flex-col items-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.div
                      className="text-primary"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <GraduationCap size={32} />
                    </motion.div>

                    {/* Decorative circles */}
                    <motion.div
                      className="absolute w-28 h-28 rounded-full border border-primary/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute w-36 h-36 rounded-full border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-center neon-text mb-2">
                    Education
                  </h2>
                  <motion.div
                    className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "6rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <p className="text-gray-200 text-center mt-4 max-w-2xl">
                    My academic background and professional training
                  </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                  <AnimatedTimeline items={education} variant="left" />
                </div>
              </div>
            </section>

            <SectionDivider
              variant="curve"
              fillColor="hsl(222,47%, 11%)"
              position="top"
            />

            {/* Contact section - Updated with redirect buttons only */}
            <section id="contact" className="py-20 relative overflow-hidden">
              <FloatingShapes count={8} />

              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  className="flex flex-col items-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <motion.div
                      className="text-primary"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Mail size={32} />
                    </motion.div>

                    {/* Decorative circles */}
                    <motion.div
                      className="absolute w-28 h-28 rounded-full border border-primary/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute w-36 h-36 rounded-full border border-primary/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-center neon-text mb-2">
                    Get In Touch
                  </h2>
                  <motion.div
                    className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "6rem" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <p className="text-gray-200 text-center mt-4 max-w-2xl">
                    Let's connect! Choose your preferred way to reach out
                  </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ContactButton
                      icon={<Github size={32} />}
                      label="GitHub"
                      href="https://github.com/VernonTamba"
                      color="#333333"
                      delay={0.1}
                    />
                    <ContactButton
                      icon={<Linkedin size={32} />}
                      label="LinkedIn"
                      href="https://www.linkedin.com/in/vernon-joseph-yeremia-tamba/"
                      color="#0077B5"
                      delay={0.2}
                    />
                    <ContactButton
                      icon={<Mail size={32} />}
                      label="Email"
                      href="mailto:vernon.tamba777@gmail.com"
                      color="#EA4335"
                      delay={0.3}
                    />
                    <ContactButton
                      icon={<MessageSquare size={32} />}
                      label="WhatsApp"
                      href="https://wa.me/6287808073353"
                      color="#25D366"
                      delay={0.4}
                    />
                  </div>

                  {/* Additional contact info */}
                  <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="bg-card/70 p-8 rounded-2xl border border-border backdrop-blur-sm">
                      <h3 className="text-xl font-semibold mb-4 gradient-text">
                        Quick Contact Info
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                            <Mail className="text-primary" size={20} />
                          </div>
                          <p className="text-sm text-gray-200">Email</p>
                          <p className="text-white font-medium">
                            vernon.tamba777@gmail.com
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                            <Phone className="text-primary" size={20} />
                          </div>
                          <p className="text-sm text-gray-200">Phone</p>
                          <p className="text-white font-medium">
                            (+62) 878-0807-3353
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                            <MapPin className="text-primary" size={20} />
                          </div>
                          <p className="text-sm text-gray-200">Location</p>
                          <p className="text-white font-medium">
                            Bekasi, Indonesia
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <SectionDivider
              variant="curve"
              fillColor="hsl(222, 47%, 11%)"
              position="top"
            />

            {/* Thank You Section */}
            <ThankYouSection />

            <SectionDivider
              variant="curve"
              fillColor="hsl(222, 47%, 11%)"
              position="top"
            />

            {/* Footer section */}
            <footer className="py-12 text-center text-gray-200">
              <p>
                &copy; {new Date().getFullYear()} Vernon Tamba. All rights
                reserved.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && selectedProjectData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
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
                  src={selectedProjectData.image || "/placeholder.svg"}
                  alt={selectedProjectData.title}
                  fill
                  className="object-cover rounded-t-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/fallback-project.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-2">
                  <span className="text-sm text-purple-400">
                    {selectedProjectData.company}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {selectedProjectData.title}
                </h2>
                <p className="text-gray-200 mb-6">
                  {selectedProjectData.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="w-1 h-6 bg-purple-500 mr-3 rounded-full"></span>
                    Role
                  </h3>
                  <p className="text-gray-200 ml-4">
                    {selectedProjectData.role}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <span className="w-1 h-6 bg-purple-500 mr-3 rounded-full"></span>
                    Contributions
                  </h3>
                  <ul className="list-disc pl-10 space-y-2 text-gray-200">
                    {selectedProjectData.contributions.map(
                      (contribution, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          {contribution}
                        </motion.li>
                      )
                    )}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="w-1 h-6 bg-purple-500 mr-3 rounded-full"></span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * index }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(139, 92, 246, 0.2)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

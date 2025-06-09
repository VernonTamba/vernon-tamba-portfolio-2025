"use client";

import type React from "react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
  variant?: "left" | "alternating";
}

export default function AnimatedTimeline({
  items,
  variant = "left",
}: AnimatedTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent",
          variant === "left"
            ? "left-8"
            : "left-1/2 -translate-x-1/2 hidden md:block"
        )}
      />

      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            isEven={index % 2 === 0}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({
  item,
  index,
  isEven,
  variant,
}: {
  item: TimelineItem;
  index: number;
  isEven: boolean;
  variant: "left" | "alternating";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Determine position based on variant and index
  const position = variant === "alternating" && !isEven ? "right" : "left";

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative flex items-start",
        variant === "alternating"
          ? "md:grid md:grid-cols-2 md:gap-16 md:items-center"
          : ""
      )}
      initial={{ opacity: 0, x: position === "left" ? -20 : 20 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: position === "left" ? -20 : 20 }
      }
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Icon */}
      <motion.div
        className={cn(
          "absolute w-16 h-16 rounded-full bg-card border-4 border-primary flex items-center justify-center z-20 shadow-lg",
          variant === "left" ? "left-0" : "",
          variant === "alternating" && position === "left"
            ? "md:left-auto md:right-8"
            : "",
          variant === "alternating" && position === "right" ? "md:left-8" : "",
          variant === "alternating" && "md:left-1/2 md:-translate-x-1/2"
        )}
        style={{
          top: variant === "alternating" ? "50%" : "0",
          transform: variant === "alternating" ? "translateY(-50%)" : "none",
        }}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2, type: "spring" }}
      >
        <div className="text-primary text-xl">{item.icon}</div>
      </motion.div>

      {/* Content */}
      <div
        className={cn(
          "w-full",
          variant === "left" ? "ml-24" : "",
          variant === "alternating" && position === "left"
            ? "md:ml-0 md:pr-16 ml-24"
            : "",
          variant === "alternating" && position === "right"
            ? "md:ml-16 md:pl-0 ml-24"
            : "",
          variant === "alternating" && !isEven && "md:col-start-1",
          variant === "alternating" && isEven && "md:col-start-2"
        )}
      >
        <motion.div
          className="bg-card/70 p-8 rounded-xl border border-border backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
          whileHover={{
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
            y: -5,
            transition: { duration: 0.2 },
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <h3 className="text-2xl font-bold text-white mb-2 lg:mb-0">
              {item.title}
            </h3>
            <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
              {item.period}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-white mb-4 opacity-90">
            {item.subtitle}
          </h4>
          <p className="text-gray-200 leading-relaxed mb-6">
            {item.description}
          </p>

          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  className="text-xs px-3 py-1 bg-secondary/50 rounded-full text-white border border-border/50 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1 + 0.3 + tagIndex * 0.05,
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

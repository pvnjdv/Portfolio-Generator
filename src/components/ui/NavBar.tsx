import React from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url?: string
  icon: LucideIcon
  onClick?: () => void
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTab?: string
  onTabClick?: (name: string) => void
}

export function NavBar({ items, className, activeTab, onTabClick }: NavBarProps) {
  return (
    <div
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white/90 border border-gray-200/50 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <button
              key={item.name}
              onClick={() => {
                onTabClick?.(item.name)
                item.onClick?.()
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300",
                "text-gray-600 hover:text-blue-600",
                isActive && "bg-blue-500 text-white shadow-md",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-blue-500 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-400 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-blue-400/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-400/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-400/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
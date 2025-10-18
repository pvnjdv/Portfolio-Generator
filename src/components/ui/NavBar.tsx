import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassButton, NeonButton } from "./button"

interface NavItem {
  name: string
  url?: string
  icon: LucideIcon
  onClick?: () => void
  buttonType?: "glass" | "neon"
  variant?: string
  color?: string
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTab?: string
  onTabClick?: (name: string) => void
}

export function NavBar({ items, className, activeTab, onTabClick }: NavBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        className,
      )}
    >
      <div className="relative">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-full blur-xl animate-pulse" />
        
        {/* Glass morphism container */}
        <div className="relative flex items-center gap-2 bg-black/20 border border-white/10 backdrop-blur-xl py-2 px-3 rounded-full shadow-2xl">
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-500/50 p-[1px]">
            <div className="h-full w-full rounded-full bg-black/40 backdrop-blur-xl" />
          </div>
          
          <div className="relative z-10 flex items-center gap-2">
            {items.map((item, index) => {
              const Icon = item.icon
              const isActive = activeTab === item.name
              const buttonType = item.buttonType || "glass"
              
              const buttonVariants = {
                glass: {
                  Me: "primary",
                  Projects: "secondary", 
                  Skills: "success",
                  Fun: "warning",
                  Contact: "danger"
                },
                neon: {
                  Me: "blue",
                  Projects: "purple",
                  Skills: "green", 
                  Fun: "pink",
                  Contact: "cyan"
                }
              }

              const handleClick = () => {
                onTabClick?.(item.name)
                item.onClick?.()
              }

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {buttonType === "glass" ? (
                    <GlassButton
                      variant={buttonVariants.glass[item.name as keyof typeof buttonVariants.glass] as "primary" | "secondary" | "success" | "warning" | "danger"}
                      size="sm"
                      isActive={isActive}
                      onClick={handleClick}
                      className={cn(
                        "relative group transition-all duration-300",
                        isActive && "ring-2 ring-white/30 ring-offset-2 ring-offset-black/20"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="transition-transform group-hover:scale-110" />
                        <span className="hidden sm:inline text-xs font-medium">
                          {item.name}
                        </span>
                      </div>
                      
                      {/* Active indicator */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </AnimatePresence>
                    </GlassButton>
                  ) : (
                    <NeonButton
                      color={buttonVariants.neon[item.name as keyof typeof buttonVariants.neon] as "blue" | "purple" | "green" | "pink" | "cyan"}
                      size="sm"
                      isActive={isActive}
                      onClick={handleClick}
                      className={cn(
                        "relative group",
                        isActive && "animate-pulse"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="transition-transform group-hover:scale-110" />
                        <span className="hidden sm:inline text-xs">
                          {item.name}
                        </span>
                      </div>
                    </NeonButton>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
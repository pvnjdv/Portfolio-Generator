"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Modern Glass Button
export interface GlassButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart'> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  size?: "sm" | "md" | "lg"
  isActive?: boolean
}

const glassVariants = cva(
  "relative overflow-hidden backdrop-blur-md border transition-all duration-300 ease-out transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        primary: "bg-blue-500/20 border-blue-400/30 text-blue-100 hover:bg-blue-500/30 hover:border-blue-400/50 shadow-lg shadow-blue-500/20",
        secondary: "bg-purple-500/20 border-purple-400/30 text-purple-100 hover:bg-purple-500/30 hover:border-purple-400/50 shadow-lg shadow-purple-500/20",
        success: "bg-green-500/20 border-green-400/30 text-green-100 hover:bg-green-500/30 hover:border-green-400/50 shadow-lg shadow-green-500/20",
        warning: "bg-yellow-500/20 border-yellow-400/30 text-yellow-100 hover:bg-yellow-500/30 hover:border-yellow-400/50 shadow-lg shadow-yellow-500/20",
        danger: "bg-red-500/20 border-red-400/30 text-red-100 hover:bg-red-500/30 hover:border-red-400/50 shadow-lg shadow-red-500/20"
      },
      size: {
        sm: "px-3 py-2 text-xs rounded-lg",
        md: "px-4 py-2.5 text-sm rounded-xl",
        lg: "px-6 py-3 text-base rounded-2xl"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, isActive, children, onClick, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          glassVariants({ variant, size }),
          isActive && "bg-opacity-40 scale-105",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 font-medium">{children}</span>
      </motion.button>
    )
  }
)
GlassButton.displayName = "GlassButton"

// Neon Button
export interface NeonButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart'> {
  children: React.ReactNode
  color?: "blue" | "purple" | "green" | "pink" | "cyan"
  size?: "sm" | "md" | "lg"
  isActive?: boolean
}

const neonVariants = cva(
  "relative overflow-hidden bg-black border-2 transition-all duration-300 ease-out font-medium uppercase tracking-wider",
  {
    variants: {
      color: {
        blue: "border-blue-500 text-blue-400 hover:text-white hover:bg-blue-500/20 shadow-lg hover:shadow-blue-500/50",
        purple: "border-purple-500 text-purple-400 hover:text-white hover:bg-purple-500/20 shadow-lg hover:shadow-purple-500/50",
        green: "border-green-500 text-green-400 hover:text-white hover:bg-green-500/20 shadow-lg hover:shadow-green-500/50",
        pink: "border-pink-500 text-pink-400 hover:text-white hover:bg-pink-500/20 shadow-lg hover:shadow-pink-500/50",
        cyan: "border-cyan-500 text-cyan-400 hover:text-white hover:bg-cyan-500/20 shadow-lg hover:shadow-cyan-500/50"
      },
      size: {
        sm: "px-4 py-2 text-xs rounded-md",
        md: "px-6 py-3 text-sm rounded-lg",
        lg: "px-8 py-4 text-base rounded-xl"
      }
    },
    defaultVariants: {
      color: "blue",
      size: "md"
    }
  }
)

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, color, size, isActive, children, onClick, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          neonVariants({ color, size }),
          isActive && "animate-pulse",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        {...props}
      >
        <div className={cn(
          "absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300",
          color === "blue" && "bg-gradient-to-r from-blue-600/20 via-blue-500/30 to-blue-600/20",
          color === "purple" && "bg-gradient-to-r from-purple-600/20 via-purple-500/30 to-purple-600/20",
          color === "green" && "bg-gradient-to-r from-green-600/20 via-green-500/30 to-green-600/20",
          color === "pink" && "bg-gradient-to-r from-pink-600/20 via-pink-500/30 to-pink-600/20",
          color === "cyan" && "bg-gradient-to-r from-cyan-600/20 via-cyan-500/30 to-cyan-600/20"
        )} />
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }
)
NeonButton.displayName = "NeonButton"

export { Button, GlassButton, NeonButton, buttonVariants }
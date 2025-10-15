'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Plus, X } from 'lucide-react'

interface FabProps {
  onTemplateSwitch: () => void
  onCreatePortfolio: () => void
}

export default function Fab({ onTemplateSwitch, onCreatePortfolio }: FabProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleFab = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {/* Switch Template Button */}
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              onClick={onTemplateSwitch}
              className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-full shadow-lg transition-colors min-w-max"
            >
              <Palette className="w-5 h-5" />
              <span className="text-sm font-medium">Switch Template</span>
            </motion.button>

            {/* Create Portfolio Button */}
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ delay: 0.05 }}
              onClick={onCreatePortfolio}
              className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg transition-colors min-w-max"
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">Create Your Portfolio</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={toggleFab}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </motion.div>
      </motion.button>
    </div>
  )
}
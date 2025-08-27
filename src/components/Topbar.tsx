import image_551e0f661bd0d7ccb5b2f8fe8b954feefbc9775b from 'figma:asset/551e0f661bd0d7ccb5b2f8fe8b954feefbc9775b.png';
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import logoImage from 'figma:asset/7badcad7683a7056583beb0e0ab3fdf762e6ac94.png'

interface TopbarProps {
  isAnimationComplete: boolean
}

export function Topbar({ isAnimationComplete }: TopbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Contact Us', href: '#contact' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' }
  ]

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={isAnimationComplete ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between rounded-[0px]">
          <div className="flex items-center space-x-3">
            <img 
              src={image_551e0f661bd0d7ccb5b2f8fe8b954feefbc9775b} 
              alt="NVHR Solutions" 
              className="w-12 h-12 object-contain rounded-[10px]"
            />
            <span className="text-xl font-semibold text-gray-800">NVHRSolutions</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="relative z-60"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </motion.header>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={logoImage} 
                      alt="NVHR Solutions" 
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-lg font-semibold">NVHRSolutions</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                
                <nav className="space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="block py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={toggleSidebar}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Topbar } from './components/Topbar'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ServicesSection } from './components/ServicesSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import logoImage from 'figma:asset/551e0f661bd0d7ccb5b2f8fe8b954feefbc9775b.png'

export default function App() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate page load time
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Start animations after load
      setTimeout(() => {
        setIsAnimationComplete(true)
      }, 100)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={logoImage} 
            alt="NVHR Solutions" 
            className="w-16 h-16 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-800">NVHRSolutions</span>
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Topbar isAnimationComplete={isAnimationComplete} />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection isAnimationComplete={isAnimationComplete} />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </motion.main>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow z-40"
        initial={{ scale: 0 }}
        animate={isAnimationComplete ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  )
}
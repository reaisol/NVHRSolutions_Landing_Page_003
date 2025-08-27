'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface HeroSectionProps {
  isAnimationComplete: boolean
}

export function HeroSection({ isAnimationComplete }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1590650486895-79681b6f26a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc1NTgzODEyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Transform Your HR Operations",
      subtitle: "Streamline recruitment, enhance employee engagement, and drive organizational success with our comprehensive HR solutions."
    },
    {
      image: "https://images.unsplash.com/photo-1712159018726-4564d92f3ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NzU3MDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Build Better Workplaces",
      subtitle: "Create inclusive, productive environments where every employee can thrive and contribute to your company's growth."
    },
    {
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxociUyMHJlY3J1aXRtZW50JTIwaW50ZXJ2aWV3fGVufDF8fHx8MTc1NTcyMzExMXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Expert HR Consulting",
      subtitle: "Partner with our experienced team to optimize your human resources strategy and achieve sustainable business growth."
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={isAnimationComplete ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              key={currentSlide}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 leading-relaxed"
              key={`${currentSlide}-subtitle`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={isAnimationComplete ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                Get Started Today
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </section>
  )
}
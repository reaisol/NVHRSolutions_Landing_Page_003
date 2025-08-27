'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from './ui/card'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function TestimonialsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Karthik Anandan",
      position: "HR Director, Global Corp",
      avatar: "KA",
      rating: 5,
      text: "The employee wellness programs implemented by HRSolutions have significantly improved our workplace culture. Employee satisfaction is at an all-time high."
    },
    {
      name: "Mallesh",
      position: "Founder, Creative Agency",
      avatar: "M",
      rating: 5,
      text: "Their compliance expertise saved us from potential legal issues and gave us peace of mind. The team is professional, knowledgeable, and truly cares about our success."
    },
    {
      name: "Aamir Khan",
      position: "Operations Manager, RetailPlus",
      avatar: "AK",
      rating: 5,
      text: "The training and development programs have upskilled our entire workforce. Productivity has increased by 40% since partnering with HRSolutions."
    },
    {
      name: "Krishna Reddy",
      position: "VP of People, FinanceFlow",
      avatar: "KR",
      rating: 5,
      text: "Outstanding performance management systems that have helped us identify and nurture top talent. Our retention rates have never been better."
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push({ ...testimonials[index], originalIndex: index })
    }
    return visible
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Client Testimonials</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear what our clients say about their experience working with NVHRSolutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {getVisibleTestimonials().map((testimonial, index) => (
            <motion.div
              key={`${testimonial.originalIndex}-${currentIndex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:scale-105 transition-all duration-300 cursor-pointer group hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
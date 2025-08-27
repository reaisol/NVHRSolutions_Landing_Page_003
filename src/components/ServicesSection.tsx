'use client'

import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { Users, Target, TrendingUp, Shield, Heart, Briefcase } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

export function ServicesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const services = [
    {
      icon: Users,
      title: "Talent Acquisition",
      description: "Strategic recruitment solutions to find the right talent for your organization. From job posting to onboarding, we streamline your hiring process."
    },
     {
      icon: Shield,
      title: "HR Compliance",
      description: "Stay compliant with employment laws and regulations while protecting your organization from potential risks and liabilities."
    },
    {
      icon: Target,
      title: "Performance Management",
      description: "Develop effective performance review systems and goal-setting frameworks that drive employee growth and organizational success."
    },
    {
      icon: TrendingUp,
      title: "Training & Development",
      description: "Comprehensive learning programs designed to upskill your workforce and prepare them for future challenges and opportunities."
    },
    {
      icon: Heart,
      title: "Employee Wellness",
      description: "Create a healthy work environment with wellness programs that boost morale, reduce turnover, and increase productivity."
    },
    {
      icon: Briefcase,
      title: "Organizational Design",
      description: "Optimize your organizational structure and processes to improve efficiency, communication, and overall business performance."
    }
  ]

  return (
    <section id="services" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive HR solutions tailored to meet your organization's unique needs and drive sustainable growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import logoImage from 'figma:asset/551e0f661bd0d7ccb5b2f8fe8b954feefbc9775b.png'

export function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ]

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" }
  ]

  return (
    <footer ref={ref} className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logoImage} 
                alt="NVHR Solutions" 
                className="w-12 h-12 object-contain rounded-[10px]"
              />
              <span className="text-xl font-semibold">NVHRSolutions</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Transforming workplaces and empowering organizations to build better, more engaged teams through strategic HR solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">hello@nvhrsolutions.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+91 7624801340</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-400">
                  Kukatpally, Hyderabad<br />
                  Telangana
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest HR insights and industry trends.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400">
  © 2025 NVHRSolutions. All rights reserved. | Designed with ❤️ by{" "}
  <a
    href="https://www.reaisol.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:underline"
  >
    ReAiSol
  </a>
</p>
        </motion.div>
      </div>
    </footer>
  )
}
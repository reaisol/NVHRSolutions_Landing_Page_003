import image_3e672e9855489fa47f018180ea1fb58457c706a9 from 'figma:asset/3e672e9855489fa47f018180ea1fb58457c706a9.png';
import image_054956a620257f1406fce399654ea15287548f5a from 'figma:asset/054956a620257f1406fce399654ea15287548f5a.png';
import image_e7ad4add77077ca043c1576276d8ad29d3d6e2a8 from 'figma:asset/e7ad4add77077ca043c1576276d8ad29d3d6e2a8.png';
'use client'

import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <ImageWithFallback
              src={image_3e672e9855489fa47f018180ea1fb58457c706a9}
              alt="Professional Indian woman working in modern office environment"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About NVHRSolutions</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                At NVHR Solutions, we connect talented professionals with leading MNCs. Our focus is on providing tailored HR solutions that help organizations build strong teams while guiding individuals toward rewarding careers.
              </p>
              <p>
                With expertise in recruitment and talent management, we bridge the gap between people and opportunities—because we believe great companies are built on great people.
              </p>
              <p>
                We are committed to fostering growth, innovation, and long-term success for both businesses and professionals. Together, we create opportunities that shape the future of work.
              </p>
            </div>

            <motion.div 
              className="mt-8 grid grid-cols-3 gap-6"
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-500">Companies Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-500">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
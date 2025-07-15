"use client"

import { motion } from "framer-motion"
import { Users, Award, Globe, Rocket } from "lucide-react"

const stats = [
  { icon: Users, value: "50,000+", label: "Active Users" },
  { icon: Award, value: "99.9%", label: "Uptime" },
  { icon: Globe, value: "150+", label: "Countries" },
  { icon: Rocket, value: "1M+", label: "Emails Sent" },
]

export function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Built by email experts, for email professionals
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2023, VisuaBuild was born from the frustration of creating email templates with outdated
                tools. Our team of designers and developers set out to build the most intuitive email builder on the
                market.
              </p>
              <p>
                Today, we're trusted by thousands of businesses worldwide to create beautiful, responsive email
                campaigns that drive results. From startups to Fortune 500 companies, our platform scales with your
                needs.
              </p>
              <p>
                We believe that great email design shouldn't require a computer science degree. That's why we've made
                VisuaBuild accessible to everyone, while still providing the advanced features that professionals
                demand.
              </p>
            </div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

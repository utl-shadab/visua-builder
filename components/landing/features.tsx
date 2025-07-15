"use client"

import { motion } from "framer-motion"
import { Palette, Zap, Smartphone, Code, Mail, BarChart } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Drag & Drop Builder",
    description: "Create stunning email templates with our intuitive drag-and-drop interface. No coding required.",
  },
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description:
      "Generate professional templates instantly with AI. Just describe what you need and watch magic happen.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "All templates are automatically optimized for mobile devices, ensuring perfect display everywhere.",
  },
  {
    icon: Code,
    title: "Clean HTML Export",
    description: "Export your templates as clean, compatible HTML that works with all major email platforms.",
  },
  {
    icon: Mail,
    title: "Direct Email Sending",
    description: "Send test emails directly from the platform to preview how your templates look in real inboxes.",
  },
  {
    icon: BarChart,
    title: "Template Analytics",
    description: "Track performance metrics and optimize your email campaigns with built-in analytics.",
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to create amazing emails
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make email template creation fast, easy, and professional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

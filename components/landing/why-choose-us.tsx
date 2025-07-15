"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, Shield, Headphones } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Save 80% of Your Time",
    description:
      "Create professional email templates in minutes, not hours. Our AI and drag-drop tools speed up your workflow dramatically.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with bank-level encryption. We're SOC 2 compliant and GDPR ready.",
  },
  {
    icon: CheckCircle,
    title: "99.9% Uptime Guarantee",
    description: "Reliable service you can count on. Our infrastructure is built for scale and performance.",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description: "Get help when you need it. Our support team is available around the clock to assist you.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why thousands of teams choose VisuaBuild
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We've built the most comprehensive email template builder that combines ease of use with powerful
                features.
              </p>
            </motion.div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
                <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="bg-green-500 text-white text-center py-3 rounded-lg font-medium">Call to Action</div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4"
            >
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Faster</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

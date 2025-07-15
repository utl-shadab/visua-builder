"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Put emails first
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg"
            >
              Fast, user-friendly and engaging - turn email marketing into beautiful campaigns and streamline your daily
              operations with your own branded templates.
            </motion.p>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 max-w-md"
            >
              <Input
                type="email"
                placeholder="Enter work email"
                className="flex-1 h-12 px-4 border-gray-300 rounded-lg"
              />
              <Link href="/editor">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-8 h-12 rounded-lg font-medium whitespace-nowrap">
                  Start Building
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">95.2%</div>
                <div className="text-gray-600">Email deliverability</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">~50k</div>
                <div className="text-gray-600">Templates created</div>
              </motion.div>
            </div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex items-center space-x-2 pt-4"
            >
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9</span>
              <span className="text-gray-600">Average user rating</span>
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main Device */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3"
              >
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-blue-200 rounded w-full"></div>
                  <div className="h-3 bg-blue-200 rounded w-2/3"></div>
                  <div className="bg-green-500 text-white text-center py-2 rounded-lg text-sm font-medium">
                    Get Started
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 transform -rotate-6"
              >
                <TrendingUp className="w-6 h-6 text-green-500" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 transform rotate-12"
              >
                <Users className="w-6 h-6 text-blue-500" />
              </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

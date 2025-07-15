"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { WhyChooseUs } from "@/components/landing/why-choose-us"
import { AboutUs } from "@/components/landing/about-us"
import { Testimonials } from "@/components/landing/testimonials"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Header />
      <Hero />
      <Features />
      <WhyChooseUs />
      <AboutUs />
      <Testimonials />
      <Footer />
    </motion.div>
  )
}

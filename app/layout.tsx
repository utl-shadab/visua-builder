import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VisuaBuild - Email Template Builder",
  description: "Create beautiful, responsive email templates with drag-and-drop",
  manifest: "/manifest.json",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration)
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError)
          })
      })
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}

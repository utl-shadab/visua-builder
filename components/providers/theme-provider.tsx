"use client"

import type React from "react"

import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setTheme } from "@/lib/features/theme/themeSlice"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.theme.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load theme from localStorage on mount
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
      if (savedTheme) {
        dispatch(setTheme(savedTheme))
      }
    }
  }, [dispatch])

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Apply theme to document and save to localStorage
      document.documentElement.classList.toggle("dark", theme === "dark")
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  return <div className={theme}>{children}</div>
}

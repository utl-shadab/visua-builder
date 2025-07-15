"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Menu, X, Monitor, Smartphone, Download, Send, Sparkles, LogOut, Sun, Moon, Save } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setPreviewMode } from "@/lib/features/email/emailSlice"
import { toggleTheme } from "@/lib/features/theme/themeSlice"
import { useState } from "react"
import { TemplateGenerator } from "./template-generator"

interface MobileNavbarProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export function MobileNavbar({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileNavbarProps) {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const { blocks, previewMode } = useAppSelector((state) => state.email)
  const theme = useAppSelector((state) => state.theme.theme)
  const [showActions, setShowActions] = useState(false)
  const [showTemplateGenerator, setShowTemplateGenerator] = useState(false)

  const handleExport = async () => {
    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks }),
      })

      const { html } = await response.json()

      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "email-template.html"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  return (
    <>
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <h1 className="text-lg font-bold text-foreground">
            Visua<span className="text-primary">Build</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setShowActions(!showActions)}>
            <Menu className="w-4 h-4" />
          </Button>

          <Button onClick={() => dispatch(toggleTheme())} variant="ghost" size="sm">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {session && (
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Actions Panel */}
      {showActions && (
        <div className="bg-card border-b border-border p-4">
          <div className="space-y-3">
            {/* Preview Mode Toggle */}
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={previewMode === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => dispatch(setPreviewMode("desktop"))}
                className="flex-1"
              >
                <Monitor className="w-4 h-4 mr-1" />
                Desktop
              </Button>
              <Button
                variant={previewMode === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => dispatch(setPreviewMode("mobile"))}
                className="flex-1"
              >
                <Smartphone className="w-4 h-4 mr-1" />
                Mobile
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => setShowTemplateGenerator(true)} variant="outline" size="sm" className="w-full">
                <Sparkles className="w-4 h-4 mr-1" />
                AI Generate
              </Button>

              <Button variant="outline" size="sm" className="w-full bg-transparent">
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>

              <Button onClick={handleExport} disabled={blocks.length === 0} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>

              <Button disabled={blocks.length === 0} size="sm">
                <Send className="w-4 h-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      <TemplateGenerator isOpen={showTemplateGenerator} onClose={() => setShowTemplateGenerator(false)} />
    </>
  )
}

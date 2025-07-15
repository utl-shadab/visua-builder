"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Send, Sparkles, Monitor, Smartphone, LogOut, User, Save, Sun, Moon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { saveTemplate, getUserTemplates, loadTemplate, type Template } from "@/lib/templates"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setBlocks, setPreviewMode, setLoading } from "@/lib/features/email/emailSlice"
import { toggleTheme } from "@/lib/features/theme/themeSlice"
import { TemplateGenerator } from "./template-generator"

export function Navbar() {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const { blocks, previewMode, isLoading } = useAppSelector((state) => state.email)
  const theme = useAppSelector((state) => state.theme.theme)

  const [isExporting, setIsExporting] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendEmail, setSendEmail] = useState({ to: "", subject: "" })
  const [templates, setTemplates] = useState<Template[]>([])
  const [templateName, setTemplateName] = useState("")
  const [showTemplateGenerator, setShowTemplateGenerator] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
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
    } finally {
      setIsExporting(false)
    }
  }

  const handleSendEmail = async () => {
    if (!sendEmail.to || !sendEmail.subject) return

    setIsSending(true)
    try {
      const exportResponse = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks }),
      })

      const { html } = await exportResponse.json()

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: sendEmail.to,
          subject: sendEmail.subject,
          html,
        }),
      })

      setSendEmail({ to: "", subject: "" })
      alert("Email sent successfully!")
    } catch (error) {
      console.error("Send failed:", error)
      alert("Failed to send email")
    } finally {
      setIsSending(false)
    }
  }

  const handleSaveTemplate = async () => {
    if (!session?.user?.email || !templateName.trim()) return

    dispatch(setLoading(true))
    try {
      await saveTemplate(session.user.email, templateName, blocks)
      setTemplateName("")
      await loadUserTemplates()
      alert("Template saved successfully!")
    } catch (error) {
      console.error("Save failed:", error)
      alert("Failed to save template")
    } finally {
      dispatch(setLoading(false))
    }
  }

  const loadUserTemplates = async () => {
    if (!session?.user?.email) return

    try {
      const userTemplates = await getUserTemplates(session.user.email)
      setTemplates(userTemplates)
    } catch (error) {
      console.error("Load templates failed:", error)
    }
  }

  const handleLoadTemplate = async (templateId: string) => {
    dispatch(setLoading(true))
    try {
      const template = await loadTemplate(templateId)
      if (template) {
        dispatch(setBlocks(template.blocks))
      }
    } catch (error) {
      console.error("Load template failed:", error)
      alert("Failed to load template")
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      <div className="bg-card border-b border-border px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-6">
          <h1 className="text-lg lg:text-xl font-bold text-foreground">
            Visua<span className="text-primary">Build</span>
          </h1>

          <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={previewMode === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setPreviewMode("desktop"))}
              className={
                previewMode === "desktop"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              <Monitor className="w-4 h-4 mr-1" />
              <span className="hidden lg:inline">Desktop</span>
            </Button>
            <Button
              variant={previewMode === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => dispatch(setPreviewMode("mobile"))}
              className={
                previewMode === "mobile"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              <Smartphone className="w-4 h-4 mr-1" />
              <span className="hidden lg:inline">Mobile</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <Button
            onClick={() => setShowTemplateGenerator(true)}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="hidden sm:flex"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            <span className="hidden lg:inline">AI Generate</span>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={loadUserTemplates}
                disabled={isLoading}
                className="hidden sm:flex bg-transparent"
              >
                <Save className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">Save</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Save Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name" className="text-foreground">
                    Template Name
                  </Label>
                  <Input
                    id="template-name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="My Email Template"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <Button
                  onClick={handleSaveTemplate}
                  disabled={!templateName.trim() || blocks.length === 0 || isLoading}
                  className="w-full"
                >
                  Save Template
                </Button>

                {templates.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-foreground">Load Existing Template</Label>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {templates.map((template) => (
                        <Button
                          key={template.id}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLoadTemplate(template.id)}
                          className="w-full justify-start text-left"
                        >
                          {template.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleExport}
            disabled={isExporting || blocks.length === 0 || isLoading}
            variant="outline"
            size="sm"
            className="hidden sm:flex bg-transparent"
          >
            <Download className="w-4 h-4 mr-1" />
            <span className="hidden lg:inline">{isExporting ? "Exporting..." : "Export"}</span>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={blocks.length === 0 || isLoading} size="sm">
                <Send className="w-4 h-4 mr-1" />
                <span className="hidden lg:inline">Send</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Send Email</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email-to" className="text-foreground">
                    To
                  </Label>
                  <Input
                    id="email-to"
                    type="email"
                    value={sendEmail.to}
                    onChange={(e) => setSendEmail((prev) => ({ ...prev, to: e.target.value }))}
                    placeholder="recipient@example.com"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="email-subject" className="text-foreground">
                    Subject
                  </Label>
                  <Input
                    id="email-subject"
                    value={sendEmail.subject}
                    onChange={(e) => setSendEmail((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Email subject"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <Button
                  onClick={handleSendEmail}
                  disabled={isSending || !sendEmail.to || !sendEmail.subject || isLoading}
                  className="w-full"
                >
                  {isSending ? "Sending..." : "Send Email"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={() => dispatch(toggleTheme())} variant="ghost" size="sm">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {session && (
            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{session.user?.name}</span>
              </div>
              <Button onClick={() => signOut()} variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <TemplateGenerator isOpen={showTemplateGenerator} onClose={() => setShowTemplateGenerator(false)} />
    </>
  )
}

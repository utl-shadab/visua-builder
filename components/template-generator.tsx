"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Upload, Wand2, FileText } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setBlocks, setLoading, setError } from "@/lib/features/email/emailSlice"

interface TemplateGeneratorProps {
  isOpen: boolean
  onClose: () => void
}

export function TemplateGenerator({ isOpen, onClose }: TemplateGeneratorProps) {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.email)

  const [textPrompt, setTextPrompt] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const templatePrompts = [
    {
      id: "welcome",
      title: "Welcome Email",
      description: "Onboarding email for new users",
      prompt:
        "Create a professional welcome email for new users signing up to a SaaS platform. Include a warm greeting, brief introduction to the platform, key features overview, and a call-to-action button to get started.",
    },
    {
      id: "newsletter",
      title: "Newsletter",
      description: "Weekly newsletter template",
      prompt:
        "Design a modern newsletter template with a header, featured article section, news highlights, and footer with social media links.",
    },
    {
      id: "promotion",
      title: "Promotional Email",
      description: "Product promotion or sale announcement",
      prompt:
        "Create an eye-catching promotional email for a limited-time sale. Include discount percentage, product highlights, urgency elements, and a prominent shop now button.",
    },
    {
      id: "announcement",
      title: "Product Announcement",
      description: "New feature or product launch",
      prompt:
        "Design a product announcement email introducing a new feature. Include feature benefits, screenshots placeholder, user testimonials section, and try now button.",
    },
    {
      id: "transactional",
      title: "Order Confirmation",
      description: "Transaction confirmation email",
      prompt:
        "Create a clean order confirmation email with order details, shipping information, customer support contact, and order tracking button.",
    },
    {
      id: "event",
      title: "Event Invitation",
      description: "Event or webinar invitation",
      prompt:
        "Design an elegant event invitation email with event details, speaker information, agenda highlights, and RSVP button.",
    },
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateFromText = async () => {
    if (!textPrompt.trim()) return

    setIsGenerating(true)
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const response = await fetch("/api/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textPrompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate template")
      }

      const { blocks: generatedBlocks } = await response.json()
      dispatch(setBlocks(generatedBlocks))
      onClose()
      setTextPrompt("")
    } catch (error) {
      console.error("Generation failed:", error)
      dispatch(setError("Failed to generate template. Please try again."))
    } finally {
      setIsGenerating(false)
      dispatch(setLoading(false))
    }
  }

  const generateFromTemplate = async () => {
    const template = templatePrompts.find((t) => t.id === selectedTemplate)
    if (!template) return

    setIsGenerating(true)
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      const response = await fetch("/api/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: template.prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate template")
      }

      const { blocks: generatedBlocks } = await response.json()
      dispatch(setBlocks(generatedBlocks))
      onClose()
      setSelectedTemplate("")
    } catch (error) {
      console.error("Generation failed:", error)
      dispatch(setError("Failed to generate template. Please try again."))
    } finally {
      setIsGenerating(false)
      dispatch(setLoading(false))
    }
  }

  const generateFromImage = async () => {
    if (!uploadedImage) return

    setIsGenerating(true)
    dispatch(setLoading(true))
    dispatch(setError(null))

    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string

        const response = await fetch("/api/generate-from-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: base64Image,
            prompt:
              "Analyze this email template image and recreate it as email blocks. Identify text content, buttons, images, layout structure, colors, and styling. Generate corresponding email blocks that match the design and content as closely as possible.",
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate template from image")
        }

        const { blocks: generatedBlocks } = await response.json()
        dispatch(setBlocks(generatedBlocks))
        onClose()
        setUploadedImage(null)
        setImagePreview(null)
      }
      reader.readAsDataURL(uploadedImage)
    } catch (error) {
      console.error("Image generation failed:", error)
      dispatch(setError("Failed to generate template from image. Please try again."))
      setIsGenerating(false)
      dispatch(setLoading(false))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Template Generator
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="prompt" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="prompt" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Custom Prompt
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              From Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="space-y-4 mt-6">
            <div>
              <Label htmlFor="custom-prompt" className="text-foreground font-medium">
                Describe your email template
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                Be specific about the purpose, content, style, and any special requirements
              </p>
              <Textarea
                id="custom-prompt"
                placeholder="Example: Create a professional welcome email for a fitness app with a hero image, welcome message, app features overview, download buttons for iOS and Android, and social media links in the footer..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                rows={6}
                className="bg-background border-border text-foreground resize-none"
              />
            </div>
            <Button
              onClick={generateFromText}
              disabled={!textPrompt.trim() || isGenerating || isLoading}
              className="w-full"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Template"}
            </Button>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 mt-6">
            <div>
              <Label className="text-foreground font-medium">Choose a template type</Label>
              <p className="text-sm text-muted-foreground mb-4">Select from professionally crafted template prompts</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templatePrompts.map((template) => (
                <div
                  key={template.id}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-all
                    ${
                      selectedTemplate === template.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-border/80 hover:bg-accent/50"
                    }
                  `}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h3 className="font-semibold text-foreground mb-1">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{template.prompt}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={generateFromTemplate}
              disabled={!selectedTemplate || isGenerating || isLoading}
              className="w-full"
              size="lg"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Selected Template"}
            </Button>
          </TabsContent>

          <TabsContent value="image" className="space-y-4 mt-6">
            <div>
              <Label className="text-foreground font-medium">Upload email template image</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Upload a screenshot or image of an email template to recreate it
              </p>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Uploaded template"
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUploadedImage(null)
                        setImagePreview(null)
                      }}
                    >
                      Remove Image
                    </Button>
                    <Button onClick={generateFromImage} disabled={isGenerating || isLoading}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGenerating ? "Analyzing..." : "Generate from Image"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground mb-2">Drop your image here or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">Supports PNG, JPG, JPEG files up to 10MB</p>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} className="max-w-xs mx-auto" />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

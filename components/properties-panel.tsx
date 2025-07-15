"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Settings, Palette, Type, Layout } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { updateBlock } from "@/lib/features/email/emailSlice"

export function PropertiesPanel() {
  const dispatch = useAppDispatch()
  const { selectedBlock } = useAppSelector((state) => state.email)

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-card border-l border-border p-4 mobile-hidden">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Properties</h3>
        </div>
        <div className="text-center text-muted-foreground mt-8">
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    )
  }

  const updateContent = (content: string) => {
    dispatch(updateBlock({ id: selectedBlock.id, updates: { content } }))
  }

  const updateText = (text: string) => {
    dispatch(updateBlock({ id: selectedBlock.id, updates: { text } }))
  }

  const updateStyle = (key: string, value: string) => {
    dispatch(
      updateBlock({
        id: selectedBlock.id,
        updates: {
          styles: { ...selectedBlock.styles, [key]: value },
        },
      }),
    )
  }

  const renderProperties = () => {
    switch (selectedBlock.type) {
      case "text":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-4 h-4 text-primary" />
                <Label className="text-foreground font-medium">Content</Label>
              </div>
              <Textarea
                value={selectedBlock.content || ""}
                onChange={(e) => updateContent(e.target.value)}
                rows={3}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-primary" />
                <Label className="text-foreground font-medium">Appearance</Label>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Font Size</Label>
                  <Input
                    value={selectedBlock.styles?.fontSize || "16px"}
                    onChange={(e) => updateStyle("fontSize", e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Color</Label>
                  <Input
                    type="color"
                    value={selectedBlock.styles?.color || "#000000"}
                    onChange={(e) => updateStyle("color", e.target.value)}
                    className="bg-background border-border h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Text Align</Label>
                  <select
                    value={selectedBlock.styles?.textAlign || "left"}
                    onChange={(e) => updateStyle("textAlign", e.target.value)}
                    className="w-full p-2 bg-background border border-border rounded text-foreground"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )
      case "button":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-4 h-4 text-primary" />
                <Label className="text-foreground font-medium">Content</Label>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Button Text</Label>
                  <Input
                    value={selectedBlock.text || ""}
                    onChange={(e) => updateText(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">URL</Label>
                  <Input
                    value={selectedBlock.content || ""}
                    onChange={(e) => updateContent(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-primary" />
                <Label className="text-foreground font-medium">Appearance</Label>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Background</Label>
                  <Input
                    type="color"
                    value={selectedBlock.styles?.backgroundColor || "#3b82f6"}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="bg-background border-border h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Text Color</Label>
                  <Input
                    type="color"
                    value={selectedBlock.styles?.color || "#ffffff"}
                    onChange={(e) => updateStyle("color", e.target.value)}
                    className="bg-background border-border h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case "image":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Type className="w-4 h-4 text-primary" />
                <Label className="text-foreground font-medium">Content</Label>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Image URL</Label>
                  <Input
                    value={selectedBlock.content || ""}
                    onChange={(e) => updateContent(e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Alt Text</Label>
                  <Input
                    value={selectedBlock.alt || ""}
                    onChange={(e) => dispatch(updateBlock({ id: selectedBlock.id, updates: { alt: e.target.value } }))}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layout className="w-4 h-4 text-primary" />
                <Label className="text-foreground font-medium">Layout</Label>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Width</Label>
                <Input
                  value={selectedBlock.styles?.width || "100%"}
                  onChange={(e) => updateStyle("width", e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>
          </div>
        )
      case "spacer":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layout className="w-4 h-4 text-primary" />
                <Label className="text-foreground font-medium">Layout</Label>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground uppercase tracking-wider">Height</Label>
                <Input
                  value={selectedBlock.styles?.height || "20px"}
                  onChange={(e) => updateStyle("height", e.target.value)}
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>
          </div>
        )
      case "divider":
        return (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-primary" />
                <Label className="text-foreground font-medium">Appearance</Label>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Border Color</Label>
                  <Input
                    type="color"
                    value={selectedBlock.styles?.borderColor || "#e5e7eb"}
                    onChange={(e) => updateStyle("borderColor", e.target.value)}
                    className="bg-background border-border h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider">Border Width</Label>
                  <Input
                    value={selectedBlock.styles?.borderWidth || "1px"}
                    onChange={(e) => updateStyle("borderWidth", e.target.value)}
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-80 bg-card border-l border-border p-4 overflow-y-auto mobile-hidden">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground capitalize">{selectedBlock.type} Properties</h3>
      </div>
      {renderProperties()}
    </div>
  )
}

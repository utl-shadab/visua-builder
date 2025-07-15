"use client"

import { Eye, Smartphone, Monitor } from "lucide-react"
import { useAppSelector } from "@/lib/hooks"

export function Preview() {
  const { blocks, previewMode } = useAppSelector((state) => state.email)

  const renderBlock = (block: any) => {
    switch (block.type) {
      case "text":
        return (
          <div
            key={block.id}
            style={{
              fontSize: block.styles?.fontSize,
              color: block.styles?.color,
              textAlign: block.styles?.textAlign,
              fontWeight: block.styles?.fontWeight,
              marginBottom: "16px",
            }}
          >
            {block.content}
          </div>
        )
      case "button":
        return (
          <div key={block.id} style={{ textAlign: "center", marginBottom: "16px" }}>
            <a
              href={block.content}
              style={{
                display: "inline-block",
                backgroundColor: block.styles?.backgroundColor,
                color: block.styles?.color,
                borderRadius: block.styles?.borderRadius,
                padding: "12px 24px",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              {block.text}
            </a>
          </div>
        )
      case "image":
        return (
          <div key={block.id} style={{ marginBottom: "16px" }}>
            <img
              src={block.content || "/placeholder.svg"}
              alt={block.alt || "Image"}
              style={{
                width: block.styles?.width || "100%",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        )
      case "spacer":
        return <div key={block.id} style={{ height: block.styles?.height }} />
      case "divider":
        return (
          <hr
            key={block.id}
            style={{
              borderColor: block.styles?.borderColor,
              borderWidth: block.styles?.borderWidth,
              borderStyle: "solid",
              margin: "16px 0",
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Preview</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {previewMode === "desktop" ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          <span className="capitalize">{previewMode} View</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto bg-muted">
        <div
          className={`
            mx-auto bg-white rounded-lg overflow-hidden shadow-lg
            ${previewMode === "mobile" ? "max-w-sm" : "max-w-2xl"}
          `}
          style={{
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
          }}
        >
          <div className="p-6">
            {blocks.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p>No content to preview</p>
                <p className="text-sm mt-2">Add blocks to see the preview</p>
              </div>
            ) : (
              blocks.map(renderBlock)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

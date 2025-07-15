import { type NextRequest, NextResponse } from "next/server"
import mjml2html from "mjml"
import type { EmailBlock } from "@/types/block"

export async function POST(request: NextRequest) {
  try {
    const { blocks }: { blocks: EmailBlock[] } = await request.json()

    const mjmlContent = generateMJML(blocks)
    const { html, errors } = mjml2html(mjmlContent)

    if (errors.length > 0) {
      console.warn("MJML warnings:", errors)
    }

    return NextResponse.json({ html, mjml: mjmlContent })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Failed to export template" }, { status: 500 })
  }
}

function generateMJML(blocks: EmailBlock[]): string {
  const mjmlBlocks = blocks
    .map((block) => {
      switch (block.type) {
        case "section":
          return `
          <mj-section>
            <mj-column>
              ${generateMJML(block.children || [])}
            </mj-column>
          </mj-section>
        `
        case "heading":
          return `
          <mj-section>
            <mj-column>
              <mj-text
                font-size="${block.styles?.fontSize || "24px"}"
                font-weight="bold"
                color="${block.styles?.color || "#000000"}"
                align="${block.styles?.textAlign || "left"}"
              >
                ${block.content || "Your heading here"}
              </mj-text>
            </mj-column>
          </mj-section>
        `
        case "text":
          return `
          <mj-section>
            <mj-column>
              <mj-text 
                font-size="${block.styles?.fontSize || "16px"}" 
                color="${block.styles?.color || "#000000"}"
                align="${block.styles?.textAlign || "left"}"
                font-weight="${block.styles?.fontWeight || "normal"}"
              >
                ${block.content || "Your text here"}
              </mj-text>
            </mj-column>
          </mj-section>
        `
        case "button":
          return `
          <mj-section>
            <mj-column>
              <mj-button 
                background-color="${block.styles?.backgroundColor || "#007bff"}"
                color="${block.styles?.color || "#ffffff"}"
                font-size="${block.styles?.fontSize || "16px"}"
                border-radius="${block.styles?.borderRadius || "4px"}"
                href="${block.content || "#"}"
              >
                ${block.text || "Click Here"}
              </mj-button>
            </mj-column>
          </mj-section>
        `
        case "image":
          return `
          <mj-section>
            <mj-column>
              <mj-image 
                src="${block.content || "/placeholder.svg?height=200&width=400"}"
                alt="${block.alt || "Image"}"
                width="${block.styles?.width || "100%"}"
              />
            </mj-column>
          </mj-section>
        `
        case "spacer":
          return `
          <mj-section>
            <mj-column>
              <mj-spacer height="${block.styles?.height || "20px"}" />
            </mj-column>
          </mj-section>
        `
        case "divider":
          return `
          <mj-section>
            <mj-column>
              <mj-divider 
                border-color="${block.styles?.borderColor || "#cccccc"}"
                border-width="${block.styles?.borderWidth || "1px"}"
              />
            </mj-column>
          </mj-section>
        `
        default:
          return ""
      }
    })
    .join("")

  return `
    <mjml>
      <mj-head>
        <mj-title>Email Template</mj-title>
        <mj-preview>Preview text</mj-preview>
        <mj-attributes>
          <mj-all font-family="Arial, sans-serif" />
        </mj-attributes>
      </mj-head>
      <mj-body>
        ${mjmlBlocks}
      </mj-body>
    </mjml>
  `
}

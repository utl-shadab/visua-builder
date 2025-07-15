import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables")
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { image, prompt } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

    // Convert base64 to the format Gemini expects
    const base64Data = image.split(",")[1]
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: image.split(";")[0].split(":")[1] || "image/jpeg",
      },
    }

    const fullPrompt = `
      ${prompt}
      
      Analyze this email template image carefully and recreate it as email blocks.
      
      Return only a JSON array with blocks in this exact format:
      [
        {
          "id": "unique-id",
          "type": "text|button|image|spacer|divider",
          "content": "extracted or inferred content",
          "text": "button text (for buttons only)",
          "alt": "alt text (for images only)",
          "styles": {
            "fontSize": "16px",
            "color": "#000000",
            "backgroundColor": "#007bff",
            "textAlign": "left",
            "fontWeight": "normal",
            "borderRadius": "4px",
            "width": "100%",
            "height": "20px",
            "borderColor": "#cccccc",
            "borderWidth": "1px"
          }
        }
      ]
      
      Instructions:
      1. Identify all text elements and their styling (font size, color, alignment)
      2. Locate buttons and extract their text, colors, and styling
      3. Find images and note their positioning and dimensions
      4. Detect spacers and dividers for layout structure
      5. Preserve the overall layout and visual hierarchy
      6. Use appropriate colors that match the original design
      7. Ensure content is readable and professional
    `

    const result = await model.generateContent([fullPrompt, imagePart])
    const response = await result.response
    const text = response.text()

    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response")
    }

    const blocks = JSON.parse(jsonMatch[0])

    // Ensure each block has a unique ID
    const blocksWithIds = blocks.map((block: any, index: number) => ({
      ...block,
      id: `block-${Date.now()}-${index}`,
    }))

    return NextResponse.json({ blocks: blocksWithIds })
  } catch (error) {
    console.error("Generate from image error:", error)
    return NextResponse.json({ error: "Failed to generate template from image" }, { status: 500 })
  }
}

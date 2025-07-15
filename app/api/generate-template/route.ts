import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    // 1. Configure the model to use JSON Mode
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      },
      // Optional but recommended for debugging: disable safety filters
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
    })

    // 2. A clear prompt instructing the model about the desired JSON output
    const fullPrompt = `
      Generate a valid JSON array of email blocks for a professional email template.
      The user's goal for the template is: "${prompt}"
      Return ONLY the JSON array. Each object must have a unique "id".
    `
    
    // 3. Generate content and parse the guaranteed JSON response
    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    
    // The response text is now a clean JSON string, no regex needed
    const blocks = JSON.parse(response.text())

    return NextResponse.json({ blocks })
  } catch (error) {
    console.error("Error in /api/generate-template:", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json({ error: "Failed to generate template.", details: errorMessage }, { status: 500 })
  }
}
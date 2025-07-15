import { type NextRequest, NextResponse } from "next/server"

if (!process.env.BREVO_API_KEY) {
  throw new Error("Missing BREVO_API_KEY in environment variables")
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json()

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "VisuaBuild",
          email: "noreply@visualbuild.com",
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    const result = await response.json()
    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error) {
    console.error("Send email error:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { EmailBuilder } from "@/components/email-builder"

export default async function EditorPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return <EmailBuilder />
}

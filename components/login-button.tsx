"use client"

import { signIn, signOut } from "@/lib/auth"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut } from "lucide-react"

export function LoginButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button disabled className="bg-blue-600 hover:bg-blue-700">
        Loading...
      </Button>
    )
  }

  if (session) {
    return (
      <Button
        onClick={() => signOut()}
        variant="outline"
        size="lg"
        className="px-8 border-gray-600 text-gray-300 hover:bg-gray-800"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    )
  }

  return (
    <Button onClick={() => signIn("google")} size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
      <LogIn className="w-4 h-4 mr-2" />
      Sign in with Google
    </Button>
  )
}

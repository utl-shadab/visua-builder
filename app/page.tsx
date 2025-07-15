import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LoginButton } from "@/components/login-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect("/editor")
  } else {
    redirect("/landing")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">
            Visua<span className="text-blue-400">Build</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Create beautiful, responsive email templates with our intuitive drag-and-drop builder. No coding required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <LoginButton />
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                View Demo
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Drag & Drop Builder</h3>
              <p className="text-gray-400">Intuitive interface to build emails by dragging components</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">AI-Powered</h3>
              <p className="text-gray-400">Generate templates instantly with AI assistance</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Responsive Design</h3>
              <p className="text-gray-400">Templates that look perfect on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

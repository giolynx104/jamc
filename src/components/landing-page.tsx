'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function LandingPageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">JAMC</div>
          <div className="space-x-4">
            <Link href="/signin" className="text-white hover:text-blue-800">Login</Link>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-800">
          Welcome to JAMC: Empowering Education
        </h1>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          Join our innovative platform that connects teachers and students, 
          enhancing the learning experience through AI-driven recommendations 
          and personalized content.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/register/teacher">I&apos;m a Teacher</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/register/student">I&apos;m a Student</Link>
          </Button>
        </div>
      </main>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Driven Learning",
              description: "Personalized recommendations and adaptive content to suit your learning pace."
            },
            {
              title: "Interactive Classrooms",
              description: "Engage in real-time with teachers and peers through our virtual classroom environment."
            },
            {
              title: "Progress Tracking",
              description: "Monitor your learning journey with detailed analytics and achievement badges."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 JAMC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
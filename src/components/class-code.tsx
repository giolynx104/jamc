'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

export function ClassCodeComponent() {
  const [classCode, setClassCode] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the class code with your server
    console.log('Submitting class code:', classCode)
    router.push('/dashboard') // Redirect to the main dashboard after onboarding
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Enter Class Code</CardTitle>
          <CardDescription>If you have a class code, enter it below to join your class.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="classCode">Class Code</Label>
                <Input 
                  id="classCode" 
                  placeholder="Enter your class code" 
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleSubmit}>Join Class</Button>
          <Button variant="link" onClick={() => router.push('/dashboard')}>Skip for now</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

export function RoleConfirmationComponent() {
  const [role, setRole] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (role === 'teacher') {
      router.push('/onboarding/teacher-verification')
    } else if (role === 'student') {
      router.push('/onboarding/avatar-upload')
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Confirm Your Role</CardTitle>
          <CardDescription>Are you a teacher or a student?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup onValueChange={setRole} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="teacher" id="teacher" />
              <Label htmlFor="teacher">I&apos;m a Teacher</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student">I&apos;m a Student</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleContinue} disabled={!role}>Continue</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
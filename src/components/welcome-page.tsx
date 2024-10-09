'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export function WelcomePageComponent() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/onboarding/role-confirmation')
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to JAMC!</CardTitle>
          <CardDescription>We're excited to have you on board.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            Let's get your account set up so you can start learning or teaching right away.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            We'll guide you through a few quick steps to complete your profile.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleContinue}>Continue</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
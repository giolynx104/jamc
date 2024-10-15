'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WelcomePageComponent() {
  return (
    <>
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
    </>
  )
}

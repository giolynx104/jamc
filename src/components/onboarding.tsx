"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type OnboardingStep = 'welcome' | 'role' | 'teacherVerification' | 'avatar' | 'classCode'

export function OnboardingComponent() {
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [formData, setFormData] = useState({
    role: '',
    teacherDocument: null as File | null,
    avatar: '',
    classCode: '',
  })
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'teacherDocument' | 'avatar') => {
    if (e.target.files && e.target.files[0]) {
      if (field === 'avatar') {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setFormData(prev => ({ ...prev, [field]: e.target!.result as string }))
          }
        }
        reader.readAsDataURL(e.target.files[0])
      } else {
        setFormData(prev => ({ ...prev, [field]: e.target.files![0] }))
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form data:', formData)
    router.push('/dashboard')
  }

  const steps: OnboardingStep[] = ['welcome', 'role', 'teacherVerification', 'avatar', 'classCode']

  const nextStep = () => {
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1]
      if (nextStep === 'teacherVerification' && formData.role !== 'teacher') {
        setStep('avatar')
      } else if (nextStep === 'classCode' && formData.role !== 'student') {
        handleSubmit(new Event('submit') as unknown as React.FormEvent)
      } else {
        setStep(nextStep)
      }
    } else {
      handleSubmit(new Event('submit') as unknown as React.FormEvent)
    }
  }

  const prevStep = () => {
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1]
      if (prevStep === 'teacherVerification' && formData.role !== 'teacher') {
        setStep('role')
      } else {
        setStep(prevStep)
      }
    }
  }

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <>
            <CardHeader>
              <CardTitle>Welcome to JAMC!</CardTitle>
              <CardDescription>We&apos;re excited to have you on board.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">
                Let&apos;s get your account set up so you can start learning or teaching right away.
              </p>
              <p className="text-center text-sm text-muted-foreground">
                We&apos;ll guide you through a few quick steps to complete your profile.
              </p>
            </CardContent>
          </>
        )
      case 'role':
        return (
          <>
            <CardHeader>
              <CardTitle>Confirm Your Role</CardTitle>
              <CardDescription>Are you a teacher or a student?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))} className="flex flex-col space-y-2">
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
          </>
        )
      case 'teacherVerification':
        return (
          <>
            <CardHeader>
              <CardTitle>Teacher Verification</CardTitle>
              <CardDescription>Please upload a document to verify your teaching credentials.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="document">Upload Document</Label>
                  <Input id="document" type="file" onChange={(e) => handleFileChange(e, 'teacherDocument')} />
                </div>
              </div>
            </CardContent>
          </>
        )
      case 'avatar':
        return (
          <>
            <CardHeader>
              <CardTitle>Upload Your Avatar</CardTitle>
              <CardDescription>Choose a profile picture for your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  {formData.avatar && (
                    <div className="mb-4">
                      <Image src={formData.avatar} alt="Avatar preview" width={100} height={100} className="rounded-full mx-auto" />
                    </div>
                  )}
                  <Label htmlFor="avatar">Choose Image</Label>
                  <Input id="avatar" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} />
                </div>
              </div>
            </CardContent>
          </>
        )
      case 'classCode':
        return (
          <>
            <CardHeader>
              <CardTitle>Enter Class Code</CardTitle>
              <CardDescription>If you have a class code, enter it below to join your class.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="classCode">Class Code</Label>
                  <Input 
                    id="classCode"
                    name="classCode"
                    placeholder="Enter your class code" 
                    value={formData.classCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </>
        )
    }
  }

  const isNextDisabled = () => {
    switch (step) {
      case 'role':
        return !formData.role
      case 'teacherVerification':
        return !formData.teacherDocument
      case 'avatar':
        return !formData.avatar
      default:
        return false
    }
  }

  const totalSteps = formData.role === 'teacher' ? 4 : formData.role === 'student' ? 4 : 5
  const currentStepIndex = steps.indexOf(step)

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen space-y-8">
      <Card className="w-[350px]">
        {renderStep()}
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStepIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button 
            onClick={nextStep} 
            disabled={isNextDisabled()}
          >
            {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index <= currentStepIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
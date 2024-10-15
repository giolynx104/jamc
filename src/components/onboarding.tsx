"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WelcomePageComponent } from './welcome-page'
import { RoleConfirmationComponent } from './role-confirmation'
import { TeacherVerificationComponent } from './teacher-verification'
import { AvatarUploadComponent } from './avatar-upload'
import { ClassCodeComponent } from './class-code'
import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
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
        return <WelcomePageComponent />
      case 'role':
        return <RoleConfirmationComponent setFormData={setFormData} />
      case 'teacherVerification':
        return <TeacherVerificationComponent setFormData={setFormData} />
      case 'avatar':
        return <AvatarUploadComponent setFormData={setFormData} />
      case 'classCode':
        return <ClassCodeComponent setFormData={setFormData} />
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

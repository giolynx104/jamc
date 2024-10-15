'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form"
import { OnboardingInput } from "@/lib/validation-schemas"

interface TeacherVerificationProps {
  register: UseFormRegister<OnboardingInput>
  errors: FieldErrors<OnboardingInput>
  setValue: UseFormSetValue<OnboardingInput>
}

export function TeacherVerificationComponent({ register, errors, setValue }: TeacherVerificationProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue('teacherDocument', e.target.files[0])
    }
  }

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
            <Input id="document" type="file" onChange={handleFileChange} />
            {errors.teacherDocument && <p className="text-red-500 text-sm">{errors.teacherDocument.message}</p>}
          </div>
        </div>
      </CardContent>
    </>
  )
}

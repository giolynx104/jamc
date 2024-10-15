'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { OnboardingInput } from "@/lib/validation-schemas"

interface ClassCodeProps {
  register: UseFormRegister<OnboardingInput>
  errors: FieldErrors<OnboardingInput>
}

export function ClassCodeComponent({ register, errors }: ClassCodeProps) {
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
              {...register("classCode")}
              placeholder="Enter your class code" 
            />
            {errors.classCode && <p className="text-red-500 text-sm">{errors.classCode.message}</p>}
          </div>
        </div>
      </CardContent>
    </>
  )
}

'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { OnboardingInput } from "@/lib/validation-schemas"

interface RoleConfirmationProps {
  register: UseFormRegister<OnboardingInput>
  errors: FieldErrors<OnboardingInput>
}

export function RoleConfirmationComponent({ register, errors }: RoleConfirmationProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Confirm Your Role</CardTitle>
        <CardDescription>Are you a teacher or a student?</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="teacher" id="teacher" {...register("role")} />
            <Label htmlFor="teacher">I&apos;m a Teacher</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" {...register("role")} />
            <Label htmlFor="student">I&apos;m a Student</Label>
          </div>
        </RadioGroup>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
      </CardContent>
    </>
  )
}

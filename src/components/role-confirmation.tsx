'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RoleConfirmationProps {
  setFormData: React.Dispatch<React.SetStateAction<{
    role: string;
    teacherDocument: File | null;
    avatar: string;
    classCode: string;
  }>>
}

export function RoleConfirmationComponent({ setFormData }: RoleConfirmationProps) {
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
            <Label htmlFor="teacher">I'm a Teacher</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" />
            <Label htmlFor="student">I'm a Student</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </>
  )
}

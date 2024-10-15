'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ClassCodeProps {
  setFormData: React.Dispatch<React.SetStateAction<{
    role: string;
    teacherDocument: File | null;
    avatar: string;
    classCode: string;
  }>>
}

export function ClassCodeComponent({ setFormData }: ClassCodeProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

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
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </>
  )
}

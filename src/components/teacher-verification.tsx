'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TeacherVerificationProps {
  setFormData: React.Dispatch<React.SetStateAction<{
    role: string;
    teacherDocument: File | null;
    avatar: string;
    classCode: string;
  }>>
}

export function TeacherVerificationComponent({ setFormData }: TeacherVerificationProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, teacherDocument: e.target.files![0] }))
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
          </div>
        </div>
      </CardContent>
    </>
  )
}

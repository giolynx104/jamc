'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

export function TeacherVerificationComponent() {
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically upload the file to your server
    console.log('Uploading file:', file)
    router.push('/onboarding/avatar-upload')
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Teacher Verification</CardTitle>
          <CardDescription>Please upload a document to verify your teaching credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="document">Upload Document</Label>
                <Input id="document" type="file" onChange={handleFileChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={!file}>Submit for Verification</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
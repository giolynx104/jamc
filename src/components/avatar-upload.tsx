'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User } from 'lucide-react'

export function AvatarUploadComponent() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('No file chosen')
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFileName(file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically upload the avatar to your server
    console.log('Uploading avatar:', avatar)
    router.push('/onboarding/class-code')
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Upload Your Avatar</CardTitle>
          <CardDescription>Choose a profile picture for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <div className="mb-4">
                  {avatar ? (
                    <Image src={avatar} alt="Avatar preview" width={100} height={100} className="rounded-full mx-auto" />
                  ) : (
                    <User size={100} className="mx-auto text-gray-400" />
                  )}
                </div>
                <Label htmlFor="avatar">Choose Image</Label>
                <div className="flex items-center">
                  <label htmlFor="avatar" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-4 rounded-l cursor-pointer transition-colors duration-200 ease-in-out text-sm">
                    Browse
                  </label>
                  <span className="py-1 px-2 bg-white flex-grow text-sm truncate" title={fileName}>{fileName}</span>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>Continue</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
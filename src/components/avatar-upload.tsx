'use client'

import { useState } from 'react'
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form"
import { OnboardingInput } from "@/lib/validation-schemas"

interface AvatarUploadProps {
  register: UseFormRegister<OnboardingInput>
  errors: FieldErrors<OnboardingInput>
  setValue: UseFormSetValue<OnboardingInput>
}

export function AvatarUploadComponent({ register, errors, setValue }: AvatarUploadProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarPreview(e.target.result as string)
          setValue('avatar', e.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Upload Your Avatar</CardTitle>
        <CardDescription>Choose a profile picture for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            {avatarPreview && (
              <div className="mb-4">
                <Image src={avatarPreview} alt="Avatar preview" width={100} height={100} className="rounded-full mx-auto" />
              </div>
            )}
            <Label htmlFor="avatar">Choose Image</Label>
            <Input id="avatar" type="file" accept="image/*" onChange={handleFileChange} />
            {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
          </div>
        </div>
      </CardContent>
    </>
  )
}

"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { OnboardingInput } from "@/lib/validation-schemas";
import { getSignedUrlConfigured } from "@/actions";

interface AvatarUploadProps {
  register: UseFormRegister<OnboardingInput>;
  errors: FieldErrors<OnboardingInput>;
  setValue: UseFormSetValue<OnboardingInput>;
}

export function AvatarUploadComponent({
  register,
  errors,
  setValue,
}: AvatarUploadProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);

      try {
        // Get signed URL
        const { success, error } = await getSignedUrlConfigured(file.type);
        if (error) throw new Error(error);
        if (!success?.url) throw new Error("No URL returned");

        // Upload to S3
        const response = await fetch(success.url, {
          method: "PUT",
          body: file,
          headers: { "Content-Type": file.type },
        });

        if (!response.ok) throw new Error("Upload failed");

        // Get the public URL
        const publicUrl = success.url.split("?")[0];

        // Set preview and form value
        setAvatarPreview(publicUrl);
        setValue("avatar", publicUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        // TODO: Show error message to user
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Upload Your Avatar</CardTitle>
        <CardDescription>
          Choose a profile picture for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            {avatarPreview && (
              <div className="mb-4">
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
              </div>
            )}
            <Label htmlFor="avatar">Choose Image</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading && <p>Uploading...</p>}
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </>
  );
}

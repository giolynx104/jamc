"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OAuthSection } from "@/components/oauth-section";

export function SignUpLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign up for JAMC
          </CardTitle>
          <CardDescription className="text-center">
            Choose your role to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OAuthSection />

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
              Or
            </span>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => router.push("/register/teacher")}
              className="w-full"
              variant="outline"
            >
              Sign up as a Teacher
            </Button>
            <Button
              onClick={() => router.push("/register/student")}
              className="w-full"
              variant="outline"
            >
              Sign up as a Student
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => router.push("/signin")}
            >
              Log in
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

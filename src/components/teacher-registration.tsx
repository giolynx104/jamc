"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { PasswordField } from "@/components/password-field";
import { OAuthSection } from "@/components/oauth-section";
import { teacherRegistrationSchema, TeacherRegistrationInput } from "@/lib/validation-schemas";

export function TeacherRegistrationComponent() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeacherRegistrationInput>({
    resolver: zodResolver(teacherRegistrationSchema),
  });

  const onSubmit = async (data: TeacherRegistrationInput) => {
    setError("");

    try {
      // Here you would typically make an API call to register the teacher
      // For demonstration, we'll just simulate a successful registration
      console.log("Teacher registration data:", data);
      router.push("/teacher-dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Teacher Registration
          </CardTitle>
          <CardDescription className="text-center">
            Join JAMC and start creating your classes
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <PasswordField
              id="password"
              label="Password"
              {...register("password")}
              error={errors.password}
            />
            <PasswordField
              id="confirmPassword"
              label="Confirm Password"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
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

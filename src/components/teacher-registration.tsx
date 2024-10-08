"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export function TeacherRegistrationComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Here you would typically make an API call to register the teacher
      // For demonstration, we'll just simulate a successful registration
      console.log("Teacher registration data:", formData);
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
              />
            </div>
            <PasswordField
              id="password"
              name="password"
              label="Password"
              required
              onChange={handleChange}
            />
            <PasswordField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              required
              onChange={handleChange}
            />
            <div>
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                name="schoolName"
                type="text"
                required
                onChange={handleChange}
              />
            </div>
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

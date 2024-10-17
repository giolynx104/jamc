"use server";

import { signIn } from "@/auth";
import {
  OnboardingInput,
  SignInInput,
} from "@/lib/validation-schemas";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function signUp(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Missing required fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ONBOARDING",
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    console.error("Error during sign up:", error);
    return { error: "An error occurred during sign up" };
  }
}

export async function handleSignIn(provider: string) {
  await signIn(provider, { redirectTo: "/onboarding" });
}

export async function persistOnboardingData(data: OnboardingInput) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  const { role, teacherDocument, avatar, classCode } = data;

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        role: role,
        image: avatar,
      },
    });

    if (role === "TEACHER") {
      // Handle teacher-specific data
      if (teacherDocument) {
        // TODO: Implement file upload for teacher document
        console.log("Teacher document received:", teacherDocument);
      }
    } else if (role === "STUDENT") {
      // Handle student-specific data
      if (classCode) {
        // TODO: Implement class enrollment logic
        console.log("Class code received:", classCode);
      }
    }

    return {
      success: true,
      message: "Onboarding data saved successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error persisting onboarding data:", error);
    return { success: false, message: "Failed to save onboarding data" };
  }
}

export async function signInUser(data: SignInInput) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      return { success: false, message: "Invalid email or password" };
    } else {
      return { success: true, message: "Sign in successful" };
    }
  } catch (error) {
    console.error("Error signing in user:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

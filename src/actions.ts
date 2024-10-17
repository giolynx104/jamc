"use server";

import { signIn, signOut as nextAuthSignOut } from "@/auth";
import { OnboardingInput, SignInInput, UserProfile, EnrolledCourse } from "@/lib/validation-schemas";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const generateFileName = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const getSignedUrlConfigured = async (type: string) => {
  try {
    const session = await auth();
    if (!session) {
      return { error: "Unauthorized" };
    }

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${generateFileName()}.${type.split("/")[1]}`,
      ContentType: type,
    });

    const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 360,
    });
    return { success: { url: signedUrl } };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return { error: "Failed to generate signed URL" };
  }
};

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

export async function persistOnboardingData(
  data: Omit<OnboardingInput, "avatar"> & { avatar?: string }
) {
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
        image: avatar, // Now avatar is a string URL
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

export async function getUserProfile(): Promise<UserProfile | null> {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        creditPoints: true,
        certificates: true,
      },
    });

    return user; // This will be of type UserProfile
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function signOut() {
  try {
    await nextAuthSignOut({ redirect: false });
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, message: "An error occurred while signing out" };
  }
}

"use server";

import { signIn } from "@/auth";
import { OnboardingInput } from "@/lib/validation-schemas";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

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

    return { success: true, message: "Onboarding data saved successfully", user: updatedUser };
  } catch (error) {
    console.error("Error persisting onboarding data:", error);
    return { success: false, message: "Failed to save onboarding data" };
  }
}

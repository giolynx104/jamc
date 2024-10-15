"use server";

import { signIn } from "@/auth";
import { OnboardingInput } from "@/lib/validation-schemas";

export async function handleSignIn(provider: string) {
  await signIn(provider, { redirectTo: "/onboarding" });
}

export async function persistOnboardingData(data: OnboardingInput) {
  // TODO: Implement the logic to persist the onboarding data
  // This might involve saving to a database, updating user profile, etc.
  console.log("Persisting onboarding data:", data);
  
  // For now, we'll just return a success message
  return { success: true, message: "Onboarding data saved successfully" };
}

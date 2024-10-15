import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { OnboardingComponent } from "@/components/onboarding";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email ?? undefined },
    select: { role: true },
  });

  if (user?.role !== "ONBOARDING") {
    redirect(`/dashboard/${user?.role.toLowerCase()}`);
  }

  return <OnboardingComponent />;
}

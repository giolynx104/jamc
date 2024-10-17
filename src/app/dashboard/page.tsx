import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    redirect("/signin");
  }

  const userRole = user.role;

  if (userRole === "TEACHER") {
    redirect("/dashboard/teacher");
  } else if (userRole === "STUDENT") {
    redirect("/dashboard/student");
  } else if (userRole === "ONBOARDING") {
    redirect("/onboarding");
  } else {
    redirect("/error");
  }
}

import { StudentDashboardComponent } from "@/components/student-dashboard"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { UserProfile } from "@/lib/validation-schemas"
import { redirect } from "next/navigation"

export default async function StudentDashboardPage() {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      creditPoints: true,
      certificates: true,
      enrollments: {
        include: {
          course: true,
        },
      },
    },
  }) as UserProfile | null

  if (!user) {
    redirect('/login')
  }

  return <StudentDashboardComponent user={user} />
}

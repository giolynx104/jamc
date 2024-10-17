import { StudentDashboardComponent } from "@/components/student-dashboard"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { UserProfile, userProfileInclude } from "@/lib/validation-schemas"
import { redirect } from "next/navigation"

export default async function StudentDashboardPage() {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect('/signin')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: userProfileInclude,
  }) as UserProfile | null

  if (!user) {
    redirect('/signin')
  }

  const enrolledCourses = await prisma.course.findMany({
    where: {
      enrollments: {
        some: {
          studentId: user.id
        }
      }
    }
  })

  return <StudentDashboardComponent user={user} enrolledCourses={enrolledCourses} />
}

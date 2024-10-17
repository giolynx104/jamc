import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RecommendedCourse {
  id: number
  name: string
  description: string
}

interface RecommendedCoursesProps {
  courses: RecommendedCourse[]
}

export function RecommendedCourses({ courses }: RecommendedCoursesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Courses</CardTitle>
      </CardHeader>
      <CardContent>
        {courses.map((course) => (
          <div key={course.id} className="mb-4">
            <h3 className="font-semibold">{course.name}</h3>
            <p className="text-sm text-muted-foreground">{course.description}</p>
            <Button variant="outline" className="mt-2">Enroll</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

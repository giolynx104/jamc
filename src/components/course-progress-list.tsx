import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Course {
  id: number
  name: string
  progress: number
  notifications: number
}

interface CourseProgressListProps {
  courses: Course[]
  showFullList?: boolean
}

export function CourseProgressList({ courses, showFullList = false }: CourseProgressListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {courses.map((course) => (
          <div key={course.id} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{course.name}</h3>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">{course.progress}%</span>
                {course.notifications > 0 && (
                  <Badge variant="destructive">{course.notifications}</Badge>
                )}
              </div>
            </div>
            <Progress value={course.progress} className="w-full" />
            {showFullList && <Button variant="link" className="mt-2 p-0">Go to course</Button>}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

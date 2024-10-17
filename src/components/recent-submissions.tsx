import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Submission {
  id: number
  studentName: string
  className: string
  assignmentName: string
  grade: string
}

interface RecentSubmissionsProps {
  submissions: Submission[]
}

export function RecentSubmissions({ submissions }: RecentSubmissionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {submissions.map((submission, index) => (
            <div key={submission.id} className="mb-4">
              <h3 className="font-semibold">{submission.studentName}</h3>
              <p className="text-sm text-muted-foreground">{submission.className} - {submission.assignmentName}</p>
              <div className="flex items-center justify-between mt-1">
                <Badge>{submission.grade}</Badge>
              </div>
              {index < submissions.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

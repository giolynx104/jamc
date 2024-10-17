import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface Discussion {
  id: number
  title: string
  course: string
  votes: number
  answers: number
}

interface DiscussionListProps {
  discussions: Discussion[]
  showFullList?: boolean
  maxItems?: number
}

export function DiscussionList({ discussions, showFullList = false, maxItems = 3 }: DiscussionListProps) {
  const displayedDiscussions = showFullList ? discussions : discussions.slice(0, maxItems)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Recent Discussions</CardTitle>
        <div className="space-x-2">
          {!showFullList && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/discussions">View All</Link>
            </Button>
          )}
          <Button variant="default" size="sm">
            Ask a Question
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`${showFullList ? 'h-[calc(100vh-300px)]' : `h-[${maxItems * 100}px]`} pr-4`}>
          {displayedDiscussions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <Link href={`/discussions/${question.id}`}>
                <h3 className="font-semibold hover:underline">{question.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">{question.course}</p>
              <div className="flex items-center space-x-2 mt-1">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">{question.votes}</span>
                <MessageSquare className="h-4 w-4 ml-2" />
                <span className="text-sm">{question.answers}</span>
              </div>
              {index < displayedDiscussions.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

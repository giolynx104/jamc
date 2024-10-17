"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ThumbsUp, ThumbsDown, MessageSquare, Paperclip, Search, Filter } from 'lucide-react'

// Mock data
const questions = [
  {
    id: 1,
    title: "How to solve quadratic equations?",
    description: "I'm having trouble understanding the steps to solve quadratic equations. Can someone explain?",
    tags: ["Math", "Algebra"],
    votes: 15,
    answers: 3,
    isPrivate: false,
    hasAttachment: true,
    author: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
      creditPoints: 120,
      badges: ["Top Answerer"]
    }
  },
  {
    id: 2,
    title: "What were the main causes of World War II?",
    description: "I need help summarizing the key factors that led to World War II.",
    tags: ["History", "World War II"],
    votes: 8,
    answers: 2,
    isPrivate: true,
    hasAttachment: false,
    author: {
      name: "Jane Smith",
      avatar: "https://github.com/shadcn.png",
      creditPoints: 85,
      badges: ["Active Participant"]
    }
  },
  // Add more mock questions as needed
]

export function DiscussionsComponent() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPrivate, setShowPrivate] = useState(false)

  const filteredQuestions = questions.filter(q => 
    (showPrivate || !q.isPrivate) &&
    (q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Discussions</h1>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="private" checked={showPrivate} onCheckedChange={setShowPrivate} />
                  <label htmlFor="private">Show Private Questions</label>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <ul className="space-y-2">
                    <li><Button variant="ghost" className="w-full justify-start">Answered</Button></li>
                    <li><Button variant="ghost" className="w-full justify-start">Unanswered</Button></li>
                    <li><Button variant="ghost" className="w-full justify-start">Popular</Button></li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Math</Badge>
                    <Badge>History</Badge>
                    <Badge>Science</Badge>
                    <Badge>Literature</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Questions</CardTitle>
                <Button>Ask Question</Button>
              </div>
              <CardDescription>
                <div className="flex items-center space-x-2 mt-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search questions..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Questions</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <ScrollArea className="h-[600px]">
                    {filteredQuestions.map((question) => (
                      <QuestionCard key={question.id} question={question} />
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="unanswered">
                  <ScrollArea className="h-[600px]">
                    {filteredQuestions.filter(q => q.answers === 0).map((question) => (
                      <QuestionCard key={question.id} question={question} />
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ question }) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{question.title}</CardTitle>
            <CardDescription>{question.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={question.author.avatar} alt={question.author.name} />
              <AvatarFallback>{question.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{question.author.name}</p>
              <p className="text-muted-foreground">{question.author.creditPoints} points</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-2">
          {question.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
          {question.isPrivate && <Badge variant="destructive">Private</Badge>}
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{question.votes}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{question.answers} answers</span>
          </div>
          {question.hasAttachment && (
            <div className="flex items-center">
              <Paperclip className="h-4 w-4 mr-1" />
              <span>Attachment</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Question</Button>
      </CardFooter>
    </Card>
  )
}
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, BookOpen, Calendar, ChevronRight } from 'lucide-react'

// Mock data
const enrolledCourses = [
  { id: 1, name: "Mathematics 101", progress: 65 },
  { id: 2, name: "History: World War II", progress: 30 },
  { id: 3, name: "Introduction to Biology", progress: 80 },
]

const upcomingAssignments = [
  { id: 1, title: "Math Quiz", course: "Mathematics 101", dueDate: "2024-10-20" },
  { id: 2, title: "History Essay", course: "History: World War II", dueDate: "2024-10-25" },
]

const recommendedCourses = [
  { id: 1, name: "Advanced Algebra", description: "Take your math skills to the next level" },
  { id: 2, name: "Ancient Civilizations", description: "Explore the wonders of ancient history" },
]

export function StudentDashboardComponent() {
  const [classCode, setClassCode] = useState('')

  const handleJoinClass = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Joining class with code:', classCode)
    // Here you would typically make an API call to join the class
    setClassCode('')
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, Student!</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {enrolledCourses.map((course) => (
              <div key={course.id} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{course.name}</h3>
                  <span className="text-sm text-muted-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="w-full" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Join a New Class</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinClass}>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter class code"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                />
                <Button type="submit">Join</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="mb-4">
                <h3 className="font-semibold">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground">{assignment.course}</p>
                <p className="text-sm">Due: {assignment.dueDate}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {recommendedCourses.map((course) => (
              <div key={course.id} className="mb-4">
                <h3 className="font-semibold">{course.name}</h3>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>You completed Chapter 3 in Mathematics 101</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>New assignment added to History: World War II</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="w-full">
              View All Activity <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
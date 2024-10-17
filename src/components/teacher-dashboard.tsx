"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Users, PlusCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { RecentSubmissions } from '@/components/recent-submissions'
import { DiscussionList } from '@/components/discussion-list'
import { DashboardHeader } from "@/components/dashboard-header"

// Mock data
const teacherClasses = [
  { id: 1, name: "Mathematics 101", students: 25, avgProgress: 65 },
  { id: 2, name: "Advanced Algebra", students: 20, avgProgress: 72 },
  { id: 3, name: "Geometry Basics", students: 30, avgProgress: 58 },
]

const recentSubmissions = [
  { id: 1, studentName: "Alice Johnson", className: "Mathematics 101", assignmentName: "Quadratic Equations", grade: "A" },
  { id: 2, studentName: "Bob Smith", className: "Advanced Algebra", assignmentName: "Matrix Operations", grade: "B+" },
  { id: 3, studentName: "Charlie Brown", className: "Geometry Basics", assignmentName: "Triangle Congruence", grade: "A-" },
]

const discussionQuestions = [
  { id: 1, title: "Difficulty with integration by parts", course: "Advanced Algebra", votes: 15, answers: 3 },
  { id: 2, title: "Proving the Pythagorean theorem", course: "Geometry Basics", votes: 8, answers: 2 },
  { id: 3, title: "Real-world applications of linear equations", course: "Mathematics 101", votes: 12, answers: 5 },
]

const studentProgressData = [
  { name: 'Week 1', avgProgress: 75, topPerformer: 90, lowPerformer: 60 },
  { name: 'Week 2', avgProgress: 78, topPerformer: 95, lowPerformer: 62 },
  { name: 'Week 3', avgProgress: 80, topPerformer: 98, lowPerformer: 65 },
  { name: 'Week 4', avgProgress: 82, topPerformer: 100, lowPerformer: 68 },
]

export function TeacherDashboardComponent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  {teacherClasses.map((cls) => (
                    <div key={cls.id} className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{cls.name}</h3>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span className="text-sm text-muted-foreground">{cls.students}</span>
                        </div>
                      </div>
                      <Progress value={cls.avgProgress} className="w-full" />
                      <p className="text-sm text-muted-foreground mt-1">Average progress: {cls.avgProgress}%</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <PlusCircle className="h-4 w-4 mr-2" /> Create New Class
                  </Button>
                </CardFooter>
              </Card>

              <RecentSubmissions submissions={recentSubmissions} />
            </div>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Manage Classes</CardTitle>
              </CardHeader>
              <CardContent>
                {teacherClasses.map((cls) => (
                  <div key={cls.id} className="mb-4">
                    <h3 className="font-semibold">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground">Students: {cls.students}</p>
                    <p className="text-sm text-muted-foreground">Average Progress: {cls.avgProgress}%</p>
                    <div className="mt-2 space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Manage Students</Button>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Create New Class
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-4">
            <DiscussionList discussions={discussionQuestions} showFullList />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={studentProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgProgress" fill="#8884d8" name="Average Progress" />
                    <Bar dataKey="topPerformer" fill="#82ca9d" name="Top Performer" />
                    <Bar dataKey="lowPerformer" fill="#ffc658" name="Low Performer" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {teacherClasses.map((cls) => (
                  <div key={cls.id} className="mb-4">
                    <h3 className="font-semibold">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground">Students: {cls.students}</p>
                    <Progress value={cls.avgProgress} className="w-full mt-2" />
                    <p className="text-sm text-muted-foreground mt-1">Average progress: {cls.avgProgress}%</p>
                    <Separator className="my-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

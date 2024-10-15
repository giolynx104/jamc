"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Bell, BookOpen, Users, AlertCircle, ChevronRight } from 'lucide-react'

// Mock data
const classesData = [
  { name: 'Math 101', students: 25, avgScore: 85 },
  { name: 'Science 202', students: 30, avgScore: 78 },
  { name: 'History 303', students: 22, avgScore: 92 },
]

const studentProgressData = [
  { name: 'Week 1', completed: 75, target: 80 },
  { name: 'Week 2', completed: 82, target: 80 },
  { name: 'Week 3', completed: 78, target: 80 },
  { name: 'Week 4', completed: 85, target: 80 },
]

const flaggedStudents = [
  { id: 1, name: "Alice Johnson", reason: "Falling behind in Math 101" },
  { id: 2, name: "Bob Smith", reason: "Excelling in Science 202" },
]

export function TeacherDashboardComponent() {
  const [newClassName, setNewClassName] = useState('')

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating new class:', newClassName)
    // Here you would typically make an API call to create a new class
    setNewClassName('')
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, Teacher!</h1>
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
            <CardTitle>Class Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="students" fill="#8884d8" name="Students" />
                <Bar yAxisId="right" dataKey="avgScore" fill="#82ca9d" name="Avg. Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create New Class</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateClass}>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  placeholder="Enter class name"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                />
                <Button type="submit">Create Class</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={studentProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                <Bar dataKey="target" fill="#82ca9d" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flagged Students</CardTitle>
          </CardHeader>
          <CardContent>
            {flaggedStudents.map((student) => (
              <div key={student.id} className="mb-4 flex items-start">
                <AlertCircle className="mr-2 h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.reason}</p>
                </div>
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
                <span>New assignment submitted in Math 101</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>5 new students joined Science 202</span>
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
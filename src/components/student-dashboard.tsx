"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Home, Calendar, Settings, GraduationCap } from "lucide-react";
import { CourseProgressList } from "@/components/course-progress-list";
import { DiscussionList } from "@/components/discussion-list";
import { RecommendedCourses } from "@/components/recommended-courses";
import { ProfileCard } from "@/components/profile-card";
import { AccountSettingsCard } from "@/components/account-settings-card";
import { UserProfile } from "@/lib/validation-schemas";

// Mock data for recommended courses and discussions (we'll replace these later)
const recommendedCourses = [
  {
    id: 1,
    name: "Advanced Algebra",
    description: "Take your math skills to the next level",
  },
  {
    id: 2,
    name: "Ancient Civilizations",
    description: "Explore the wonders of ancient history",
  },
];

const discussionQuestions = [
  {
    id: 1,
    title: "How to solve quadratic equations?",
    course: "Mathematics 101",
    votes: 15,
    answers: 3,
  },
  {
    id: 2,
    title: "Causes of World War II",
    course: "History: World War II",
    votes: 8,
    answers: 2,
  },
  {
    id: 3,
    title: "Cell structure and function",
    course: "Introduction to Biology",
    votes: 12,
    answers: 5,
  },
];

interface StudentDashboardComponentProps {
  user: UserProfile;
}

export function StudentDashboardComponent({ user }: StudentDashboardComponentProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const enrolledCourses = user.enrollments.map(enrollment => ({
    id: enrollment.course.id,
    name: enrollment.course.title,
    progress: 0, // You might want to calculate this based on user progress
    notifications: 0, // You might want to fetch this from somewhere
  }));

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <GraduationCap className="h-8 w-8 mr-2" />
                <span className="font-bold text-xl">JAMC</span>
              </Link>
              <nav className="ml-10 flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Home className="h-5 w-5" />
                </Link>
                <Link
                  href="/schedule"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Calendar className="h-5 w-5" />
                </Link>
                <Link
                  href="/settings"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CourseProgressList courses={enrolledCourses} />
              <DiscussionList discussions={discussionQuestions} maxItems={3} />
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <CourseProgressList courses={enrolledCourses} showFullList />
            <RecommendedCourses courses={recommendedCourses} />
          </TabsContent>

          <TabsContent value="discussions" className="space-y-4">
            <DiscussionList discussions={discussionQuestions} showFullList />
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <ProfileCard
              name={user.name}
              email={user.email}
              role={user.role}
              image={user.image}
              creditPoints={user.creditPoints?.pointsTotal || 0}
              certificates={user.certificates}
            />
            <AccountSettingsCard email={user.email} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseProgressList } from "@/components/course-progress-list";
import { DiscussionList } from "@/components/discussion-list";
import { RecommendedCourses } from "@/components/recommended-courses";
import { ProfileCard } from "@/components/profile-card";
import { AccountSettingsCard } from "@/components/account-settings-card";
import { DashboardHeader } from "@/components/dashboard-header";
import { UserProfile } from "@/lib/validation-schemas";
import { Course } from "@prisma/client";

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
  enrolledCourses: Course[];
}

export function StudentDashboardComponent({ user, enrolledCourses }: StudentDashboardComponentProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader userImage={user.image} userName={user.name} />

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

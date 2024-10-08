import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaBook className="mr-2" /> My Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>You are enrolled in 3 courses.</p>
            <Button className="mt-4">View Courses</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaChalkboardTeacher className="mr-2" /> Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have 2 classes scheduled this week.</p>
            <Button className="mt-4">View Schedule</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaUserGraduate className="mr-2" /> My Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>You&apos;ve completed 65% of your current course.</p>
            <Button className="mt-4">View Progress</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <ul className="list-disc pl-5">
          <li>Completed &quot;Introduction to Algebra&quot; quiz</li>
          <li>Submitted essay for &quot;World History&quot; course</li>
          <li>Joined live session for &quot;Biology 101&quot;</li>
        </ul>
      </div>
    </div>
  );
}

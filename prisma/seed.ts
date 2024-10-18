import {
  PrismaClient,
  Role,
  AccessType,
  AchievementType,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.certificate.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.creditPoint.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const hashedPassword = await bcrypt.hash("Password123!", 10);

  const student = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      role: Role.STUDENT,
      password: hashedPassword,
    },
  });

  const teacher = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      role: Role.TEACHER,
      password: hashedPassword,
    },
  });

  // Create a course
  const course = await prisma.course.create({
    data: {
      title: "Introduction to Programming",
      description: "Learn the basics of programming",
      rating: 4.5,
      teacherId: teacher.id,
    },
  });

  // Create lessons for the course
  const lesson1 = await prisma.lesson.create({
    data: {
      title: "Variables and Data Types",
      content: "Learn about variables and different data types in programming.",
      videoUrl: "https://example.com/lesson1-video",
      order: 1,
      courseId: course.id,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: "Control Structures",
      content: "Understand if-else statements and loops.",
      videoUrl: "https://example.com/lesson2-video",
      order: 2,
      courseId: course.id,
    },
  });

  // Enroll the student in the course
  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      accessType: AccessType.FREE,
      status: "ACTIVE",
    },
  });

  // Add progress for the student
  await prisma.progress.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      lessonId: lesson1.id,
      lessonCompletion: true,
      quizResults: { score: 80 },
    },
  });

  // Add credit points for the student
  await prisma.creditPoint.create({
    data: {
      studentId: student.id,
      pointsTotal: 100,
      pointsBreakdown: { course_completion: 50, quiz_scores: 50 },
      badgesEarned: ["quick_learner", "perfect_attendance"],
    },
  });

  // Add a certificate for the student
  await prisma.certificate.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      achievement: AchievementType.CERTIFICATE,
      dateIssued: new Date(),
    },
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

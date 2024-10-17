import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const teacherPassword = await bcrypt.hash("teacherpassword", 10);
  const studentPassword = await bcrypt.hash("studentpassword", 10);

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@example.com" },
    update: {},
    create: {
      email: "teacher@example.com",
      name: "Teacher User",
      password: teacherPassword,
      role: "TEACHER",
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: {},
    create: {
      email: "student@example.com",
      name: "Student User",
      password: studentPassword,
      role: "STUDENT",
    },
  });

  // Seed Course
  const course = await prisma.course.create({
    data: {
      title: "Introduction to Programming",
      description:
        "Learn the basics of programming with this comprehensive course.",
      teacherId: teacher.id,
    },
  });

  // Seed Lessons
  await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Variables and Data Types",
        content:
          "Learn about variables and different data types in programming.",
        videoUrl: "https://example.com/lesson1",
        order: 1,
        courseId: course.id,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Control Structures",
        content: "Understand if-else statements and loops in programming.",
        videoUrl: "https://example.com/lesson2",
        order: 2,
        courseId: course.id,
      },
    }),
  ]);

  // Seed Enrollment
  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      accessType: "FREE",
      status: "ACTIVE",
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

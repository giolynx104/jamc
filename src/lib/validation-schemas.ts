import { z } from "zod";
import { Prisma } from "@prisma/client";

const avatarSchema = z.object({
  file: z.instanceof(File),
  signedUrl: z.string().url(),
  publicUrl: z.string().url(),
});

export const onboardingSchema = z.object({
  role: z.enum(["TEACHER", "STUDENT"]),
  teacherDocument: z.instanceof(File).optional(),
  avatar: avatarSchema.optional(),
  classCode: z.string().optional(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

// Define the user profile include type
export const userProfileInclude = {
  creditPoints: true,
  certificates: true,
  enrollments: {
    include: {
      course: true,
    },
  },
} as const;

// Create a type based on the include
export type UserProfileInclude = typeof userProfileInclude;

// Define the UserProfile type using Prisma's generated types and our include
export type UserProfile = Prisma.UserGetPayload<{
  include: UserProfileInclude;
}>;

// If you still need a Zod schema for UserProfile, you can define it like this:
export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  role: z.enum(["ONBOARDING", "STUDENT", "TEACHER"]),
  password: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  creditPoints: z
    .object({
      pointsTotal: z.number(),
    })
    .nullable(),
  certificates: z.array(
    z.object({
      id: z.string(),
      achievement: z.enum(["CERTIFICATE", "BADGE"]),
      dateIssued: z.date(),
      studentId: z.string(),
      courseId: z.string(),
    })
  ),
  enrollments: z.array(
    z.object({
      id: z.string(),
      accessType: z.enum(["FREE", "PAID"]),
      status: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      studentId: z.string(),
      courseId: z.string(),
      course: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        rating: z.number(),
        createdAt: z.date(),
        updatedAt: z.date(),
        teacherId: z.string(),
      }),
    })
  ),
});

export type EnrolledCourse = {
  id: string;
  name: string;
  progress: number;
  notifications: number;
};

import { z } from "zod";
import { Role, AchievementType } from "@prisma/client";

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
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
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

// New schema for the user profile
export const userProfileSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  role: z.nativeEnum(Role),
  password: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  creditPoints: z.object({
    pointsTotal: z.number(),
  }).nullable(),
  certificates: z.array(z.object({
    id: z.string(),
    achievement: z.nativeEnum(AchievementType),
    dateIssued: z.date(),
  })),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

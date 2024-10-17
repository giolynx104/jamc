import { z } from "zod";

export const onboardingSchema = z.object({
  role: z.enum(["STUDENT", "TEACHER"], {
    required_error: "Please select a role",
  }),
  teacherDocument: z.instanceof(File).optional().nullable(),
  avatar: z.string().min(1, "Please upload an avatar"),
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

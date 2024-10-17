"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WelcomePageComponent } from "./welcome-page";
import { RoleConfirmationComponent } from "./role-confirmation";
import { TeacherVerificationComponent } from "./teacher-verification";
import { AvatarUploadComponent } from "./avatar-upload";
import { ClassCodeComponent } from "./class-code";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { onboardingSchema, OnboardingInput } from "@/lib/validation-schemas";
import { persistOnboardingData } from "@/actions";

type OnboardingStep =
  | "welcome"
  | "role"
  | "teacherVerification"
  | "avatar"
  | "classCode";

export function OnboardingComponent() {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
  });

  const role = watch("role");

  const onSubmit: SubmitHandler<OnboardingInput> = async (data) => {
    setIsSubmitting(true);
    console.log("Submitting form data:", data);
    try {
      const result = await persistOnboardingData(data);
      if (result.success) {
        router.push(`/dashboard/${data.role.toLowerCase()}`);
      } else {
        console.error("Failed to persist onboarding data:", result.message);
        // TODO: Show error message to user
      }
    } catch (error) {
      console.error("Error during onboarding submission:", error);
      // TODO: Show error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSteps = (): OnboardingStep[] => {
    const commonSteps: OnboardingStep[] = ["welcome", "role", "avatar"];
    if (!role) return commonSteps;
    return role === "TEACHER"
      ? [...commonSteps, "teacherVerification"]
      : [...commonSteps, "classCode"];
  };

  const nextStep = () => {
    const steps = getSteps();
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps = getSteps();
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSkipClassCode = () => {
    setValue("classCode", "");
    handleSubmit(onSubmit)();
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomePageComponent />;
      case "role":
        return (
          <RoleConfirmationComponent 
            register={register}
            errors={errors}
            value={role as "TEACHER" | "STUDENT" | undefined}
            onChange={(newRole: "TEACHER" | "STUDENT") => setValue("role", newRole)}
          />
        );
      case "teacherVerification":
        return (
          <TeacherVerificationComponent
            register={register}
            errors={errors}
            setValue={setValue}
          />
        );
      case "avatar":
        return (
          <AvatarUploadComponent
            register={register}
            errors={errors}
            setValue={setValue}
          />
        );
      case "classCode":
        return <ClassCodeComponent register={register} errors={errors} />;
    }
  };

  const isNextDisabled = () => {
    switch (step) {
      case "role":
        return !role;
      case "teacherVerification":
        return !watch("teacherDocument");
      case "avatar":
        return !watch("avatar");
      case "classCode":
        return false;
      default:
        return false;
    }
  };

  const totalSteps = getSteps().length;
  const currentStepIndex = getSteps().indexOf(step);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen space-y-8">
      <Card className="w-[350px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}
          <CardFooter className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStepIndex === 0 || isSubmitting}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {step === "classCode" && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkipClassCode}
                className="text-gray-500 hover:text-black transition-colors"
                disabled={isSubmitting}
              >
                Skip for now
              </Button>
            )}
            <Button
              type={currentStepIndex === getSteps().length - 1 ? "submit" : "button"}
              onClick={nextStep}
              disabled={isNextDisabled() || isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : currentStepIndex === getSteps().length - 1 ? (
                "Finish"
              ) : (
                <>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index <= currentStepIndex ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

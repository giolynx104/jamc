import { OAuthButton } from "@/components/oauth-button";

interface OAuthSectionProps {
  action?: "Sign up" | "Sign in";
}

export function OAuthSection({ action = "Sign up" }: OAuthSectionProps) {
  return (
    <div className="space-y-4">
      <OAuthButton provider="Google" action={action} />
      <OAuthButton provider="Facebook" action={action} />
      <OAuthButton provider="GitHub" action={action} />
    </div>
  );
}

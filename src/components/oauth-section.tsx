import { OAuthButton } from "@/components/oauth-button";

interface OAuthSectionProps {
  onSignIn: (provider: "Google" | "Facebook" | "GitHub") => void;
}

export function OAuthSection({ onSignIn }: OAuthSectionProps) {
  return (
    <div className="space-y-4">
      <OAuthButton provider="Google" onSignIn={onSignIn} />
      <OAuthButton provider="Facebook" onSignIn={onSignIn} />
      <OAuthButton provider="GitHub" onSignIn={onSignIn} />
    </div>
  );
}

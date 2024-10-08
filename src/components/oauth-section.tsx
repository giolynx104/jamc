import { OAuthButton } from "@/components/oauth-button";

export function OAuthSection() {
  return (
    <div className="space-y-4">
      <OAuthButton provider="Google" />
      <OAuthButton provider="Facebook" />
      <OAuthButton provider="GitHub" />
    </div>
  );
}

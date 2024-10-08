import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

type OAuthProvider = "Google" | "Facebook" | "GitHub";

interface OAuthButtonProps {
  provider: OAuthProvider;
  onSignIn: (provider: OAuthProvider) => void;
}

export function OAuthButton({ provider, onSignIn }: OAuthButtonProps) {
  const icons = {
    Google: FaGoogle,
    Facebook: FaFacebook,
    GitHub: FaGithub,
  };

  const Icon = icons[provider];

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={() => onSignIn(provider)}
    >
      <Icon /> Sign up with {provider}
    </Button>
  );
}

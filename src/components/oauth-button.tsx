"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { handleSignIn } from "./actions";
import { Loader2 } from "lucide-react";

type OAuthProvider = "Google" | "Facebook" | "GitHub";

interface OAuthButtonProps {
  provider: OAuthProvider;
}

export function OAuthButton({ provider }: OAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const icons = {
    Google: FaGoogle,
    Facebook: FaFacebook,
    GitHub: FaGithub,
  };

  const Icon = icons[provider];

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await handleSignIn(provider.toLowerCase());
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <Icon /> Sign up with {provider}
        </>
      )}
    </Button>
  );
}

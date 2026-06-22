"use client";

import { useSearchParams } from "next/navigation";
import { EntrarComGoogle } from "@/components/auth/EntrarComGoogle";

function destinoSeguro(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
}

export function EntrarRedirect() {
  const searchParams = useSearchParams();
  const callbackURL = destinoSeguro(searchParams.get("redirectTo"));

  return (
    <div className="mt-8">
      <EntrarComGoogle callbackURL={callbackURL} />
    </div>
  );
}

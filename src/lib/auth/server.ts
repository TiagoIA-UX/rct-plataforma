import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL || "";
const cookieSecret =
  process.env.NEON_AUTH_COOKIE_SECRET || "build-placeholder-32chars-minimum";

export const auth = createNeonAuth({
  baseUrl,
  cookies: { secret: cookieSecret },
});

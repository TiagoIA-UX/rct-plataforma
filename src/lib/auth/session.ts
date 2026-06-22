import { auth } from "@/lib/auth/server";
import { isNeonAuthEnabled } from "@/lib/config/env";

export async function getSessaoGoogle() {
  if (!isNeonAuthEnabled()) return null;
  const { data } = await auth.getSession();
  if (!data?.session) return null;
  return { session: data.session, user: data.user };
}

export async function getUsuarioGoogle() {
  const sessao = await getSessaoGoogle();
  return sessao?.user ?? null;
}

import { revalidatePath, revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache";
import { isCronAuthorized } from "@/lib/config/env";

export async function GET(req: Request) {
  if (!isCronAuthorized(req.headers.get("authorization"))) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  revalidateTag(CACHE_TAGS.artigos, "max");
  revalidatePath("/");
  revalidatePath("/blog");

  return Response.json({ success: true, revalidated: ["artigos", "/", "/blog"] });
}

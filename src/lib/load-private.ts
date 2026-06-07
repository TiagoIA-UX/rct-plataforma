import { existsSync } from "fs";
import { join } from "path";
/**
 * Carrega módulo confidencial em private/lib/*.mjs em runtime (somente servidor).
 * O caminho é resolvido em runtime para não entrar no bundle do Next.
 */
export function loadPrivateMjs<T>(name: string): T | null {
  const file = join(process.cwd(), "private", "lib", `${name}.mjs`);
  if (!existsSync(file)) {
    console.warn(`[RCT] Módulo confidencial ausente: private/lib/${name}.mjs`);
    return null;
  }

  // require dinâmico — evita resolução estática pelo Turbopack
  const nodeRequire = eval("require") as NodeJS.Require;
  return nodeRequire(file) as T;
}

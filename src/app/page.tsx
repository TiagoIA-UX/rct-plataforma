import { Hero } from "@/components/home/Hero";
import { Pilares } from "@/components/home/Pilares";
import { BlogGrid } from "@/components/home/BlogGrid";
import { CitacaoSagrada } from "@/components/shared/CitacaoSagrada";
import { DiagnosticoRapido } from "@/components/home/DiagnosticoRapido";
/** ISR — ver CACHE_TTL.home em src/lib/cache.ts */
export const revalidate = 1800;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pilares />
      <CitacaoSagrada />
      <BlogGrid />
      <DiagnosticoRapido />
    </>
  );
}

import { BlogGrid } from "@/components/home/BlogGrid";
import { GrandeYogue } from "@/components/home/GrandeYogue";
import { Hero } from "@/components/home/Hero";
import { Pilares } from "@/components/home/Pilares";
import { DiagnosticoRapido } from "@/components/home/DiagnosticoRapido";
import { CitacaoSagrada } from "@/components/shared/CitacaoSagrada";
/** ISR — ver CACHE_TTL.home em src/lib/cache.ts */
export const revalidate = 1800;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pilares />
      <GrandeYogue />
      <CitacaoSagrada />
      <BlogGrid />
      <DiagnosticoRapido />
    </>
  );
}

import { BlogGrid } from "@/components/home/BlogGrid";
import { AmorUniversal } from "@/components/home/AmorUniversal";
import { JesusOMestre } from "@/components/home/JesusOMestre";
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
      <JesusOMestre />
      <AmorUniversal />
      <CitacaoSagrada />
      <BlogGrid />
      <DiagnosticoRapido />
    </>
  );
}

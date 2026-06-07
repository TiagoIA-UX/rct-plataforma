import { Hero } from "@/components/home/Hero";
import { Pilares } from "@/components/home/Pilares";
import { BlogGrid } from "@/components/home/BlogGrid";
import { CitacaoSagrada } from "@/components/shared/CitacaoSagrada";
import { DiagnosticoRapido } from "@/components/home/DiagnosticoRapido";

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

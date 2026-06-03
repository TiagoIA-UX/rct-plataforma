import { CentrosGrid } from "@/components/home/centros-grid";
import { Hero } from "@/components/home/hero";
import { Mecanicas } from "@/components/home/mecanicas";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CentrosGrid />
      <Mecanicas />
    </>
  );
}

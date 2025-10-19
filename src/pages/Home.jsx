import Bienvenida from "../components/TarjeraBienvenida";
import Destacados from "../components/Destacados";
export default function Home() {
  return (
    <section className="container my-5">
      <Bienvenida />
      <Destacados />
    </section>
  );
}
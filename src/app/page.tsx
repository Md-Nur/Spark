import Hero from "../components/Hero";
import Intro from "../components/Intro";
import CR from "../components/CR";
import Admin from "../components/Admin";
import LatestContent from "../components/LatestContent";

export default function Home() {
  return (
    <section className="bg-base-100 w-full">
      <Hero />
      <Intro />
      <CR />
      <LatestContent />
      <Admin />
    </section>
  );
}

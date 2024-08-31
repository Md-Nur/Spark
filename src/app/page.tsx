import Hero from "../components/Home/Hero";
import Intro from "../components/Home/Intro";
import CR from "../components/Home/CR";
import Admin from "../components/Admin";
import LatestContent from "../components/Home/LatestContent";

export default function Home() {
  return (
    <section className="bg-base-100 w-full">
      <Hero />
      <Intro />
      <LatestContent />
      <Admin />
      <CR />
    </section>
  );
}

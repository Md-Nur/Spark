import Hero from "../components/Hero";
import CourseDetails from "../components/CourseDetails";
import Intro from "../components/Intro";
import CR from "../components/CR";
import Admin from "../components/Admin";

export default function Home() {
  return (
    <section className="bg-base-100 w-full">
      <Hero />
      <Intro />
      <CR />
      <CourseDetails />
      <Admin />
    </section>
  );
}

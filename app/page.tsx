import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Machine from "@/components/sections/Machine";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Colophon from "@/components/sections/Colophon";
import AgentEasterEgg from "@/components/AgentEasterEgg";
import CursorRoot from "@/components/CursorRoot";
import KratosCompanion from "@/components/mascot/KratosCompanion";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Machine />
        <Work />
        <Experience />
        <Education />
        <Skills />
        <Colophon />
      </main>
      <AgentEasterEgg />
      <CursorRoot />
      <KratosCompanion />
    </>
  );
}

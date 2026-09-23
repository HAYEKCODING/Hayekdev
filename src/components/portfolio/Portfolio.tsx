import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { About } from "./About";
import { Projects } from "./Projects";
import { Stack } from "./Stack";
import { Architecture } from "./Architecture";
import { Journey } from "./Journey";
import { Services } from "./Services";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export function Portfolio() {
  return (
    <div className="min-h-screen bg-night text-ivoire">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-night"
      >
        Aller au contenu
      </a>
      <Nav />
      <Hero />
      <main>
        <Marquee />
        <About />
        <Projects />
        <Stack />
        <Architecture />
        <Journey />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

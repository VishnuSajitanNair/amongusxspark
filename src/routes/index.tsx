import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.png.asset.json";
import logo from "@/assets/spark-logo.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Among Us x Spark — IIIT Bhopal Edition" },
      { name: "description", content: "Find the impostor. Join Among Us x Spark at IIIT Bhopal — register now." },
      { property: "og:title", content: "Among Us x Spark — IIIT Bhopal Edition" },
      { property: "og:description", content: "Find the impostor. Join Among Us x Spark at IIIT Bhopal." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="top" className="relative min-h-screen overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
        <img src={logo.url} alt="Spark logo" className="h-14 w-14 rounded-xl ring-1 ring-foreground/10 sm:h-16 sm:w-16" />
        <nav className="flex items-center gap-2 sm:gap-3">
          <a href="#top" className="nav-impostor">Home</a>
          <a href="#event" className="nav-impostor hidden sm:inline-flex">Event</a>
          <a href="#register" className="nav-impostor nav-impostor--solid">Register</a>
        </nav>
      </header>

      <section id="event" className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-28 sm:pt-36">
        <img
          src={hero.url}
          alt="Among Us x Spark — IIIT Bhopal Edition"
          className="img-blend w-full"
        />
        <p className="mt-10 text-center text-lg opacity-70">There is an impostor among us. Will you find them?</p>
        <a id="register" href="#register" className="btn-impostor mt-6 rounded-full px-12 py-4 font-display text-xl tracking-wider sm:text-2xl">
          Register Now
        </a>
      </section>
    </main>
  );
}

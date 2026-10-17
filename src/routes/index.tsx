import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.png.asset.json";
import logo from "@/assets/spark-logo.jpg.asset.json";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { ThemeMusic } from "@/components/theme-music";
import { eventDetails } from "@/lib/event-details";
import { CursorLight } from "@/components/cursor-light";
import { HowToPlay } from "@/components/how-to-play";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Among Us x Spark — IIIT Bhopal Edition" },
      { name: "description", content: "Find the impostor. Join Among Us x Spark at IIIT Bhopal — register now." },
      { property: "og:title", content: "Among Us x Spark — IIIT Bhopal Edition" },
      { property: "og:description", content: "Find the impostor. Join Among Us x Spark at IIIT Bhopal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="top" className="relative min-h-screen overflow-hidden">
      <div className="star-field" aria-hidden="true" />
      <CursorLight />
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-6">
        <img src={logo.url} alt="Spark logo" className="h-14 w-14 rounded-xl ring-1 ring-foreground/10 sm:h-16 sm:w-16" />
        <nav className="flex items-center gap-2 sm:gap-3">
          <ThemeMusic />
          <a href="#top" className="nav-impostor">Home</a>
          <Button asChild variant="ghost" className="nav-impostor h-auto px-3 text-xs sm:px-4 sm:text-sm"><a href="#how-to-play">HOW TO PLAY</a></Button>
          <a href="#register" className="nav-impostor nav-impostor--solid">Register</a>
        </nav>
      </header>

      <section id="event" className="mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-28 sm:pt-36">
        <img
          src={hero.url}
          alt="Among Us x Spark — IIIT Bhopal Edition"
          className="img-blend theme-image-motion w-full"
        />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg font-medium text-impostor-foreground/80 sm:text-xl">
          <span className="inline-flex items-center gap-2"><CalendarDays className="size-5 text-impostor" aria-hidden="true" /><time dateTime={eventDetails.date}>14 Nov 2026</time></span>
          <span className="inline-flex items-center gap-2"><Clock3 className="size-5 text-impostor" aria-hidden="true" /><time dateTime={eventDetails.startTime}>4 pm</time><span>–</span><time dateTime={eventDetails.endTime}>8 pm</time></span>
          <span className="inline-flex items-center gap-2"><MapPin className="size-5 text-impostor" aria-hidden="true" />{eventDetails.location}</span>
        </div>
        <a id="register" href="#register" className="btn-impostor mt-6 rounded-full px-12 py-4 font-display text-xl tracking-wider sm:text-2xl">
          Register Now
        </a>
        <p className="mt-10 max-w-3xl text-pretty text-center text-base leading-8 text-impostor-foreground/75 sm:text-lg">
          Step out of the virtual lobby and into the shadowy corridors of your own hostel wing for an intense, real-life match of Among Us. Speed-run physical tasks across the floor while covert Impostors stalk the halls to take down the crew one by one. Read the room, sniff out the lies in high-stakes emergency debates, and eject the traitors before they wipe out the entire wing. Can you survive the shift, or will you end up floating out the airlock?
        </p>
      </section>
      <HowToPlay />
    </main>
  );
}

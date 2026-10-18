import { useEffect, useRef } from "react";

const placements = [
  { url: "/assets/crewmate-cyan.png", tint: "", key: "crew-1", label: "Cyan Crewmate" },
  { url: "/assets/characters/char-24.png", tint: "", key: "crew-2", label: "Astronaut Yellow" },
  { url: "/assets/crewmate-pink.png", tint: "", key: "crew-3", label: "Pink Crewmate" },
  { url: "/assets/characters/char-15.png", tint: "", key: "crew-4", label: "Flamingo Pink" },
  { url: "/assets/crewmate-green.png", tint: "", key: "crew-5", label: "Green Crewmate" },
  { url: "/assets/characters/char-12.png", tint: "", key: "crew-6", label: "Cowboy Blue" },
  { url: "/assets/crewmate-red.png", tint: "", key: "crew-7", label: "Red Impostor" },
  { url: "/assets/characters/char-27.png", tint: "", key: "crew-8", label: "Master Chef Pink" },
  { url: "/assets/characters/char-20.png", tint: "", key: "crew-9", label: "Banana Green" },
  { url: "/assets/characters/char-28.png", tint: "", key: "crew-10", label: "Top Hat Purple" },
  { url: "/assets/characters/char-01.png", tint: "", key: "crew-11", label: "Zipper Orange" },
  { url: "/assets/characters/char-44.png", tint: "", key: "crew-12", label: "Gladiator Pink" },
  { url: "/assets/characters/char-37.png", tint: "", key: "crew-13", label: "Secret Agent Lime" },
  { url: "/assets/characters/char-34.png", tint: "", key: "crew-14", label: "Viking Raider" },
];

export function SpaceBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const allowed = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (!allowed.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty(
          "--parallax-x",
          `${(event.clientX / window.innerWidth - 0.5) * 32}px`,
        );
        ref.current?.style.setProperty(
          "--parallax-y",
          `${(event.clientY / window.innerHeight - 0.5) * 24}px`,
        );
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      ref.current?.style.setProperty("--parallax-x", "0px");
      ref.current?.style.setProperty("--parallax-y", "0px");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);
    allowed.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      allowed.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div ref={ref} className="space-background" aria-hidden="true">
      <div className="star-field star-field--dust" />
      <div className="star-field star-field--far" />
      <div className="star-field star-field--mid" />
      <div className="star-field star-field--near" />
      <div className="star-twinkle-cluster" />
      <div className="shooting-star-layer">
        <div className="shooting-star shooting-star--1" />
        <div className="shooting-star shooting-star--2" />
      </div>
      <div className="floating-crew">
        {placements.map((placement, i) => (
          <div key={placement.key} className={`crew-position crew-position--${i + 1}`}>
            <img src={placement.url} alt="" className={`crew-drift ${placement.tint}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

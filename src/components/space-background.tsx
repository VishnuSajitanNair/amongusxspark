import { useEffect, useRef } from "react";
import cyan from "@/assets/crewmate-cyan.png.asset.json";
import pink from "@/assets/crewmate-pink.png.asset.json";
import green from "@/assets/crewmate-green.png.asset.json";
import red from "@/assets/crewmate-red.png.asset.json";

const placements = [
  { src: cyan, tint: "", key: "cyan-1" },
  { src: pink, tint: "", key: "pink-1" },
  { src: green, tint: "", key: "green-1" },
  { src: red, tint: "", key: "red-1" },
  { src: cyan, tint: "crew-tint--orange", key: "cyan-2" },
  { src: pink, tint: "crew-tint--gold", key: "pink-2" },
  { src: green, tint: "crew-tint--violet", key: "green-2" },
  { src: red, tint: "crew-tint--lime", key: "red-2" },
];

export function SpaceBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const allowed = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (!allowed.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--parallax-x", `${(event.clientX / window.innerWidth - 0.5) * 32}px`);
        ref.current?.style.setProperty("--parallax-y", `${(event.clientY / window.innerHeight - 0.5) * 24}px`);
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
      <div className="star-field star-field--far" />
      <div className="star-field star-field--near" />
      <div className="floating-crew">
        {placements.map((placement, i) => (
          <div key={placement.key} className={`crew-position crew-position--${i + 1}`}>
            <img src={placement.src.url} alt="" className={`crew-drift ${placement.tint}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

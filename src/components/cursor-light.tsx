import { useEffect, useRef } from "react";

export function CursorLight() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canIlluminate = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const moveLight = (event: PointerEvent) => {
      const light = lightRef.current;
      if (!light || !canIlluminate.matches || event.pointerType === "touch") return;
      light.style.setProperty("--cursor-x", `${event.clientX}px`);
      light.style.setProperty("--cursor-y", `${event.clientY}px`);
      light.dataset.visible = "true";
    };
    const hideLight = () => {
      if (lightRef.current) lightRef.current.dataset.visible = "false";
    };
    window.addEventListener("pointermove", moveLight);
    document.documentElement.addEventListener("pointerleave", hideLight);
    window.addEventListener("blur", hideLight);
    canIlluminate.addEventListener("change", hideLight);
    return () => {
      window.removeEventListener("pointermove", moveLight);
      document.documentElement.removeEventListener("pointerleave", hideLight);
      window.removeEventListener("blur", hideLight);
      canIlluminate.removeEventListener("change", hideLight);
    };
  }, []);

  return <div ref={lightRef} className="cursor-light" aria-hidden="true" />;
}
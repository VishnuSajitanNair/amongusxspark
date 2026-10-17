import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import themeSong from "@/assets/theme-song.mp3.asset.json";

export function ThemeMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(true);
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const start = () => {
      if (enabledRef.current && audio.paused) void audio.play().catch(() => {});
    };
    const onInteraction = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('[data-music-toggle]')) return;
      start();
    };
    start();
    document.addEventListener("pointerdown", onInteraction);
    document.addEventListener("keydown", onInteraction);
    return () => {
      document.removeEventListener("pointerdown", onInteraction);
      document.removeEventListener("keydown", onInteraction);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    const audio = audioRef.current;
    if (!audio) return;
    if (next) void audio.play().catch(() => {});
    else audio.pause();
  };

  const label = enabled ? "Turn music off" : "Turn music on";
  return (
    <>
      <audio ref={audioRef} src={themeSong.url} autoPlay loop preload="auto" onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 rounded-full border border-impostor/35 bg-impostor/10 p-0 text-impostor-foreground hover:bg-impostor/20 hover:text-impostor-foreground"
        data-music-toggle
        aria-label={label}
        aria-pressed={enabled}
        title={enabled && !playing ? "Music on — starts after your first interaction" : label}
        onClick={toggle}
      >
        {enabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
      </Button>
    </>
  );
}
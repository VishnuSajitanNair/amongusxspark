import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { howToPlay } from "@/lib/how-to-play";

type Item = (typeof howToPlay)[number];

export function HowToPlay() {
  const [selected, setSelected] = useState<Item | null>(null);
  const soundsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const currentRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const sounds = soundsRef.current;
    for (const item of howToPlay) {
      const a = new Audio(item.sound);
      a.preload = "auto";
      a.volume = 0.8;
      a.load();
      sounds.set(item.id, a);
    }
    return () => sounds.forEach((a) => a.pause());
  }, []);

  const stopSound = () => {
    const sound = currentRef.current;
    if (sound) { sound.pause(); sound.currentTime = 0; }
  };

  const open = (item: Item) => {
    stopSound();
    window.dispatchEvent(new Event("theme-music:suspend"));
    const sound = soundsRef.current.get(item.id) ?? new Audio(item.sound);
    sound.currentTime = 0;
    currentRef.current = sound;
    void sound.play().catch(() => {});
    setSelected(item);
  };

  const close = () => {
    stopSound();
    setSelected(null);
    window.dispatchEvent(new Event("theme-music:resume"));
  };

  const index = selected ? howToPlay.findIndex((i) => i.id === selected.id) : -1;

  return (
    <section id="how-to-play" className="relative mx-auto max-w-5xl scroll-mt-8 px-6 pb-16 pt-8 sm:px-8 sm:pt-12" aria-labelledby="how-to-play-title">
      <h2 id="how-to-play-title" className="mb-8 text-center font-display text-3xl text-impostor-foreground sm:text-4xl">How To Play</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {howToPlay.map((item, i) => (
          <div key={item.id} className="group min-w-0">
            <Button variant="ghost" data-music-skip className="play-tile relative block aspect-video h-auto w-full overflow-hidden rounded-lg bg-space p-0 hover:bg-space" onClick={() => open(item)} aria-label={`View ${item.title}`} aria-haspopup="dialog">
              <video src={item.video} autoPlay loop muted playsInline preload="auto" className="absolute inset-0 h-full w-full object-contain" aria-hidden="true" />
              <span className="play-tile-icon absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-impostor-foreground/40 bg-space/80 text-impostor-foreground"><Play aria-hidden="true" /></span>
            </Button>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-sans text-sm text-impostor">0{i + 1}</span>
              <h3 className="font-display text-lg text-impostor-foreground">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={selected !== null} onOpenChange={(isOpen) => { if (!isOpen) close(); }}>
        <DialogContent className="play-description max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl bg-space p-0 text-impostor-foreground">
          {selected && (
            <video key={selected.id} src={selected.video} autoPlay loop muted playsInline className="aspect-video w-full rounded-t-2xl object-cover" aria-hidden="true" />
          )}
          <div className="p-6 sm:p-8">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-impostor">Step 0{index + 1}</span>
            <DialogTitle className="mt-2 pr-8 font-display text-xl leading-relaxed tracking-normal sm:text-2xl">{selected?.title}</DialogTitle>
            <div className="play-divider my-4" aria-hidden="true" />
            <DialogDescription className="text-base leading-8 text-impostor-foreground/85">{selected?.description}</DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

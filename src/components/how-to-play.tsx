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
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
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
    <section
      id="how-to-play"
      className="relative mx-auto max-w-5xl scroll-mt-8 px-6 pb-16 pt-8 sm:px-8 sm:pt-12"
      aria-labelledby="how-to-play-title"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-impostor/40 bg-impostor/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-impostor shadow-[0_0_16px_rgba(239,68,68,0.25)] backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-impostor opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-impostor" />
          </span>
          Security Feeds & Protocols
        </div>
        <h2
          id="how-to-play-title"
          className="section-title-glow text-center font-display text-3xl tracking-wide text-impostor-foreground sm:text-4xl lg:text-5xl"
        >
          How To Play
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-impostor-foreground/75 sm:text-base">
          Review surveillance transmissions and field briefings before entering the hostel
          corridors. Tap any monitor to inspect.
        </p>
        <div className="mt-4 mb-10 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-impostor/60" />
          <span className="size-2 rotate-45 border border-impostor bg-impostor/40 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-impostor/60" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {howToPlay.map((item, i) => (
          <div key={item.id} className="group min-w-0">
            <Button
              variant="ghost"
              className="play-tile relative flex aspect-video h-auto w-full items-center justify-center overflow-hidden rounded-xl p-1.5 sm:p-2"
              onClick={() => open(item)}
              aria-label={`View ${item.title}`}
              aria-haspopup="dialog"
            >
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space/40 via-transparent to-transparent" />
              <span className="play-tile-icon absolute bottom-3 right-3 z-10 flex size-9 items-center justify-center rounded-full border border-impostor-foreground/40 bg-space/85 text-impostor-foreground shadow-lg backdrop-blur-md">
                <Play className="size-3.5 fill-current ml-0.5" aria-hidden="true" />
              </span>
            </Button>
            <div className="mt-3.5 flex items-center gap-2.5 px-1">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-impostor/40 bg-impostor/15 font-sans text-xs font-bold text-impostor shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                0{i + 1}
              </span>
              <h3 className="truncate font-display text-base tracking-wide text-impostor-foreground transition-colors group-hover:text-red-400 sm:text-lg">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) close();
        }}
      >
        <DialogContent className="play-description max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl p-0 text-impostor-foreground">
          {selected && (
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl bg-black">
              <video
                key={selected.id}
                src={selected.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-contain"
                aria-hidden="true"
              />
            </div>
          )}
          <div className="p-6 sm:p-8">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-impostor">
              Step 0{index + 1}
            </span>
            <DialogTitle className="mt-2 pr-8 font-display text-xl leading-relaxed tracking-normal sm:text-2xl">
              {selected?.title}
            </DialogTitle>
            <div className="play-divider my-4" aria-hidden="true" />
            <DialogDescription className="text-base leading-8 text-impostor-foreground/90">
              {selected?.description}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

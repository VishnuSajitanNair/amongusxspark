import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { howToPlay } from "@/lib/how-to-play";

export function HowToPlay() {
  const [selected, setSelected] = useState<(typeof howToPlay)[number] | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const stopSound = () => {
    const sound = soundRef.current;
    if (sound) { sound.pause(); sound.currentTime = 0; }
  };
  useEffect(() => () => { soundRef.current?.pause(); }, []);

  const open = (item: (typeof howToPlay)[number]) => {
    stopSound();
    const sound = new Audio(item.sound);
    sound.volume = 0.8;
    soundRef.current = sound;
    void sound.play().catch(() => {});
    setSelected(item);
  };

  return (
    <section id="how-to-play" className="relative mx-auto max-w-6xl scroll-mt-8 px-6 pb-24 pt-12 sm:px-8 sm:pt-16" aria-labelledby="how-to-play-title">
      <h2 id="how-to-play-title" className="mb-12 text-center font-display text-3xl text-impostor-foreground sm:text-4xl">How To Play</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {howToPlay.map((item, index) => (
          <div key={item.id} className="group min-w-0">
            <Button variant="ghost" className="play-tile relative h-auto w-full overflow-hidden rounded-lg border border-impostor-foreground/20 bg-space p-0 hover:bg-space" onClick={() => open(item)} aria-label={`View ${item.title}`} aria-haspopup="dialog">
              <video src={item.video} autoPlay loop muted playsInline preload="auto" className="aspect-video w-full object-contain" aria-hidden="true" />
              <span className="play-tile-icon absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-impostor-foreground/40 bg-space/80 text-impostor-foreground"><Play aria-hidden="true" /></span>
            </Button>
            <div className="mt-4 flex items-center gap-3">
              <span className="font-sans text-sm text-impostor">0{index + 1}</span>
              <h3 className="font-display text-lg text-impostor-foreground">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={selected !== null} onOpenChange={(isOpen) => { if (!isOpen) { stopSound(); setSelected(null); } }}>
        <DialogContent className="play-description max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg border-impostor/40 bg-space p-6 text-impostor-foreground sm:p-8">
          <DialogTitle className="pr-8 font-display text-xl leading-relaxed tracking-normal sm:text-2xl">{selected?.title}</DialogTitle>
          <DialogDescription className="text-base leading-8 text-impostor-foreground/85">{selected?.description}</DialogDescription>
        </DialogContent>
      </Dialog>
    </section>
  );
}
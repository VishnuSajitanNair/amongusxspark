import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserRound,
  IdCard,
  Mail,
  Phone,
  ArrowRight,
  Check,
  RotateCcw,
  Dices,
  Sparkles,
  GraduationCap,
  Building2,
  ChevronDown,
} from "lucide-react";
import { characters } from "@/lib/characters";

const branchOptions = ["CSE CORE", "CSE SPECIALIZATION", "ECE", "IT", "PNC", "MNC"] as const;

const hostelOptions = ["BHEL", "P&T", "GIRLS HOSTEL"] as const;

const registrationSchema = z.object({
  name: z.string().trim().nonempty().max(100),
  scholarNo: z.string().trim().nonempty().max(20),
  email: z.string().trim().email().max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{10,15}$/),
  branch: z.enum(branchOptions),
  hostel: z.enum(hostelOptions),
});

const empty = {
  name: "",
  scholarNo: "",
  email: "",
  phone: "",
  branch: "",
  hostel: "",
};

export function RegistrationForm() {
  const [form, setForm] = useState(empty);
  const [submitted, setSubmitted] = useState(false);
  const [character, setCharacter] = useState(() => Math.floor(Math.random() * characters.length));

  const valid = registrationSchema.safeParse(form).success;

  const set =
    (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationSchema.safeParse(form).success) return;
    setSubmitted(true);
  };

  const reset = () => {
    setForm(empty);
    setSubmitted(false);
    setCharacter((c) => {
      let next = c;
      while (next === c && characters.length > 1) {
        next = Math.floor(Math.random() * characters.length);
      }
      return next;
    });
  };

  const randomise = () =>
    setCharacter((c) => {
      let next = c;
      while (next === c && characters.length > 1) {
        next = Math.floor(Math.random() * characters.length);
      }
      return next;
    });

  const activeCharacter = characters[character] ?? characters[0]!;
  const characterName = form.name.trim() || activeCharacter.name;

  return (
    <section
      id="register"
      className="relative mx-auto max-w-4xl scroll-mt-8 px-6 pb-20 pt-8 sm:px-8"
      aria-labelledby="register-title"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-impostor/40 bg-impostor/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-impostor shadow-[0_0_16px_rgba(239,68,68,0.25)] backdrop-blur-md">
          <Sparkles className="size-3.5 text-impostor" aria-hidden="true" />
          Hostel Wing Clearance
        </div>
        <h2
          id="register-title"
          className="section-title-glow text-center font-display text-3xl tracking-wide text-impostor-foreground sm:text-4xl lg:text-5xl"
        >
          Registration
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-impostor-foreground/75 sm:text-base">
          Register your crew credentials to enter the match lobby and receive your assigned space
          disguise.
        </p>
        <div className="mt-4 mb-10 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-impostor/60" />
          <span className="size-2 rotate-45 border border-impostor bg-impostor/40 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-impostor/60" />
        </div>
      </div>

      <div
        className={
          submitted
            ? "mx-auto max-w-xl"
            : "grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
        }
      >
        {submitted ? (
          <div className="registration-panel rounded-2xl p-8 text-center sm:p-10">
            <div className="relative mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/15 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)]">
              <Check className="size-8" aria-hidden="true" />
              <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25" />
            </div>
            <p className="font-display text-xl leading-relaxed text-impostor-foreground sm:text-2xl drop-shadow-sm">
              THANK YOU. YOUR RESPONSE HAS BEEN RECORDED
            </p>
            <p className="mt-2 text-sm text-impostor-foreground/70">
              Your space clearance has been recorded for the hostel match.
            </p>
            <div className="my-8 flex flex-col items-center justify-center gap-3">
              <div className="character-frame size-48 sm:size-56">
                <img
                  key={activeCharacter.id}
                  src={activeCharacter.url}
                  alt={activeCharacter.name}
                  className="character-img z-10"
                />
                <div className="pointer-events-none absolute bottom-3 h-3 w-28 rounded-full bg-impostor/30 blur-md" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <h3 className="break-words font-display text-xl leading-snug text-impostor-foreground drop-shadow-sm">
                  {characterName}
                </h3>
                <span className="rounded-full bg-impostor/15 border border-impostor/30 px-3 py-0.5 font-sans text-xs font-semibold uppercase tracking-wider text-impostor shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  {activeCharacter.name}
                </span>
                {form.branch && form.hostel && (
                  <span className="font-mono text-xs text-impostor-foreground/60 tracking-wider">
                    {form.branch} • {form.hostel}
                  </span>
                )}
              </div>
            </div>
            <Button
              onClick={reset}
              variant="outline"
              className="rounded-full border-impostor-foreground/40 bg-white/5 px-8 py-5 font-display text-sm tracking-wider text-impostor-foreground backdrop-blur-sm transition-all duration-200 hover:border-impostor-foreground hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <RotateCcw aria-hidden="true" />
              Submit Another Response
            </Button>
          </div>
        ) : (
          <>
            <form
              onSubmit={submit}
              noValidate
              className="registration-panel grid grid-cols-1 gap-6 rounded-2xl p-6 sm:grid-cols-2 sm:p-8"
            >
              <div className="sm:col-span-2 -mt-1 mb-1 flex items-center justify-between border-b border-white/10 pb-3 text-xs text-impostor-foreground/70">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-emerald-400">
                    TERMINAL READY
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-widest text-impostor-foreground/40 uppercase">
                  HOSTEL-SEC // SPARK-LOBBY
                </span>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-name"
                  className="text-sm font-medium text-impostor-foreground/90 flex items-center gap-2"
                >
                  <UserRound className="size-4 text-impostor" aria-hidden="true" />
                  Name <span className="text-impostor">*</span>
                </Label>
                <Input
                  id="reg-name"
                  value={form.name}
                  onChange={set("name")}
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="placeholder:text-impostor-foreground/35"
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-scholar"
                  className="text-sm font-medium text-impostor-foreground/90 flex items-center gap-2"
                >
                  <IdCard className="size-4 text-impostor" aria-hidden="true" />
                  Scholar No. <span className="text-impostor">*</span>
                </Label>
                <Input
                  id="reg-scholar"
                  value={form.scholarNo}
                  onChange={set("scholarNo")}
                  required
                  maxLength={20}
                  className="placeholder:text-impostor-foreground/35"
                  placeholder="26U020XXX"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-email"
                  className="text-sm font-medium text-impostor-foreground/90 flex items-center gap-2"
                >
                  <Mail className="size-4 text-impostor" aria-hidden="true" />
                  Email ID <span className="text-impostor">*</span>
                </Label>
                <Input
                  id="reg-email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                  maxLength={255}
                  autoComplete="email"
                  className="placeholder:text-impostor-foreground/35"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-phone"
                  className="text-sm font-medium text-impostor-foreground/90 flex items-center gap-2"
                >
                  <Phone className="size-4 text-impostor" aria-hidden="true" />
                  Phone Number <span className="text-impostor">*</span>
                </Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  required
                  autoComplete="tel"
                  className="placeholder:text-impostor-foreground/35"
                  placeholder="10-digit mobile number"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-branch"
                  className="text-sm font-medium text-impostor-foreground/90 flex items-center gap-2"
                >
                  <GraduationCap className="size-4 text-impostor" aria-hidden="true" />
                  Branch <span className="text-impostor">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="reg-branch"
                    value={form.branch}
                    onChange={set("branch")}
                    required
                    className="w-full h-[50px] rounded-lg bg-[rgba(9,7,16,0.7)] border border-white/12 px-3 pr-10 text-sm text-[#f1f5f9] appearance-none hover:border-white/25 hover:bg-[rgba(13,10,22,0.85)] focus:border-impostor focus:outline-none focus:ring-2 focus:ring-impostor/25 transition-all cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#0e0a18] text-white/40">
                      Select your branch
                    </option>
                    {branchOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0e0a18] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-white/50"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="reg-hostel"
                  className="text-sm font-medium text-impostor-foreground/90 flex items-center gap-2"
                >
                  <Building2 className="size-4 text-impostor" aria-hidden="true" />
                  Hostel <span className="text-impostor">*</span>
                </Label>
                <div className="relative">
                  <select
                    id="reg-hostel"
                    value={form.hostel}
                    onChange={set("hostel")}
                    required
                    className="w-full h-[50px] rounded-lg bg-[rgba(9,7,16,0.7)] border border-white/12 px-3 pr-10 text-sm text-[#f1f5f9] appearance-none hover:border-white/25 hover:bg-[rgba(13,10,22,0.85)] focus:border-impostor focus:outline-none focus:ring-2 focus:ring-impostor/25 transition-all cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#0e0a18] text-white/40">
                      Select your hostel
                    </option>
                    {hostelOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0e0a18] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-white/50"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={!valid}
                className={
                  valid
                    ? "registration-submit sm:col-span-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 py-6 font-display text-lg tracking-wider text-space transition-all duration-300 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] cursor-pointer"
                    : "sm:col-span-2 w-full cursor-not-allowed rounded-xl bg-white/5 border border-white/10 py-6 font-display text-lg tracking-wider text-impostor-foreground/35 transition-colors disabled:opacity-100"
                }
              >
                Submit
                <ArrowRight aria-hidden="true" />
              </Button>
            </form>

            <aside
              className="character-panel flex flex-col items-center gap-5 rounded-2xl p-6 text-center"
              aria-live="polite"
            >
              <div className="flex items-center justify-between w-full border-b border-white/10 pb-3 text-xs">
                <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-impostor flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-impostor animate-pulse" />
                  SUIT SCANNER
                </span>
                <span className="rounded-full bg-impostor/15 px-2 py-0.5 font-mono text-[10px] text-impostor border border-impostor/30">
                  ID #{activeCharacter.id}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 w-full">
                <h3 className="min-h-7 break-words font-display text-xl leading-snug text-impostor-foreground drop-shadow-sm">
                  {characterName}
                </h3>
                <span className="rounded-full bg-impostor/15 border border-impostor/30 px-3 py-0.5 font-sans text-xs font-semibold uppercase tracking-wider text-impostor shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  {activeCharacter.name}
                </span>
              </div>
              <div className="character-frame w-full">
                <img
                  key={activeCharacter.id}
                  src={activeCharacter.url}
                  alt={activeCharacter.name}
                  className="character-img z-10"
                />
                <div className="pointer-events-none absolute bottom-2 h-3 w-28 rounded-full bg-impostor/30 blur-md" />
              </div>
              <Button
                onClick={randomise}
                className="w-full rounded-xl border border-white/15 bg-gradient-to-r from-impostor-foreground/95 to-impostor-foreground px-6 py-5 font-display text-sm tracking-widest text-space transition-all duration-200 hover:scale-[1.02] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-[0.98]"
              >
                <Dices aria-hidden="true" />
                RANDOMISE
              </Button>
            </aside>
          </>
        )}
      </div>
    </section>
  );
}

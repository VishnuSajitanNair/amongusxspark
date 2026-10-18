import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound, IdCard, Mail, Phone, ArrowRight, Check, RotateCcw } from "lucide-react";

const registrationSchema = z.object({
  name: z.string().trim().nonempty().max(100),
  scholarNo: z.string().trim().nonempty().max(20),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^[0-9+\-\s]{10,15}$/),
});

const empty = { name: "", scholarNo: "", email: "", phone: "" };

export function RegistrationForm() {
  const [form, setForm] = useState(empty);
  const [submitted, setSubmitted] = useState(false);

  const valid = registrationSchema.safeParse(form).success;

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationSchema.safeParse(form).success) return;
    setSubmitted(true);
  };

  const reset = () => {
    setForm(empty);
    setSubmitted(false);
  };

  return (
    <section id="register" className="relative mx-auto max-w-2xl scroll-mt-8 px-6 pb-20 pt-8 sm:px-8" aria-labelledby="register-title">
      <h2 id="register-title" className="mb-8 text-center font-display text-3xl text-impostor-foreground sm:text-4xl">Registration</h2>
      {submitted ? (
        <div className="registration-panel rounded-lg p-8 text-center sm:p-10">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-registration-ready/50 bg-registration-ready/10 text-registration-ready"><Check className="size-7" aria-hidden="true" /></div>
          <p className="font-display text-xl leading-relaxed text-impostor-foreground sm:text-2xl">
            THANK YOU. YOUR RESPONSE HAS BEEN RECORDED
          </p>
          <Button onClick={reset} variant="outline" data-music-skip className="mt-8 rounded-full border-impostor-foreground/40 bg-transparent px-8 py-5 font-display text-sm tracking-wider text-impostor-foreground hover:bg-impostor-foreground/10 hover:text-impostor-foreground">
            <RotateCcw aria-hidden="true" />
            Submit Another Response
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="registration-panel grid grid-cols-1 gap-6 rounded-lg p-6 sm:grid-cols-2 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="reg-name" className="text-impostor-foreground/85"><UserRound className="size-4 text-impostor" aria-hidden="true" />Name <span className="text-impostor">*</span></Label>
            <Input id="reg-name" value={form.name} onChange={set("name")} required maxLength={100} autoComplete="name" className="border-impostor-foreground/25 bg-space text-impostor-foreground placeholder:text-impostor-foreground/40" placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-scholar" className="text-impostor-foreground/85"><IdCard className="size-4 text-impostor" aria-hidden="true" />Scholar No. <span className="text-impostor">*</span></Label>
            <Input id="reg-scholar" value={form.scholarNo} onChange={set("scholarNo")} required maxLength={20} className="border-impostor-foreground/25 bg-space text-impostor-foreground placeholder:text-impostor-foreground/40" placeholder="26U020XXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-email" className="text-impostor-foreground/85"><Mail className="size-4 text-impostor" aria-hidden="true" />Email ID <span className="text-impostor">*</span></Label>
            <Input id="reg-email" type="email" value={form.email} onChange={set("email")} required maxLength={255} autoComplete="email" className="border-impostor-foreground/25 bg-space text-impostor-foreground placeholder:text-impostor-foreground/40" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-phone" className="text-impostor-foreground/85"><Phone className="size-4 text-impostor" aria-hidden="true" />Phone Number <span className="text-impostor">*</span></Label>
            <Input id="reg-phone" type="tel" value={form.phone} onChange={set("phone")} required autoComplete="tel" className="border-impostor-foreground/25 bg-space text-impostor-foreground placeholder:text-impostor-foreground/40" placeholder="10-digit mobile number" />
          </div>
          <Button
            type="submit"
            disabled={!valid}
            data-music-skip
            className={
              valid
                ? "registration-submit sm:col-span-2 w-full rounded-lg bg-registration-ready py-6 font-display text-lg text-space transition-colors hover:bg-registration-ready-hover"
                : "sm:col-span-2 w-full cursor-not-allowed rounded-lg bg-impostor-foreground py-6 font-display text-lg text-space disabled:opacity-100"
            }
          >
            Submit
            <ArrowRight aria-hidden="true" />
          </Button>
        </form>
      )}
    </section>
  );
}

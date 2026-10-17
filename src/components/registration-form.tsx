import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <section id="register" className="relative mx-auto max-w-xl scroll-mt-8 px-6 pb-24 sm:px-8" aria-labelledby="register-title">
      <h2 id="register-title" className="mb-12 text-center font-display text-3xl text-impostor-foreground sm:text-4xl">Registration</h2>
      {submitted ? (
        <div className="play-description rounded-2xl bg-space p-8 text-center sm:p-10">
          <p className="font-display text-xl leading-relaxed text-impostor-foreground sm:text-2xl">
            THANK YOU. YOUR RESPONSE HAS BEEN RECORDED
          </p>
          <Button onClick={reset} variant="outline" data-music-skip className="mt-8 rounded-full border-impostor-foreground/40 bg-transparent px-8 py-5 font-display text-sm tracking-wider text-impostor-foreground hover:bg-impostor-foreground/10 hover:text-impostor-foreground">
            Submit Another Response
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="play-description space-y-6 rounded-2xl bg-space p-6 sm:p-8">
          <div className="space-y-2">
            <Label htmlFor="reg-name" className="text-impostor-foreground/85">Name</Label>
            <Input id="reg-name" value={form.name} onChange={set("name")} required maxLength={100} autoComplete="name" className="border-impostor-foreground/25 bg-space text-impostor-foreground placeholder:text-impostor-foreground/40" placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-scholar" className="text-impostor-foreground/85">Scholar No.</Label>
            <Input id="reg-scholar" value={form.scholarNo} onChange={set("scholarNo")} required maxLength={20} className="border-impostor-foreground/25 bg-space text-impostor-foreground placeholder:text-impostor-foreground/40" placeholder="e.g. 2311XX00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-email" className="text-impostor-foreground/85">Email ID</Label>
            <Input id="reg-email" type="email" value={form.email} onChange={set("email")} required maxLength={255} autoComplete="email" className="border-impostor-foreground/25 bg-space text-impostor-foreground placeholder:text-impostor-foreground/40" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-phone" className="text-impostor-foreground/85">Phone Number</Label>
            <Input id="reg-phone" type="tel" value={form.phone} onChange={set("phone")} required autoComplete="tel" className="border-impostor-foreground/25 bg-space text-impostor-foreground placeholder:text-impostor-foreground/40" placeholder="10-digit mobile number" />
          </div>
          <Button
            type="submit"
            disabled={!valid}
            data-music-skip
            className={
              valid
                ? "w-full rounded-full bg-green-600 py-6 font-display text-lg tracking-wider text-impostor-foreground shadow-[0_0_30px] shadow-green-600/50 transition-colors hover:bg-green-500"
                : "w-full cursor-not-allowed rounded-full bg-impostor-foreground py-6 font-display text-lg tracking-wider text-space opacity-60"
            }
          >
            Submit
          </Button>
        </form>
      )}
    </section>
  );
}

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHero } from "@/components/ui/PageHero";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Loader2, ArrowRight, Send } from "lucide-react";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    label: "Office Address",
    value: "Aegis House, MP Nagar Zone II\nBhopal, Madhya Pradesh 462011",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 755 400 5000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@aegisgroup.in",
  },
];

function FloatingInput({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className="peer w-full bg-background border border-border px-4 pt-6 pb-2.5 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-transparent"
        placeholder={label}
      />
      <label className={`absolute left-4 text-muted-foreground transition-all pointer-events-none ${focused || (props.value as string)?.length > 0 ? "top-2 text-[10px] tracking-wider text-primary" : "top-4 text-sm"}`}>
        {label}
      </label>
      {error && <p className="text-destructive text-xs mt-1 pl-1">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const values = watch();

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate({ data }, {
      onSuccess: (res: { message?: string }) => {
        toast({ title: "Message Sent", description: res.message || "We'll get back to you within 24–48 hours." });
        reset();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to send. Please try again." });
      },
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Start a"
        highlight="Conversation."
        subtitle="Whether you're a partner, client, or investor — we'd love to hear from you. Our team is ready to help."
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-primary tracking-[0.22em] font-semibold text-[11px] uppercase block mb-5">Reach Us</span>
              <h2 className="text-3xl font-display font-bold text-foreground mb-10">Our Office</h2>

              <div className="space-y-7 mb-12">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-foreground text-sm whitespace-pre-line leading-relaxed">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Abstract map placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative rounded-2xl border border-border bg-card overflow-hidden h-56 flex items-center justify-center"
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at center, #d4af37 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="relative z-10 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-3">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">MP Nagar, Bhopal</p>
                  <p className="text-xs text-muted-foreground mt-1">Madhya Pradesh, India</p>
                </div>
                <motion.div
                  className="absolute inset-0 border border-primary/20 rounded-2xl"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative bg-card border border-border rounded-2xl p-8 md:p-10">
                <h3 className="text-xl font-display font-bold text-foreground mb-8">Send an Inquiry</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                      <input
                        {...register("name")}
                        placeholder="Full Name"
                        className="w-full bg-background border border-border px-4 py-3.5 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/60"
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="relative">
                      <input
                        {...register("email")}
                        placeholder="Email Address"
                        className="w-full bg-background border border-border px-4 py-3.5 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/60"
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      {...register("company")}
                      placeholder="Company (Optional)"
                      className="w-full bg-background border border-border px-4 py-3.5 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/60"
                    />
                    <div>
                      <input
                        {...register("subject")}
                        placeholder="Subject"
                        className="w-full bg-background border border-border px-4 py-3.5 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/60"
                      />
                      {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Your message..."
                      className="w-full bg-background border border-border px-4 py-3.5 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-muted-foreground/60"
                    />
                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitContact.isPending}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2.5 text-sm"
                  >
                    {submitContact.isPending ? (
                      <><Loader2 className="animate-spin" size={18} /> Sending…</>
                    ) : (
                      <><Send size={16} /> Submit Inquiry</>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

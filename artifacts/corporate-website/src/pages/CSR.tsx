import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Leaf, HeartHandshake, GraduationCap, Droplet, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    color: "#4ade80",
    title: "Environmental",
    desc: "We are committed to reducing our carbon footprint — incorporating green practices across all real estate projects and running solar energy installations across Central India.",
    points: ["Zero-waste construction practices", "On-site solar power at all project sites", "Tree plantation drives with 1000+ saplings annually"],
  },
  {
    icon: HeartHandshake,
    color: "#d4af37",
    title: "Social",
    desc: "Fostering inclusive employment, safe working conditions, and fair wages across our entire workforce and supply chain.",
    points: ["Equal opportunity hiring policy", "Employee health & wellness programs", "Safety-first culture across logistics fleet"],
  },
  {
    icon: GraduationCap,
    color: "#a78bfa",
    title: "Community",
    desc: "We invest in the communities where we operate — from skill development programs to infrastructure contributions in underserved areas.",
    points: ["Youth skill development initiatives", "Local contractor preference policy", "Community sports & cultural sponsorships"],
  },
  {
    icon: Droplet,
    color: "#38bdf8",
    title: "Resource Efficiency",
    desc: "Minimizing resource waste across our operations — from optimized logistics routes to responsible water use on all construction sites.",
    points: ["Optimized fleet routes — fuel savings", "Rainwater harvesting at project sites", "Digital-first operations to reduce paper waste"],
  },
];

const stats = [
  { label: "Solar Capacity Installed", value: 5, suffix: "MW+", desc: "Across Madhya Pradesh." },
  { label: "Local Jobs Created", value: 1200, suffix: "+", desc: "Directly by Aegis operations." },
  { label: "Saplings Planted", value: 5000, suffix: "+", desc: "Community plantation drives." },
];

function StatRing({ value, suffix, label, desc, delay }: { value: number; suffix: string; label: string; desc: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          <motion.circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="276"
            initial={{ strokeDashoffset: 276 }}
            animate={inView ? { strokeDashoffset: 0 } : {}}
            transition={{ duration: 1.8, delay: delay + 0.2, ease: "easeOut" }}
          />
        </svg>
        <div className="relative z-10 text-center">
          <div className="text-3xl font-bold text-primary">
            <AnimatedCounter from={0} to={value} suffix={suffix} duration={1.8} />
          </div>
        </div>
      </div>
      <h4 className="text-base font-bold text-primary mb-1">{label}</h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </motion.div>
  );
}

export default function CSR() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <PageHero
        eyebrow="Sustainability & Impact"
        title="Building a Better"
        highlight="Tomorrow."
        subtitle="We integrate Environmental, Social, and Governance principles into every strategic decision — because responsible business is the only way to build lasting legacy."
        image="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1600"
      />

      {/* ESG Pillars */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary tracking-[0.22em] font-semibold text-[11px] uppercase block mb-3">Our Commitment</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">ESG Pillars</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
                className="group relative bg-card border border-border rounded-2xl p-8 overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(212,175,55,0.07)]"
              >
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20" style={{ background: p.color }} />
                <div className="flex items-start gap-5 mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${p.color}18`, border: `1px solid ${p.color}40` }}
                    whileHover={{ rotate: 8, scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p.icon size={24} style={{ color: p.color }} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
                <ul className="space-y-2.5 pl-1">
                  {p.points.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * j + 0.3 }}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 size={14} style={{ color: p.color }} className="flex-shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-secondary border-y border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary tracking-[0.22em] font-semibold text-[11px] uppercase block mb-3">Measured Results</span>
            <h2 className="text-4xl font-display font-bold text-foreground">Our Impact in Numbers</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((s, i) => (
              <StatRing key={i} {...s} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* Commitment section */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Our Pledge to <span className="text-gradient-gold">Responsible Growth</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Aegis Group is committed to operating in a way that benefits not just our clients and shareholders, but the broader communities of Central India. We believe that business done right creates a rising tide for everyone.
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto w-48" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

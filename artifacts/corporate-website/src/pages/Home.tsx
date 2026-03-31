import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Building2, Globe2, Users, TrendingUp, ShieldCheck,
  Zap, Truck, ChevronDown
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

// ── Floating Particle ──────────────────────────────────────────────────────
function Particle({ index }: { index: number }) {
  const size = Math.random() * 3 + 1;
  const x = Math.random() * 100;
  const duration = Math.random() * 12 + 8;
  const delay = Math.random() * 6;
  const opacity = Math.random() * 0.5 + 0.1;

  return (
    <motion.div
      className="absolute rounded-full bg-primary pointer-events-none"
      style={{ width: size, height: size, left: `${x}%`, bottom: "-10px", opacity }}
      animate={{ y: [0, -(Math.random() * 600 + 300)], opacity: [opacity, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ── Glowing Orb ────────────────────────────────────────────────────────────
function GlowOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, opacity: 0.15 }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.22, 0.1] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Animated Grid Lines ────────────────────────────────────────────────────
function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.07 }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// ── Typewriter cycling text ────────────────────────────────────────────────
const WORDS = ["Real Estate", "Logistics", "Technology", "Energy"];

function TypewriterCycle() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1400);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), 800);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex]);

  return (
    <span className="text-gradient-gold inline-block min-w-[4ch]">
      {displayed}
      <motion.span
        className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  );
}

// ── Marquee ticker ─────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "Real Estate Development", "•", "Logistics & Supply Chain", "•", "Technology & AI", "•",
  "Energy & Solar", "•", "Bhopal · Central India", "•", "150+ Projects Completed", "•",
  "15 Years of Excellence", "•", "50+ Fleet Vehicles", "•", "98% Client Satisfaction", "•",
];

function MarqueeTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-y border-primary/20 bg-primary/5 py-3">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={item === "•" ? "text-primary text-lg" : "text-xs tracking-widest uppercase text-muted-foreground font-medium"}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Image Slideshow for sector cards ───────────────────────────────────────
const SLIDE_EFFECTS = ["crossfade", "slide", "zoom"] as const;
type SlideEffect = typeof SLIDE_EFFECTS[number];

function SectorSlideshow({ images, color, effect }: { images: string[]; color: string; effect: SlideEffect }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % images.length);
    }, 3200 + Math.random() * 800);
    return () => clearInterval(interval);
  }, [images.length]);

  const variants = {
    crossfade: {
      enter: { opacity: 0, scale: 1.06 },
      center: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.97 },
    },
    slide: {
      enter: { opacity: 0, x: direction * 80 },
      center: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -direction * 80 },
    },
    zoom: {
      enter: { opacity: 0, scale: 1.2 },
      center: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.85 },
    },
  };

  const v = variants[effect];

  return (
    <div className="relative h-52 overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={images[current]}
          alt="sector"
          className="absolute inset-0 w-full h-full object-cover"
          initial={v.enter}
          animate={v.center}
          exit={v.exit}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className="rounded-full transition-all"
            animate={{
              width: i === current ? 18 : 6,
              backgroundColor: i === current ? color : "rgba(255,255,255,0.35)",
            }}
            style={{ height: 6 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Image count badge */}
      <div
        className="absolute top-3 left-3 text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm z-10"
        style={{ background: `${color}22`, border: `1px solid ${color}44`, color }}
      >
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

// ── Sector card with animated border trace ─────────────────────────────────
const sectors = [
  {
    name: "Real Estate",
    icon: Building2,
    color: "#d4af37",
    desc: "High-end residential and commercial developments across Bhopal and Central India, built to international standards.",
    effect: "crossfade" as SlideEffect,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Logistics",
    icon: Truck,
    color: "#34d399",
    desc: "50+ vehicle fleet and regional warehousing delivering reliable supply chain solutions across Central India.",
    effect: "slide" as SlideEffect,
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Technology",
    icon: Globe2,
    color: "#a78bfa",
    desc: "Custom software, cloud migrations, and AI-driven solutions that accelerate enterprise digital transformation.",
    effect: "zoom" as SlideEffect,
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    name: "Energy",
    icon: Zap,
    color: "#4ade80",
    desc: "Solar power installations and sustainable energy consulting that cut costs and accelerate the path to net-zero.",
    effect: "crossfade" as SlideEffect,
    images: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1509391111902-de77d589c1f0?auto=format&fit=crop&q=80&w=800",
    ],
  },
];

// ── Partner data ───────────────────────────────────────────────────────────
const PARTNERS = [
  { logo: "🏦", name: "Meridian Capital Group", sector: "Investment Banking" },
  { logo: "🏗️", name: "CoreBuilt International", sector: "Construction" },
  { logo: "⚡", name: "VoltNexus Energy", sector: "Renewable Energy" },
  { logo: "🌐", name: "SkyLink Technologies", sector: "Technology" },
  { logo: "🚢", name: "BlueTide Logistics", sector: "Supply Chain" },
  { logo: "🏢", name: "Pinnacle Real Estate", sector: "Property Development" },
  { logo: "📊", name: "Apex Financial Services", sector: "Wealth Management" },
  { logo: "🔬", name: "NovaTech Innovations", sector: "R&D & AI" },
  { logo: "✈️", name: "GlobalAir Freight", sector: "Aerospace Logistics" },
  { logo: "🏭", name: "Ironclad Industries", sector: "Manufacturing" },
  { logo: "🌿", name: "GreenRoot Sustainability", sector: "ESG & CSR" },
  { logo: "💎", name: "Sterling Ventures", sector: "Private Equity" },
];

// ── Stat card with pulse ring ──────────────────────────────────────────────
function StatCard({ label, value, prefix, suffix, delay, icon: Icon }: {
  label: string; value: number; prefix?: string; suffix?: string; delay: number; icon: React.ElementType;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative flex flex-col items-center text-center py-8 px-4 group"
    >
      <div className="relative mb-4">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, delay, repeat: Infinity }}
        />
        <div className="relative w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
          <Icon size={22} />
        </div>
      </div>
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
        <AnimatedCounter from={0} to={value} prefix={prefix} suffix={suffix} duration={2.5} />
      </div>
      <div className="text-sm text-muted-foreground tracking-wide">{label}</div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const particles = Array.from({ length: 28 }, (_, i) => i);

  return (
    <div className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Layered background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Hero background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </motion.div>

        {/* Grid lines */}
        <div className="absolute inset-0 z-1">
          <GridLines />
        </div>

        {/* Glowing orbs */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          <GlowOrb x="10%" y="20%" size={400} color="#d4af37" delay={0} />
          <GlowOrb x="70%" y="50%" size={350} color="#6366f1" delay={2} />
          <GlowOrb x="40%" y="70%" size={300} color="#d4af37" delay={4} />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
          {particles.map((i) => <Particle key={i} index={i} />)}
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-4 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-8">
              Empowering Global Progress
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Engineering Excellence<br />
            <span className="text-gradient-gold">Across Diversified Sectors.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Aegis Group delivers innovative solutions in Real Estate, Logistics, and Technology
            with a commitment to sustainability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/sectors" className="block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow">
                Explore Our Sectors
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link href="/about" className="block px-8 py-4 bg-transparent border border-border text-foreground font-semibold rounded-sm hover:border-primary hover:text-primary transition-colors">
                Discover Our History
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown size={18} className="text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────── */}
      <MarqueeTicker />

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/40" />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212,175,55,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 50%)",
            backgroundSize: "200% 200%"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <StatCard label="Projects Completed" value={150} suffix="+" delay={0} icon={ShieldCheck} />
            <StatCard label="Years of Experience" value={15} suffix="+" delay={0.15} icon={TrendingUp} />
            <StatCard label="Client Satisfaction" value={98} suffix="%" delay={0.3} icon={Users} />
            <StatCard label="Fleet Vehicles" value={50} suffix="+" delay={0.45} icon={Truck} />
          </div>
        </div>
      </section>

      {/* ── SECTORS GRID ──────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <GlowOrb x="80%" y="10%" size={500} color="#d4af37" delay={1} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Our Core Sectors" subtitle="Diversified Excellence" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 50, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/60 transition-colors cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Image slideshow */}
                <div className="relative">
                  <SectorSlideshow images={sector.images} color={sector.color} effect={sector.effect} />
                  {/* Glowing accent corner */}
                  <motion.div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-20"
                    style={{ background: `${sector.color}22`, border: `1px solid ${sector.color}55` }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <sector.icon size={14} style={{ color: sector.color }} />
                  </motion.div>
                </div>

                <div className="p-6">
                  {/* Animated icon */}
                  <motion.div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${sector.color}18`, border: `1px solid ${sector.color}33` }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <sector.icon size={18} style={{ color: sector.color }} />
                  </motion.div>

                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {sector.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{sector.desc}</p>

                  <Link href="/sectors" className="inline-flex items-center text-sm text-primary font-medium">
                    Explore
                    <motion.span
                      className="ml-1"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </Link>
                </div>

                {/* Animated bottom border on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{ background: sector.color }}
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/sectors" className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-sm hover:border-primary text-foreground hover:text-primary transition-colors">
                View All Sectors
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES / ABOUT SPLIT ──────────────────────────────────── */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        {/* Animated gradient sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ x: ["−20%", "120%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.04), transparent)",
            width: "60%",
          }}
        />
        <GlowOrb x="0%" y="30%" size={450} color="#d4af37" delay={0} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="text-primary tracking-widest font-semibold text-xs uppercase mb-4 block"
                initial={{ opacity: 0, letterSpacing: "0.05em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                Our Foundation
              </motion.span>

              <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6 leading-tight">
                Governed by Integrity,<br />
                <span className="text-gradient-gold">Driven by Vision.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                For over seven decades, Aegis Group has built its legacy on unyielding principles. True value is created not just through financial returns, but through positive impact on communities, environments, and economies.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Sustainable growth strategies",
                  "Uncompromising ethical standards",
                  "Commitment to community development"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 6, delay: i * 0.8, repeat: Infinity, ease: "linear" }}
                    >
                      <ShieldCheck className="text-primary flex-shrink-0" size={20} />
                    </motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/about" className="inline-block px-8 py-4 bg-foreground text-background font-semibold rounded-sm hover:bg-primary transition-colors">
                  Learn About Our Heritage
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Image with reveal overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-border relative group">
                {/* Reveal overlay */}
                <motion.div
                  className="absolute inset-0 bg-primary z-20 origin-left"
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                  alt="Aegis Headquarters"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                {/* Glowing border pulse */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/30 rounded-2xl pointer-events-none"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              {/* Floating quote badge */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-card border border-border p-6 rounded-xl shadow-2xl max-w-xs z-30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="text-4xl font-display text-primary mb-2 leading-none"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  "
                </motion.div>
                <p className="text-foreground text-sm italic">
                  Building lasting legacy through visionary investments and operational excellence.
                </p>
              </motion.div>

              {/* Floating KPI badge */}
              <motion.div
                className="absolute -top-6 -right-6 bg-primary/10 border border-primary/30 backdrop-blur-sm p-4 rounded-xl shadow-lg z-30 hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                animate={{ y: [0, -6, 0] }}
              >
                <motion.p
                  className="text-2xl font-bold text-primary"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  #1
                </motion.p>
                <p className="text-xs text-muted-foreground mt-1">Ranked Conglomerate</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS STRIP ───────────────────────────────────── */}
      <section className="py-16 border-t border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs tracking-widest uppercase text-muted-foreground mb-10"
          >
            Trusted By Global Leaders
          </motion.p>

          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex gap-6 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                <motion.div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-lg bg-muted/30 border border-border/60 cursor-default select-none"
                  whileHover={{ scale: 1.06, borderColor: "rgba(212,175,55,0.45)", backgroundColor: "rgba(212,175,55,0.06)" }}
                  transition={{ duration: 0.18 }}
                >
                  <span className="text-lg leading-none">{partner.logo}</span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-bold text-foreground/80 whitespace-nowrap">{partner.name}</span>
                    <span className="text-[10px] text-muted-foreground/60 tracking-wide">{partner.sector}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <GlowOrb x="50%" y="50%" size={600} color="#d4af37" delay={0} />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block py-1 px-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
              Partner With Us
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Build the <span className="text-gradient-gold">Future Together?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Whether you're an investor, partner, or talent looking to make an impact — Aegis Group opens doors to extraordinary opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="block px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow">
                  Contact Us
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/careers" className="block px-10 py-4 border border-border text-foreground font-semibold rounded-sm hover:border-primary hover:text-primary transition-colors">
                  Join Our Team
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

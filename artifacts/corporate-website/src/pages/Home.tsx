import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  Globe2,
  Users,
  TrendingUp,
  ShieldCheck,
  Zap,
  Truck,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

// ── Floating Particle ──────────────────────────────────────────────────────
function Particle({ index }: { index: number }) {
  const size = Math.random() * 2.5 + 0.8;
  const x = Math.random() * 100;
  const duration = Math.random() * 14 + 10;
  const delay = Math.random() * 8;
  const opacity = Math.random() * 0.4 + 0.08;
  return (
    <motion.div
      className="absolute rounded-full bg-primary pointer-events-none"
      style={{ width: size, height: size, left: `${x}%`, bottom: "-10px", opacity }}
      animate={{ y: [0, -(Math.random() * 700 + 300)], opacity: [opacity, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ── Glowing Orb ────────────────────────────────────────────────────────────
function GlowOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, opacity: 0.12 }}
      animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.18, 0.08] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Grid Lines ─────────────────────────────────────────────────────────────
function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.05 }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M 72 0 L 0 0 0 72" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// ── Animated headline reveal ───────────────────────────────────────────────
const HEADLINE_WORDS_1 = ["Engineering", "Excellence"];
const HEADLINE_WORDS_2 = ["Across", "Diversified", "Sectors."];

function HeroHeadline() {
  const wordVariant = {
    hidden: { opacity: 0, y: 60, rotateX: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.75, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  return (
    <h1 className="font-display font-bold text-foreground mb-6 leading-[1.08]"
      style={{ fontSize: "clamp(2.8rem, 8vw, 6.5rem)", perspective: "1000px" }}>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {HEADLINE_WORDS_1.map((w, i) => (
          <motion.span key={w} custom={i} variants={wordVariant} initial="hidden" animate="visible">
            {w}
          </motion.span>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-gradient-gold">
        {HEADLINE_WORDS_2.map((w, i) => (
          <motion.span key={w} custom={HEADLINE_WORDS_1.length + i} variants={wordVariant} initial="hidden" animate="visible">
            {w}
          </motion.span>
        ))}
      </div>
    </h1>
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
    <div className="overflow-hidden border-y border-primary/15 bg-primary/4 py-3">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span key={i} className={item === "•" ? "text-primary text-base" : "text-[11px] tracking-[0.2em] uppercase text-muted-foreground font-medium"}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Sector slideshow ───────────────────────────────────────────────────────
type SlideEffect = "crossfade" | "slide" | "zoom";

function SectorSlideshow({ images, color, effect }: { images: string[]; color: string; effect: SlideEffect }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const id = setInterval(() => { setDirection(1); setCurrent((c) => (c + 1) % images.length); }, 3400);
    return () => clearInterval(id);
  }, [images.length]);

  const variants = {
    crossfade: { enter: { opacity: 0, scale: 1.06 }, center: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.97 } },
    slide:     { enter: { opacity: 0, x: direction * 80 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -direction * 80 } },
    zoom:      { enter: { opacity: 0, scale: 1.18 }, center: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.88 } },
  };
  const v = variants[effect];

  return (
    <div className="relative h-52 overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.img key={current} src={images[current]} alt="sector"
          className="absolute inset-0 w-full h-full object-cover"
          initial={v.enter} animate={v.center} exit={v.exit}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <motion.button key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className="rounded-full"
            animate={{ width: i === current ? 20 : 6, backgroundColor: i === current ? color : "rgba(255,255,255,0.3)" }}
            style={{ height: 5 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Sector data ────────────────────────────────────────────────────────────
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
  { logo: "🏦", name: "Meridian Capital" },
  { logo: "🏗️", name: "CoreBuilt International" },
  { logo: "⚡", name: "VoltNexus Energy" },
  { logo: "🌐", name: "SkyLink Technologies" },
  { logo: "🚢", name: "BlueTide Logistics" },
  { logo: "🏢", name: "Pinnacle Real Estate" },
  { logo: "📊", name: "Apex Financial" },
  { logo: "🔬", name: "NovaTech Innovations" },
  { logo: "✈️", name: "GlobalAir Freight" },
  { logo: "🏭", name: "Ironclad Industries" },
];

// ── Stat item ──────────────────────────────────────────────────────────────
function StatItem({ label, value, prefix, suffix, delay, icon: Icon }: {
  label: string; value: number; prefix?: string; suffix?: string; delay: number; icon: React.ElementType;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center text-center px-6 py-10"
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={inView ? { width: 40 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      />

      <div className="relative mb-5">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, delay, repeat: Infinity }}
        />
        <div className="relative w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300">
          <Icon size={20} />
        </div>
      </div>

      <div className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-1.5">
        {inView && <AnimatedCounter from={0} to={value} prefix={prefix} suffix={suffix} duration={2.2} />}
      </div>
      <div className="text-xs text-muted-foreground tracking-[0.12em] uppercase font-medium">{label}</div>
    </motion.div>
  );
}

// ── Animated sector card ───────────────────────────────────────────────────
function SectorCard({ sector, index }: { sector: typeof sectors[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group relative rounded-xl overflow-hidden bg-card border border-border cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          background: `linear-gradient(135deg, ${sector.color}33 0%, transparent 60%)`,
          boxShadow: `inset 0 0 0 1px ${sector.color}55`,
        }}
      />

      {/* Slideshow */}
      <div className="relative overflow-hidden">
        <SectorSlideshow images={sector.images} color={sector.color} effect={sector.effect} />
        <motion.div
          className="absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center z-10 backdrop-blur-sm"
          style={{ background: `${sector.color}20`, border: `1px solid ${sector.color}50` }}
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <sector.icon size={15} style={{ color: sector.color }} />
        </motion.div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${sector.color}15`, border: `1px solid ${sector.color}30` }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <sector.icon size={15} style={{ color: sector.color }} />
          </motion.div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {sector.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{sector.desc}</p>

        <Link href="/sectors"
          className="inline-flex items-center text-xs font-semibold tracking-wider uppercase gap-2"
          style={{ color: sector.color }}>
          Explore
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight size={13} />
          </motion.span>
        </Link>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl"
        style={{ background: `linear-gradient(90deg, ${sector.color}, transparent)` }}
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const particles = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Parallax background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background" />
        </motion.div>

        <div className="absolute inset-0 z-[1]"><GridLines /></div>

        {/* Orbs */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <GlowOrb x="5%"  y="15%" size={480} color="#d4af37" delay={0} />
          <GlowOrb x="68%" y="45%" size={380} color="#6366f1" delay={2.5} />
          <GlowOrb x="38%" y="72%" size={320} color="#d4af37" delay={5} />
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {particles.map((i) => <Particle key={i} index={i} />)}
        </div>

        {/* Hero content */}
        <motion.div style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 py-1.5 px-5 rounded-full border border-primary/35 bg-primary/8 backdrop-blur-sm"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="text-primary text-[11px] font-semibold tracking-[0.22em] uppercase">
              Empowering Progress Across Central India
            </span>
          </motion.div>

          {/* Headline with staggered word reveal */}
          <HeroHeadline />

          {/* Gold divider line */}
          <motion.div
            className="mx-auto h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 180, opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Aegis Group delivers innovative solutions in Real Estate, Logistics, and Technology
            with a steadfast commitment to sustainability and regional excellence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="/sectors"
                className="flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-shadow">
                Explore Our Sectors
                <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold text-sm rounded-sm hover:border-primary/60 hover:text-primary transition-colors">
                Get In Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 font-medium">Scroll</span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-primary/70 to-transparent"
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 0.3, 0.7] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────── */}
      <MarqueeTicker />

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="relative py-4 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/30 to-background" />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            <StatItem label="Projects Completed" value={150} suffix="+" delay={0}    icon={ShieldCheck} />
            <StatItem label="Years of Experience"  value={15}  suffix="+" delay={0.1} icon={TrendingUp} />
            <StatItem label="Client Satisfaction"  value={98}  suffix="%" delay={0.2} icon={Users} />
            <StatItem label="Fleet Vehicles"        value={50}  suffix="+" delay={0.3} icon={Truck} />
          </div>
        </div>
      </section>

      {/* ── SECTORS GRID ──────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <GlowOrb x="85%" y="8%"  size={500} color="#d4af37" delay={1} />
          <GlowOrb x="-5%" y="60%" size={400} color="#6366f1" delay={3} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Our Core Sectors" subtitle="Diversified Excellence" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {sectors.map((sector, i) => (
              <SectorCard key={sector.name} sector={sector} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-14 text-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/sectors"
                className="inline-flex items-center gap-2.5 px-8 py-3 border border-border rounded-sm text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors">
                View Detailed Sector Pages
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES / ABOUT SPLIT ──────────────────────────────────── */}
      <section className="py-28 bg-secondary relative overflow-hidden">
        <GlowOrb x="0%" y="40%" size={500} color="#d4af37" delay={0} />
        <GlowOrb x="90%" y="10%" size={350} color="#6366f1" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="text-primary tracking-[0.22em] font-semibold text-[11px] uppercase mb-5 block"
                initial={{ opacity: 0, letterSpacing: "0.05em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                Our Foundation
              </motion.span>

              <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6 leading-[1.12]">
                Governed by Integrity,<br />
                <span className="text-gradient-gold">Driven by Vision.</span>
              </h2>

              <p className="text-muted-foreground text-base mb-10 leading-relaxed max-w-lg">
                Aegis Group has built its legacy on unyielding principles — that true value is created not just through financial returns, but through lasting impact on communities, environments, and regional economies.
              </p>

              <ul className="space-y-5 mb-12">
                {[
                  "Sustainable, long-term growth strategies",
                  "Uncompromising ethical and quality standards",
                  "Deep commitment to community development",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 * i + 0.3, duration: 0.5 }}
                    className="flex items-start gap-3.5"
                  >
                    <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-foreground text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background font-semibold text-sm rounded-sm hover:bg-primary transition-colors">
                  Learn Our Story
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-border/60 relative group">
                <motion.div
                  className="absolute inset-0 bg-primary z-20 origin-left"
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                  alt="Aegis Office"
                  className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
                <motion.div
                  className="absolute inset-0 border border-primary/20 rounded-2xl pointer-events-none"
                  animate={{ opacity: [0.2, 0.7, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              {/* Floating quote card */}
              <motion.div
                className="absolute -bottom-8 -left-6 bg-card border border-border/80 p-5 rounded-xl shadow-2xl max-w-[240px] z-30 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="text-3xl font-display text-primary mb-1.5 leading-none"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  "
                </motion.div>
                <p className="text-foreground text-xs leading-relaxed italic">
                  Building lasting legacy through visionary investments and operational excellence.
                </p>
              </motion.div>

              {/* Floating KPI badge */}
              <motion.div
                className="absolute -top-5 -right-5 bg-primary/10 border border-primary/30 backdrop-blur-md p-4 rounded-xl shadow-xl z-30 hidden md:flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
                animate={{ y: [0, -6, 0] }}
              >
                <span className="text-2xl font-bold text-primary">15+</span>
                <span className="text-[10px] text-muted-foreground tracking-wider uppercase mt-0.5">Years Active</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS STRIP ───────────────────────────────────── */}
      <section className="py-16 border-t border-border/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mb-10"
          >
            Trusted By Regional Leaders
          </motion.p>

          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <motion.div
              className="flex gap-10 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <motion.div
                  key={i}
                  className="inline-flex items-center gap-3 bg-card border border-border/60 rounded-lg px-5 py-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors flex-shrink-0"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg">{p.logo}</span>
                  <span className="font-medium text-xs tracking-wide">{p.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
        <GlowOrb x="50%" y="50%" size={700} color="#d4af37" delay={0} />

        {/* Animated radial sweep */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, rgba(212,175,55,0.06) 0deg, transparent 60deg, transparent 300deg, rgba(212,175,55,0.06) 360deg)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block py-1.5 px-5 rounded-full border border-primary/30 bg-primary/8 text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-7">
              Partner With Us
            </span>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-5 leading-tight">
              Ready to Build the{" "}
              <span className="text-gradient-gold">Future Together?</span>
            </h2>

            {/* Gold line */}
            <motion.div
              className="mx-auto h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-7"
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <p className="text-base text-muted-foreground mb-10 leading-relaxed">
              Whether you're an investor, partner, or top talent — Aegis Group opens doors to extraordinary opportunity across Central India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact"
                  className="flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:shadow-[0_0_40px_rgba(212,175,55,0.45)] transition-shadow">
                  Contact Us
                  <ArrowRight size={15} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/careers"
                  className="flex items-center gap-2 px-10 py-4 border border-border text-foreground font-semibold text-sm rounded-sm hover:border-primary/60 hover:text-primary transition-colors">
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

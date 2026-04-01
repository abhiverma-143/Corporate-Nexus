import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Briefcase, ArrowRight, Star, TrendingUp, MapPin, Clock, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const benefits = [
  {
    icon: TrendingUp,
    title: "Accelerated Growth",
    desc: "Mentorship programs, internal mobility, and structured leadership development tracks that fast-track your career.",
  },
  {
    icon: Star,
    title: "Rewarding Culture",
    desc: "Performance-linked incentives, annual recognition awards, and a workplace that genuinely celebrates your contribution.",
  },
  {
    icon: Briefcase,
    title: "Cross-Sector Exposure",
    desc: "Unique opportunity to work across Real Estate, Logistics, Technology, and Energy — building versatile expertise.",
  },
];

const jobs = [
  { title: "Senior Software Engineer", sector: "Technology", location: "Bhopal, MP", type: "Full-time", new: true },
  { title: "Real Estate Project Manager", sector: "Real Estate", location: "Bhopal, MP", type: "Full-time", new: true },
  { title: "Logistics Operations Lead", sector: "Logistics", location: "Bhopal / Indore", type: "Full-time", new: false },
  { title: "Solar Energy Consultant", sector: "Energy", location: "Central India", type: "Full-time", new: false },
  { title: "Business Development Executive", sector: "Corporate", location: "Bhopal, MP", type: "Full-time", new: false },
];

const sectorColor: Record<string, string> = {
  Technology: "#a78bfa",
  "Real Estate": "#d4af37",
  Logistics: "#34d399",
  Energy: "#4ade80",
  Corporate: "#38bdf8",
};

export default function Careers() {
  const [hovered, setHovered] = useState<number | null>(null);
  const benefitsRef = useRef(null);
  const benefitsInView = useInView(benefitsRef, { once: true });

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <PageHero
        eyebrow="Careers at Aegis"
        title="Shape the Future"
        highlight="With Us."
        subtitle="Join a team of builders, thinkers, and innovators driving excellence across Central India's most exciting business sectors."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Benefits */}
      <section ref={benefitsRef} className="py-24 bg-secondary border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors blur-2xl" />
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <b.icon size={22} />
                </motion.div>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-primary tracking-[0.22em] font-semibold text-[11px] uppercase block mb-3">Current Openings</span>
            <h2 className="text-4xl font-display font-bold text-foreground">Featured Roles</h2>
          </motion.div>

          <div className="space-y-4">
            {jobs.map((job, i) => {
              const color = sectorColor[job.sector] ?? "#d4af37";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                  className="group relative bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-[0_4px_30px_rgba(212,175,55,0.08)] overflow-hidden"
                >
                  {/* Side accent */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                    style={{ background: color }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: hovered === i ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h4>
                      {job.new && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 tracking-wider uppercase">New</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                        {job.sector}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 flex items-center gap-2 px-6 py-2.5 border border-primary text-primary rounded-sm text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-250"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Apply Now
                    <ArrowRight size={14} />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link href="/contact" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group">
              Don't see a fit? Send us your resume
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-background to-primary/5" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-primary/8 rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-5">
              Ready to Make an <span className="text-gradient-gold">Impact?</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We're always looking for talented, driven individuals. Even if you don't see a matching role, we'd love to hear from you.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-sm rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow">
                Get In Touch
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

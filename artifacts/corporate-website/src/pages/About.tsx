import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Target, Eye, Shield, Award, Landmark, CheckCircle2 } from "lucide-react";

const timeline = [
  { year: "2009", title: "Foundation", desc: "Aegis Group was established in Bhopal as a regional logistics provider, connecting manufacturers across Madhya Pradesh." },
  { year: "2012", title: "Real Estate Entry", desc: "Entered the residential real estate market in Bhopal, launching our first premium housing community." },
  { year: "2016", title: "Technology Arm", desc: "Launched Aegis Technology, delivering custom software solutions to regional enterprises." },
  { year: "2020", title: "Energy Expansion", desc: "Established our solar energy consulting division — helping businesses across Central India go green." },
  { year: "2024", title: "Diversified Excellence", desc: "Now operating across 4 core sectors with 150+ completed projects and a fleet of 50+ logistics vehicles." },
];

const values = [
  { icon: Shield, title: "Integrity", desc: "We operate with full transparency and ethical standards in every engagement." },
  { icon: Award, title: "Excellence", desc: "Quality is never compromised — from project planning to delivery." },
  { icon: Target, title: "Impact", desc: "Every project is designed to drive lasting value for our clients and communities." },
];

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center mb-14 last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-[calc(50%-2.5rem)] group"
      >
        <div className="bg-card border border-border rounded-xl p-7 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]">
          <span className="text-primary font-display font-bold text-2xl block mb-2">{item.year}</span>
          <h4 className="text-lg font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">{item.title}</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
        </div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary z-10 shadow-[0_0_16px_rgba(212,175,55,0.6)]"
      />
    </div>
  );
}

export default function About() {
  const missionRef = useRef(null);
  const missionInView = useInView(missionRef, { once: true });

  return (
    <div className="min-h-screen pt-20 bg-background">
      <PageHero
        eyebrow="Our Story"
        title="Built on Integrity."
        highlight="Driven by Vision."
        subtitle="A legacy of operational excellence and trusted partnerships — built over 15 years across Central India."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
      />

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              { icon: Target, label: "Our Mission", text: "To deliver sustainable, long-term value by operating leading businesses in Real Estate, Logistics, Technology, and Energy — driven by operational excellence and uncompromising integrity." },
              { icon: Eye, label: "Our Vision", text: "To be Central India's most trusted and respected business group, recognized for innovation, community impact, and a relentless commitment to quality across every sector we serve." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative bg-card border border-border rounded-2xl p-10 hover:border-primary/50 transition-all duration-400 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/4 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/8 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-7 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={26} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Values row */}
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-secondary border border-border/60 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <v.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{v.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 bg-secondary border-y border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary tracking-[0.22em] font-semibold text-[11px] uppercase block mb-3">Our History</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">A Journey of Growth</h2>
            <div className="mx-auto mt-5 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-28" />
          </motion.div>

          {/* Vertical line */}
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary tracking-[0.22em] font-semibold text-[11px] uppercase block mb-3">Excellence in Action</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Corporate Governance</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Ethical Standards", desc: "Rigorous compliance programs and ethical guidelines applied consistently across all business units and client engagements." },
              { icon: Award, title: "Quality Assurance", desc: "Process-driven delivery with structured quality checks at every project milestone — from planning to handover." },
              { icon: Landmark, title: "Risk Management", desc: "Proactive identification and mitigation of business, operational, and financial risks across our entire portfolio." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-center hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]"
              >
                <motion.div
                  className="w-14 h-14 mx-auto rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  whileHover={{ rotate: 8, scale: 1.05 }}
                >
                  <item.icon size={24} />
                </motion.div>
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

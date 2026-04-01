import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Linkedin, Mail } from "lucide-react";

const leaders = [
  {
    name: "Rajiv Mehta",
    role: "Group Chief Executive Officer",
    bio: "Over 20 years of experience building businesses across Central India. Rajiv founded Aegis Group in 2009 and has led its growth across four major sectors.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500&h=500",
  },
  {
    name: "Priya Sharma",
    role: "Chief Financial Officer",
    bio: "Former banking executive with expertise in corporate finance and strategic investments, ensuring robust financial governance across all subsidiaries.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500&h=500",
  },
  {
    name: "Arjun Singh",
    role: "Head — Real Estate",
    bio: "Visionary developer who has overseen 60+ residential and commercial projects across Bhopal and Central India since 2012.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500&h=500",
  },
  {
    name: "Dr. Kavita Nair",
    role: "Head — Technology",
    bio: "Leads our software engineering and AI consulting practice, with a background in enterprise architecture and digital transformation.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=500&h=500",
  },
  {
    name: "Vikram Pandey",
    role: "Head — Logistics",
    bio: "Built our logistics arm from scratch — now managing a fleet of 50+ vehicles and multi-city warehousing operations across the region.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500&h=500",
  },
  {
    name: "Ananya Gupta",
    role: "Head — Energy & Sustainability",
    bio: "Driving Aegis Group's renewable energy agenda — has overseen solar installations totalling over 5MW across Madhya Pradesh.",
    img: "https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?auto=format&fit=crop&q=80&w=500&h=500",
  },
];

function LeaderCard({ leader, index }: { leader: typeof leaders[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(212,175,55,0.12)]">
        {/* Photo */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-primary z-20 origin-top"
            initial={{ scaleY: 1 }}
            animate={inView ? { scaleY: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
          <img
            src={leader.img}
            alt={leader.name}
            className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

          {/* Social overlay */}
          <div className="absolute bottom-4 right-4 z-10 flex gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {[Linkedin, Mail].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={16} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors">
            {leader.name}
          </h3>
          <p className="text-primary text-xs font-semibold tracking-[0.1em] uppercase mb-4">{leader.role}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{leader.bio}</p>
        </div>

        {/* Bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-transparent w-0 group-hover:w-full transition-all duration-500"
        />
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  return (
    <div className="min-h-screen pt-20 pb-28 bg-background">
      <PageHero
        eyebrow="Visionary Leadership"
        title="The Team Behind"
        highlight="Aegis Group."
        subtitle="Experienced leaders united by a shared vision — building businesses that create lasting value for clients, communities, and partners."
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1600"
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, i) => (
              <LeaderCard key={leader.name} leader={leader} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

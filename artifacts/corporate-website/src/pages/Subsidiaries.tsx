import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ExternalLink, Search, MapPin } from "lucide-react";

const subsidiaries = [
  { id: 1, name: "Aegis Estates", sector: "Real Estate", location: "Bhopal, MP", desc: "Premium residential communities and gated townships across Bhopal.", initial: "AE" },
  { id: 2, name: "Aegis Infra Developers", sector: "Real Estate", location: "Bhopal, MP", desc: "Commercial complexes, office spaces, and mixed-use developments.", initial: "AI" },
  { id: 3, name: "Swift Logistics", sector: "Logistics", location: "Bhopal / Indore", desc: "Regional freight and last-mile delivery with a 50+ vehicle fleet.", initial: "SL" },
  { id: 4, name: "Central Warehousing Co.", sector: "Logistics", location: "Central India", desc: "Multi-location warehousing and inventory management solutions.", initial: "CW" },
  { id: 5, name: "Aegis Tech Solutions", sector: "Technology", location: "Bhopal, MP", desc: "Custom software development, web platforms, and cloud migrations.", initial: "AT" },
  { id: 6, name: "Aegis AI Labs", sector: "Technology", location: "Remote / Bhopal", desc: "AI/ML consulting and intelligent automation for enterprises.", initial: "AL" },
  { id: 7, name: "SolarEdge Consulting", sector: "Energy", location: "MP / CG Region", desc: "Solar system design, installation, and maintenance for businesses.", initial: "SE" },
  { id: 8, name: "GreenPower Infrastructure", sector: "Energy", location: "Central India", desc: "Large-scale renewable energy project development and advisory.", initial: "GP" },
];

const sectors = ["All", "Real Estate", "Logistics", "Technology", "Energy"];

const sectorColors: Record<string, string> = {
  "Real Estate": "#d4af37",
  Logistics: "#34d399",
  Technology: "#a78bfa",
  Energy: "#4ade80",
};

export default function Subsidiaries() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = subsidiaries.filter((s) => {
    const matchSector = filter === "All" || s.sector === filter;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchSector && matchSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-28 bg-background">
      <PageHero
        eyebrow="The Aegis Network"
        title="Our"
        highlight="Subsidiaries."
        subtitle="A growing portfolio of businesses across four sectors — each built to deliver excellence in their respective domains."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter + Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-5 justify-between items-center mb-14"
          >
            <div className="flex flex-wrap gap-2">
              {sectors.map((s) => {
                const active = filter === s;
                const color = sectorColors[s];
                return (
                  <motion.button
                    key={s}
                    onClick={() => setFilter(s)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-4 py-2 rounded-sm text-xs font-semibold tracking-wider uppercase border transition-all duration-200 ${
                      active
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-secondary border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {s}
                  </motion.button>
                );
              })}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={15} />
              <input
                type="text"
                placeholder="Search companies…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-border pl-10 pr-4 py-2.5 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/60 transition-colors"
              />
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((sub) => {
                const color = sectorColors[sub.sector] ?? "#d4af37";
                return (
                  <motion.div
                    layout
                    key={sub.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(212,175,55,0.1)] overflow-hidden"
                  >
                    {/* Glow */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `${color}30` }} />

                    {/* Header */}
                    <div className="flex justify-between items-start mb-5">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg"
                        style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
                        whileHover={{ rotate: 6, scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {sub.initial}
                      </motion.div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase" style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                        {sub.sector}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{sub.name}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-5">{sub.desc}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/60">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <MapPin size={12} />
                        {sub.location}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-muted-foreground hover:text-primary p-1.5 rounded-md hover:bg-primary/10 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </motion.button>
                    </div>

                    {/* Bottom bar */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-b-xl" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center text-muted-foreground"
              >
                <Search size={36} className="mx-auto mb-4 opacity-30" />
                <p>No companies match your search.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

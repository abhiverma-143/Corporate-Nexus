import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  Building2,
  Globe2,
  TrendingUp,
  Zap,
  Truck,
  HardHat,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Globe2,
  TrendingUp,
  Zap,
  Truck,
  HardHat,
};

interface Sector {
  id: number;
  name: string;
  description: string;
  icon_name: string;
  image_url: string;
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Sectors() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/sectors`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setSectors(json.data);
        } else {
          throw new Error("Unexpected response shape");
        }
      })
      .catch((err) => {
        console.error("Failed to load sectors:", err);
        setError("Unable to load sectors. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Business Sectors"
          subtitle="Engines of Global Economy"
          className="mb-16"
        />

        {loading && (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner size="lg" label="Loading sectors…" />
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center justify-center py-32">
            <p className="text-destructive text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <motion.div
            className="space-y-24"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {sectors.map((sector, index) => {
              const Icon = ICON_MAP[sector.icon_name] ?? Building2;
              const sectorSlug = sector.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

              return (
                <motion.div
                  key={sector.id}
                  variants={itemVariants}
                  viewport={{ once: true, margin: "-80px" }}
                  whileInView="visible"
                  initial="hidden"
                  className={`flex flex-col ${
                    index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-12 items-center`}
                >
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative overflow-hidden rounded-2xl border border-border">
                      <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                      <img
                        src={sector.image_url}
                        alt={sector.name}
                        className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center text-primary shadow-lg">
                      <Icon size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                      {sector.name}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {sector.description}
                    </p>

                    <div className="pt-6">
                      <a
                        href={`/subsidiaries?sector=${sectorSlug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-foreground hover:bg-primary px-6 py-3 rounded-sm border border-primary transition-all group"
                      >
                        View Associated Subsidiaries
                        <ArrowRight
                          size={18}
                          className="transform group-hover:translate-x-1 transition-transform"
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

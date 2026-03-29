import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Building2, Globe2, TrendingUp, Zap, Truck, HardHat, ArrowRight } from "lucide-react";

export default function Sectors() {
  const sectors = [
    { 
      id: "real-estate",
      name: "Real Estate Development", 
      icon: Building2, 
      desc: "Creating landmark commercial spaces, luxury residential communities, and strategic industrial parks globally.", 
      stats: ["$4.2B AUM", "12M sq.ft developed"],
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
    },
    { 
      id: "finance",
      name: "Financial Services", 
      icon: TrendingUp, 
      desc: "Comprehensive investment banking, wealth management, and corporate advisory services for elite clients.", 
      stats: ["$15B Assets Managed", "Tier 1 Banking"],
      img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200" 
    },
    { 
      id: "technology",
      name: "Technology & Innovation", 
      icon: Globe2, 
      desc: "Investing in and developing enterprise software, AI solutions, and next-generation cybersecurity platforms.", 
      stats: ["40+ Patents", "200M Users"],
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
    },
    { 
      id: "energy",
      name: "Energy & Resources", 
      icon: Zap, 
      desc: "Pioneering sustainable energy transitions, solar farms, and responsible resource extraction.", 
      stats: ["1.5 GW Green Energy", "Zero Carbon 2040"],
      img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200" 
    },
    { 
      id: "logistics",
      name: "Logistics & Supply Chain", 
      icon: Truck, 
      desc: "End-to-end global supply chain solutions, maritime shipping, and advanced automated warehousing.", 
      stats: ["150+ Ports", "99.9% Delivery"],
      img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?auto=format&fit=crop&q=80&w=1200" 
    },
    { 
      id: "infrastructure",
      name: "Construction & Infrastructure", 
      icon: HardHat, 
      desc: "Executing massive public-private partnerships, transportation networks, and civic mega-projects.", 
      stats: ["30+ Mega Projects", "Award Winning"],
      img: "https://images.unsplash.com/photo-1541888086925-920a0eb56e1e?auto=format&fit=crop&q=80&w=1200" 
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Our Business Sectors" 
          subtitle="Engines of Global Economy" 
          className="mb-16"
        />

        <div className="space-y-24">
          {sectors.map((sector, index) => (
            <motion.div 
              key={sector.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                  <img 
                    src={sector.img} 
                    alt={sector.name} 
                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="w-16 h-16 rounded-xl bg-card border border-border flex items-center justify-center text-primary shadow-lg">
                  <sector.icon size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{sector.name}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {sector.desc}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  {sector.stats.map((stat, i) => (
                    <div key={i} className="px-4 py-2 rounded-sm bg-secondary border border-border text-foreground font-semibold text-sm tracking-wide">
                      {stat}
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <a href={`/subsidiaries?sector=${sector.id}`} className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-foreground hover:bg-primary px-6 py-3 rounded-sm border border-primary transition-all group">
                    View Associated Subsidiaries
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

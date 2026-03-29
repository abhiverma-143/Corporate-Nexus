import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Building2, Globe2, Users, TrendingUp, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const sectors = [
  { name: "Real Estate", icon: Building2, desc: "Premium commercial and residential developments across 12 countries.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" },
  { name: "Financial Services", icon: TrendingUp, desc: "Wealth management, corporate banking, and investment strategies.", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800" },
  { name: "Technology & Innovation", icon: Globe2, desc: "Pioneering enterprise software and AI-driven business solutions.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Corporate Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
              Empowering Global Progress
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Building the <br />
            <span className="text-gradient-gold">Future of Industry</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Aegis Group is a diversified global conglomerate driving sustainable growth, innovation, and excellence across real estate, finance, technology, and infrastructure.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/sectors" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              Explore Our Sectors
            </Link>
            <Link href="/about" className="px-8 py-4 bg-transparent border border-border text-foreground font-semibold rounded-sm hover:border-primary hover:text-primary transition-all">
              Discover Our History
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-border">
            {[
              { label: "Global Employees", value: 45000, suffix: "+" },
              { label: "Countries Present", value: 32, suffix: "" },
              { label: "Years of Excellence", value: 75, suffix: "" },
              { label: "Annual Revenue", value: 12.4, prefix: "$", suffix: "B" }
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl md:text-5xl font-display font-bold text-primary mb-2">
                  <AnimatedCounter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2.5} />
                </div>
                <div className="text-sm md:text-base text-muted-foreground tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sectors */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Core Sectors" subtitle="Diversified Excellence" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={sector.img} alt={sector.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 relative z-20 bg-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                    <sector.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 text-foreground">{sector.name}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {sector.desc}
                  </p>
                  <Link href="/sectors" className="inline-flex items-center text-primary font-medium group/link">
                    Explore Sector
                    <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/sectors" className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-sm hover:border-primary text-foreground transition-colors">
              View All Sectors
            </Link>
          </div>
        </div>
      </section>

      {/* Brief About / Values */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/2 h-full bg-primary/5 blur-[100px] -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary tracking-widest font-semibold text-sm uppercase mb-4 block">Our Foundation</span>
              <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">Governed by Integrity, Driven by Vision.</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                For over seven decades, Aegis Group has built its legacy on unyielding principles. We believe that true value is created not just through financial returns, but through positive impact on communities, environments, and economies.
              </p>
              <ul className="space-y-4 mb-10">
                {["Sustainable growth strategies", "Uncompromising ethical standards", "Commitment to community development"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <ShieldCheck className="text-primary" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="px-8 py-4 bg-foreground text-background font-semibold rounded-sm hover:bg-primary transition-colors">
                Learn About Our Heritage
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* corporate architecture image */}
              <div className="rounded-2xl overflow-hidden border border-border relative">
                <div className="absolute inset-0 border border-primary/20 rounded-2xl z-20 pointer-events-none" />
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Aegis Headquarters" 
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-card border border-border p-8 rounded-xl shadow-2xl max-w-xs shimmer-effect">
                <div className="text-4xl font-display text-primary mb-2">"</div>
                <p className="text-foreground italic relative z-10">
                  Building lasting legacy through visionary investments and operational excellence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

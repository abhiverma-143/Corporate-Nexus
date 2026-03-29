import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Leaf, HeartHandshake, GraduationCap, Droplet } from "lucide-react";

export default function CSR() {
  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      
      {/* Hero */}
      <section className="relative py-32 overflow-hidden border-b border-border">
        {/* Abstract Green/Gold glowing background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[hsl(142,71%,45%)] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">Sustainability & Impact</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
            Building a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(142,71%,45%)] to-primary">Better Tomorrow</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our commitment goes beyond profit. We integrate Environmental, Social, and Governance (ESG) principles into every strategic decision we make.
          </p>
        </div>
      </section>

      {/* ESG Pillars */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our ESG Pillars" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, title: "Environmental", desc: "Achieving Net Zero by 2040 and transitioning 100% of operations to renewable energy." },
              { icon: HeartHandshake, title: "Social", desc: "Fostering inclusive workplaces, diversity, and prioritizing employee well-being globally." },
              { icon: GraduationCap, title: "Community", desc: "Investing $500M in education and local infrastructure in developing regions." },
              { icon: Droplet, title: "Resource Efficiency", desc: "Reducing water usage by 40% and eliminating single-use plastics across the group." }
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 rounded-xl text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary border border-border">
                  <pillar.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Carbon Reduction", value: 65, suffix: "%", text: "Decrease in Scope 1 & 2 emissions since 2015." },
              { label: "Community Investment", value: 420, prefix: "$", suffix: "M", text: "Capital deployed in local education and healthcare." },
              { label: "Renewable Energy", value: 85, suffix: "%", text: "Of total operational energy sourced from renewables." }
            ].map((stat, i) => (
              <div key={i} className="text-center relative">
                {/* Decorative circle */}
                <div className="mx-auto w-48 h-48 rounded-full border border-primary/20 flex items-center justify-center relative mb-6">
                  <div className="absolute inset-2 rounded-full border-2 border-primary border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="text-4xl font-display font-bold text-foreground">
                    <AnimatedCounter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-primary mb-2">{stat.label}</h4>
                <p className="text-muted-foreground text-sm">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

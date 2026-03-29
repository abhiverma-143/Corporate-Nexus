import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Target, Eye, Shield, Award } from "lucide-react";

export default function About() {
  const timeline = [
    { year: "1948", title: "Foundation", desc: "Aegis Group was established as a regional logistics provider." },
    { year: "1975", title: "Expansion", desc: "Entered the commercial real estate market, building iconic skylines." },
    { year: "1992", title: "Global Reach", desc: "Expanded operations to Europe and Asia, diversifying into financial services." },
    { year: "2010", title: "Technology Integration", desc: "Launched Aegis Tech, becoming a pioneer in enterprise solutions." },
    { year: "2024", title: "Sustainable Future", desc: "Committed $2B to green energy and sustainable infrastructure projects." }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-20 bg-secondary border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground"
          >
            Our <span className="text-gradient-gold">Heritage</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A legacy of excellence, a future of innovation. Discover the principles that drive the Aegis Group.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-10 rounded-xl hover:border-primary/50 transition-colors"
            >
              <Target className="text-primary w-12 h-12 mb-6" />
              <h3 className="text-3xl font-display font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To deliver sustainable, long-term value to our stakeholders by operating leading businesses in essential industries, driven by operational excellence and uncompromising integrity.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border p-10 rounded-xl hover:border-primary/50 transition-colors"
            >
              <Eye className="text-primary w-12 h-12 mb-6" />
              <h3 className="text-3xl font-display font-bold mb-4 text-foreground">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To be the world's most trusted corporate group, recognized for our innovative approach to global challenges and our commitment to leaving a positive imprint on society.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="A Journey of Growth" subtitle="Our History" alignment="center" />
          
          <div className="mt-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
            {timeline.map((item, i) => (
              <motion.div 
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-12 last:mb-0"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-background font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(212,175,55,0.5)] z-10">
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card border border-border p-6 rounded-xl hover:border-primary/50 transition-colors">
                  <span className="text-primary font-display font-bold text-xl mb-1 block">{item.year}</span>
                  <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title="Corporate Governance" subtitle="Excellence in Action" />
          <p className="text-muted-foreground max-w-3xl mx-auto mb-16 text-lg">
            Aegis Group maintains the highest standards of corporate governance, ensuring transparency, accountability, and ethical conduct at every level of our organization.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Ethical Standards", desc: "Rigorous compliance and ethics programs across all subsidiaries." },
              { icon: Award, title: "Quality Assurance", desc: "ISO certified processes guaranteeing excellence in delivery." },
              { icon: Target, title: "Risk Management", desc: "Proactive identification and mitigation of enterprise risks." }
            ].map((value, i) => (
              <div key={i} className="p-8 border border-border rounded-xl bg-card">
                <value.icon className="w-10 h-10 text-primary mx-auto mb-6" />
                <h4 className="text-xl font-bold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

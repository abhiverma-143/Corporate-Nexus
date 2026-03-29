import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Briefcase, ArrowRight, Star, Globe, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function Careers() {
  const jobs = [
    { title: "Senior Investment Analyst", sector: "Financial Services", location: "New York, NY", type: "Full-time" },
    { title: "Lead Software Engineer", sector: "Technology", location: "Remote / Global", type: "Full-time" },
    { title: "Sustainability Director", sector: "Corporate HQ", location: "London, UK", type: "Full-time" },
    { title: "Supply Chain Manager", sector: "Logistics", location: "Singapore", type: "Full-time" },
    { title: "Commercial Real Estate Broker", sector: "Real Estate", location: "Dubai, UAE", type: "Full-time" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      {/* Header */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <SectionHeading title="Shape the Future With Us" subtitle="Careers at Aegis" />
        <p className="text-xl text-muted-foreground mt-6 leading-relaxed">
          Join a global team of visionaries, operators, and creators. We offer unparalleled opportunities for growth, learning, and impact across diverse industries.
        </p>
      </section>

      {/* Culture/Benefits */}
      <section className="py-16 bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Global Mobility", desc: "Opportunities to work across our 32 international offices." },
              { icon: TrendingUp, title: "Accelerated Growth", desc: "Comprehensive leadership training and executive mentorship." },
              { icon: Star, title: "Premium Benefits", desc: "Top-tier health, wellness, and financial security packages." }
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4 p-6">
                <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <benefit.icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-display font-bold text-foreground mb-10 border-b border-border pb-4">Featured Openings</h3>
          
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between group hover:border-primary transition-colors hover:shadow-lg"
              >
                <div>
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{job.title}</h4>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase size={14}/> {job.sector}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{job.location}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 border border-primary text-primary rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors font-medium flex items-center gap-2">
                  Apply Now
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
              Don't see a fit? Send us your resume <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Linkedin, Mail } from "lucide-react";

export default function Leadership() {
  const leaders = [
    {
      name: "Arthur E. Sterling",
      role: "Group Chief Executive Officer",
      bio: "Over 30 years of experience in global markets and corporate strategy.",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Eleanor Vance",
      role: "Chief Financial Officer",
      bio: "Former investment banker leading the group's robust financial portfolio.",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Marcus Chen",
      role: "Chief Operating Officer",
      bio: "Expert in scaling global operations and supply chain management.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Dr. Sarah Al-Fayed",
      role: "Head of Technology & Innovation",
      bio: "Leading digital transformation and enterprise software investments.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Jameson Wright",
      role: "Head of Real Estate",
      bio: "Visionary developer behind our flagship commercial properties.",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Elena Rostova",
      role: "Head of Sustainability (CSR)",
      bio: "Driving the group's commitment to zero emissions and social impact.",
      img: "https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Board of Directors" 
          subtitle="Visionary Leadership" 
          className="mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                <div className="aspect-square overflow-hidden relative">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10" />
                  {/* grayscale to color on hover for premium effect */}
                  <img 
                    src={leader.img} 
                    alt={leader.name} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700"
                  />
                  
                  {/* Social Links overlay */}
                  <div className="absolute bottom-4 right-4 z-20 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary">
                      <Linkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary">
                      <Mail size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{leader.name}</h3>
                  <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-4">{leader.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

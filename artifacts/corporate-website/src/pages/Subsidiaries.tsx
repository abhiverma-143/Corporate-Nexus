import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExternalLink, Search, MapPin } from "lucide-react";

// Mock data
const subsidiaries = [
  { id: 1, name: "Aegis Properties", sector: "Real Estate", location: "New York, USA", desc: "Premier commercial real estate development." },
  { id: 2, name: "Skyline Ventures", sector: "Real Estate", location: "London, UK", desc: "Luxury residential management." },
  { id: 3, name: "Aegis Capital", sector: "Financial Services", location: "Frankfurt, DE", desc: "Investment banking and wealth management." },
  { id: 4, name: "Nexus FinTech", sector: "Technology", location: "Singapore", desc: "Blockchain and payment processing solutions." },
  { id: 5, name: "Aegis Software", sector: "Technology", location: "San Francisco, USA", desc: "Enterprise cloud platforms and AI." },
  { id: 6, name: "Global Logistics Ltd", sector: "Logistics", location: "Rotterdam, DE", desc: "Maritime shipping and freight forwarding." },
  { id: 7, name: "GreenPower Energy", sector: "Energy", location: "Oslo, NL", desc: "Offshore wind and solar farm operations." },
  { id: 8, name: "Aegis Constructors", sector: "Infrastructure", location: "Dubai, UAE", desc: "Heavy civil engineering and infrastructure." }
];

const sectors = ["All", "Real Estate", "Financial Services", "Technology", "Logistics", "Energy", "Infrastructure"];

export default function Subsidiaries() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredData = subsidiaries.filter(sub => {
    const matchesSector = filter === "All" || sub.sector === filter;
    const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase()) || sub.desc.toLowerCase().includes(search.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Our Subsidiaries" 
          subtitle="The Aegis Network" 
          alignment="center"
        />

        {/* Filters and Search */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {sectors.map(sector => (
              <button
                key={sector}
                onClick={() => setFilter(sector)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors border ${
                  filter === sector 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "bg-secondary border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search companies..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-card border border-border pl-10 pr-4 py-2.5 rounded-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((sub, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={sub.id}
              className="bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-all hover:shadow-xl group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center font-display font-bold text-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {sub.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {sub.sector}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">{sub.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 h-10">{sub.desc}</p>
              
              <div className="pt-6 border-t border-border flex items-center justify-between">
                <div className="flex items-center text-muted-foreground text-sm gap-2">
                  <MapPin size={16} />
                  {sub.location}
                </div>
                <button className="text-primary hover:text-primary/80 transition-colors p-2 rounded-full hover:bg-primary/10">
                  <ExternalLink size={18} />
                </button>
              </div>
            </motion.div>
          ))}
          
          {filteredData.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No subsidiaries found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

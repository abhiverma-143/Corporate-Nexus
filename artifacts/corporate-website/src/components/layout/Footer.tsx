import { Link } from "wouter";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary relative overflow-hidden border-t border-border/50">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-indigo-500/3 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-border/40">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Aegis Group Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-display font-bold text-lg tracking-wider text-foreground group-hover:text-primary transition-colors">
                AEGIS <span className="text-primary">GROUP</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">
              A diversified business group delivering excellence across Real Estate, Logistics, Technology, and Energy in Central India.
            </p>
            <div className="flex gap-2.5">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="w-8 h-8 rounded-full bg-background border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon size={13} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-xs font-bold mb-5 text-foreground uppercase tracking-[0.18em]">Discover</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Leadership", href: "/leadership" },
                { name: "Our Sectors", href: "/sectors" },
                { name: "Subsidiaries", href: "/subsidiaries" },
                { name: "Sustainability", href: "/sustainability" },
                { name: "Careers", href: "/careers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group text-xs">
                    <ArrowRight size={10} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xs font-bold mb-5 text-foreground uppercase tracking-[0.18em]">Head Office</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-muted-foreground text-xs">
                <MapPin size={13} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Aegis House, MP Nagar Zone II<br />Bhopal, Madhya Pradesh 462011</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-xs">
                <Phone size={13} className="text-primary shrink-0" />
                <span>+91 755 400 5000</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-xs">
                <Mail size={13} className="text-primary shrink-0" />
                <span>contact@aegisgroup.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-xs font-bold mb-5 text-foreground uppercase tracking-[0.18em]">Stay Updated</h4>
            <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
              Subscribe to Aegis Group news, project announcements, and sector updates.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-background border border-border/60 border-r-0 px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary rounded-l-sm placeholder:text-muted-foreground/50"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-primary-foreground px-3 py-2 rounded-r-sm hover:bg-primary/90 transition-colors flex-shrink-0"
              >
                <ArrowRight size={13} />
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Aegis Group. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="hover:text-primary transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

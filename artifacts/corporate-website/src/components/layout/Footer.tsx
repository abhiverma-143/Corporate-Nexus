import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary relative overflow-hidden border-t border-border">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt="Aegis Group Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-display font-bold text-xl tracking-wider text-foreground">
                AEGIS <span className="text-primary">GROUP</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed">
              A diversified global conglomerate committed to excellence, innovation, and sustainable growth.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">Discover</h4>
            <ul className="space-y-2">
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
                    <ArrowRight size={11} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">Global HQ</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-muted-foreground text-xs">
                <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                <span>1 Aegis Tower, Financial District<br />New York, NY 10004, USA</span>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground text-xs">
                <Phone size={14} className="text-primary shrink-0" />
                <span>+1 (212) 555-0199</span>
              </li>
              <li className="flex items-center gap-2.5 text-muted-foreground text-xs">
                <Mail size={14} className="text-primary shrink-0" />
                <span>corporate@aegisgroup.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">Investor Insights</h4>
            <p className="text-muted-foreground text-xs mb-3">
              Subscribe to our quarterly reports and press releases.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-background border border-border px-3 py-2 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-l-sm"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-3 py-2 rounded-r-sm hover:bg-primary/90 transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Aegis Group Holdings. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

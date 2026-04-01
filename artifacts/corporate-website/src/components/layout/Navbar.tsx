import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Sectors", href: "/sectors" },
  { name: "Subsidiaries", href: "/subsidiaries" },
  { name: "Sustainability", href: "/sustainability" },
  { name: "Careers", href: "/careers" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500 border-b",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-border/50 py-4 shadow-lg shadow-black/25"
            : "bg-background/30 backdrop-blur-md border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-50 relative">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Aegis Group Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-display font-bold text-xl tracking-wider text-foreground">
              AEGIS <span className="text-primary">GROUP</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-primary relative group",
                  location === link.href ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300",
                  location === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
            
            <Link 
              href="/contact"
              className="ml-4 px-6 py-2.5 rounded-sm bg-primary/10 border border-primary/30 text-primary font-medium tracking-wide hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden z-50 relative p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden pt-24 pb-8 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 overflow-y-auto">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "text-2xl font-display transition-colors",
                    location === link.href ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-border">
                <Link 
                  href="/contact"
                  className="w-full block text-center px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-sm tracking-wide"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

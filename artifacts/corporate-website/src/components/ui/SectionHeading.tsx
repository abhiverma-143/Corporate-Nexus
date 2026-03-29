import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function SectionHeading({ title, subtitle, alignment = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-12 md:mb-20", 
      alignment === "center" ? "text-center" : "text-left",
      className
    )}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-primary text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl lg:text-6xl font-display text-foreground"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={cn(
          "h-px bg-gradient-to-r from-primary/50 to-transparent mt-6",
          alignment === "center" ? "mx-auto w-24 from-transparent via-primary/50" : "w-32"
        )}
      />
    </div>
  );
}

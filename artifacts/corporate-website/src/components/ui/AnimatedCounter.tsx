import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ from = 0, to, duration = 2, prefix = "", suffix = "", className }: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      const node = nodeRef.current;
      if (!node) return;
      
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`;
        }
      });
      
      setHasAnimated(true);
      return () => controls.stop();
    }
  }, [from, to, duration, prefix, suffix, inView, hasAnimated]);

  return <span ref={nodeRef} className={className}>{prefix}{from}{suffix}</span>;
}

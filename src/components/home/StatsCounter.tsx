import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats, trustBadges } from "@/lib/data";
import { Shield } from "lucide-react";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(value % 1 === 0 ? Math.floor(v).toLocaleString() : v.toFixed(2));
    });
    return unsub;
  }, [spring, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" /> {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

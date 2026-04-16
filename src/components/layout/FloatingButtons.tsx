import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setShowTop(scrollY > 400);
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div className="scroll-progress fixed top-0 left-0 z-[60] h-0.5" style={{ width: `${scrollProgress}%` }} />

      <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-3 md:bottom-6">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={scrollToTop}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-colors hover:bg-accent"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href="mailto:contact@nexscale.io"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
        >
          <Mail className="h-5 w-5" />
        </a>

        <a
          href="https://wa.me/15550001234?text=Hello%20NexScale"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-success-foreground shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </>
  );
}

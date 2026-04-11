"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Cloud, ABCBlock, Flower } from "./DecorativeSVGs";

const motifs = [
  { Component: Star, x: "15%", y: "20%", color: "text-lavender", size: 28, delay: 0.2 },
  { Component: Cloud, x: "70%", y: "15%", color: "text-lavender-light", size: 40, delay: 0.4 },
  { Component: Heart, x: "80%", y: "65%", color: "text-rose", size: 22, delay: 0.6 },
  { Component: ABCBlock, x: "20%", y: "70%", color: "text-lavender", size: 32, delay: 0.8 },
  { Component: Flower, x: "85%", y: "30%", color: "text-rose", size: 26, delay: 0.5 },
  { Component: Star, x: "40%", y: "80%", color: "text-rose-dark", size: 20, delay: 0.7 },
  { Component: Heart, x: "10%", y: "45%", color: "text-rose-light", size: 18, delay: 0.3 },
  { Component: Cloud, x: "55%", y: "75%", color: "text-lavender-light", size: 36, delay: 0.9 },
];

export default function IntroScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] bg-cream flex items-center justify-center overflow-hidden"
        >
          {/* Floating motifs */}
          {motifs.map((motif, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: motif.delay, duration: 0.6, ease: "easeOut" }}
              className={`absolute ${motif.color}`}
              style={{ left: motif.x, top: motif.y }}
            >
              <motif.Component size={motif.size} />
            </motion.div>
          ))}

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="font-hand text-5xl md:text-7xl text-brown z-10"
          >
            Deci na dar
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

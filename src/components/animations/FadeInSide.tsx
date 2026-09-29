"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInSideProps {
  children: ReactNode;
  from?: "left" | "right";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export default function FadeInSide({
  children,
  from = "left",
  delay = 0,
  duration = 0.6,
  distance = 40,
  className,
}: FadeInSideProps) {
  const x = from === "left" ? -distance : distance;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

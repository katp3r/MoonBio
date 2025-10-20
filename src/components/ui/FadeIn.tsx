"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import clsx from "clsx";

type FadeInProps = PropsWithChildren<{
  delay?: number;
  className?: string;
}>;

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={clsx(className)}
    >
      {children}
    </motion.div>
  );
}



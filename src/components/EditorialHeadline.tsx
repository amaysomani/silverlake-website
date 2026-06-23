"use client";

import { motion, Variants } from "framer-motion";

export default function EditorialHeadline({ text, className }: { text: string, className?: string }) {
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

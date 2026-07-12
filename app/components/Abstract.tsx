"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { paperConfig } from "../config/paper";

export default function Abstract() {
  const { abstract, contributions } = paperConfig;

  return (
    <section id="abstract" className="py-24 px-4 md:px-8 border-y border-border/40 bg-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Abstract &amp; Contributions
          </h2>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Abstract Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-7 flex flex-col gap-6"
          >
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-500 fill-indigo-500/10" />
              <span>Research Summary</span>
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground align-justify">
              {abstract}
            </p>
          </motion.div>

          {/* Contributions List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 p-6 md:p-8 rounded-3xl border border-border bg-card/60 glassmorphic shadow-lg"
          >
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Key Contributions</span>
            </h3>

            <ul className="flex flex-col gap-4">
              {contributions.map((contribution, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {idx + 1}
                  </span>
                  <p className="text-sm md:text-base text-muted-foreground leading-snug">
                    {contribution}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

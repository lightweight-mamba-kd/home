"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Architecture() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section id="architecture" className="py-24 px-4 md:px-8 border-t border-border/40 bg-muted/10 relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Model Architecture
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            Detailed structure of the proposed Multi-branch Mamba 3D Backbone (teacher model).
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Text Description column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Multi-Branch Mamba 3DB</span>
              <h3 className="text-2xl font-bold text-foreground">Dual-Branch Voxel Feature Learning</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                The core teacher architecture consists of stacked **Multi-Branch Blocks (MBBs)**. Each block integrates a **Shallow Mamba branch** and a **Deep Mamba branch** in parallel.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                The **Shallow branch** employs standard Mamba layers combined with 3D sparse convolutions to extract low-level geometry, prioritizing computing speed.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                The **Deep branch** utilizes voxel merging and expanding operations interleaved with Mamba sequence sweeps to capture high-level global context and long-range structural dependencies.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Stacked MBBs</strong>: Robust multi-scale representation of point clouds.</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Orthogonal Sweeps</strong>: Structured sequence scans along both X and Y directions.</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Residual Fusion</strong>: Outputs from parallel branches are merged and fused.</span>
              </li>
            </ul>
          </motion.div>

          {/* Image Display column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-7 p-4 rounded-3xl border border-border bg-white shadow-xl flex items-center justify-center overflow-hidden"
          >
            <img
              src={`${basePath}/fig2.png`}
              alt="Architecture of the multi-branch Mamba 3D backbone used as the teacher model"
              className="max-w-full h-auto object-contain rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Move3d, Layers, Focus, Workflow } from "lucide-react";

const METHOD_STEPS = [
  {
    icon: Move3d,
    title: "1. Voxel Partition & Sequence Ordering",
    description:
      "Sparse 3D voxel grids are grouped and arranged sequentially along orthogonal directions (X-axis and Y-axis partitions) to preserve spatial locality while forming 1D sequences.",
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-500",
  },
  {
    icon: Layers,
    title: "2. Multi-Branch Feature Extraction",
    description:
      "A parallel architecture featuring a Shallow Mamba branch for low-level features and a Deep Mamba branch with voxel merging and expanding to capture high-level spatial context.",
    color: "from-indigo-500/20 to-indigo-600/5",
    iconColor: "text-indigo-500",
  },
  {
    icon: Focus,
    title: "3. Box-Aware Latent Alignment",
    description:
      "Feature alignment is applied selectively to common voxel indices within ground-truth 3D bounding boxes to prioritize semantic object regions and ignore background noise.",
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-500",
  },
  {
    icon: Workflow,
    title: "4. Mamba-Based Projection",
    description:
      "A lightweight Mamba encoder acts as a projection module, mapping student voxel representations into the higher-dimensional teacher feature space for loss calculation.",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-500",
  },
];

export default function Method() {
  return (
    <section id="method" className="py-24 px-4 md:px-8 bg-background relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Proposed Distillation Methodology
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            We bridge the gap between heavy multi-branch Mamba models and compact, prunable detectors through selective voxel-space feature alignment and coordinate-consistent distillation.
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Core Method Description */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-2xl font-bold text-foreground">
              Selective Voxel-Space Distillation
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Directly transferring voxel representations between teacher and student networks is challenging due to the differences in feature dimensions and spatial sparse layouts.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              To address this, our framework extracts intermediate Mamba block features and isolates common voxel indices that lie inside the ground-truth 3D bounding boxes. By focusing on active object voxels, we mitigate point cloud sparsity issues and suppress irrelevant background noise during knowledge transfer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-3xl border border-border bg-card/40 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            <div className="relative z-10 flex flex-col gap-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="font-semibold text-foreground">Loss Formulations</span>
                <span className="text-indigo-500">Active</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded bg-muted/50 border border-border/40">
                  <span className="text-indigo-500 font-bold">L_latent</span> = 1 / |I_common| * Σ || F_T[i, :] - ϕ(F_S[i, :]) ||_2^2
                </div>
                <div className="p-2 rounded bg-muted/50 border border-border/40">
                  <span className="text-purple-500 font-bold">L_head</span> = L_cls + L_reg + L_hm
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground/60 italic text-center mt-2">
                Total Objective: L = L_task + α * L_latent + β * L_head  (α = 1.0, β = 0.5)
              </div>
            </div>
          </motion.div>
        </div>

        {/* Step-by-Step Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHOD_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col p-6 rounded-3xl border border-border bg-card/30 hover:bg-card/70 hover:border-indigo-500/30 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-2xl bg-linear-to-br ${step.color} border border-border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-5 h-5 ${step.iconColor}`} />
                </div>
                <h4 className="text-base font-bold text-foreground mb-3">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

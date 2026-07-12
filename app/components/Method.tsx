"use client";

import { motion } from "framer-motion";
import { Cpu, Eye, BarChart3, Workflow } from "lucide-react";

const METHOD_STEPS = [
  {
    icon: Eye,
    title: "1. Teacher Feature Extraction",
    description:
      "Extracts multi-head spatial-temporal attention maps and intermediate representations from the high-capacity Transformer model (teacher) during robotic task execution.",
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-500",
  },
  {
    icon: Workflow,
    title: "2. State Space Projection",
    description:
      "Projects the quadratic attention weights into a linear State Space representation suitable for Mamba's continuous scan, bridging the structural architectural gap.",
    color: "from-indigo-500/20 to-indigo-600/5",
    iconColor: "text-indigo-500",
  },
  {
    icon: Cpu,
    title: "3. Temporal Contrastive Alignment",
    description:
      "Enforces temporal consistency between the Transformer's context history and Mamba's latent state trajectory using contrastive representation losses.",
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-500",
  },
  {
    icon: BarChart3,
    title: "4. Policy Head Distillation",
    description:
      "Aligns policy outputs (joint velocities, gripper states) via Kullback-Leibler (KL) divergence, transferring fine-grained control policies to the student model.",
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
            Our Distillation Framework
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            We bridge the gap between heavy self-attention models and efficient State Space Models (SSMs) through a multi-stage cross-architecture distillation protocol.
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
              Cross-Architecture Representation Matching
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              The primary challenge in distilling a Transformer (such as RT-1 or OCTO) into Mamba is their fundamentally different mechanisms for handling history: Transformers attend to the entire history explicitly with $O(N^2)$ cost, while Mamba maintains a running latent state with $O(N)$ linear cost.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              To address this, our method designs a **selective state-space projection layer** that takes the attention maps from the teacher and distills their information density directly into the linear recurrences of the Mamba block, matching the hidden state dynamics.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-3xl border border-border bg-card/40 relative overflow-hidden"
          >
            {/* Visual background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            <div className="relative z-10 flex flex-col gap-4 font-mono text-xs text-muted-foreground">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="font-semibold text-foreground">Loss Formulations</span>
                <span className="text-indigo-500">Active</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded bg-muted/50 border border-border/40">
                  <span className="text-purple-500 font-bold">L_feat</span> = || F_teacher - W_proj * F_student ||_2^2
                </div>
                <div className="p-2 rounded bg-muted/50 border border-border/40">
                  <span className="text-indigo-500 font-bold">L_temp</span> = -log( exp(sim(h_t^T, h_t^S)) / sum(exp(sim(...))) )
                </div>
                <div className="p-2 rounded bg-muted/50 border border-border/40">
                  <span className="text-emerald-500 font-bold">L_policy</span> = D_KL( P_teacher(a|s) || P_student(a|s) )
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground/60 italic text-center mt-2">
                Total Loss: L = L_task + λ1 * L_feat + λ2 * L_temp + λ3 * L_policy
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

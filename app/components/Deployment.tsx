"use client";

import { motion } from "framer-motion";
import { Bot, RefreshCw, Eye, Sparkles, Layers } from "lucide-react";

interface Scenario {
  title: string;
  badge: string;
  description: string;
  icon: any;
  metric: string;
  metricLabel: string;
  camColor: string; // for theme accents
  camGrid: boolean; // overlay coordinate grid
}

const SCENARIOS: Scenario[] = [
  {
    title: "Dynamic Obstacle Avoidance",
    badge: "Reactive Control",
    description:
      "Tested on a physical 7-DoF manipulator arm. The student Mamba model replans joint trajectories in real-time at 50Hz, avoiding sudden human hand intervention.",
    icon: Bot,
    metric: "98.4%",
    metricLabel: "Collision-Free Rate",
    camColor: "text-indigo-500 bg-indigo-500/10",
    camGrid: true,
  },
  {
    title: "Unseen Item Generalization",
    badge: "Generalization",
    description:
      "Evaluates grasping and placement success rates on novel household items (various packaging, mugs, tools) not seen during the training phase.",
    icon: Sparkles,
    metric: "+18.2%",
    metricLabel: "vs Direct Imitation",
    camColor: "text-purple-500 bg-purple-500/10",
    camGrid: false,
  },
  {
    title: "Robustness to Lighting Shifts",
    badge: "Robustness",
    description:
      "Deploys under drastic lighting modifications (direct sunlight, ambient shadows, specular reflections), proving representation stability from teacher alignment.",
    icon: Eye,
    metric: "94.5%",
    metricLabel: "Success under Shadows",
    camColor: "text-blue-500 bg-blue-500/10",
    camGrid: true,
  },
  {
    title: "Multi-Task Sequence Chaining",
    badge: "Sequential Tasks",
    description:
      "Chains multiple sub-tasks (opening a drawer, picking a container, placing it inside, and pushing the drawer shut) in a single continuous control loop.",
    icon: Layers,
    metric: "91.2%",
    metricLabel: "Sequence Completion",
    camColor: "text-emerald-500 bg-emerald-500/10",
    camGrid: false,
  },
];

export default function Deployment() {
  return (
    <section id="deployment" className="py-24 px-4 md:px-8 bg-background relative overflow-hidden border-t border-border/40">
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
            Real-world Physical Deployment
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            We evaluate the distilled Lightweight Mamba model directly on a physical mobile manipulator platform to validate real-time, closed-loop robustness.
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Deployment Scenario Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {SCENARIOS.map((sc, idx) => {
            const Icon = sc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 rounded-3xl border border-border bg-card/30 hover:bg-card/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Header info */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full border border-indigo-500/20 font-bold uppercase tracking-wider">
                      {sc.badge}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE STREAM
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-indigo-500 transition-colors">
                    {sc.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {sc.description}
                  </p>
                </div>

                {/* Cam Mock / Visual */}
                <div className="rounded-2xl border border-border bg-black/40 h-44 relative overflow-hidden flex flex-col justify-between p-4 group-hover:border-indigo-500/30 transition-colors">
                  {/* Grid Lines */}
                  {sc.camGrid && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                  )}

                  {/* Top overlay */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex gap-2">
                      <span className="text-[9px] font-bold text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-neutral-800">
                        CAM_0{idx + 1}
                      </span>
                      <span className="text-[9px] font-bold text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-neutral-800">
                        50 FPS
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-neutral-400 bg-black/60 px-1.5 py-0.5 rounded border border-neutral-800">
                      SYS_OK
                    </span>
                  </div>

                  {/* Center animated visual */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full border border-indigo-500/20 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="w-8 h-8 rounded-full border border-indigo-500/40 flex items-center justify-center"
                      />
                    </div>
                    <Icon className="w-5 h-5 text-indigo-500/50 absolute" />
                  </div>

                  {/* Coordinate overlay / crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-t border-b border-l border-r border-indigo-500/20 pointer-events-none" />

                  {/* Bottom overlay: Metrics */}
                  <div className="relative z-10 flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase text-neutral-400">Target Action</span>
                      <span className="text-[10px] font-mono text-neutral-200">Joints dQ: [-0.12, 0.43, -0.02, ...]</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] font-bold uppercase text-neutral-400">{sc.metricLabel}</span>
                      <span className="text-sm font-bold text-emerald-400">{sc.metric}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

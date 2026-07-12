"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Cpu, RefreshCw, GitPullRequest, Zap } from "lucide-react";

type TabId = "pipeline" | "partition" | "pruning";

export default function Architecture() {
  const [activeTab, setActiveTab] = useState<TabId>("pipeline");

  const tabs = [
    { id: "pipeline" as TabId, label: "Detection Pipeline", icon: GitPullRequest },
    { id: "partition" as TabId, label: "X/Y Voxel Partition", icon: Zap },
    { id: "pruning" as TabId, label: "Pruning & Compression", icon: Cpu },
  ];

  return (
    <section id="architecture" className="py-24 px-4 md:px-8 border-t border-border/40 bg-muted/10 relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Model Architecture
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            Inside the multi-branch Mamba teacher and the compressed student network. Explore the 3D LiDAR detection pipeline, sequence formatting, and pruning strategy.
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Interactive Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1.5 p-1.5 bg-card/60 glassmorphic border border-border/60 rounded-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 md:p-8 rounded-3xl border border-border bg-card/40 glassmorphic min-h-[400px] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === "pipeline" && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col md:flex-row gap-8 items-center justify-between"
              >
                {/* Text Side */}
                <div className="flex-1 flex flex-col gap-4">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">End-to-End LiDAR Detection</span>
                  <h3 className="text-xl font-bold text-foreground">3D Object Detection Pipeline</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Raw 3D LiDAR point clouds are voxelized and processed by a 3D sparse convolutional backbone. Voxel features are forwarded to our Mamba-based 3D backbone where long-range contextual relationships are computed efficiently.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The extracted 3D voxel representations are compressed into a 2D grid by the Bird's Eye View (BEV) Backbone, which is subsequently mapped to bounding box coordinates, orientations, and classifications by the CenterPoint-style detection head.
                  </p>
                  <ul className="flex flex-col gap-2 mt-2">
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Input: Sparse 3D LiDAR Point Clouds</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>3D Backbone: Stacked Multi-Branch Blocks (MBB)</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Outputs: CenterPoint-based Class & 3D Bounding Boxes</span>
                    </li>
                  </ul>
                </div>

                {/* SVG Schematic Side */}
                <div className="flex-1 w-full max-w-sm flex items-center justify-center">
                  <svg viewBox="0 0 240 240" className="w-full h-auto max-h-[260px] text-foreground">
                    <rect x="10" y="10" width="80" height="35" rx="6" fill="rgba(99,102,241,0.08)" stroke="currentColor" strokeWidth="1.5" />
                    <text x="50" y="31" textAnchor="middle" fontSize="9" fill="currentColor" fontWeight="bold">LiDAR Points</text>

                    <rect x="10" y="65" width="80" height="35" rx="6" fill="rgba(99,102,241,0.08)" stroke="currentColor" strokeWidth="1.5" />
                    <text x="50" y="86" textAnchor="middle" fontSize="9" fill="currentColor" fontWeight="bold">3D Voxel Grid</text>

                    <path d="M 90 27 L 120 27 L 120 65 M 90 82 L 120 82" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />

                    <rect x="110" y="65" width="20" height="35" rx="4" fill="rgba(244,63,94,0.08)" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="120" y="86" textAnchor="middle" fontSize="9" fill="#f43f5e" fontWeight="bold">Merge</text>

                    <path d="M 130 82 L 150 82" fill="none" stroke="#6366f1" strokeWidth="1.5" />

                    <rect x="150" y="55" width="80" height="55" rx="8" fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="2" />
                    <text x="190" y="82" textAnchor="middle" fontSize="9" fill="currentColor" fontWeight="bold">Multi-branch</text>
                    <text x="190" y="94" textAnchor="middle" fontSize="9" fill="currentColor" fontWeight="bold">Mamba 3DB</text>

                    <path d="M 190 110 L 190 145 M 190 145 L 110 145" fill="none" stroke="#6366f1" strokeWidth="1.5" />

                    <rect x="10" y="130" width="100" height="35" rx="6" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1.5" />
                    <text x="60" y="152" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">3D Detection Head</text>
                  </svg>
                </div>
              </motion.div>
            )}

            {activeTab === "partition" && (
              <motion.div
                key="partition"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col md:flex-row gap-8 items-center justify-between"
              >
                {/* Text Side */}
                <div className="flex-1 flex flex-col gap-4">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Spatial Structuring</span>
                  <h3 className="text-xl font-bold text-foreground">X and Y Axis Partitioning</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    To process sparse visual inputs sequentially, 3D voxel space features are organized into 1D sequences. We implement a window partition strategy along the X-axis and Y-axis orthogonal directions.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Each partition preserves local context by arranging adjacent voxels consecutively. These ordered sequences are processed by sequential Mamba operators, ensuring complete 3D spatial coverage while retaining linear sequence update properties.
                  </p>
                </div>

                {/* SVG Schematic Side */}
                <div className="flex-1 w-full max-w-sm flex items-center justify-center">
                  <svg viewBox="0 0 240 240" className="w-full h-auto max-h-[260px] text-foreground">
                    {/* Voxel Grid partition representation */}
                    <rect x="20" y="40" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
                    <line x1="40" y1="40" x2="40" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="60" y1="40" x2="60" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="80" y1="40" x2="80" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="20" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="20" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="20" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />

                    <path d="M 20 50 L 100 50 M 100 50 L 100 70 M 100 70 L 20 70" fill="none" stroke="#6366f1" strokeWidth="2" />
                    <text x="60" y="32" textAnchor="middle" fontSize="8" fill="#6366f1" fontWeight="bold">X-Axis Sweep</text>

                    {/* Y sweep */}
                    <rect x="140" y="40" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
                    <line x1="160" y1="40" x2="160" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="180" y1="40" x2="180" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="200" y1="40" x2="200" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="140" y1="60" x2="220" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="140" y1="80" x2="220" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <line x1="140" y1="100" x2="220" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />

                    <path d="M 150 40 L 150 120 M 150 120 L 170 120 M 170 120 L 170 40" fill="none" stroke="#f43f5e" strokeWidth="2" />
                    <text x="180" y="32" textAnchor="middle" fontSize="8" fill="#f43f5e" fontWeight="bold">Y-Axis Sweep</text>

                    {/* Explanation */}
                    <text x="120" y="150" textAnchor="middle" fontSize="8" fill="currentColor">Sweep partitions project grid features to 1D Mamba sequence updates</text>
                  </svg>
                </div>
              </motion.div>
            )}

            {activeTab === "pruning" && (
              <motion.div
                key="pruning"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col md:flex-row gap-8 items-center justify-between"
              >
                {/* Text Side */}
                <div className="flex-1 flex flex-col gap-4">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Model Compression Strategy</span>
                  <h3 className="text-xl font-bold text-foreground">Selective Network Pruning</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Lightweight student configurations are generated by reducing the width (feature channels) and depth (number of layers) of the teacher's 3D backbone.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Instead of arbitrary compression, we evaluate configurations using a revised **Cost-Performance Ratio (CPR)** metric. Latency measured on an NVIDIA A4000 GPU replaces raw activations to match hardware characteristics.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-3 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                      <span className="text-xs font-bold text-purple-400">Teacher Model</span>
                      <p className="text-[11px] text-muted-foreground mt-1">Width: 1.0 / Depth: 1.0</p>
                      <p className="text-[11px] text-muted-foreground">Parameters: 23.52M</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                      <span className="text-xs font-bold text-indigo-400">Student-h (Pruned)</span>
                      <p className="text-[11px] text-muted-foreground mt-1">Width: 0.25 / Depth: 0.50</p>
                      <p className="text-[11px] text-muted-foreground">Parameters: 4.11M</p>
                    </div>
                  </div>
                </div>

                {/* SVG Schematic Side */}
                <div className="flex-1 w-full max-w-sm flex items-center justify-center">
                  <svg viewBox="0 0 240 240" className="w-full h-auto max-h-[260px] text-foreground">
                    {/* Teacher representation */}
                    <rect x="20" y="50" width="80" height="90" rx="6" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1.5" />
                    <text x="60" y="42" textAnchor="middle" fontSize="9" fill="#a855f7" fontWeight="bold">Teacher (23.52M)</text>
                    <rect x="30" y="60" width="60" height="15" rx="3" fill="rgba(168,85,247,0.1)" />
                    <rect x="30" y="80" width="60" height="15" rx="3" fill="rgba(168,85,247,0.1)" />
                    <rect x="30" y="100" width="60" height="15" rx="3" fill="rgba(168,85,247,0.1)" />
                    <rect x="30" y="120" width="60" height="15" rx="3" fill="rgba(168,85,247,0.1)" />

                    {/* Arrow */}
                    <path d="M 110 95 L 130 95" fill="none" stroke="currentColor" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <text x="120" y="88" textAnchor="middle" fontSize="7" fill="currentColor">Prune</text>

                    {/* Student representation */}
                    <rect x="140" y="50" width="80" height="90" rx="6" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="1.5" />
                    <text x="180" y="42" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">Student-h (4.11M)</text>
                    <rect x="150" y="70" width="60" height="15" rx="3" fill="rgba(16,185,129,0.2)" />
                    <rect x="150" y="100" width="60" height="15" rx="3" fill="rgba(16,185,129,0.2)" />
                    {/* Hashed boxes to show reduction */}
                    <rect x="150" y="130" width="60" height="0" stroke="none" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

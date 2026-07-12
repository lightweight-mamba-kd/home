"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Cpu, Eye, Network, Zap } from "lucide-react";

type TabId = "overview" | "block" | "comparison";

export default function Architecture() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const tabs = [
    { id: "overview" as TabId, label: "Overview Pipeline", icon: Network },
    { id: "block" as TabId, label: "Mamba Block Details", icon: Cpu },
    { id: "comparison" as TabId, label: "Attention vs. SSM Scan", icon: Zap },
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
            Inside the Lightweight Mamba distillation framework. Explore the pipeline, the hardware-optimized block design, and SSM state updates.
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
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col md:flex-row gap-8 items-center justify-between"
              >
                {/* Text Side */}
                <div className="flex-1 flex flex-col gap-4">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">End-to-End Control</span>
                  <h3 className="text-xl font-bold text-foreground">Robot Control Loop Pipeline</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our architecture streams raw RGB visual inputs from the manipulator camera along with joint configurations. Images are processed by a lightweight convolutional backbone, combined with proprioceptive tokens, and projected into a sequence of input vectors.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Instead of a heavy multi-layer Transformer, the sequences are fed directly into the **Lightweight Mamba Blocks**, which maintain history recursively and output joint control updates at **50 Hz**.
                  </p>
                  <ul className="flex flex-col gap-2 mt-2">
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Input tokens: Visual embeddings + Joint angles</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Backbone: ResNet-10 (features) + L-Mamba recurrent scan</span>
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Output: 7-DoF joint velocities + gripper state</span>
                    </li>
                  </ul>
                </div>

                {/* SVG Schematic Side */}
                <div className="flex-1 w-full max-w-sm flex items-center justify-center">
                  <svg viewBox="0 0 240 240" className="w-full h-auto max-h-[260px] text-foreground dark:invert-0">
                    <rect x="10" y="10" width="80" height="40" rx="6" fill="rgba(99,102,241,0.08)" stroke="currentColor" strokeWidth="1.5" />
                    <text x="50" y="34" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">Camera RGB</text>

                    <rect x="10" y="70" width="80" height="40" rx="6" fill="rgba(99,102,241,0.08)" stroke="currentColor" strokeWidth="1.5" />
                    <text x="50" y="94" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">Joint State</text>

                    <path d="M 90 30 L 120 30 L 120 70 M 90 90 L 120 90" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />

                    <rect x="110" y="70" width="20" height="40" rx="4" fill="rgba(244,63,94,0.08)" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="120" y="94" textAnchor="middle" fontSize="10" fill="#f43f5e" fontWeight="bold">Concat</text>

                    <path d="M 130 90 L 150 90" fill="none" stroke="#6366f1" strokeWidth="1.5" />

                    <rect x="150" y="60" width="80" height="60" rx="8" fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="2" />
                    <text x="190" y="90" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">Lightweight</text>
                    <text x="190" y="104" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">Mamba layers</text>

                    <path d="M 190 120 L 190 150 M 190 150 L 110 150" fill="none" stroke="#6366f1" strokeWidth="1.5" />

                    <rect x="10" y="140" width="100" height="40" rx="6" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1.5" />
                    <text x="60" y="164" textAnchor="middle" fontSize="10" fill="#10b981" fontWeight="bold">Joint velocities</text>
                  </svg>
                </div>
              </motion.div>
            )}

            {activeTab === "block" && (
              <motion.div
                key="block"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col md:flex-row gap-8 items-center justify-between"
              >
                {/* Text Side */}
                <div className="flex-1 flex flex-col gap-4">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Mamba Block Detail</span>
                  <h3 className="text-xl font-bold text-foreground">Hardware-Optimized State Space Block</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Within each block, sequence representations are projected, passed through 1D convolutions and SiLU activations, and then mapped into parameters ($A, B, C$) governing state updates:
                  </p>
                  <div className="p-3 bg-muted/60 border border-border/40 rounded-xl font-mono text-[11px] text-muted-foreground my-1 leading-normal">
                    <p className="text-indigo-400 font-semibold">Discrete Scan recurrence:</p>
                    <p>h_t = Ā * h_(t-1) + B̄ * x_t</p>
                    <p>y_t = C * h_t + D * x_t</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We optimize this sequence scan kernel to compile directly onto edge accelerators (TensorRT/FP16), allowing high-frequency execution on the robot's physical controller.
                  </p>
                </div>

                {/* SVG Schematic Side */}
                <div className="flex-1 w-full max-w-sm flex items-center justify-center">
                  <svg viewBox="0 0 240 240" className="w-full h-auto max-h-[260px] text-foreground dark:invert-0">
                    {/* Input */}
                    <path d="M 20 120 L 50 120" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="20" cy="120" r="3" fill="#6366f1" />
                    <text x="25" y="112" fontSize="8" fill="currentColor">x_t</text>

                    {/* Left Linear Projection */}
                    <rect x="50" y="80" width="30" height="80" rx="4" fill="rgba(99,102,241,0.08)" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="65" y="124" textAnchor="middle" fontSize="8" fill="currentColor" transform="rotate(-90 65 120)">Linear Proj</text>

                    {/* Conv 1D & Activation */}
                    <path d="M 80 100 L 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="100" y="85" width="40" height="30" rx="4" fill="rgba(244,63,94,0.08)" stroke="#f43f5e" strokeWidth="1.5" />
                    <text x="120" y="103" textAnchor="middle" fontSize="8" fill="#f43f5e" fontWeight="bold">Conv 1D</text>

                    {/* SSM Scan Core */}
                    <path d="M 140 100 L 160 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="160" y="85" width="50" height="50" rx="6" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="2" />
                    <text x="185" y="108" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">Selective</text>
                    <text x="185" y="120" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">SSM Scan</text>

                    {/* Gating Multiplier */}
                    <path d="M 80 140 L 185 140 L 185 135" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <text x="125" y="136" fontSize="7" fill="currentColor">Gating skip</text>

                    {/* Output */}
                    <path d="M 210 110 L 230 110" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="230" cy="110" r="3" fill="#10b981" />
                    <text x="225" y="102" fontSize="8" fill="currentColor">y_t</text>
                  </svg>
                </div>
              </motion.div>
            )}

            {activeTab === "comparison" && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col md:flex-row gap-8 items-center justify-between"
              >
                {/* Text Side */}
                <div className="flex-1 flex flex-col gap-4">
                  <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Complexity Comparison</span>
                  <h3 className="text-xl font-bold text-foreground">Self-Attention vs. SSM Recurrent Scan</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Standard Transformer architectures attend to all past tokens at every step. This makes key-value caching (KV Cache) memory-expensive and leads to **quadratic computational growth $O(N^2)$** with respect to the sequence history.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mamba, by contrast, dynamically compresses historical inputs into a fixed-size latent state. This enables **linear $O(N)$ inference complexity**, meaning memory consumption remains constant regardless of control frequency and episode length.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-3 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                      <span className="text-xs font-bold text-purple-400">Attention (KV Cache)</span>
                      <p className="text-[11px] text-muted-foreground mt-1">Memory: Grows lineary over time</p>
                      <p className="text-[11px] text-muted-foreground">FLOPs: Quadratic O(N²)</p>
                    </div>
                    <div className="p-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                      <span className="text-xs font-bold text-indigo-400">Mamba SSM Scan</span>
                      <p className="text-[11px] text-muted-foreground mt-1">Memory: Constant (O(1) state)</p>
                      <p className="text-[11px] text-muted-foreground">FLOPs: Linear O(N)</p>
                    </div>
                  </div>
                </div>

                {/* SVG Schematic Side */}
                <div className="flex-1 w-full max-w-sm flex items-center justify-center">
                  <svg viewBox="0 0 240 240" className="w-full h-auto max-h-[260px] text-foreground dark:invert-0">
                    {/* Attention Matrix */}
                    <text x="60" y="40" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">Attention (All-to-All)</text>
                    <rect x="20" y="55" width="80" height="80" rx="4" fill="rgba(168,85,247,0.05)" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
                    {/* Cross links */}
                    <line x1="20" y1="55" x2="100" y2="135" stroke="#a855f7" strokeWidth="0.8" opacity="0.4" />
                    <line x1="100" y1="55" x2="20" y2="135" stroke="#a855f7" strokeWidth="0.8" opacity="0.4" />
                    <line x1="60" y1="55" x2="60" y2="135" stroke="#a855f7" strokeWidth="0.8" opacity="0.4" />
                    <line x1="20" y1="95" x2="100" y2="95" stroke="#a855f7" strokeWidth="0.8" opacity="0.4" />

                    {/* Recurrent Mamba */}
                    <text x="180" y="40" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">SSM (Recurrent)</text>
                    <circle cx="180" cy="95" r="16" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="2" />
                    <text x="180" y="98" textAnchor="middle" fontSize="8" fill="#10b981" fontWeight="bold">State h_t</text>
                    {/* Recurrent loop */}
                    <path d="M 194 85 C 215 75, 215 115, 194 105" fill="none" stroke="#10b981" strokeWidth="1.5" />
                    <path d="M 194 105 L 200 106 M 194 105 L 195 99" fill="none" stroke="#10b981" strokeWidth="1.5" />
                    {/* Linear inputs */}
                    <path d="M 140 95 L 164 95" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M 196 95 L 220 95" fill="none" stroke="currentColor" strokeWidth="1.2" />
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

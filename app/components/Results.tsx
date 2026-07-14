"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, TrendingUp, Zap, Clock } from "lucide-react";

interface ClassResult {
  name: string;
  oursAP: number;
  centerpointAP: number;
  dsvtAP: number;
  lionAP: number;
  latencyJetson: string;
  baselineLatency: string;
  pointsSimulated: { x: number; y: number }[];
  boxOurs: { x: number; y: number; w: number; h: number; r: number };
  boxGt: { x: number; y: number; w: number; h: number; r: number };
}

const RESULTS_DATA: Record<string, ClassResult> = {
  car: {
    name: "Car (Vehicle)",
    oursAP: 99.48,
    centerpointAP: 92.55,
    dsvtAP: 91.64,
    lionAP: 94.24,
    latencyJetson: "350ms",
    baselineLatency: "928ms (LION)",
    pointsSimulated: [
      { x: 50, y: 80 }, { x: 55, y: 78 }, { x: 62, y: 82 }, { x: 70, y: 80 },
      { x: 120, y: 110 }, { x: 124, y: 108 }, { x: 130, y: 112 }, { x: 135, y: 110 }, { x: 140, y: 108 },
      { x: 180, y: 130 }, { x: 185, y: 128 }, { x: 190, y: 132 }, { x: 195, y: 130 },
    ],
    boxOurs: { x: 130, y: 110, w: 45, h: 22, r: -12 },
    boxGt: { x: 129, y: 109, w: 45, h: 22, r: -12 },
  },
  pedestrian: {
    name: "Pedestrian",
    oursAP: 47.03,
    centerpointAP: 36.60,
    dsvtAP: 35.84,
    lionAP: 33.48,
    latencyJetson: "350ms",
    baselineLatency: "425ms (DSVT)",
    pointsSimulated: [
      { x: 105, y: 95 }, { x: 108, y: 92 }, { x: 106, y: 100 }, { x: 107, y: 105 },
      { x: 150, y: 120 }, { x: 151, y: 117 }, { x: 152, y: 124 }, { x: 149, y: 128 },
    ],
    boxOurs: { x: 150, y: 122, w: 14, h: 14, r: 5 },
    boxGt: { x: 150, y: 121, w: 14, h: 14, r: 5 },
  },
  motorcyclist: {
    name: "Motorcyclist",
    oursAP: 61.12,
    centerpointAP: 32.14,
    dsvtAP: 44.78,
    lionAP: 35.02,
    latencyJetson: "350ms",
    baselineLatency: "142ms (CenterPoint)",
    pointsSimulated: [
      { x: 80, y: 100 }, { x: 84, y: 98 }, { x: 88, y: 102 },
      { x: 160, y: 115 }, { x: 164, y: 113 }, { x: 168, y: 118 }, { x: 172, y: 116 },
    ],
    boxOurs: { x: 166, y: 115, w: 28, h: 16, r: -25 },
    boxGt: { x: 165, y: 116, w: 28, h: 16, r: -25 },
  },
};

export default function Results() {
  const [selectedClass, setSelectedClass] = useState<string>("car");
  const currentResult = RESULTS_DATA[selectedClass];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <section id="results" className="py-24 px-4 md:px-8 bg-background relative overflow-hidden border-t border-border/40">
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
            Livox-Legged Validation Results
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            Per-class AP performance and 3D bounding box predictions on the real-world Livox-Legged test dataset. Latency measured onboard our Jetson Orin NX robot platform.
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Class Selector Buttons */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {Object.entries(RESULTS_DATA).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedClass(key)}
              className={`px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedClass === key
                  ? "bg-foreground text-background border-foreground shadow-md"
                  : "bg-card/40 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${selectedClass === key ? "fill-background" : "fill-none"}`} />
              <span>{value.name}</span>
            </button>
          ))}
        </div>

        {/* Visualizations Row */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 items-stretch">
          {/* Visual Trajectory Graph (SVG-based animation) */}
          <div className="p-6 rounded-3xl border border-border bg-card/30 glassmorphic flex flex-col justify-between relative overflow-hidden min-h-[340px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-border/40 pb-3 mb-4">
              <span className="text-xs font-bold text-foreground tracking-wide uppercase">3D Box Prediction ({currentResult.name})</span>
              <div className="flex gap-4 text-[10px] font-semibold">
                <span className="flex items-center gap-1 text-indigo-500"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" /> Prediction</span>
                <span className="flex items-center gap-1 text-red-500"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> GT</span>
              </div>
            </div>

            {/* SVG Path drawing */}
            <div className="flex-1 flex items-center justify-center min-h-[200px] relative">
              <svg viewBox="0 0 240 200" className="w-full h-auto max-h-[220px]">
                {/* Simulated LiDAR Points */}
                {currentResult.pointsSimulated.map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="2.5" fill="currentColor" opacity="0.4" />
                ))}

                {/* Ground Truth Bounding Box */}
                <g transform={`rotate(${currentResult.boxGt.r} ${currentResult.boxGt.x} ${currentResult.boxGt.y})`}>
                  <rect
                    x={currentResult.boxGt.x - currentResult.boxGt.w / 2}
                    y={currentResult.boxGt.y - currentResult.boxGt.h / 2}
                    width={currentResult.boxGt.w}
                    height={currentResult.boxGt.h}
                    fill="rgba(239,68,68,0.05)"
                    stroke="#ef4444"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                </g>

                {/* Predicted Bounding Box */}
                <AnimatePresence mode="wait">
                  <g transform={`rotate(${currentResult.boxOurs.r} ${currentResult.boxOurs.x} ${currentResult.boxOurs.y})`}>
                    <motion.rect
                      key={`box-${selectedClass}`}
                      x={currentResult.boxOurs.x - currentResult.boxOurs.w / 2}
                      y={currentResult.boxOurs.y - currentResult.boxOurs.h / 2}
                      width={currentResult.boxOurs.w}
                      height={currentResult.boxOurs.h}
                      fill="rgba(99,102,241,0.1)"
                      stroke="#6366f1"
                      strokeWidth="1.8"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </g>
                </AnimatePresence>
              </svg>
            </div>

            <div className="text-[10px] text-muted-foreground/60 italic text-center mt-2">
              Bird's eye view (BEV) projections of LiDAR returns in calibrated vehicle coordinates.
            </div>
          </div>

          {/* Validation Curves Image */}
          <div className="p-6 rounded-3xl border border-border bg-card/30 glassmorphic flex flex-col justify-between relative overflow-hidden min-h-[340px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-border/40 pb-3 mb-4">
              <span className="text-xs font-bold text-foreground tracking-wide uppercase">Training Convergence Curves</span>
              <span className="text-[10px] font-semibold text-muted-foreground">mAP (%) vs Epochs</span>
            </div>

            <div className="flex-1 flex items-center justify-center min-h-[240px] relative overflow-hidden">
              <img
                src={`${basePath}/validation_curve.png`}
                alt="Validation Curve: Student-h vs DSVT on Livox-Legged"
                className="w-full h-auto max-h-[280px] object-contain rounded-2xl mix-blend-multiply dark:invert dark:mix-blend-screen"
              />
            </div>

            <div className="text-[10px] text-muted-foreground/60 italic text-center mt-2">
              Validation mAP (%) convergence comparing student-h training curves against DSVT baseline.
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Success rate card */}
          <div className="md:col-span-7 p-6 rounded-3xl border border-border bg-card/30 glassmorphic flex flex-col justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Average Precision (AP)
            </span>
            <div className="flex flex-col gap-3">
              {/* Student */}
              <div className="flex flex-col">
                <div className="flex justify-between items-baseline text-xs mb-1">
                  <span className="font-semibold text-foreground">Student-h (Ours)</span>
                  <span className="font-bold text-indigo-500 text-sm">{currentResult.oursAP}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${currentResult.oursAP}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-indigo-500 rounded-full"
                  />
                </div>
              </div>

              {/* LION */}
              <div className="flex flex-col">
                <div className="flex justify-between items-baseline text-xs mb-1">
                  <span className="font-medium text-muted-foreground">LION Baseline</span>
                  <span className="font-bold text-purple-400">{currentResult.lionAP}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${currentResult.lionAP}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
              </div>

              {/* DSVT */}
              <div className="flex flex-col">
                <div className="flex justify-between items-baseline text-xs mb-1">
                  <span className="font-medium text-muted-foreground">DSVT Baseline</span>
                  <span className="font-bold text-blue-400">{currentResult.dsvtAP}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${currentResult.dsvtAP}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>

              {/* CenterPoint */}
              <div className="flex flex-col">
                <div className="flex justify-between items-baseline text-xs mb-1">
                  <span className="font-medium text-muted-foreground">CenterPoint Baseline</span>
                  <span className="font-bold text-neutral-400">{currentResult.centerpointAP}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${currentResult.centerpointAP}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-zinc-400 dark:bg-zinc-700 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Time & latency card */}
          <div className="md:col-span-5 p-6 rounded-3xl border border-border bg-card/30 glassmorphic flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 mb-2">
                  <Clock className="w-4 h-4 text-indigo-500" /> Ours Latency
                </span>
                <span className="text-2xl font-bold text-foreground">{currentResult.latencyJetson}</span>
                <span className="text-[10px] text-muted-foreground mt-1">Measured on Jetson Orin NX (Batch Size 1)</span>
              </div>

              <div className="flex flex-col">
                <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 mb-2">
                  <Zap className="w-4 h-4 text-purple-500" /> Comparison
                </span>
                <span className="text-lg font-bold text-amber-500">{currentResult.baselineLatency}</span>
                <span className="text-[10px] text-muted-foreground mt-1">Ours achieves up to 2.6x latency reduction</span>
              </div>
            </div>
            
            <div className="text-[9px] text-muted-foreground/60 italic mt-4 border-t border-border/40 pt-3">
              Latency values are obtained under identical environments for fair comparison.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

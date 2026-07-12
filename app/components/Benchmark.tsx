"use client";

import { motion } from "framer-motion";
import { Cpu, HardDrive, Star } from "lucide-react";

interface BenchmarkRow {
  model: string;
  parameters: string;
  latencyA4000: number; // in ms
  mAP: number; // in %
  isOurs?: boolean;
  isStudent?: boolean;
}

const BENCHMARK_ROWS: BenchmarkRow[] = [
  {
    model: "CenterPoint [13]",
    parameters: "5.98M",
    latencyA4000: 26,
    mAP: 59.2,
  },
  {
    model: "VoxelNext [27]",
    parameters: "19.05M",
    latencyA4000: 46,
    mAP: 60.5,
  },
  {
    model: "Transfusion-L [28]",
    parameters: "8.38M",
    latencyA4000: 67,
    mAP: 64.6,
  },
  {
    model: "DSVT [14]",
    parameters: "8.20M",
    latencyA4000: 84,
    mAP: 66.4,
  },
  {
    model: "Voxel Mamba [6]",
    parameters: "22.35M",
    latencyA4000: 230,
    mAP: 67.5,
  },
  {
    model: "LION [5]",
    parameters: "16.52M",
    latencyA4000: 185,
    mAP: 68.0,
  },
  {
    model: "Teacher Model (Ours)",
    parameters: "23.52M",
    latencyA4000: 199,
    mAP: 68.2,
    isOurs: true,
  },
  {
    model: "Student-d (Ours)",
    parameters: "11.04M",
    latencyA4000: 108,
    mAP: 67.9,
    isOurs: true,
    isStudent: true,
  },
  {
    model: "Student-g (Ours)",
    parameters: "10.50M",
    latencyA4000: 97,
    mAP: 67.1,
    isOurs: true,
    isStudent: true,
  },
  {
    model: "Student-h (Ours)",
    parameters: "4.11M",
    latencyA4000: 71,
    mAP: 65.6,
    isOurs: true,
    isStudent: true,
  },
];

export default function Benchmark() {
  return (
    <section id="benchmark" className="py-24 px-4 md:px-8 bg-muted/20 relative overflow-hidden border-t border-border/40">
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
            nuScenes Quantitative Benchmark
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            Detailed performance comparison on the nuScenes validation set. Latency measures the model execution on a single NVIDIA RTX A4000 GPU under identical settings.
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Benchmark Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-card/40 glassmorphic overflow-hidden shadow-xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="py-4 px-6">Model</th>
                  <th className="py-4 px-3 text-center">Params (M)</th>
                  <th className="py-4 px-3 text-center">Latency (ms)</th>
                  <th className="py-4 px-6 text-right">nuScenes mAP (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-sm">
                {BENCHMARK_ROWS.map((row, index) => {
                  const latencyPercent = Math.min((row.latencyA4000 / 250) * 100, 100);

                  return (
                    <tr
                      key={index}
                      className={`transition-colors hover:bg-muted/10 ${
                        row.isOurs ? "bg-indigo-500/5 font-semibold text-indigo-900 dark:text-indigo-200" : "text-foreground"
                      }`}
                    >
                      <td className="py-4 px-6 flex items-center gap-2">
                        {row.isOurs && <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />}
                        <span>{row.model}</span>
                        {row.isStudent && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase shrink-0">
                            Student
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center font-mono text-xs">{row.parameters}</td>
                      <td className="py-4 px-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-xs">{row.latencyA4000} ms</span>
                          <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${row.isOurs ? "bg-indigo-500" : "bg-neutral-400"}`}
                              style={{ width: `${100 - latencyPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-bold text-xs md:text-sm">{row.mAP}%</span>
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
                            <div
                              className={`h-full rounded-full ${row.isOurs ? "bg-emerald-500" : "bg-neutral-400"}`}
                              style={{ width: `${row.mAP}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border/40 p-4 bg-muted/10 flex flex-wrap gap-6 text-xs text-muted-foreground justify-center">
            <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> OpenPCDet Pretrained Baselines</span>
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> Measured on a single NVIDIA RTX A4000 GPU</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, HardDrive, Zap, Star } from "lucide-react";

interface BenchmarkRow {
  model: string;
  parameters: string;
  gflops: number;
  memoryMB: number;
  latencyOrin: number; // in ms
  latencyPi5: number; // in ms
  successRate: number; // in %
  isOurs?: boolean;
}

const BENCHMARK_ROWS: BenchmarkRow[] = [
  {
    model: "Transformer Teacher (RT-1 / Octo)",
    parameters: "118.4M",
    gflops: 24.5,
    memoryMB: 480,
    latencyOrin: 88.4,
    latencyPi5: 345.0,
    successRate: 98.2,
  },
  {
    model: "Lightweight Mamba (Ours)",
    parameters: "14.2M",
    gflops: 2.1,
    memoryMB: 58,
    latencyOrin: 12.1,
    latencyPi5: 38.6,
    successRate: 96.5,
    isOurs: true,
  },
  {
    model: "DeiT-Imitation Baseline",
    parameters: "14.5M",
    gflops: 3.2,
    memoryMB: 94,
    latencyOrin: 28.5,
    latencyPi5: 112.4,
    successRate: 74.0,
  },
  {
    model: "LSTM-Control Baseline",
    parameters: "12.8M",
    gflops: 1.5,
    memoryMB: 45,
    latencyOrin: 9.8,
    latencyPi5: 32.0,
    successRate: 48.5,
  },
];

export default function Benchmark() {
  const [hardwareFilter, setHardwareFilter] = useState<"orin" | "pi5">("orin");

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
            Quantitative Benchmark
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            Detailed performance comparison of compute overhead, memory foot-print, and control latency tested across representative edge platforms.
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Hardware Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex gap-1 p-1 bg-card/60 border border-border/60 rounded-xl glassmorphic">
            <button
              onClick={() => setHardwareFilter("orin")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                hardwareFilter === "orin" ? "bg-indigo-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Jetson Orin Nano</span>
            </button>
            <button
              onClick={() => setHardwareFilter("pi5")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                hardwareFilter === "pi5" ? "bg-indigo-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Raspberry Pi 5</span>
            </button>
          </div>
        </div>

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
                  <th className="py-4 px-6">Model Architecture</th>
                  <th className="py-4 px-3 text-center">Params</th>
                  <th className="py-4 px-3 text-center">GFLOPs</th>
                  <th className="py-4 px-3 text-center">Memory (MB)</th>
                  <th className="py-4 px-3 text-center">Latency (ms)</th>
                  <th className="py-4 px-6 text-right">Task Success</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-sm">
                {BENCHMARK_ROWS.map((row, index) => {
                  const latency = hardwareFilter === "orin" ? row.latencyOrin : row.latencyPi5;
                  const latencyMax = hardwareFilter === "orin" ? 100 : 400; // for normalization
                  const latencyPercent = Math.min((latency / latencyMax) * 100, 100);

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
                        {row.isOurs && (
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20 font-bold uppercase shrink-0">
                            Ours
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center font-mono text-xs">{row.parameters}</td>
                      <td className="py-4 px-3 text-center font-mono text-xs">{row.gflops}</td>
                      <td className="py-4 px-3 text-center font-mono text-xs">{row.memoryMB} MB</td>
                      <td className="py-4 px-3 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-mono text-xs">{latency} ms</span>
                          <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${row.isOurs ? "bg-emerald-500" : "bg-neutral-400"}`}
                              style={{ width: `${100 - latencyPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-bold text-xs md:text-sm">{row.successRate}%</span>
                          <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden hidden sm:block">
                            <div
                              className={`h-full rounded-full ${row.isOurs ? "bg-indigo-500" : "bg-neutral-400"}`}
                              style={{ width: `${row.successRate}%` }}
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
            <span className="flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> Compiled with PyTorch 2.4 / TensorRT 10.0</span>
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Measured average power draw at full load</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

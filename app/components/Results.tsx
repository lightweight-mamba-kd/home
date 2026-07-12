"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, TrendingUp, Zap, Clock } from "lucide-react";

interface TaskResult {
  name: string;
  teacherSuccess: number;
  studentSuccess: number;
  baselineSuccess: number;
  teacherTime: string;
  studentTime: string;
  baselineTime: string;
  teacherPower: string;
  studentPower: string;
  baselinePower: string;
  pathTeacher: string; // SVG path data
  pathStudent: string; // SVG path data
  pathBaseline: string; // SVG path data
}

const RESULTS_DATA: Record<string, TaskResult> = {
  drawer: {
    name: "Open Drawer",
    teacherSuccess: 98,
    studentSuccess: 96,
    baselineSuccess: 74,
    teacherTime: "4.2s",
    studentTime: "4.5s",
    baselineTime: "6.8s",
    teacherPower: "45W (GPU)",
    studentPower: "7.5W (Orin)",
    baselinePower: "7.2W (Orin)",
    pathTeacher: "M 30,170 Q 70,120 120,110 T 210,105",
    pathStudent: "M 30,170 Q 68,124 118,114 T 210,107",
    pathBaseline: "M 30,170 Q 55,140 90,140 T 170,150 T 200,160",
  },
  pick: {
    name: "Pick & Place",
    teacherSuccess: 95,
    studentSuccess: 92,
    baselineSuccess: 68,
    teacherTime: "5.8s",
    studentTime: "6.1s",
    baselineTime: "8.5s",
    teacherPower: "48W (GPU)",
    studentPower: "7.8W (Orin)",
    baselinePower: "7.5W (Orin)",
    pathTeacher: "M 30,170 Q 80,60 140,80 T 210,140",
    pathStudent: "M 30,170 Q 78,63 138,84 T 210,143",
    pathBaseline: "M 30,170 Q 60,110 110,120 T 170,100 T 200,120",
  },
  obstacles: {
    name: "Obstacle Avoidance",
    teacherSuccess: 94,
    studentSuccess: 91,
    baselineSuccess: 55,
    teacherTime: "8.1s",
    studentTime: "8.6s",
    baselineTime: "12.3s",
    teacherPower: "52W (GPU)",
    studentPower: "8.2W (Orin)",
    baselinePower: "7.9W (Orin)",
    pathTeacher: "M 30,170 C 60,140 80,100 120,120 S 180,150 210,110",
    pathStudent: "M 30,170 C 58,142 78,103 118,122 S 178,148 210,112",
    pathBaseline: "M 30,170 C 45,160 70,130 90,160 S 140,180 180,170",
  },
};

export default function Results() {
  const [selectedTask, setSelectedTask] = useState<string>("drawer");
  const currentResult = RESULTS_DATA[selectedTask];

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
            Qualitative &amp; Quantitative Results
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-base">
            Select a robotic manipulation task to observe trajectory tracking and efficiency metrics compared against the teacher and direct imitation learning baselines.
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Task Selector Buttons */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {Object.entries(RESULTS_DATA).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedTask(key)}
              className={`px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all flex items-center gap-2 ${
                selectedTask === key
                  ? "bg-foreground text-background border-foreground shadow-md"
                  : "bg-card/40 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${selectedTask === key ? "fill-background" : "fill-none"}`} />
              <span>{value.name}</span>
            </button>
          ))}
        </div>

        {/* Results Showcase Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Visual Trajectory Graph (SVG-based animation) */}
          <div className="md:col-span-7 p-6 rounded-3xl border border-border bg-card/30 glassmorphic flex flex-col justify-between relative overflow-hidden min-h-[340px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
              <span className="text-xs font-bold text-foreground tracking-wide uppercase">Robot End-Effector Trajectory</span>
              <div className="flex gap-4 text-[10px] font-semibold">
                <span className="flex items-center gap-1 text-purple-500"><span className="w-2 h-0.5 bg-purple-500 inline-block" /> Teacher</span>
                <span className="flex items-center gap-1 text-indigo-500"><span className="w-2 h-0.5 bg-indigo-500 inline-block" /> Student (Ours)</span>
                <span className="flex items-center gap-1 text-zinc-400"><span className="w-2 h-0 border-t border-dashed border-zinc-400 inline-block" /> Baseline</span>
              </div>
            </div>

            {/* SVG Path drawing */}
            <div className="flex-1 flex items-center justify-center min-h-[200px] relative">
              <svg viewBox="0 0 240 200" className="w-full h-auto max-h-[220px]">
                {/* Obstacle / Target mocks */}
                {selectedTask === "obstacles" && (
                  <circle cx="120" cy="130" r="14" fill="rgba(244,63,94,0.15)" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                )}
                {selectedTask === "obstacles" && (
                  <text x="120" y="133" textAnchor="middle" fontSize="6" fill="#f43f5e" fontWeight="bold">Obstacle</text>
                )}

                {/* Target */}
                <circle cx="210" cy="110" r="6" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1" />
                <circle cx="210" cy="110" r="2" fill="#10b981" />
                <text x="210" y="98" textAnchor="middle" fontSize="6" fill="#10b981" fontWeight="bold">Target</text>

                {/* Starting point */}
                <circle cx="30" cy="170" r="4" fill="currentColor" opacity="0.8" />
                <text x="30" y="182" textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.6">Start</text>

                {/* Paths */}
                <AnimatePresence mode="wait">
                  <motion.path
                    key={`baseline-${selectedTask}`}
                    d={currentResult.pathBaseline}
                    fill="none"
                    stroke="#888"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <motion.path
                    key={`teacher-${selectedTask}`}
                    d={currentResult.pathTeacher}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <motion.path
                    key={`student-${selectedTask}`}
                    d={currentResult.pathStudent}
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                  />
                </AnimatePresence>
              </svg>
            </div>

            <div className="text-[10px] text-muted-foreground/60 italic text-center mt-2">
              Trajectories mapped from top-down workspace camera coordinates.
            </div>
          </div>

          {/* Metrics comparison cards */}
          <div className="md:col-span-5 flex flex-col justify-between gap-4">
            {/* Success rate card */}
            <div className="p-5 rounded-3xl border border-border bg-card/30 glassmorphic flex flex-col justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 mb-4">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Success Rate
              </span>
              <div className="flex flex-col gap-3">
                {/* Student */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-baseline text-xs mb-1">
                    <span className="font-semibold text-foreground">Lightweight Mamba (Ours)</span>
                    <span className="font-bold text-indigo-500 text-sm">{currentResult.studentSuccess}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${currentResult.studentSuccess}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Teacher */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-baseline text-xs mb-1">
                    <span className="font-medium text-muted-foreground">Transformer Teacher</span>
                    <span className="font-bold text-purple-400">{currentResult.teacherSuccess}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${currentResult.teacherSuccess}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-purple-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Baseline */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-baseline text-xs mb-1">
                    <span className="font-medium text-muted-foreground">Imitation Baseline (No KD)</span>
                    <span className="font-bold text-muted-foreground">{currentResult.baselineSuccess}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${currentResult.baselineSuccess}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-zinc-400 dark:bg-zinc-700 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Time & power card */}
            <div className="p-5 rounded-3xl border border-border bg-card/30 glassmorphic grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 mb-2">
                  <Clock className="w-3.5 h-3.5 text-blue-500" /> Avg. Time
                </span>
                <span className="text-xl font-bold text-foreground">{currentResult.studentTime}</span>
                <span className="text-[10px] text-muted-foreground mt-1">Teacher: {currentResult.teacherTime}</span>
                <span className="text-[10px] text-muted-foreground">Baseline: {currentResult.baselineTime}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1 mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Power Usage
                </span>
                <span className="text-xl font-bold text-emerald-500">{currentResult.studentPower}</span>
                <span className="text-[10px] text-muted-foreground mt-1">Teacher: {currentResult.teacherPower}</span>
                <span className="text-[10px] text-muted-foreground">Baseline: {currentResult.baselinePower}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

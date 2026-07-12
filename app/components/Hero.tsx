"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight, Sparkles, GitPullRequest, Database, Box } from "lucide-react";
import { paperConfig } from "../config/paper";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1.5 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 22.5 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
  </svg>
);

export default function Hero() {
  const { title, authors, affiliations, venue, links } = paperConfig;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Background ambient glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse-slow -z-10" style={{ animationDelay: "2s" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl text-center flex flex-col items-center"
      >
        {/* Venue Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 text-xs md:text-sm font-semibold tracking-wide mb-8 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{venue}</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight mb-8"
        >
          <span className="text-foreground">Lightweight 3D Object Detection via </span>
          <span className="text-gradient text-gradient-primary">Mamba-Based</span>
          <span className="text-foreground"> Knowledge Distillation</span>
        </motion.h1>

        {/* Authors List */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-6 max-w-3xl"
        >
          {authors.map((author, index) => (
            <div key={index} className="flex items-baseline text-base md:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors">
              {author.homepage ? (
                <a
                  href={author.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-indigo-500/30 hover:decoration-indigo-500 transition-all"
                >
                  {author.name}
                </a>
              ) : (
                <span>{author.name}</span>
              )}
              <sup className="text-xs text-indigo-500 ml-0.5 font-bold">{author.affiliation}</sup>
            </div>
          ))}
        </motion.div>

        {/* Affiliations */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs md:text-sm text-muted-foreground mb-10 max-w-3xl"
        >
          {affiliations.map((aff) => (
            <div key={aff.id} className="flex items-center gap-1">
              <span className="text-indigo-500 font-bold">[{aff.id}]</span>
              <span>{aff.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Resource Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {links.pdf && (
            <a
              href={links.pdf}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg shadow-black/10"
            >
              <FileText className="w-4 h-4" />
              <span>Read Paper</span>
            </a>
          )}
          {links.arxiv && (
            <a
              href={links.arxiv}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/60 hover:bg-muted text-foreground font-medium transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>arXiv</span>
            </a>
          )}
          {links.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/60 hover:bg-muted text-foreground font-medium transition-colors shadow-xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Code / Repo</span>
            </a>
          )}
          {links.video && (
            <a
              href={links.video}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/60 hover:bg-muted text-foreground font-medium transition-colors shadow-xs"
            >
              <YoutubeIcon className="w-4 h-4 text-red-500" />
              <span>Video Demo</span>
            </a>
          )}
        </motion.div>

        {/* Teaser Diagram */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl p-6 md:p-8 rounded-3xl border border-border/80 bg-card/40 glassmorphic shadow-2xl relative overflow-hidden group"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 py-4">

            {/* Input: Raw LiDAR */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Database className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-base font-bold text-foreground">Multi-branch Mamba Teacher</h3>
              <p className="text-xs text-muted-foreground text-center mt-1 max-w-[200px]">
                High-capacity backbone with Shallow + Deep Mamba branches. Trained on full nuScenes.
              </p>
              <div className="flex gap-1.5 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="w-8 h-2 rounded-full bg-purple-500/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <span className="mt-2 text-[10px] font-mono text-purple-400">68.2 mAP · 23.5M params</span>
            </div>

            {/* Distillation Arrow */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <GitPullRequest className="w-3.5 h-3.5" /> Box-Aware KD
              </span>
              <div className="w-12 h-12 md:w-24 md:h-12 flex items-center justify-center relative">
                <motion.div
                  animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-4 h-4 rounded-full bg-indigo-500 blur-xs absolute"
                />
                <ArrowRight className="w-6 h-6 text-indigo-500 rotate-90 md:rotate-0" />
              </div>
              <span className="text-[10px] text-muted-foreground/80 mt-1 max-w-[120px] text-center">
                Voxel-space latent state alignment
              </span>
            </div>

            {/* Student model */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Box className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-base font-bold text-foreground">Compact Student (student-h)</h3>
              <p className="text-xs text-muted-foreground text-center mt-1 max-w-[200px]">
                Pruned architecture with 4.11M params. Runs at 71ms on A4000, 350ms on Jetson Orin NX.
              </p>
              <div className="flex gap-1.5 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="w-8 h-2 rounded-full bg-indigo-500/30 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                ))}
              </div>
              <span className="mt-2 text-[10px] font-mono text-indigo-400">65.6 mAP · 4.11M params</span>
            </div>
          </div>

          <div className="border-t border-border/40 mt-6 pt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> nuScenes: 68.2 mAP (Teacher) → 65.6 mAP (student-h)</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Livox-Legged: 69.21 mAP — best among all baselines</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Deployed on legged robot (Jetson Orin NX) at ~3 Hz</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

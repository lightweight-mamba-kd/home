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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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

        {/* Teaser Video */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl rounded-3xl border border-border/80 bg-black/40 glassmorphic shadow-2xl overflow-hidden relative"
        >
          <video
            className="w-full h-auto object-cover max-h-[480px]"
            controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={`${basePath}/paper3d.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </motion.div>
    </section>
  );
}

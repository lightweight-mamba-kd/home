"use client";

import { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { paperConfig } from "../config/paper";

export default function BibTex() {
  const { bibtex } = paperConfig;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy citation:", err);
    }
  };

  return (
    <section id="bibtex" className="py-24 px-4 md:px-8 bg-muted/10 border-t border-border/40 relative overflow-hidden">
      <div className="w-full max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground flex items-center justify-center gap-2">
            <FileText className="w-6 h-6 text-indigo-500" />
            <span>How to Cite</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm md:text-base">
            If you find our work or code useful in your research, please cite our RA-L paper.
          </p>
          <div className="h-1 w-12 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* BibTeX Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-border bg-card/60 glassmorphic overflow-hidden shadow-lg p-6 font-mono text-xs md:text-sm text-foreground/90 group"
        >
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all flex items-center gap-1.5 shadow-xs"
            aria-label="Copy citation"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors uppercase tracking-wider">Copy</span>
              </>
            )}
          </button>

          {/* Citation Code Block */}
          <pre className="overflow-x-auto pr-16 max-w-full leading-relaxed select-all whitespace-pre-wrap md:whitespace-pre">
            <code>{bibtex}</code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}

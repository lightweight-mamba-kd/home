import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Abstract from "./components/Abstract";
import Method from "./components/Method";
import Architecture from "./components/Architecture";
import Results from "./components/Results";
import Benchmark from "./components/Benchmark";
import Deployment from "./components/Deployment";
import BibTex from "./components/BibTex";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Layout */}
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <Abstract />
        <Method />
        <Architecture />
        <Results />
        <Benchmark />
        <Deployment />
        <BibTex />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-muted/10 text-center text-xs text-muted-foreground">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Lightweight Mamba Project. All rights reserved.</p>
          <p>
            Website design inspired by{" "}
            <a
              href="https://openai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              OpenAI
            </a>
            ,{" "}
            <a
              href="https://apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Apple
            </a>
            , and CVPR template styles.
          </p>
        </div>
      </footer>
    </div>
  );
}

export interface Author {
  name: string;
  affiliation: string;
  email?: string;
  homepage?: string;
}

export interface Affiliation {
  id: string;
  name: string;
}

export interface PaperLinks {
  pdf?: string;
  arxiv?: string;
  code?: string;
  video?: string;
}

export interface PaperConfig {
  title: string;
  authors: Author[];
  affiliations: Affiliation[];
  venue: string;
  links: PaperLinks;
  abstract: string;
  contributions: string[];
  bibtex: string;
}

export const paperConfig: PaperConfig = {
  title: "Lightweight Mamba: Efficient State Space Models for Real-time Robotic Control via Cross-Architecture Knowledge Distillation",
  authors: [
    {
      name: "Quoc-Cuong Nguyen",
      affiliation: "1",
      email: "qcuong@robotics.edu",
      homepage: "https://github.com/qcuongning",
    },
    {
      name: "Jane Doe",
      affiliation: "1",
      email: "janedoe@robotics.edu",
    },
    {
      name: "John Smith",
      affiliation: "2",
      email: "johnsmith@research.org",
    },
  ],
  affiliations: [
    {
      id: "1",
      name: "Robotics and AI Lab, University of Science",
    },
    {
      id: "2",
      name: "AI Research Institute",
    },
  ],
  venue: "IEEE Robotics and Automation Letters (RA-L), 2026",
  links: {
    pdf: "#",
    arxiv: "https://arxiv.org",
    code: "https://github.com/qcuongning/lightweight-mamba-kd",
    video: "https://youtube.com",
  },
  abstract: "Recent state space models (SSMs), particularly Mamba, have emerged as a promising alternative to Transformers due to their linear complexity with respect to sequence length. However, deploying Mamba models on resource-constrained robotic edge devices remains challenging due to the computational overhead of high-dimensional state transitions. In this paper, we present Lightweight Mamba, a highly optimized architecture tailored for real-time robotic control. To bridge the performance gap between large-scale vision-language-action models and edge-deployable controllers, we propose a novel cross-architecture Knowledge Distillation (KD) framework. Our approach distills spatial-temporal representations from a heavy Transformer teacher into a lightweight Mamba student. We evaluate our method on both simulation benchmarks and a physical mobile manipulator. Lightweight Mamba achieves a 4.2x speedup on a Jetson Orin Nano, while maintaining 96.5% of the teacher's task success rate, demonstrating the viability of SSMs for high-frequency closed-loop robotic control.",
  contributions: [
    "We present Lightweight Mamba, the first hardware-efficient State Space Model optimized specifically for closed-loop robotic manipulation and navigation.",
    "We propose a novel Cross-Architecture Knowledge Distillation (CA-KD) framework that transfers spatial-temporal attention maps from Transformer teachers to SSM dynamics.",
    "We design hardware-aware optimization techniques for Mamba blocks, reducing activation memory by 45% and latency by 3.2x on edge platforms.",
    "We demonstrate extensive real-world evaluation on a mobile manipulator, achieving a 96.5% task success rate under dynamic obstacle environments.",
  ],
  bibtex: `@article{nguyen2026lightweight,
  title={Lightweight Mamba: Efficient State Space Models for Real-time Robotic Control via Cross-Architecture Knowledge Distillation},
  author={Nguyen, Quoc-Cuong and Doe, Jane and Smith, John},
  journal={IEEE Robotics and Automation Letters},
  volume={11},
  number={3},
  pages={1245--1252},
  year={2026},
  publisher={IEEE}
}`,
};

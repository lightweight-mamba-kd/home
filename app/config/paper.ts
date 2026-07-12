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
  title: "Lightweight 3D Object Detection via Mamba-Based Knowledge Distillation",
  authors: [
    {
      name: "Quoc Cuong Ninh",
      affiliation: "1",
      email: "cuongnq23@viettel.com.vn",
    },
    {
      name: "Huy Xuan Pham",
      affiliation: "3",
      email: "huy.pham@ece.au.dk",
    },
    {
      name: "Anh Tung Nguyen",
      affiliation: "2",
      email: "tungna@viettel.com.vn",
    },
    {
      name: "Dinh Hoan Trinh",
      affiliation: "1",
      email: "hoantd5@viettel.com.vn",
    },
  ],
  affiliations: [
    {
      id: "1",
      name: "Viettel AI, Viettel Group, Vietnam",
    },
    {
      id: "2",
      name: "VIST, Viettel Group, Vietnam",
    },
    {
      id: "3",
      name: "Artificial Intelligence in Robotics Laboratory (AiR Lab), Aarhus University, Denmark & Upteko ApS, Denmark",
    },
  ],
  venue: "IEEE Robotics and Automation Letters (RA-L), 2026",
  links: {
    pdf: "#",
    arxiv: "#",
    code: "https://github.com/qcuongning/lightweight-mamba-kd",
    video: "#",
  },
  abstract:
    "3D object detection using LiDAR sensors requires a balance between computational efficiency and accuracy for onboard perception in autonomous driving and robotic navigation. Many existing LiDAR-based detection methods employ complex architectures to extract features, integrating large amounts of contextual information to enhance accuracy. This often results in significant computational costs, leading to suboptimal performance on resource-constrained embedded devices. In this study, we propose a knowledge distillation framework that transfers object-level voxel representations from a strong teacher model to lightweight student models through selective voxel-space feature alignment. Taking advantage of the linear-time sequence model with selective state spaces (Mamba), we design a multi-branch Mamba teacher backbone and a box-aware feature transfer mechanism that aligns spatially corresponding voxel features between teacher and student networks through a Mamba-based projection module. Experimental results on both a public dataset and real-world data show that our approach significantly reduces computational load while maintaining competitive accuracy compared with state-of-the-art methods.",
  contributions: [
    "We propose a novel Multi-branch Mamba 3D Backbone as a high-capacity teacher model, integrating Shallow and Deep Mamba branches to enhance multi-scale feature representation from sparse LiDAR point clouds.",
    "We introduce a Mamba Adaptive Distillation strategy with a box-aware feature transfer mechanism that selectively aligns voxel features within ground-truth 3D bounding boxes, enabling effective knowledge transfer to compact student models.",
    "We reformulate the Cost-Performance Ratio (CPR) metric by incorporating inference latency, providing a more deployment-relevant measure of model efficiency on embedded robotic platforms.",
    "We collect and validate on a real-world proprietary dataset (Livox-Legged) using legged robots equipped with Livox Mid-360 LiDAR sensors, demonstrating practical deployment on an NVIDIA Jetson Orin NX at ~3 Hz.",
  ],
  bibtex: `@article{ninh2026lightweight,
  title={Lightweight 3D Object Detection via Mamba-Based Knowledge Distillation},
  author={Ninh, Quoc Cuong and Pham, Huy Xuan and Nguyen, Anh Tung and Trinh, Dinh Hoan},
  journal={IEEE Robotics and Automation Letters},
  volume={11},
  number={6},
  year={2026},
  publisher={IEEE}
}`,
};

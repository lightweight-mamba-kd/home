IEEE ROBOTICS AND AUTOMATION LETTERS, VOL. 11, NO. 6, JUNE 2026 

1 

## Lightweight 3D Object Detection via Mamba-Based Knowledge Distillation 

Quoc Cuong Ninh[1] , Huy Xuan Pham[3] , Anh Tung Nguyen[2] , Dinh Hoan Trinh[1] 

**==> picture [509 x 207] intentionally omitted <==**

**----- Start of picture text -----**<br>
Abstract —3D object detection using light detection and ranging Training Phase<br>(LiDAR)computationaldriving andsensorsroboticefficiencyrequiresnavigation.for aonboardbalanceManyperceptionbetweenexistinginaccuracyLiDAR-basedautonomousand Multi-branch Mamba 3D Backbone Backbone TeacherBEV  Detection Head  PredictionLabels True<br>detection methods employ complex architectures to extract fea- Raw LIDAR Point Cloud a Voxel Features<br>tures, integrating large amounts of contextual information to Distillation Phase<br>enhance accuracy. This often results in significant computa- Pretrained True<br>tional costs, leading to suboptimal performance on resource- Teacher Labels<br>constrained embedded devices. In this study, we propose a Student<br>knowledge distillation framework that transfers object-level voxelrepresentations from a strong teacher model to lightweight Raw LIDAR Point Cloud Voxel Features Pruned 3D Backbone Pruned BEV Backbone  Detection Pruned Head  Prediction<br>ac<br>student models through selective voxel-space feature alignment.<br>Taking advantage of the linear-time sequence model with selective Inference Phase<br>state spaces (Mamba), we design a multi-branch Mamba teacher<br>backbone and a box-aware feature transfer mechanism that Student<br>i.<br>aligns spatially corresponding voxel features between teacher and Raw LIDAR Point Cloud Voxel Features “= 2s Prediction<br>student networks through a Mamba-based projection module.<br>Experimental results on both a public dataset and real-world data Fig. 1. Overview of the proposed 3D object detection pipeline. The framework<br>show that our approach significantly reduces computational load consists of a multi-branch Mamba-based teacher model and a compact student<br>while maintaining competitive accuracy compared with state-of- model trained via knowledge distillation, including training, distillation,<br>the-art methods. inference phases.<br>**----- End of picture text -----**<br>


Fig. 1. Overview of the proposed 3D object detection pipeline. The framework consists of a multi-branch Mamba-based teacher model and a compact student model trained via knowledge distillation, including training, distillation, and inference phases. 

_**Index Terms**_ **—Deep Learning for Visual Perception; Computer Vision for Transportation; Intelligent Transportation Systems** 

resource-constrained autonomous vehicles and robots in realtime applications. 

## I. INTRODUCTION 

IDAR-BASED 3D object detection is a fundamental **L** task for many applications in autonomous driving and intelligent robotic systems. Unlike depth or stereo cameras, which capture photometric and dense geometric information but can be affected by background clutter and have limited fields of view (FoV), 3D LiDAR utilizes laser beams to reconstruct detailed spatial representations in a large field of view, with 3D points focused on prominent objects. This characteristic enhances the ability to capture the geometric properties of objects through sparse point clouds. In recent years, large-scale LiDAR-based 3D perception datasets, such as KITTI [1], NuScenes [2], and Waymo Open Dataset [3], have been proposed to facilitate emerging sophisticated models leveraging architectures such as transformers [4]. These models improve the accuracy of 3D object detection, but often at the cost of substantial computational complexity, requiring powerful GPU processing and posing challenges for 

> 1Quoc Cuong Ninh, and Dinh Hoan Trinh are with Viettel AI, Viettel Group, Vietnam. _{_ cuongnq23, hoantd5 _}_ @viettel.com.vn 

> 2Anh Tung Nguyen is with VIST, Viettel Group, Vietnam. tungna@viettel.com.vn 

> 3Huy Xuan Pham is with the Artificial Intelligence in Robotics Laboratory (AiR Lab), Department of Electrical and Computer Engineering, Aarhus University, 8000 Aarhus C, Denmark, and also with Upteko ApS, Denmark. huy.pham@ece.au.dk 

*This work was partially supported by the DFF-Research Project 1, with case number: 2035-00052B. 

To address computational complexity, model compression techniques have gained attention. Knowledge distillation (KD), which trains a lightweight student network under the guidance of a more complex teacher network, has proven effective in various vision tasks, including both 2D and 3D detection. KD enables the student to inherit classification and deep feature knowledge from the teacher, thus improving accuracy compared to standalone training. However, applying KD to 3D point cloud detection presents unique challenges, for instance, handling sparse data distributions and multidimensional outputs, such as bounding box coordinates and orientations. 

In the point cloud-based detection problem, capturing the relationships between 3D points is crucial for accurate object recognition. Recent approaches have treated spatial points as sequential data for feature aggregation. A line of work [5], [6] utilizes state-space models with a selective mechanism from Mamba [7], offering superior spatiotemporal feature extraction from sparse LiDAR data. Unlike other sequence models such as transformer architectures, which incur quadratic complexity, Mamba’s linear complexity makes it attractive for deployment on resource-constrained robotic platforms, where computational efficiency is a critical requirement. 

This study focuses on improving feature transfer between teacher and student models for LiDAR-based 3D object detection. In particular, we investigate how sparse voxel representations produced by Mamba-based detectors can be more effectively distilled through spatially aligned feature 

IEEE ROBOTICS AND AUTOMATION LETTERS, VOL. 11, NO. 6, JUNE 2026 

2 

matching and feature-space projection. To achieve a balance between computational efficiency and contextual awareness in 3D object detection from LiDAR data, we propose a novel architecture that incorporates multiple branches to enhance global context capture during feature extraction. To address the challenge in model complexity and latency reduction, a knowledge distillation strategy is proposed, in which lightweight student models are developed through selective pruning of the original architecture. The cost-performance ratio (CPR) metric [8] is adopted to quantify the trade-off between computational cost and model quality of the student models to find the optimal architectures. Furthermore, a box-aware distillation mechanism is introduced to transfer selective voxel features within object regions from teacher to student models through spatially corresponding voxel alignment and feature-space projection, improving detection accuracy without increasing inference cost. 

## II. RELATED WORK 

## _A. LiDAR-based 3D Object Detection_ 

The LiDAR-based 3D object detection task aims to localize and classify objects in 3D space by predicting bounding boxes from point cloud data. Early methods transformed point clouds into structured representations, such as voxel grids, to leverage convolutional neural networks (CNNs). For instance, SECOND [9] utilized sparse 3D convolutions to process voxelized point clouds, achieving robust performance. PointPillars [10] further reduced computational complexity by collapsing the height dimension into ”pillars,” thereby enabling faster inference suitable for real-time applications. Point-based methods, such as PointNet++ [11], directly process raw point clouds, exploiting order invariance and local point relationships; however, they often suffer from high computational costs for largescale scenes. Hybrid approaches like PV-RCNN [12] combine voxel-based feature extraction with point-based refinement, while CenterPoint [13] employs an anchor-free head for efficient object center localization, which is widely adopted in autonomous driving. More recently, sequence-aware methods like DSVT [14] leverage transformer architectures [4] to model spatial-temporal relationships, achieving high accuracy but incurring significant computational overhead due to quadratic complexity. These methods highlight the trade-off between accuracy and computational efficiency, motivating our work to develop a lightweight model that maintains high accuracy for real-time applications. 

## _B. Mamba-based Architectures in Vision and 3D Detection_ 

In recent years, state-space models (SSM) have garnered significant attention for their efficacy in sequence modeling. Several SSM-based architectures have been proposed [15]– [17] to handle sequential data across various tasks. The recently introduced Mamba architecture [7], which incorporates time-varying parameter selection into SSM, enhances training and inference efficiency, offering a compelling alternative to Transformers for long-sequence data. Mamba-based models have shown remarkable progress in 2D image processing, with 

architectures such as Vim [18] and VMamba [19] demonstrating robust performance. This trend has extended to 3D spatial processing, where Mamba exhibits promising results in handling discrete spatial point sequences. For instance, LION [5] employs Mamba-based recurrent processing on voxelized point clouds, achieving competitive accuracy compared to Transformer-based detectors such as DSVT [14]. Similarly, Voxel Mamba [6] leverages Mamba’s ability to compress sequential signals into latent vectors, improving spatiotemporal feature extraction from LiDAR data. However, Mamba-based models may struggle to capture global context as effectively as transformers due to their linear sequence processing nature. 

## _C. Knowledge Distillation in 3D Object Detection_ 

To transfer knowledge from a complex teacher model to a lightweight student model, KD methods have recently been used to reduce inference costs while preserving accuracy. In 3D object detection, KD must address the complexity of spatial data and diverse outputs, such as 3D bounding boxes and orientations. Notable approaches include itKD [20], which proposes an autoencoder-style knowledge distillation framework with channel-wise compression/decompression interchanges and a head relation-aware self-attention loss to transfer rich 3D point-cloud detection features from teacher to student, yielding efficient yet accurate lightweight models on datasets like Waymo and nuScenes. PointDistiller [21] employs a structured feature-based knowledge distillation method for 3D point cloud object detectors, leveraging dynamic graph convolutions on important local voxels with a reweighted loss strategy to produce compact models (e.g., 4× smaller PointPillars) that often surpass their teachers in both bird’s eye view (BEV) and 3D detection accuracy. SparseKD [8] conducts a systematic study of KD for LiDAR-based models, introducing Enhanced Logit KD and Teacher-guided Initialization, achieving significant mAP improvements on NuScenes. However, these methods primarily rely on CNN-based architectures to transfer features from complex teacher models to lightweight student models, struggle to capture long-range dependencies in sparse point clouds, incur high computational costs from operations like graph convolutions, and depend on handcrafted loss functions that may not generalize well. 

## III. METHODOLOGY 

## _A. Overview_ 

We propose a framework that leverages knowledge distillation to transfer knowledge from a high-capacity, multi-branch Mamba-based teacher model to lightweight student models, as illustrated in Fig. 1. Both the teacher and student models consist of a 3D backbone (3DB), a BEV backbone (BB), and a detection head (DH), maintaining a consistent pipeline for voxel-based 3D object detection. For the student models, we focus on pruning the teacher architecture to achieve efficient, lightweight designs. Additionally, we describe the knowledge distillation process, which transfers latent feature representations from the output of the teacher model’s Mamba blocks to the student model’s Mamba blocks, facilitating effective feature transfer between teacher and student models in Mamba-based 3D detectors. 

IEEE ROBOTICS AND AUTOMATION LETTERS, VOL. 11, NO. 6, JUNE 2026 

3 

**==> picture [504 x 149] intentionally omitted <==**

**----- Start of picture text -----**<br>
Multi-branch Block Multi-branch Block<br>Voxel features Shallow Mamba + … Shallow Mamba + X-axis Mamba  Y-axis  Mamba<br>Partition Ops Partition Ops<br>Deep Mamba Deep Mamba Mamba Layer<br>(b)<br>Teacher 3D Backbone<br>(a)<br>Conv3D MambaLayer Layer Norm Mamba Layer MergingVoxel  Mamba Layer MergingVoxel  Mamba Layer ExpandingVoxel  + Mamba Layer ExpandingVoxel  +<br>Shallow Mamba<br>Deep Mamba<br>(c)<br>(d)<br>**----- End of picture text -----**<br>


Fig. 2. Architecture of the multi-branch Mamba 3D backbone used as the teacher model. (a) Overall structure with stacked multi-branch blocks (MBBs). (b) Mamba layer design. (c) Shallow Mamba branch. (d) Deep Mamba branch. 

## _B. Teacher Architecture_ 

A novel Multi-branch Mamba 3D Backbone is proposed to enhance the representational capacity for LiDAR-based 3D perception (Fig. 2-a). The core component of the teacher architecture is a Mamba layer (Fig. 2-b). The Mamba layer models long-range dependencies among voxel features through structured sequential processing. Given a sparse voxel feature matrix, voxel features are first reorganized into ordered sequences using a 3D sparse window partition strategy [5]. Specifically, voxels are grouped and arranged along one spatial direction (X-axis partition), forming a structured sequence that preserves spatial locality within each group. This ordered sequence is then processed by a Mamba operator [7], which performs linear recurrent state updates to efficiently aggregate contextual information. To capture complementary spatial dependencies, the partitioning and Mamba interaction are repeated along an orthogonal direction (Y-axis partition). After sequential processing along both directions, the updated features are reshaped back to the original voxel layout. 

The backbone is composed of multiple multi-branch blocks (MBBs), each integrating two parallel branches: a Shallow Mamba branch and a Deep Mamba branch. The Shallow Mamba branch (Fig. 2-c) consists of a sequence of standard Mamba layers combined with Layer Normalization and a 3D convolutional layer to extract spatial 3D features. It focuses on learning low-level features, prioritizing computational efficiency. The Deep Mamba branch (Fig. 2-d) employs a more complex structure, incorporating voxel merging and voxel expanding techniques from LION [5], interleaved with Mamba layers. This process enables the model to learn higher-level features by reducing and expanding the voxel space, thereby capturing intricate spatial relationships. The voxel merging and voxel expanding operations are adopted directly from LION without architectural modification. The outputs from the shallow and deep branches are concatenated and fused through a residual connection before being processed by the BEV backbone. This backbone compresses these features to generate a 2D spatial representation, which is then fed into the detection head for final predictions. By jointly leveraging these complementary branches within each block, the architecture strengthens multi-scale feature representation from sparse 3D 

point clouds. 

## _C. Student Architecture_ 

Lightweight student models are developed by reducing the computational complexity of the teacher architecture. For each module of the teacher network (3DB, BB, DH), _width_ refers to the number of feature channels, while _depth_ denotes the number of Mamba layers or convolutional layers. The teacher model serves as the baseline configuration with _width_ = 1 and _depth_ = 1, and the student models are generated by scaling these dimensions with different ratios, as summarized in Table I. To isolate the effect of compressing the Mambabased 3D backbone, the depth of the BEV backbone is kept fixed across all student variants. Only the channel width of the BEV backbone is adjusted when necessary to maintain compatibility with the compressed 3D backbone. 

To select the most efficient student models, we apply a pruning strategy guided by the CPR concept [8]. The original CPR metric combines the ratio of activations and mAPH to evaluate the trade-off between model efficiency and detection performance. In this work, we introduce two modifications. First, we replace activations with measured inference latency, which more directly reflects deployment efficiency on embedded robotic platforms. Second, we use mAP as the detectionquality metric to maintain consistency with the evaluation metrics adopted throughout this paper. The revised CPR is defined as follows: 

**==> picture [237 x 25] intentionally omitted <==**

To compute CPR, we estimate model complexity metrics, including the number of parameters, activations, and inference latency measured on a single NVIDIA A4000 GPU. The CPR is computed for each student model to assess pruning efficiency, where a higher CPR indicates a more favorable trade-off between accuracy and computational cost. 

## _D. Mamba Adaptive Distillation_ 

A novel knowledge distillation framework is proposed for Mamba-based 3D object detection, combining head output 

IEEE ROBOTICS AND AUTOMATION LETTERS, VOL. 11, NO. 6, JUNE 2026 

4 

distillation with a specialized latent space KD loss targeting Mamba block outputs. This approach enhances knowledge transfer from a high-capacity teacher model to lightweight student models, utilizing Mamba’s sequential processing capabilities to capture contextual information in voxelized LiDAR point clouds. Drawing on soft target distillation [22], we apply KD to the detection head outputs of the teacher and a student model, which comprise classification, regression, and heatmap components. The head KD loss is formulated as: 

**==> picture [184 x 13] intentionally omitted <==**

where: 

**==> picture [206 x 13] intentionally omitted <==**

Here, ( **p** cls) _,_ ( **p** reg), and ( **p** hm) represent the classification, bounding box regression, and heatmap outputs, respectively, with superscripts (s) and (t) denoting the student and teacher models. Outputs are aligned by matching bounding boxes with the highest Intersection over Union (IoU). 

Conventional feature map distillation, as proposed by [23], transfers knowledge from intermediate layers using a loss such as: 

**==> picture [168 x 13] intentionally omitted <==**

where ( _FT_ ) and ( _FS_ ) are feature maps from the teacher model and a student model, respectively. While feature distillation can be applied to a variety of 3D detection architectures, directly transferring sparse voxel representations between teacher and student networks remains challenging due to differences in feature dimensionality, sparse spatial layouts, and backbone architectures. To address these challenges, we introduce a novel latent space KD loss that operates on the output of Mamba blocks, where sequential state representations converge. Unlike prior methods focusing on BEV features in 3D object detectors, our approach targets features extracted after Mamba-based voxel feature encoding, leveraging Mamba’s ability to capture long-range contextual dependencies in sparse 3D point clouds. To enhance efficiency, a selective feature transfer mechanism is proposed to distill only the features corresponding to voxel indices within ground-truth 3D bounding boxes, prioritizing semantically relevant object-related features and mitigating background noise, as demonstrated in Fig. 3. Teacher and student features are aligned by matching shared voxel indices for architectural consistency. 

Formally, let _FT ∈_ R _[N][×][C][T]_ and _FS ∈_ R _[N][×][C][S]_ denote the feature tensors output by the Mamba blocks of the teacher and student model, respectively, where _N_ is the total number of voxels and _CT , CS_ are the feature dimensions of the teacher and student model. Let _B_ = _{b_ 1 _, b_ 2 _, . . . , bM }_ represent the set of _M_ ground-truth 3D bounding boxes, and _Ibi ⊆{_ 1 _,_ 2 _, . . . , N }_ denote the set of voxel indices within the _i_ -th bounding box _bi_ . We define the common voxel indices across both models as _I_ common = _IT ∩IS_ , where _IT_ and _IS_ are the sets of valid voxel indices in the teacher and student feature tensors, respectively, within the union of all bounding boxes 

U _Mi_ =1 _[I][b] i_[.][The][knowledge][distillation][loss][is][then][computed] only over the features corresponding to these common indices: 

**==> picture [245 x 27] intentionally omitted <==**

where _FT_ [ _i,_ :] and _FS_ [ _i,_ :] denote the teacher and student feature vectors at voxel index _i_ , respectively. The function _ϕ_ ( _·_ ) represents a feature projection module that maps the student feature representation to the teacher feature space. In _·_ the proposed method, _ϕ_ ( ) is implemented using a lightweight Mamba encoder, although alternative projection modules are also investigated in the ablation study. The operator _∥· ∥_ 2[2] denotes the squared L2 distance. This loss ensures that the student model learns to mimic the teacher’s feature representations for voxels within the ground-truth bounding boxes, enhancing the transfer of object-specific contextual knowledge. 

By focusing on Mamba-extracted voxel features and selectively transferring knowledge based on ground-truth bounding box indices, our method addresses the challenges of sparse point cloud data and ensures robust generalization. This approach also reduces computational overhead by excluding irrelevant background features and aligns the feature spaces of the teacher and the student model, leading to improved accuracy and efficiency in 3D object detection tasks. 

We define a composite objective loss that integrates knowledge distillation from the teacher’s Mamba block output and detection head. The final objective loss is formulated as: 

**==> picture [195 x 13] intentionally omitted <==**

where weights ( _α_ ) and ( _β_ ) balance the contributions of the KD losses, typically set to 1.0 and 0.5, respectively, to prioritize ground truth supervision while ensuring effective knowledge transfer. This composite loss leverages Mamba’s sequential modeling and head output alignment to enhance the student’s performance on sparse 3D point clouds. 

**==> picture [226 x 117] intentionally omitted <==**

**----- Start of picture text -----**<br>
a Selected teacher features<br>x 6 1s Vo!<br>Loss Calculation<br>a) Teacher latent voxel features<br>| LMamba<br>Mamba Encoder<br>a la Gg _  7 ——<br>1 | 6 { a<br>Selected student features<br>Yo iva 7 eeos }<br>b)  Student latent voxel features<br>**----- End of picture text -----**<br>


Fig. 3. Box-aware latent feature distillation in 3D voxel space. The dashed 3D bounding box denotes the ground-truth box of object _i_ . For each object, voxel features within the box are spatially filtered from both teacher and student latent voxel feature maps (red and orange cubes). Spatially corresponding voxels (red cubes) are matched in a coordinate-consistent manner. The selected student features are further projected through a lightweight Mamba encoder to match the teacher dimensionality. The aligned object-aware representations _FT_ [ _i,_ :] and _FS_ [ _i,_ :] are then optimized using a distillation loss. 

5 

IEEE ROBOTICS AND AUTOMATION LETTERS, VOL. 11, NO. 6, JUNE 2026 

TABLE I 

MODEL COMPRESSION RESULTS WITH VARYING PRUNING RATIOS AND CORRESPONDING CPR METRICS. NOTE THAT 3DB, BB, AND DH STANDS FOR 3D BACKBONE, BEV BACKBONE, AND DETECTION HEAD 

|Detector|Width<br>3DB<br>BB<br>DH|Depth<br>3DB<br>BB|Efficiency<br>Params (M)<br>Activations (M)<br>Latency (ms)|mAP|CPR|
|---|---|---|---|---|---|
|Teacher<br>student-a<br>student-b<br>student-c<br>**student-d**<br>student-e<br>student-f<br>**student-g**<br>**student-h**|1.00<br>1.00<br>1.00<br>1.00<br>0.50<br>0.50<br>0.75<br>0.50<br>0.50<br>0.50<br>0.25<br>0.25<br>1.00<br>1.00<br>1.00<br>0.75<br>0.50<br>0.50<br>0.50<br>0.25<br>0.25<br>1.00<br>1.00<br>1.00<br>0.75<br>0.50<br>0.50|1.00<br>1.00<br>1.00<br>1.00<br>1.00<br>1.00<br>1.00<br>1.00<br>0.50<br>1.00<br>0.50<br>1.00<br>0.50<br>1.00<br>0.25<br>1.00<br>0.25<br>1.00|23.52<br>339.2<br>199<br>11.60<br>238.4<br>158<br>7.40<br>189.7<br>147<br>3.18<br>112.6<br>105<br>11.04<br>315.4<br>108<br>4.44<br>172.3<br>77<br>1.74<br>107.6<br>51<br>10.50<br>297.7<br>97<br>4.11<br>161.0<br>71|60.68<br>56.70<br>54.76<br>53.73<br>58.54<br>54.50<br>50.73<br>57.48<br>54.56|-<br>0.55<br>0.53<br>0.62<br>**0.72**<br>0.70<br>0.69<br>**0.73**<br>**0.72**|



TABLE II 

COMPARISON OF KNOWLEDGE DISTILLATION METHODS ON THE NUSCENES VALIDATION SET. ALL METHODS ARE APPLIED TO THE STUDENT-D VARIANT TRAINED WITH 20% OF THE NUSCENES TRAINING DATA 

|KD schemes|mATE _↓_|mASE _↓_|mAOE _↓_|mAVE _↓_|mAAE _↓_|mAP _↑_|NDS _↑_|
|---|---|---|---|---|---|---|---|
|Teacher model w/o KD<br>Student model w/o KD<br>Student model + FitNet [23]<br>Student model + Mimic [24]<br>Student model + FG [25]<br>Student model + SparseKD [8]<br>Student model + PointDistiller [21]<br>Student model + itKD [20]<br>**Student model + Ours**|0.289<br>0.296<br>0.280<br>0.283<br>0.281<br>0.282<br>0.289<br>0.281<br>**0.276**|0.258<br>0.260<br>0.258<br>0.259<br>0.258<br>0.259<br>0.263<br>0.259<br>**0.256**|0.307<br>0.321<br>0.290<br>0.290<br>0.287<br>**0.283**<br>0.308<br>0.295<br>0.286|0.307<br>0.327<br>0.295<br>0.304<br>0.296<br>0.284<br>0.306<br>0.297<br>**0.282**|0.195<br>0.198<br>0.194<br>0.194<br>0.193<br>0.190<br>0.195<br>0.193<br>**0.190**|60.68<br>58.54<br>60.93<br>60.27<br>61.00<br>61.07<br>59.84<br>60.35<br>**63.00**|66.79<br>65.25<br>67.30<br>66.83<br>67.36<br>67.54<br>66.32<br>66.92<br>**68.59**|



## IV. EXPERIMENTS 

## _A. Dataset and Metrics_ 

The proposed 3D object detection framework is evaluated on both a public benchmark and a real-world proprietary dataset. First, we conduct experiments on the LiDAR-only track of the nuScenes dataset [2], a large-scale autonomous driving benchmark comprising 1,000 scenes and approximately 28,000 annotated LiDAR keyframes across 10 object categories. We follow the official split, using 700 scenes for training and 150 scenes for validation. In addition, we collect a real-world proprietary dataset, termed Livox-Legged, using multiple Livox Mid-360 LiDAR sensors mounted on a legged robot (Fig. 4). The point clouds from all sensors are spatially calibrated and merged into a unified representation. The dataset contains 2,000 training scenes and 500 testing scenes, covering diverse 

**==> picture [181 x 17] intentionally omitted <==**

**----- Start of picture text -----**<br>
3D LiDAR  Point cloud data<br>Sensors<br>**----- End of picture text -----**<br>


outdoor navigation scenarios. It includes three object categories: pedestrians, cars, and motorcyclists. Across the training and testing splits, it contains 13,933 pedestrian instances, 3,971 car instances, and 1,617 motorcyclist instances. Each object is annotated with a 3D bounding box in the calibrated LiDAR coordinate system. 

For evaluation on the nuScenes validation set, we adopt the standard metrics, including mean average precision (mAP) and NuScenes Detection Score (NDS). We further report the five true-positive error metrics: average translation error (ATE), average scale error (ASE), average orientation error (AOE), average velocity error (AVE), and average attribute error (AAE), which measure localization, scale, orientation, velocity, and attribute prediction accuracy, respectively. For a fair comparison with state-of-the-art methods, latency is measured on an NVIDIA RTX A4000 GPU under identical inference settings. On the Livox-Legged dataset, we report mAP and inference latency to evaluate both detection accuracy and deployment efficiency. Following the nuScenes evaluation protocol, true-positive metrics are computed using centerdistance matching with a threshold of _d_ = 2 m for all classes. Latency is measured on an NVIDIA Jetson Orin NX platform to reflect real-world onboard robotic deployment. 

## _B. Experimental Settings_ 

Fig. 4. Legged robot equipped with 3D LiDAR sensors and representative point cloud samples from the collected Livox-Legged dataset. 

All models are implemented within the OpenPCDet framework [26] using PyTorch as the deep learning backend. For consistency, both teacher and student models are trained for 36 epochs with a batch size of 16. The teacher 3D backbone contains four multi-branch blocks. We adopt the same BEV backbone and detection head design as DSVT [14]. The point cloud range, voxelization grid size, data augmentation strate- 

IEEE ROBOTICS AND AUTOMATION LETTERS, VOL. 11, NO. 6, JUNE 2026 

6 

## TABLE III 

COMPARISON OF LIDAR-BASED 3D DETECTORS ON THE NUSCENES VALIDATION SET USING THE FULL TRAINING SET 

|Models|Params (M) _↓_|Latency (ms) _↓_|mAP (%) _↑_|
|---|---|---|---|
|CenterPoint_†_<br>VoxelNext_†_<br>Transfusion-L_†_<br>DSVT_∗_<br>Voxel Mamba_∗_<br>LION_∗_<br>Teacher Model (Ours)<br>Student-d (Ours)<br>Student-g (Ours)<br>Student-h (Ours)|5.98<br>19.05<br>8.38<br>8.20<br>22.35<br>16.52<br>23.52<br>11.04<br>10.50<br>**4.11**|**26**<br>46<br>67<br>84<br>230<br>185<br>199<br>108<br>97<br>71|59.2<br>60.5<br>64.6<br>66.4<br>67.5<br>68.0<br>**68.2**<br>67.9<br>67.1<br>65.6|



> _†_ Using OpenPCDet pretrained weights. _∗_ Reported in original papers. 

TABLE IV 

PER-CLASS AP (%) AND INFERENCE LATENCY ON THE LIVOX-LEGGED TEST SET. ALL MODELS ARE TRAINED FROM SCRATCH ON THE LIVOX-LEGGED DATASET. LATENCY IS MEASURED ON AN NVIDIA JETSON ORIN NX WITH BATCH SIZE 1 

|Method|Latency (ms)|Car (%)|Pedestrian (%)|Motorcyclist (%)|mAP (%)|
|---|---|---|---|---|---|
|CenterPoint [13]<br>DSVT [14]<br>LION [5]<br>**Student-h (Ours)**|**142**<br>425<br>928<br>350|92.55<br>91.46<br>94.24<br>**99.48**|36.60<br>35.84<br>33.48<br>**47.03**|32.14<br>44.78<br>35.02<br>**61.12**|53.76<br>57.42<br>54.25<br>**69.21**|



gies, optimizer, and learning rate schedule follow the configuration of DSVT [14]. Training is conducted on four NVIDIA L40 GPUs. All experiments are initialized with a fixed random seed to ensure reproducibility and fair comparison. For both nuScenes and Livox-Legged training, we employ the same point cloud preprocessing pipeline and training protocol. 

## _C. Results and Analysis_ 

**Effectiveness of the proposed KD method.** Table I shows the model compression results with varying pruning configurations. The teacher and student models are trained using 20% of the nuScenes training set to accelerate experimental iteration, and performance is evaluated on the nuScenes validation set using mAP. Reducing the depth of the 3DB module (i.e., the number of Mamba layers) leads to a substantial reduction in inference latency, while the total number of activations decreases only marginally. This observation suggests that, in Mamba-based architectures, latency is not strictly proportional to activation count and is strongly influenced by the computational characteristics of the Mamba operator. Based on this analysis, we select the _d_ , _g_ , and _h_ variants (highlighted in Table I) for subsequent knowledge distillation experiments. 

Table II compares the _student-d_ model trained with only 20% of the nuScenes training data against existing KD approaches. Our Mamba-based distillation framework achieves superior performance, with the student model outperforming other KD methods as well as the non-distilled teacher baseline. This result demonstrates that the proposed KD loss effectively transfers structural and contextual knowledge while compensating for model pruning. 

**Comparison with state-of-the-art methods.** We further compare our models with representative LiDAR-based 3D detectors, including CenterPoint [13], VoxelNext [27], Transfusion-L [28], DSVT [14], VoxelMamba [6], and 

LION [5] on the nuScenes validation set. All proposed models in Table III are trained using the full nuScenes training set. Baseline results marked with _[†]_ are obtained from publicly available OpenPCDet pretrained models, while results marked with _∗_ are reported in the corresponding original papers. Therefore, these baselines may use different training schedules, implementation details, or experimental protocols. Table III is intended to position the proposed method relative to representative state-of-the-art detectors rather than to serve as a fully controlled benchmark reproduction. Parameters and latency are measured under identical hardware settings for fair comparison. As shown in Table III, the proposed multi-branch Mamba teacher achieves competitive detection accuracy among the compared methods. Notably, _studentd_ retains near-teacher performance while reducing model size and inference time by approximately half. The most compact variant, _student-h_ , maintains competitive accuracy while improving efficiency, outperforming several established baselines despite substantially fewer parameters. These results validate the effectiveness of the proposed distillation strategy in producing compact yet high-performing detectors suitable for real-world deployment. 

**Evaluation on the Livox-Legged dataset.** To further assess generalization and embedded deployment capability, we evaluate our models alongside representative baselines on the Livox-Legged dataset. For a fair comparison, all models on the Livox-Legged dataset are trained from scratch for 36 epochs using the same voxel size, point-cloud range, optimizer, data augmentation strategy, batch size, and training schedule. The training configuration follows the official LION setting. We adopt the fade strategy [29] to improve performance in the last epoch. All reported results are obtained using the final checkpoint after training. 

As shown in Table IV, our method achieves strong detection performance while demonstrating practical deployment efficiency on an embedded platform, indicating its robustness across different LiDAR configurations and deployment environments. The table also reports the per-class AP on the LivoxLegged test set. Although the _student-h_ model achieves a nearsaturated Car AP, it also shows substantial improvements on the more challenging Pedestrian and Motorcyclist categories. These results suggest that the proposed knowledge distillation framework effectively preserves detection performance for large, easier objects while enhancing the representation of smaller and more challenging objects, leading to the highest overall mAP. 

Fig. 5 presents qualitative BEV visualizations, showing that the proposed _student-h_ model produces reasonable 3D bounding box predictions under real-world conditions. We also observe that smaller objects may exhibit larger orientation errors in the qualitative results. This is mainly because small objects contain fewer LiDAR points and provide weaker geometric cues for heading estimation. 

## **Real-world deployment.** 

To further evaluate onboard deployment, we deploy the trained _student-h_ model on a legged patrol robot in a pedestrian-aware navigation scenario. The model runs at approximately 3 Hz on an NVIDIA Jetson Orin NX platform, 

IEEE ROBOTICS AND AUTOMATION LETTERS, VOL. 11, NO. 6, JUNE 2026 

7 

Fig. 5. Qualitative BEV visualizations of detection results from the _student-h_ model on the Livox-Legged test set. Red boxes represent ground-truth annotations, while blue boxes denote predicted 3D bounding boxes 

consistent with the latency reported in Table IV. This inference rate is suitable for low-speed legged patrol scenarios but should not be interpreted as high-frequency real-time perception for fast-moving platforms. The detection output is integrated with the motion planning module, allowing the robot to stop when a pedestrian enters the robot’s path. An example of this behavior is shown in Fig. 6. The reported latency measures only model inference and does not include the full sensingto-actuation pipeline, such as sensor acquisition, data transfer, decision making, and low-level control. Further deployment optimization, such as TensorRT acceleration, kernel fusion, and hardware-specific inference optimization, may reduce the end-to-end latency in future work. 

**==> picture [30 x 15] intentionally omitted <==**

**----- Start of picture text -----**<br>
Car<br>Pedestrian<br>**----- End of picture text -----**<br>


Fig. 6. Real-world navigation scenario using the proposed _student-h_ model. The pedestrians (in dark teal bounding boxes) and cars (in red bounding boxes) are detected by the 3D perception module. The detection output is integrated into the motion planner, enabling the robot to safely stop when the pedestrian is detected in the forward direction. 

network to align the student feature dimension with the teacher feature space. Table V evaluates the proposed box-aware feature transfer strategy. Without knowledge distillation, the student model achieves 58.54 mAP. Applying feature distillation over all sparse voxel features improves performance to 59.50 mAP, indicating that teacher supervision is beneficial even without object-aware selection. 

Incorporating the proposed box-aware feature selection further improves performance to 63.00 mAP, demonstrating that selectively transferring object-region features is the primary contributor to the performance gain. Among the evaluated projection modules, the Mamba projector achieves the highest performance, while the MLP, Transformer, and 1 _×_ 1 convolution projectors also provide competitive improvements. These results suggest that feature-space alignment is important for effective knowledge transfer, whereas the choice of projection module provides a relatively modest additional improvement in our setting. 

Table VI highlights the contribution of different branches to the proposed multi-branch teacher architecture. When trained on the full nuScenes training set and evaluated on the validation set, the shallow-only and deep-only Mamba branches achieve similar performance, with 67.39 and 67.52 mAP, respectively. Combining the two branches yields the best performance, reaching 68.22 mAP and 72.13 NDS. These results suggest that integrating both shallow and deep branches can provide complementary feature representations, leading to a modest but consistent improvement over using either branch alone as the teacher for knowledge distillation. 

TABLE V 

COMPARISON OF DIFFERENT FEATURE-TRANSFER DESIGNS AND PROJECTION MODULES 

## _D. Ablation studies_ 

Ablation studies are conducted to understand the effect of different feature-transfer designs on the nuScenes validation set using the _student-d_ model trained with 20% of the training data. For a fair comparison, all projection modules are designed with comparable channel dimensions. The MLP projector consists of three fully connected layers. The Transformer and Mamba projectors employ a lightweight encoder structure composed of an input projection layer, a single Transformer/Mamba block, and an output projection layer. The convolutional projector uses a lightweight (1 _×_ 1) convolution 

|Method|Box Aware|Projector Type|mAP (%) _↑_|NDS (%) _↑_|
|---|---|---|---|---|
|Student w/o KD|-|-|58.54|65.25|
|Naive feature KD (all voxels)<br>Box-aware KD + 1_×_1 Conv|_×_<br>✓|Mamba Encoder<br>1_×_1 Conv|59.50<br>61.85|66.63<br>67.23|
|Box-aware KD + MLP<br>Box-aware KD + Transformer|✓<br>✓|MLP<br>Transformer|62.28<br>61.40|68.25<br>67.65|
|Ours|✓|Mamba Encoder|63.00|68.59|



## V. CONCLUSIONS 

In this work, we proposed a novel Mamba-based knowledge distillation framework for efficient LiDAR-based 3D object detection in robotic perception systems. A Multi-branch 

IEEE ROBOTICS AND AUTOMATION LETTERS, VOL. 11, NO. 6, JUNE 2026 

8 

## TABLE VI 

EFFECT OF SHALLOW AND DEEP MAMBA BRANCHES IN THE TEACHER MODEL 

|Teacher Confguration|mAP (%) _↑_|NDS (%) _↑_|
|---|---|---|
|Shallow Mamba only|67.39|71.78|
|Deep Mamba only|67.52|71.96|
|Shallow + Deep Mamba|68.22|72.13|



Mamba 3D Backbone is designed as a high-capacity teacher model to enhance multi-scale feature representation, which is followed by a Mamba adaptive distillation strategy that performs object-aware latent state alignment in voxel space for effective knowledge transfer to compact student models. To evaluate student models, we reformulated the CPR metric by incorporating inference latency. Extensive experiments on both the public nuScenes dataset and our real-world dataset demonstrate that the distilled student models achieve competitive detection performance while significantly reducing model size and inference time. In particular, the most efficient student variant preserves the teacher’s accuracy while operating at substantially lower latency, making it suitable for resource-constrained robotic platforms. These results suggest that Mamba-based 3D detectors can be compressed through box-aware voxel-space distillation, enabling efficient onboard 3D perception on resource-constrained robotic platforms. Future work will explore extensions to non-Mamba sparse voxel backbones and deployment-oriented acceleration. A limitation of the proposed box-aware distillation strategy is that it relies on ground-truth bounding boxes during supervised training. This should be addressed in future extensions. 

## REFERENCES 

- [1] A. Geiger, P. Lenz, C. Stiller, and R. Urtasun, “Vision meets robotics: The kitti dataset,” _The International Journal of Robotics Research_ , vol. 32, no. 11, pp. 1231–1237, 2013. 

- [2] H. Caesar, V. Bankiti, A. H. Lang, S. Vora, V. E. Liong, Q. Xu, A. Krishnan, Y. Pan, G. Baldan, and O. Beijbom, “nuScenes: A Multimodal Dataset for Autonomous Driving,” in _Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2020, pp. 11 621–11 631. 

- [3] P. Sun, H. Kretzschmar, X. Dotiwalla, A. Chouard, V. Patnaik, P. Tsui, J. Guo, Y. Zhou, Y. Chai, B. Caine, V. Vasudevan, W. Han, J. Ngiam, H. Zhao, A. Timofeev, S. Ettinger, M. Krivokon, A. Gao, A. Joshi, Y. Zhang, J. Shlens, Z. Chen, and D. Anguelov, “Scalability in Perception for Autonomous Driving: Waymo Open Dataset,” in _Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , June 2020. 

- [4] A. Vaswani, N. Shazeer, N. Parmar, J. Uszkoreit, L. Jones, A. N. Gomez, L. u. Kaiser, and I. Polosukhin, “Attention is All You Need,” in _Advances in Neural Information Processing Systems_ , vol. 30. Curran Associates, Inc., 2017. 

- [5] Z. Liu, J. Hou, X. Wang, X. Ye, J. Wang, H. Zhao, and X. Bai, “Lion: Linear group rnn for 3d object detection in point clouds,” _Advances in Neural Information Processing Systems_ , 2024. 

- [6] G. Zhang, L. Fan, C. HE, Z. Lei, Z. Zhang, and L. Zhang, “Voxel Mamba: Group-Free State Space Models for Point Cloud based 3D Object Detection,” in _The Thirty-eighth Annual Conference on Neural Information Processing Systems_ , 2024. 

- [7] A. Gu and T. Dao, “Mamba: Linear-time sequence modeling with selective state spaces,” in _First Conference on Language Modeling_ , 2024. 

   - [10] A. H. Lang, S. Vora, H. Caesar, L. Zhou, J. Yang, and O. Beijbom, “PointPillars: Fast Encoders for Object Detection from Point Clouds,” in _Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2019, pp. 12 697–12 705. 

   - [11] C. R. Qi, L. Yi, H. Su, and L. J. Guibas, “PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space,” in _Advances in Neural Information Processing Systems (NeurIPS)_ , 2017, pp. 5099–5108. 

   - [12] S. Shi, C. Guo, L. Jiang, Z. Wang, J. Shi, X. Wang, and H. Li, “Pvrcnn: Point-voxel feature set abstraction for 3d object detection,” in _2020 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2020, pp. 10 526–10 535. 

   - [13] T. Yin, X. Zhou, and P. Kr¨ahenb¨uhl, “Center-Based 3D Object Detection and Tracking,” in _Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2021, pp. 11 784–11 793. 

   - [14] H. Wang, C. Shi, S. Shi, M. Lei, S. Wang, D. He, B. Schiele, and L. Wang, “DSVT: Dynamic Sparse Voxel Transformer with Rotated Sets,” in _Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2023, pp. 13 520–13 529. 

   - [15] A. Gu, I. Johnson, K. Goel, K. Saab, T. Dao, A. Rudra, and C. Re, “Combining recurrent, convolutional, and continuous-time models with linear state space layers,” in _Advances in Neural Information Processing Systems (NeurIPS)_ , 2021. 

   - [16] A. Gupta, A. Gu, and J. Berant, “Diagonal state spaces are as effective as structured state spaces,” in _Advances in Neural Information Processing Systems (NeurIPS)_ , 2022. 

   - [17] A. Gu, K. Goel, A. Gupta, and C. Re, “On the parameterization and initialization of diagonal state space models,” in _Advances in Neural Information Processing Systems (NeurIPS)_ , 2022. 

   - [18] L. Zhu, B. Liao, Q. Zhang, X. Wang, W. Liu, and X. Wang, “Vision Mamba: Efficient Visual Representation Learning with Bidirectional State Space Model,” in _Proceedings of the 41st International Conference on Machine Learning_ , ser. Proceedings of Machine Learning Research, vol. 235. PMLR, 21–27 Jul 2024, pp. 62 429–62 442. 

   - [19] Y. Liu, Y. Tian, Y. Zhao, H. Yu, L. Xie, Y. Wang, Q. Ye, J. Jiao, and Y. Liu, “VMamba: Visual State Space Model,” in _Advances in Neural Information Processing Systems_ , vol. 37. Curran Associates, Inc., 2024, pp. 103 031–103 063. 

   - [20] H. Cho, J. Choi, G. Baek, and W. Hwang, “itKD: Interchange Transferbased Knowledge Distillation for 3D Object Detection,” in _2023 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2023, pp. 13 540–13 549. 

   - [21] L. Zhang, R. Dong, H.-S. Tai, and K. Ma, “PointDistiller: Structured Knowledge Distillation Towards Efficient and Compact 3D Detection ,” in _2023 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ . IEEE Computer Society, 2023, pp. 21 791–21 801. 

   - [22] G. E. Hinton, O. Vinyals, and J. Dean, “Distilling the knowledge in a neural network,” _ArXiv_ , 2015. 

   - [23] A. Romero, N. Ballas, S. E. Kahou, A. Chassang, C. Gatta, and Y. Bengio, “FitNets: Hints for Thin Deep Nets,” in _3rd International Conference on Learning Representations, ICLR_ , 2015. 

   - [24] Q. Li, S. Jin, and J. Yan, “Mimicking very efficient network for object detection,” in _2017 IEEE Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2017, pp. 7341–7349. 

   - [25] T. Wang, L. Yuan, X. Zhang, and J. Feng, “Distilling Object Detectors With Fine-Grained Feature Imitation,” in _2019 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2019, pp. 4928– 4937. 

   - [26] O. D. Team, “OpenPCDet: An Open-Source Toolbox for 3D Object Detection from Point Clouds,” 2020. 

   - [27] Y. Chen, J. Liu, X. Zhang, X. Qi, and J. Jia, “VoxelNeXt: Fully Sparse VoxelNet for 3D Object Detection and Tracking,” in _2023 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2023, pp. 21 674–21 683. 

   - [28] X. Bai, Z. Hu, X. Zhu, Q. Huang, Y. Chen, H. Fu, and C.-L. Tai, “TransFusion: Robust LiDAR-Camera Fusion for 3D Object Detection with Transformers,” in _2022 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , 2022, pp. 1080–1089. 

   - [29] C. Wang, C. Ma, M. Zhu, and X. Yang, “Pointaugmenting: Cross-modal augmentation for 3d object detection,” in _Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)_ , June 2021, pp. 11 794–11 803. 

- [8] J. Yang, S. Shi, R. Ding, Z. Wang, and X. Qi, “Towards efficient 3d object detection with knowledge distillation,” in _Advances in Neural Information Processing Systems_ , 2022. 

- [9] Y. Yan, Y. Mao, and B. Li, “SECOND: Sparsely Embedded Convolutional Detection,” _Sensors_ , vol. 18, no. 10, p. 3337, 2018. 


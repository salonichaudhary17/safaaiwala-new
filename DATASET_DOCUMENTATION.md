# AI/ML Dataset Documentation

**Project:** SafaaiWala  
**Prepared For:** Ministry of Mines (Problem Statement Requirement)  
**Date:** September 2026  

---

## 1. Executive Summary
This document outlines the datasets utilized to train, validate, and test the machine learning models embedded within the SafaaiWala ecosystem. To satisfy the requirements set forth by the Ministry of Mines, this documentation details the sourcing, quality control, size, and known limitations of the data underpinning our dual-engine architecture:
1. **Material Classification Vision Engine** (Image-based categorization)
2. **Valuation & Anomaly Detection Engine** (Tabular pricing and density verification)

---

## 2. Material Classification Dataset (Images)

**Purpose:** To train the on-device TensorFlow.js computer vision classifier for real-time, offline scrap identification by informal sector workers.

* **Source:** A proprietary hybrid dataset. It comprises custom photographs acquired directly from scrap yards in Delhi NCR, augmented with curated subsets from the open-source TrashNet dataset. Edge-case classifications and secondary validations were processed utilizing the Gemini API.
* **Size:** 2,500 total images spanning 8 core electronic and strategic scrap categories (e.g., CRT Monitors, Printed Circuit Boards (PCBs), Copper Wire, Lithium-ion Batteries, Electric Motors, etc.).
* **Quality & Preprocessing:** The dataset was manually cleaned and rigorously labeled. Crucially, it intentionally includes low-lighting, blurred, and low-resolution imagery. This deliberate degradation simulates the actual optical conditions of entry-level Android devices heavily utilized by kabadiwalas in basements and dimly lit scrap yards.
* **Limitations:** The vision model currently struggles to accurately classify heavily crushed mixed-plastics (where structural geometry is completely lost). Furthermore, distinguishing between high-grade (gold-rich) and low-grade PCBs remains challenging without high-fidelity lighting and macro-lens capabilities.

---

## 3. Valuation & Anomaly Detection Dataset (Prices & Weights)

**Purpose:** To train the algorithmic pricing engine and the Z-Score density anomaly detection system, preventing subsidy fraud and ensuring fair-market valuation.

* **Source:** Historical local scrap rates sourced from regional Delhi aggregators, cross-referenced with baseline LME (London Metal Exchange) commodity values. The transaction dataset consists of procedurally generated mock handover logs engineered specifically to train the anomaly detection heuristics.
* **Size:** 
  * 15,000 mock transaction rows detailing weight, material type, location, and timestamp.
  * 6 months of continuous daily price fluctuation metrics.
* **Quality & Preprocessing:** The data is structured in clean JSON and CSV formats. To robustly train the anomaly detection model, intentional statistical outliers were procedurally injected into the dataset (e.g., claiming a single CRT monitor weighs 50kg, or claiming impossible geo-velocity between two pickups).
* **Limitations:** Price predictions are inherently based on historical trending trajectories and may not instantaneously reflect sudden, geopolitical-driven metal market crashes. Additionally, the weight anomaly detection currently relies on static standard deviations (Z-scores) rather than dynamically evolving neural network boundaries.

---

## 4. Repository Structure & Transparency
To ensure full technical transparency for the auditing judges, sample subsets of the raw tabular data used for training the Anomaly Detection and Valuation engines have been included within this repository. 

**Directory Location:** \`/datasets\`
* \`anomaly_transaction_logs.csv\`: Contains mock transaction data including intentional volume-to-weight anomalies.
* \`valuation_historical_rates.csv\`: Contains historical pricing baselines.

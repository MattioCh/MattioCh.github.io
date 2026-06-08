---
title: "Asset Allocation Performance Forecasting by QRT"
date: 2026-02-01
start: "2026 Feb"
header:
  teaser: /images/portfolio/qrt.png
collection: portfolio
tags:
  - quant research
  - machine learning
  - cross-validation
  - python
---

Competition entry for the Qube Research & Technologies (QRT) prediction
challenge: given 20-day return and volume histories for an asset allocation,
predict whether it will outperform (long) or underperform (short) the next
trading session.

60+ logged experiments spanning gradient-boosted ensembles (LightGBM, XGBoost,
CatBoost), stacking and rank ensembles, probability calibration, autoencoders
and attention-based deep models, and techniques such as focal loss, GroupDRO,
and online learning.

527,073 training rows × 22 features; 31,870 test rows. Purged /
`TimeSeriesSplit` cross-validation to rule out cross-sectional leakage. Naive
shuffled K-fold inflated scores by ~0.2pp — the ~52.6% accuracy ceiling is
real.

Stack: Python, LightGBM/XGBoost/CatBoost, Optuna, PyTorch, Weights & Biases,
uv.

Private repository — available on request.

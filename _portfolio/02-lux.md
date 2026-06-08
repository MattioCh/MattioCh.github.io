---
title: "Lux: Auto-Feature Visualisation & Exploratory Analysis Tool"
date: 2024-06-01
start: "2024 Jun"
header:
  teaser: /images/portfolio/lux.png
collection: portfolio
tags:
  - data visualisation
  - exploratory analysis
  - plotly
  - dash
  - python
---

A two-generation auto-visualisation library. Given a DataFrame, it detects
feature types and generates a full exploratory dashboard — bar charts for
nominals, histograms with stats overlays for quantitative, time-series lines
for temporal — with target relationships surfaced automatically.

## luxv2: Vega-Altair Static Explorer

Two classes: `FeatureVisualizer` detects feature types (nominal, temporal,
quantitative, ID) by analysing cardinality, dtype, and value patterns, then
generates Vega-Altair charts. Handles large datasets through sampling. Exposes
inline Jupyter rendering and batch `save_all_visualizations()`. `FeatureAnalytics`
layers correlation detection, feature importance ranking, and a recommendation
engine on top. Target-focused mode identifies features most predictive of a
given target.

Three demo scripts and 15+ output directories of HTML visualisations from real
and synthetic datasets.

## luxv3: Plotly/Dash Interactive Rewrite

Replaced Vega-Altair with Plotly + Dash. `DashPlotter` (1,270 lines) —
auto-detects column types with manual config overrides, category filtering,
colour palette management. Runs as a Dash web app with dynamic callbacks.
`Plotter` generates all plots to a single combined HTML file. Used for
exploring horse-racing feature distributions.

Stack: Python, Vega-Altair, Plotly, Dash, pandas, uv.

Private repositories — available on request.

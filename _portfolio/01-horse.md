---
title: "Hong Kong Jockey Club Race-Outcome Predictor & Betting Backtester"
date: 2023-10-01
start: "2023 Oct"
header:
  teaser: /images/portfolio/horse.png
collection: portfolio
tags:
  - machine learning
  - systematic betting
  - data pipeline
  - python
---

A multi-year system for predicting Hong Kong Jockey Club race outcomes and
evaluating betting strategies. Built across 13+ repos, the system evolved from
ad-hoc notebooks into a typed, testable pipeline.

## Data Acquisition

Data was scraped from the Hong Kong Jockey Club website and weather services:

- HKJCData: a Selenium crawler for race cards, results, weather (1979–2021),
  and live odds. Included `race_info.py` (234 lines), `weather_info.py`, and
  `bet.py` (189 lines).
- horse_scrape: Python/Selenium scraper, packaged as a setuptools project.
- horse-scrape-2: TypeScript rewrite using Crawlee + PuppeteerCrawler,
  containerised with Docker. Crawlee's built-in retry and concurrency replaced
  hand-rolled Selenium logic for reliable daily ingestion.

## Modelling Iterations

- horse (v1): First end-to-end attempt. Introduced `TimeTraveller`, a class
  that walks history date-by-date, masking future information to prevent
  look-ahead leakage. Feature engineering and logistic regression in a single
  notebook.
- horse2: abandoned restart.
- horse3: Kedro 0.18.14 pipeline for reproducible data engineering with a DAG
  of nodes and catalogued datasets.
- horse4: Backtesting framework with `HorseBackTester`, `TimeTraveller` (197
  lines with column-level masking), `GameSettler` for settling simulated bets,
  and `HorseStrategyBase` with input/output contracts. Multiple concrete
  strategies: 14-horse ordered models, PyMC MLE baselines. Feature engineering
  in `features.py` (276 lines) with 14-horse normalisation and stacked
  datasets.
- horse5: Lux-based auto-visualisation with logistic regression diagnostics
  (ROC, confusion matrix, probability calibration).
- horse6: Modern rewrite using Polars 1.28+, Python 3.13+, strict mypy.
  `feature_engineering.py` (520 lines) with day-by-day time-series protection.
  Statsmodels logistic regression with pseudo-R² evaluation. Canonical schema
  defined in a `JC` enum.
- horse7: Narrow study on recent-win residuals — whether a horse's recent
  performance, residualised against field strength, predicts future finishes.
  Focused on 1200m races from 2010+.
- horsev8: Public iteration. [github.com/MattioCh/horsev8](https://github.com/MattioCh/horsev8){:target="_blank"}.
- horse-kedro: Second Kedro pipeline exploring cross-distance prediction.

## Tooling

- horse_viz: Perspective.js dashboard (FINOS Perspective 2.6.1) with
  drag-and-drop pivoting, WebAssembly worker, and D3FC charting.
- luxv2: auto-feature-recommendation system detecting nominal/temporal/
  quantitative/ID feature types with Vega-Altair visualisations.
- luxv3: Plotly/Dash evolution — `DashPlotter` (1,270 lines) with interactive
  browser-based exploration.

Stack (chronological): Python (pandas → Polars), Selenium, Kedro, TypeScript
(Crawlee/Puppeteer), scikit-learn, statsmodels, PyMC, Plotly/Dash,
Perspective.js, Docker, uv.

The latest iteration is public:
[github.com/MattioCh/horsev8](https://github.com/MattioCh/horsev8){:target="_blank"}.

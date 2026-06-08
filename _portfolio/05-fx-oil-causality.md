---
title: "Crude-Oil-Leads-Dollar Strategy, Live Paper-Traded on Interactive Brokers"
date: 2026-02-15
start: "2026 Feb"
header:
  teaser: /images/portfolio/fxoil.png
collection: portfolio
tags:
  - systematic trading
  - macro
  - interactive brokers
  - python
---

A systematic strategy testing a single hypothesis: do moves in WTI crude lead
moves in the US dollar, and is the effect tradable? When WTI's 10-day return
clears ±3%, the dollar tends to move the opposite way over the next 3 days.

The strategy uses confidence-weighted position sizing: rather than betting at
full size, position is scaled by a calibrated model's confidence.

The pipeline runs end-to-end: empirical measurement of the lead–lag
relationship, backtest validation, and live paper trading connected to
Interactive Brokers via `ib-async`. The IBKR integration is idempotent —
trading only the difference between target and held position — and appends
every run to an `ibkr_journal.csv`.

Stack: Python, ib-async, pandas, uv.

[github.com/MattioCh/MVPs — fx-oil-causality](https://github.com/MattioCh/MVPs/tree/main/fx-oil-causality){:target="_blank"}

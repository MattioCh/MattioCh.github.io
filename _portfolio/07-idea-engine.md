---
title: "Idea Terminal: A terminal tool to cross-pollinate research papers into novel questions"
date: 2026-05-15
start: "May 2026"
header:
  teaser: /images/portfolio/idea-engine.png
collection: portfolio
tags:
  - llm
  - research
  - python
---

A CLI tool that collides research papers from different fields and uses two
LLMs — one to synthesize, another to rank — to generate novel research
questions.

The hypothesis: genuinely new ideas often come from carrying a mechanism out
of one field into an open problem in another. The pipeline operationalizes
this in four stages:

1. Source (`papers.py`, 152 lines) — fetches recent papers from arXiv across
   20+ fields (machine-learning, probability, economics, biophysics,
   philosophy-of-physics…). Optional Semantic Scholar enrichment for citation
   weights.
2. Sample (`sample.py`, 62 lines) — cross-field strategy draws one paper per
   field; same-field stays within a discipline. Citation counts bias
   selection via log-weighted sampling.
3. Synthesize (`synthesize.py`, 56 lines) — one LLM identifies each paper's
   transferable core mechanism, finds bridges between them, and proposes
   grounded, falsifiable research questions with a why-novel justification.
4. Rank (`rank.py`, 46 lines) — a second LLM scores each question 1–10 on
   novelty, feasibility, impact, and cross-pollination, with a verdict
   justifying each score.

`pipeline.py` (90 lines) orchestrates the stages. Papers are cached locally as
JSON per arXiv category. LLM access via OpenRouter (OpenAI-compatible);
per-stage model overrides via environment variables. Reproducible runs via
`--seed`.

Stack: Python, Click, OpenRouter (OpenAI API), arXiv API, Semantic Scholar
API, feedparser, uv.

[github.com/MattioCh/MVPs — idea-engine](https://github.com/MattioCh/MVPs/tree/main/idea-engine){:target="_blank"}

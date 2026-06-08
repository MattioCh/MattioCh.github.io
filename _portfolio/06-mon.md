---
title: "mon: A Screen-Aware AI Mentor that Nudges You Toward Your Goals"
date: 2026-05-01
start: "May 2026"
header:
  teaser: /images/portfolio/mon.png
collection: portfolio
tags:
  - llm
  - multimodal
  - agents
  - python
---

An ambient agent that captures the screen every few minutes, runs a
vision-language model to understand what is happening, and decides whether to
stay silent or speak a short nudge via macOS `say`.

The pipeline: screen capture → Kimi VL (vision model, via OpenRouter)
describes the current activity → DeepSeek (reasoning model, via OpenRouter)
compares the activity against stated goals and decides to speak or stay silent.
Per-goal JSONL memory prevents repetition. An optional `--research` flag runs
web-backed academic lookups on whatever is on screen.

Stack: Python, OpenRouter (Kimi VL + DeepSeek), macOS `say`, uv.

[github.com/MattioCh/MVPs — mon](https://github.com/MattioCh/MVPs/tree/main/mon){:target="_blank"}

---
title: "Kalshi & Polymarket Research Platform"
date: 2026-01-01
start: "Jan 2026"
header:
  teaser: /images/portfolio/predmkt.png
collection: portfolio
tags:
  - data engineering
  - prediction markets
  - fastapi
  - duckdb
---

A data platform for studying prediction markets: ingest, store, and explore
Kalshi and Polymarket activity alongside a multi-source news feed. The project
pivoted mid-course from a trading platform to a pure data + research viewer,
with legacy strategy code quarantined under `legacy/`.

## Data Scale

| Bucket | Rows | Files |
|---|---|---|
| Kalshi markets | 32.8M | 3,281 |
| Kalshi trades | 72.1M | 7,215 |
| Polymarket markets | 451K | 47 |
| News headlines | 2,205 | 11 |

~105M rows total, ~36 GiB compressed. Kalshi grew from 61 avg outstanding
markets in 2021 to 329K peak in Nov 2025, with $18.26B total volume across
8.1M+ unique markets.

## Ingestion

Modular indexers extending an `Indexer` abstract base class with
auto-discovery and an interactive CLI menu:

- Kalshi: RSA-authenticated HTTP client (`httpx`) with retry/backoff
  (`tenacity`). Market snapshots and trade history from the Kalshi Trade API
  v2. Pydantic models for `Market` and `Trade` with typed deserialisation.
- Polymarket: REST client for markets, plus a `data_trades.py` indexer
  ingesting `OrderFilled` events from Polygon. Also tracks OHLCV candles.
- News: 7 source-specific indexers (Google News, RSS, FOMC calendar, economic
  calendar, sports, crypto, weather).

16 Airflow DAGs (ingestion + health check), containerised via Docker Compose
(Airflow webserver + scheduler + PostgreSQL).

## Storage

Columnar Parquet on disk, partitioned by source and date.
`ParquetStorage` — chunked storage (10K rows per chunk) with DuckDB-based
deduplication. `version_manager.py` and `incremental_updater.py` for schema
evolution. `validator.py` for schema and null-rate checks.

## Dashboard

FastAPI server (338 lines) backed by an in-memory DuckDB connection (6 GB,
4 threads). Eight API endpoints: overview stats, searchable market lists
with 5 sort modes, per-market detail with time-series and trade history,
recent news with category/sentiment, on-demand news pull, a read-only SQL
endpoint (capped at 1,000 rows), and cache refresh.

Single-page JS frontend with five tabs: Overview, Kalshi, Polymarket,
News, SQL.

## News-to-Market Linking

`MarketNewsService` (197 lines) with a `before` parameter for no-lookahead
backtesting compliance. `MarketNewsLinker` extracts keywords from market
titles and maps them to Kalshi's event-ticker hierarchy.

## The Pivot

The project began as a trading platform (live paper trading, backtesting,
signal generation, order execution, risk management, LLM-news strategy).
In May 2026, all trading code was quarantined to `legacy/` via `git mv`
(history preserved). What remained was ingestion, the news service, and
a new data-exploration dashboard.

The legacy code includes: 8 strategies (7 quarantined, 1 kept —
`MeanReversionStrategy` at +30% ROI baseline), a daily walk-forward
backtesting engine, a metrics library (`metrics.py`, 382 lines: Sharpe,
Sortino, max drawdown, Calmar, profit factor), and a 1,247-line
`CONCLUSIONS.md` covering maker vs taker edge, YES-side optimism bias,
category-level strategy attribution, and mean-reversion fade strategies
projecting 30–50% annualised ROI.

Stack: Python, FastAPI, DuckDB, Polars/PyArrow, Airflow, Docker, httpx,
tenacity, pydantic, uv.

Private repository — available on request.

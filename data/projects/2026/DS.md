### Harness Engineering Intern

- Embedded with internal stakeholders as an engineer, owning problem discovery through deployment to enhance efficiency.
- Revived an internal IR transcription-and-summarization tool that staff had abandoned.
    - Generic STT mangled IR-specific terms (e.g., "L&C Bio" → "LNC5"), so RAs had to hand-fix every transcript.
    - Rebuilt it by splitting transcripts into 1-2 sentence editable segments and extracting keywords to auto-correct transcripts.
    - Restored active adoption and cut per-recording turnaround from 1 hour to 15 minutes.
- Deployed the Hermes Agent as a natural-language stock-research assistant.
    - Turned a vague executive request into concrete requirements through a 1:1, then scoped and shipped it end-to-end.
    - Built 5+ custom skills: real-time stock lookups, natural-language stock screening, brokerage-style report generation, and Q&A over live disclosures and reports.
- Implemented a realtime market-data pipeline to enable both preset-template and natural-language stock screening.
    - Ingested minute-bar data into DuckDB, chosen for columnar compression and fast analytical queries.
    - Served reads from Parquet replicas swapped in atomically, keeping intraday screening fast and consistent while new data streams in.
- Consolidated fragmented internal automation tools into a single portal, adopted org-wide beyond its original team.
    - Cut total code 30% and a recurring 3-hour manual report to 3–5 minutes.
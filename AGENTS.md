# Agent Guide — Tim's Open Notebook fork

This is a fork of `lfnovo/open-notebook` (MIT), self-hosted on the Hetzner/CommsOS server.

## Where things are
- **Frontend (Next.js + TypeScript):** `frontend/`
- **Backend (FastAPI):** `api/` and core lib `open_notebook/`
- **Single-container build:** `Dockerfile.single` (frontend + backend + SurrealDB via supervisor)
- **AI prompt templates:** `prompts/`

## Live deployment (on this server)
- Compose dir: `~/open-notebook/` (data volumes `notebook_data/`, `surreal_data/` live here — DO NOT delete)
- Compose builds from `~/open-notebook/src` (this repo) using `Dockerfile.single`
- Reachable on the Tailscale interface only: UI `http://100.70.132.26:8502`, API `http://100.70.132.26:5055`

## To ship a change
1. Edit code here (e.g. `frontend/...`), commit, push.
2. Run the deploy script on the server: `~/open-notebook/deploy.sh`
   - It does `git pull` in `src/`, rebuilds the image, restarts the container, and health-checks.
   - Add `--no-pull` if you already edited files directly on the server.

Model credentials (OpenAI/Anthropic/ElevenLabs/Gemini/OpenRouter) are stored encrypted in SurrealDB, not in this repo.

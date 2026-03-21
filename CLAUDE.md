# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational course example project for AI-assisted development. Course: [deanlin.net/course/cake](https://deanlin.net/course/cake). The main application is a **Vehicle Management System** inside `vehicle-management-system/`.

## Build & Development Commands

All commands run from `vehicle-management-system/`:

```bash
cd vehicle-management-system
npm install        # Install dependencies
npm run dev        # Start Vite dev server with HMR
npm run build      # TypeScript type-check + Vite production build
npm run lint       # ESLint across all TS/TSX files
npm run preview    # Preview production build locally
```

No test runner is currently configured.

## Tech Stack

- **React 19** + **TypeScript 5.9** (strict mode) + **Vite 8**
- **Tailwind CSS 4** via Vite plugin
- **React Router 7** for client-side routing
- **Recharts** for data visualization
- **MSW (Mock Service Worker)** for API mocking in development (no real backend)

## Architecture

### Application Structure (`vehicle-management-system/src/`)

- **`contexts/AuthContext.tsx`** — Global auth state via React Context. Stores user in localStorage (`auth_user` key). Roles: `admin` | `user`.
- **`components/ProtectedRoute.tsx`** — Redirects unauthenticated users to login.
- **`components/AdminRoute.tsx`** — Restricts access to admin role only.
- **`components/Layout.tsx`** — Shared layout wrapper.
- **`pages/`** — Route-level components (Login, Dashboard, Vehicles, Employees).
- **`mocks/`** — MSW setup: `browser.ts` (worker init), `handlers.ts` (request handlers), `data.ts` (mock data). All API calls are intercepted by MSW — there is no real backend.
- **`App.tsx`** — Route definitions with auth/admin guards.

### Agent Skills (`.agents/skills/` and `.claude/skills/`)

Built-in prompt-based skills that extend Claude Code capabilities:

| Skill | Purpose |
|-------|---------|
| `git-smart-commit` | Auto-split changes into grouped conventional commits |
| `git-pr-description` | Generate PR title/description from branch diff |
| `gen-test-cases` | Generate test cases and test code from source |
| `ui-ux-pro-max` | UI/UX design system with styles, palettes, typography |

### OpenSpec (`openspec/`)

Specification-driven development workflow system. Config in `openspec/config.yaml`. Used for structured change management with artifacts.

## Conventions

- **Commit messages**: Conventional commits in **Traditional Chinese** with Chinese scope names.
  Format: `<type>(<scope>): <中文描述>`
  Example: `feat(skill): 新增 ui-ux-pro-max UI/UX 設計智能 skill`
- **TypeScript strict mode** is enforced: no unused locals, no unused parameters, no fallthrough cases.
- **No real backend** — all API interactions use MSW mock handlers during development.

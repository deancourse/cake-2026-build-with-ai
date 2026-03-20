# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI course (CAKE 2026) example project featuring a **vehicle management system** — a React SPA with mock API. Course materials: https://deanlin.net/course/cake

## Development Commands

All commands run from the `vehicle-management/` directory:

```bash
cd vehicle-management
npm install        # install dependencies
npm run dev        # start dev server (Vite)
npm run build      # type-check (tsc) + production build
npm run lint       # ESLint
npm run preview    # preview production build
```

No test framework is currently configured.

## Architecture

**Monorepo structure:** The app lives in `vehicle-management/` (React 19 + TypeScript + Vite 8).

**No real backend** — all API calls are intercepted by **MSW (Mock Service Worker)**. The mock layer boots in `src/main.tsx` before React renders. Mock data and handlers live in `src/mocks/` (`data.ts` for seed data, `handlers.ts` for route handlers). API routes follow `/api/*` convention.

**Auth:** Context-based auth via `src/contexts/AuthContext.tsx`. Two roles: `admin` and `user`. `ProtectedRoute` guards authenticated pages; `AdminRoute` further restricts to admin role.

**Routing:** React Router v7 with layout nesting. Pages: Login, Dashboard, Vehicles, Employees (admin-only).

**Key libraries:** react-router-dom, recharts (charts on dashboard), msw.

## Agent Skills

Custom skills in `.claude/skills/` extend AI capabilities: `git-smart-commit`, `git-pr-description`, `gen-test-cases`, `ui-ux-pro-max`. OpenSpec workflow is also configured under `openspec/` for spec-driven changes.

## Conventions

- UI text is in **Traditional Chinese (繁體中文)**
- Conventional commits (supported by `git-smart-commit` skill)

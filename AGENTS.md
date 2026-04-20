# AGENTS.md

This file provides guidance for AI coding agents working in this repository.

## Repository Overview

- This is a monorepo of example projects for the Rstack ecosystem: Rspack, Rsbuild, Rspress, Rsdoctor, Rslib, and Rstest.
- Package manager: `pnpm` (see `package.json#packageManager`).
- Workspace layout: `pnpm-workspace.yaml` includes `rspack/**`, `rsbuild/**`, `rslib/**`, `rspress/**`, `rsdoctor/**`, `rstest/**`.

## Core Purpose of Examples

**The primary goal of each example is to demonstrate "how a specific API achieves a specific effect through specific configuration".**

When creating or modifying examples:
- **Keep it minimal**: Only include code necessary to demonstrate the target feature/API
- **Avoid over-engineering**: Don't add complex business logic that distracts from the core demonstration
- **Focus on the tool, not the ecosystem**: For example, in a test runner example, focus on the test runner's APIs (mocking, assertions, configuration), not on complex DOM manipulation or third-party library integrations
- **One concept per example**: Each example should ideally demonstrate one main feature or configuration pattern
- **Clarity over completeness**: A simple, clear example is better than a comprehensive but confusing one

Example of good vs bad:
```
# Good: Demonstrates rstest's mocking API
- Simple mock function usage
- Clear before/after assertions
- Minimal setup code

# Bad: Demonstrates rstest's mocking API
- Complex React component with many interactions
- Detailed DOM testing with @testing-library
- Business logic mixed with test assertions
```

## Quick Start (Local)

Prerequisites:
- Node.js per `.nvmrc`
- `corepack` enabled

Common commands:
- Install deps: `corepack enable && pnpm i`
- Build everything: `pnpm run build`
- Build a group:
  - Rspack examples: `pnpm run build:rspack`
  - Rsbuild examples: `pnpm run build:rsbuild`
  - Rspress examples: `pnpm run build:rspress`
  - Rsdoctor examples: `pnpm run build:rsdoctor`
  - Rslib examples: `pnpm run build:rslib`
- Test Rspack examples: `pnpm run test:rspack`

Working in a single example:
- `cd rspack/basic` (or any other example dir)
- `pnpm i` (workspace install is preferred at repo root)
- `pnpm run dev` / `pnpm run build` / `pnpm run test` (depends on the example)

## Where Things Live

Top-level directories:
- `rspack/`: Rspack examples (often package name prefix `example-*`).
- `rsbuild/`: Rsbuild examples (often package name prefix `rsbuild-*`).
- `rspress/`: Rspress examples (often package name prefix `rspress-*`).
- `rsdoctor/`: Rsdoctor examples (often package name prefix `rsdoctor-*`).
- `rslib/`: Rslib examples (often package name prefix `rslib-*`).

## Coding Conventions

- Formatting and linting: `Biome` is used (see `biome.json`).
  - Default JS/TS quote style is single quotes.
  - Line width is 100.
- Prefer minimal, example-focused changes. This repo is a collection of runnable examples; avoid refactors that reduce clarity.
- Keep UI strings and code comments in English unless the surrounding file is already predominantly another language.

## Running/Changing Examples

- Examples are expected to be runnable independently.
- When changing build tooling or config:
  - Ensure the example still runs via its `dev` script (if present).
  - Ensure `build` works at least for the changed example.

## Dependencies & Workspace Notes

- Prefer adding dependencies at the example package level, not in the repo root, unless the dependency is shared.
- Use `pnpm --filter` to scope commands to a single package or group.
  - Example: `pnpm --filter "example-basic" dev`

## Agent Workflow Expectations

When making changes:
- Identify the single example/package impacted.
- Keep changes scoped to that example unless explicitly requested.
- Update configuration consistently with the conventions in that subtree.
- Run the narrowest possible validation command (e.g. `pnpm --filter <pkg> build`) before running broad builds.

## Common Pitfalls

- Avoid editing generated output directories: `dist`, `dist-*`, `doc_build`.
- Many examples are similar but not identical; do not assume scripts/config match across directories.
- Some examples may pin specific versions or require particular Node constraints; check the example `package.json`.

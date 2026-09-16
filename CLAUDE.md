# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Empty scaffold — a personal portfolio site, not yet started. No framework, package manager, or build tooling chosen yet. Update this file with real commands and architecture as soon as those exist; don't fill in placeholder tech-stack details before then.

## Subagents (`.claude/agents/`)

`orchestrator` routes non-trivial work and always sandwiches it between `senior-dev` (plan + trim) and `reviewer` (verdict), with `token-manager` as a lean-usage pass. There are no domain specialists yet — add one per area (e.g. design, content) once the site has real structure to specialize around.

# Specification Quality Checklist: Megaminx の図を自作ライブラリで描く

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-11-24
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

- ライブラリ名(megaminx-image、sr-puzzlegen、sr-visualizer)は、ライブラリの置き換えそのものがこの機能の目的であり、運営者が入力で指定した制約のため、FR-001、FR-010 と Assumptions に記載した。描き方の詳細(部品の作り、データの型、本文の比較の仕組みの直し方)は Plan で決める。
- 運営者との事前の相談(2026-11-24)で決めた事項:図を HTML に含める、4 ページを一度に入れ替える、配色はライブラリの既定(CP・EP は既定の配色、CO・EO は OLL 用の既定の配色)、矢印は消す、大きさは 100px。そのため [NEEDS CLARIFICATION] は無い。
- 図の数(CP 15、CO 16、EP 12、EO 3、計 46)と、配色 27 個・マスク 19 個の内訳は、`app/data/megaminx/` の `diagrams` から数えた。
- 「現行の内容から変更した箇所」の見出しは、`scripts/verify-parity.mjs` が読む見出し(「現行の表記から直した箇所」「現行の内容から更新した箇所」)と別にしている。本文の文字列の修正ではなく、図の変更の記録のため。本文の比較での扱いは Plan で決める(FR-011)。

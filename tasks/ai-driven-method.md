# Método AI-Driven Development no Sobre e nos casos

**Slug:** `ai-driven-method`
**Branch:** `feat/ai-driven-method`
**Seção ou área:** Sobre, Projetos e página de caso
**Status:** Done (PR #9 mergeado em 2026-11-06)
**Gate S2:** Livre (texto e desenho aprovados pelo dono em 2026-11-06)

---

## Stage 1 — Scope Analysis

- **Documentos:** PRD D76 e D77; `docs/fdd/sobre.md`; `docs/fdd/caso.md`; `docs/fdd/projetos.md`.
- **Objetivo:** o visitante vê que Lucas trabalha com AI-Driven Development, como método, com destaque no Sobre e em cada caso.
- **Escopo:** bloco de método no Sobre, com título em destaque, três passos e o repositório como prova; seção "Como foi feito" na página de caso, com o texto da landing; nova "Minha parte" do DraftCS no card.
- **Fora:** os casos do DraftCS e do Crewz, que vêm em entregas próprias; o texto da abertura.
- **Critérios de aceite:** os dos FDDs do Sobre e da página de caso.

## Stage 4 — Execution Planning

1. [x] PRD D76 e D77; FDDs do Sobre, da página de caso e de Projetos.
2. [x] Mensagens `About`, `CaseStudy.method`, `CaseStudy.landing.method` e `Projects.draftcs.part`, em pt-BR e inglês.
3. [x] `sobre.tsx`: bloco de método.
4. [x] `case-study.tsx`: seção "Como foi feito".

## Stage 7 — Tests

- `lint`, `typecheck` e `build` verdes.
- Sobre no computador (escuro) e em 390 px (claro em `/`, escuro em `/en`): título do método com "AI-Driven" sem quebrar no hífen, três passos e link, sem transbordo.
- Card do DraftCS em `/en` com a nova "Minha parte".
- Caso da landing no computador: "Como foi feito" entre "As decisões" e "O que ficou pelo caminho".

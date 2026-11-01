---
name: tot
description: "Aplica Tree of Thought ao problema passado como argumento, seguindo o protocolo da skill tot-explorer (3 caminhos mutuamente exclusivos, tabela com notas de correção, raio de impacto, custo de manutenção e alinhamento com o projeto, e convergência com vencedor). Use quando o usuário invocar /tot, pedir para comparar alternativas, ou houver 2 ou mais abordagens plausíveis e excludentes."
argument-hint: "[problema a explorar]"
---
Aplique Tree of Thought ao problema abaixo, seguindo o protocolo da skill `tot-explorer`:

**Fase 1 — Divergência:** 3 caminhos mutuamente exclusivos.
**Fase 2 — Avaliação:** tabela com notas de 1 a 5 em correção, raio de impacto, custo de manutenção e alinhamento com o projeto. Somar.
**Fase 3 — Convergência:** vencedor com justificativa, e o que foi descartado e por quê.

Restrições fixas do portfolio: Lucas sozinho, sem prazo fixo, Next.js 16, Tailwind 4, Motion e `next-intl`, sem banco, sem cookie não essencial, marca fechada em `docs/design/DESIGN.md`.

**Problema:** $ARGUMENTS

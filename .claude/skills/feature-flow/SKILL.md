---
name: feature-flow
description: "Orquestrador ponta a ponta de uma entrega do portfolio, da ideia ao PR, encadeando refine → (tot) → plan → exec → verificação → walkthrough → pr, com gates humanos obrigatórios. Use quando o usuário disser /feature-flow, roda o fluxo completo, toca essa feature ponta a ponta, pipeline completo, ou descrever uma feature ou seção nova que deva passar por plano, execução e auditoria. Não usar para ajuste trivial (até 3 arquivos)."
---

# Feature Flow — da ideia ao PR, com gates

Roteiro que o agente principal segue, invocando os comandos do projeto na ordem e **parando nos gates humanos**. Duas regras inquebráveis:

1. **Nunca pular um gate humano.** Esperar o OK explícito.
2. **Sem merge dentro do fluxo.** O fluxo termina no PR. O merge é de Lucas, ou com o ok de Lucas no `/pr`.

## Fluxo

| # | Comando | O que faz | Gate |
|---|---|---|---|
| 0 | `/refine` | Pedido cru ou ambíguo? Reescreve e coleta lacunas | 🚦 confirma o escopo |
| 1 | `/tot` | Só se há 2+ abordagens excludentes | 🚦 escolhe a abordagem |
| 2 | `/plan` | Branch `tipo/{slug}`, `tasks/{slug}.md` Stages 1 a 5 | 🚦 **Gate S2** |
| 3 | `/exec` | Implementa na ordem do plano, um commit por item | — |
| 4 | verificação | `npm run lint && npm run typecheck && npm run build`; fluxo do FDD no navegador em 390 px e no computador, em `/` e `/en` | — |
| 4b | validação visual | Só se tocou interface: página aberta pelo MCP do Chrome DevTools, checklist do `/ui-ux-pro-max` | CRÍTICO → volta ao 3 |
| 5 | `/walkthrough` | Auditoria | BLOCKED → volta ao 3 |
| 6 | `/pr` | PR para a base (`v2` até o lançamento, `main` depois) com o template | 🚦 **ENTREGA**: só após "pode abrir o PR" |
| 7 | depois | Lucas faz o merge sem squash, ou autoriza no `/pr`; atualizar `docs/ROADMAP.md` | — |

## Atalhos

- Pedido claro e completo: pular o 0.
- Sem trade-off: pular o 1.
- Trivial: `tasks/{slug}.md` mínimo (Stages 1 e 4) → `/exec` → verificação → `/pr`.
- Ajuste pequeno (texto, documentação ou correção que não muda layout, comportamento nem dependência): `/commit` direto na base, fora deste fluxo.
- WARNINGS no 5: reportar e perguntar se segue ou corrige antes do 6.
- Decisão de produto que o PRD não cobre: para e pergunta ao dono, em qualquer estágio.

Responda sempre em português do Brasil.

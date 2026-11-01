---
name: cot
description: "Aplica Chain of Thought explícito ao problema passado como argumento, seguindo o protocolo da skill cot-thinker (causa raiz, por quê, hipóteses com trade-offs, eliminação, decisão, e só então o output). Use quando o usuário invocar /cot, pedir para pensar passo a passo, ou trouxer bug de causa não óbvia, decisão técnica ou erro em produção."
argument-hint: "[problema a analisar]"
---
Aplique Chain of Thought ao problema abaixo, seguindo o protocolo da skill `cot-thinker`:

1. Causa raiz
2. Por quê
3. Hipóteses, cada uma com trade-off positivo e negativo
4. Eliminação
5. Decisão

**E então:** produza o output final (código, plano ou resposta).

Contexto fixo do portfolio: site estático em Next.js 16, Tailwind 4, Motion e `next-intl`, sem banco, em dois idiomas, com regras em `CLAUDE.md`. Hipótese que depende de comportamento em runtime (dado, permissão, navegador) se confirma reproduzindo, não lendo código.

**Problema:** $ARGUMENTS

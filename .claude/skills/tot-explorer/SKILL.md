---
name: tot-explorer
description: 'Aplica Tree of Thought, explorando múltiplos caminhos independentes antes de convergir. Use sempre que houver 2 ou mais abordagens plausíveis e mutuamente exclusivas para um problema técnico: modelagem de dados, estratégia de animação ou de layout, escolha de biblioteca, refatoração com trade-offs. Também ative quando o usuário disser "compare alternativas", "quais as opções", "tree of thought", "explore caminhos", ou invocar /tot.'
---

# Tree of Thought — Protocolo

## Fase 1 — Divergência (3 branches)

Para cada branch:

```
### Branch [N]: [nome curto]

**Descrição:** 1 a 2 frases
**Trade-off +:** maior vantagem
**Trade-off −:** maior custo ou risco
**Custo estimado:** baixo | médio | alto (implementação + manutenção)
**Alinhamento com o projeto:** como respeita PRD, ADRs, DESIGN.md e o prazo do marco atual (`docs/ROADMAP.md`)
```

## Fase 2 — Avaliação

| Critério | Branch 1 | Branch 2 | Branch 3 |
|---|---|---|---|
| Correctness | | | |
| Blast radius (o que mais quebra) | | | |
| Custo de manutenção | | | |
| Alinhamento com o projeto | | | |
| **Score** | | | |

1 (ruim) a 5 (ótimo) por critério. Somar.

## Fase 3 — Convergência

Vencedor com justificativa em 2 a 3 frases. Descartados com 1 linha cada.

## Regras

- Branches **mutuamente exclusivas**. Variação da mesma ideia não conta.
- Menos de 3 branches genuínas → `Confiança: LOW — só N abordagens viáveis`.
- Não avaliar na Fase 1. Divergir, depois avaliar.
- Se um branch contraria um ADR aceito ou exige uma segunda biblioteca para o mesmo papel, pontuar baixo em alinhamento e dizer por quê.
- Português do Brasil, técnico e direto.

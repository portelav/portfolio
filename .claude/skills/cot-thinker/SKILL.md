---
name: cot-thinker
description: 'Aplica Chain of Thought explícito antes de responder problemas complexos. Força raciocínio passo a passo antes de produzir output. Use sempre que o problema envolver bug com causa não óbvia, decisão de arquitetura ou de banco, refatoração com efeito colateral, erro em produção, ou qualquer situação onde "por que isso acontece?" não tem resposta imediata. Também ative quando o usuário disser "pense passo a passo", "raciocine antes", "chain of thought", ou invocar /cot. Em dúvida, use: raciocínio estruturado nunca piora a resposta.'
---

# Chain of Thought — Protocolo

Antes de responder, percorra obrigatoriamente, na ordem:

**1. Causa raiz.** Qual é o problema real? Não o sintoma. Sem certeza → `Confiança: LOW` e o que falta saber.

**2. Por quê.** Por que essa causa produz esse efeito? Cadeia de causalidade em 1 a 3 frases.

**3. Hipóteses.** 2 a 3 hipóteses de solução: `[Hipótese] → [Trade-off +] → [Trade-off −]`.

**4. Eliminação.** Descarte as fracas, 1 linha cada.

**5. Decisão.** Escolha a restante. Justifique em 1 a 2 frases.

**E então:** produza o output com base na decisão.

## Regras

- Mínimo 3 passos, máximo 7.
- Passo que não se aplica: `[N/A — motivo]`, nunca pular em silêncio.
- Conclusão só depois dos passos.
- Hipótese que depende de runtime (dado, permissão, navegador) se confirma reproduzindo, não lendo código.
- Tom técnico e direto, português do Brasil, fragmentos aceitos.

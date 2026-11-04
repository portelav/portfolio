---
name: refine
description: "Reescreve pedidos crus em prompts estruturados para o portfolio. Identifica lacunas (escopo, dados, critérios de aceite, decisão de produto), coleta o que falta via AskUserQuestion, e roteia para /plan, /exec, /walkthrough, /cot ou /tot. Use quando o usuário invocar /refine, pedir para melhorar ou refinar um prompt, ou mandar pedido ambíguo, curto demais ou sem critério de aceite."
argument-hint: "[pedido a refinar]"
---

Aprimorador de pedidos do portfolio. Saída sem títulos `#`; rótulos em negrito. O usuário copia e cola o prompt reescrito.

**Passo 1 — Intent**

| Sinais no pedido | Intent | Destino |
|---|---|---|
| feature ou seção nova, dados, regra, "planejar" | planning | `/plan` |
| "executar plano", "implementar tasks/{slug}" | execution | `/exec` |
| "auditar", "revisar antes do PR" | walkthrough | `/walkthrough` |
| até 3 arquivos, ajuste visual, doc simples | trivial | `/exec` com tasks mínimo |
| bug de causa não óbvia | raciocínio | `/cot` |
| 2 ou mais abordagens excludentes | comparação | `/tot` |
| pedido direto sem encaixe | default | só reescreve |

Declarar: `Intent: <valor>`.

**Passo 2 — Lacunas** (só as reais)
- Escopo e área não claros
- Conteúdo de terceiro ou regra de fora afetados não claros
- Decisão de produto que o PRD não cobre (pergunta ao dono, nunca suposição)
- Critérios de aceite ausentes
- Restrições não declaradas (marco do ROADMAP, celular primeiro, dois idiomas, stack, regras de fora)

**Passo 2.5 — Coleta**

Lacuna crítica sem base na conversa: `AskUserQuestion`, até 4 perguntas, 2 a 4 opções, a recomendada primeiro.

**Passo 3 — Prompt reescrito**, bloco único ` ```text `:

```text
**Persona**: Aja como [papel] com experiência em Next.js 16, Tailwind 4 e `next-intl`.

**Contexto**:
- PRD: seções [X], FDD: [existe | a escrever]
- Restrições: [stack, celular primeiro, textos em pt-BR e inglês, marco do ROADMAP]
- Não assuma: [lista]

**Tarefa**: [verbo] [objeto] de modo que [resultado mensurável].

**Critérios de aceite**:
1. …

**Permissão para falhar**: se faltar informação essencial, responda "Confiança: LOW — preciso de X" em vez de adivinhar.
```

**Passo 4 — Diff:** o que foi adicionado, inferido ou reformulado, e por quê.

**Passo 5 — Roteamento**
- `plan`, `exec`, `walkthrough`: perguntar (aprovar e executar; refinar mais; só entregar o prompt). Sem resposta explícita, não invoca.
- `cot`, `tot`: invocar direto com o prompt reescrito.
- `default` e `trivial`: só entregar.

Não inventar fatos; preservar a intenção; pedido já bom: dizer em uma linha e devolver. Português do Brasil.

**Pedido original:** $ARGUMENTS

# Abertura

**Slug:** `abertura`
**Branch:** `feat/abertura`
**Seção ou área:** abertura, com a animação Reescrita
**Status:** Execution
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 6 e 8; decisões D2, D16, D18, D23, D27, D28, D29, D30, D34, D35 e D36
- **FDD:** `docs/fdd/abertura.md` (aprovado, com ajustes deste plano a confirmar)
- **ADR relacionado:** 0001 e 0002

### Triagem
- **Área:** abertura. Está no `docs/ROADMAP.md`, em "Agora".
- **Terceiros e regras de fora:** nenhum conteúdo de terceiro. Vale a regra de nenhum cookie: a marca da sessão fica em `sessionStorage`.
- **Trivial?** Não.
- **ADR novo?** Não. O ADR 0001 já prevê efeito simples em CSS. Ver Decisão única.
- **PRD cobre?** Sim, com a D37. Layout e tempo são decididos por Lucas no preview.

### Objetivo
- Fazer o visitante ver o nome ser reescrito, saber que é de Lucas Portela e ter um caminho claro para os projetos e o contato.

### Escopo e não-escopo
- **Dentro:** Reescrita, frase, duas chamadas, layout da primeira dobra, Caslon em vetor e divisão do nome em 8 letras.
- **Fora:** seções Projetos e Contato, destino real das chamadas, símbolo do salto do cavalo.

### Critérios de aceite (testáveis)
Os da seção "Critérios de aceite" de `docs/fdd/abertura.md`, mais:
1. As letras somadas reproduzem exatamente o `d` de `svg/nome-escuro.svg` do kit.
2. A página não baixa IBM Plex Mono nem Libre Caslon Text.

### Perguntas bloqueadoras
- Nenhuma. Respondidas por Lucas em 2026-11-02: frase da D37, chamadas entram agora, ainda sem destino, e Reescrita em CSS.

### Premissas
- Lucas fecha o tempo e o layout no preview, antes do PR (PRD, D29). Sem essa escolha, o PR não abre.
- Libre Caslon Text tem licença OFL, que permite usar os contornos. A fonte entra só para gerar o vetor, sem virar dependência.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/abertura.md` | Spec: sequência, regras, acessibilidade e critérios |
| `docs/PRD.md` | D28, D29 e D34 a D36. LCP abaixo de 2,5 s, sem deslocamento de layout |
| `docs/adr/0001-next-tailwind-motion.md` | Motion só onde precisa, e efeito simples em CSS |
| Kit `svg/nome-escuro.svg` | Um path com 12 subpaths absolutos: p 2, o 2, r 1, t 1, e 2, l 1, a 2, v 1. Dá para dividir sem mudar nenhum ponto |
| Kit `build.py` | Plex Mono com escala 0,2 e `viewBox` de 1035,6 por 220. É a referência para a Caslon no mesmo corpo |
| `.superpowers/.../virada-uma-fonte.html`, na pasta da identidade | Protótipo aprovado: sequência e digitação de 140 a 230 ms |
| `src/components/brand-name.tsx`, `src/app/globals.css` | Nome em SVG com tokens, e cursor com piscar em CSS que para em 4,98 s |

### Fluxo atual
- A página provisória mostra o nome parado e a frase "Este site está sendo refeito."
- `data-abertura` já está na página, e o cabeçalho a observa.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Letras:** `src/lib/reescrita-glyphs.ts`, com os 8 trechos do kit e os 8 da Caslon, gerados uma vez por um script fora do repositório.
2. **Sequência:** `src/lib/reescrita-timeline.ts` calcula atrasos e posições do cursor em um só lugar, com os tempos do FDD e uma lista fixa de intervalos de digitação, para o servidor e o navegador darem sempre o mesmo resultado.
3. **Estado:** o quadro final é o estado base. Um script inline, logo antes do nome, marca `data-reescrita` em `<html>` e grava em `sessionStorage` só na primeira carga e sem movimento reduzido. Ao final, retira a marca.
4. **Componente:** `src/components/reescrita-name.tsx`, de servidor, mais os textos e as chamadas em `src/components/abertura.tsx`.

### Decisão única
- **Reescrita em CSS, sem Motion.** Motion dependeria da hidratação, o que traria de volta o atraso e o risco de ver o nome pronto voltar. CSS começa junto da primeira pintura, usa só `opacity` e `transform`, e não aumenta o JavaScript. Motion fica instalado até a entrega de Projetos. Se nada usar, sai com nota no ADR 0001.

### Checklist de arquitetura
- [ ] Nenhum `"use client"` novo
- [ ] Textos nos arquivos de mensagens, em pt-BR e inglês, com a checagem de chaves iguais
- [ ] Chamadas com 44 px e foco visível. Na abertura, o nome não recebe foco
- [ ] Só `transform` e `opacity`, sem blur. O cursor para antes de 5 s
- [ ] Com `prefers-reduced-motion`, sem marca, quadro final e cursor aceso, inclusive no hover
- [ ] Tokens do `DESIGN.md`. Nada de "O que não fazer", como tudo centralizado ou rótulo em mono caixa alta
- [ ] Nome com espaço livre, sem símbolo junto, e o vetor igual ao do kit
- [ ] `sessionStorage`, nenhum cookie
- [ ] Sem deslocamento de layout: caixa com a proporção final, e a Caslon cabe nela
- [ ] Leitor de tela lê o nome uma vez, e o quadro em Caslon fica oculto para ele

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`.

1. [x] **FDD:** ajustes confirmados e texto final da frase, já aplicados com a abertura do Gate.
2. [ ] **Mensagens:** frase e chamadas nos dois idiomas. Sai a frase provisória.
3. [ ] **Letras:** `reescrita-glyphs.ts`, conferindo com o kit, ponto a ponto.
4. [ ] **Sequência:** `reescrita-timeline.ts` e o CSS da Reescrita.
5. [ ] **Nome animado:** `reescrita-name.tsx` e o script inline.
6. [ ] **Abertura:** `abertura.tsx`, com layout proposto.
7. [ ] **Página:** `page.tsx` só com a composição.
8. [ ] **Ajuste no preview, passo de Lucas:** enviar a branch, Lucas vê o tempo e o layout, e aplicar o que ele decidir. O teto da D29 deixa de ser provisório.
9. [ ] **Docs:** FDD `implementado`, PRD, ROADMAP, `DESIGN.md` e `CLAUDE.md`.

Antes do PR: QA no navegador pelo MCP do Chrome DevTools, com CPU e rede limitadas, depois o teste manual de Lucas.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: respondidas no Stage 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

*(Preenchido pelo exec.)*

| # | Camada | Arquivo | Status |
|---|---|---|---|

### Desvios do plano
- Nenhum | …

---

## Stage 7 — Tests

*(Preenchido pelo exec.)*

| Critério de aceite | Como foi verificado |
|---|---|

---

## Stage 8 — Verification

*(Preenchido pelo exec.)*

- **lint:** Pass | Fail
- **typecheck:** Pass | Fail
- **build:** Pass | Fail
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass | Fail

---

## Stage 9 — Walkthrough

*(Preenchido pelo walkthrough.)*

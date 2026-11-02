# Cabeçalho e rodapé

**Slug:** `cabecalho-rodape`
**Branch:** `feat/cabecalho-rodape`
**Seção ou área:** cabeçalho, rodapé e página 404
**Status:** Planning
**Gate S2:** Bloqueado

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seção 6; decisões D16, D25, D26, D27, D30, D31, D32 e D33
- **FDD:** `docs/fdd/cabecalho-rodape.md` (escrito neste plano, em rascunho)
- **ADR relacionado:** 0002

### Triagem
- **Área:** cabeçalho, rodapé e 404. Está no `docs/ROADMAP.md`, em "Agora".
- **Terceiros e regras de fora:** nenhum conteúdo de terceiro. Vale a regra de nenhum cookie.
- **Trivial?** Não: componentes novos, comportamento e mais de três arquivos.
- **ADR novo?** Não. Sem dependência nova nem mudança de stack.
- **PRD cobre?** Sim, com D32 e D33 registradas neste plano. Os textos e dois pontos do FDD pedem a aprovação de Lucas.

### Objetivo
- Dar ao visitante os seletores de idioma e tema, o nome como link de volta ao início, o rodapé e uma página 404 no idioma certo.

### Escopo e não-escopo
- **Dentro:** nome em SVG com cursor, seletores, cabeçalho, rodapé, 404 localizada e `theme-color` seguindo o tema.
- **Fora:** link e texto da nota de privacidade, que entram com a entrega de Contato. Reescrita. Menu. O 404 padrão continua para endereços com ponto.

### Critérios de aceite (testáveis)
Os da seção "Critérios de aceite" de `docs/fdd/cabecalho-rodape.md`.

### Perguntas bloqueadoras
1. **Aprovar o FDD:** `docs/fdd/cabecalho-rodape.md`, inclusive os textos propostos.
2. **Seletor de tema:** texto com o modo de destino (`Claro`), ou ícone de sol e lua? Recomendação: texto, porque o `DESIGN.md` prefere texto simples, e assim nenhum ícone novo entra.
3. **Link da nota de privacidade:** entrar só com a nota, na entrega de Contato, ou entrar agora, ainda sem destino? Recomendação: só com a nota, para não haver link quebrado.

### Premissas
- A abertura ainda não existe. A página provisória faz o papel dela, com a marca `data-abertura`, que a entrega da Abertura herda.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/cabecalho-rodape.md` | Spec desta entrega |
| `docs/fdd/abertura.md` | Cabeçalho na primeira dobra, foco no nome só onde é link, Reescrita fora daqui |
| `docs/design/DESIGN.md` | Componentes da seção 7, tokens, âmbar em texto pequeno, 44 px, foco e movimento |
| `docs/adr/0002-i18n-next-intl.md` | Idioma só pela URL, seletor visível desde o primeiro instante, sem cookie |
| `src/app/[locale]/layout.tsx` | Layout raiz em `[locale]`, com `dynamicParams = false`, que pode barrar a rota de captura do 404 |
| `next@16.4.4`, `dist/docs/.../not-found.md` | `not-found.js` só renderiza com `notFound()`, e o padrão segue o sistema, sem ler `data-theme` |
| next-intl, `docs/environments/error-files` | `[locale]/not-found.tsx` mais `[locale]/[...rest]/page.tsx` para rotas desconhecidas |

### Fluxo atual
- Não há cabeçalho nem rodapé. O tema só muda pelo console.
- O nome vem de duas imagens do kit, e o Chrome avisa sobre as dimensões delas.
- `theme-color` fica sempre escuro.
- Endereço desconhecido responde 404 com a página padrão do Next.js, em inglês.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Nome:** `src/components/brand-name.tsx`, servidor, com o SVG do kit em `path` e `rect`, cores por token. O cursor pisca por CSS, no hover ou no foco do link pai, com número de ciclos que para antes de 5 s.
2. **Tema:** `data-theme` e `localStorage.theme`. `src/components/theme-script.tsx` aplica o tema antes da pintura, marca que há JavaScript e acerta o `theme-color`. `src/components/theme-toggle.tsx` é o único cliente que grava. Os dois rótulos ficam no HTML, e o CSS mostra o certo, para não haver diferença na hidratação.
3. **Idioma:** `src/components/locale-switcher.tsx`, servidor, com o `Link` de `src/i18n/navigation.ts`.
4. **Cabeçalho:** `src/components/site-header.tsx`, com uma ilha cliente `header-name.tsx` que observa `[data-abertura]` com `IntersectionObserver`. Rodapé em `site-footer.tsx`. Os dois entram no layout raiz, e valem também para a 404.

### Decisão única
- **CSS no lugar de Motion e JavaScript sempre que der.** Só observar a abertura e trocar o tema pedem JavaScript. Mantém o cabeçalho leve e funcional sem JavaScript no que importa, o idioma.
- **Risco a confirmar na execução:** `dynamicParams = false` pode impedir `[...rest]`. Se impedir, sai essa linha, e o `hasLocale` do layout continua barrando idioma inválido. O critério do 404 decide.

### Checklist de arquitetura
- [ ] Next.js 16: `"use client"` só em `theme-toggle` e `header-name`
- [ ] Textos só nos arquivos de mensagens, em pt-BR e inglês, com a checagem de chaves iguais
- [ ] Rótulos e `aria-label` em todos os controles, 44 px e foco visível
- [ ] Movimento só de `transform` e `opacity`, sem blur, e o cursor para antes de 5 s
- [ ] `prefers-reduced-motion` respeitado no nome e no cursor
- [ ] Tokens do `DESIGN.md`. Sublinhado no destaque de texto pequeno, sem depender de cor
- [ ] Forma e cor do nome iguais ao arquivo do kit, sem símbolo junto, 96 px ou mais, com espaço livre
- [ ] Nenhum cookie, tema só em `localStorage`, idioma só pela URL
- [ ] Sem deslocamento de layout, com altura fixa no cabeçalho
- [ ] Nada da lista "O que não fazer", inclusive rótulo em caixa alta decorativo. `PT` e `EN` são códigos de idioma, dado real

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`.

1. [ ] **FDD:** status `aprovado`, com os ajustes da aprovação.
2. [ ] **Mensagens:** namespaces de cabeçalho, rodapé e 404, em pt-BR e inglês.
3. [ ] **Nome:** `brand-name.tsx` em SVG com tokens e cursor em CSS. A página provisória passa a usá-lo, e o `public/brand/` sai se nada mais o usar.
4. [ ] **Tema:** script com marca de JavaScript e `theme-color`, e `theme-toggle.tsx`.
5. [ ] **Idioma:** `locale-switcher.tsx`, com Red Hat Mono carregada.
6. [ ] **Cabeçalho:** `site-header.tsx` e `header-name.tsx`, com entrada e saída do nome.
7. [ ] **Rodapé:** `site-footer.tsx`.
8. [ ] **Composição:** cabeçalho e rodapé no layout raiz, e `data-abertura` na página.
9. [ ] **404:** `[locale]/not-found.tsx` e `[locale]/[...rest]/page.tsx`.
10. [ ] **Docs:** FDD `implementado`, PRD, ROADMAP e `CLAUDE.md`.

Antes do PR: QA no navegador pelo MCP do Chrome DevTools, depois o teste manual de Lucas. Como a página provisória é curta, o QA do nome no cabeçalho aumenta a página só no navegador, sem mudar o código.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist
- [ ] Decisão de produto coberta pelo PRD ou pergunta aberta: três perguntas abertas no Stage 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Bloqueado

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

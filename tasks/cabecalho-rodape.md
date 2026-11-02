# Cabeçalho e rodapé

**Slug:** `cabecalho-rodape`
**Branch:** `feat/cabecalho-rodape`
**Seção ou área:** cabeçalho, rodapé e página 404
**Status:** Walkthrough
**Gate S2:** Livre

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
- Nenhuma. Respondidas por Lucas em 2026-11-02, "aprovado, por ora": FDD e textos aprovados, botão de tema em texto, e link da nota de privacidade só junto da nota. Podem mudar depois.

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
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: respondidas no Stage 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | FDD | `docs/fdd/cabecalho-rodape.md`, `docs/fdd/README.md` | feito |
| 2 | Mensagens | `messages/pt-BR.json`, `messages/en.json` | feito |
| 3 | Nome | `src/components/brand-name.tsx`, `src/app/globals.css`, `src/app/[locale]/page.tsx`; `public/brand/` removida | feito |
| 4 | Tema | `src/components/theme-script.tsx`, `src/components/theme-toggle.tsx`, `src/lib/theme.ts`, `src/lib/site.ts`, `src/app/globals.css` | feito |
| 5 | Idioma | `src/components/locale-switcher.tsx`, `src/lib/fonts.ts` | feito |
| 6 | Cabeçalho | `src/components/site-header.tsx`, `src/components/header-name.tsx` | feito |
| 7 | Rodapé | `src/components/site-footer.tsx` | feito |
| 8 | Composição | `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx` | feito |
| 9 | 404 | `src/app/[locale]/not-found.tsx`, `src/app/[locale]/[...rest]/page.tsx` | feito |
| 10 | Docs | FDD, PRD, ROADMAP, `DESIGN.md`, `CLAUDE.md` | feito |

### Desvios do plano
- **Provider do `next-intl`:** o `Link` precisa de `NextIntlClientProvider`, e sem ele o build falhava. Entrou no layout com `messages={null}`, em commit próprio, para não enviar as mensagens ao navegador.
- **`dynamicParams = false` removido:** o risco previsto no Stage 3 se confirmou, porque essa linha impedia `[...rest]`. O `hasLocale` do layout continua barrando idioma inválido.
- **Seletor de idioma leva ao início:** o FDD dizia "a mesma página". O componente é de servidor e o site tem uma página só, então o link aponta para `/`. FDD ajustado.
- **404 montada no navegador:** o HTML do servidor vem como casca de erro do Next.js, e a página aparece com JavaScript. Não encontrei na documentação do Next.js se esse é o comportamento esperado; o que vi é que o layout renderiza normalmente e a casca aparece só com `notFound()`. Sem JavaScript, a resposta é 404 com tela vazia. FDD ajustado com esse limite.
- **Tema na 404:** como o script antes da pintura não roda lá, o `theme-toggle` aplica o tema salvo ao montar. Nessa página, o tema claro salvo pode aparecer depois de um instante.
- **`src/lib/theme.ts`:** arquivo não previsto, com as cores do `theme-color`, usado pelo script, pelo botão e pelos metadados.

---

## Stage 7 — Tests

Não há suíte de testes automatizados nesta entrega. Conferido no servidor de produção local, com `curl` e pelo MCP do Chrome DevTools.

| Critério de aceite | Como foi verificado |
|---|---|
| 390 px e computador, 44 px | 390 e 1440 px, sem transbordo. `PT` e `EN` com 44 x 44, tema com 58 x 44, nome com altura 44 e 96 px de largura. `/`, `/en` e `/xx` conferidos; escuro e claro principalmente em 390 px |
| Trocar idioma, sem cookie | Clique em `PT` em `/en` terminou em `/`, com `lang="pt-BR"`. `/pt-BR` responde 307 para `/`. Nenhum `Set-Cookie` em cinco rotas, e `document.cookie` vazio |
| Trocar tema | O clique mudou `data-theme`, `localStorage`, fundo e `theme-color`. Sobreviveu à troca para `/en`, com a primeira pintura já clara |
| Nome no cabeçalho | Na primeira dobra, `visibility: hidden` e fora da lista de foco. Com a página aumentada só no navegador e rolada, ficou visível. Voltando ao topo, escondeu de novo |
| Link e cursor do nome | Com foco, há uma animação `brand-cursor-blink` que termina em 4,98 s. `href` do link aponta para o início. O clique no link e o hover com mouse real não foram exercitados |
| Movimento reduzido | Com `prefers-reduced-motion`, nenhuma animação em curso com o foco no nome, e transição `none` |
| Sem JavaScript | Só pelo HTML do servidor: botão com `no-js:hidden`, nome `invisible`, links de idioma presentes. Não testado com JavaScript desligado no navegador |
| 404 | `/xx`, `/en/xx` e `/a/b` respondem 404. No navegador, `/xx` e `/en/xx` mostram texto no idioma certo, cabeçalho, rodapé e link. Em `/xx`, o tema claro salvo foi aplicado. Sem JavaScript, tela vazia, limite registrado no FDD |
| Teclado | Ordem na 404: nome, Português, English, tema, voltar. Na primeira dobra da página principal: Português, English, tema. Lida pela ordem no DOM, sem navegar com Tab de verdade. Contorno de 2 px medido com foco |
| Red Hat Mono | `Red Hat Mono` carregada e aplicada nos seletores. Red Hat Display aplicada no título da 404 |

Extras: nenhuma mensagem no HTML além das usadas, sem erro no console. O único registro é o próprio 404 do documento em `/xx`.

---

## Stage 8 — Verification

- **lint:** Pass
- **typecheck:** Pass
- **build:** Pass
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass, com os limites do Stage 7
- **CI e preview da Vercel:** pendentes, rodam com o push e o PR

---

## Stage 9 — Walkthrough

> Data: 2026-11-02

### Resumo
- **Veredito:** WARNINGS
- **Arquivos analisados:** 26
- **Findings:** 0 críticos em aberto (1 encontrado e corrigido), 6 avisos

### Checklist
| Item | Status | Observação |
|---|---|---|
| Escopo | OK | Só o previsto, com os desvios do Stage 6 |
| Next.js 16 | OK | `await params`, `proxy.ts`, `"use client"` só em `theme-toggle` e `header-name` |
| Segredo | OK | Nenhuma variável nova. `gitleaks` limpo na branch |
| Produto | Ressalva | Bate com D30, D32 e D33. FDD ajustado em três pontos, a confirmar com Lucas |
| Regras de fora | OK | Nenhum cookie nas rotas testadas |
| Textos | OK | Tudo nos arquivos de mensagens, nos dois idiomas, sem travessão |
| Repositório público | OK | Sem dado de terceiro nem nota interna. Nenhuma mídia nova |
| Tokens e marca | OK | Cores por token, e os valores de `theme-color` iguais a `--bg`. Sem símbolo junto do nome, 96 px no cabeçalho |
| 390 px e computador | Ressalva | Sem transbordo. A combinação inteira de tamanho, idioma e tema não foi percorrida |
| Toque, foco e alternativo | OK | 44 px medidos, contorno de 2 px, nomes acessíveis conferidos |
| Movimento | Ressalva | `transform` e `opacity`, e `visibility` só troca de estado. Cursor termina em 4,98 s |
| Desempenho | OK | Menos duas imagens. Header de altura fixa |
| Verificações | Ressalva | Verdes no local. CI só roda no PR |
| Commits | OK | Conventional Commits, até 72 caracteres, sem atribuição |
| `.env.example` | Não se aplica | Nenhuma variável nova |
| Docs | OK | FDD, PRD, ROADMAP, `DESIGN.md` e `CLAUDE.md` |

### Findings
#### Critical
- Corrigido: `PT` não fazia parte do nome acessível `Português`, o que falha o critério 2.5.3 da WCAG, nível A. O nome passou a ser `PT, Português`, e `EN, English` pelo mesmo padrão — `messages/pt-BR.json`, `messages/en.json`.

#### Warnings
- A 404 é montada no navegador: sem JavaScript fica vazia, e com JavaScript pode haver um instante sem conteúdo e com o tema padrão. A causa no Next.js não foi confirmada — `src/app/[locale]/[...rest]/page.tsx` — limite registrado no FDD. Reavaliar se o Next.js mudar.
- Sem JavaScript, o cabeçalho foi conferido só pelo HTML do servidor — `src/app/globals.css:4` — conferir no teste manual.
- Não foram exercitados de verdade: clique no link do nome, hover com mouse, navegação com Tab e leitor de tela — `src/components/site-header.tsx` — conferir no teste manual.
- O link para o português aponta para `/pt-BR` e passa por um 307 até `/` — `src/components/locale-switcher.tsx:23` — funciona. Rever só se medir lentidão.
- `visibility` entra na lista de transição, fora de `transform` e `opacity` — `src/components/header-name.tsx:35` — é só troca de estado, necessária para a saída do nome.
- Três pontos mudaram no FDD depois da aprovação: idioma leva ao início, limite da 404 e o nome acessível do idioma — `docs/fdd/cabecalho-rodape.md` — Lucas confirma no PR.

#### Positive
- O QA pegou o provider ausente, o `dynamicParams` que barrava a 404 e o tema que não aplicava nela.
- Nenhuma mensagem é enviada ao navegador. Os componentes cliente recebem os textos por props.
- Os avisos anteriores de `theme-color` e da imagem do nome foram resolvidos, e Red Hat Mono e Display foram vistas renderizando.
- Depois de desconectado, o projeto antigo da Vercel não reagiu ao push, e `portelav.vercel.app` manteve o mesmo ETag.

### Verificações executadas
- `npm ci`, `npm run lint`, `npm run typecheck` e `npm run build`: verdes, depois da correção.
- `git log --format=%B origin/main..HEAD | grep -i -E "co-authored|generated with|claude"`: vazio.
- `gitleaks` na branch: limpo. `npm audit --omit=dev`: 0 vulnerabilidades.
- `curl`: `/` e `/en` 200, `/xx` e `/en/xx` 404, `aria-label` novos no HTML.
- Status da Vercel no último push antes desta correção: só `portelav-site`, com sucesso.

**Gate S9 — WARNINGS**

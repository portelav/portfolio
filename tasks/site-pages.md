# Site em páginas: Projetos, Sobre, Serviços e Contato

**Slug:** `site-pages`
**Branch:** `feat/site-pages`
**Seção ou área:** estrutura do site, cabeçalho, página inicial e as seções que viram páginas
**Status:** Executed
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seção 6 (escopo e ordem), D42, D45, D46, D64, D65, D67, D70 e D74. Ganha a rodada 14 com as decisões abaixo.
- **FDD:** `cabecalho-rodape.md`, `abertura.md`, `projetos.md`, `sobre.md`, `tecnologias.md`, `quer-um-site.md` e `contato.md` mudam. `caso.md` só nos links de volta.
- **ADR relacionado:** 0002 (rotas por idioma). Nenhum ADR novo nesta entrega: a estrutura usa o que o 0002 já prevê. O ADR do Three.js, que revisa o 0004, vem na entrega do 3D.

### Decisões do dono nesta conversa (2026-11-07 e 2026-11-08), a registrar no PRD
1. O site deixa de ser uma página só. Ganha as páginas Projetos, Sobre, Serviços e Contato, e os textos ficam mais curtos. Ajusta D42 e D45.
2. A página inicial fica com a abertura, os três projetos em versão curta e uma chamada final para Serviços e Contato. Sobre e Tecnologias saem da inicial.
3. No celular, um botão "Menu" no cabeçalho abre a lista de páginas por cima do site. Ajusta D70, que deixava o celular sem menu.
4. As versões curtas dos textos são propostas no FDD e aprovadas por Lucas antes do código.
5. Os aparelhos 3D (notebook e celular em Three.js, guiados pela rolagem, com o vídeo de cada projeto) entram na inicial, em versão curta, e em Projetos, completos. Entrega seguinte, depois desta.
6. Bibliotecas 3D como Three.js ficam liberadas, para estudo e currículo. O ADR vem com a entrega do 3D.
7. Desfoque e `mix-blend-mode` em elemento que se move ficam liberados. Muda a regra do `CLAUDE.md`.
8. Nome em 3D e fundo em shader foram testados e rejeitados.
9. O vídeo do Crewz continua mostrando o app por dentro (D65), regravado em alta resolução. Os vídeos passam a 1080×1920 no celular e 1920×1200 no computador, em todas as telas, e seguem baixando só depois do preloader e perto de entrar na tela. Ajusta o limite de peso da D64. A troca dos vídeos vem com a entrega do 3D.

### Objetivo
- Quem chega entende em segundos o que Lucas faz e acha cada assunto numa página própria, com menos texto por tela.

### Escopo e não-escopo
- **Dentro:** rotas `/projetos`, `/sobre`, `/servicos`, `/contato` e, em inglês, `/en/projects`, `/en/about`, `/en/services`, `/en/contact`. Página inicial enxuta. Menu do computador apontando para as páginas. Menu do celular. Rodapé e chamadas apontando para as páginas. Textos curtos nos dois idiomas. Metadados, `hreflang` e mapa do site das páginas novas. PRD, FDDs, ROADMAP e `CLAUDE.md`.
- **Fora:** os aparelhos 3D, o ADR do Three.js e a troca dos vídeos, que formam a próxima entrega (`tasks/projects-3d-devices.md`, a criar). Redesenho visual: a identidade fica como está. Páginas de caso: só os links de volta mudam.

### Critérios de aceite (testáveis)
1. As oito rotas abrem em 390 px e no computador, em escuro e claro, sem transbordo, cada uma com título e descrição próprios.
2. A inicial mostra a abertura, os três projetos em versão curta, cada um com link para o caso, e a chamada final. Sobre, Tecnologias, Serviços e Contato não aparecem nela.
3. O preloader roda só na inicial, como hoje (D46). As outras páginas abrem direto.
4. No computador, o menu leva às quatro páginas e marca a atual. Na página de caso, marca Projetos.
5. No celular, "Menu" abre a lista, com foco preso dentro dela, e fecha com Esc, com o botão de fechar e ao escolher uma página. O foco volta para o botão. Área de toque de 44 px.
6. "Quero um site" leva a Serviços, e "Falar sobre estágio" leva a Contato.
7. A troca de idioma leva para a mesma página no outro idioma.
8. Endereços antigos com âncora, como `/#contato`, `/#sobre` e `/#projetos`, levam à página certa.
9. Todo texto vem dos arquivos de mensagens, nos dois idiomas. Lint, typecheck e build verdes.
10. Nenhum deslocamento de layout medido na troca de página.

### Perguntas bloqueadoras
- Nenhuma. Os textos curtos são aprovados por Lucas no item 2 do Stage 4, antes do código.

### Premissas
- A nota de privacidade fica no fim da página Contato, e o link do rodapé leva até ela.
- Página de caso continua em `/projetos/[id]` e `/en/projects/[id]`, agora abaixo da página Projetos.
- A transição entre páginas (D71) vale para todas as páginas novas.
- Âncora antiga vira redirecionamento no navegador: a inicial lê o `#` e leva à página. Sem cookie e sem rota nova no servidor.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `src/app/[locale]/page.tsx` | A inicial compõe preloader, abertura, projetos, sobre, tecnologias, "Quer um site?", contato e privacidade numa página só |
| `src/i18n/routing.ts` | `pathnames` já traduz `/projetos/[id]` para `/projects/[id]`. As páginas novas entram no mesmo mapa |
| `src/components/site-nav.tsx` | O menu do computador marca a seção pela posição da rolagem e usa âncoras. Passa a marcar pela rota |
| `docs/PRD.md` (D42, D45, D67, D70) | A página única e o celular sem menu estão registrados. Mudam nesta entrega |
| `docs/fdd/projetos.md` | Cada caso tem print, vídeo, botões de versão e três blocos de texto. Esse card completo vai para a página Projetos |
| `docs/fdd/cabecalho-rodape.md` | Define cabeçalho e rodapé. Ganha o menu do celular e os links para páginas |
| `node_modules/next/dist/docs/01-app` | Rotas do App Router e metadados por página, conferidos antes do código |

### Fluxo atual
- Uma página longa em `/` e `/en`. O menu do computador rola até a seção. No celular, não há menu. As chamadas da abertura levam a âncoras.

---

## Stage 3 — Architecture Planning

### Source of Truth (até 4 blocos)
1. **Rotas:** `src/i18n/routing.ts` (`pathnames`) e as pastas em `src/app/[locale]/`. As páginas só compõem componentes.
2. **Textos:** `messages/pt-BR.json` e `messages/en.json`, com as versões curtas aprovadas no FDD.
3. **Navegação:** uma lista única de páginas em `src/lib/`, usada pelo menu do computador, pelo do celular e pelo rodapé.
4. **Seções:** os componentes de hoje continuam sendo a fonte de cada bloco. Cada página monta os seus.

### Decisão única
- Cada assunto vira uma rota própria, composta pelos componentes que já existem. A inicial ganha um componente novo de projetos em versão curta, que a entrega do 3D vai trocar pelos aparelhos.

### Checklist de arquitetura (até 10)
- [ ] Next.js 16: `params` assíncrono nas páginas novas e `generateMetadata` por página, conferidos na documentação local.
- [ ] `next-intl`: rotas traduzidas no `pathnames`, `Link` tipado, troca de idioma mantendo a página.
- [ ] Textos em pt-BR e inglês, sem texto fixo em componente.
- [ ] Menu do celular: botão com `aria-expanded` e `aria-controls`, foco preso, Esc fecha, foco devolvido, 44 px, legível em 390 px.
- [ ] Movimento do menu: só `transform` e `opacity` (o `CLAUDE.md` passa a liberar desfoque, mas o menu não precisa), e sem movimento com `prefers-reduced-motion`.
- [ ] Tokens e marca do `DESIGN.md`. Sem card, sombra ou estilo novo.
- [ ] Preloader só na inicial. As outras páginas não esperam animação para mostrar conteúdo.
- [ ] Metadados, `hreflang` e mapa do site nas oito rotas. `noindex` continua até o lançamento.
- [ ] Nenhum cookie novo e nenhum dado de terceiro.
- [ ] Âncoras antigas levam à página certa.

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`. Antes de cada commit, explicar a Lucas o que a mudança faz.

1. [x] **PRD e `CLAUDE.md`:** rodada 14 com as decisões 1 a 9 do Stage 1, ajustando D42, D45, D64 e D70. No `CLAUDE.md`, a regra de movimento libera desfoque e `mix-blend-mode`, e a estrutura do código passa a citar as páginas.
2. [x] **FDDs:** reescrever `cabecalho-rodape.md` (menu do celular, links para páginas), `abertura.md` (destino das chamadas) e `projetos.md` (versão curta na inicial e card completo em Projetos). Ajustar `sobre.md` e `tecnologias.md` (página Sobre), `quer-um-site.md` (página Serviços), `contato.md` (página Contato, com a privacidade) e `caso.md` (volta para Projetos). Criar `docs/fdd/pagina-inicial.md`. Textos curtos propostos nos dois idiomas. **Parar aqui até Lucas aprovar os textos.**
3. [x] **Rotas:** páginas novas no `pathnames` de `src/i18n/routing.ts` e lista de navegação em `src/lib/`.
4. [x] **Mensagens:** textos curtos aprovados, títulos e descrições de cada página, rótulos do menu do celular, nos dois idiomas.
5. [x] **Páginas:** `projetos/page.tsx`, `sobre/page.tsx`, `servicos/page.tsx` e `contato/page.tsx` em `src/app/[locale]/`, só composição, com metadados.
6. [x] **Inicial:** abertura, projetos em versão curta (componente novo) e chamada final. Chamadas da abertura apontando para Serviços e Contato. Âncoras antigas levando à página certa.
7. [x] **Menu do computador:** `site-nav.tsx` com links de página e marcação pela rota.
8. [x] **Menu do celular:** botão e painel no cabeçalho, com os estados fechado e aberto.
9. [x] **Rodapé, caso e mapa do site:** links do rodapé, volta da página de caso para Projetos, mapa do site e `hreflang` das rotas novas.
10. [x] **Docs finais:** status dos FDDs, ROADMAP (estrutura feita; 3D em Agora, com `tasks/projects-3d-devices.md`) e `CLAUDE.md`, se a estrutura mudou além do item 1.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: decisões do dono no Stage 1, registradas no item 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | Docs | `docs/PRD.md` (rodada 14, D78 a D86), `CLAUDE.md` | Feito (`3d2aed0`) |
| 2 | FDD | `docs/fdd/pagina-inicial.md` (novo), `cabecalho-rodape.md`, `abertura.md`, `projetos.md`, `sobre.md`, `tecnologias.md`, `quer-um-site.md`, `contato.md`, `caso.md` | Feito (`3f8b522`), textos aprovados por Lucas (`5934aba`) |
| 3 | Rotas | `src/i18n/routing.ts`, `src/lib/pages.ts` (novo) | Feito (`60376c3`) |
| 4 | Mensagens | `messages/pt-BR.json`, `messages/en.json` | Feito (`61e5185`) |
| 5 | Páginas | `src/app/[locale]/{projetos,sobre,servicos,contato}/page.tsx` (novos), `src/i18n/page-metadata.ts` (novo); `h1` em `projetos.tsx`, `sobre.tsx`, `quer-um-site.tsx` e `contato.tsx` | Feito (`885cb51`) |
| 6 | Inicial | `src/app/[locale]/page.tsx`, `src/components/home-projects.tsx`, `home-cta.tsx` e `old-anchors.tsx` (novos), `abertura.tsx` | Feito (`dcc6c05`) |
| 7 | Menu do computador | `src/components/site-nav.tsx`, `site-header.tsx` | Feito (`39f294e`) |
| 8 | Menu do celular | `src/components/mobile-menu.tsx` (novo), `site-header.tsx`, `contact-icons.tsx` | Feito (`04ddfda`) |
| 9 | Rodapé, caso e idioma | `src/components/site-footer.tsx`, `case-study.tsx`, `locale-link.tsx`, `old-anchors.tsx` | Feito (`c4fba27`) |
| 10 | Docs finais | FDDs em `implementado`, `docs/ROADMAP.md`, `CLAUDE.md` | Feito (`7a85247`) |

### Desvios do plano
- **Instagram no cabeçalho do celular:** com o botão "Menu", o cabeçalho estourava 10 px em 390 px. O Instagram saiu do cabeçalho abaixo de 768 px, e abaixo de 390 px fica só o primeiro canal. Todos continuam em Contato. O botão guarda a largura de "Fechar", para nada se mexer ao abrir. FDD `cabecalho-rodape.md` atualizado no mesmo commit.
- **Mapa do site:** o site não tem `sitemap.xml` hoje, e continua em `noindex` até o lançamento. Nenhum foi criado. As páginas novas têm `canonical` e `hreflang` nos metadados. O mapa do site fica para o lançamento.
- **Lint:** `private/**` entrou nos ignorados do ESLint (`bb29b10`), porque o servidor dos rascunhos do 3D, fora do git, quebrava o `npm run lint` local.
- **Âncora `#privacidade`:** o roteador do `next-intl` descarta o `hash`, então `old-anchors.tsx` monta o endereço com `getPathname` e usa o roteador do Next.js. A correção foi junto do item 9.
- **Linha "Uma decisão" da landing:** o texto aprovado encurta a D68. A regra dos antes e depois autorizados continua na página do caso.
- **Menu do celular depois do teste no preview (PRD, D87):** Lucas testou no celular e pediu o botão como ícone de três traços, no início do cabeçalho. O botão vai para antes do nome, vira um X ao abrir e tem a mesma largura aberto e fechado; o texto "Fechar" saiu das mensagens (`9efa593`, `ea04d89`). Os links do painel passam da letra de título grande para 28 px, com um traço fino entre eles e o toque na largura toda (`2e6b94b`, `5c3ff11`). FDD `cabecalho-rodape.md` atualizado nos dois casos.

---

## Stage 7 — Tests

Sem testes automáticos no projeto. Verificação no navegador pelo MCP do Chrome DevTools, com o servidor de desenvolvimento.

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Oito rotas, 390 px e computador, sem transbordo, título e descrição próprios | `scrollWidth` igual à largura em 360, 390 e 1440 px. Título e descrição lidos em `/sobre`, `/en/about`, `/servicos` e no caso em inglês. O build gera as 18 páginas estáticas |
| 2. Inicial com abertura, projetos curtos, chamada final, sem as outras seções | Print da página inteira em 390 px e da primeira tela em 1440 px |
| 3. Preloader só na inicial | `data-reescrita` ausente nas páginas internas e ao chegar com âncora |
| 4. Menu do computador marca a página; no caso, Projetos | `aria-current="page"` em Projects no caso `/en/projects/draftcs`, com a linha visível |
| 5. Menu do celular: foco preso, Esc, fechar, escolher página, foco de volta, 44 px | Shift+Tab no botão foi ao último link e Tab voltou ao botão. Esc fechou e devolveu o foco ao botão. Escolher Services fechou e navegou. Rolagem da página travada com o painel aberto. Botão com 44 px de altura e 50 px de largura |
| 6. "Quero um site" e "Falar sobre estágio" | Links levam a `/servicos` e `/contato`, e a chamada final também |
| 7. Troca de idioma mantém a página | Em `/servicos`, o link vai a `/en/services`. No caso, vai ao mesmo caso |
| 8. Endereços antigos com âncora | `/#site`, `/#sobre`, `/#projetos` e `/#contato` levaram às páginas. `/en#privacidade` levou a `/en/contact#privacidade` |
| 9. Textos nas mensagens, lint, typecheck e build | Paridade das mensagens pelo typecheck. Os três verdes |
| 10. Sem deslocamento de layout na troca de página | Altura do cabeçalho fixa, e o botão do menu não muda de largura. A medição de CLS em aparelho real fica para o teste de Lucas |

---

## Stage 8 — Verification

- **lint:** Pass
- **typecheck:** Pass
- **build:** Pass, com 18 páginas estáticas
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass, em 360, 390 e 1440 px. O modo claro foi visto no menu em 360 px. Teste em aparelho real com Lucas pendente

---

## Stage 9 — Walkthrough

> Data: 2026-11-08

### Resumo
- **Veredito:** WARNINGS
- **Arquivos analisados:** 39
- **Findings:** 0 críticos, 3 avisos

### Checklist
| Item | Status | Observação |
|---|---|---|
| Escopo | OK | Só o que o Stage 4 previa, mais o ajuste do menu pedido por Lucas no teste (D87), registrado no Stage 6 |
| Next.js 16 | OK | `await params` em `generateMetadata`, tipos `PageProps` gerados pelo `next typegen`. `"use client"` só em `mobile-menu`, `site-nav`, `locale-link` e `old-anchors`, que têm estado, efeito ou rota do navegador |
| Segredo | OK | Nenhuma variável nova |
| FDD e PRD | OK | Rotas, inicial curta, menus, rodapé e âncoras antigas batem com os FDDs e com D78 a D81 e D87 |
| Decisões do dono | OK | Textos curtos aprovados antes do código; menu de três traços e letra do painel escolhidos por Lucas e registrados (D87, FDD) |
| Cookies e terceiros | OK | Nenhum cookie novo; nenhum dado de terceiro; nenhuma mídia nova |
| Textos | OK | Tudo nas mensagens; mesmas chaves em pt-BR e inglês, conferido por script |
| Tokens e marca | OK | Só tokens do `DESIGN.md` (`border-line`, `text-accent`, `text-xl`, `text-display`); sem card, sombra ou cor solta |
| 390 px e computador, escuro e claro | OK | 360, 390 e 1440 px sem transbordo; menu nos dois temas; teste no celular de Lucas pelo preview |
| Toque, foco, contraste | OK | Botões e links com 44 px ou mais (links do painel com 56 px); foco preso e devolvido; marca da página atual no claro em `--fg` sublinhado, pelo contraste |
| Movimento | OK | Painel, traços e links animam `opacity`, `visibility` e `transform`; `motion-reduce:transition-none` em todos |
| Desempenho | OK | Inicial mais leve que antes: sem vídeos, só os prints, com o primeiro em `eager` e o resto preguiçoso |
| Lint, typecheck, build | OK | Verdes; 18 páginas estáticas |
| Commits | Aviso | Conventional Commits, sem atribuição. Um título passa de 72 caracteres |
| `.env.example` | OK | Sem variável nova |
| Docs | OK | PRD, FDDs, ROADMAP, `CLAUDE.md` e este plano atualizados |

### Findings
#### Critical
- Nenhum.

#### Warnings
- `old-anchors.tsx` testa a âncora com `in`, que também acha propriedades herdadas de `Object`. Um endereço como `/#constructor` cai no redirecionamento com `href` indefinido e gera erro no console — `src/components/old-anchors.tsx:29` — trocar por `Object.hasOwn(moved, anchor)`.
- O título do commit `c4fba27` tem 76 caracteres, acima dos 72 do `CLAUDE.md`. Já está no remoto; reescrever pediria force push na branch. Fica registrado.
- Medição de CLS em aparelho real não foi feita. O cabeçalho tem altura fixa e o botão do menu não muda de largura, então o risco é baixo. Fica para o teste de lançamento (LCP e CLS já estão na lista do ROADMAP).

#### Positive
- Lista única de páginas (`src/lib/pages.ts`) alimenta os dois menus, o rodapé e a troca de idioma; nenhuma rota repetida.
- Metadados por página com `canonical`, `hreflang` e `x-default` num só lugar (`page-metadata.ts`).
- Âncoras antigas trocam a entrada do histórico, então voltar não cai na inicial; o preloader não roda no caminho.
- Menu do celular acessível: `aria-expanded`, `aria-controls`, foco preso, Esc, fecha ao trocar de página ou ao passar para 768 px, rolagem travada, e sem JavaScript os links ficam no rodapé.
- `h1` único por página, com a hierarquia de títulos corrigida em Projetos, Sobre, Serviços e Contato.

### Verificações executadas
- `npm run lint`: Pass
- `npm run typecheck`: Pass
- `npm run build`: Pass, 18/18 páginas estáticas
- `git log --format=%B main..HEAD | grep -i -E "co-authored|generated with|claude"`: vazio
- Paridade das chaves de `messages/pt-BR.json` e `messages/en.json`: iguais
- Navegador (MCP do Chrome DevTools): menu do celular aberto e fechado em 390 px nos temas escuro e claro, `scrollWidth` igual à largura em 360 e 390 px

**Gate S9 — WARNINGS**

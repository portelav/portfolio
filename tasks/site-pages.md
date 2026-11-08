# Site em páginas: Projetos, Sobre, Serviços e Contato

**Slug:** `site-pages`
**Branch:** `feat/site-pages`
**Seção ou área:** estrutura do site, cabeçalho, página inicial e as seções que viram páginas
**Status:** Planning
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

1. [ ] **PRD e `CLAUDE.md`:** rodada 14 com as decisões 1 a 9 do Stage 1, ajustando D42, D45, D64 e D70. No `CLAUDE.md`, a regra de movimento libera desfoque e `mix-blend-mode`, e a estrutura do código passa a citar as páginas.
2. [ ] **FDDs:** reescrever `cabecalho-rodape.md` (menu do celular, links para páginas), `abertura.md` (destino das chamadas) e `projetos.md` (versão curta na inicial e card completo em Projetos). Ajustar `sobre.md` e `tecnologias.md` (página Sobre), `quer-um-site.md` (página Serviços), `contato.md` (página Contato, com a privacidade) e `caso.md` (volta para Projetos). Criar `docs/fdd/pagina-inicial.md`. Textos curtos propostos nos dois idiomas. **Parar aqui até Lucas aprovar os textos.**
3. [ ] **Rotas:** páginas novas no `pathnames` de `src/i18n/routing.ts` e lista de navegação em `src/lib/`.
4. [ ] **Mensagens:** textos curtos aprovados, títulos e descrições de cada página, rótulos do menu do celular, nos dois idiomas.
5. [ ] **Páginas:** `projetos/page.tsx`, `sobre/page.tsx`, `servicos/page.tsx` e `contato/page.tsx` em `src/app/[locale]/`, só composição, com metadados.
6. [ ] **Inicial:** abertura, projetos em versão curta (componente novo) e chamada final. Chamadas da abertura apontando para Serviços e Contato. Âncoras antigas levando à página certa.
7. [ ] **Menu do computador:** `site-nav.tsx` com links de página e marcação pela rota.
8. [ ] **Menu do celular:** botão e painel no cabeçalho, com os estados fechado e aberto.
9. [ ] **Rodapé, caso e mapa do site:** links do rodapé, volta da página de caso para Projetos, mapa do site e `hreflang` das rotas novas.
10. [ ] **Docs finais:** status dos FDDs, ROADMAP (estrutura feita; 3D em Agora, com `tasks/projects-3d-devices.md`) e `CLAUDE.md`, se a estrutura mudou além do item 1.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: decisões do dono no Stage 1, registradas no item 1
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

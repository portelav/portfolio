# Aparelhos 3D na inicial e em Projetos

**Slug:** `projects-3d-devices`
**Branch:** `feat/projects-3d-devices`
**Seção ou área:** página inicial (projetos curtos) e página Projetos
**Status:** Review
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md`, D46, D64, D65, D79 e D82 a D86
- **FDD:** `docs/fdd/aparelhos-3d.md` (a escrever neste plano); `docs/fdd/projetos.md` e `docs/fdd/pagina-inicial.md` (a ajustar)
- **ADR relacionado:** `docs/adr/0004-movimento-em-css.md`, revisado por um ADR novo, `0005`
- **Referência:** demo aprovada em https://claude.ai/artifact/Lbn7jPyJXF3wahFcNgFnFd, código em `private/rascunhos/3d/aparelhos-3d.html`

### Decisões do dono nesta conversa (2026-11-09), a registrar no PRD
1. No computador, os aparelhos ficam de um lado e o texto do outro, na inicial e em Projetos.
2. O desenho no celular sai de opções que Lucas testa num protótipo antes do código (item 1 do Stage 4).
3. O que aparece com menos movimento ou sem 3D ficou a meu critério ("ignora"). Proposta: os prints parados, como a inicial de hoje, sem baixar o Three.js.
4. O vídeo do Crewz é regravado por dentro do app, como no caso do Crewz: app local, Supabase temporário só com dados de demonstração, banco apagado depois.

### Objetivo
- Quem chega vê os três projetos rodando num notebook e num celular que reagem à rolagem, um jeito de mostrar trabalho real que também conta no currículo.

### Escopo e não-escopo
- **Dentro:** cena 3D com notebook e celular em Three.js, guiada pela rolagem, com o vídeo de cada projeto nas telas. Versão curta na inicial, no lugar de `home-projects.tsx`, e completa em Projetos, com o texto de cada projeto ao lado dos aparelhos. Vídeos em alta resolução (D86) e o Crewz regravado. Prints parados para menos movimento, navegador sem WebGL e sem JavaScript. ADR, PRD, FDDs, ROADMAP e `CLAUDE.md`.
- **Fora:** nome em 3D e fundo em shader (D85). Modelo 3D baixado de terceiro. Páginas de caso: continuam com os prints próprios. Lançamento.

### Critérios de aceite (testáveis)
1. No computador, os aparelhos ficam fixos de um lado enquanto o texto de cada projeto rola do outro, na inicial (nome, tipo, uma linha e "Ver caso") e em Projetos (texto completo e links), em `/` e `/en`, escuro e claro.
2. No celular, o desenho escolhido por Lucas no protótipo, sem transbordo em 360 e 390 px.
3. A rolagem conduz: o notebook abre, o celular fica de pé e os aparelhos trocam de projeto quando o texto dele chega. O Crewz aparece só no celular.
4. Os vídeos tocam só enquanto o texto do projeto está na tela e a seção está visível. Um botão de 44 px pausa vídeos e balanço, e a pausa vale para a página toda (WCAG 2.2.2).
5. O Three.js e os vídeos só baixam depois do preloader e perto da seção. Abrir outra página não baixa nada disso.
6. Com `prefers-reduced-motion`, sem WebGL ou sem JavaScript, aparecem os prints parados com o mesmo texto e os mesmos links, e o Three.js não baixa.
7. Fluidez: média de 50 quadros por segundo ou mais no Chrome do computador. Com CPU 4× mais lenta, sem travadas longas. Teste no celular de Lucas.
8. Vídeos em 1080×1920 no celular e 1920×1200 no computador, cerca de 1,2 MB cada, sem metadado. O do Crewz mostra o app por dentro, só com dados de demonstração.
9. Texto e links em HTML por cima da cena, alcançáveis pelo teclado, com foco visível. Todo texto nos arquivos de mensagens, nos dois idiomas. Lint, typecheck e build verdes.
10. Nenhum deslocamento de layout quando a cena carrega: o espaço dela fica reservado desde o começo.

### Perguntas bloqueadoras
- Nenhuma que pare o plano. O desenho do celular é decidido por Lucas no item 1 do Stage 4, antes de qualquer código do site.

### Premissas
- O mesmo componente serve às duas páginas, com texto curto na inicial e completo em Projetos.
- Os cartões de texto seguem o `DESIGN.md`: raio 0, borda de 1 px em `--line`, sem numeração como "01 ·". O desfoque atrás do cartão está liberado (D84).
- O Three.js entra pelo npm, numa versão publicada há pelo menos duas semanas, carregado com `import()` só no navegador. Nada de CDN.
- Os aparelhos continuam desenhados em código, como na demo. A cena roda num módulo próprio, sem React, que o componente liga e desliga.
- O botão de pausa reaproveita os textos "Pausar vídeo" e "Tocar vídeo" que já existem, se couberem; se não, entram textos novos no FDD.
- `ProjectMedia` e `ProjectVideo` saem se ficarem sem uso.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `private/rascunhos/3d/aparelhos-3d.html` | Cena aprovada: notebook e celular em código, sombras, reflexo, textura de vídeo atualizada por `requestVideoFrameCallback`, resolução que cai sozinha se os quadros ficam lentos, linha do tempo pela rolagem, palco `sticky` com quatro passos de texto por cima |
| `docs/PRD.md` (D82 a D86) | 3D liberado, desfoque liberado, vídeos em alta e Crewz regravado. D64: vídeos só depois do preloader e perto da tela |
| `docs/adr/0004-movimento-em-css.md` | Movimento só em CSS e APIs do navegador. Diz que biblioteca nova pede ADR novo |
| `src/components/home-projects.tsx` | Versão curta de hoje, com prints e "Ver caso". O comentário já prevê a troca pelos aparelhos |
| `src/components/projetos.tsx` e `project-video.tsx` | Cartões completos, com print, vídeo, botões de versão e pausa que vale para todos os vídeos; vídeo só depois do preloader (`data-reescrita`) |
| `docs/design/DESIGN.md` (seções 6 e 9) | Raio 0, borda só quando separa, nada de "01 /", nada de cards iguais lado a lado |
| `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md` | `import()` de biblioteca externa sob demanda num Client Component |

### Fluxo atual
- A inicial mostra os três prints em sequência, cada um com nome, tipo, uma linha e "Ver caso". Projetos mostra os cartões completos, com print, vídeo e botões de versão. O 3D existe só na demo privada.

---

## Stage 3 — Architecture Planning

### Source of Truth (até 4 blocos)
1. **Cena:** um módulo em `src/lib/` com os aparelhos, os materiais, a textura de vídeo e a linha do tempo da rolagem, sem React. Recebe o palco, as mídias e o progresso.
2. **Seção:** um Client Component que monta o palco fixo, os passos de texto em HTML, os prints parados de reserva e o botão de pausa, e carrega a cena com `import()` quando chega a hora.
3. **Dados e textos:** `src/lib/projects.ts` com os vídeos de cada projeto e as mensagens de hoje (`Projects`, `HomeProjects`).
4. **Decisões:** ADR 0005 (Three.js) e PRD (lado a lado no computador, desenho do celular, reserva parada).

### Decisão única
- Um componente de aparelhos com palco fixo e passos de texto, usado na inicial com texto curto e em Projetos com texto completo, com a cena Three.js carregada só no navegador, depois do preloader e perto da seção.

### Checklist de arquitetura (até 10)
- [ ] Next.js 16: a cena só no cliente, por `import()` dentro de um Client Component. O texto renderiza no servidor.
- [ ] Peso: o Three.js fica fora do primeiro carregamento. Medir o tamanho do pedaço novo no build.
- [ ] Movimento: rolagem e troca em `transform` dentro do WebGL. Balanço e vídeos com pausa (WCAG 2.2.2). Menos movimento leva aos prints.
- [ ] Teclado e leitor de tela: o canvas é decorativo (`aria-hidden`), e o conteúdo fica no HTML.
- [ ] Tokens: cor de borda e destaque lidas do CSS (`--line`, `--accent`), atualizadas ao trocar de tema.
- [ ] Desempenho: textura de vídeo sem mipmap, sombra redesenhada só quando algo mexe, resolução adaptativa, nada desenhado fora da tela.
- [ ] Memória: ao sair da página, a cena libera geometrias, texturas, vídeos e o contexto WebGL.
- [ ] Mídia nova sem metadado (`ffmpeg -map_metadata -1`, conferido com `exiftool`).
- [ ] Nenhum cookie e nenhum dado de terceiro: o Crewz só com dados de demonstração (D65).
- [ ] Sem deslocamento de layout: palco com altura reservada antes da cena.

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`. Antes de cada commit, explicar a Lucas o que a mudança faz.

1. [x] **Protótipo do celular (fora do git):** a demo privada ganha um seletor com três desenhos para o celular: (A) aparelhos em cima e texto passando por cima, como hoje; (B) aparelhos na metade de cima e texto na metade de baixo, sem sobrepor; (C) uma cena por projeto, sem palco fixo, com o texto embaixo. O computador já mostra o lado a lado. **Parar aqui até Lucas escolher.** Escolhido em 2026-11-09: A, texto por cima (D89).
2. [x] **ADR e PRD:** `docs/adr/0005-threejs-aparelhos.md`, que revisa o 0004. PRD com as decisões 1 a 4 do Stage 1 e o desenho escolhido. `CLAUDE.md` com o Three.js na tabela da stack.
3. [x] **FDD:** `docs/fdd/aparelhos-3d.md` novo (layout, estados, rolagem, pausa, reserva parada, textos); ajustes em `projetos.md` e `pagina-inicial.md`. **Parar até Lucas aprovar textos novos, se houver.** Três textos aprovados em 2026-11-09.
4. [x] **Dependência:** `three` e `@types/three`, versão fixa publicada há pelo menos duas semanas.
5. [x] **Mensagens:** textos novos do FDD nos dois idiomas, se houver.
6. [x] **Cena:** módulo em `src/lib/` portado da demo, com montagem, linha do tempo, troca de vídeo, pausa, tema e limpeza.
7. [x] **Componente:** seção com palco, passos, prints de reserva, botão de pausa e carga da cena depois do preloader e perto da tela.
8. [x] **Páginas:** inicial com a versão curta no lugar de `home-projects.tsx`; Projetos com a versão completa no lugar dos cartões de mídia. Remover o que ficar sem uso.
9. [x] **Mídia:** vídeos em alta resolução da landing e do DraftCS em `public/projetos/video/`, sem metadado. Crewz regravado com o app local e Supabase temporário, e o banco apagado depois.
10. [x] **Docs finais:** status dos FDDs, ROADMAP e `CLAUDE.md`.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: decisões do dono no Stage 1; o desenho do celular para no item 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| Camada | Arquivo | Status |
|---|---|---|
| Decisões | `docs/adr/0005-threejs-aparelhos.md`, `docs/adr/README.md`, `docs/PRD.md` (D88 a D91), `CLAUDE.md` | criado / modificado |
| Spec | `docs/fdd/aparelhos-3d.md` (implementado), `docs/fdd/projetos.md`, `docs/fdd/pagina-inicial.md`, `docs/fdd/README.md` | criado / modificado |
| Dependência | `package.json`, `package-lock.json`: `three` 0.186.1, `@types/three` 0.186.0 | modificado |
| Mensagens | `messages/pt-BR.json`, `messages/en.json`: `Devices` (três textos); sai `Projects.landing.caseLabel`, sem uso | modificado |
| Cena | `src/lib/devices-scene.ts` | criado |
| Componentes | `src/components/devices.tsx`, `src/components/devices-stage.tsx`, `src/lib/after-preloader.ts` | criado |
| Componentes | `src/components/project-video.tsx` (usa `after-preloader`), `src/app/globals.css` (seção `.devices-*`) | modificado |
| Páginas | `src/app/[locale]/page.tsx`, `src/app/[locale]/projetos/page.tsx` | modificado |
| Removidos | `src/components/home-projects.tsx`, `src/components/projetos.tsx` | removido |
| Mídia | `public/projetos/video/{landing,draftcs}.mp4` (1920 × 1200), `public/projetos/video/celular/{landing,draftcs,crewz}.mp4` (1080 × 1920) | modificado |
| Docs | `docs/ROADMAP.md` | modificado |

### Desvios

- **Celular, opção A:** o cartão começa a 58% da altura da tela e sobe passando por cima dos aparelhos, em vez de parar no pé da tela, porque o cartão completo de Projetos tem até 561 px em 390 px de largura e cobria a cena. A linha do tempo passou a medir a posição real de cada passo. FDD ajustado (`ad7e078`).
- **Botão de pausa:** fica no canto de cima no celular, abaixo do cabeçalho, porque os cartões ocupam a parte de baixo. O nome muda com a ação, sem `aria-pressed`, para não anunciar duas vezes o mesmo estado.
- **Textura de vídeo:** o Three.js 0.186 aloca uma `Texture` comum pela largura do elemento, que um `<video>` não tem, e as telas ficavam pretas. A cena usa `VideoTexture`.
- **Transição de mídia para o caso:** sai o morph do print para a capa do caso (D69), porque a seção não tem mais print fixo. A troca de página continua empurrando a página (D71).
- **Link "Ver caso completo" em Projetos:** cada projeto passa a ter nome próprio para o leitor de tela. Antes, os três usavam o nome da landing.
- **Vídeo do Crewz:** gravado quadro a quadro em 1080 × 1920 (o screencast do Chrome entrega só 360 × 640). As trocas de tela são cortes. O roteiro ganhou a aba Pessoas, porque a página do grupo não liga ao perfil de quem participa. Lucas viu o vídeo antes do commit.

---

## Stage 7 — Tests

- `npm run lint`, `npm run typecheck` e `npm run build`: verdes.
- Build: o Three.js fica num pedaço próprio, de 578 KB, ou 144 KB com gzip, pedido só pelo `import()` da seção.

| Critério | Como foi verificado |
|---|---|
| 1. Computador, texto à esquerda, aparelhos à direita | Chrome 1440 × 900, `/en` e `/projetos`, escuro e claro: cartão à esquerda, aparelhos à direita, vídeos nas telas |
| 2. Celular, opção A, sem transbordo | Chrome 390 × 844 a 3x: `scrollWidth` 390 em `/projetos`; cartões por cima dos aparelhos, Crewz no fim |
| 3. Rolagem conduz, Crewz só no celular | Prints nos passos 0, 1, 2 e 3: notebook fechado e aberto, celular de pé, notebook fecha no Crewz |
| 4. Vídeo só com o projeto na tela, pausa vale para a página | Pausa troca o nome para "Resume motion"; ao ir a Sobre e voltar, o botão volta em "Resume motion" |
| 5. Nada baixa antes do preloader | Em `/en`, nenhum pedido de `three` ou `.mp4` enquanto `data-reescrita` existe; depois, só os vídeos do projeto atual e do seguinte |
| 6. Menos movimento leva aos prints | Com `prefers-reduced-motion`, palco `display: none`, prints visíveis, nenhum canvas, Three.js não baixa |
| 7. Fluidez | Rolagem automática pelos quatro passos em 6 s: 60 quadros por segundo, nenhuma travada acima de 50 ms; com CPU 4× mais lenta, 60 e pior quadro de 17 ms (servidor de desenvolvimento) |
| 8. Vídeos em HD, sem metadado | `ffprobe`: 1920 × 1200 e 1080 × 1920, sem áudio, sem tag de autor, aparelho ou encoder; cerca de 1 a 1,27 MB |
| 9. Texto em HTML, teclado, mensagens | Cartões e links em HTML por cima do canvas `aria-hidden`; textos nos arquivos de mensagens |
| 10. Sem deslocamento | Palco com `100svh` reservado no CSS desde o primeiro quadro; a escolha entre palco e prints sai do CSS |

---

## Stage 8 — Verification

- Chrome do MCP, servidor de desenvolvimento local:
  - 1440 × 900, escuro, `/projetos`: cena pronta em menos de 4 s, seção com 3600 px (4 telas), vídeos tocando nas telas, console sem aviso.
  - 390 × 844, `/projetos`: passos de 844, 1093, 952 e 931 px, cartão a 58% da tela, sem transbordo.
  - 1440 × 900, claro, `/en`: preloader, depois a cena; DraftCS no notebook e no celular.
  - 390 × 844 com menos movimento, `/`: prints e textos curtos, sem canvas.
  - Troca de página: ao ir a Sobre o canvas sai, e ao voltar sobra um canvas só.
- Gravação do Crewz: cópia temporária do app, Supabase local em projeto próprio (`portfolio-video`), seed de demonstração, grupo da altinha apagado, conta fictícia da Camila em modo claro. Depois: `supabase stop --no-backup`, nenhum contêiner nem volume restante, cópia e perfil de Chrome apagados, Docker fechado. O banco local do Crewz e o repositório dele não foram tocados.
- Falta: teste de Lucas no celular dele (fluidez real e vídeos nas telas) e a prévia da Vercel.

---

## Stage 9 — Walkthrough

> Data: 2026-11-09

### Resumo
- **Veredito:** WARNINGS
- **Arquivos analisados:** 29
- **Findings:** 0 críticos, 4 avisos

### Checklist
| Item | Status | Observação |
|---|---|---|
| Escopo | OK | Só o previsto no Stage 4. O "colar" em cada projeto e a nitidez das telas entraram a pedido de Lucas, depois da prévia (`82f3356`, `071de01`, `dba43d1`) |
| Next.js 16 | OK | Cena só no cliente, por `import()` em `devices-stage.tsx`; `devices.tsx` renderiza no servidor; páginas só compõem |
| Segredos | OK | Nenhuma variável nova. O `.env.local` da gravação ficou na cópia temporária do Crewz, apagada |
| Comportamento × FDD e PRD | OK | `aparelhos-3d.md` implementado; D88 a D91 atendidas; desvios no Stage 6 e no FDD |
| Decisões fora do PRD | OK | Desenho do celular escolhido por Lucas (D89); reserva parada deixada a critério e registrada (D90) |
| Cookies, terceiros, autorização | OK | Nenhum cookie. Crewz só com o seed de demonstração, sem o grupo da altinha; landing com a recepcionista já autorizada |
| Textos | OK | Três textos novos em `Devices`, nos dois idiomas; nenhum texto fixo em componente |
| Repositório público | OK | Vídeos sem áudio e sem tag de autor, aparelho ou encoder; nenhuma nota interna |
| Tokens e "O que não fazer" | OK | Raio 0, borda de 1 px em `--line` só no cartão, sem numeração, cor da cena lida de `--accent` |
| Marca | OK | Cabeçalho intocado |
| 390 px e computador, `/` e `/en`, escuro e claro | OK | Conferido no Chrome do MCP; Lucas viu no celular e no PC |
| Toque, foco, alternativo, contraste | OK | Pausa de 44 px com nome no idioma; links em HTML; prints com `alt`; canvas `aria-hidden` |
| Movimento | OK | Pausa para vídeos e balanço (WCAG 2.2.2); menos movimento leva aos prints; a rolagem não muda de velocidade |
| Desempenho | OK | Three.js em pedaço próprio (144 KB com gzip), só perto da seção e depois do preloader; 60 quadros por segundo; palco reservado no CSS |
| lint, typecheck, build | OK | Verdes no último commit |
| Commits | OK | 21 commits, Conventional Commits, títulos até 72 caracteres, nenhuma menção a IA |
| `.env.example` | N/A | Nenhuma variável nova |
| Docs | OK | ADR 0005, PRD D88 a D91, FDDs, ROADMAP e `CLAUDE.md` |

### Findings
#### Critical
- Nenhum.

#### Warnings
- A ida da inicial ou de Projetos para o caso perdeu o print que crescia até a capa (D69), porque a seção não tem mais print fixo; a página continua sendo empurrada (D71). O desvio está no Stage 6, mas não no PRD — `docs/PRD.md`, D69 — registrar numa linha, junto da D88, na próxima mudança de docs.
- Sem WebGL, a troca do palco para os prints acontece depois da hidratação, com um deslocamento de layout. É raro e está aceito no FDD — `src/components/devices-stage.tsx:73` — nada a fazer agora.
- O Chrome mostra uma vez o aviso "texImage2D: no video" quando a cena monta, antes do primeiro quadro do vídeo. Não afeta a imagem — `src/lib/devices-scene.ts` (`videoScreen`) — pode ser silenciado depois, criando a textura só após `loadeddata`.
- Falta a medida no celular real de Lucas, com a pausa de 40% de tela em cada projeto. As medidas de fluidez foram no Chrome do computador, no servidor de desenvolvimento.

#### Positive
- A cena libera geometrias, materiais, texturas, vídeos e o contexto WebGL ao sair da página. Voltar deixa um canvas só.
- A escolha entre palco e prints sai do CSS (`html[data-js]` e `prefers-reduced-motion`), sem esperar o JavaScript.
- A causa das telas pretas, a textura comum dimensionada pelo atributo `width` do vídeo no Three.js 0.186, foi achada e corrigida com `VideoTexture`.
- O link "Ver caso completo" passou a ter nome próprio em cada projeto. Antes, os três usavam o nome da landing.
- A gravação do Crewz usou projeto Supabase próprio, apagado com `--no-backup`, sem tocar no banco local nem no repositório do Crewz.

### Verificações executadas
- `npm run lint`, `npm run typecheck` e `npm run build`: verdes.
- `git log --format=%B main..HEAD | grep -ciE "co-authored|generated with|claude"`: 0.
- Títulos de commit acima de 72 caracteres: nenhum.
- `git diff main...HEAD -- src` sem `NEXT_PUBLIC`, `process.env`, cookie ou `localStorage` novos.
- Chrome do MCP, depois do "colar": em 390 px, o cartão fica parado a 241 px do topo por cerca de 340 px de rolagem e depois segue; em 1440 px, 60 quadros por segundo na rolagem automática, pior quadro de 33 ms, canvas em 2137 × 1350 (1,5×), texto dos vídeos legível nas telas.

**Gate S9 — WARNINGS**

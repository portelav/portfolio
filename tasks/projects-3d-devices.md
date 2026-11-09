# Aparelhos 3D na inicial e em Projetos

**Slug:** `projects-3d-devices`
**Branch:** `feat/projects-3d-devices`
**Seção ou área:** página inicial (projetos curtos) e página Projetos
**Status:** Planning
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
3. [ ] **FDD:** `docs/fdd/aparelhos-3d.md` novo (layout, estados, rolagem, pausa, reserva parada, textos); ajustes em `projetos.md` e `pagina-inicial.md`. **Parar até Lucas aprovar textos novos, se houver.**
4. [ ] **Dependência:** `three` e `@types/three`, versão fixa publicada há pelo menos duas semanas.
5. [ ] **Mensagens:** textos novos do FDD nos dois idiomas, se houver.
6. [ ] **Cena:** módulo em `src/lib/` portado da demo, com montagem, linha do tempo, troca de vídeo, pausa, tema e limpeza.
7. [ ] **Componente:** seção com palco, passos, prints de reserva, botão de pausa e carga da cena depois do preloader e perto da tela.
8. [ ] **Páginas:** inicial com a versão curta no lugar de `home-projects.tsx`; Projetos com a versão completa no lugar dos cartões de mídia. Remover o que ficar sem uso.
9. [ ] **Mídia:** vídeos em alta resolução da landing e do DraftCS em `public/projetos/video/`, sem metadado. Crewz regravado com o app local e Supabase temporário, e o banco apagado depois.
10. [ ] **Docs finais:** status dos FDDs, ROADMAP e `CLAUDE.md`.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: decisões do dono no Stage 1; o desenho do celular para no item 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

*(Preenchido pelo exec.)*

---

## Stage 7 — Tests

*(Preenchido pelo exec.)*

---

## Stage 8 — Verification

*(Preenchido pelo exec.)*

---

## Stage 9 — Walkthrough

*(Preenchido pelo walkthrough.)*

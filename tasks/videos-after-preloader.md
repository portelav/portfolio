# Vídeos depois do preloader

**Slug:** `videos-after-preloader`
**Branch:** `fix/videos-after-preloader`
**Seção ou área:** Projetos
**Status:** Execution
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md`, D60, D63 e D64
- **FDD:** `docs/fdd/projetos.md`

### Objetivo
- Os três vídeos deixam de baixar junto com o JavaScript, em 4G lento, e deixam de gastar dados de quem não rola até eles.

### Escopo e não-escopo
- **Dentro:** quando cada vídeo começa a baixar.
- **Fora:** preloader, entrada do conteúdo, arquivos de vídeo e a meta de LCP, já aceita na D63.

### Critérios de aceite (testáveis)
1. Nenhum `mp4` é pedido antes do fim do preloader.
2. Depois do preloader, só baixam os vídeos a até uma tela de distância.
3. O vídeo continua tocando com 60% na tela, e pausa ao sair.
4. Com `prefers-reduced-motion`, nenhum vídeo toca sozinho, e o botão aparece.
5. A pausa de um vídeo continua valendo para os outros, e o botão aparece neles.
6. `lint`, `typecheck` e `build` verdes.

### Perguntas bloqueadoras
- Nenhuma. Lucas pediu a mudança em 2026-11-05.

---

## Stage 4 — Execution Planning

1. [x] `docs/fdd/projetos.md` e `docs/PRD.md`, com a D64.
2. [ ] `src/components/project-video.tsx`: `preload="none"`, e os observadores só ligam depois do preloader.
3. [ ] Medir pedidos de rede e LCP no build de produção, em 390 px e 4G lento.

# Vídeos depois do preloader

**Slug:** `videos-after-preloader`
**Branch:** `fix/videos-after-preloader`
**Seção ou área:** Projetos
**Status:** Done (PR #6 mergeado em 2026-11-05)
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
2. [x] `src/components/project-video.tsx`: `preload="none"`, e os observadores só ligam depois do preloader.
3. [x] Medir pedidos de rede e LCP no build de produção, em 390 px e 4G lento.

---

## Stage 7 — Testes

Build de produção local, em 2026-11-05, com contexto limpo do navegador e 4G lento simulado.

| Tela | Página | Fim do JS | Primeiro vídeo pedido | LCP |
|---|---|---|---|---|
| 390 px | `/` | 3,79 e 3,22 s | 5,22 e 5,28 s | 6,38 e 6,44 s |
| 390 px | `/en` | 3,16 s | 5,21 s | 6,37 s |
| 1350 px | `/` | 3,23 s | 5,26 s | 6,44 s |

- O LCP não muda: o build local já media de 6,36 a 6,64 s, e o preloader continua mandando nesse número.
- Em 390 px, só o vídeo do primeiro caso baixa ao fim do preloader. Os outros dois só baixam com a rolagem.
- Em 1350 px, os três baixam ao fim do preloader, porque todos estão a até uma tela de distância.
- Em 390 px, o primeiro vídeo toca com 60% na tela, a pausa vale para o segundo, e o botão aparece nele e o retoma. Toca um por vez.
- Com `prefers-reduced-motion`, em `/en`, nenhum vídeo toca sozinho, e o botão aparece e toca o vídeo.
- Trocar o `preload` antes de `load()` gera um pedido cancelado em cerca de 2 ms em cada vídeo, sem dado baixado.
- O único erro no console é o 404 de `/_vercel/insights/script.js`, que só existe na Vercel.
- `lint`, `typecheck` e `build` verdes.
- Lucas aprovou na prévia, e o PR #6 entrou na `main` em 2026-11-05, junto com o Crewz por dentro do app e a escolha entre celular e computador.

### Em produção, depois do merge

Medido em 2026-11-05, em `https://portelav-site.vercel.app`, em 390 px e 4G lento simulado, com contexto limpo do navegador.

| Página | Fim do JS | Primeiro vídeo pedido | LCP | Elemento |
|---|---|---|---|---|
| `/` | de 3,24 a 3,29 s | de 5,33 a 5,35 s | 6,26 s, nas três medições | título |
| `/en` | 3,29 s | 5,34 s | 6,25 s | título |

- O JavaScript termina cerca de 1,2 s antes do que media em produção antes da mudança, de 4,43 a 4,49 s.
- Os vídeos do DraftCS e do Crewz não baixaram sem rolagem.
- O LCP fica abaixo da faixa aceita na D63, de 6,5 a 6,8 s. Parte da queda vem da troca do elemento medido: o título passou a ser o maior na tela, porque o print do primeiro caso desceu.
- `noindex` continua na página.

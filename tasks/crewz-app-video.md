# Print e vídeo do Crewz por dentro do app

**Slug:** `crewz-app-video`
**Branch:** `feat/crewz-app-video-light`
**Seção ou área:** Projetos
**Status:** Done (PR #6 mergeado em 2026-11-05)
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md`, D65
- **FDD:** `docs/fdd/projetos.md`, regra 6

### Objetivo
- O caso do Crewz mostra o app em uso, no lugar da landing.

### Escopo e não-escopo
- **Dentro:** print e vídeo do Crewz nas duas telas, o texto alternativo nos dois idiomas e a escolha entre celular e computador na landing e no DraftCS (PRD, D66).
- **Fora:** vídeos da landing e do DraftCS, e o carregamento dos vídeos (PRD, D64).

### Critérios de aceite (testáveis)
1. O vídeo mostra início, busca por "pedal", grupo e perfil, em cerca de 10 s, sem áudio e sem metadado.
2. Aparecem só as pessoas fictícias e as fotos de licença livre dos dados de demonstração. O grupo da altinha fica de fora.
3. Dimensões iguais às do FDD para celular: vídeo de 540 x 960 e print de 780 x 1170. No computador, a mesma mídia, do tamanho do app, centrada e com a altura dos outros casos.
4. Na landing e no DraftCS, dois botões trocam print e vídeo, em qualquer tela, sem transbordo. Começam na versão da tela.
5. `lint`, `typecheck` e `build` verdes.

### Perguntas bloqueadoras
- Nenhuma. Lucas aprovou o roteiro em 2026-11-05.

---

## Stage 4 — Execution Planning

1. [x] `docs/fdd/projetos.md` e `docs/PRD.md`, com a D65.
2. [x] Gravar com o Crewz local, em Supabase temporário, só com os dados de demonstração.
3. [x] Trocar print e vídeo, e o texto alternativo em pt-BR e inglês.
4. [x] Conferir no site, em 390 px e 1350 px.

---

## Stage 7 — Testes

Build de produção local, em 2026-11-05.

- Como foi gravado: Crewz em build de produção, Supabase local em projeto temporário, sem a nuvem, com o grupo da altinha apagado desse banco. Conta fictícia da Camila. Gravado nos dois temas, e Lucas escolheu o claro.
- O projeto temporário foi removido depois, e o banco local antigo do Crewz não foi tocado.
- Vídeo de 425 KB, H.264, sem faixa de áudio. Print sem EXIF nem XMP.
- Em 390 px, em `/`: toca o vídeo de celular com 60% na tela, e a parte de baixo fica cortada, como nos outros casos.
- Em 1350 px: o caso usa a mídia de celular, do tamanho do app, a pedido de Lucas, que preferiu cortar as margens vazias do vídeo de computador.
- Os quadros foram revistos por amostra, de cerca de 1 por segundo, e o roteiro só passa pelas quatro telas.
- `lint`, `typecheck` e `build` verdes.
- Escolha entre celular e computador, em 1350 px na landing e em 390 px no DraftCS: troca print e vídeo, com um print e um vídeo por vez, toca depois da troca e não transborda. Deslocamento de layout 0 em `/` a 1350 px.
- O teste achou chaves repetidas entre o print e o vídeo, que deixavam o print antigo na tela. Corrigido antes do commit.
- O print do Crewz virou `crewz-app.webp`, porque o cache local de imagens ainda servia a landing no endereço antigo. Sem esse cuidado, o mesmo poderia ocorrer para quem já visitou o site.
- No celular, nome e tipo vêm antes dos botões e da mídia, a pedido de Lucas, para os botões não saírem do lugar ao trocar a versão.
- Falta: revisão de Lucas na prévia e teste em aparelho real.

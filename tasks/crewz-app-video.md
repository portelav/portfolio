# Print e vídeo do Crewz por dentro do app

**Slug:** `crewz-app-video`
**Branch:** `feat/crewz-app-video`
**Seção ou área:** Projetos
**Status:** Execution
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md`, D65
- **FDD:** `docs/fdd/projetos.md`, regra 6

### Objetivo
- O caso do Crewz mostra o app em uso, no lugar da landing.

### Escopo e não-escopo
- **Dentro:** print e vídeo do Crewz nas duas telas, e o texto alternativo nos dois idiomas.
- **Fora:** vídeos da landing e do DraftCS, e o carregamento dos vídeos (PRD, D64).

### Critérios de aceite (testáveis)
1. O vídeo mostra início, busca por "pedal", grupo e perfil, em cerca de 10 s, sem áudio e sem metadado.
2. Aparecem só as pessoas fictícias e as fotos de licença livre dos dados de demonstração. O grupo da altinha fica de fora.
3. Dimensões iguais às do FDD para celular: vídeo de 540 x 960 e print de 780 x 1170. No computador, a mesma mídia, do tamanho do app, centrada e com a altura dos outros casos.
4. `lint`, `typecheck` e `build` verdes.

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

- Como foi gravado: Crewz em build de produção, Supabase local em projeto temporário, sem a nuvem, com o grupo da altinha apagado desse banco. Conta fictícia da Camila. Tema escuro.
- O projeto temporário foi removido depois, e o banco local antigo do Crewz não foi tocado.
- Vídeo de 434 KB, H.264, sem faixa de áudio. Print sem EXIF nem XMP.
- Em 390 px, em `/`: toca o vídeo de celular com 60% na tela, e a parte de baixo fica cortada, como nos outros casos.
- Em 1350 px: o caso usa a mídia de celular, do tamanho do app, a pedido de Lucas, que preferiu cortar as margens vazias do vídeo de computador.
- Os quadros foram revistos por amostra, de cerca de 1 por segundo, e o roteiro só passa pelas quatro telas.
- `lint`, `typecheck` e `build` verdes.
- Falta: revisão de Lucas na prévia.

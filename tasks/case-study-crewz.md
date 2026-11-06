# Página de caso do Crewz

**Slug:** `case-study-crewz`
**Branch:** `feat/case-study-crewz`
**Seção ou área:** Página de caso e Projetos
**Status:** Review
**Gate S2:** Livre (Lucas aprovou os prints da aba Grupos em 2026-11-06)

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** D3, D40, D41, D50, D65, D67, D76 e D77.
- **FDD:** `docs/fdd/caso.md` (existe; ganha o conteúdo do Crewz e versões só com print de celular).
- **ADR relacionado:** nenhum.

### Objetivo
- Quem abre "Ver caso completo" no Crewz lê como a rede social foi feita: a origem, o público, a privacidade, as decisões, o método, o caminho, o resultado, o aprendizado e o próximo passo.

### Escopo e não-escopo
- **Dentro:** `/projetos/crewz` e `/en/projects/crewz`; "Ver caso completo" no card do Crewz; textos em pt-BR e inglês; prints do caminho só no celular, porque o Crewz é app de celular (PRD, D65); "Próximo passo" (nome, domínio, monetização e divulgação).
- **Fora:** a faculdade, que não é citada, por decisão do dono; números de usuários, que não existem; a decisão 7 da lista (app instalável), que Lucas deixou de fora.

### Critérios de aceite (testáveis)
1. O card do Crewz tem "Ver caso completo", que abre o caso no mesmo idioma, com a transição dos outros casos.
2. `/projetos/crewz` e `/en/projects/crewz` abrem; os casos da landing e do DraftCS ficam iguais.
3. O caminho mostra só prints de celular, sem o grupo "No computador".
4. Prints só com os dados de demonstração do Crewz: pessoas fictícias e fotos de licença livre, sem o grupo da altinha (como na D65). Lucas aprova os prints antes de entrarem.
5. Textos das respostas de Lucas (`private/crewz-caso.md`) e de fatos do repositório do Crewz, sem número inventado.
6. Em 390 px e 1350 px, escuro e claro, `/` e `/en`, sem transbordo; metadados próprios e `noindex`.

### Perguntas bloqueadoras
- Nenhuma. Lucas aprovou os prints da aba Grupos (21/09, 25/09 e no ar) em 2026-11-06.

### Premissas
- Respostas de Lucas em 2026-11-06: origem (Vinicius em Dubai, jiu-jítsu e moto, sem achar gente), público, privacidade exigida pelo Google, decisões 1, 2, 3, 4, 5, 6 e 8, poucas versões porque o design system de Lucas veio antes, no ar sem usuários e sem divulgação, aprendizado em dupla, próximo passo, AI-Driven Development nas partes dos dois.
- Fatos do repositório do Crewz (`origin/main`, lido em 2026-11-06): primeiro commit em 2026-09-17; design system de Lucas em 2026-09-19; paleta petróleo e creme em 2026-09-24 (ADR 0008); marca Encaixe z em 2026-09-28.
- Autorização do Vinicius para citar, mostrar telas internas e o link (`private/pendencias.md`).

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/caso.md` | Formato do caso; Crewz "no mesmo formato" |
| `src/components/case-study.tsx` | Cada versão exige print de computador; o grupo "No computador" sempre aparece |
| `src/lib/projects.ts` | `CaseStudyData.shots` com `computer` obrigatório; Crewz sem imagem de computador |
| `tasks/crewz-app-video.md` | Como o app foi gravado: build de produção, Supabase local em projeto temporário, só dados de demonstração, conta fictícia |
| `C:\prog\crewz-redesocial\docs\PRD.md` | Decisões das rodadas 1 a 30, privacidade (rodada 21), match (15), níveis e @usuário (25), marca (28) |
| `C:\prog\crewz-redesocial\docs\design\` | Design system de Lucas, a partir do briefing de 2026-09-18 |
| `private/crewz-caso.md` | Respostas de Lucas |

### Fluxo atual
- O card do Crewz só tem "Ver site". `/projetos/crewz` dá 404.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Conteúdo:** `CaseStudy.crewz` nos arquivos de mensagens.
2. **Estrutura:** `caseStudies.crewz` em `src/lib/projects.ts`, com `computer` opcional nas versões.
3. **Desenho:** `case-study.tsx`, que esconde o grupo "No computador" quando nenhuma versão tem print de computador.
4. **Spec:** `docs/fdd/caso.md`.

### Decisão única
- Tornar o print de computador opcional por versão, em vez de inventar um print de computador para um app de celular.

### Checklist de arquitetura
- [ ] Textos em pt-BR e inglês, sem texto fixo.
- [ ] Casos da landing e do DraftCS iguais.
- [ ] Prints feitos com o Crewz local, Supabase em projeto temporário, só dados de demonstração; o banco local antigo do Crewz não é tocado; Docker e servidores fechados no fim.
- [ ] Prints de 780 x 1170, WebP, sem metadado.
- [ ] Movimento igual ao dos outros casos.
- [ ] Metadados próprios e `noindex`.

---

## Stage 4 — Execution Planning

1. [x] Prints do caminho no celular, na aba Grupos: 21/09 (`6b375054`), 25/09 (`2116b26a`) e no ar (`origin/main`), aprovados por Lucas.
2. [x] FDD `caso.md`: conteúdo do Crewz e versões só de celular.
3. [x] `projects.ts` e `case-study.tsx`: `computer` opcional.
4. [x] Mensagens `CaseStudy.crewz` em pt-BR e inglês, e o Crewz em `caseStudies`.
5. [x] Docs: ROADMAP, `CLAUDE.md`, status.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe e está no checklist
- [x] Decisão de produto coberta: prints aprovados
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

- Prints: Crewz em build de produção, três worktrees temporárias (`6b375054`, `2116b26a` e `origin/main`) contra um Supabase local em projeto próprio (`portfolio-prints`), com o seed de demonstração e sem o grupo da altinha, na conta fictícia da Camila, modo claro, 390 x 585 a 2x. O projeto temporário foi apagado (`supabase stop --no-backup`), o banco local antigo do Crewz não foi tocado, e o Docker foi fechado.
- A tela inicial de 21/09 ainda era provisória, por isso o caminho usa a aba Grupos nas três versões, com aval de Lucas.
- `shots[].computer` ficou opcional; o grupo "No computador" some quando nenhuma versão tem print de computador.
- A faculdade e o número de commits ficam fora do texto.

## Stage 7 — Tests

- `lint`, `typecheck` e `build` verdes; `/projetos/crewz` e `/en/projects/crewz` geradas; `/projetos/outro` dá 404.
- Landing e DraftCS com as mesmas seções de antes; o Crewz sem "No computador" e com "Próximo passo".
- Crewz no computador, escuro: topo com a mídia do app e Projetos marcado no menu; caminho com os três prints.
- Crewz em 390 px, `/en`, claro: sem transbordo do topo ao fim; título, `canonical` e `noindex` próprios.

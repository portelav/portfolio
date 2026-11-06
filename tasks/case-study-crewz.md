# Página de caso do Crewz

**Slug:** `case-study-crewz`
**Branch:** `feat/case-study-crewz`
**Seção ou área:** Página de caso e Projetos
**Status:** Planning
**Gate S2:** Bloqueado até Lucas aprovar os prints do caminho

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
- Aval de Lucas aos prints do caminho.

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

1. [ ] Prints do caminho no celular, de três ou quatro marcos (design system, petróleo e creme, marca nova, no ar), mostrados a Lucas antes de entrar.
2. [ ] FDD `caso.md`: conteúdo do Crewz e versões só de celular.
3. [ ] `projects.ts` e `case-study.tsx`: `computer` opcional.
4. [ ] Mensagens `CaseStudy.crewz` em pt-BR e inglês, e o Crewz em `caseStudies`.
5. [ ] Docs: ROADMAP, `CLAUDE.md`, status.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe e está no checklist
- [ ] Decisão de produto coberta: falta o aval dos prints
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Bloqueado até o aval dos prints.

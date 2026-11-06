# Página de caso do DraftCS

**Slug:** `case-study-draftcs`
**Branch:** `feat/case-study-draftcs`
**Seção ou área:** Página de caso e Projetos
**Status:** Planning
**Gate S2:** Bloqueado (uma pergunta ao dono, abaixo)

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** D3, D40, D41, D50, D67, D76 e D77.
- **FDD:** `docs/fdd/caso.md` (existe; ganha o conteúdo do DraftCS e o formato que serve a mais de um caso).
- **ADR relacionado:** nenhum. Sem mudança de stack.

### Objetivo
- Quem abre "Ver caso completo" no DraftCS lê como o jogo foi feito: a origem, o público, as restrições, as decisões, o método, o caminho, o resultado e o aprendizado de Lucas, no formato da landing.

### Escopo e não-escopo
- **Dentro:** `/projetos/draftcs` e `/en/projects/draftcs`; o link "Ver caso completo" no card do DraftCS; textos em pt-BR e inglês; prints do caminho (desenho original, rebrand e versão no ar), revisados um a um; o componente do caso passa a aceitar o conteúdo de cada caso (decisões, versões e seções opcionais).
- **Fora:** caso do Crewz, que vem depois; a página interna do banco de jogadores (PR #36 do DraftCS), que não é citada, por decisão do dono; números de acesso, que não existem.

### Critérios de aceite (testáveis)
1. O card do DraftCS tem "Ver caso completo", que abre o caso no mesmo idioma com a mesma transição da landing; o caso volta a `/#projetos`.
2. `/projetos/draftcs` e `/en/projects/draftcs` abrem; `/projetos/crewz` continua 404 enquanto não houver caso.
3. O caso da landing fica igual ao de hoje.
4. Todos os textos do DraftCS vêm das respostas de Lucas (`private/draftcs-caso.md`) e de fatos do repositório do DraftCS, sem número inventado.
5. Nenhuma foto ou logo de jogador, time ou campeonato nos prints; nenhum dado de terceiro; mídia sem metadado.
6. Em 390 px e 1350 px, escuro e claro, `/` e `/en`, sem transbordo, toque de 44 px e foco visível.
7. Título, descrição, `canonical` e `hreflang` próprios, com `noindex` como o resto do site.

### Perguntas bloqueadoras
- **"Próximo passo":** a landing tem essa seção (a parte para dentistas). O DraftCS tem um próximo passo, como o lançamento para fora do Brasil ou outro modo de jogo, ou a seção fica de fora nesse caso?

### Premissas
- Fatos do repositório do DraftCS, lidos em 2026-11-06 (`origin/main`): primeiro commit em 2026-06-13, com o nome 13-0; rebrand para draftcs em 2026-06-16; no ar em draftcs.com em 2026-06-19; 20 Majors, 564 jogadores, rating por evento; dados do Kaggle e da Liquipedia (CC-BY-SA), com crédito em `/creditos`; três idiomas (inglês, português e russo); card de resultado em três formatos (feed, quadrado e story).
- O Vinicius autorizou nome, link, imagens e a divisão do trabalho (`private/pendencias.md`, 2026-11-02; confirmado por Lucas em 2026-11-06).
- Os textos são propostos e Lucas revisa no PR, como na landing.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/caso.md` | Formato do caso, ordem das seções, regras de mídia; DraftCS e Crewz "no mesmo formato" |
| `src/components/case-study.tsx` | Feito para a landing: decisões fixas (`phoneFirst`, `sections`, `motion`, `whatsapp`), `referenceUrl` no aprendizado, "Próximo passo" sempre presente, cada versão com print de celular e de computador |
| `src/lib/projects.ts` | `caseStudies` só com `landing`; `CaseId` e `caseIds` derivam dele; DraftCS sem `codeUrl` (repositório privado) |
| `src/components/projetos.tsx` | "Ver caso completo" aparece quando o projeto está em `caseStudies` |
| `C:\prog\13-0-counter-strike\design\` | Quatro referências visuais em `.dc.html`: 18 telas originais (13-0), rebrand, nova home e resultado. Dependem de um `support.js` que não está no repositório |
| `C:\prog\13-0-counter-strike\ROADMAP.md` | Datas de rebrand e de entrada no ar; dados reais; card de resultado; idiomas |
| `private/draftcs-caso.md` | Respostas de Lucas às nove perguntas e às três de 2026-11-06 |

### Fluxo atual
- O card do DraftCS só tem "Ver site". O caso existe só para a landing, e qualquer outro `id` dá 404.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Conteúdo:** `messages/*.json`, em `CaseStudy.draftcs`, com as mesmas chaves de seção da landing.
2. **Estrutura de cada caso:** `caseStudies` em `src/lib/projects.ts`: lista de decisões, versões do caminho (cada uma com print de celular, de computador ou os dois), vídeo de celular, link de referência e "Próximo passo" opcionais.
3. **Desenho:** `case-study.tsx`, um só componente para todos os casos.
4. **Spec:** `docs/fdd/caso.md`.

### Decisão única
- Generalizar `case-study.tsx` pelos dados de `caseStudies`, em vez de criar um componente por caso. A landing passa a declarar as próprias decisões e versões, e o DraftCS declara as dele.

### Checklist de arquitetura
- [ ] Convenções do Next.js 16 mantidas: `params` assíncrono e `generateStaticParams` a partir de `caseIds`.
- [ ] Textos em pt-BR e inglês, sem texto fixo no componente.
- [ ] Grupos de prints só aparecem quando a versão tem aquele formato; legenda e texto alternativo por print.
- [ ] Movimento igual ao da landing: transição de página e mídia do card, só `transform` e `opacity`, sem animação com `prefers-reduced-motion`.
- [ ] Tokens do `DESIGN.md`; prints com borda em `--line`.
- [ ] Prints feitos localmente: as referências `.dc.html` abertas no navegador (sem o `support.js`, conferir se renderizam; se não renderizarem, usar a versão no ar e o histórico do repositório) e draftcs.com, sem conta logada.
- [ ] Nenhuma foto ou logo de jogador, time ou Major; nenhum nick ou nome de pessoa além do Vinicius em destaque.
- [ ] Imagens em WebP, sem metadado (`magick -strip`).
- [ ] Metadados próprios e `noindex`.
- [ ] O caso da landing renderiza igual (mesma ordem, mesmos textos, mesmas imagens).

---

## Stage 4 — Execution Planning

1. [ ] FDD `caso.md`: conteúdo do DraftCS (textos em pt-BR e inglês, versões e prints), formato com seções e versões por caso; PRD, se a resposta sobre "Próximo passo" pedir.
2. [ ] `src/lib/projects.ts` e `case-study.tsx`: caso pelos dados (decisões, versões, seções opcionais), com a landing igual.
3. [ ] Prints do caminho do DraftCS em `public/projetos/caso/draftcs/`, WebP sem metadado, revisados.
4. [ ] Mensagens `CaseStudy.draftcs` em pt-BR e inglês, e o DraftCS em `caseStudies`.
5. [ ] Docs: status do FDD, ROADMAP (caso do DraftCS feito), `CLAUDE.md` (estado atual).

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe e está no checklist
- [ ] Decisão de produto coberta pelo PRD ou pergunta aberta: "Próximo passo" do DraftCS
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Bloqueado até a resposta sobre "Próximo passo".

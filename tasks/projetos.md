# Projetos

**Slug:** `projetos`
**Branch:** `feat/projetos`
**Seção ou área:** seção Projetos
**Status:** Walkthrough
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 6 e 9, Regras de fora; decisões D3, D22, D30, D39, D40 e D41
- **FDD:** `docs/fdd/projetos.md` (escrito neste plano, em rascunho)
- **ADR relacionado:** 0002

### Triagem
- **Área:** Projetos. Está no `docs/ROADMAP.md`, em "Agora".
- **Terceiros e regras de fora:** sim. Imagens da landing, do DraftCS e do Crewz, nome do coautor e as regras de publicidade odontológica. Autorizações em `private/`.
- **Trivial?** Não.
- **ADR novo?** Não.
- **PRD cobre?** Sim, com D39 a D41. O FDD pede aprovação.

### Objetivo
- Mostrar os três projetos reais, abrir cada um e fazer a chamada "Ver projetos" funcionar.

### Escopo e não-escopo
- **Dentro:** seção, textos, prints otimizados, links e ajuste de rolagem para a âncora.
- **Fora:** página por caso, telas internas e a seção Contato.

### Critérios de aceite (testáveis)
Os da seção "Critérios de aceite" de `docs/fdd/projetos.md`.

### Perguntas bloqueadoras
- Nenhuma. Respondidas por Lucas em 2026-11-02: FDD, textos e inglês aprovados, e linha do CRO mantida. O layout final pode ser ajustado no preview.

### Premissas
- A licença das fotos do print do Crewz está resolvida: `public/landing/CREDITS.md` daquele projeto registra as fotos do mosaico como Unsplash, com licença livre. O print não precisa de recorte.
- A autorização da Dra. Thaiane cobre o print do consultório, segundo Lucas.
- `crewz-ashy.vercel.app` é o link público combinado com o coautor, segundo Lucas.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/projetos.md` | Spec desta entrega |
| `docs/PRD.md` | Casos, links, regras do CFO e riscos de autoria |
| `docs/design/DESIGN.md` | Sem três cards iguais, tom de voz, princípio 4, Red Hat Mono em dado real |
| `src/components/abertura.tsx` | `#projetos` e `#contato` já apontam para as seções, e `data-abertura` é observada pelo cabeçalho |
| `src/components/header-name.tsx` | Nome entra no cabeçalho quando a abertura sai da tela |
| `private/pendencias.md` | Autorizações e divisão do trabalho, fora do git |
| Projeto Crewz, `public/landing/CREDITS.md` | Fotos do mosaico com Unsplash License |

### Fluxo atual
- A página tem só a abertura. "Ver projetos" não leva a lugar nenhum, e o nome não chega a aparecer no cabeçalho da página inicial.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Dados:** `src/lib/projects.ts`, com URLs, imagem e dimensões de cada caso, sem texto.
2. **Textos:** `messages/*.json`, namespace `Projects`, com `t.rich` para o link do nome.
3. **Componente:** `src/components/projetos.tsx`, de servidor, com `next/image`.
4. **Mídia:** `public/projetos/*.webp`, geradas dos prints aprovados, sem metadado.

### Decisão única
- **Lista vertical sem card.** Evita o padrão dos "três cards lado a lado", vetado no `DESIGN.md`, e dá espaço para o print, que é a prova do trabalho.

### Checklist de arquitetura
- [ ] Nenhum `"use client"` novo
- [ ] Textos nos dois idiomas, com a checagem de chaves iguais
- [ ] Links com 44 px, foco visível e nome distinto por caso
- [ ] Nenhuma animação
- [ ] Tokens do `DESIGN.md`, sem cor nova e sem nada de "O que não fazer"
- [ ] Sem cookie. Nenhum recurso de outra origem carregado
- [ ] Mídia sem metadado, e a landing sem telefone, sem antes e depois e sem paciente
- [ ] Dimensões reservadas, carga preguiçosa
- [ ] Rolagem para `#projetos` com folga para o cabeçalho
- [ ] Original da landing com telefone nunca entra no repositório

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`.

1. [ ] **FDD:** status `aprovado`, com os ajustes da aprovação.
2. [ ] **Mensagens:** namespace `Projects`, em pt-BR e inglês.
3. [ ] **Mídia:** `public/projetos/*.webp`, sem metadado.
4. [ ] **Dados:** `src/lib/projects.ts`.
5. [ ] **Componente:** `src/components/projetos.tsx`.
6. [ ] **Página:** seção na página inicial.
7. [ ] **Ajuste no preview, passo de Lucas:** enviar a branch, Lucas vê o layout e o inglês, e aplicar o que ele decidir.
8. [ ] **Docs:** FDD `implementado`, PRD, ROADMAP e `CLAUDE.md`.

Antes do PR: QA no navegador pelo MCP do Chrome DevTools, depois o teste manual de Lucas.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: respondidas no Stage 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | FDD | `docs/fdd/projetos.md`, `docs/fdd/README.md` | feito |
| 2 | Mensagens | `messages/pt-BR.json`, `messages/en.json` | feito |
| 3 | Mídia | `public/projetos/*.webp` | feito |
| 4 | Dados | `src/lib/projects.ts` | feito |
| 5 | Componente | `src/components/projetos.tsx` | feito |
| 6 | Página | `src/app/[locale]/page.tsx` | feito |
| 7 | Preview | Lucas pediu a borda nos prints e confirmou a página única (D42 e D43) | feito |
| 8 | Docs | FDD, PRD, ROADMAP, `DESIGN.md`, `CLAUDE.md` | feito |

### Desvios do plano
- **Link do nome com menos de 44 px:** o "Vinicius" fica dentro da frase, com 26 px, e a WCAG isenta links dentro de texto. FDD ajustado.
- **Cabeçalho:** `src/components/header-name.tsx`, fora do plano, ganhou `rootMargin`. Sem isso, o nome não aparecia ao chegar à seção, porque a abertura seguia atrás do cabeçalho.
- **Prints cortados:** saiu a barra de rolagem do navegador, e o tamanho passou a 1425 por 900.
- **Cor nova `--line`:** não prevista, para a borda pedida por Lucas. Registrada no `DESIGN.md` com o contraste.

---

## Stage 7 — Tests

Não há suíte de testes automatizados nesta entrega. Conferido no servidor de produção local, pelo MCP do Chrome DevTools e com `curl`.

| Critério de aceite | Como foi verificado |
|---|---|
| Casos em ordem, sem transbordo | 390 px em português, escuro e claro; 1440 px em inglês, escuro. Ordem landing, DraftCS e Crewz. As demais combinações não foram percorridas |
| "Ver projetos" leva à seção | Clique em 390 px: título em 120 px do topo, abaixo do cabeçalho, que termina em 56 px |
| Nome no cabeçalho | Depois do clique, visível. Voltando ao topo, escondido |
| Links | Destinos responderam 200 por `curl`. Links de ação com 44 px. Cliques nos links externos não exercitados |
| Imagens | Só o bloco `VP8`, sem metadado. A landing vem da cópia sem telefone, e o número não aparece no repositório nem no HTML. CLS 0 |
| Leitor de tela | Árvore de acessibilidade do Chrome: nomes distintos por caso e texto alternativo nas três imagens. Leitor de tela real não testado |
| Nenhuma animação nova | 0 animações depois da sequência da abertura |

Extras: nenhum cookie, nenhum recurso de outra origem. O Chrome avisa sobre dimensões de imagem com carga preguiçosa, sem erro.

---

## Stage 8 — Verification

- **lint:** Pass
- **typecheck:** Pass
- **build:** Pass
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass, com os limites do Stage 7
- **CI e preview do último commit:** pendentes, rodam com o push e o PR

---

## Stage 9 — Walkthrough

*(Preenchido pelo walkthrough.)*

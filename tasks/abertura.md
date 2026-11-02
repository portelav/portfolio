# Abertura

**Slug:** `abertura`
**Branch:** `feat/abertura`
**Seção ou área:** abertura, com a animação Reescrita
**Status:** Walkthrough
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 6 e 8; decisões D2, D16, D18, D23, D27, D28, D29, D30, D34, D35 e D36
- **FDD:** `docs/fdd/abertura.md` (aprovado, com ajustes deste plano a confirmar)
- **ADR relacionado:** 0001 e 0002

### Triagem
- **Área:** abertura. Está no `docs/ROADMAP.md`, em "Agora".
- **Terceiros e regras de fora:** nenhum conteúdo de terceiro. Vale a regra de nenhum cookie: a marca da sessão fica em `sessionStorage`.
- **Trivial?** Não.
- **ADR novo?** Não. O ADR 0001 já prevê efeito simples em CSS. Ver Decisão única.
- **PRD cobre?** Sim, com a D37. Layout e tempo são decididos por Lucas no preview.

### Objetivo
- Fazer o visitante ver o nome ser reescrito, saber que é de Lucas Portela e ter um caminho claro para os projetos e o contato.

### Escopo e não-escopo
- **Dentro:** Reescrita, frase, duas chamadas, layout da primeira dobra, Caslon em vetor e divisão do nome em 8 letras.
- **Fora:** seções Projetos e Contato, destino real das chamadas, símbolo do salto do cavalo.

### Critérios de aceite (testáveis)
Os da seção "Critérios de aceite" de `docs/fdd/abertura.md`, mais:
1. As letras somadas reproduzem exatamente o `d` de `svg/nome-escuro.svg` do kit.
2. A página não baixa IBM Plex Mono nem Libre Caslon Text.

### Perguntas bloqueadoras
- Nenhuma. Respondidas por Lucas em 2026-11-02: frase da D37, chamadas entram agora, ainda sem destino, e Reescrita em CSS.

### Premissas
- Lucas fecha o tempo e o layout no preview, antes do PR (PRD, D29). Sem essa escolha, o PR não abre.
- Libre Caslon Text tem licença OFL, que permite usar os contornos. A fonte entra só para gerar o vetor, sem virar dependência.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/abertura.md` | Spec: sequência, regras, acessibilidade e critérios |
| `docs/PRD.md` | D28, D29 e D34 a D36. LCP abaixo de 2,5 s, sem deslocamento de layout |
| `docs/adr/0001-next-tailwind-motion.md` | Motion só onde precisa, e efeito simples em CSS |
| Kit `svg/nome-escuro.svg` | Um path com 12 subpaths absolutos: p 2, o 2, r 1, t 1, e 2, l 1, a 2, v 1. Dá para dividir sem mudar nenhum ponto |
| Kit `build.py` | Plex Mono com escala 0,2 e `viewBox` de 1035,6 por 220. É a referência para a Caslon no mesmo corpo |
| `.superpowers/.../virada-uma-fonte.html`, na pasta da identidade | Protótipo aprovado: sequência e digitação de 140 a 230 ms |
| `src/components/brand-name.tsx`, `src/app/globals.css` | Nome em SVG com tokens, e cursor com piscar em CSS que para em 4,98 s |

### Fluxo atual
- A página provisória mostra o nome parado e a frase "Este site está sendo refeito."
- `data-abertura` já está na página, e o cabeçalho a observa.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Letras:** `src/lib/reescrita-glyphs.ts`, com os 8 trechos do kit e os 8 da Caslon, gerados uma vez por um script fora do repositório.
2. **Sequência:** `src/lib/reescrita-timeline.ts` calcula atrasos e posições do cursor em um só lugar, com os tempos do FDD e uma lista fixa de intervalos de digitação, para o servidor e o navegador darem sempre o mesmo resultado.
3. **Estado:** o quadro final é o estado base. Um script inline, logo antes do nome, marca `data-reescrita` em `<html>` e grava em `sessionStorage` só na primeira carga e sem movimento reduzido. Ao final, retira a marca.
4. **Componente:** `src/components/reescrita-name.tsx`, de servidor, mais os textos e as chamadas em `src/components/abertura.tsx`.

### Decisão única
- **Reescrita em CSS, sem Motion.** Motion dependeria da hidratação, o que traria de volta o atraso e o risco de ver o nome pronto voltar. CSS começa junto da primeira pintura, usa só `opacity` e `transform`, e não aumenta o JavaScript. Motion fica instalado até a entrega de Projetos. Se nada usar, sai com nota no ADR 0001.

### Checklist de arquitetura
- [ ] Nenhum `"use client"` novo
- [ ] Textos nos arquivos de mensagens, em pt-BR e inglês, com a checagem de chaves iguais
- [ ] Chamadas com 44 px e foco visível. Na abertura, o nome não recebe foco
- [ ] Só `transform` e `opacity`, sem blur. O cursor para antes de 5 s
- [ ] Com `prefers-reduced-motion`, sem marca, quadro final e cursor aceso, inclusive no hover
- [ ] Tokens do `DESIGN.md`. Nada de "O que não fazer", como tudo centralizado ou rótulo em mono caixa alta
- [ ] Nome com espaço livre, sem símbolo junto, e o vetor igual ao do kit
- [ ] `sessionStorage`, nenhum cookie
- [ ] Sem deslocamento de layout: caixa com a proporção final, e a Caslon cabe nela
- [ ] Leitor de tela lê o nome uma vez, e o quadro em Caslon fica oculto para ele

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`.

1. [x] **FDD:** ajustes confirmados e texto final da frase, já aplicados com a abertura do Gate.
2. [ ] **Mensagens:** frase e chamadas nos dois idiomas. Sai a frase provisória.
3. [ ] **Letras:** `reescrita-glyphs.ts`, conferindo com o kit, ponto a ponto.
4. [ ] **Sequência:** `reescrita-timeline.ts` e o CSS da Reescrita.
5. [ ] **Nome animado:** `reescrita-name.tsx` e o script inline.
6. [ ] **Abertura:** `abertura.tsx`, com layout proposto.
7. [ ] **Página:** `page.tsx` só com a composição.
8. [ ] **Ajuste no preview, passo de Lucas:** enviar a branch, Lucas vê o tempo e o layout, e aplicar o que ele decidir. O teto da D29 deixa de ser provisório.
9. [ ] **Docs:** FDD `implementado`, PRD, ROADMAP, `DESIGN.md` e `CLAUDE.md`.

Antes do PR: QA no navegador pelo MCP do Chrome DevTools, com CPU e rede limitadas, depois o teste manual de Lucas.

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
| 1 | FDD | `docs/fdd/abertura.md`, `docs/PRD.md` | feito |
| 2 | Mensagens | `messages/pt-BR.json`, `messages/en.json` | feito |
| 3 | Letras | `src/lib/reescrita-glyphs.ts`, `src/components/brand-name.tsx` | feito |
| 4 | Sequência | `src/lib/reescrita-timeline.ts`, `src/app/globals.css` | feito |
| 5 | Nome animado | `src/components/reescrita-name.tsx` | feito |
| 6 | Abertura | `src/components/abertura.tsx` | feito |
| 7 | Página | `src/app/[locale]/page.tsx` | feito |
| 8 | Preview | Lucas aprovou tempo e layout, sem mudanças (D38) | feito |
| 9 | Docs | FDD, PRD, ROADMAP, `DESIGN.md`, `CLAUDE.md` | feito |

### Desvios do plano
- **Caslon de cabeça para baixo:** a biblioteca que gera os contornos inverte o eixo vertical por padrão. O QA pegou no quadro congelado, e os vetores foram gerados de novo.
- **Ajustes depois do preview:** o estilo da sequência saiu de dentro do `h1` e foi para o `head`, o piscar no hover deixou de valer no espaço vazio ao lado do nome, e `overflow-visible` saiu por não ser necessário. O visual não deve mudar, mas o preview que Lucas aprovou é anterior a esses commits.

---

## Stage 7 — Tests

Não há suíte de testes automatizados nesta entrega. Conferido no servidor de produção local, pelo MCP do Chrome DevTools e com `curl`.

| Critério de aceite | Como foi verificado |
|---|---|
| Sequência em 390 px e no computador, em 2,6 s | Medida quadro a quadro em 390 px: última letra perto de 2,43 s e fim da sequência em 2,62 s. No computador, início e fim conferidos. CLS 0 |
| "Lucas Portela" e duas chamadas na primeira dobra | Screenshot em 390 e 1440 px. Chamadas com 44 px e destino `#projetos` e `#contato`, que ainda não existem. O clique não foi exercitado |
| Rolar e usar as chamadas durante a animação | Não exercitado durante a animação. A sequência é só CSS, sem nada que bloqueie |
| Sem repetir | Recarregar não repete: 0 animações e sem marca. A troca de tema não recarrega. A troca de idioma usa a mesma `sessionStorage` da aba, sem teste dedicado |
| Nome pronto não aparece antes da Caslon | Com CPU 6x e 4G lento, a primeira pintura já saiu com marca, 8 letras Caslon e 0 finais |
| Quadro final igual ao kit | As 8 letras somadas são idênticas ao `d` de `nome-escuro.svg`, por script. A geometria de `nome-claro.svg` é a mesma |
| Cursor | Depois da sequência, o piscar termina e a marca sai perto de 7,6 s. Com hover real do Chrome, uma animação que termina em 4,98 s, e depois aceso. Na abertura, o nome não entra na ordem de foco |
| `prefers-reduced-motion` | Sem marca e 0 animações ao abrir. O hover nesse modo está protegido pelo CSS, sem teste dedicado |
| JavaScript desligado | Só pelo HTML do servidor: sem `data-reescrita`, com as letras finais como estado base. Não testado com JavaScript desligado no navegador |
| Leitor de tela | Árvore de acessibilidade do Chrome: `heading "portelav"`, uma vez. Leitor de tela real não testado |
| LCP | 1,6 s com CPU 6x e 4G lento, no servidor local |
| `/` e `/en` | Textos e idioma certos nos dois |
| Sem baixar Plex nem Caslon | Só Red Hat Text e Red Hat Mono carregadas |

Extras: Tab real na ordem PT, EN, tema e chamadas, com contorno de 2 px. Enter no botão de tema trocou o modo. Sem erro no console.

---

## Stage 8 — Verification

- **lint:** Pass
- **typecheck:** Pass
- **build:** Pass
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass, com os limites do Stage 7
- **CI e preview do último commit:** pendentes, rodam com o push e o PR

---

## Stage 9 — Walkthrough

> Data: 2026-11-02

### Resumo
- **Veredito:** WARNINGS
- **Arquivos analisados:** 16
- **Findings:** 0 críticos, 6 avisos

### Checklist
| Item | Status | Observação |
|---|---|---|
| Escopo | OK | Só o previsto, com os desvios do Stage 6 |
| Next.js 16 | OK | Nenhum `"use client"` novo. Sequência em CSS |
| Segredo | OK | Nenhuma variável nova. `gitleaks` limpo na branch |
| Produto | OK | Bate com D28 a D30 e D34 a D38 |
| Regras de fora | OK | Nenhum cookie. Marca da sessão em `sessionStorage` |
| Textos | Ressalva | Nos arquivos de mensagens, nos dois idiomas. Inglês sem revisão de Lucas |
| Repositório público | OK | Sem dado de terceiro nem nota interna. Nenhuma mídia nova |
| Tokens e marca | OK | Cores por token. Vetor igual ao do kit, sem símbolo junto |
| 390 px e computador | Ressalva | Chrome em 390 e 1440 px. Safari e iPhone não testados |
| Toque, foco e alternativo | OK | 44 px, contorno de 2 px com Tab real, nome lido uma vez |
| Movimento | OK | Só `opacity` e `transform`. Cursor termina em 4,98 s, e movimento reduzido abre no quadro final |
| Desempenho | OK | LCP de 1,6 s na rede lenta local, CLS 0, sem fonte da Reescrita |
| Verificações | Ressalva | Verdes no local. CI só roda no PR |
| Commits | OK | Conventional Commits, até 72 caracteres, sem atribuição |
| `.env.example` | Não se aplica | Nenhuma variável nova |
| Docs | OK | FDD, PRD, ROADMAP, `DESIGN.md` e `CLAUDE.md` |

### Findings
#### Critical
- Nenhum.

#### Warnings
- As chamadas não têm destino até Projetos e Contato existirem — `src/components/abertura.tsx:22` — combinado com Lucas, e o lançamento exige.
- A sequência não foi vista em Safari nem iPhone. Ela usa `transform` em elemento de SVG, ponto em que os navegadores podem diferir — `src/lib/reescrita-timeline.ts` — conferir no teste manual, de preferência no celular.
- O preview aprovado por Lucas é anterior aos três últimos ajustes de código — `src/components/reescrita-name.tsx` — conferir de novo no preview do PR.
- Não exercitados: clique nas chamadas, rolagem durante a animação, troca de idioma sem repetir, JavaScript desligado e leitor de tela real — `docs/fdd/abertura.md` — conferir no teste manual.
- Quem chega à página inicial pelo link da 404 não vê a Reescrita naquela navegação, porque o script não roda em navegação interna. Ela vai direto ao quadro final — `src/components/reescrita-name.tsx` — sem prejuízo, e caso raro.
- Motion segue instalado e sem uso — `package.json` — decidir na entrega de Projetos, com nota no ADR 0001. O inglês da frase e a grafia do curso também dependem de Lucas.

#### Positive
- O nome pronto nunca apareceu antes da Caslon, nem com CPU e rede limitadas.
- As letras finais são iguais ao kit, ponto a ponto.
- O quadro congelado pegou a Caslon invertida antes de Lucas ver.
- A auditoria pegou o `style` dentro do `h1` e o hover no espaço vazio, ambos corrigidos.

### Verificações executadas
- `npm ci`, `npm run lint`, `npm run typecheck` e `npm run build`: verdes.
- `git log --format=%B origin/main..HEAD | grep -i -E "co-authored|generated with|claude"`: vazio.
- `gitleaks` na branch: limpo. `npm audit --omit=dev`: 0 vulnerabilidades.
- `curl`: `/` e `/en` 200, `/xx` e `/en/xx` 404, `/pt-BR` 307, nenhum `Set-Cookie`.
- Chrome: sequência medida quadro a quadro, CPU e rede limitadas, Tab, hover e árvore de acessibilidade.

**Gate S9 — WARNINGS**

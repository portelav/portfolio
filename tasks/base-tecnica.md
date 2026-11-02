# Base técnica

**Slug:** `base-tecnica`
**Branch:** `chore/base-tecnica`
**Seção ou área:** infraestrutura do site
**Status:** Done (PR #1 mergeado em 2026-11-02)
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 6, 7, 8 e 10; decisões D6, D8, D14, D18, D21 e D25
- **FDD:** não precisa, é só infraestrutura (PRD, seção 6)
- **ADR relacionado:** 0001, 0002 e 0003, sem mudança de stack

### Triagem
- **Área:** infraestrutura. Está no `docs/ROADMAP.md`, primeiro item de "Agora".
- **Terceiros e regras de fora:** nenhum conteúdo de terceiro. Vale a regra de nenhum cookie não essencial.
- **Trivial?** Não: muda dependências e estrutura, e toca mais de três arquivos.
- **ADR novo?** Não. A stack é a dos ADRs. O TypeScript fica na 6.0, ver Decisão única.
- **PRD cobre?** Quase tudo. O `DESIGN.md` deixa para esta entrega duas decisões do dono, listadas abaixo.

### Objetivo
- Deixar a aplicação rodando em `/` e `/en`, com tokens, fontes, ícones, verificações e CI, pronta para receber as seções.

### Escopo e não-escopo
- **Dentro:**
  - Next.js 16, React 19, TypeScript, Tailwind 4, Motion instalado e `next-intl`.
  - Tema escuro e claro por tokens, sem piscada no carregamento. O seletor não entra.
  - Fontes por `next/font`. Ícones, manifesto e arquivos do nome do kit em `public/`.
  - Página provisória nos dois idiomas, com o nome e uma frase, fora do índice dos buscadores.
  - Metadados e `hreflang` básicos. CI com `lint`, `typecheck`, `build` e `gitleaks`. Hook de lint e typecheck.
  - Escala tipográfica, forma e espaçamento no `DESIGN.md`.
- **Fora:**
  - Seletores de idioma e tema, cabeçalho, rodapé e página 404 própria: item Cabeçalho e rodapé (PRD, D26).
  - Reescrita, divisão do SVG em letras e vetorização da Caslon: item Abertura.
  - Web Analytics, imagem de prévia de link, retirada do `noindex` e troca de domínio: item Lançamento.
  - Cinzas: seguem como TODO no `DESIGN.md` até um layout pedir.

### Critérios de aceite (testáveis)
1. `/` responde em pt-BR, com `<html lang="pt-BR">`. `/en` responde em inglês, com `<html lang="en">`. `/pt-BR` redireciona para `/`.
2. Navegador com `Accept-Language: en` em `/` continua vendo português (ADR 0002).
3. Nenhuma resposta traz `Set-Cookie`, conferido com `curl -I` e no navegador.
4. Remover uma chave de um só arquivo de mensagens quebra `npm run typecheck`.
5. Sem nada salvo, a página abre no modo padrão. Com `localStorage.theme = "light"`, recarregar abre em claro, sem piscada e sem erro de hidratação. O mesmo vale ao contrário. Sem JavaScript, abre no modo padrão.
6. Cores vêm só dos tokens do `DESIGN.md`. As três fontes usadas vêm de `next/font`, sem requisição a domínio externo.
7. O favicon aparece, e `/site.webmanifest`, os ícones e os arquivos do nome respondem 200. As imagens novas não têm metadado.
8. O HTML traz `noindex`, `hreflang` para os dois idiomas e `x-default`, e título e descrição no idioma certo.
9. Em 390 px e no computador, nos dois idiomas e nos dois modos, a página não tem rolagem horizontal nem erro no console.
10. `npm run lint`, `npm run typecheck` e `npm run build` ficam verdes, no local e no CI do PR. O `gitleaks` passa no CI.
11. O preview da Vercel do PR abre, e `portelav.vercel.app` continua mostrando a versão antiga.

### Perguntas bloqueadoras
- Nenhuma. Respondidas por Lucas em 2026-11-02: modo padrão escuro, Red Hat Text no texto corrido, e valores do Stage 3, bloco 4, aprovados, com ajuste possível depois.

### Premissas
- Lucas importa o repositório na Vercel, porque não há CLI nem token neste ambiente.
- O inglês da página provisória fica para a revisão de inglês já prevista no PRD.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/adr/0002-i18n-next-intl.md` | pt-BR em `/`, inglês em `/en`, `as-needed`, `localeDetection: false`, `localeCookie: false`. Mensagem faltando quebra a verificação |
| `docs/design/DESIGN.md` | Tokens de cor, fontes e os TODOs que esta entrega fecha. Tema em `localStorage`, nunca em cookie |
| `docs/ROADMAP.md` | Critério de pronto do item: Next.js 16, Tailwind 4, Motion e `next-intl`, kit no lugar, hook e CI verdes |
| `next@16.4.4`, `dist/docs/.../preventing-flash-before-hydration.md` | Script inline antes da pintura e `suppressHydrationWarning` para evitar piscada |
| `next@16.4.4`, `dist/docs/.../useTypeScriptCli.md` e `upgrading/version-16.md` | Next aceita TypeScript 7. `next lint` saiu, usar o ESLint direto. Turbopack é o padrão |
| `eslint-config-next@16.4.4` e `typescript-eslint@8.72.1` | O primeiro depende do segundo, que pede `typescript >=4.8.4 <6.1.0`. O `latest` do TypeScript é 7.0.2 |
| Kit `web/` e `svg/` em `C:\prog\identidade-visual\marca\kit\` | Ícones, `head-snippet.html`, `site.webmanifest` e `nome-*.svg`. Sem `exiftool` nem `magick` nesta máquina |

### Fluxo atual
- Só há documentação no repositório. Não há aplicação nem projeto na Vercel para ele.
- `node_modules/`, `dist/` e `*.tsbuildinfo` no disco são sobras ignoradas da versão antiga.
- `portelav.vercel.app` vem do projeto antigo na Vercel, ligado ao repositório privado.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Rotas e idioma:** `src/i18n/routing.ts`, usado por `src/proxy.ts`, `src/i18n/request.ts` e `src/i18n/navigation.ts`. Layout raiz em `src/app/[locale]/layout.tsx`, com `generateStaticParams`.
2. **Textos:** `messages/pt-BR.json` e `messages/en.json`. Tipos de `next-intl` para as chaves usadas, e um arquivo de tipos que exige as mesmas chaves nos dois idiomas.
3. **Tema:** `src/app/globals.css` define os tokens em `:root` e em `[data-theme="light"]`, e os liga ao Tailwind com `@theme`. Um script inline no `<head>` lê `localStorage.theme` antes da primeira pintura.
4. **Tipografia e forma, valores propostos para o `DESIGN.md`:**
   - Escala: 14 px (mínimo), 17 px (texto), 20 px, 28 px e título de 36 a 56 px, fluido.
   - Forma: raio 0, como o bloco âmbar do nome. Borda de 1 px só quando separa algo. Sem sombra.
   - Espaçamento: base de 4 px, a escala padrão do Tailwind.
   - Foco: contorno de 2 px em `--accent`, com folga de 2 px. Passa de 3:1 nos dois modos.

### Decisão única
- **TypeScript 6.0.3, sem seguir o `latest`.** O `eslint-config-next` depende do `typescript-eslint`, que não aceita a 7. Subir exigiria largar a checagem de tipos do lint ou instalar fora do intervalo aceito. Revisar quando o `typescript-eslint` aceitar a 7.
- **A aplicação não nasce do `create-next-app` nesta pasta.** Ele roda em uma pasta temporária, e só a configuração é copiada, para não sobrescrever `CLAUDE.md`. O `AGENTS.md` entra se ele gerar.
- **`noindex` até o lançamento.** O projeto novo tem URL pública, e uma página provisória não pode aparecer em busca.

### Checklist de arquitetura
- [ ] Next.js 16: `proxy.ts`, `params` assíncrono, `next typegen` antes do `tsc`, ESLint direto
- [ ] Textos só nos arquivos de mensagens, em pt-BR e inglês
- [ ] Componente cliente só se houver estado, efeito ou evento. Nesta entrega, nenhum
- [ ] `localeCookie: false`, tema em `localStorage`, nenhum cookie
- [ ] Tokens e marca do `DESIGN.md`. Nome pelo arquivo, sem símbolo ao lado, com espaço livre e mínimo de 96 px
- [ ] Nada se move nesta entrega. Motion instalado, sem uso até a Abertura
- [ ] Imagens do kit sem metadado, conferidas pelos blocos do PNG
- [ ] Toque de 44 px e foco visível definidos no CSS base
- [ ] CI sem segredo, usando só o token padrão do GitHub
- [ ] Nada aponta para a versão antiga, e `portelav.vercel.app` não é tocado

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`.

1. [ ] **Andaime:** apagar as sobras ignoradas no disco. Criar `package.json`, `.nvmrc` (Node 24), `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs` e lockfile, com as versões fixadas no Stage 2. Scripts `dev`, `build`, `start`, `lint` e `typecheck`.
2. [ ] **Idiomas:** `src/i18n/*`, `src/proxy.ts`, `messages/pt-BR.json`, `messages/en.json` e a checagem de chaves iguais.
3. [ ] **Tema e fontes:** `globals.css` com tokens, escala, foco e toque. `next/font` com as três fontes. Script de tema antes da pintura.
4. [ ] **Marca:** copiar `web/*` para `public/` e `svg/nome-{escuro,claro}.svg` para `public/brand/`, sem metadado. Ícones, manifesto e `theme-color` pela API de metadados.
5. [ ] **Página provisória:** `src/app/[locale]/layout.tsx` e `page.tsx`, só composição. Nome pelo arquivo do modo atual, uma frase, título e descrição por idioma, `hreflang` e `noindex`.
6. [ ] **CI:** `.github/workflows/ci.yml` com `npm ci`, `lint`, `typecheck`, `build` e `gitleaks`, em PR para a `main` e em push nela.
7. [ ] **Hook:** lint e typecheck ao fim do turno em `.claude/settings.json`, só quando houver mudança em código.
8. [ ] **Design:** fechar no `DESIGN.md` o modo padrão, a fonte do texto, a escala e a forma.
9. [ ] **Docs:** `CLAUDE.md` (estado, comandos, estrutura, hook, TypeScript), README, PRD (estado do item) e ROADMAP. No item Lançamento, acrescentar retirar o `noindex`, a prévia de link e a checagem da troca de domínio.
10. [ ] **Vercel, passo de Lucas, sem commit:** importar `portelav/portfolio` como projeto novo, com o preset Next.js, sem pedir o domínio `portelav.vercel.app`. O primeiro build da `main` pode falhar até este PR entrar, porque ela ainda não tem aplicação. Depois, conferir o preview do PR.

Antes do PR: QA no navegador pelo MCP do Chrome DevTools, depois o teste manual de Lucas.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist: não se aplica, o PRD dispensa FDD neste item
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: respondidas no Stage 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | Andaime | `package.json`, `package-lock.json`, `.nvmrc`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `AGENTS.md` | feito |
| 2 | Idiomas | `src/i18n/*`, `src/proxy.ts`, `src/global.ts`, `messages/pt-BR.json`, `messages/en.json` | feito |
| 3 | Tema e fontes | `src/app/globals.css`, `src/lib/fonts.ts`, `src/components/theme-script.tsx` | feito |
| 4 | Marca | `public/*`, `public/brand/*`, `src/lib/site.ts` | feito |
| 5 | Página provisória | `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/components/brand-name.tsx` | feito |
| 6 | CI | `.github/workflows/ci.yml` | feito, roda no PR |
| 7 | Hook | `.claude/hooks/check-on-stop.mjs`, `.claude/settings.json` | feito |
| 8 | Design | `docs/design/DESIGN.md` | feito |
| 9 | Docs | `CLAUDE.md`, `README.md`, `docs/PRD.md`, `docs/ROADMAP.md` | feito |
| 10 | Vercel | Importar o repositório como projeto novo | falta, passo de Lucas |

### Desvios do plano
- **Sem `postcss.config.mjs`:** o `create-next-app@16.4.4` liga o Tailwind pelo loader `@tailwindcss/turbopack`, em `next.config.ts`. Segui o gerador.
- **`cacheComponents` e `partialPrefetching` fora:** o gerador liga os dois, mas o site é estático e não usa `use cache`.
- **Dois commits de correção além dos itens:** o ponto do `matcher` em `src/proxy.ts` estava sem escape, e o proxy só rodava em `/`. O QA de rotas pegou o erro, porque `/pt-BR` não redirecionava. O outro commit passa o comando do hook como texto único, para tirar um aviso de depreciação do Node.
- **D31 no PRD:** registrei as respostas de Lucas sobre modo padrão e fonte, que o plano só previa no `DESIGN.md`.
- **Projeto antigo na Vercel:** ao abrir o PR, o projeto que serve `portelav.vercel.app` também tentou um deploy deste repositório, e falhou, mesmo ligado só ao repositório antigo. A causa não foi identificada. Lucas desconectou esse projeto do Git em 2026-11-02, para o merge não correr o risco de trocar o site no ar. O deploy publicado continua lá.

---

## Stage 7 — Tests

Não há suíte de testes automatizados nesta entrega. Os critérios foram conferidos no servidor de produção local, com `curl` e pelo MCP do Chrome DevTools.

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Idioma por rota | `curl`: `/` e `/en` respondem 200, com `lang` certo. `/pt-BR` responde 307 para `/` |
| 2. Sem detecção de idioma | `curl` com `Accept-Language: en` em `/` devolve `lang="pt-BR"` |
| 3. Nenhum cookie | `curl` em `/`, `/en`, `/pt-BR` e `/xx`: nenhum `Set-Cookie`. No navegador, `document.cookie` vazio |
| 4. Mensagem faltando quebra | Removi `Home.status` de `en.json`: `tsc` falhou com TS2344. Arquivo restaurado |
| 5. Tema sem piscada | Sem nada salvo, abre escuro, mesmo com o sistema em claro. Com `theme=light`, o atributo entra antes do `body`, e a primeira pintura já é clara. `theme=dark` também conferido. Sem erro de hidratação. O HTML do servidor não traz `data-theme`, então sem JavaScript vale o escuro. O navegador com JavaScript desligado não foi testado |
| 6. Tokens e fontes | Cores computadas iguais aos tokens nos dois modos. Red Hat Text carregada. Todos os recursos da página vêm da própria origem |
| 7. Ícones e metadado | Ícones, manifesto e nomes respondem 200. Os PNGs só têm os blocos `IHDR`, `IDAT` e `IEND`. O `favicon.ico` não foi inspecionado por dentro |
| 8. Metadados | `noindex`, `hreflang` dos dois idiomas, `x-default`, título e descrição por idioma, conferidos no HTML |
| 9. Layout e console | 390 px e 1440 px, sem rolagem horizontal e sem erro no console. Fica um aviso do Chrome, não erro, sobre dimensões de imagem com carga preguiçosa. CLS medido em 0 |
| 10. Verificações e CI | `lint`, `typecheck` e `build` verdes no local, `gitleaks` limpo no histórico da branch e nos arquivos rastreados. O CI só roda ao abrir o PR: pendente |
| 11. Preview e site antigo | Pendente: depende do projeto novo na Vercel, passo de Lucas |

Extras: o hook passou nos três casos (sem mudança em código, com código válido e com erro de tipo, que devolve exit 2). `npm audit --omit=dev` sem vulnerabilidades. `/xx` e `/en/xx` respondem 404, com a página padrão do Next.js até o item Cabeçalho e rodapé.

---

## Stage 8 — Verification

- **lint:** Pass
- **typecheck:** Pass
- **build:** Pass
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass
- **`gitleaks`:** Pass no histórico da branch e nos arquivos rastreados. Os 8 achados da varredura da pasta inteira são `generic-api-key` em `.next/`, saída de build ignorada pelo git
- **CI e preview da Vercel:** pendentes, dependem do PR e do projeto novo

---

## Stage 9 — Walkthrough

> Data: 2026-11-02

### Resumo
- **Veredito:** WARNINGS
- **Arquivos analisados:** 43
- **Findings:** 0 críticos, 5 avisos

### Checklist
| Item | Status | Observação |
|---|---|---|
| Escopo | OK | Só o que o plano previa, com os desvios do Stage 6 |
| Next.js 16 | OK | `proxy.ts`, `await params`, `next typegen`, ESLint direto, nenhum `"use client"` |
| Segredo | OK | Nenhuma variável de ambiente. `gitleaks` limpo no histórico da branch e nos arquivos rastreados |
| Produto | OK | ADR 0002, D25 e D31 atendidos. Decisões novas foram perguntadas a Lucas |
| Regras de fora | OK | Nenhum cookie. Nenhum conteúdo de terceiro entrou |
| Textos | OK | Tudo nos arquivos de mensagens, nos dois idiomas, sem travessão e sem palavra vetada |
| Repositório público | Ressalva | Sem dado de terceiro nem nota interna. PNGs sem metadado. `favicon.ico` não inspecionado por dentro |
| Tokens e marca | OK | Cor só nos tokens e no `theme-color` do kit. Nome pelo arquivo, 240 px, sem símbolo ao lado |
| 390 px e computador | OK | `/` e `/en`, escuro e claro, sem rolagem horizontal |
| Toque, foco e alternativo | Ressalva | Texto alternativo conferido. Regras de foco e 44 px estão no CSS, mas a página não tem elemento interativo para exercitá-las |
| Movimento | OK | Nada se move nesta entrega |
| Desempenho | OK | CLS 0. Sem recurso de outra origem. Motion instalado e sem uso |
| Verificações | Ressalva | Verdes no local, depois de `npm ci` limpo. CI ainda não rodou |
| Commits | OK | Conventional Commits, até 72 caracteres, sem atribuição |
| `.env.example` | Não se aplica | Nenhuma variável nova |
| Docs | Ressalva | Atualizados, ver aviso sobre "feito" |

### Findings
#### Critical
- Nenhum.

#### Warnings
- CI e preview ainda não rodaram, e os critérios 10 e 11 seguem abertos — `.github/workflows/ci.yml` — conferir no PR antes do merge. A Vercel é o item 10, passo de Lucas.
- PRD e `CLAUDE.md` já dizem que a base está pronta, antes do merge — `docs/PRD.md:30`, `CLAUDE.md:33` — só vale depois do merge. Se o PR mudar de rumo, corrigir os dois.
- `theme-color` fica sempre escuro, também no modo claro — `src/lib/site.ts:18` — tratar junto do seletor de tema, no item Cabeçalho e rodapé.
- Red Hat Display e Red Hat Mono estão configuradas, mas nada as usa ainda, então não foram vistas renderizando — `src/lib/fonts.ts:9` — conferir no primeiro uso, e rever o `preload: false` da Display, que deve ser a fonte dos títulos.
- Chrome avisa sobre dimensões de imagem com carga preguiçosa, sem erro e com CLS 0 — `src/components/brand-name.tsx:16` — a Abertura troca esse componente. Reavaliar lá.

#### Positive
- O QA de rotas pegou o `matcher` sem escape, que deixava o proxy rodando só em `/`.
- Chave faltando em um só arquivo de mensagens quebra o `typecheck`, testado de verdade.
- A primeira pintura já sai no tema salvo, medido no navegador.
- O lockfile traz os pacotes de Linux que o CI precisa.
- Nenhum cookie em nenhuma rota testada, inclusive as de 404.

### Verificações executadas
- `npm ci` limpo, sem mudar o lockfile; `npm run lint`, `npm run typecheck` e `npm run build`: verdes.
- Lint testado com arquivo de sonda: `no-img-element` e `alt-text` disparam, e a sonda foi apagada.
- `node --test .claude/hooks/valida-frontmatter.test.mjs`: 1 passou.
- `git log --format=%B origin/main..HEAD | grep -i -E "co-authored|generated with|claude"`: vazio.
- Tags `actions/checkout@v6`, `actions/setup-node@v7` e `gitleaks/gitleaks-action@v3` existem. O workflow em si só roda no PR.
- `portelav.vercel.app` respondeu 200, ainda da versão antiga.

**Gate S9 — WARNINGS**

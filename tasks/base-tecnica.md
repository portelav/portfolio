# Base técnica

**Slug:** `base-tecnica`
**Branch:** `chore/base-tecnica`
**Seção ou área:** infraestrutura do site
**Status:** Execution
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

*(Preenchido pelo exec.)*

| # | Camada | Arquivo | Status |
|---|---|---|---|

### Desvios do plano
- Nenhum | …

---

## Stage 7 — Tests

*(Preenchido pelo exec.)*

| Critério de aceite | Como foi verificado |
|---|---|

---

## Stage 8 — Verification

*(Preenchido pelo exec.)*

- **lint:** Pass | Fail
- **typecheck:** Pass | Fail
- **build:** Pass | Fail
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass | Fail

---

## Stage 9 — Walkthrough

*(Preenchido pelo walkthrough.)*

# Página de caso da landing da Dra. Thaiane

**Slug:** `case-study-landing`
**Branch:** `feat/case-study-landing`
**Seção ou área:** Projetos, página nova por caso
**Status:** Planning
**Gate S2:** Bloqueado

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md`, D22, D42, D45 e D57 (página única), D50 e D51 (texto dos casos), D61 (o site não cita a instituição)
- **FDD:** `docs/fdd/caso.md` (a escrever neste plano) e `docs/fdd/projetos.md` (ganha o link)
- **ADR relacionado:** 0002, idiomas pela URL com `next-intl`

### Triagem
1. **Área:** Projetos, com rota nova.
2. **Terceiros:** sim. Imagens do site da Dra. Thaiane e de versões antigas, que podem ter foto de paciente, antes e depois ou dado de contato. Tudo passa por Lucas, e o que tiver dado de terceiro fica fora (FDD de Projetos, regras 3 e 5).
3. **FDD:** precisa, porque é página nova.
4. **Arquitetura:** rota nova com endereço traduzido por idioma, em `next-intl`. Cabe na ADR 0002, que ganha uma linha.
5. **PRD:** a D42 manda página única. A página de caso pede decisão nova, D67, aprovada por Lucas em 2026-11-05.
6. **ROADMAP:** está em "Depois", como "Página própria para um caso". Sobe para "Agora".

### Objetivo
- Quem quer saber mais abre "Ver caso completo" na landing e lê como o site foi feito: o pedido, para quem, as regras que limitaram, as decisões, as versões descartadas, o resultado e o aprendizado.

### Escopo e não-escopo
- **Dentro:** uma página de caso para a landing, em `/projetos/landing` e `/en/projects/landing`. Link no card da landing. Textos nos dois idiomas. Telas finais e do processo, aprovadas por Lucas.
- **Fora:** casos do DraftCS e do Crewz, que vêm depois, no mesmo formato. Parte do site da Dra. Thaiane voltada para dentistas, que ainda não existe. Indexação no Google, que continua desligada até o lançamento.

### Critérios de aceite (testáveis)
1. O card da landing tem "Ver caso completo", em inglês "See full case", que abre a página do caso no mesmo idioma.
2. A página tem, nesta ordem: título, resumo, pedido, para quem, regras, decisões, versões descartadas, resultado e aprendizado, e um link de volta para os projetos.
3. `/projetos/landing` em português e `/en/projects/landing` em inglês. O seletor de idioma leva ao mesmo caso no outro idioma. Outro `id` dá a página 404.
4. Sem preloader na página do caso. O voltar leva a `/#projetos`, também sem preloader.
5. Toda imagem tem texto alternativo nos dois idiomas, sem metadado, sem paciente, sem antes e depois e sem dado de contato de terceiro.
6. Em 390 px e 1350 px, em `/` e `/en`, escuro e claro: sem transbordo, toque de 44 px e foco visível.
7. Título e descrição próprios, `noindex` como o resto do site, e `canonical` e `hreflang` apontando para o caso.
8. `lint`, `typecheck` e `build` verdes.

### Perguntas bloqueadoras
1. **"A forma como o site se complementa":** o que você quer dizer? Por exemplo, uma seção que puxa a outra, as fotos que conversam com o texto, ou o celular e o computador contando a mesma história?
2. **Regras do Conselho:** o que exatamente saiu por causa delas? Você citou fotos, antes e depois e fotos do consultório, mas o site mostra o consultório no vídeo. As fotos do consultório saíram ou ficaram?
3. **Versões descartadas:** você tem prints guardados, no celular ou no computador? Se não, eu monto a partir do histórico dos repositórios `landing-drathaiane`, `landing-drathaiane-old` e `drathaiane-rework`, de agosto a outubro, e você escolhe de 3 a 4.
4. **Animações:** quais você mais quer mostrar? Por exemplo, a entrada do topo, os serviços ou alguma transição.
5. **Parte para dentistas:** entra no caso como "próximo passo", em uma frase, ou fica de fora?

### Premissas
- O texto fala do pedido como "captar mais pacientes", sem chamar a Dra. Thaiane de cliente (D22), e sem citar a relação pessoal.
- Sobre o prazo, o texto diz que não havia data e que a prioridade foi pôr o site no ar rápido. O motivo pessoal, de buscar emprego e clientes, só entra se Lucas pedir.
- O resultado diz só o que é fato: no ar desde o fim de outubro de 2026. Sem número inventado de visitas ou de pacientes.
- O aprendizado usa as palavras de Lucas: ser original e não copiar de outros.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/projetos.md` | Card da landing com "O que é", "Minha parte", "Uma decisão" e o detalhe CRO. Regras 3 e 5 sobre imagem e dado de terceiro |
| `docs/PRD.md` | D42 e D45 fixam página única; D57 evitou rota nova para a privacidade; D22 proíbe "cliente" |
| `src/i18n/routing.ts` | `localePrefix: "as-needed"`, sem `pathnames`: hoje não há rota traduzida |
| `src/app/[locale]/layout.tsx` | `generateMetadata` fixa `canonical` e `hreflang` em `/`; a página do caso precisa sobrescrever |
| `src/app/[locale]/[...rest]/page.tsx` | Rota coringa manda o resto para o 404; a rota nova vem antes dela |
| `src/components/theme-script.tsx` | O preloader só liga em `/` e `/en`, sem `#`: a página do caso e a volta para `/#projetos` não o mostram |
| `/c/prog/landing-drathaiane/docs/screenshots/` | Quatro telas finais: topo e "Sobre", no celular e no computador |

### Fluxo atual
- O card da landing mostra mídia, texto curto, "Ver site" e "Ver código". Não há como saber mais sem sair do portfólio.

---

## Stage 3 — Architecture Planning

### Source of Truth
1. **Texto:** `messages/*.json`, em `CaseStudy.landing`, com a mesma forma nos dois idiomas.
2. **Imagens:** `public/projetos/caso/landing/`, com uma lista em `src/lib/projects.ts`, com arquivo, tamanho e chave do texto alternativo.
3. **Rota:** `src/app/[locale]/projetos/[id]/page.tsx`, com `generateStaticParams` só para os casos que existem. O endereço em inglês vem de `pathnames` no `routing.ts`.
4. **Regras:** `docs/fdd/caso.md`.

### Decisão única
- Uma página estática por caso, montada por um componente `CaseStudy` a partir das mensagens e da lista de imagens. Sem MDX e sem CMS: o texto mora nos arquivos de mensagens, como no resto do site.

### Checklist de arquitetura
- [ ] `params` assíncrono e `generateStaticParams` com `locale` e `id`
- [ ] `pathnames` no `routing.ts`, sem quebrar `/`, `/en` e o 404
- [ ] `generateMetadata` próprio, com `canonical`, `hreflang` e `noindex`
- [ ] Textos em pt-BR e inglês, sem texto fixo em componente
- [ ] Toque de 44 px, foco visível, ordem de títulos `h1` e depois `h2`, em 390 px
- [ ] Sem animação nova além do padrão do site; se houver, só `transform` e `opacity`, com `prefers-reduced-motion`
- [ ] Tokens e fontes do `DESIGN.md`, sem card nem sombra
- [ ] Imagens com largura e altura reservadas, WebP, sem metadado
- [ ] Nenhum dado de terceiro em imagem ou texto
- [ ] Nenhum cookie novo

---

## Stage 4 — Execution Planning

1. [ ] `docs/fdd/caso.md`, `docs/fdd/projetos.md` (link), `docs/PRD.md` (D67), `docs/ROADMAP.md` e a linha na ADR 0002.
2. [ ] Rascunho do texto do caso em pt-BR e inglês, a partir das respostas de Lucas, para ele aprovar antes de entrar no código.
3. [ ] Imagens: telas finais e de 3 a 4 versões descartadas, escolhidas por Lucas, limpas de metadado.
4. [ ] Mensagens em `messages/pt-BR.json` e `messages/en.json`.
5. [ ] `routing.ts` com `pathnames`, e a rota `src/app/[locale]/projetos/[id]/page.tsx`, com metadados.
6. [ ] Componente `CaseStudy` e o link "Ver caso completo" no card.
7. [ ] Verificação em 390 px e 1350 px, `/` e `/en`, escuro e claro; `lint`, `typecheck` e `build`.
8. [ ] Status do FDD, `CLAUDE.md` (estrutura do código) e Stages 6 a 8.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD está no checklist
- [ ] Decisão de produto coberta pelo PRD ou pergunta aberta: cinco perguntas abertas no Stage 1
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Bloqueado, até Lucas responder as perguntas do Stage 1.

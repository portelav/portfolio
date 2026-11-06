# Página de caso da landing da Dra. Thaiane

**Slug:** `case-study-landing`
**Branch:** `feat/case-study-landing`
**Seção ou área:** Projetos, página nova por caso
**Status:** Review
**Gate S2:** Livre

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

### Respostas de Lucas (2026-11-05)
1. As seções se ligam: cada uma tira a dúvida que a anterior pode ter deixado.
2. O vídeo do topo mostra a recepção, não a sala de atendimento.
3. Não há prints das versões antigas. Eles serão montados a partir do histórico dos repositórios, e Lucas escolhe se entram.
4. As animações a mostrar são o vídeo de abertura e as transições, principalmente no celular.
5. A parte para dentistas entra como próximo passo.

### Achado ao ler o projeto da landing
- Desde 2026-10-28, o site da Dra. Thaiane mostra casos com antes e depois em Serviços, com consentimento dos pacientes e com nome e CRO na imagem (D44 do PRD da landing). O card do portfólio ainda diz "sem antes e depois". Lucas confirma o texto certo antes da correção.
- As fotos de casos de Serviços não entram em print nem vídeo do portfólio, porque o portfólio não mostra paciente nem com consentimento.

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

1. [x] `docs/fdd/caso.md`, `docs/fdd/projetos.md` (link), `docs/PRD.md` (D67), `docs/ROADMAP.md` e a linha na ADR 0002.
2. [x] Rascunho do texto do caso em pt-BR e inglês, a partir das respostas de Lucas, para ele aprovar antes de entrar no código.
3. [x] Imagens: telas finais e de 3 a 4 versões descartadas, escolhidas por Lucas, limpas de metadado.
4. [x] Mensagens em `messages/pt-BR.json` e `messages/en.json`.
5. [x] `routing.ts` com `pathnames`, e a rota `src/app/[locale]/projetos/[id]/page.tsx`, com metadados.
6. [x] Componente `CaseStudy` e o link "Ver caso completo" no card.
7. [x] Verificação em 390 px e 1350 px, `/` e `/en`, escuro e claro; `lint`, `typecheck` e `build`.
8. [x] Status do FDD, `CLAUDE.md` (estrutura do código) e Stages 6 a 8.

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD está no checklist
- [x] Decisão de produto coberta pelo PRD: D67 e D68
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre. Lucas respondeu as perguntas e aprovou o card e as versões em 2026-11-05.

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | Docs | `docs/fdd/caso.md`, `docs/fdd/projetos.md`, `docs/PRD.md`, `docs/ROADMAP.md`, ADR 0002 | feito |
| 2 | Texto | Rascunho aprovado por Lucas na conversa, antes do código | feito |
| 3 | Mídia | `public/projetos/caso/landing/`, oito WebP | feito |
| 4 | Mensagens | `messages/pt-BR.json`, `messages/en.json` | feito |
| 5 | Rota | `src/i18n/routing.ts`, `src/app/[locale]/projetos/[id]/page.tsx` | feito |
| 6 | Componentes | `src/components/case-study.tsx`, `locale-link.tsx`, `locale-switcher.tsx`, `projetos.tsx`, `site-footer.tsx`, `src/lib/projects.ts` | feito |
| 7 | Transição (D69, D71) | `page-transition.tsx`, `project-media.tsx`, `globals.css`, `header-shell.tsx` | feito |
| 8 | Menu no computador (D70) | `site-nav.tsx`, `site-header.tsx`, mensagens `Header.nav*` | feito |
| 9 | Retrato sem degradê (D72) | `sobre.tsx`, `globals.css` | feito |

### Desvios do plano
- As versões de maio vieram das pastas `thaiane` e `thaianeteste2`, de fora dos repositórios. Lucas escolheu as duas de maio e a de 10 de outubro.
- Os prints antigos foram feitos com o vídeo parado na sala vazia, sem pessoa nem placa de clínica, e com o telefone do cabeçalho desfocado.
- O card ganhou a correção do texto de antes e depois (D68), achada ao ler o projeto da landing.
- O seletor de idioma virou um link de cliente, para continuar no mesmo caso ao trocar o idioma.
- Lucas achou que a troca de página não ficava clara. Entraram, a pedido dele, a página que empurra a outra (D71) e o menu no computador com o item atual em destaque (D70). A capa clara do caso ficou de fora.
- O caso abria rolado 56 px, com a volta escondida sob o cabeçalho; o `main` do caso ganhou margem de rolagem.
- O cabeçalho se escondia ao pular para uma seção; agora volta e fica 1,5 s depois de um link com âncora.
- O retrato do Sobre perdeu o degradê das bordas (D72), pedido de Lucas na revisão.

---

## Stage 7 — Tests

| Critério de aceite | Como foi verificado |
|---|---|
| 1. Card leva ao caso no mesmo idioma | Clique em "See full case" em `/en`: abriu `/en/projects/landing`. Em `/`, o link aponta para `/projetos/landing` |
| 2. Ordem das seções e volta | `h1` e nove `h2` na ordem do FDD, dois links "Voltar aos projetos" para `/#projetos` |
| 3. Endereços e 404 | `/projetos/landing` e `/en/projects/landing` com 200. `/en/projetos/landing` e `/projects/landing` redirecionam para o endereço do idioma. `/projetos/outro` e `/en/projects/outro` dão 404. O seletor de idioma trocou de idioma sem sair do caso, nos dois sentidos |
| 4. Sem preloader | Sem `data-reescrita` no caso; a volta para `/en#projetos` também não mostrou o preloader e parou na seção |
| 5. Imagens | Nove imagens, todas carregadas e com texto alternativo; WebP sem EXIF nem XMP |
| 6. Tela | 390 px escuro e 1350 px claro, em `/` e `/en`, sem transbordo. Links de ação com 44 px; o único menor é o link dentro do parágrafo do aprendizado |
| 7. Metadados | Título e descrição próprios, `canonical` e `hreflang` do caso, `noindex, nofollow` |
| 8. Verificações | `lint`, `typecheck` e `build` verdes |

- O vídeo do caso toca com 60% na tela, depois do fim do carregamento, como em Projetos.
- O único erro no console é o 404 de `/_vercel/insights/script.js`, que só existe na Vercel.
| 9. Transição | Tipos `nav-forward` e `nav-back` nos dois sentidos; quadro do meio mostra a página que sai empurrada e o cabeçalho por cima, em 1350 px e 390 px. Com movimento reduzido, todas as durações são 0 |
| 10. Menu | Em 1350 px, marca Projetos, Sobre (também em Tecnologias e "Quer um site?") e Contato conforme a rolagem; nada na abertura. No caso, marca Projetos, e os links voltam com `nav-back`. Letra em `--accent` no escuro e em `--fg` no claro, linha em `--accent` nos dois. Em 390 px, o menu não aparece. Em `/en`: Projects, About, Contact |
| 11. Cabeçalho | Volta e fica depois de clicar no menu e na volta do caso; volta a sair ao rolar para baixo depois de 1,5 s |
| 12. Caso no topo | Ao abrir o caso, `scrollY` 0 e a volta visível |

- O servidor local precisa responder em `localhost`: preso só em `127.0.0.1`, a reescrita do `next-intl` para `localhost` voltava com 307.

---

## Stage 8 — Verification

- **lint:** Pass
- **typecheck:** Pass
- **build:** Pass
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass, em Chrome emulado. Falta o teste de Lucas em aparelho real.

---

## Stage 9 — Walkthrough

**Veredito:** WARNINGS

| Item | Resultado |
|---|---|
| Escopo | Página de caso da landing, mais transição, menu e retrato pedidos por Lucas durante a revisão, todos registrados no PRD (D69 a D72) |
| Docs primeiro | FDD do caso, FDD do cabeçalho, FDD do Sobre, `DESIGN.md` e PRD atualizados antes ou junto do código |
| Textos | Todo texto novo nas mensagens, em pt-BR e inglês; paridade checada no `typecheck` |
| Movimento | Só `transform` e `opacity`; movimento reduzido zera a troca de página e a linha do menu |
| Cor | `--accent` em letra só no modo escuro (8,96:1); no claro, só a linha (3:1 para elemento gráfico) |
| Repositório público | Sem segredo, sem paciente, telefone desfocado nos prints, mídia sem metadado |
| Commits | Conventional Commits, sem atribuição |

**Avisos:**
- Falta o teste de Lucas em aparelho real, no preview.
- O link PT do seletor, dentro do caso, aponta para `/pt-BR/projetos/landing` e redireciona para `/projetos/landing`. É o comportamento do `next-intl` ao trocar para o idioma padrão, sem efeito para quem navega.
- O link dentro do parágrafo do aprendizado tem menos de 44 px de altura, como todo link em texto corrido.

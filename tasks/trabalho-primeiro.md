# Direção "trabalho na primeira tela"

**Slug:** `trabalho-primeiro`
**Branch:** `proto/trabalho-primeiro`
**Seção ou área:** página inteira
**Status:** Execution
**Gate S2:** Livre

---

## Stage 1 — Scope Analysis

### Documentos
- **PRD:** `docs/PRD.md` seções 6, 8 e 10; D44 a D58; Regras de fora
- **FDD:** `docs/fdd/` `abertura.md`, `cabecalho-rodape.md`, `projetos.md`, `sobre.md`, `tecnologias.md`, `quer-um-site.md` e `contato.md` (existem)
- **ADR relacionado:** 0003 (Web Analytics) e 0004 (movimento em CSS)

### Triagem
- Área: toda a página única, mais medição.
- Conteúdo de terceiro: sim, nos casos. Autorizações em `private/pendencias.md`.
- Regra de fora: LGPD e cookies, na nota de privacidade.
- Stack: nada novo além do `@vercel/analytics`, já decidido no ADR 0003.
- ROADMAP: itens "Direção" e "Contato e nota de privacidade".
- Branch: mantida a `proto/trabalho-primeiro`, onde o protótipo já está, sem divergência da `main`. Foge do padrão `tipo/nome`, e renomear só trocaria o endereço do preview.

### Objetivo
- Levar o protótipo aprovado até a `main`, com o código conferido contra os FDDs, sem marcas de rascunho, com nota de privacidade e medição ligada.

### Escopo e não-escopo
- **Dentro:** nota de privacidade e link no rodapé; Vercel Web Analytics; limpeza do código de protótipo; conferência de cada critério de aceite dos FDDs; medição de LCP; PR para a `main`.
- **Fora:** lançamento e troca de endereço; retirada do `noindex`; prévia de link; teste de 1 minuto com pessoas de fora; botão de currículo, enquanto não houver PDF; revisão do inglês por Lucas; regravação dos vídeos. São itens do Lançamento ou de Depois, no ROADMAP.

### Critérios de aceite (testáveis)
1. Todos os critérios de aceite dos sete FDDs conferidos em 390 px e no computador, em `/` e `/en`, escuro e claro, ou com o desvio registrado no Stage 6.
2. Nenhuma marca `SPIKE` e nenhum dado ou mensagem sem uso em `src/` e `messages/`.
3. Nota de privacidade no fim da página, nos dois idiomas, com o link do rodapé levando até ela com o texto visível.
4. Web Analytics envia visita no preview, e o navegador não mostra cookie não essencial.
5. LCP medido no build de produção, com 4G simulado, em 390 px, com o valor registrado no Stage 7.
6. Lucas testa em aparelho real: preloader, vídeos, WhatsApp, e-mail, LinkedIn e pausa.
7. `lint`, `typecheck`, `build` e `gitleaks` verdes.

### Perguntas bloqueadoras
Respondidas por Lucas em 2026-11-03, que aprovou o plano e seguiu as duas recomendações.

1. **Texto da nota de privacidade** (PRD, D57). Aprovado como proposto:
   - pt-BR: "Este site conta visitas e de onde elas vêm, para eu saber se ele está sendo visto. Quem faz essa contagem é a Vercel, com o Web Analytics, sem cookies. A sua escolha de tema fica só no seu navegador."
   - Inglês: "This site counts visits and where they come from, so I know whether it's being seen. Vercel does the counting, through Web Analytics, without cookies. Your theme choice stays in your browser."
   - Título do bloco e do link do rodapé: "Privacidade"; em inglês, "Privacy".
2. **Motion na seção Tecnologias:** não existe logo dele nos conjuntos usados, e o item aparecia sem desenho. Decisão: sai da lista, para a grade não parecer quebrada.

### Premissas
- O preloader de cerca de 3,8 s fica (PRD, D46).
- Se o LCP passar de 2,5 s por causa dele, a execução para e Lucas decide. A meta do PRD, seção 8, só muda com registro dele.
- Lucas liga o Web Analytics no painel da Vercel, se o agente não tiver acesso.

---

## Stage 2 — Evidence Gathering

| Arquivo | Evidência |
|---|---|
| `docs/fdd/contato.md` | Pede nota e link no rodapé, com dois TODOs abertos: texto da nota e Web Analytics |
| `docs/PRD.md` | D57 põe a nota na própria página. Seção 8 pede LCP abaixo de 2,5 s no 4G |
| `src/components/site-footer.tsx` | O rodapé tem só o texto de direitos, sem link da nota |
| `src/app/[locale]/layout.tsx` | Sem `Analytics`, e `robots` em `noindex`, que continua até o lançamento |
| `src/components/preloader.tsx` e `src/components/theme-script.tsx` | Preloader de 3,77 s, com o conteúdo em `opacity: 0` por baixo, e saída de segurança em 7 s |
| `src/lib/projects.ts` | `cropX` sobrou de versão anterior e não é usado |
| `src/app/globals.css` e `src/components/` | 16 marcas `SPIKE` em comentários, sendo 6 no CSS e 10 nos componentes e dados |

### Fluxo atual
- Protótipo no ar no preview, com 50 commits à frente da `main`, sem divergência.
- `lint`, `typecheck` e `build` verdes em instalação limpa com `npm ci`, em 2026-11-03. `npm audit` sem vulnerabilidades em produção. Lighthouse no celular: 100 em acessibilidade e boas práticas, em servidor de desenvolvimento.
- Risco já visível: com o conteúdo em `opacity: 0` até o fim do preloader, o LCP tende a ficar perto dos 3,8 s, acima da meta. Ainda não foi medido.

---

## Stage 3 — Architecture Planning

### Source of Truth (até 4 blocos)
1. Comportamento e texto: FDDs e PRD.
2. Dados de contato: só `src/lib/contact.ts`. Textos: só `messages/`.
3. Movimento e tokens: `docs/design/DESIGN.md` e `src/app/globals.css`.

### Decisão única
- Conferir e limpar o protótipo já existente, sem reescrever. Só muda o código que um critério de aceite reprovar. A nota é um componente de servidor simples, sem JavaScript novo. O `Analytics` entra no layout raiz.

### Checklist de arquitetura (até 10)
- [ ] Next.js 16: consultar `node_modules/next/dist/docs/01-app/02-guides/analytics.md` antes de ligar a medição
- [ ] Textos em pt-BR e inglês, na mesma entrega
- [ ] Link do rodapé com 44 px, foco visível e âncora que não fica escondida
- [ ] Nota legível em 390 px, com tokens do `DESIGN.md`
- [ ] Nada se mexe além do que os FDDs listam, e `prefers-reduced-motion` respeitado
- [ ] Nenhum cookie não essencial, conferido no navegador
- [ ] URLs sem dado pessoal, porque entram na medição (ADR 0003)
- [ ] Mídia sem metadado, e autorizações em `private/`
- [ ] Sem atribuição de autoria a IA, em commit, PR ou README

---

## Stage 4 — Execution Planning

Até 10 itens, um commit cada, na ordem do `/exec`. Correção encontrada no item 5 ganha commit próprio.

1. [x] Docs: fechar os TODOs do `docs/fdd/contato.md` com o texto aprovado, status `aprovado`
2. [x] Mensagens e componente: bloco da nota com âncora `#privacidade`, composto na página depois de Contato
3. [x] Rodapé: link da nota, nos dois idiomas
4. [ ] Medição: `@vercel/analytics` e `Analytics` no layout. Ligar no painel da Vercel e conferir no preview que a visita chega e nenhum cookie é criado
5. [x] Conferência: percorrer os critérios dos sete FDDs no navegador, inclusive teclado, leitor de tela, sem JavaScript, movimento reduzido e deslocamento de layout. Registrar no Stage 7. Já conhecido: conferir se o título de `#site` para abaixo do cabeçalho
6. [x] Tecnologias: aplicar a resposta sobre o Motion, e fechar o TODO do FDD
7. [x] Limpeza: tirar marcas `SPIKE`, `cropX` e comentários de rascunho
8. [x] Desempenho: medir LCP no build de produção, com 4G simulado. Acima de 2,5 s, parar e levar os números a Lucas. **Medido e acima. Lucas manteve o preloader e pediu para corrigir o tempo (PRD, D60)**
9. [x] Docs: status dos FDDs, PRD seção 6, ROADMAP e estado no `CLAUDE.md`
10. [ ] Entrega: teste de Lucas em aparelho real, `/walkthrough` e `/pr`, com a confirmação dele antes de abrir o PR. Ao abrir, combinar o fechamento do PR #4 e o destino das branches `spike/site-inteiro`, `feat/projetos` e `proto/apresentacao`

---

## Stage 5 — Plan Verification

- [x] Textos previstos em pt-BR e inglês
- [x] FDD existe ou está no checklist
- [x] Decisão de produto coberta pelo PRD ou pergunta aberta: as duas perguntas do Stage 1 foram respondidas
- [x] Checklist ≤ 10, SoT ≤ 4, decisão única, evidências ≤ 7

**Gate S2:** Livre. Lucas aprovou o plano em 2026-11-03.

---

## Stage 6 — Code Execution

| # | Camada | Arquivo | Status |
|---|---|---|---|
| 1 | Docs | `docs/fdd/contato.md`, `docs/fdd/README.md`, `docs/ROADMAP.md` | feito |
| 2 | Mensagens e componente | `messages/*.json`, `src/components/privacidade.tsx`, `src/app/[locale]/page.tsx` | feito |
| 3 | Rodapé | `src/components/site-footer.tsx` | feito |
| 4 | Medição | `package.json`, `package-lock.json`, `src/app/[locale]/layout.tsx` | código feito; falta ligar no painel e conferir no preview |
| 5 | Correção da conferência | `src/components/header-shell.tsx` | feito |
| 6 | Tecnologias | `src/lib/stack.ts`, `docs/fdd/tecnologias.md`, `docs/adr/0004-movimento-em-css.md` | feito |
| 7 | Limpeza | `src/`, 12 arquivos | feito |
| 8 | Desempenho | `src/components/preloader.tsx`, `docs/PRD.md`, `docs/fdd/abertura.md` | feito, com exceção aceita por Lucas (PRD, D60) |
| 9 | Docs | `docs/fdd/*.md`, `docs/PRD.md`, `docs/ROADMAP.md`, `CLAUDE.md` | feito |

### Desvios do plano
- Os itens 6 e 7 vieram antes do 5, para a conferência valer sobre o código final.
- O link do rodapé usa `/#privacidade`, com o `Link` de idioma, porque a página 404 usa o mesmo rodapé e não tem a âncora.
- Antes do item 1, os vetos a "full stack" e "soluções" saíram do `DESIGN.md`, por pedido de Lucas (PRD, D59).

---

## Stage 7 — Tests

Medido em 2026-11-03, no build de produção local, com navegador sem interface. "Lento" é 4G simulado de 1,6 Mbps, com 150 ms de latência e CPU 4x mais lenta.

| Critério de aceite | Como foi verificado |
|---|---|
| Matriz de 390 px e 1440 px, `/` e `/en`, escuro e claro | Script nas 8 combinações: sem transbordo, ordem certa das seções, primeiro caso na primeira tela e nenhum erro de console |
| Preloader | Termina entre 3,84 e 3,87 s sem limite de rede. O nome pousa a até 0,1 px do lugar dele no cabeçalho |
| Âncoras | `#site`, `#contato` e `#privacidade` deixam o título visível. O link direto com âncora não mostra preloader |
| Teclado | Ordem certa de cabeçalho até o rodapé, com contorno de foco em todos. O cabeçalho escondido não voltava com foco: corrigido, e conferido com teclado |
| Clique no cabeçalho | Depois de um clique com mouse, o cabeçalho continua saindo ao rolar |
| Movimento reduzido | Sem preloader, nenhuma animação rodando, e vídeo parado com botão disponível |
| Sem JavaScript | Conteúdo, nome, seletor de idioma e link da nota aparecem, conferido em captura |
| Leitor de tela | Só pela árvore de acessibilidade: nome uma vez, `h1` certo e títulos em ordem. Falta teste com leitor real |
| Vídeo | Toca um por vez. A pausa de um segura os outros ao rolar. Sem arquivo, fica o print e não aparece botão |
| Cookies | Nenhum, em `/` e em `/en`, sem a medição da Vercel em produção real |
| 404 | Status 404 nos dois idiomas, com o link da nota apontando para a página inicial |
| Tema | Vale na hora, sobrevive ao recarregar e muda o `theme-color` |
| Mídia | Prints e vídeos sem EXIF, XMP, ICC ou etiquetas de autoria. Vídeos sem áudio |
| Links externos | Respondem 200. O LinkedIn bloqueia robôs, com 999: precisa de teste à mão |
| Lighthouse | 100 em acessibilidade. Boas práticas 96 por causa do script da medição, que só existe na Vercel. SEO 66 por causa do `noindex` intencional |
| Deslocamento de layout | 0 em `/`. Em `/en` no computador a 1350 px, 0,039, antes do fim do preloader e por baixo dele, então o visitante não vê |
| Alvo de toque | Todos com `min-h-11` ou `h-11`. O script apontou 43,99 px em algumas execuções, por arredondamento da medição |

### LCP, em 390 px, antes da correção

| Rede | Página | FCP | LCP | Elemento |
|---|---|---|---|---|
| Sem limite | `/` e `/en` | cerca de 0,1 s | 4,85 s | `h1` |
| Lento | `/` | cerca de 0,9 s | de 8,36 a 8,43 s | `h1` |
| Lento | `/en` | cerca de 0,9 s | de 7,63 a 8,38 s | `h1` |

No computador a 1350 px: 4,86 a 5,12 s sem limite, e 7,32 a 7,60 s no lento. A meta do PRD, seção 8, é 2,5 s.

- O FCP é rápido porque o nome aparece logo. O LCP só conta depois que o preloader solta o conteúdo.
- No lento, o tempo cresce além dos 3,8 s porque o relógio do voo só começa quando o JavaScript da página carrega. A rolagem fica presa até a saída de segurança, de 7 s.

### Depois da correção (PRD, D60)

O voo agora se guia pela própria animação da Reescrita, em vez de esperar 2,95 s a partir da carga do JavaScript. Três medições por linha.

| Tela | Rede | Página | Fim do preloader | LCP |
|---|---|---|---|---|
| 390 px | Sem limite | `/` e `/en` | de 3,86 a 3,92 s | de 4,77 a 4,84 s |
| 390 px | Lento | `/` | de 4,58 a 4,65 s | de 6,36 a 6,64 s |
| 390 px | Lento | `/en` | de 4,64 a 4,68 s | de 5,57 a 5,61 s |
| 1350 px | Sem limite | `/` e `/en` | de 3,86 a 3,90 s | de 4,78 a 5,07 s |
| 1350 px | Lento | `/` e `/en` | de 4,59 a 4,74 s | de 5,89 a 6,72 s |

- A sequência nunca é cortada: em todas as medições, o voo começa cerca de 350 ms depois do fim dela.
- No lento, o elemento do LCP pode ser o `h1` ou o primeiro print, que já carrega com prioridade alta.
- JavaScript atrasado 4,5 s: a Reescrita termina em 2,7 s, o nome voa em 4,63 s e a rolagem solta em 5,43 s.
- JavaScript atrasado 9 s: a saída de segurança solta a página em 7,03 s, sem voo, com o nome no cabeçalho e a rolagem funcionando.
- Deslocamento de layout igual ao de antes: 0 em `/`, e até 0,039 em `/en` a 1350 px, por baixo do preloader.

---

## Stage 8 — Verification

- **lint:** Pass
- **typecheck:** Pass
- **build:** Pass
- **Navegador (390 px e computador, `/` e `/en`, escuro e claro):** Pass, em emulação. Falta aparelho real
- **Pendente:** Web Analytics no painel da Vercel e item 10

---

## Stage 9 — Walkthrough

*(Preenchido pelo walkthrough.)*

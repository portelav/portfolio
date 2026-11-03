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

1. [ ] Docs: fechar os TODOs do `docs/fdd/contato.md` com o texto aprovado, status `aprovado`
2. [ ] Mensagens e componente: bloco da nota com âncora `#privacidade`, composto na página depois de Contato
3. [ ] Rodapé: link da nota, nos dois idiomas
4. [ ] Medição: `@vercel/analytics` e `Analytics` no layout. Ligar no painel da Vercel e conferir no preview que a visita chega e nenhum cookie é criado
5. [ ] Conferência: percorrer os critérios dos sete FDDs no navegador, inclusive teclado, leitor de tela, sem JavaScript, movimento reduzido e deslocamento de layout. Registrar no Stage 7. Já conhecido: conferir se o título de `#site` para abaixo do cabeçalho
6. [ ] Tecnologias: aplicar a resposta sobre o Motion, e fechar o TODO do FDD
7. [ ] Limpeza: tirar marcas `SPIKE`, `cropX` e comentários de rascunho
8. [ ] Desempenho: medir LCP no build de produção, com 4G simulado. Acima de 2,5 s, parar e levar os números a Lucas
9. [ ] Docs: status dos FDDs, PRD seção 6, ROADMAP e estado no `CLAUDE.md`
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

---
name: fix-loop
description: "Loop autônomo de correção de bug do portfolio, reproduce-first. Aceita sintoma, log, stack trace ou relato de tela quebrada, reproduz o bug com evidência objetiva antes de tocar código, corrige iterando até as verificações ficarem verdes, e termina em PR com causa raiz. Use quando o usuário disser /fix-loop, reproduz e corrige, resolve esse bug ponta a ponta, corrige até ficar verde, ou colar erro pedindo correção."
---

# Fix Loop — reproduzir, corrigir até verde, PR com causa raiz

**Reproduz o bug com evidência objetiva antes de editar código**, corrige iterando, entrega PR com causa raiz e proteção contra regressão. Não faz merge.

## Regras de ouro

1. **Reproduce-first.** Sem reprodução observável, parar e reportar o que tentou. Nunca fingir que corrigiu.
2. **Autônomo no meio.** Dentro do loop corrigir → verificar não perguntar. Parar só em: reprodução impossível, 5 iterações sem verde, ou fim.
3. **Confiar no relato.** O sintoma do usuário é sinal forte; rastrear a causa, não defender o código.

## Fluxo

### 1. Contexto
Localizar o código e ler o FDD: qual era o comportamento esperado.

### 2. Branch
`git status --porcelain` limpo; `main` atualizada; `git checkout -b fix/<slug>`.

### 3. Reproduzir (vermelho confirmado)

`npm run dev`, abrir a página pelo MCP do Chrome DevTools em 390×844 (e no computador, se o bug for de layout). Evidência objetiva: console, rede com status real, screenshot. Bug de produção que não aparece no dev: reproduzir no build de produção.

Não reproduziu? **Parar** e reportar.

### 4. Loop até verde
1. Correção mínima.
2. Rodar a reprodução. Tem que passar.
3. `npm run lint && npm run typecheck && npm run build`.
4. Algo vermelho: voltar ao 1.

### 5. Entregar
- Commits separados: `fix(<area>): ...` e `test(<area>): ...`.
- PR (`/pr`) com **causa raiz** em 2 a 4 frases, como reproduzir, o que mudou, evidência antes e depois.

## Gates humanos
- Reprodução impossível: para e reporta.
- Destrutivo (mexer em produção, reescrever histórico): nunca dentro do loop.

Responda sempre em português do Brasil.

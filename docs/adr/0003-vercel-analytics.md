# ADR 0003: Vercel e Web Analytics

Status: aceito
Data: 2026-11-01

## Contexto

O portfólio já publica em `portelav.vercel.app`, e Lucas quer saber se o site é visto (PRD, D14) sem pôr banner de cookies na página (PRD, seção 7). O site não tem servidor próprio, banco nem formulário.

## Decisão

Hospedagem na Vercel, com produção a partir da `main` e preview por branch e por PR. Medição com Vercel Web Analytics.

## Alternativas consideradas

- Google Analytics: mais detalhe, mas usa cookies e pede banner de consentimento.
- Sem medição: nenhuma obrigação, mas nenhuma ideia de visitas nem de origem.

## Consequências

- A `v2` tem URL de preview própria durante a reconstrução, enquanto a `main` mantém a versão antiga no ar.
- A nota de privacidade precisa citar a medição e a Vercel.
- URL e parâmetro de busca não podem carregar dado pessoal, porque entram na medição.
- O plano grátis tem limite de eventos. Conferir no painel depois do lançamento.
- Trocar de hospedagem mais tarde exige trocar também a medição.

Nota (2026-11-02): não há `v2`. A reconstrução tem projeto próprio na Vercel, e `portelav.vercel.app` passa para ele no lançamento. Ver PRD, D21. A escolha de hospedagem e medição não muda.

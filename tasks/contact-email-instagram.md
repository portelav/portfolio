# E-mail em "Quer um site?" e Instagram em Contato

**Slug:** `contact-email-instagram`
**Branch:** `feat/contact-email-instagram`
**Seção ou área:** Quer um site? e Contato
**Status:** Review
**Gate S2:** Livre (entrega pequena, decisão do dono em 2026-11-05)

---

## Stage 1 — Scope Analysis

- **Documentos:** PRD D73; `docs/fdd/quer-um-site.md`; `docs/fdd/contato.md`.
- **Objetivo:** quem prefere e-mail chega a Lucas com um toque, e o Instagram `@lucasportelav` entra em Contato.
- **Escopo:** botão de e-mail ao lado do de WhatsApp, com assunto pronto; Instagram em Contato; em `/en`, e-mail antes do WhatsApp nos dois lugares.
- **Fora:** mudar os textos escondidos em inglês, que Lucas aprovou como estão; outras redes.
- **Critérios de aceite:** os do FDD de cada seção.

## Stage 4 — Execution Planning

1. [x] PRD D73 e FDDs de Quer um site? e de Contato.
2. [x] Mensagens `Contact.instagram`, `Hire.ctaEmail` e `Hire.emailSubject`, em pt-BR e inglês.
3. [x] `src/lib/contact.ts`: link de e-mail, canal do Instagram e ordem por idioma.
4. [x] `quer-um-site.tsx` e `contato.tsx`.
5. [x] Ícones de WhatsApp, e-mail e Instagram no cabeçalho (PRD, D74): `contact-icons.tsx`, e no celular tema em ícone e idioma só com o outro.

## Stage 7 — Tests

- No HTML gerado, a ordem dos links: em pt-BR, WhatsApp, e-mail, e depois Contato com WhatsApp, e-mail e Instagram; em `/en`, e-mail antes do WhatsApp nos dois lugares. Mensagem e assunto no idioma da página.
- Em 390 px, `/en`, escuro: os dois botões com 44 px, sem transbordo.
- Cabeçalho: no computador, menu, três ícones de 44 px, PT, EN e a palavra do tema. No celular, sem transbordo em 390 px (26 px livres), 360 px (16 px) e 320 px (sem o Instagram, 16 px); sol no escuro e lua no claro; em `/en`, e-mail primeiro e só PT no idioma.
- `lint`, `typecheck` e `build` verdes.
- Falta Lucas abrir os links em aparelho real.

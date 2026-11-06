# ADR 0002: Dois idiomas com next-intl

Status: aceito
Data: 2026-11-01

## Contexto

O site nasce em português do Brasil e inglês (PRD, D8). A rota precisa ser indexável e compartilhável por idioma. O PRD proíbe cookie não essencial, porque ele pediria banner de consentimento.

## Decisão

`next-intl`, com pt-BR como idioma padrão em `/` e inglês em `/en`, usando `localePrefix: 'as-needed'`.

O idioma vem só da URL: `localeDetection: false` e `localeCookie: false`. A troca é por um seletor visível no site, e as páginas se apontam com `hreflang`.

## Alternativas consideradas

- Detectar pelo idioma do navegador: quem tem navegador em inglês e escolhe português acabaria redirecionado de volta, já que sem cookie o site não lembra a escolha.
- Manter o cookie padrão `NEXT_LOCALE`: acrescenta um cookie, e com ele a dúvida sobre consentimento, para ganho pequeno.
- Dois sites ou rotas feitas à mão: mais trabalho e mais chance de os idiomas saírem de sincronia.

## Consequências

- Todo texto de interface vive nos arquivos de mensagens. Nenhum texto fixo em componente.
- Toda entrega escreve as duas línguas. Mensagem faltando precisa quebrar a verificação, e isso entra na base técnica.
- `next-intl` usa `proxy.ts` para as rotas. A documentação não cita Next.js 16 pelo nome, embora mostre `proxy.ts`. A base técnica confere na prática, e o `package.json` publicado aceita Next `^16.0.0`.
- As rotas com nome traduzido usam `pathnames` do `next-intl`, como `/projetos/<id>` e `/en/projects/<id>` (PRD, D67).
- Quem abre `/` sempre vê português, mesmo com navegador em inglês. O seletor precisa estar visível desde o primeiro instante.

# Roadmap

Sem data fixa (PRD, D5). Todo o trabalho entra na `main` deste repositório, publicada em projeto próprio na Vercel. O endereço público só muda no lançamento (PRD, D21). Cada item é um `/plan`; o plano nasce quando o item começa.

## Agora

| Item | Critério de pronto | Plano |
|---|---|---|
| Base técnica | Next.js 16, Tailwind 4, Motion e `next-intl` rodando em `/` e `/en`. Tokens, fontes e ícones do kit no lugar. Hook de lint e typecheck, e CI com `gitleaks`, verdes em PR para `main` | `tasks/base-tecnica.md` |
| Direção "trabalho na primeira tela" (PRD, D44 a D56) | A branch `proto/trabalho-primeiro` passa por teste em aparelho real e auditoria, com os FDDs de cabeçalho e rodapé, abertura, projetos, sobre, tecnologias e quer um site atendidos, e entra na `main` | `tasks/trabalho-primeiro.md` |
| Contato e nota de privacidade | FDD `docs/fdd/contato.md` aprovado e implementado, com os quatro canais, nota nos dois idiomas e link no rodapé | `tasks/trabalho-primeiro.md` |
| Página de caso da landing (PRD, D67) | FDD `docs/fdd/caso.md` implementado, com o caso da landing nos dois idiomas | `tasks/case-study-landing.md` |
| Lançamento | Critérios do PRD, seção 10, cumpridos. Web Analytics ligado. Prévia de link pronta. `noindex` retirado. Teste de 1 minuto feito. LCP medido. Conferido no painel da Vercel como `portelav.vercel.app` passa de projeto, e o endereço apontando para o projeto novo | a criar |

## Depois

- Domínio próprio (PRD, D7).
- Outros projetos além dos três casos em destaque.
- Regravar os vídeos dos casos com mais capricho.
- Páginas de caso dos três projetos, no formato da landing (PRD, D67): feitas (`tasks/case-study-landing.md`, `tasks/case-study-draftcs.md` e `tasks/case-study-crewz.md`).

## Talvez

- Referência a eXtreme Go Horse como detalhe escondido.
- Símbolo do salto do cavalo como detalhe do site, sem substituir a marca.

## Aberto (depende de alguém)

| O quê | De quem | Desde |
|---|---|---|
| Currículo em PDF, nos dois idiomas | Lucas | 2026-11-03 |
| Revisão do inglês | Lucas | 2026-11-03 |

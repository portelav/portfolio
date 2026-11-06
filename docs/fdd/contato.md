# FDD: Seção Contato e nota de privacidade

Status: implementado
PRD: seção 6, itens Contato e Nota de privacidade; D9, D10, D14, D24, D32, D54, D57 e D73; Regras de fora

## Objetivo

Quem quer falar com Lucas encontra todos os caminhos em um lugar só, e sabe o que o site mede.

## Conteúdo

**Contato.** Inglês proposto, para revisão de Lucas.

| Lugar | pt-BR | Inglês |
|---|---|---|
| Título | Contato | Contact |
| Apoio | Se quiser conversar sobre estágio ou um site, é por aqui. | If you want to talk about an internship or a website, reach me here. |

| Ordem | Canal | Mostra | Leva a |
|---|---|---|---|
| 1 | WhatsApp | O número de Lucas | Conversa no WhatsApp |
| 2 | E-mail | O endereço de Lucas | Novo e-mail |
| 3 | Instagram | `@lucasportelav` | Perfil no Instagram |
| 4 | LinkedIn | O perfil de Lucas | LinkedIn |
| 5 | GitHub | `portelav` | https://github.com/portelav |

Em `/en`, o e-mail vem primeiro e o WhatsApp em segundo; o resto segue a mesma ordem (PRD, D73).

Número, e-mail e links moram em um arquivo só, `src/lib/contact.ts` (PRD, D9 e D24). Não são repetidos em documento.

**Nota de privacidade.** O que precisa dizer (PRD, Regras de fora), em pt-BR e inglês:

- O que é medido: visitas e origem, pelo Vercel Web Analytics.
- Para quê: saber se o site está sendo visto.
- Quem processa: a Vercel.
- Que o site não usa cookie não essencial, e que tema é guardado só no navegador do visitante.

Texto aprovado por Lucas em 2026-11-03:

| Lugar | pt-BR | Inglês |
|---|---|---|
| Título e link do rodapé | Privacidade | Privacy |
| Nota | Este site conta visitas e de onde elas vêm, para eu saber se ele está sendo visto. Quem faz essa contagem é a Vercel, com o Web Analytics, sem cookies. A sua escolha de tema fica só no seu navegador. | This website counts visits and where they come from, so I know whether it's being seen. Vercel does the counting, through Web Analytics, without cookies. Your theme choice stays in your browser. |

## Comportamento

- Última seção, com a âncora `#contato`.
- No computador, título e apoio à esquerda, presos ao rolar, e canais à direita. No celular, uma coluna.
- Cada canal é uma linha inteira clicável, com rótulo em Red Hat Mono, valor em Red Hat Display e uma seta decorativa.
- Separadores de 1 px em `--line`.
- Os links abrem na mesma aba.
- O e-mail fica em texto selecionável.
- A nota é um bloco curto depois de Contato, com a âncora `#privacidade`, em texto corrido e sem título grande (PRD, D57).
- O rodapé tem o link da nota, depois do texto de direitos (PRD, D32).

## Movimento

| O quê | Gatilho | Como | Por quê |
|---|---|---|---|
| Título e linhas | Rolagem, ao entrar na tela | Sobem 1,5 rem e aparecem | Dão ritmo sem prender a rolagem |
| Linha de contato | Hover | Anda 0,5 rem em 350 ms, e a seta anda mais 0,5 rem | Retorno de interação |

## Regras

1. Sem formulário (PRD, D10).
2. Nenhum cookie não essencial (PRD, D14).
3. Nenhum canal aparece sem destino real, nem com texto provisório.
4. Telefone e e-mail são só os do próprio Lucas (`CLAUDE.md`, Repositório público).
5. Toda linha tem no mínimo 44 px de altura.

## Acessibilidade

- Título em `h2`, e canais em lista.
- A seta fica oculta com `aria-hidden`.
- O nome de cada link junta rótulo e valor.
- Foco visível, como no `DESIGN.md`.
- Com `prefers-reduced-motion`, nada se move.

## Desempenho

- Sem mídia. Medição só com o script do Vercel Web Analytics.

## Fora de escopo

- Formulário e agendamento.
- Outras redes além do Instagram.

## Critérios de aceite

- [ ] Em 390 px e no computador, em `/` e `/en`, escuro e claro, sem transbordo, e a lista respeita as margens da página.
- [ ] "Falar sobre estágio" leva até a seção, com o título visível.
- [ ] Os cinco canais abrem o destino certo, testados em aparelho real.
- [ ] A nota de privacidade está no fim da página, nos dois idiomas, e o link do rodapé leva até ela com o texto visível.
- [ ] O navegador não mostra nenhum cookie não essencial.
- [ ] Leitor de tela lê rótulo e valor de cada canal, sem a seta.

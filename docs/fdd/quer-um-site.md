# FDD: Seção Quer um site?

Status: proposto (site em páginas, `tasks/site-pages.md`)
PRD: seção 6, item Quer um site?; D1, D22, D53, D73, D78 e D79

## Objetivo

Quem quer contratar um site entende o que recebe, como funciona e chega ao WhatsApp ou ao e-mail de Lucas com um toque.

## Conteúdo

O inglês é proposto, para revisão de Lucas.

| Lugar | pt-BR | Inglês |
|---|---|---|
| Título | Quer um site? | Need a website? |
| Oferta | Faço a página do seu negócio do desenho ao código, pensada primeiro para o celular e com um caminho direto até o seu WhatsApp. | I build the page for your business from design to code, made for phones first, with a direct path to your WhatsApp. |
| Botão de WhatsApp | Falar no WhatsApp | Message me on WhatsApp |
| Mensagem pronta | Oi, Lucas. Quero um site. | Hi Lucas, I need a website. |
| Botão de e-mail | Mandar e-mail | Send me an email |
| Assunto do e-mail | Quero um site | I need a website |
| Título dos passos | Como funciona | How it works |
| Passo 1 | Você me conta o que precisa. | You tell me what you need. |
| Passo 2 | Combinamos escopo e prazo por escrito. | We agree on scope and deadline in writing. |
| Passo 3 | Você acompanha por um link de prévia. | You follow along through a preview link. |
| Passo 4 | O site vai ao ar. | The website goes live. |

## Comportamento

- É a página Serviços (`/servicos`, `/en/services`). "Quer um site?" é o título da página, em `h1` (PRD, D78).
- "Quero um site", da abertura, e "Ver serviços", da chamada final da inicial, levam até aqui (PRD, D79).
- A linha de apoio passa a ser "Faço o site do seu negócio, do desenho ao código, pensado primeiro para o celular.", em inglês "I build your business website, from design to code, made for phones first." (`pagina-inicial.md`, Textos).
- No computador, oferta e botão à esquerda, e passos à direita. No celular, uma coluna.
- Dois botões: WhatsApp e e-mail, de Lucas, em `src/lib/contact.ts`, na mesma aba. O WhatsApp abre com a mensagem pronta, e o e-mail com o assunto pronto, no idioma da página.
- O primeiro botão é cheio, em `--fg`, e o segundo tem só contorno de 1 px em `--fg`. Em pt-BR, o WhatsApp vem primeiro; em `/en`, o e-mail (PRD, D73).
- Um separador de 1 px em `--line` no topo da seção, e entre os passos.

## Movimento

A seção sobe 1,5 rem e aparece ao entrar na tela, ligada à rolagem. O botão muda de opacidade no hover, em 150 ms.

## Regras

1. Sem preço por enquanto (PRD, D53).
2. Os passos são compromisso de Lucas: só entra o que ele cumpre.
3. O texto não diz nem sugere que a landing da Dra. Thaiane foi trabalho para cliente (PRD, D22).
4. Sem formulário (PRD, D10).
5. Botões com no mínimo 44 px de altura.

## Acessibilidade

- Título em `h2`, e passos em `ol`, com a numeração visível oculta para leitor de tela, que já anuncia a ordem da lista.
- Botão como link com texto claro.
- Foco visível, como no `DESIGN.md`.
- Com `prefers-reduced-motion`, tudo aparece sem efeito.

## Desempenho

- Sem mídia nem JavaScript novo.

## Fora de escopo

- Tabela de preços e pacotes.
- Depoimentos.
- Formulário de orçamento.

## Critérios de aceite

- [ ] Em 390 px e no computador, em `/` e `/en`, escuro e claro, sem transbordo.
- [ ] "Quero um site" e "Ver serviços" levam à página Serviços.
- [ ] Os botões abrem o WhatsApp e o e-mail certos, com mensagem e assunto no idioma da página, testados em aparelho real.
- [ ] Em `/en`, o e-mail vem primeiro.
- [ ] O número aparece em um arquivo só no código.
- [ ] Leitor de tela lê os passos como lista ordenada.

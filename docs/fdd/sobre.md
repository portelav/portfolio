# FDD: Seção Sobre

Status: proposto (site em páginas, `tasks/site-pages.md`)
PRD: seção 6, item Sobre; D17, D55, D61, D76, D77 e D78

## Objetivo

O visitante entende como Lucas trabalha: com cuidado nos detalhes, em uma frase, e com AI-Driven Development, em destaque, com os passos do método.

## Conteúdo

O inglês é proposto, para revisão de Lucas.

| Lugar | pt-BR | Inglês |
|---|---|---|
| Título | Sobre | About |
| Frase | Curso Ciência da Computação e me importo com os pequenos detalhes: como o site fica no celular, o tempo de cada animação, o texto de cada botão. | I study Computer Science and I care about the small details: how a website feels on a phone, the timing of each animation, the words on each button. |
| Método, título | Trabalho com AI-Driven Development. | I work with AI-Driven Development. |
| Passo 1 | Escrevo a documentação: o que o produto faz, para quem, as regras e cada decisão. | I write the documentation: what the product does, who it's for, the rules and every decision. |
| Passo 2 | Agentes de IA escrevem o código a partir dela. | AI agents write the code from it. |
| Passo 3 | Eu reviso, testo no celular e no computador e ajusto até ficar certo. | I review it, test it on phone and desktop, and adjust until it's right. |
| Repositório | Este site foi feito assim: o código e as decisões estão no repositório público. | This website was built this way: the code and the decisions are in the public repository. |
| Texto alternativo | Ilustração de Lucas Portela, sorrindo, de barba e camiseta preta. | Illustration of Lucas Portela, smiling, with a beard and a black T-shirt. |

- Retrato: `public/sobre/lucas.webp`, 1100 x 1100, recortado em círculo de borda nítida, sem degradê.
- "Repositório público" é link para https://github.com/portelav/portfolio.
- No título do método, "AI-Driven Development" fica em `--accent`, como o destaque da frase de apresentação. É texto grande, então passa também no modo claro (`DESIGN.md`, seção 3).

## Comportamento

- Abre a página Sobre (`/sobre`, `/en/about`), com o título "Sobre" em `h1`. Tecnologias vem depois, na mesma página (PRD, D78).
- O passo 1 do método passa a ser "Escrevo a documentação: o produto, o público, as regras e cada decisão.", em inglês "I write the documentation: the product, the audience, the rules and every decision." (`pagina-inicial.md`, Textos).
- No computador, o retrato ocupa 3 de 12 colunas, à esquerda, e o texto fica à direita, centrado na altura.
- No celular, o retrato vem antes do texto, com no máximo 14 rem de largura.
- Um separador de 1 px em `--line` no topo da seção.
- O método vem depois do retrato e da frase, separado por uma linha de 1 px em `--line`. No computador, o título fica à esquerda, em 4 de 12 colunas, e os passos e o link à direita. No celular, um embaixo do outro.
- Os passos são uma lista numerada, no mesmo desenho dos passos de "Quer um site?".

## Movimento

A seção sobe 1,5 rem e aparece ao entrar na tela, ligada à rolagem. Sem efeito preso à rolagem e sem texto que se acende aos poucos (PRD, D55).

## Regras

1. A frase é uma só e não cita o nome da instituição (PRD, D61).
2. O método é apresentado como forma de trabalho, nunca como "estou aprendendo" (PRD, D76).
3. A frase não cita o período do curso (PRD, D36).
4. Retrato em tamanho contido, nunca como elemento principal da seção.
5. Imagem sem metadado.

## Acessibilidade

- Título em `h2` e título do método em `h3`. Ordem de leitura: retrato, título, frase, método, passos, link.
- Sublinhado no link, sem depender só da cor.
- Com `prefers-reduced-motion`, tudo aparece sem efeito.

## Desempenho

- WebP, com carga sob demanda e dimensões reservadas.

## Fora de escopo

- Outros dados pessoais.
- Linha do tempo ou roleta da trajetória.

## Critérios de aceite

- [ ] Em 390 px e no computador, em `/` e `/en`, escuro e claro, sem transbordo.
- [ ] O retrato não domina a seção.
- [ ] O link abre o repositório público.
- [ ] A imagem não tem metadado nem provoca deslocamento de layout.
- [ ] Leitor de tela lê o título, a frase, o método, os passos e o link, na ordem.
- [ ] O método tem destaque visível sem tirar o foco da frase, em escuro e claro.

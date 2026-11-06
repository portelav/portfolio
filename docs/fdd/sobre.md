# FDD: Seção Sobre

Status: implementado
PRD: seção 6, item Sobre; D17, D55 e D61

## Objetivo

O visitante entende como Lucas trabalha, em uma frase.

## Conteúdo

O inglês é proposto, para revisão de Lucas.

| Lugar | pt-BR | Inglês |
|---|---|---|
| Título | Sobre | About |
| Frase | Curso Ciência da Computação e me importo com os pequenos detalhes: como o site fica no celular, o tempo de cada animação, o texto de cada botão. | I study Computer Science and I care about the small details: how a website feels on a phone, the timing of each animation, the words on each button. |
| Repositório | O código deste site é público, com as decisões registradas no repositório. | This website's code is public, with its decisions on record in the repository. |
| Texto alternativo | Ilustração de Lucas Portela, sorrindo, de barba e camiseta preta. | Illustration of Lucas Portela, smiling, with a beard and a black T-shirt. |

- Retrato: `public/sobre/lucas.webp`, 1100 x 1100, recortado em círculo de borda nítida, sem degradê.
- "Repositório" é link para https://github.com/portelav/portfolio.

## Comportamento

- Fica depois de Projetos.
- No computador, o retrato ocupa 3 de 12 colunas, à esquerda, e o texto fica à direita, centrado na altura.
- No celular, o retrato vem antes do texto, com no máximo 14 rem de largura.
- Um separador de 1 px em `--line` no topo da seção.

## Movimento

A seção sobe 1,5 rem e aparece ao entrar na tela, ligada à rolagem. Sem efeito preso à rolagem e sem texto que se acende aos poucos (PRD, D55).

## Regras

1. O texto cabe em uma frase e não cita o nome da instituição (PRD, D61).
2. A frase não cita o período do curso (PRD, D36).
3. Retrato em tamanho contido, nunca como elemento principal da seção.
4. Imagem sem metadado.

## Acessibilidade

- Título em `h2`. Ordem de leitura: retrato, título, frase, link.
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
- [ ] Leitor de tela lê o título, a frase e o link, na ordem.

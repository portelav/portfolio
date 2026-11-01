# FDD: Seção Abertura

Status: rascunho
PRD: seção 6, item Abertura

## Objetivo

Em poucos segundos, o visitante vê o nome `portelav` ser reescrito e entende quem é Lucas e o que encontra no site.

## Conteúdo

- Nome `portelav`, com o cursor âmbar no fim.
- A palavra primeiro em Libre Caslon Text, a letra de livro de Direito. Depois em IBM Plex Mono Medium, a da marca.
- > TODO: frase de apresentação em pt-BR e inglês. Depende de Lucas. Dados confirmados: Ciência da Computação, Afya UNIMA, 4º período (PRD, D17).
- > TODO: se a abertura traz chamadas para Projetos e Contato, e com que texto.

## Comportamento

- O nome é o elemento principal da primeira dobra, em 390 px e no computador.
- O seletor de idioma aparece desde o primeiro instante (ADR 0002).
- A animação não prende o visitante: ele pode rolar e usar links enquanto ela roda.
- > TODO: layout final e se a animação repete a cada visita ou só na primeira da sessão. Decidir no `/plan`, com protótipo no navegador.

## Movimento

**Reescrita**, a história da troca do Direito pelo código:

1. A palavra aparece em Libre Caslon Text.
2. O cursor âmbar apaga a palavra.
3. O cursor digita a palavra de novo, em IBM Plex Mono Medium. Cada letra leva de 140 a 230 ms, como no protótipo aprovado da marca.
4. O cursor fica no fim e pisca. Ele nunca some.
5. Depois de 5 s piscando, o cursor para aceso. Ele volta a piscar por mais 5 s ao passar o mouse ou focar (PRD, D16).

Piscar: `steps(1)`, ciclo de 1,06 s, como no kit de marca. Em toque, sem hover, o cursor fica aceso depois dos 5 s.

Nunca anima: nada além da letra e do cursor. Sem desfoque, sem glitch, sem fade do cursor.

## Regras

1. O quadro final é igual ao arquivo `nome-*` do kit, em forma, proporção e cores do modo atual.
2. O nome parado usa só uma fonte. As duas fontes convivem só durante a animação.
3. Símbolo e nome nunca aparecem juntos.
4. Em volta do nome, há um espaço livre de pelo menos a largura do bloco âmbar. O nome tem no mínimo 96 px de largura.
5. Nenhum cursor pisca por mais de 5 s sem interação, em nenhum lugar do site.
6. Os arquivos `nome-animado-*` do kit piscam sem parar, então não entram em página do site. O site usa o mesmo desenho em um componente que obedece à regra 5.

## Acessibilidade

- Leitor de tela lê o nome uma vez só, sem soletrar a digitação. As letras animadas ficam ocultas com `aria-hidden`.
- Com `prefers-reduced-motion`, a página abre direto no quadro final, com cursor aceso e sem Reescrita.
- Sem JavaScript, o quadro final aparece igual.
- Contraste: ver `docs/design/DESIGN.md`. O âmbar do modo claro só vale para o bloco e texto grande.

## Desempenho

- Sem deslocamento de layout: a caixa do nome é reservada com a largura final desde o início.
- Libre Caslon Text carrega só com os glifos de `portelav`, via `next/font`, e não atrasa o LCP.
- A animação usa só `opacity` e `transform`. Trocar a visibilidade de cada letra não muda a medida da caixa.

## Fora de escopo

- O símbolo do salto do cavalo e a referência a eXtreme Go Horse. Estão como Talvez no ROADMAP.
- Vídeo ou imagem de fundo.

## Critérios de aceite

- [ ] Em 390 px e no computador, a sequência roda até o fim, sem deslocamento de layout medido.
- [ ] Quadro final comparado ao `nome-escuro.svg` e ao `nome-claro.svg`, sem diferença visível.
- [ ] O cursor para aceso depois de 5 s e volta a piscar com hover ou foco.
- [ ] Com `prefers-reduced-motion`, nenhuma animação roda.
- [ ] Com JavaScript desligado, o nome aparece completo.
- [ ] Leitor de tela anuncia o nome uma vez.
- [ ] Abertura funciona em `/` e em `/en`, com os textos do idioma certo.

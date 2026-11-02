# FDD: Seção Abertura

Status: aprovado
PRD: seção 6, item Abertura

## Objetivo

Em poucos segundos, o visitante vê o nome `portelav` ser reescrito, sabe que ele é de Lucas Portela e entende o que encontra no site.

## Conteúdo

- Nome `portelav`, com o cursor âmbar no fim.
- A palavra primeiro em Libre Caslon Text, a letra de livro de Direito. Depois em IBM Plex Mono Medium, a da marca. As duas em vetor.
- Frase de apresentação, em texto, começando com "Lucas Portela" (PRD, D28).
- > TODO: resto da frase, em pt-BR e inglês. Depende de Lucas. Dados confirmados: Ciência da Computação, Afya UNIMA, 4º período (PRD, D17).
- > TODO: a troca do Direito pela computação é dita nesta frase ou no Sobre (PRD, D23). Depende de Lucas.
- Duas chamadas, para Projetos e para Contato (PRD, D28).
- > TODO: texto das chamadas, em pt-BR e inglês. Depende de Lucas.

## Comportamento

- O nome é o elemento principal da primeira dobra, em 390 px e no computador.
- O seletor de idioma aparece desde o primeiro instante (ADR 0002).
- Na primeira dobra, o cabeçalho mostra só os seletores. O nome entra nele depois que a abertura sai da tela (PRD, D30). O detalhe fica no FDD de Cabeçalho e rodapé.
- A animação não prende o visitante: ele pode rolar e usar as chamadas enquanto ela roda.
- A Reescrita roda só na primeira carga da sessão, marcada em `sessionStorage`. Recarregar ou trocar de idioma ou de tema não a repete: o visitante vê o quadro final (PRD, D29).
- O HTML traz o quadro final. Um script curto, antes da primeira pintura, troca para o quadro em Caslon só quando a Reescrita vai rodar. Assim o visitante nunca vê o nome pronto voltar para o início.
- Se a Reescrita não começar até 1 s depois da primeira pintura, o nome vai direto para o quadro final. Valor proposto, a ajustar no protótipo.
- > TODO: layout final. Decidir no `/plan`, com protótipo no navegador.

## Movimento

**Reescrita**, a história da troca do Direito pelo código. Teto provisório de 3 s (PRD, D29):

1. A palavra aparece em Libre Caslon Text e fica parada por 500 ms, sem cursor.
2. O cursor âmbar surge no fim da palavra e, depois de 200 ms, apaga a palavra, a 40 ms por letra.
3. Depois de 130 ms, o cursor digita a palavra de novo, em IBM Plex Mono Medium. Cada letra leva de 140 a 230 ms, como no protótipo, e a digitação soma no máximo 1,8 s.
4. O cursor fica no fim e pisca. A partir daqui, ele nunca some.
5. Depois de 5 s piscando, o cursor para aceso. Ele volta a piscar por mais 5 s ao passar o mouse. O foco só faz isso onde o nome é link, como no cabeçalho (PRD, D27).

O teto e os tempos dos passos 1 e 2 são provisórios. Lucas fecha o tempo vendo o protótipo no navegador, no `/plan`.

Protótipo de origem: opção Reescrita de `C:\prog\identidade-visual\.superpowers\brainstorm\749-1793501271\content\virada-uma-fonte.html`. Ele leva cerca de 3,7 s, com 900 ms parado, 500 ms até apagar, 60 ms por letra ao apagar e 350 ms de pausa. O ritmo da digitação é mantido, e só o que vem antes dela foi encurtado.

Piscar: `steps(1)`, ciclo de 1,06 s, como no kit de marca. Em toque, sem hover, o cursor fica aceso depois dos 5 s.

Nunca anima: nada além da letra e do cursor. Sem desfoque, sem glitch, sem fade do cursor.

## Regras

1. O quadro final usa o vetor do arquivo `nome-*` do kit, dividido em letras, sem mudar forma, proporção nem as cores do modo atual.
2. O nome parado usa só uma fonte. As duas fontes convivem só durante a animação.
3. Símbolo e nome nunca aparecem juntos.
4. Em volta do nome, há um espaço livre de pelo menos a largura do bloco âmbar. O nome tem no mínimo 96 px de largura.
5. Nenhum cursor pisca por mais de 5 s sem interação, em nenhum lugar do site.
6. Os arquivos `nome-animado-*` do kit piscam sem parar, então não entram em página do site. O site usa o mesmo desenho em um componente que obedece à regra 5.
7. Na abertura, o nome não recebe foco de teclado, porque não é link.

## Acessibilidade

- Leitor de tela lê o nome uma vez só, sem soletrar a digitação. Os vetores animados ficam ocultos com `aria-hidden`, e o nome vem de um texto alternativo.
- Com `prefers-reduced-motion`, a página abre direto no quadro final, com cursor aceso e sem Reescrita. O cursor também não pisca no hover.
- Sem JavaScript, o quadro final aparece igual.
- Contraste: ver `docs/design/DESIGN.md`. O âmbar do modo claro só vale para o bloco e texto grande.

## Desempenho

- Sem deslocamento de layout: a caixa do nome é reservada com a largura final desde o início, e o quadro em Caslon cabe nela.
- A Reescrita não carrega fonte: Caslon e Plex Mono vão em vetor, no próprio HTML. O SVG do kit é hoje um path único mais o bloco âmbar, então a divisão em 8 letras e a vetorização da Caslon entram na entrega.
- LCP abaixo de 2,5 s no 4G (PRD, seção 8).
- A animação usa só `opacity` e `transform`. Trocar a visibilidade de cada letra não muda a medida da caixa.

## Fora de escopo

- O símbolo do salto do cavalo e a referência a eXtreme Go Horse. Estão como Talvez no ROADMAP.
- Vídeo ou imagem de fundo.

## Critérios de aceite

- [ ] Em 390 px e no computador, a sequência roda até o fim no tempo fechado no protótipo, sem deslocamento de layout medido.
- [ ] Na primeira dobra, em 390 px e no computador, aparecem "Lucas Portela" e as duas chamadas, e elas levam a Projetos e a Contato.
- [ ] Dá para rolar e usar as chamadas durante a animação.
- [ ] Recarregar na mesma sessão, ou trocar de idioma ou de tema, não repete a Reescrita.
- [ ] Com CPU e rede limitadas, o nome pronto não aparece antes do quadro em Caslon. Se a Reescrita atrasar mais que o limite, o nome vai direto ao quadro final.
- [ ] Quadro final comparado ao `nome-escuro.svg` e ao `nome-claro.svg`, sem diferença visível.
- [ ] O cursor para aceso depois de 5 s e volta a piscar com hover. Na abertura, o nome não entra na ordem de foco.
- [ ] Com `prefers-reduced-motion`, nenhuma animação roda, nem no hover.
- [ ] Com JavaScript desligado, o nome aparece completo.
- [ ] Leitor de tela anuncia o nome uma vez.
- [ ] LCP abaixo de 2,5 s no 4G, medido com Lighthouse.
- [ ] Abertura funciona em `/` e em `/en`, com os textos do idioma certo.

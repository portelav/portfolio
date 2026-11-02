# FDD: Seção Abertura

Status: implementado
PRD: seção 6, item Abertura

## Objetivo

Em poucos segundos, o visitante vê o nome `portelav` ser reescrito, sabe que ele é de Lucas Portela e entende o que encontra no site.

## Conteúdo

- Nome `portelav`, com o cursor âmbar no fim.
- A palavra primeiro em Libre Caslon Text, a letra de livro de Direito. Depois em IBM Plex Mono Medium, a da marca. As duas em vetor.
- Frase de apresentação, em texto (PRD, D37): "Me chamo Lucas Portela e estudo Ciência da Computação. Atualmente estou aprendendo a desenvolver com IA." Em inglês: "My name is Lucas Portela and I study Computer Science. Right now I'm learning to build software with AI."
- A frase não cita o período, para não envelhecer (PRD, D36).
- A troca do Direito pela computação é contada no Sobre, não aqui (PRD, D34).
- Duas chamadas: "Ver projetos" e "Falar comigo"; em inglês, "See projects" e "Get in touch" (PRD, D35).

## Comportamento

- O nome é o elemento principal da primeira dobra, em 390 px e no computador.
- O seletor de idioma aparece desde o primeiro instante (ADR 0002).
- Na primeira dobra, o cabeçalho mostra só os seletores. O nome entra nele depois que a abertura sai da tela (PRD, D30). O detalhe fica no FDD de Cabeçalho e rodapé.
- A animação não prende o visitante: ele pode rolar e usar as chamadas enquanto ela roda.
- A Reescrita roda só na primeira carga da sessão, marcada em `sessionStorage`. Recarregar ou trocar de idioma ou de tema não a repete: o visitante vê o quadro final (PRD, D29).
- O HTML traz o quadro final. Um script curto, antes de o nome ser pintado, marca a página só quando a Reescrita vai rodar, e o CSS cuida da sequência. Assim ela não espera o JavaScript da página, e o visitante nunca vê o nome pronto voltar para o início.
- As chamadas levam às seções Projetos e Contato. Até essas seções existirem, os links não têm destino. O lançamento exige que funcionem.
- Layout fechado por Lucas no preview (PRD, D38): à esquerda e centrado na altura da primeira dobra. Nome com a largura toda no celular e até 672 px no computador. Frase e chamadas abaixo dele.

## Movimento

**Reescrita**, a história da troca do Direito pelo código. Leva 2,6 s até o fim da digitação (PRD, D38):

1. A palavra aparece em Libre Caslon Text e fica parada por 500 ms, sem cursor.
2. O cursor âmbar surge no fim da palavra e, depois de 200 ms, apaga a palavra, a 40 ms por letra.
3. Depois de 130 ms, o cursor digita a palavra de novo, em IBM Plex Mono Medium. Cada letra leva de 140 a 230 ms, como no protótipo, com intervalos fixos.
4. O cursor fica no fim e pisca. A partir daqui, ele nunca some.
5. Depois de 5 s piscando, o cursor para aceso. Ele volta a piscar por mais 5 s ao passar o mouse. O foco só faz isso onde o nome é link, como no cabeçalho (PRD, D27).

Lucas fechou esses tempos vendo a animação no preview (PRD, D38).

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
- A Reescrita não carrega fonte: Caslon e Plex Mono vão em vetor, no próprio HTML. As 8 letras finais somadas são exatamente o path do kit.
- LCP abaixo de 2,5 s no 4G (PRD, seção 8).
- A animação usa só `opacity` e `transform`. Trocar a visibilidade de cada letra não muda a medida da caixa.

## Fora de escopo

- O símbolo do salto do cavalo e a referência a eXtreme Go Horse. Estão como Talvez no ROADMAP.
- Vídeo ou imagem de fundo.

## Critérios de aceite

- [ ] Em 390 px e no computador, a sequência roda até o fim em 2,6 s, sem deslocamento de layout medido.
- [ ] Na primeira dobra, em 390 px e no computador, aparecem "Lucas Portela" e as duas chamadas, e elas levam a Projetos e a Contato.
- [ ] Dá para rolar e usar as chamadas durante a animação.
- [ ] Recarregar na mesma sessão, ou trocar de idioma ou de tema, não repete a Reescrita.
- [ ] Com CPU e rede limitadas, o nome pronto não aparece antes do quadro em Caslon.
- [ ] Quadro final comparado ao `nome-escuro.svg` e ao `nome-claro.svg`, sem diferença visível.
- [ ] O cursor para aceso depois de 5 s e volta a piscar com hover. Na abertura, o nome não entra na ordem de foco.
- [ ] Com `prefers-reduced-motion`, nenhuma animação roda, nem no hover.
- [ ] Com JavaScript desligado, o nome aparece completo.
- [ ] Leitor de tela anuncia o nome uma vez.
- [ ] LCP abaixo de 2,5 s no 4G, medido com Lighthouse.
- [ ] Abertura funciona em `/` e em `/en`, com os textos do idioma certo.

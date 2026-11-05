# FDD: Seção Abertura

Status: implementado
PRD: seção 6, item Abertura; D44, D46, D48 e D49

## Objetivo

Depois de ver o nome `portelav` ser reescrito, o visitante sabe, na mesma tela, quem é Lucas Portela, o que ele faz e o que procura, e vê o começo do primeiro caso.

## Conteúdo

**Preloader**

- Nome `portelav`, com o cursor âmbar no fim.
- A palavra primeiro em Libre Caslon Text, a letra de livro. Depois em IBM Plex Mono Medium, a da marca. As duas em vetor.

**Primeira tela.** O texto em inglês é proposto, para revisão de Lucas.

| Lugar | pt-BR | Inglês |
|---|---|---|
| Frase de apresentação | Me chamo Lucas Portela e já fiz alguns sites que estão no ar. | I'm Lucas Portela, and I've built a few websites that are live. |
| Trecho em destaque | sites que estão no ar | websites that are live |
| Apoio | Estudo Ciência da Computação em Maceió. Procuro estágio em desenvolvimento e faço sites para quem precisa de um. | I study Computer Science in Maceió, Brazil. I'm looking for a development internship, and I build websites for people who need one. |
| Chamada para quem quer um site | Quero um site | I need a website |
| Chamada para quem avalia estágio | Falar sobre estágio | Talk about an internship |

- A frase não cita o período, para não envelhecer (PRD, D36).

> TODO: botão de currículo, quando existir o PDF nos dois idiomas. Até lá, sem link morto.

## Comportamento

- O preloader cobre a tela em toda carga de `/` e `/en` sem âncora (PRD, D46). Quem chega por um link com âncora vai direto ao conteúdo.
- Sequência: Reescrita de 2,6 s, pausa de 350 ms, e voo do nome até o cabeçalho em 800 ms, enquanto o véu some. São cerca de 3,8 s, contados da primeira pintura do nome. Se o JavaScript chegar depois do fim da Reescrita, o nome voa na hora (PRD, D60).
- A rolagem fica presa enquanto o preloader roda.
- Um script curto no `<head>`, antes da primeira pintura, marca a página para o preloader. Se algo falhar, a marca sai sozinha em 7 s e a página aparece.
- O HTML traz o estado final. Sem JavaScript, nada fica coberto.
- Depois do preloader, a frase ocupa até duas linhas no computador, em `text-huge`. Abaixo, o apoio à esquerda e as chamadas à direita. No celular, tudo em uma coluna.
- O primeiro caso começa logo abaixo, ainda na primeira tela (FDD de Projetos).
- "Quero um site" leva a `#site`. "Falar sobre estágio" leva a `#contato`.
- O destaque usa `--accent`, permitido por ser texto grande.

## Movimento

**Reescrita**, a passagem da letra de livro para a letra de código (PRD, D38):

1. A palavra aparece em Libre Caslon Text e fica parada por 500 ms, sem cursor.
2. O cursor âmbar surge no fim da palavra e, depois de 200 ms, apaga a palavra, a 40 ms por letra.
3. Depois de 130 ms, o cursor digita a palavra de novo, em IBM Plex Mono Medium. Cada letra leva de 140 a 230 ms, com intervalos fixos.
4. O nome voa até o cabeçalho, em 800 ms, com `cubic-bezier(0.77, 0, 0.175, 1)`.

**Chegada da primeira tela**, quando o preloader sai: `opacity` e `transform`, 900 ms em `--ease-out-quint`, subindo 1,5 rem. Atrasos: frase 0 ms, apoio 80 ms, chamadas 160 ms, título de Projetos 200 ms e primeiro caso 240 ms.

Nunca anima: nada além das letras, do cursor, do voo e da chegada. Sem desfoque, sem glitch.

## Regras

1. O quadro final usa o vetor do arquivo `nome-*` do kit, dividido em letras, sem mudar forma, proporção nem as cores do modo atual.
2. O nome parado usa só uma fonte. As duas fontes convivem só durante a animação.
3. Símbolo e nome nunca aparecem juntos.
4. Em volta do nome, há um espaço livre de pelo menos a largura do bloco âmbar. O nome tem no mínimo 96 px de largura.
5. Nenhum cursor pisca por mais de 5 s sem interação, em nenhum lugar do site.
6. Os arquivos `nome-animado-*` do kit piscam sem parar, então não entram em página do site.
7. As chamadas têm no mínimo 44 px de altura.

## Acessibilidade

- O preloader inteiro fica oculto com `aria-hidden`. Quem usa leitor de tela encontra o nome no cabeçalho, uma vez só.
- A frase de apresentação é o `h1`.
- Com `prefers-reduced-motion`, não há preloader nem chegada: a página abre direto no estado final.
- Sem JavaScript, o conteúdo aparece igual.
- Foco visível nas chamadas, como no `DESIGN.md`.
- Contraste: botão principal em `--bg` sobre `--fg`, acima de 16:1 nos dois modos. O destaque em âmbar só em texto grande.

## Desempenho

- Sem deslocamento de layout: o preloader é fixo, e o conteúdo já ocupa o lugar dele por baixo.
- A Reescrita não carrega fonte: Caslon e Plex Mono vão em vetor, no próprio HTML.
- O LCP fica acima dos 2,5 s da seção 8 do PRD, porque o conteúdo só conta depois do preloader. Exceção aceita pelo dono, com os valores medidos (PRD, D60 e D63).

## Fora de escopo

- O símbolo do salto do cavalo e a referência a eXtreme Go Horse. Estão como Talvez no ROADMAP.
- Vídeo ou imagem de fundo.

## Critérios de aceite

- [ ] Em 390 px e no computador, o preloader roda até o fim em cerca de 3,8 s, sem deslocamento de layout medido.
- [ ] O nome termina o voo exatamente no lugar dele no cabeçalho.
- [ ] Na primeira tela, em 390 px e no computador, aparecem a frase, o apoio, as duas chamadas e o começo do primeiro caso.
- [ ] "Quero um site" leva a `#site` e "Falar sobre estágio" leva a `#contato`, com o título visível.
- [ ] Abrir com âncora na URL não mostra o preloader.
- [ ] Quadro final comparado ao `nome-escuro.svg` e ao `nome-claro.svg`, sem diferença visível.
- [ ] Com `prefers-reduced-motion`, nenhuma animação roda, nem no hover.
- [ ] Com JavaScript desligado, todo o conteúdo aparece.
- [ ] Leitor de tela anuncia o nome uma vez e lê a frase como título principal.
- [ ] LCP dentro dos valores aceitos na D60 e na D63 do PRD, e o preloader termina em menos de 5 s no 4G lento simulado.
- [ ] Funciona em `/` e em `/en`, escuro e claro, com os textos do idioma certo.

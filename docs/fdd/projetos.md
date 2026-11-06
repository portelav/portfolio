# FDD: Seção Projetos

Status: implementado
PRD: seção 6, item Projetos; D3, D22, D40, D41, D43, D44, D50 e D51

## Objetivo

O visitante vê três projetos reais no ar, funcionando em vídeo, sabe qual foi a parte de Lucas em cada um e consegue abrir cada site.

## Conteúdo

Título da seção: "Projetos"; em inglês, "Projects". Rótulos: "Minha parte" e "Uma decisão"; em inglês, "My part" e "One decision". Textos nos arquivos de mensagens. O inglês é proposto, para revisão de Lucas.

**1. Dra. Thaiane Lessa**

| Campo | pt-BR | Inglês |
|---|---|---|
| Tipo | Site · feito sozinho | Website · built on my own |
| O que é | Página de uma cirurgiã-dentista em Maceió, que apresenta a profissional e leva o visitante ao WhatsApp. | A page for a dental surgeon in Maceió that introduces her and takes visitors to WhatsApp. |
| Minha parte | Tudo, do desenho ao código, pensado primeiro para o celular. | All of it, from design to code, made for phones first. |
| Uma decisão | Sem preço, sem promoção e sem promessa de resultado. Antes e depois só com autorização dos pacientes e com nome e CRO na imagem, por causa das regras do Conselho Federal de Odontologia (PRD, D68). | No patients, no before-and-after photos and no promised results, because of the Brazilian dental council's advertising rules. |
| Detalhe | Dra. Thaiane Lessa · CRO/AL-6418 | Dr. Thaiane Lessa · CRO/AL-6418 |

**2. DraftCS**

| Campo | pt-BR | Inglês |
|---|---|---|
| Tipo | Jogo web · em dupla com Vinicius | Web game · with Vinicius |
| O que é | Você sorteia um elenco real de um Major de Counter-Strike, escala cinco jogadores e simula a corrida pelo título. | You draw a real Counter-Strike Major roster, pick five players and simulate the run for the title. |
| Minha parte | Curadoria dos dados de jogadores, elencos e países, a rolagem do simulador no celular e a área de compartilhar o resultado. | Curating player, roster and country data, the simulator's scrolling on phones, and the area for sharing results. |

**3. Crewz**

| Campo | pt-BR | Inglês |
|---|---|---|
| Tipo | Rede social · em dupla com Vinicius | Social network · with Vinicius |
| O que é | Você acha grupos, eventos e pessoas pela atividade, como pedal, corrida ou clube do livro. | You find groups, events and people by activity, like cycling, running or book clubs. |
| Minha parte | Design system, redesenho visual, onboarding, perfil, mensagens diretas e busca. | Design system, visual redesign, onboarding, profile, direct messages and search. |

- "Ver caso completo", em inglês "See full case", nos casos que têm página de caso, hoje só a landing (`docs/fdd/caso.md`).
- Links: "Ver site" em todos, e "Ver código" só na landing, porque os outros repositórios são privados. Em inglês, "Visit website" e "See code".
- "Vinicius" é link para https://github.com/ViniciusLoureiro67/ (PRD, D41).

**Mídia de cada caso**

| Tela | Print | Vídeo |
|---|---|---|
| Computador, a partir de 768 px | `public/projetos/<id>.webp`, 1425 x 900 | `public/projetos/video/<id>.mp4`, H.264, 1280 x 808 |
| Celular | `public/projetos/celular/<id>.webp`, 780 x 1170, parte de cima da página | `public/projetos/video/celular/<id>.mp4`, H.264, 540 x 960 |

## Comportamento

- Fica logo abaixo da abertura, e o primeiro caso começa ainda na primeira tela (PRD, D44).
- Os casos ficam um abaixo do outro, nunca lado a lado, sem faixa lateral.
- No computador, a mídia ocupa 8 de 12 colunas, à esquerda, e o texto fica à direita. No celular, a ordem é nome e tipo, botões de versão, mídia e o resto do texto.
- Sem card nem sombra. Cada print tem uma borda de 1 px em `--line` (PRD, D43).
- O vídeo fica sobre o print, e só aparece quando há imagem de verdade. Sem o arquivo, sem rede ou com autoplay recusado, o print continua visível.
- O vídeo só começa a baixar depois do fim do preloader, e quando está a até uma tela de distância. Antes disso, fica o print.
- O vídeo toca quando pelo menos 60% dele está na tela, e pausa ao sair.
- O botão de pausa aparece quando o vídeo está pronto. Pausar um vídeo vale para os três, para ninguém precisar pausar de novo ao rolar.
- No celular, o vídeo é mais alto que o print: ele se alinha ao topo, e a parte de baixo fica cortada.
- O Crewz não tem layout de computador. A partir de 768 px, ele usa o print e o vídeo de celular, com a mesma altura dos outros casos, centrados na área da mídia (PRD, D65).
- Na landing e no DraftCS, dois botões, "Celular" e "Computador", acima da mídia no celular e abaixo dela, centrados, no computador, trocam o print e o vídeo, porque os dois layouts são diferentes (PRD, D66). Começa na versão da tela de quem visita, e a escolha vale só para aquele caso e só até recarregar a página.
- A versão de celular, escolhida no computador, ocupa o mesmo lugar e o mesmo tamanho da mídia do Crewz. A versão de computador, escolhida no celular, ocupa a largura da tela e fica mais baixa.
- A mídia não é link. Os links são os de texto. Os links externos abrem na mesma aba.

## Movimento

| O quê | Gatilho | Como | Por quê |
|---|---|---|---|
| Primeiro caso | Fim do preloader | Chegada da abertura, com atraso de 240 ms | Faz parte da primeira tela |
| Segundo e terceiro casos | Rolagem, ao entrar na tela | Sobem 1,5 rem e aparecem, ligados à rolagem | Dão ritmo sem prender a rolagem |
| Vídeo | Maior parte na tela | Aparece em 500 ms, sobre o print, em laço de cerca de 9 s | Mostra o site funcionando |

Sem `animation-timeline`, os casos aparecem sem efeito. Nunca muda a velocidade nem a direção da rolagem.

## Regras

1. Sem antes e depois, sem paciente identificável e sem promessa de resultado.
2. Nunca chamar a landing de trabalho para cliente (PRD, D22).
3. Print ou vídeo só entra com autorização de quem aparece, registrada em `private/`, e sem dado de outra pessoa.
4. Mídia sem metadado, otimizada, com dimensões reservadas e sem áudio.
5. Nada de telefone ou dado de contato de terceiro visível em print ou vídeo.
6. O print e o vídeo do Crewz mostram o app por dentro, no modo claro, gravados em ambiente local, só com as pessoas fictícias e as fotos de licença livre dos dados de demonstração (PRD, D65). O grupo da altinha e a conta do Handrey ficam de fora.
7. A parte de Lucas nunca é arredondada para cima (PRD, seção 9).
8. Sem três cards iguais lado a lado (`DESIGN.md`, seção 9).
9. Todo link de ação tem 44 px de área de toque. O link do nome, dentro da linha, fica como link de texto.

## Acessibilidade

- Título em `h2`, e cada caso com o nome em `h3`. Ordem de leitura: mídia, nome, tipo, descrição, parte, links.
- Texto alternativo nos dois idiomas, verdadeiro para as duas versões do print.
- O vídeo fica oculto com `aria-hidden`, porque o texto do caso diz o que ele mostra.
- O botão de pausa tem nome no idioma certo, 44 px e foco visível. Atende à WCAG 2.2.2.
- Com `prefers-reduced-motion`, o vídeo não toca sozinho, e o botão continua disponível.
- Links com nome claro, para o leitor de tela distinguir os três "Ver site".

## Desempenho

- Prints em WebP, em `<picture>`, cada tela baixa só o seu.
- Print trocado ganha nome novo, como `crewz-app.webp`, porque o otimizador de imagens e o navegador guardam o arquivo pelo endereço.
- O print do primeiro caso carrega com prioridade, porque está na primeira tela. Os outros carregam sob demanda.
- Vídeos com `preload="none"` no HTML, que passa a `metadata` quando o vídeo se aproxima da tela, entre 0,5 e 1 MB cada (PRD, D64).
- Largura e altura reservadas, sem deslocamento de layout.

## Fora de escopo

- Página própria para cada caso.
- Números de uso dos projetos, enquanto não houver dado confirmado.
- Telas internas do DraftCS.
- Outros projetos além dos três (ROADMAP, Depois).

## Critérios de aceite

- [ ] Em 390 px e no computador, em `/` e `/en`, escuro e claro, os três casos aparecem na ordem, sem transbordo.
- [ ] O começo do primeiro caso aparece na primeira tela, com o texto dele ao lado no computador.
- [ ] Celular carrega print e vídeo de celular, e computador os de computador.
- [ ] Toca um vídeo por vez, e a pausa de um vale para os outros.
- [ ] Nenhum vídeo baixa antes do fim do preloader, e os de mais abaixo só baixam perto de entrar na tela.
- [ ] Na landing e no DraftCS, os dois botões trocam print e vídeo, em qualquer tela, sem transbordo. O Crewz não tem os botões.
- [ ] Sem o arquivo de vídeo, o print fica visível e não aparece botão de pausa.
- [ ] Todos os links abrem o destino certo, e os de ação têm 44 px.
- [ ] Print e vídeo não têm metadado. Todos os quadros foram revistos.
- [ ] Com `prefers-reduced-motion`, nenhum vídeo toca sozinho.
- [ ] Leitor de tela distingue os links de cada caso, e toda imagem tem texto alternativo.
- [ ] Nenhum deslocamento de layout medido.

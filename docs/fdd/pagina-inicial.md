# FDD: Site em páginas e página inicial

Status: implementado
PRD: seção 6, item Site em páginas; D46, D67, D71, D78, D79, D80, D81 e D88 a D90

## Objetivo

Quem chega entende em segundos o que Lucas faz, vê os três projetos e acha cada assunto numa página própria, com pouco texto por tela.

## Mapa do site

| Página | pt-BR | Inglês | Conteúdo | FDD |
|---|---|---|---|---|
| Inicial | `/` | `/en` | Preloader, abertura, projetos em versão curta e chamada final | este |
| Projetos | `/projetos` | `/en/projects` | Os três casos completos, como hoje | `projetos.md` |
| Caso | `/projetos/[id]` | `/en/projects/[id]` | Página de caso, como hoje | `caso.md` |
| Sobre | `/sobre` | `/en/about` | Sobre, método e Tecnologias | `sobre.md` e `tecnologias.md` |
| Serviços | `/servicos` | `/en/services` | "Quer um site?", com oferta, passos e botões | `quer-um-site.md` |
| Contato | `/contato` | `/en/contact` | Canais de contato e nota de privacidade | `contato.md` |

## Textos

Aprovados por Lucas em 2026-11-08. Onde não há linha nova, o texto atual continua.

**Menu e páginas**

| Lugar | pt-BR | Inglês |
|---|---|---|
| Menu, itens | Projetos, Sobre, Serviços, Contato | Projects, About, Services, Contact |
| Menu, para leitor de tela | Páginas | Pages |
| Botão do menu no celular | Menu | Menu |
| Botão de fechar o menu | Fechar | Close |
| Título da aba, Projetos | Projetos · Lucas Portela | Projects · Lucas Portela |
| Título da aba, Sobre | Sobre · Lucas Portela | About · Lucas Portela |
| Título da aba, Serviços | Serviços · Lucas Portela | Services · Lucas Portela |
| Título da aba, Contato | Contato · Lucas Portela | Contact · Lucas Portela |
| Descrição, Projetos | Três projetos no ar: um site, um jogo web e uma rede social. | Three live projects: a website, a web game and a social network. |
| Descrição, Sobre | Como Lucas Portela trabalha e com quais tecnologias. | How Lucas Portela works and which technologies he uses. |
| Descrição, Serviços | Sites para negócios, pensados primeiro para o celular. | Websites for businesses, made for phones first. |
| Descrição, Contato | WhatsApp, e-mail, Instagram, LinkedIn e GitHub. | WhatsApp, email, Instagram, LinkedIn and GitHub. |

**Página inicial**

| Lugar | pt-BR | Inglês |
|---|---|---|
| Frase e linha de apoio | Sem mudança | Sem mudança |
| Título dos projetos | Projetos | Projects |
| Dra. Thaiane Lessa, uma linha | Site de uma cirurgiã-dentista em Maceió, que leva o paciente ao WhatsApp. | A dental surgeon's website in Maceió that takes patients to WhatsApp. |
| DraftCS, uma linha | Jogo web: monte um time com jogadores reais de um Major de CS e simule o título. | Web game: build a team of real players from a CS Major and simulate the title run. |
| Crewz, uma linha | Rede social para achar gente que faz a mesma atividade que você. | A social network for finding people who do the same activity as you. |
| Link de cada projeto | Ver caso | See case |
| Link para a página Projetos | Ver todos os projetos | See all projects |
| Chamada final, título | Quer um site ou falar sobre estágio? | Need a website or want to talk about an internship? |
| Chamada final, botões | Ver serviços; Falar comigo | See services; Get in touch |

**Textos que encurtam nas outras páginas**

| Lugar | Hoje | Proposto pt-BR | Proposto inglês |
|---|---|---|---|
| Serviços, linha de apoio | Faço a página do seu negócio do desenho ao código, pensada primeiro para o celular e com um caminho direto até o seu WhatsApp. | Faço o site do seu negócio, do desenho ao código, pensado primeiro para o celular. | I build your business website, from design to code, made for phones first. |
| Sobre, passo 1 do método | Escrevo a documentação: o que o produto faz, para quem, as regras e cada decisão. | Escrevo a documentação: o produto, o público, as regras e cada decisão. | I write the documentation: the product, the audience, the rules and every decision. |
| Projetos, decisão da landing | Sem preço, sem promoção e sem promessa de resultado. Antes e depois só com autorização dos pacientes e com nome e CRO na imagem, por causa das regras do Conselho Federal de Odontologia. | Sem preço, sem promoção e sem promessa de resultado, pelas regras do Conselho Federal de Odontologia. O detalhe dos antes e depois fica no caso. | No prices, no promotions and no promised results, under the Brazilian dental council's rules. The before-and-after details are in the case. |

Os outros textos de Projetos, Sobre, Tecnologias, Serviços e Contato já são curtos e ficam como estão.

## Comportamento

**Página inicial**

- Ordem: preloader, abertura, projetos em versão curta, chamada final. O preloader roda só aqui (D46).
- Projetos em versão curta: os três um abaixo do outro, cada um com o print de hoje da tela de quem visita, o nome, o tipo, uma linha e o link "Ver caso". Sem vídeo, sem botões de versão e sem "Minha parte". Na entrega do 3D, esse bloco vira os aparelhos, em versão curta (`aparelhos-3d.md`), e o print fica só na reserva parada.
- Depois dos três, o link "Ver todos os projetos" leva à página Projetos.
- A chamada final tem o título e dois botões: "Ver serviços" leva a Serviços e "Falar comigo" leva a Contato.
- "Quero um site" leva a Serviços, e "Falar sobre estágio" leva a Contato (D79).
- O primeiro projeto começa ainda na primeira tela, com o texto ao lado no computador (D44).

**Endereços antigos (D81)**

- Na inicial, um endereço com `#projetos`, `#sobre`, `#contato`, `#privacidade` ou `#site` troca para a página nova, sem entrar no histórico e sem rodar o preloader. `#privacidade` leva ao fim de Contato.

**Páginas internas**

- Projetos, Sobre, Serviços e Contato abrem direto, sem preloader, com o título da página em `h1`.
- A troca entre páginas usa a mesma animação de hoje entre a inicial e o caso (D71).
- Cabeçalho, menus, ícones de contato e rodapé: `cabecalho-rodape.md`.

## Movimento

| O quê | Gatilho | Como | Por quê |
|---|---|---|---|
| Projetos em versão curta | Rolagem, ao entrar na tela | Sobem 1,5 rem e aparecem, como as seções de hoje | Ritmo sem prender a rolagem |
| Troca de página | Clique num link interno | A animação de hoje (D71) | Mostra que o visitante trocou de lugar |

Com `prefers-reduced-motion`, nada se move.

## Regras

1. Todo texto nos arquivos de mensagens, nos dois idiomas.
2. Nenhuma rota nova no servidor para as âncoras antigas, e nenhum cookie.
3. Página de caso continua abaixo de Projetos, com o mesmo endereço.
4. Sem três cards iguais lado a lado (`DESIGN.md`, seção 9).

## Acessibilidade

- Cada página tem um `h1`. Na inicial, o `h1` continua sendo a frase da abertura, e os projetos curtos ficam em `h2` e `h3`.
- Links "Ver caso" com nome que distingue o projeto, para o leitor de tela.
- Título da aba muda a cada página, e o foco vai para o começo do conteúdo ao trocar de página.

## Desempenho

- A inicial deixa de carregar Sobre, Tecnologias, Serviços e Contato, e fica mais leve.
- Os prints da inicial seguem as regras de `projetos.md`: o primeiro com prioridade, os outros sob demanda.
- Cada página interna é estática, gerada no build, nos dois idiomas.

## Fora de escopo

- Aparelhos 3D, ADR do Three.js e vídeos novos: `aparelhos-3d.md` (D82 a D91).
- Redesenho visual.

## Critérios de aceite

- [ ] As oito rotas abrem em 390 px e no computador, em escuro e claro, sem transbordo, com título e descrição próprios.
- [ ] A inicial mostra abertura, projetos curtos com "Ver caso", "Ver todos os projetos" e a chamada final, e nada de Sobre, Tecnologias, Serviços ou Contato.
- [ ] O preloader roda só na inicial.
- [ ] "Quero um site" e "Ver serviços" levam a Serviços; "Falar sobre estágio" e "Falar comigo", a Contato.
- [ ] `/#contato`, `/#sobre`, `/#projetos`, `/#privacidade` e `/#site` levam à página certa, nos dois idiomas.
- [ ] A troca de idioma leva à mesma página no outro idioma.
- [ ] Nenhum deslocamento de layout medido na troca de página.

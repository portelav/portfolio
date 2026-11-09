# FDD: Seção Cabeçalho e rodapé

Status: implementado
PRD: seção 6, item Cabeçalho e rodapé; D25, D26, D27, D32, D33, D47, D70, D74, D75, D78 e D80

## Objetivo

Em qualquer ponto do site, o visitante troca de idioma e de tema, volta ao início pelo nome e, se cair em um endereço errado, entende o que houve e sabe como voltar.

## Conteúdo

Textos nos arquivos de mensagens, em pt-BR e inglês.

| Lugar | pt-BR | Inglês |
|---|---|---|
| Idioma, visível | `PT` e `EN` | `PT` e `EN` |
| Idioma, para leitor de tela | PT, Português; EN, English | PT, Português; EN, English |
| Tema, visível | `Claro` no modo escuro; `Escuro` no modo claro | `Light` no modo escuro; `Dark` no modo claro |
| Tema, para leitor de tela | Mudar para o modo claro; Mudar para o modo escuro | Switch to light mode; Switch to dark mode |
| Nome, para leitor de tela | portelav, voltar ao início | portelav, back to home |
| Menu | Projetos, Sobre, Serviços, Contato | Projects, About, Services, Contact |
| Menu, para leitor de tela | Páginas | Pages |
| Botão do menu, no celular, para leitor de tela | Menu | Menu |
| Ícones de contato, para leitor de tela | Contatos; cada ícone com o nome do canal, como em Contato | Contact; each icon with the channel name, as in Contact |
| Rodapé | Todos os direitos reservados. | All rights reserved. |
| 404, título | Essa página não existe. | This page doesn't exist. |
| 404, link | Voltar ao início | Back to home |

O nome de cada idioma fica sempre na própria língua, nos dois sites.

O link de privacidade do rodapé leva ao fim da página Contato, na âncora `#privacidade` (PRD, D57 e D78).

## Comportamento

**Cabeçalho**

- Fica preso ao topo da tela, com o fundo `--bg`, sem borda e sem sombra.
- No computador, o menu fica antes dos ícones de contato e dos seletores (PRD, D70 e D74). No celular, o botão do menu, com três traços, fica no início do cabeçalho, antes do nome (PRD, D80 e D87).
- Mostra o nome à esquerda e os seletores à direita, desde o fim do preloader (PRD, D47). Durante o preloader, o nome do cabeçalho fica invisível, para o nome que voa pousar no lugar dele.
- Sai ao rolar para baixo, depois de 80 px, e volta ao rolar para cima. Foco de teclado dentro dele sempre o traz de volta. Depois de um link para uma seção, volta e fica na tela por 1,5 s, para mostrar onde o visitante chegou.
- O nome é link para o início da página, no idioma atual.
- Sem JavaScript, o nome e o seletor de idioma funcionam, e o seletor de tema não aparece.

**Menu, no computador**

- Quatro links: Projetos, Sobre, Serviços e Contato, para as páginas no idioma atual (PRD, D78).
- O item atual tem `aria-current="page"` e uma linha de 2 px em `--accent` embaixo. No modo escuro, a letra também fica em `--accent`. No modo claro, a letra fica em `--fg`, porque `--accent` reprova em texto pequeno (`DESIGN.md`, seção 3).
- O item atual é o da página aberta. Na página de caso, Projetos. Na inicial, nenhum.

**Menu, no celular (PRD, D80 e D87)**

- Abaixo de 768 px, o menu do computador some e o botão de três traços aparece à esquerda do nome, com o nome "Menu" para leitor de tela, `aria-expanded` e `aria-controls`.
- Ao tocar, um painel cobre a tela abaixo do cabeçalho, com fundo `--bg`, os quatro links em letra grande, um por linha, e o item atual marcado como no computador. Os três traços viram um X.
- Fecha ao tocar no X, com Esc, ao escolher uma página e ao passar para 768 px ou mais. O foco fica preso no painel enquanto ele está aberto e volta ao botão ao fechar.
- Com o painel aberto, a página de trás não rola, e o cabeçalho não sai da tela.
- Sem JavaScript, o botão não aparece, e os links de página ficam no rodapé.

**Ícones de contato**

- WhatsApp, e-mail e Instagram, depois do menu e antes do idioma (PRD, D74), na ordem de Contato: em `/en`, o e-mail vem primeiro.
- Só o desenho, de 20 px, com área de toque de 44 px e o nome do canal como nome acessível e dica.
- Cada um na cor da marca (PRD, D75; `DESIGN.md`, seção 3): WhatsApp em `#25D366` no escuro e `#128C7E` no claro, Instagram no degradê da marca e e-mail em `--accent`.
- WhatsApp e Instagram vêm do Simple Icons; o envelope é desenhado no próprio código, com traço parecido.
- No celular também, depois do nome. No celular, o Instagram sai do cabeçalho para dar lugar ao botão do menu, e abaixo de 390 px fica só o primeiro canal; todos continuam em Contato. Abaixo de 390 px, a margem lateral do cabeçalho cai para 1 rem.
- O botão do menu tem a mesma largura aberto e fechado, para nada no cabeçalho se mexer ao abrir.

**Seletor de idioma**

- Dois links, `PT` e `EN`. O idioma atual tem sublinhado e `aria-current`. No celular, só aparece o link do outro idioma (PRD, D74).
- Leva para a mesma página, no outro idioma: a inicial, Projetos, Sobre, Serviços, Contato ou o mesmo caso (`docs/fdd/caso.md`). Na 404, o início é o que o visitante precisa. Como o layout raiz muda, a página recarrega inteira.

**Seletor de tema**

- Um botão que mostra o modo para o qual vai mudar: a palavra no computador, e um sol ou uma lua no celular (PRD, D74).
- Troca na hora e guarda a escolha em `localStorage`, nunca em cookie.
- Atualiza também o `theme-color` da barra do navegador, inclusive ao carregar com um tema salvo.

**Rodapé**

- Os links das quatro páginas, o link da nota de privacidade e o texto de direitos (PRD, D32 e D78).
- Os contatos ficam na página Contato.

**Página 404**

- Vale para endereço desconhecido em `/` e em `/en`, com o idioma certo, responde com status 404 e usa o mesmo cabeçalho e rodapé.
- Fora desse caso, um endereço com ponto, como `/foo.bar`, não passa pelo `proxy.ts` e fica com o 404 padrão do Next.js. Não muda nada para quem navega pelo site.
- O Next.js monta essa página no navegador, então sem JavaScript ela responde 404 com a tela vazia. Com JavaScript, pode haver um instante de tela sem conteúdo antes de ela aparecer. Limite aceito, por ser um caso raro dentro de um caso raro.

## Movimento

| O quê | Gatilho | Duração e curva | Por quê |
|---|---|---|---|
| Cabeçalho sai e volta | Rolar para baixo; rolar para cima; foco | `transform`, 500 ms, `--ease-out-quint` | Dá espaço ao conteúdo sem perder o caminho de volta |
| Cursor do nome | Hover ou foco no link do nome | `opacity` em `steps(1)`, ciclo de 1,06 s, parando antes de 5 s, e depois aceso | Retorno de interação (PRD, D16 e D27) |

| Ícone de contato | Hover | `transform` do desenho, 200 ms, `--ease-out-quint`: cresce 15% | Retorno de interação |
| Item atual do menu | Troca de página | `transform` da linha, 350 ms, `--ease-out-quint` | Mostra onde o visitante está (PRD, D70) |
| Painel do menu no celular | Abrir; fechar | `opacity` e `transform` dos links, que sobem 0,5 rem, 250 ms, `--ease-out-quint` | Mostra que o menu abriu por cima da página |

Nunca anima: seletores, troca de tema, rodapé e página 404.

## Regras

1. O nome usa o mesmo vetor do kit, com as cores dos tokens. Nunca é digitado em texto.
2. Símbolo e nome nunca aparecem juntos. O cabeçalho não usa o símbolo.
3. Em volta do nome, há um espaço livre de pelo menos a largura do bloco âmbar. O nome tem no mínimo 96 px de largura.
4. Nenhum cursor pisca por mais de 5 s sem interação.
5. Seletores e link do nome têm área de toque de no mínimo 44 px.
6. Texto pequeno em destaque usa `--fg` com sublinhado, nunca só a cor (`DESIGN.md`, seção 3).
7. Nenhum cookie, em nenhum seletor.

## Acessibilidade

- `header` e `footer` como marcos da página, com o conteúdo em `main`.
- Ordem de foco: nome; menu, no computador; ícones de contato; idioma; tema; conteúdo; rodapé.
- Foco visível em todos os controles, como no `DESIGN.md`.
- Seletor de idioma em `nav`, com nome acessível, e cada link com o `lang` do idioma de destino.
- Com `prefers-reduced-motion`, o cabeçalho sai e volta sem movimento, e o cursor não pisca.
- Em toque, sem hover, o cursor fica aceso.

## Desempenho

- Nenhuma mídia nova. O nome passa a ser SVG no próprio HTML, o que tira as duas imagens do kit da página.
- Sem deslocamento de layout: a altura do cabeçalho é fixa e o espaço do nome não empurra os seletores.
- JavaScript só para observar a direção da rolagem e trocar o tema. O resto, CSS resolve.

## Fora de escopo

- Reescrita: FDD da abertura.
- Guardar o idioma escolhido: o idioma vem só da URL (ADR 0002).

## Critérios de aceite

- [ ] Em 390 px e no computador, em `/` e `/en`, escuro e claro, nada transborda e os controles têm 44 px.
- [ ] Trocar o idioma leva ao início no outro idioma, sem criar cookie.
- [ ] Trocar o tema vale na hora, sobrevive ao recarregar e à troca de idioma, sem piscada, e muda o `theme-color`.
- [ ] O nome aparece no cabeçalho desde o fim do preloader, no ponto em que o nome que voa pousa.
- [ ] O cabeçalho sai ao rolar para baixo, volta ao rolar para cima e volta com foco de teclado.
- [ ] O link do nome leva ao início. Com hover ou foco, o cursor pisca por menos de 5 s e para aceso.
- [ ] Com `prefers-reduced-motion`, nada se move nem pisca.
- [ ] Com JavaScript desligado, o nome e o seletor de idioma funcionam, e o seletor de tema não aparece.
- [ ] Endereço desconhecido em `/` e em `/en` responde 404. Com JavaScript, mostra texto no idioma certo, cabeçalho, rodapé, link de volta e o tema salvo.
- [ ] No computador, o menu leva às quatro páginas e marca a página aberta; na página de caso, marca Projetos.
- [ ] No celular, o botão de três traços abre o painel, com foco preso, e fecha com o X, Esc e ao escolher uma página, devolvendo o foco ao botão.
- [ ] Trocar o idioma mantém a página.
- [ ] Teclado alcança todos os controles, na ordem certa, com foco visível.
- [ ] Red Hat Mono renderiza nos seletores, vinda de `next/font`.

# FDD: Seção Cabeçalho e rodapé

Status: implementado
PRD: seção 6, item Cabeçalho e rodapé; D25, D26, D27, D30, D32 e D33

## Objetivo

Em qualquer ponto do site, o visitante troca de idioma e de tema, volta ao início pelo nome e, se cair em um endereço errado, entende o que houve e sabe como voltar.

## Conteúdo

Textos nos arquivos de mensagens, em pt-BR e inglês. Valores propostos, a confirmar na aprovação deste FDD.

| Lugar | pt-BR | Inglês |
|---|---|---|
| Idioma, visível | `PT` e `EN` | `PT` e `EN` |
| Idioma, para leitor de tela | Português; English | Português; English |
| Tema, visível | `Claro` no modo escuro; `Escuro` no modo claro | `Light` no modo escuro; `Dark` no modo claro |
| Tema, para leitor de tela | Mudar para o modo claro; Mudar para o modo escuro | Switch to light mode; Switch to dark mode |
| Nome, para leitor de tela | portelav, voltar ao início | portelav, back to top |
| Rodapé | Todos os direitos reservados. | All rights reserved. |
| 404, título | Essa página não existe. | This page doesn't exist. |
| 404, link | Voltar ao início | Back to home |

O nome de cada idioma fica sempre na própria língua, nos dois sites.

A nota de privacidade ainda não existe. O link dela entra no rodapé na entrega de Contato e nota de privacidade, junto da nota, para o site nunca ter um link quebrado (PRD, D32).

## Comportamento

**Cabeçalho**

- Fica preso ao topo da tela, com o fundo `--bg`, sem borda e sem sombra.
- Sem menu (PRD, D33).
- Na primeira dobra, mostra só os seletores, à direita (PRD, D30).
- Depois que a abertura sai por inteiro da tela, o nome entra à esquerda. Ele sai de novo quando a abertura volta. Enquanto está fora, não é lido nem recebe foco.
- O nome é link para o início da página, no idioma atual.
- Sem JavaScript, o cabeçalho mostra só o seletor de idioma, que funciona. O seletor de tema e o nome não aparecem.

**Seletor de idioma**

- Dois links, `PT` e `EN`. O idioma atual tem sublinhado e `aria-current`.
- Leva para o início, no outro idioma. O site tem uma página só, e na 404 isso é o que o visitante precisa. Como o layout raiz muda, a página recarrega inteira.

**Seletor de tema**

- Um botão que mostra o modo para o qual vai mudar.
- Troca na hora e guarda a escolha em `localStorage`, nunca em cookie.
- Atualiza também o `theme-color` da barra do navegador, inclusive ao carregar com um tema salvo.

**Rodapé**

- Só o texto de direitos e, depois da entrega de Contato, o link da nota de privacidade (PRD, D32).
- Os contatos ficam na seção Contato.

**Página 404**

- Vale para endereço desconhecido em `/` e em `/en`, com o idioma certo, responde com status 404 e usa o mesmo cabeçalho e rodapé.
- Fora desse caso, um endereço com ponto, como `/foo.bar`, não passa pelo `proxy.ts` e fica com o 404 padrão do Next.js. Não muda nada para quem navega pelo site.
- O Next.js monta essa página no navegador, então sem JavaScript ela responde 404 com a tela vazia. Com JavaScript, pode haver um instante de tela sem conteúdo antes de ela aparecer. Limite aceito, por ser um caso raro dentro de um caso raro.

## Movimento

| O quê | Gatilho | Duração e curva | Por quê |
|---|---|---|---|
| Nome entra e sai do cabeçalho | A abertura sai ou volta à tela | `opacity` e `transform`, 150 ms, `ease-out` | Mostra de onde o nome veio, sem chamar atenção |
| Cursor do nome | Hover ou foco no link do nome | `opacity` em `steps(1)`, ciclo de 1,06 s, parando antes de 5 s, e depois aceso | Retorno de interação (PRD, D16 e D27) |

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
- Ordem de foco: nome, quando visível; idioma; tema; conteúdo; rodapé.
- Foco visível em todos os controles, como no `DESIGN.md`.
- Seletor de idioma em `nav`, com nome acessível, e cada link com o `lang` do idioma de destino.
- Com `prefers-reduced-motion`, o nome aparece e some sem movimento, e o cursor não pisca.
- Em toque, sem hover, o cursor fica aceso.

## Desempenho

- Nenhuma mídia nova. O nome passa a ser SVG no próprio HTML, o que tira as duas imagens do kit da página.
- Sem deslocamento de layout: a altura do cabeçalho é fixa e o espaço do nome não empurra os seletores.
- JavaScript só para observar a abertura e trocar o tema. Motion não entra aqui, CSS resolve.

## Fora de escopo

- Link e texto da nota de privacidade: entrega de Contato e nota de privacidade.
- Menu de navegação.
- Reescrita: FDD da abertura.
- Guardar o idioma escolhido: o idioma vem só da URL (ADR 0002).

## Critérios de aceite

- [ ] Em 390 px e no computador, em `/` e `/en`, escuro e claro, nada transborda e os controles têm 44 px.
- [ ] Trocar o idioma leva ao início no outro idioma, sem criar cookie.
- [ ] Trocar o tema vale na hora, sobrevive ao recarregar e à troca de idioma, sem piscada, e muda o `theme-color`.
- [ ] O nome aparece no cabeçalho só depois que a abertura sai da tela, e fora disso não recebe foco nem é lido.
- [ ] O link do nome leva ao início. Com hover ou foco, o cursor pisca por menos de 5 s e para aceso.
- [ ] Com `prefers-reduced-motion`, nada se move nem pisca.
- [ ] Com JavaScript desligado, o seletor de idioma funciona, e o seletor de tema e o nome não aparecem.
- [ ] Endereço desconhecido em `/` e em `/en` responde 404. Com JavaScript, mostra texto no idioma certo, cabeçalho, rodapé, link de volta e o tema salvo.
- [ ] Teclado alcança todos os controles, na ordem certa, com foco visível.
- [ ] Red Hat Mono renderiza nos seletores, vinda de `next/font`.

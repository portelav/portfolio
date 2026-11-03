# FDD: Seção Projetos

Status: aprovado
PRD: seção 6, item Projetos; D3, D22, D39, D40 e D41

## Objetivo

O visitante vê três projetos reais no ar, sabe de qual participação se trata e consegue abrir cada um.

## Conteúdo

Título da seção: "Projetos"; em inglês, "Projects". Textos nos arquivos de mensagens. O texto em inglês é proposto, para revisão de Lucas.

| Ordem | Caso | pt-BR | Inglês | Links |
|---|---|---|---|---|
| 1 | Landing | Landing da Dra. Thaiane Lessa. Site que fiz sozinho, do desenho ao código, pensado primeiro para o celular. | Landing page for Dra. Thaiane Lessa. A site I built on my own, from design to code, mobile first. | Site e código |
| 2 | DraftCS | DraftCS. Jogo web que fiz em dupla com o Vinicius. | DraftCS. A web game I built with Vinicius. | Site |
| 3 | Crewz | Crewz. Rede social que fiz em dupla com o Vinicius. | Crewz. A social network I built with Vinicius. | Site |

- Links: "Ver site" e "Ver código"; em inglês, "Visit site" e "See code".
- "Vinicius" é link para https://github.com/ViniciusLoureiro67/ (PRD, D41).
- Abaixo do texto da landing, em Red Hat Mono: "Dra. Thaiane Lessa · CRO/AL-6418", como na landing (PRD, Regras de fora).
- Cada caso tem um print aprovado por Lucas, da primeira dobra no computador, sem metadado.
- O print da landing não mostra o telefone. O número foi coberto em uma cópia.
- Os repositórios do DraftCS e do Crewz são privados, então só a landing tem link de código.

## Comportamento

- Fica logo abaixo da abertura. A chamada "Ver projetos" leva até aqui, sem ficar escondida pelo cabeçalho preso ao topo.
- Com a seção na página, a abertura passa a sair da tela, e o nome entra no cabeçalho (PRD, D30).
- Os casos ficam um abaixo do outro, nunca lado a lado.
- No celular, a imagem vem antes do texto. No computador, a imagem fica à esquerda, e o texto à direita.
- Sem card nem sombra. Cada print tem uma borda de 1 px em `--line`, para não se confundir com o fundo (PRD, D43).
- A imagem não é link. Os links são os de texto, porque leitor de tela e toque ficam mais claros assim.
- Os links externos abrem na mesma aba.

## Movimento

Nada anima nesta seção. O conteúdo já está na página e aparece sem efeito de rolagem. Sem movimento, nada conta história nem dá retorno aqui (`DESIGN.md`, princípio 4).

## Regras

1. Sem antes e depois, sem paciente identificável e sem promessa de resultado.
2. Nunca chamar a landing de trabalho para cliente, nem sugerir contratação (PRD, D22).
3. Nenhum print do DraftCS ou do Crewz mostra dado de outra pessoa.
4. Mídia sem metadado, otimizada, com dimensões reservadas.
5. Sem três cards iguais lado a lado (`DESIGN.md`, seção 9).
6. Todo link de ação tem 44 px de área de toque. O link do nome, dentro da frase, fica como link de texto.

## Acessibilidade

- Título em `h2`, e cada caso com o nome em destaque no texto. Ordem de leitura: imagem, texto, links.
- Texto alternativo nos dois idiomas, dizendo o que o print mostra.
- Links com nome claro: "Ver site" junto do nome do caso, para o leitor de tela distinguir os três.
- Foco visível, como no `DESIGN.md`.

## Desempenho

- Imagens em WebP, com carga preguiçosa, porque ficam abaixo da primeira dobra.
- Largura e altura reservadas, sem deslocamento de layout.
- Nenhum JavaScript novo.

## Fora de escopo

- Página própria para cada caso.
- Telas internas do Crewz e do DraftCS.
- Outros projetos além dos três (ROADMAP, Depois).

## Critérios de aceite

- [ ] Em 390 px e no computador, em `/` e `/en`, escuro e claro, os três casos aparecem na ordem, sem transbordo.
- [ ] "Ver projetos" leva à seção, com o título visível abaixo do cabeçalho.
- [ ] Depois que a abertura sai da tela, o nome aparece no cabeçalho.
- [ ] Todos os links abrem o destino certo, e os de ação têm 44 px.
- [ ] As imagens não têm metadado, nem o telefone, e não provocam deslocamento de layout.
- [ ] Leitor de tela distingue os links de cada caso, e toda imagem tem texto alternativo.
- [ ] Nenhuma animação nova.

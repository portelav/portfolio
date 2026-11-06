# FDD: Página de caso

Status: implementado
PRD: D22, D61, D67, D68, D69, D70 e D71

## Objetivo

Quem quer saber mais sobre um projeto lê, numa página própria, como ele foi feito: o pedido, para quem, as regras que limitaram, as decisões, as versões descartadas, o resultado e o que Lucas aprendeu.

## Conteúdo

Primeiro caso: a landing da Dra. Thaiane Lessa. DraftCS e Crewz vêm depois, no mesmo formato.

Textos nos arquivos de mensagens, em `CaseStudy`: os títulos das seções em `CaseStudy`, e o conteúdo de cada caso em `CaseStudy.<id>`. A fonte é a conversa com Lucas em 2026-11-05 e a documentação do repositório da landing.

| Seção | pt-BR | Inglês |
|---|---|---|
| Volta | Voltar aos projetos | Back to projects |
| O pedido | O pedido | The request |
| Para quem | Para quem | Who it is for |
| As regras | As regras | The rules |
| As decisões | As decisões | The decisions |
| O caminho | O que ficou pelo caminho | What was left behind |
| Resultado | Resultado | Result |
| Próximo passo | Próximo passo | Next step |
| Aprendizado | O que aprendi | What I learned |

Imagens da landing, em `public/projetos/caso/landing/`, todas do topo da página:

| Versão | Celular | Computador |
|---|---|---|
| Maio de 2026, primeira tentativa | 780 x 1170 | 1350 x 900 |
| Maio de 2026, segunda tentativa | 780 x 1170 | 1350 x 900 |
| Outubro de 2026 | 780 x 1170 | 1350 x 900 |
| No ar | 780 x 1170 | 1350 x 900 |

No topo, a mesma mídia do card de Projetos, com print e vídeo.

## Comportamento

- Endereço próprio por caso: `/projetos/<id>` em português e `/en/projects/<id>` em inglês. Outro `id` dá a página 404.
- No card do caso, em Projetos, o link "Ver caso completo", em inglês "See full case", ao lado de "Ver site".
- No topo, "Voltar aos projetos" leva a `/#projetos`, no mesmo idioma.
- O topo repete o card do caso: o rótulo "Caso completo", em inglês "Full case", e o título no lugar do nome, a mídia do card, com os botões de versão, e a frase de abertura com os links do site e do código. Depois, as seções na ordem da tabela.
- As versões aparecem em grade: no celular, duas por linha nos prints de celular e uma por linha nos de computador. No computador, quatro por linha nos de celular e duas nos de computador. Cada print tem legenda com a data.
- O seletor de idioma leva ao mesmo caso no outro idioma.
- No computador, o menu do cabeçalho marca Projetos (PRD, D70).
- Sem preloader.

## Movimento

A troca de página deixa claro que o visitante foi para outro lugar (PRD, D69 e D71):

| O quê | Gatilho | Como |
|---|---|---|
| Página | "Ver caso completo", "Voltar aos projetos" e o menu do cabeçalho | A página que sai é empurrada para fora da tela pela que entra, como num app de celular. Na ida, a página vai para a esquerda; na volta, para a direita. O cabeçalho fica parado. 500 ms em `--ease-out-quint` |
| Mídia do card | Os mesmos links | A mídia do card cresce até a capa do caso, e volta para o card na volta. 450 ms em `--ease-out-quint` |

Usa a API de transição de vistas do navegador, pelo `ViewTransition` do React. Sem suporte, com `prefers-reduced-motion` ou pelo botão voltar do navegador, a troca é instantânea. O vídeo segue as regras de Projetos: toca com 60% na tela, tem pausa e não toca sozinho com `prefers-reduced-motion`.

## Regras

1. Nenhuma foto de paciente, nem com consentimento. As fotos de casos da seção Serviços do site da landing nunca entram.
2. Nenhum dado de contato de terceiro. Telefone em print fica desfocado.
3. Nenhuma pessoa identificável além da própria Dra. Thaiane, que autorizou o uso da imagem.
4. Nenhuma placa ou marca de outra empresa em destaque.
5. A Dra. Thaiane é chamada pelo nome, nunca de cliente (PRD, D22).
6. Só fatos: sem número inventado de visitas ou de pacientes.
7. Mídia sem metadado.

## Acessibilidade

- Um `h1` com o nome do projeto e um `h2` por seção.
- Cada print tem texto alternativo que diz a versão e o que se vê nela.
- Os links têm 44 px de área de toque e foco visível.

## Desempenho

- Prints em WebP, com largura e altura reservadas, carregados sob demanda, salvo o primeiro da tela.
- O vídeo segue `preload="none"` e só baixa perto da tela (PRD, D64).

## Fora de escopo

- Casos do DraftCS e do Crewz.
- Indexação nos buscadores, que segue desligada até o lançamento.

## Critérios de aceite

- [ ] O card da landing leva ao caso no mesmo idioma, e o caso volta a `/#projetos`.
- [ ] `/projetos/landing` e `/en/projects/landing` abrem, e `/projetos/outro` dá 404.
- [ ] O seletor de idioma troca de idioma sem sair do caso.
- [ ] Em 390 px e 1350 px, escuro e claro, sem transbordo, com toque de 44 px e foco visível.
- [ ] Todos os prints têm texto alternativo nos dois idiomas, sem metadado e sem dado de terceiro.
- [ ] Título, descrição, `canonical` e `hreflang` próprios, e `noindex` como o resto do site.

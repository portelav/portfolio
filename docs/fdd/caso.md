# FDD: Página de caso

Status: implementado
PRD: D22, D41, D50, D61, D65, D67, D68, D69, D70, D71, D76 e D77

## Objetivo

Quem quer saber mais sobre um projeto lê, numa página própria, como ele foi feito: o pedido, para quem, as regras que limitaram, as decisões, o método, as versões descartadas, o resultado e o que Lucas aprendeu.

## Conteúdo

Casos: a landing da Dra. Thaiane Lessa, o DraftCS e o Crewz. Cada caso declara em `caseStudies` (`src/lib/projects.ts`) as próprias decisões, as versões do caminho, cada uma com print de celular e, se houver, de computador, e as seções opcionais: "Próximo passo", o link de referência no aprendizado e o vídeo de celular.

Textos nos arquivos de mensagens, em `CaseStudy`: os títulos das seções em `CaseStudy`, e o conteúdo de cada caso em `CaseStudy.<id>`. A fonte é a conversa com Lucas em 2026-11-05 e a documentação do repositório da landing.

| Seção | pt-BR | Inglês |
|---|---|---|
| Volta | Voltar aos projetos | Back to projects |
| O pedido | O pedido | The request |
| Para quem | Para quem | Who it is for |
| As regras | As regras | The rules |
| As decisões | As decisões | The decisions |
| Como foi feito | Como foi feito | How it was made |
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

"Como foi feito" conta o AI-Driven Development naquele projeto (PRD, D76 e D77): o que Lucas documentou, o que os agentes escreveram e como ele revisou. Na landing:

| pt-BR | Inglês |
|---|---|
| Do mesmo jeito deste site, com AI-Driven Development. Escrevi a documentação: o público, as regras do Conselho, cada seção e cada decisão de movimento. Agentes de IA escreveram o código a partir dela, e eu revisei cada versão no celular antes de ir ao ar. | The same way as this website, with AI-Driven Development. I wrote the documentation: the audience, the Council's rules, every section and every motion decision. AI agents wrote the code from it, and I reviewed every version on a phone before it went live. |

### DraftCS

Fontes: as respostas de Lucas em 2026-11-06 e o repositório do DraftCS (`origin/main`, lido no mesmo dia). O inglês é proposto, para revisão de Lucas.

- **O pedido:** ninguém encomendou. O 82-0, de basquete, e o 7a0, de futebol, viraram febre; era época de Major, e Lucas e o Vinicius fizeram o de Counter-Strike.
- **Para quem:** quem gosta de CS e quer passar o tempo.
- **As regras:** as APIs de dados de jogadores eram pagas, e a saída foram dados abertos do Kaggle e da Liquipedia, com crédito. Jogadores só por nome e números: sem foto e sem logo de time ou de campeonato.
- **As decisões:** dados reais, curadoria das notas, velocidade e card de resultado, as quatro de que Lucas mais gosta.
- **Como foi feito:** a documentação escrita pelos dois em chamada no Discord, com tela compartilhada, e o código escrito por agentes de IA. Explica por que os commits saíram quase todos pela conta do Vinicius.
- **O caminho:** poucas versões; a estética saiu quase de primeira e foi polida. O nome mudou de 13-0 para draftcs.
- **Resultado:** no ar desde 19 de junho de 2026, sem número de acesso, porque não há.
- **Próximo passo:** fora deste caso, por decisão do dono em 2026-11-06.
- **Fora do texto:** a página interna do banco de jogadores, por decisão do dono.

Imagens em `public/projetos/caso/draftcs/`, todas da página inicial, feitas em 2026-11-06: as duas primeiras rodando localmente o histórico do repositório, sem conta e sem banco; a última em draftcs.com, sem login.

| Versão | Commit | Celular | Computador |
|---|---|---|---|
| 13 de junho de 2026, como 13-0 | `8300015` | 780 x 1170 | 1350 x 900 |
| 16 de junho de 2026, já draftcs | `fd8be64` | 780 x 1170 | 1350 x 900 |
| No ar | draftcs.com | 780 x 1170 | 1350 x 900 |

Os prints mostram nomes e países de jogadores profissionais, como o próprio jogo, como referência factual. Sem foto, sem logo de time e sem dado de pessoa comum.

### Crewz

Fontes: as respostas de Lucas em 2026-11-06 e o repositório do Crewz (`origin/main`, lido no mesmo dia). O inglês é proposto, para revisão de Lucas.

- **O pedido:** ninguém encomendou. O Vinicius morou em Dubai, gostava de jiu-jítsu e de moto e não achava gente para fazer isso junto.
- **Para quem:** quem quer achar gente com o mesmo gosto, de esporte, leitura ou jogo.
- **As regras:** o Google exige política de privacidade pública para liberar o login a qualquer conta.
- **As decisões:** sete, escolhidas por Lucas: a atividade antes do perfil, três portas, qualquer atividade, chamar e match, nível por atividade, `@usuário` e privacidade.
- **Como foi feito:** AI-Driven Development nas partes dos dois, a partir do design system que Lucas fez antes do código.
- **O caminho:** poucas versões, porque o design system veio antes; mudou o acabamento.
- **Resultado:** no ar, sem usuários, sem divulgação.
- **Próximo passo:** nome, domínio, monetização e divulgação.
- **Fora do texto:** a faculdade, por decisão do dono, e o número de commits.

O Crewz é app de celular (PRD, D65), então o caminho só tem prints de celular, e o grupo "No computador" não aparece. Imagens em `public/projetos/caso/crewz/`, todas da aba Grupos, feitas em 2026-11-06 com o Crewz local: banco Supabase temporário, só com os dados de demonstração, sem o grupo da altinha, na conta fictícia da Camila, no modo claro. O banco temporário foi apagado depois.

| Versão | Commit | Celular |
|---|---|---|
| 21 de setembro de 2026 | `6b375054` | 780 x 1170 |
| 25 de setembro de 2026 | `2116b26a` | 780 x 1170 |
| No ar | `origin/main` | 780 x 1170 |

## Comportamento

- Endereço próprio por caso: `/projetos/<id>` em português e `/en/projects/<id>` em inglês. Outro `id` dá a página 404.
- No card do caso, em Projetos, o link "Ver caso completo", em inglês "See full case", ao lado de "Ver site".
- No topo, "Voltar aos projetos" leva à página Projetos, no mesmo idioma (PRD, D78).
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
3. Na landing, nenhuma pessoa identificável além da própria Dra. Thaiane, que autorizou o uso da imagem.
4. Nenhuma placa ou marca de outra empresa em destaque.
5. A Dra. Thaiane é chamada pelo nome, nunca de cliente (PRD, D22).
6. Só fatos: sem número inventado de visitas ou de pacientes.
7. Mídia sem metadado.
8. No DraftCS, jogadores e times aparecem só por nome e números, como no próprio jogo: nenhuma foto e nenhum logo. O Vinicius aparece com nome e link, com autorização (PRD, D41).
9. No Crewz, só os dados de demonstração: pessoas fictícias e fotos de licença livre (PRD, D65).

## Acessibilidade

- Um `h1` com o nome do projeto e um `h2` por seção.
- Cada print tem texto alternativo que diz a versão e o que se vê nela.
- Os links têm 44 px de área de toque e foco visível.

## Desempenho

- Prints em WebP, com largura e altura reservadas, carregados sob demanda, salvo o primeiro da tela.
- O vídeo segue `preload="none"` e só baixa perto da tela (PRD, D64).

## Fora de escopo

- Indexação nos buscadores, que segue desligada até o lançamento.

## Critérios de aceite

- [ ] O card leva ao caso no mesmo idioma, e o caso volta à página Projetos.
- [ ] `/projetos/landing` e `/en/projects/landing` abrem, e `/projetos/outro` dá 404.
- [ ] O seletor de idioma troca de idioma sem sair do caso.
- [ ] Em 390 px e 1350 px, escuro e claro, sem transbordo, com toque de 44 px e foco visível.
- [ ] Todos os prints têm texto alternativo nos dois idiomas, sem metadado e sem dado de terceiro.
- [ ] Título, descrição, `canonical` e `hreflang` próprios, e `noindex` como o resto do site.

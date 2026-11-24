# portfolio: Design System

Referência visual. Regra de produto vem do PRD e do dono, não deste documento. A marca atual é o padrão, sem ser trava: muda quando Lucas pedir (PRD, D95).

Onde este documento diz "retrato", ele descreve o que existe hoje no site, para nada pronto ser quebrado sem querer. Retrato não é regra: muda quando o site muda.

## 1. Direção

> TODO: personalidade do site e se a pegada de terminal continua (nome em letra de código, fonte mono em dado real). Decididas com Lucas na nova direção, junto com a paleta.

Retrato: hoje o site é sóbrio, com fundo quase preto, um destaque só e fonte mono para datas, tags e rótulos.

## 2. Marca

Os originais ficam em `C:\prog\identidade-visual\marca\kit\`. Os ícones ficam em `public/`, e o nome fica em SVG no próprio HTML, com o mesmo vetor do kit e as cores dos tokens.

| Arquivo | Onde |
|---|---|
| `svg/nome-*` | Desenho base do nome e quadro final da Reescrita |
| `svg/simbolo-*`, `svg/simbolo-pequeno-*` | Espaços pequenos e quadrados |
| `web/*`, `web/head-snippet.html` | Ícones, manifesto e `<head>`. Copiar para a raiz pública |
| `png/avatar-*` | Prévia de link e perfis, se fizer sentido |

A cor do logo é escolhida vendo as paletas, cada uma com o logo em âmbar e com o logo na cor nova (PRD, D96). Se o logo mudar de cor, favicon, avatar e manifesto são refeitos junto, porque são imagens prontas em âmbar.

## 3. Paleta

> TODO: paleta nova, em um modo só (PRD, D96). O destaque pode deixar de ser âmbar. Lucas escolhe entre paletas mostradas no site real, no navegador.

Contraste, como recomendação: o agente calcula o contraste de cada cor nova pela fórmula da WCAG, registra aqui onde ela passa (texto, ícone, só borda) e avisa quando uma cor reprova. A cor pode entrar mesmo reprovada, se Lucas quiser.

Cores de marca de terceiros (WhatsApp, Instagram, logos de Tecnologias) são revistas junto com a paleta (PRD, D111).

Retrato da paleta de hoje, em dois modos, até a nova entrar:

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| `--bg` | `#0b0b0c` | `#f3f2ee` | Fundo |
| `--fg` | `#f2f2f0` | `#141413` | Texto e nome |
| `--accent` | `#e3a33b` | `#a8650a` | Nome, cursor, foco e destaques |
| `--line` | `#444448` | `#bdbcb6` | Borda dos prints, do botão secundário e separadores |

Contraste calculado em 2026-11-01: `--accent` no modo claro dá 4,14:1 e reprova em texto pequeno; `--line` dá 2,03:1 no escuro e 1,70:1 no claro, e só serve de borda decorativa. As cores das marcas de terceiros, calculadas em 2026-11-06, estão no histórico do PRD (D75).

## 4. Tipografia

Fontes, tamanhos e pesos estão liberados (PRD, D99). Qualquer fonte é servida pelo próprio site, pelo `next/font`, e não por serviço externo: carregar do Google mandaria o IP de quem visita para ele e deixaria a página mais lenta.

Retrato: logo e quadro final da Reescrita em IBM Plex Mono Medium, em vetor; primeiro quadro da Reescrita em Libre Caslon Text, em vetor; títulos em Red Hat Display; texto corrido em Red Hat Text, 17 px; detalhes, botões e links em Red Hat Mono, de 14 e 17 px.

## 5. Forma e toque

> TODO: raio, sombra e borda. Decididos na nova direção (PRD, D99). A borda de 1 px dos prints é revista com a paleta (PRD, D111).

- **Espaçamento:** base de 4 px, a escala padrão do Tailwind.
- **Toque:** botão e controle com no mínimo 44 px.
- **Foco:** todo elemento que recebe foco do teclado tem um contorno visível. Cor e espessura acompanham a paleta nova. Retrato: contorno de 2 px em `--accent`, com folga de 2 px.

Retrato: raio 0, como o bloco âmbar do nome; nenhuma sombra; borda de 1 px só onde separa algo.

## 6. Movimento

- Motion e GSAP estão liberados e entram quando uma animação concreta pedir, conforme o ADR 0006. A rolagem suave também está liberada.
- Desfoque e `mix-blend-mode` em elemento que se move estão liberados. Medir a fluidez no celular é recomendação (PRD, D100).
- O que se mexe sozinho por mais de 5 s para ou tem pausa, como meta (WCAG 2.2.2; PRD, D101).
- `prefers-reduced-motion`: o site abre no estado final, sem preloader, com o cursor aceso, sem vídeo tocando sozinho e com os prints parados no lugar dos aparelhos 3D (PRD, D90).

Retrato das animações de hoje:

| O quê | Gatilho | Duração e curva | Por quê |
|---|---|---|---|
| Reescrita | Toda carga de `/` e `/en` sem âncora (PRD, D46) | 2,6 s, com cada letra de 140 a 230 ms, ver `docs/fdd/abertura.md` | Passa o nome da letra de livro para a letra de código |
| Voo do nome | Fim da Reescrita, depois de 350 ms | 800 ms, `cubic-bezier(0.77, 0, 0.175, 1)` | Leva o nome até o lugar dele no cabeçalho |
| Chegada da abertura | Fim do preloader | 900 ms em `--ease-out-quint`, com atrasos de 0 a 240 ms | Completa o voo do nome |
| Cursor do nome | Hover; foco onde o nome é link | Ciclo de 1,06 s em `steps(1)`, por 5 s, e depois aceso | A marca é o instante da digitação |
| Entrada de seção e caso | Rolagem, ao entrar na tela | Ligada à rolagem: sobe 1,5 rem e aparece | Dá ritmo sem prender a rolagem |
| Aparelhos 3D | Rolagem pela seção de projetos | Ver `docs/fdd/aparelhos-3d.md` | Mostra cada projeto funcionando num notebook e num celular |
| Vídeo do caso | Maior parte dele na tela | Laço de cerca de 9 s, com pausa | Mostra o site funcionando (PRD, D51) |
| Cabeçalho | Rolar para baixo; rolar para cima; foco | 500 ms em `--ease-out-quint` | Dá espaço ao conteúdo sem perder o caminho de volta |
| Logo de tecnologia | Hover | 200 ms: sobe 4 px e cresce 8% | Retorno de interação |
| Ida e volta da página de caso | "Ver caso", "Voltar" e o menu | 500 ms em `--ease-out-quint`: a página que entra empurra a que sai para fora da tela | Mostra que o visitante trocou de lugar (PRD, D71 e D88) |
| Item atual do menu | Troca de página | 350 ms em `--ease-out-quint`: a linha desliza até o item novo | Mostra onde o visitante está |
| Linha de contato | Hover | 350 ms: anda 0,5 rem | Retorno de interação |
| Ícone de contato no cabeçalho | Hover | 200 ms: cresce 15% | Retorno de interação (PRD, D74) |

## 7. Componentes próprios

Retrato. O seletor de tema sai quando a paleta de um modo só entrar (PRD, D96).

| Componente | Onde | Estados |
|---|---|---|
| Nome com cursor | Preloader; cabeçalho | Animando, voando, aceso, piscando, movimento reduzido |
| Seletor de idioma | Cabeçalho | pt-BR, en, foco |
| Seletor de tema | Cabeçalho | Escuro, claro, foco |
| Menu | Cabeçalho; no celular, por cima do site | Fechado, aberto, item atual, foco |
| Botão principal e botão secundário | Abertura; Serviços | Padrão, foco, hover |
| Aparelhos 3D | Projetos | Carregando, rolando, prints parados |
| Print com vídeo por cima, e botão de pausa | Casos | Só print, tocando, pausado, movimento reduzido |
| Escolha entre celular e computador | Casos | Padrão, escolhido, foco, hover |
| Linha de contato | Contato | Padrão, foco, hover |
| Logo de tecnologia | Tecnologias | Padrão, hover |

## 8. Tom de voz

- Primeira pessoa, confiante e direta (PRD, D97).
- Cada afirmação vem com fato ou número datado. A parte de Lucas em cada caso é dita com clareza, e uma decisão difícil ou um erro é contado sem esconder. Nada é aumentado, e Lucas não se apresenta como sênior (PRD, D93).
- O curso aparece só no `/sobre`, sem o período (PRD, D106).
- Os dois idiomas têm o mesmo tom. O inglês é reescrito, não traduzido ao pé da letra.
- Palavras vetadas, por soarem como texto genérico de agência: elevar, sem esforço, inovador, apaixonado, métrica vazia como "100% foco". Em inglês: elevate, seamless, passionate, cutting-edge. "Full stack" e "soluções" são liberadas, com fato do lado (PRD, D59).

## 9. O que evitar

Recomendação, não proibição (PRD, D98). O agente avisa quando um pedido bater num destes itens, e Lucas decide.

- Degradês e brilhos roxos ou azuis, acentos neon.
- Inter como fonte padrão, Fraunces, Instrument Serif.
- Três cards iguais lado a lado. Tudo centralizado.
- Terminal ou painel falso em `div`.
- Travessão no texto da interface.
- Rótulo em mono e caixa alta em cima de cada seção. Numeração de seção como "01 /". Pontinho de status decorativo.
- Barras de habilidade, contadores de vaidade.

# portfolio: Design System

Referência visual. Regra de produto vem do PRD e do dono, não deste documento. A identidade já está pronta no kit de marca e não se redesenha aqui (PRD, D18).

## 1. Princípios

1. Celular primeiro, 390 px. Computador logo depois, sem ser pensado por último.
2. A sensação de terminal vem de escolhas reais: mono para informação real, texto simples, densidade. Nunca de fantasia.
3. O conteúdo manda. Sem decoração que não diga nada.
4. Movimento conta uma história ou dá retorno. Se não faz nenhum dos dois, não existe.

## 2. Personalidade

- **Sóbrio:** fundo escuro, poucas cores, nenhum enfeite. O trabalho aparece cedo (PRD, D44).
- **Direto:** quem chega sem contexto entende, sem rolar muito, o que Lucas faz e o que procura (PRD, D56).
- **Honesto:** fala como estudante que constrói coisas reais. Mostra o que fez, sem aumentar.
- **Técnico sem fantasia:** mono em dado real, nenhum terminal de mentira.
- **Organizado:** hierarquia clara, ritmo previsível.

Referência de acabamento: apresentações de produto da Apple, em modo escuro e claro. Vale para o cuidado, não para a quantidade de texto.

### Marca

Os originais ficam em `C:\prog\identidade-visual\marca\kit\`, com as regras em `guia-de-uso.md`. Os ícones ficam em `public/`, e o nome fica em SVG no próprio HTML, com o mesmo vetor do kit e as cores dos tokens.

| Arquivo | Onde |
|---|---|
| `svg/nome-*` | Desenho base do nome e quadro final da Reescrita |
| `svg/simbolo-*`, `svg/simbolo-pequeno-*` | Espaços pequenos e quadrados. `simbolo` a partir de 24 px, `simbolo-pequeno` de 16 a 23 px |
| `web/*`, `web/head-snippet.html` | Ícones, manifesto e `<head>`. Copiar para a raiz pública |
| `png/avatar-*` | Prévia de link e perfis, se fizer sentido |

Regras do guia, sempre:

- Símbolo e nome nunca aparecem juntos.
- Em volta da logo, espaço livre de pelo menos a largura do bloco âmbar.
- Nome com no mínimo 96 px de largura.
- O nome vem do arquivo, nunca digitado em texto. Na Reescrita, a digitação é a revelação do próprio vetor do arquivo, letra por letra.
- Sem esticar, girar, trocar cor, nem pôr sombra, contorno ou degradê.
- Sobre foto ou fundo agitado, só com área calma atrás.

## 3. Paleta

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| `--bg` | `#0b0b0c` | `#f3f2ee` | Fundo |
| `--fg` | `#f2f2f0` | `#141413` | Texto e nome |
| `--accent` | `#e3a33b` | `#a8650a` | Cursor, foco e destaque na frase de apresentação |
| `--line` | `#444448` | `#bdbcb6` | Borda dos prints, do botão secundário e separadores. Não é cor de marca |

> TODO: cinzas para texto secundário, se o layout pedir. Não são cores de marca: precisam de contraste verificado, e entram aqui antes de serem usados.

Modo padrão: escuro, também sem JavaScript (PRD, D31). O seletor guarda a escolha em `localStorage`, nunca em cookie. Um script curto aplica a escolha antes da primeira pintura, para o tema não piscar no carregamento.

### Contraste verificado

Calculado em 2026-11-01 pela fórmula da WCAG.

| Par | Razão | Passa |
|---|---|---|
| `--fg` sobre `--bg`, escuro | 17,55:1 | AA e AAA |
| `--accent` sobre `--bg`, escuro | 8,96:1 | AA e AAA |
| `--fg` sobre `--bg`, claro | 16,46:1 | AA e AAA |
| `--accent` sobre `--bg`, claro | 4,14:1 | Só bloco da marca, ícone e texto grande. Reprova em texto pequeno |
| `--line` sobre `--bg`, escuro | 2,03:1 | Só borda decorativa. Nunca em texto ou em controle |
| `--line` sobre `--bg`, claro | 1,70:1 | Só borda decorativa. Nunca em texto ou em controle |

Por causa da última linha, texto pequeno em destaque no modo claro usa `--fg`, com outro sinal além da cor, como sublinhado.

## 4. Tipografia

| Papel | Fonte | Tamanho e peso |
|---|---|---|
| Logo e quadro final da Reescrita | IBM Plex Mono Medium, em vetor | Definido pelo arquivo |
| Primeiro quadro da Reescrita | Libre Caslon Text Regular, em vetor | Mesmo corpo do nome |
| Títulos | Red Hat Display | Ver escala abaixo |
| Detalhes e dado real: datas, tags, rótulos | Red Hat Mono | 14 px |
| Botões e links de ação | Red Hat Mono | 17 px |
| Texto corrido | Red Hat Text (PRD, D31) | 17 px |

Fontes carregadas por `next/font`, servidas do próprio site. Nada abaixo de 14 px.

| Token | Tamanho | Altura de linha |
|---|---|---|
| `text-sm` | 14 px | 1,5 |
| `text-base` | 17 px | 1,6 |
| `text-lg` | 20 px | 1,5 |
| `text-xl` | 28 px | 1,3 |
| `text-display` | 36 a 56 px, fluido | 1,1 |
| `text-huge` | 44 a 84 px, fluido. Só na frase de apresentação | 1 |

## 5. Forma

- **Raio:** 0, como o bloco âmbar do nome.
- **Borda:** 1 px, só quando separa algo. Vale o princípio 3.
- **Sombra:** nenhuma.
- **Espaçamento:** base de 4 px, a escala padrão do Tailwind.
- **Foco:** contorno de 2 px em `--accent`, com folga de 2 px. Passa de 3:1 nos dois modos.
- **Toque:** botão e controle com no mínimo 44 px.

## 6. Movimento

| O quê | Gatilho | Duração e curva | Por quê |
|---|---|---|---|
| Reescrita | Toda carga de `/` e `/en` sem âncora (PRD, D46) | 2,6 s, com cada letra de 140 a 230 ms, ver `docs/fdd/abertura.md` | Passa o nome da letra de livro para a letra de código |
| Voo do nome | Fim da Reescrita, depois de 350 ms | 800 ms, `cubic-bezier(0.77, 0, 0.175, 1)` | Leva o nome até o lugar dele no cabeçalho |
| Chegada da abertura | Fim do preloader | 900 ms em `--ease-out-quint`, com atrasos de 0 a 240 ms | Completa o voo do nome |
| Cursor do nome | Hover; foco onde o nome é link | Ciclo de 1,06 s em `steps(1)`, por 5 s, e depois aceso | A marca é o instante da digitação |
| Entrada de seção e caso | Rolagem, ao entrar na tela | Ligada à rolagem: sobe 1,5 rem e aparece | Dá ritmo sem prender a rolagem |
| Vídeo do caso | Maior parte dele na tela | Laço de cerca de 9 s, com pausa | Mostra o site funcionando (PRD, D51) |
| Cabeçalho | Rolar para baixo; rolar para cima; foco | 500 ms em `--ease-out-quint` | Dá espaço ao conteúdo sem perder o caminho de volta |
| Logo de tecnologia | Hover | 200 ms: sobe 4 px e cresce 8% | Retorno de interação |
| Linha de contato | Hover | 350 ms: anda 0,5 rem | Retorno de interação |

- Animação só de `transform` e `opacity`; nada de desfoque ou `mix-blend-mode` em elemento que se move.
- O que se mexe sozinho por mais de 5 s tem como pausar ou para sozinho (WCAG 2.2.2).
- A rolagem é a do navegador, sem biblioteca que mude a velocidade (PRD, D56).
- `prefers-reduced-motion`: respeitar. Abre no estado final, sem preloader, com cursor aceso e sem vídeo tocando sozinho. O guia da marca já define isso para o cursor, e o resto segue o padrão recomendado.

## 7. Componentes próprios

| Componente | Onde | Estados |
|---|---|---|
| Nome com cursor | Preloader; cabeçalho | Animando, voando, aceso, piscando, movimento reduzido |
| Seletor de idioma | Cabeçalho | pt-BR, en, foco |
| Seletor de tema | Cabeçalho | Escuro, claro, foco |
| Botão principal, em `--fg` sobre `--bg` invertido | Abertura; Quer um site? | Padrão, foco, hover |
| Botão secundário, com borda em `--line` | Abertura | Padrão, foco, hover |
| Print com vídeo por cima, e botão de pausa | Projetos | Só print, tocando, pausado, movimento reduzido |
| Linha de contato | Contato | Padrão, foco, hover |
| Logo de tecnologia | Tecnologias | Padrão, hover |

## 8. Tom de voz

- Primeira pessoa, simples e direta. Fala de estudante que faz coisas reais, sem pose de sênior.
- Diz o que fez e o que aprendeu, com fato concreto: "fiz a animação do hero", nunca "soluções inovadoras".
- Os dois idiomas têm o mesmo tom. O inglês é reescrito, não traduzido ao pé da letra.
- Palavras vetadas: elevar, sem esforço, inovador, apaixonado, métrica vazia como "100% foco". Em inglês: elevate, seamless, passionate, cutting-edge.

## 9. O que não fazer

- Degradês e brilhos roxos ou azuis, acentos neon.
- Inter como fonte padrão, Fraunces, Instrument Serif.
- Três cards iguais lado a lado. Tudo centralizado.
- Terminal ou painel falso em `div`.
- Travessão no texto da interface.
- Rótulo em mono e caixa alta em cima de cada seção. Numeração de seção como "01 /". Pontinho de status decorativo.
- Barras de habilidade, contadores de vaidade.
- Qualquer cor fora da paleta da marca sem passar por aqui antes.

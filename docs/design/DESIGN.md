# portfolio: Design System

Referência visual. Regra de produto vem do PRD e do dono, não deste documento. A identidade já está pronta no kit de marca e não se redesenha aqui (PRD, D18).

## 1. Princípios

1. Celular primeiro, 390 px. Computador logo depois, sem ser pensado por último.
2. A sensação de terminal vem de escolhas reais: mono para informação real, texto simples, densidade. Nunca de fantasia.
3. O conteúdo manda. Sem decoração que não diga nada.
4. Movimento conta uma história ou dá retorno. Se não faz nenhum dos dois, não existe.

## 2. Personalidade

- **Sóbrio:** fundo escuro de apresentação, muito espaço, poucos elementos por tela.
- **Honesto:** fala como estudante que constrói coisas reais. Mostra o que fez, sem aumentar.
- **Técnico sem fantasia:** mono em dado real, nenhum terminal de mentira.
- **Organizado:** hierarquia clara, ritmo previsível.

Referência: apresentações de produto da Apple, em modo escuro e claro.

### Marca

Os originais ficam em `C:\prog\identidade-visual\marca\kit\`, com as regras em `guia-de-uso.md`. O que o site usa entra em `public/` na base técnica.

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
| `--accent` | `#e3a33b` | `#a8650a` | Cursor e destaque |

> TODO: cinzas para texto secundário e bordas, se o layout pedir. Não são cores de marca: precisam de contraste verificado, e entram aqui antes de serem usados.

> TODO: modo padrão, seguir o sistema ou começar no escuro. O seletor guarda a escolha em `localStorage`, nunca em cookie. Decidir na base técnica, junto do tratamento para evitar piscada de tema no carregamento.

### Contraste verificado

Calculado em 2026-11-01 pela fórmula da WCAG.

| Par | Razão | Passa |
|---|---|---|
| `--fg` sobre `--bg`, escuro | 17,55:1 | AA e AAA |
| `--accent` sobre `--bg`, escuro | 8,96:1 | AA e AAA |
| `--fg` sobre `--bg`, claro | 16,46:1 | AA e AAA |
| `--accent` sobre `--bg`, claro | 4,14:1 | Só bloco da marca, ícone e texto grande. Reprova em texto pequeno |

Por causa da última linha, texto pequeno em destaque no modo claro usa `--fg`, com outro sinal além da cor, como sublinhado.

## 4. Tipografia

| Papel | Fonte | Tamanho e peso |
|---|---|---|
| Logo e quadro final da Reescrita | IBM Plex Mono Medium, em vetor | Definido pelo arquivo |
| Primeiro quadro da Reescrita | Libre Caslon Text Regular, em vetor | Mesmo corpo do nome |
| Títulos | Red Hat Display | > TODO: escala na base técnica |
| Detalhes e dado real: datas, tags, links | Red Hat Mono | > TODO: escala na base técnica |
| Texto corrido | > TODO: não definido. Decidir na base técnica, entre as Red Hat | > TODO |

Fontes carregadas por `next/font`, servidas do próprio site. Nada abaixo de 14 px, valor proposto a confirmar com o layout.

## 5. Forma

> TODO: raios, bordas e escala de espaçamento. Definir na base técnica. Vale o princípio 3: sem sombra ou borda que não separe nada.

## 6. Movimento

| O quê | Gatilho | Duração e curva | Por quê |
|---|---|---|---|
| Reescrita | Primeira carga da sessão | No máximo 3 s, com cada letra de 140 a 230 ms, ver `docs/fdd/abertura.md` | Conta a troca do Direito pelo código |
| Cursor do nome | Fim da digitação; hover; foco onde o nome é link | Ciclo de 1,06 s em `steps(1)`, por 5 s, e depois aceso | A marca é o instante da digitação |

- Animação só de `transform` e `opacity`; nada de desfoque ou `mix-blend-mode` em elemento que se move.
- O que se mexe sozinho por mais de 5 s tem como pausar ou para sozinho (WCAG 2.2.2).
- `prefers-reduced-motion`: respeitar. Abre no estado final, sem Reescrita e com cursor aceso. O guia da marca já define isso para o cursor, e o resto segue o padrão recomendado.

## 7. Componentes próprios

| Componente | Onde | Estados |
|---|---|---|
| Nome com cursor | Abertura; cabeçalho, depois que a abertura sai da tela | Animando, piscando, aceso, movimento reduzido |
| Seletor de idioma | Cabeçalho | pt-BR, en, foco |
| Seletor de tema | Cabeçalho | Escuro, claro, foco |
| Botão de WhatsApp | Contato | Padrão, foco, hover |

## 8. Tom de voz

- Primeira pessoa, simples e direta. Fala de estudante que faz coisas reais, sem pose de sênior.
- Diz o que fez e o que aprendeu, com fato concreto: "fiz a animação do hero", nunca "soluções inovadoras".
- Os dois idiomas têm o mesmo tom. O inglês é reescrito, não traduzido ao pé da letra.
- Palavras vetadas: elevar, sem esforço, inovador, soluções, apaixonado, "full stack" como título, métrica vazia como "100% foco". Em inglês: elevate, seamless, passionate, cutting-edge.

## 9. O que não fazer

- Degradês e brilhos roxos ou azuis, acentos neon.
- Inter como fonte padrão, Fraunces, Instrument Serif.
- Três cards iguais lado a lado. Tudo centralizado.
- Terminal ou painel falso em `div`.
- Travessão no texto da interface.
- Rótulo em mono e caixa alta em cima de cada seção. Numeração de seção como "01 /". Pontinho de status decorativo.
- Barras de habilidade, contadores de vaidade, ícones coloridos de tecnologia.
- Qualquer cor fora da paleta da marca sem passar por aqui antes.

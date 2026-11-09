# FDD: Aparelhos 3D

Status: rascunho
PRD: D44, D64, D65, D82 a D86 e D88 a D91. ADR 0005.

## Objetivo

O visitante vê os três projetos funcionando num notebook e num celular que reagem à rolagem, com o texto de cada projeto ao lado, e chega ao caso ou ao site de cada um.

## Onde aparece

| Página | Versão | Texto de cada projeto | Substitui |
|---|---|---|---|
| Inicial (`/`, `/en`) | Curta | Nome, tipo, uma linha e "Ver caso" | Os projetos curtos de `pagina-inicial.md` |
| Projetos (`/projetos`, `/en/projects`) | Completa | O texto completo de `projetos.md`, com "Minha parte", "Uma decisão", detalhe e links | Os cards com print, vídeo e botões de versão |

Um componente só serve às duas páginas. As páginas de caso continuam com a mídia de hoje (`caso.md`).

## Conteúdo

Os textos de hoje continuam: os de `projetos.md` na página Projetos e os de `pagina-inicial.md` na inicial. O título da seção, "Projetos", fica no primeiro passo, em `h1` na página Projetos e em `h2` na inicial.

**Textos novos**, a aprovar por Lucas:

| Lugar | pt-BR | Inglês |
|---|---|---|
| Botão de pausa, nome quando tocando | Pausar movimento | Pause motion |
| Botão de pausa, nome quando pausado | Retomar movimento | Resume motion |
| Nota no Crewz, acima do nome | Só no celular: é um app | Phone only: it's an app |

**Mídia**

| Aparelho | Vídeo | Reserva parada |
|---|---|---|
| Notebook | `public/projetos/video/<id>.mp4`, H.264, 1920 × 1200, cerca de 1,2 MB | `public/projetos/<id>.webp` |
| Celular | `public/projetos/video/celular/<id>.mp4`, H.264, 1080 × 1920, cerca de 1,2 MB | `public/projetos/celular/<id>.webp` |

O Crewz só tem vídeo de celular, gravado por dentro do app (D65, D91).

## Comportamento

**Estrutura**

- A seção tem quatro passos de texto, cada um com a altura da tela: o título e os três projetos, na ordem Dra. Thaiane Lessa, DraftCS e Crewz.
- O palco com os aparelhos fica fixo na tela enquanto os passos rolam. Ele começa no topo da seção e se solta no fim dela.
- O texto e os links ficam em HTML, por cima da cena. A cena é só imagem.

**Computador** (tela mais larga que alta, D88)

- O texto fica à esquerda e os aparelhos à direita.
- O texto de cada projeto fica num cartão de borda de 1 px em `--line`, raio 0, fundo `--bg` translúcido com desfoque (D84). O passo do título não tem cartão.
- O mouse inclina de leve os aparelhos.

**Celular** (tela mais alta que larga, D89)

- Os aparelhos ocupam a tela. O cartão de cada projeto sobe por baixo, por cima da cena, e para perto do pé da tela, com o mesmo fundo com desfoque.
- Na versão completa, se o texto não couber, o cartão cresce para cima, e os aparelhos ficam atrás dele.
- Sem transbordo em 360 e 390 px.

**Rolagem**

| Passo | Notebook | Celular | Telas |
|---|---|---|---|
| Título | Chega fechado e abre | Chega deitado e fica de pé | Primeiro quadro da Dra. Thaiane |
| Dra. Thaiane Lessa | Aberto | De pé | Vídeo da landing |
| DraftCS | Fecha quase todo na troca e abre de novo | Gira na troca | Vídeo do DraftCS |
| Crewz | Fecha e vai para trás | Vem para a frente e cresce | Vídeo do Crewz só no celular |

- A troca de projeto acontece quando o texto que sai e o que chega estão igualmente visíveis.
- A cena segue a rolagem com suavidade, nunca muda a velocidade nem a direção da rolagem, e volta ao passo anterior quando o visitante sobe.

**Vídeos**

- Só toca o vídeo do projeto cujo texto está na tela, e só enquanto a seção está visível. Os outros ficam parados no primeiro quadro.
- Vídeos e Three.js só baixam depois do fim do preloader e quando a seção está a até uma tela de distância (D64). Na página Projetos, que não tem preloader, baixam logo.

**Pausa (WCAG 2.2.2)**

- Um botão de 44 px, no canto de baixo do palco, para os vídeos e o balanço dos aparelhos. A rolagem continua mexendo os aparelhos, porque é o visitante quem move.
- Ícone de pausa ou de tocar, com o nome do botão no idioma da página.
- A pausa vale para a página toda e para a outra página com aparelhos, até recarregar o site.

**Antes da cena**

- O palco tem o espaço reservado desde o começo. Até a cena ficar pronta, ele fica vazio, no fundo da página, e a cena aparece com um fade quando o primeiro quadro está desenhado.

**Reserva parada (D90)**

- Com `prefers-reduced-motion`, sem JavaScript ou sem WebGL, não há palco: cada projeto aparece com o print da tela de quem visita e o mesmo texto e os mesmos links, um abaixo do outro, como a inicial de hoje. O Three.js e os vídeos não baixam.
- A escolha entre palco e reserva sai do CSS, para não mover nada quando a página carrega. Só a falta de WebGL troca depois, e é rara.

**Saída**

- Ao trocar de página, a cena para e libera geometrias, texturas, vídeos e o contexto WebGL.

## Movimento

| O quê | Gatilho | Como | Por quê |
|---|---|---|---|
| Aparelhos | Rolagem | Abrem, giram e trocam de lugar, seguindo a rolagem com suavidade | Mostram os projetos rodando em aparelho de verdade |
| Balanço | Sozinho, enquanto a cena está na tela | Oscilação leve do celular, com pausa | Dá vida à cena parada |
| Cena | Primeiro quadro pronto | Fade de 400 ms | Não aparecer de repente |
| Cartões | Rolagem | Sobem com a página, sem animação própria | O texto acompanha a rolagem |

Com `prefers-reduced-motion`, vale a reserva parada.

## Regras

1. Raio 0, borda de 1 px só no cartão, nada de numeração como "01 ·" e nada de três cards iguais lado a lado (`DESIGN.md`).
2. Cores da cena lidas dos tokens (`--bg`, `--line`, `--accent`) e atualizadas ao trocar de tema.
3. Aparelhos desenhados em código, sem modelo baixado e sem marca de fabricante.
4. Vídeo sem metadado, sem áudio, sem dado de terceiro. O do Crewz só com dados de demonstração (D65, D91).
5. As regras de `projetos.md` sobre o que os prints e os vídeos podem mostrar continuam valendo.

## Acessibilidade

- O canvas tem `aria-hidden`. O conteúdo está no texto.
- Links alcançáveis pelo teclado, com foco visível, e nome que distingue o projeto.
- Os passos sem link não recebem foco.
- O botão de pausa tem nome no idioma certo, `aria-pressed`, 44 px e foco visível.

## Desempenho

- O Three.js fica fora do primeiro carregamento, num pedaço próprio do build.
- Média de 50 quadros por segundo ou mais no Chrome do computador. A resolução da cena cai sozinha quando os quadros ficam lentos.
- Textura de vídeo sem mipmap, sombra redesenhada só quando algo mexe, nada desenhado com a seção fora da tela.
- Nenhum deslocamento de layout.

## Fora de escopo

- Nome em 3D e fundo em shader (D85).
- Modelo 3D baixado.
- Aparelhos nas páginas de caso.

## Critérios de aceite

- [ ] No computador, texto à esquerda e aparelhos à direita, na inicial e em Projetos, em `/` e `/en`, escuro e claro.
- [ ] No celular, cartões por cima dos aparelhos, sem transbordo em 360 e 390 px.
- [ ] A rolagem abre o notebook, põe o celular de pé e troca o projeto na hora certa. O Crewz aparece só no celular.
- [ ] Só toca o vídeo do projeto na tela, e nada toca com a seção fora da tela.
- [ ] O botão de pausa para vídeos e balanço, e a pausa vale para as duas páginas.
- [ ] Nada do Three.js nem dos vídeos baixa antes do preloader ou longe da seção, nem em Sobre, Serviços e Contato.
- [ ] Com `prefers-reduced-motion`, sem WebGL ou sem JavaScript, aparecem os prints com o mesmo texto e os mesmos links, e o Three.js não baixa.
- [ ] Média de 50 quadros por segundo ou mais no Chrome do computador, e sem travadas longas com CPU 4× mais lenta.
- [ ] Vídeos em 1920 × 1200 e 1080 × 1920, sem metadado.
- [ ] Nenhum deslocamento de layout medido.

# ADR 0004: Movimento em CSS, sem Motion

Status: aceito
Data: 2026-11-03

## Contexto

O ADR 0001 escolheu Motion para animação, e previa usá-lo só onde fosse preciso. O site foi construído e nenhum componente precisou dele: Reescrita, chegada da abertura, entrada de seções e hover são CSS, e o voo do nome do preloader usa a Web Animations API do próprio navegador. A dependência estava instalada sem nenhum uso.

## Decisão

O movimento do site fica em CSS e nas APIs do navegador. Motion sai das dependências. O restante do ADR 0001 continua valendo.

## Alternativas consideradas

- Manter Motion instalado para uso futuro: dependência parada, que precisa de atualização e não entrega nada hoje.
- Reescrever as animações em Motion: mais JavaScript no navegador, sem ganho visível no que o site faz.

## Consequências

- Menos uma dependência para manter. Como nenhum componente a importava, o site não muda.
- Efeitos ligados à rolagem usam `animation-timeline`. Navegador sem suporte mostra o conteúdo sem efeito.
- Se um movimento pedir física de mola ou gesto, Motion volta com ADR novo.

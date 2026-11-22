# ADR 0006: Motion, GSAP e rolagem suave liberados

Status: aceito
Data: 2026-11-22

## Contexto

O ADR 0004 tirou o Motion das dependências e deixou o movimento só em CSS e nas APIs do navegador, porque nenhum componente usava a biblioteca. Na revisão das regras de 2026-11-21 e 2026-11-22 (PRD, Rodada 16), Lucas liberou mudar a direção visual do site, com clientes primeiro, e quis poder usar efeitos que pedem biblioteca: microinterações como as das bibliotecas de componentes que ele guardou, e sequências presas à rolagem como as dos modelos do Scrolltide. Também liberou a rolagem suave.

O motivo do ADR 0004 continua válido: dependência instalada sem uso só dá trabalho de manter.

## Decisão

Motion e GSAP ficam liberados. Nenhum dos dois é instalado agora: cada um entra quando uma animação concreta pedir, com a escolha explicada no plano daquela entrega. Bibliotecas de rolagem suave, como a Lenis, também ficam liberadas, nas mesmas condições (PRD, D100). Substitui o ADR 0004.

## Alternativas consideradas

- Manter o ADR 0004: impede os efeitos que Lucas quer explorar na nova direção.
- Instalar Motion ou GSAP já: repete o problema que o ADR 0004 resolveu, uma dependência parada esperando uso.
- Escolher uma só agora: a escolha depende da animação. Motion é feito para React e serve a microinterações; GSAP, com o ScrollTrigger, é mais forte em sequência presa à rolagem.

## Consequências

- O que hoje está em CSS, na Web Animations API e no `ViewTransition` do React pode passar para uma das bibliotecas, se o agente propuser e Lucas aprovar.
- A entrega que trouxer uma das bibliotecas diz qual animação pediu, quanto ela pesa no navegador e por que CSS não bastava.
- Rolagem suave muda o comportamento da rolagem no celular, no trackpad e no leitor de tela. A entrega que trouxer uma biblioteca de rolagem mostra o resultado nos dois tamanhos de tela antes da aprovação (PRD, D109).
- O que se mexe sozinho por mais de 5 s continua tendo como parar (WCAG 2.2.2), como meta (PRD, D101).

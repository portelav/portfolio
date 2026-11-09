# ADR 0005: Three.js para os aparelhos 3D

Status: aceito
Data: 2026-11-09

## Contexto

O ADR 0004 deixou o movimento do site em CSS e nas APIs do navegador, e disse que biblioteca nova pede ADR novo. O dono aprovou os aparelhos 3D (PRD, D82): um notebook e um celular que reagem à rolagem, com o vídeo de cada projeto nas telas. Liberou também bibliotecas 3D (D83). A demo aprovada, em 2026-11-08, já usa Three.js, com os aparelhos desenhados em código, sem modelo baixado.

CSS 3D não dá conta disso: não tem luz, sombra, reflexo nem material de metal e vidro, e um aparelho feito de caixas em CSS parece falso, que foi a primeira queixa do dono na demo 1.

## Decisão

Os aparelhos 3D usam Three.js, instalado pelo npm numa versão fixa (`three` 0.186.1 e `@types/three` 0.186.0), e carregado com `import()` só no navegador, depois do preloader e perto da seção. A cena fica num módulo próprio em `src/lib/`, sem React, que um Client Component liga e desliga. O resto do movimento do site continua em CSS, como no ADR 0004.

## Alternativas consideradas

- CSS 3D: sem luz, sombra nem reflexo; os aparelhos ficariam com cara de caixa.
- React Three Fiber: mais uma camada e mais JavaScript, e a cena é uma só, ligada à rolagem, sem árvore de componentes 3D que justifique.
- Modelo 3D baixado (glTF): arquivo pesado, licença de terceiro e menos controle sobre materiais e telas. A demo mostrou que o desenho em código basta.
- Three.js por CDN, como na demo: depende de outro servidor e foge do lockfile e do `npm audit`.

## Consequências

- O Three.js fica fora do primeiro carregamento. Quem não chega perto da seção não baixa nada. O tamanho do pedaço novo é medido no build.
- Com `prefers-reduced-motion`, sem WebGL ou sem JavaScript, a seção mostra os prints parados, com o mesmo texto e os mesmos links, e o Three.js não baixa (PRD, D90).
- A cena precisa liberar geometrias, texturas, vídeos e o contexto WebGL ao sair da página, porque o Next.js troca de página sem recarregar.
- Atualizar o Three.js passa a fazer parte da manutenção. A versão só muda quando tiver pelo menos duas semanas de publicada.
- O ADR 0004 continua valendo para todo o resto do movimento.

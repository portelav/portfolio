---
name: ui-ux-pro-max
description: "Checklist de qualidade de interface do portfolio, mobile-first. Use ao revisar uma tela, ao implementar navegação, animação ou responsividade, e antes de entregar interface. Cobre acessibilidade, toque, performance, layout, tipografia, animação, formulários e navegação."
---

# UI/UX Pro Max — o que checar

Complementa `docs/design/DESIGN.md` (identidade) e o `/ui` (implementação). Isto é o **o que checar**, não o **como pintar**. Não usar para backend.

## Prioridade

| # | Categoria | Impacto | Checks principais |
|---|---|---|---|
| 1 | Acessibilidade | CRÍTICO | contraste 4.5:1, alt text, teclado, aria-label |
| 2 | Toque e interação | CRÍTICO | mínimo 44×44 px, 8 px entre alvos, retorno ao toque e à espera |
| 3 | Performance | ALTO | WebP/AVIF, imagem otimizada, espaço reservado (CLS < 0.1), LCP |
| 4 | Estilo | ALTO | coerente com o DESIGN.md, uma família de ícones, sem emoji como ícone |
| 5 | Layout e responsivo | ALTO | 390 px primeiro, sem scroll horizontal |
| 6 | Tipografia e cor | MÉDIO | escala do DESIGN.md, tokens semânticos |
| 7 | Animação | MÉDIO | `transform` e `opacity`, movimento com significado, pausa |
| 8 | Formulários e feedback | MÉDIO | label visível, erro perto do campo |
| 9 | Navegação | ALTO | voltar previsível, toda tela chave com URL |

## Referência rápida

### 1. Acessibilidade
- Contraste 4.5:1 em texto normal, 3:1 em texto grande, ícone e borda de componente.
- Foco visível em todo interativo; ordem de tab igual à visual.
- `alt` descritivo em imagem com significado; `alt=""` em decorativa. Vídeo decorativo sem som e sem controles obrigatórios; vídeo com conteúdo, com legenda.
- `aria-label` em botão só com ícone. `label` em todo campo; placeholder não é label.
- `h1` a `h6` sem pular nível; um `h1` por página.
- Informação nunca só por cor.
- O que se mexe sozinho por mais de 5 s tem como pausar (WCAG 2.2.2). `prefers-reduced-motion` segue a decisão do DESIGN.md.
- Todo gesto tem alternativa sem gesto (WCAG 2.5.7).

### 2. Toque e interação
- Alvo mínimo 44×44 px, 8 px entre alvos.
- Ação primária por toque, nunca só por hover.
- Pressionado visível em até 100 ms; ação assíncrona com estado de espera e trava contra toque duplo.
- `cursor-pointer` em clicável no computador.

### 3. Performance
- Imagem otimizada com `sizes`, WebP/AVIF, preguiçosa fora da primeira dobra, prioritária na primeira.
- `width`/`height` ou `aspect-ratio` sempre.
- Fonte com `display: swap`, poucas famílias e pesos.
- Vídeo: pôster, sem autoplay com som, versão leve no celular, H.264 para iOS.
- Componente pesado por import dinâmico.
- Rolagem suave e animação ligada à rolagem não podem travar o fio principal.

### 4. Estilo
- Um estilo, o do DESIGN.md, em toda a página.
- Uma família de ícones. Sem emoji como ícone.
- Hover, pressionado e desabilitado distintos.

### 5. Layout e responsivo
- Viewport `width=device-width, initial-scale=1`; nunca desabilitar zoom.
- 390 px, depois 768, depois 1024 e 1440.
- Campo de texto com 16 px no celular (o iOS dá zoom abaixo disso).
- 35 a 60 caracteres por linha no celular, até 75 no computador.
- Sem scroll horizontal. Áreas seguras respeitadas (`env(safe-area-inset-*)`).

### 6. Tipografia e cor
- Escala e entrelinha do DESIGN.md. Tokens semânticos, nunca hex solto.
- Modo escuro (se houver) com variantes próprias, não inversão.

### 7. Animação
- Microinteração 150 a 300 ms; exceções declaradas no DESIGN.md.
- Só `transform` e `opacity`. Nunca animar `width`, `height`, `top`, `left`. Nada de desfoque nem `mix-blend-mode` em elemento que se move.
- `ease-out` entrando, `ease-in` saindo. Toda animação expressa causa e efeito.
- Texto animado por linha, nunca letra a letra em parágrafo.

### 8. Formulários e feedback
- Label visível; erro embaixo do campo; obrigatório marcado; validação no blur.
- Envio: espera, depois sucesso ou erro.
- Estado vazio com mensagem útil e uma ação. Confirmação antes de ação destrutiva.

### 9. Navegação
- Voltar previsível. Âncoras e links internos com rolagem que respeita cabeçalho fixo.
- Menu com fechamento óbvio, Esc e foco preso enquanto aberto.

## Auditoria em runtime

Prioridades 1 a 3 **não se auditam lendo código**. Com a página aberta pelo MCP do Chrome DevTools: snapshot de acessibilidade, medida dos alvos, screenshot em 390×844 e no computador (e nos dois temas, se houver), console sem erro, Lighthouse para desempenho.

**Regra de honestidade:** nunca afirmar "contraste ok" ou "sem violação" a partir do código. Ou mediu, ou declara `Confiança: LOW — preciso abrir a tela antes de afirmar`.

## Checklist antes de entregar

**Visual:** sem emoji como ícone; ícones da mesma família; tokens; pressionado sem pular layout.
**Interação:** retorno em todo clicável; alvos ≥ 44 px; foco na ordem visual.
**Layout:** testado em celular pequeno, grande, tablet e computador; nada escondido atrás de barra fixa.
**Acessibilidade:** labels; cor nunca sozinha; texto ampliado sem quebrar; pausa no que se mexe sozinho.
**Performance:** LCP, CLS e peso da página medidos.

Responda sempre em português do Brasil.

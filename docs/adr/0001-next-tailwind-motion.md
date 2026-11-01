# ADR 0001: Next.js 16, Tailwind 4 e Motion

Status: aceito
Data: 2026-11-01

## Contexto

O portfólio antigo usa Vite, React, framer-motion e CSS puro. A reconstrução parte do zero e precisa de metadados e prévia de link por idioma, rotas em dois idiomas e uma animação de abertura bem cuidada. Lucas trabalha sozinho, sem prazo fixo, e já usa essa stack na landing da Dra. Thaiane.

## Decisão

Next.js 16 com App Router, React 19 e TypeScript, Tailwind CSS 4 para os tokens e Motion para animação.

## Alternativas consideradas

- Astro com ilhas React: menos JavaScript no navegador, mas é stack nova, e o tempo iria para aprender a ferramenta em vez do site.
- Manter Vite e React: exigiria montar à mão SEO, prévia de link e rotas por idioma.

## Consequências

- Conhecimento e padrões da landing podem ser reaproveitados.
- Next.js 16 muda convenções: `proxy.ts`, parâmetros assíncronos. Ler `node_modules/next/dist/docs/` antes de escrever código.
- Motion pesa no bundle. Entra só nos componentes que precisam dele. Efeito simples, como o piscar do cursor, fica em CSS.
- O código antigo sai por inteiro na entrega da base técnica. Ele continua acessível pela tag `v1-academic`.

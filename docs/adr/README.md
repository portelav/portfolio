# ADRs: Architecture Decision Records

Um arquivo por decisão técnica relevante. Nome: `NNNN-titulo-curto.md`, numeração sequencial.
ADR nunca é editado depois de aceito. Decisão mudou? ADR novo que substitui o anterior. Exceção: uma nota curta e datada quando o texto ficou desatualizado sem mudar a decisão.

## Índice

| Nº | Título | Status |
|---|---|---|
| [0001](0001-next-tailwind-motion.md) | Next.js 16, Tailwind 4 e Motion | aceito, com Motion substituído pelo ADR 0004 |
| [0002](0002-i18n-next-intl.md) | Dois idiomas com `next-intl` | aceito |
| [0003](0003-vercel-analytics.md) | Vercel e Web Analytics | aceito |
| [0004](0004-movimento-em-css.md) | Movimento em CSS, sem Motion | aceito, com o 3D dos aparelhos no ADR 0005 |
| [0005](0005-threejs-aparelhos.md) | Three.js para os aparelhos 3D | aceito |

## Template

```markdown
# ADR NNNN: Título

Status: proposto | aceito | substituído por ADR NNNN
Data: AAAA-MM-DD

## Contexto

Qual problema ou força motivou a decisão. Restrições reais (equipe, custo, prazo, conhecimento).

## Decisão

O que foi decidido, em uma ou duas frases diretas.

## Alternativas consideradas

- Alternativa A: por que não.
- Alternativa B: por que não.

## Consequências

O que fica mais fácil, o que fica mais difícil, o que passa a ser obrigatório.
```

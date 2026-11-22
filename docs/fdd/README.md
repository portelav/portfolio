# FDDs: Functional Design Documents

Um arquivo por seção com comportamento, como preloader, aparelhos 3D, menu e página de caso. Nome: `<nome>.md` em kebab-case.
Escrito antes da implementação. É a spec que o código deve satisfazer. Texto e ajuste visual não pedem FDD (`CLAUDE.md`, seção Documentação).

## Índice

Os FDDs "em revisão" descrevem o site de hoje e são refeitos, ou juntados, quando a estrutura nova for decidida (PRD, D103).

| Seção | Status | Plano |
|---|---|---|
| [Cabeçalho e rodapé](cabecalho-rodape.md) | implementado, com menu e rodapé em revisão | `tasks/trabalho-primeiro.md`, `tasks/site-pages.md` |
| [Abertura](abertura.md) | implementado, com texto em revisão | `tasks/trabalho-primeiro.md` |
| [Página inicial e site em páginas](pagina-inicial.md) | em revisão | `tasks/site-pages.md` |
| [Projetos](projetos.md) | em revisão | `tasks/trabalho-primeiro.md` |
| [Aparelhos 3D](aparelhos-3d.md) | implementado, com ajustes pendentes | `tasks/projects-3d-devices.md` |
| [Página de caso](caso.md) | implementado, com textos em revisão | `tasks/case-study-landing.md` |
| [Sobre](sobre.md) | em revisão | `tasks/trabalho-primeiro.md` |
| [Tecnologias](tecnologias.md) | em revisão | `tasks/trabalho-primeiro.md` |
| [Quer um site?](quer-um-site.md) | em revisão | `tasks/trabalho-primeiro.md` |
| [Contato e nota de privacidade](contato.md) | em revisão | `tasks/trabalho-primeiro.md` |

Planos mais antigos, já auditados: `tasks/cabecalho-rodape.md`, `tasks/abertura.md` e `tasks/projetos.md`.

## Template

```markdown
# FDD: Seção <nome>

Status: rascunho | aprovado | implementado
PRD: seção 6, item <nome>

## Objetivo
O que o visitante entende ou faz depois desta seção. Uma frase.

## Conteúdo
Textos, imagens, vídeos, dados, em pt-BR e inglês. De onde vem cada um e o que ainda falta.

## Comportamento
Layout no celular e no computador, interação, links e botões, para onde levam.

## Movimento
O que anima, o gatilho (entrada, rolagem, toque), duração, e o porquê. O que nunca anima.

## Regras
Lista numerada e testável (inclusive as regras de fora que afetam a seção).

## Acessibilidade
Ordem de leitura, texto alternativo, contraste, foco, alternativa a gesto, pausa do que se mexe sozinho.

## Desempenho
Peso de mídia, carregamento preguiçoso, espaço reservado.

## Fora de escopo
O que fica para depois.

## Critérios de aceite
Checklist verificável em 390 px e no computador.
```

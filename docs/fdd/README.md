# FDDs: Functional Design Documents

Um arquivo por seção. Nome: `<nome>.md` em kebab-case.
Escrito ANTES da implementação. É a spec que o código deve satisfazer.

Regra: seção sem FDD não entra em desenvolvimento.

## Índice

| Seção | Status | Plano |
|---|---|---|
| [Cabeçalho e rodapé](cabecalho-rodape.md) | implementado | `tasks/cabecalho-rodape.md` |
| [Abertura](abertura.md) | implementado | `tasks/abertura.md` |
| [Projetos](projetos.md) | aprovado | `tasks/projetos.md` |

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

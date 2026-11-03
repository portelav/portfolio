# FDD: Seção Tecnologias

Status: aprovado
PRD: seção 6, item Tecnologias; D52

## Objetivo

Quem avalia estágio vê, depois de ver os projetos, com que linguagens e tecnologias Lucas trabalha.

## Conteúdo

| Grupo | pt-BR | Inglês | Itens |
|---|---|---|---|
| Linguagens | Linguagens | Languages | TypeScript, JavaScript, Python, Java e SQL |
| Tecnologias | Tecnologias | Technologies | Next.js, React, Tailwind CSS, Supabase e Vercel |

- Cada item tem o logo nas cores originais e o nome em Red Hat Mono, 14 px. Dados em `src/lib/stack.ts`.
- Marcas continuam de quem são (`CLAUDE.md`, Direitos).

## Comportamento

- Fica depois do Sobre, nunca antes dos projetos (PRD, D45).
- Dois grupos lado a lado no computador, um abaixo do outro no celular.
- Até 4 itens por linha no computador, e 3 no celular.
- Um separador de 1 px em `--line` no topo da seção.
- Os itens não são links.

## Movimento

| O quê | Gatilho | Como | Por quê |
|---|---|---|---|
| Item | Rolagem, ao entrar na tela | Sobe 1,5 rem e aparece, cada um um pouco depois do anterior | Dá ritmo sem prender a rolagem |
| Logo | Hover | Sobe 4 px e cresce 8%, em 200 ms | Retorno de interação |

## Regras

1. Sem barras de habilidade, nível ou porcentagem (`DESIGN.md`, seção 9).
2. Só entra o que Lucas usou de fato em projeto ou no curso.
3. Logos em SVG no próprio HTML, a 32 px.

## Acessibilidade

- Título de cada grupo como cabeçalho, e itens em lista.
- O logo fica oculto com `aria-hidden`, porque o nome vem escrito ao lado.
- Contraste do nome: `--fg` sobre `--bg`. O logo é decorativo.
- Com `prefers-reduced-motion`, tudo aparece sem efeito.

## Desempenho

- Sem imagem carregada à parte, nem JavaScript novo.

## Fora de escopo

- Relacionar cada tecnologia a um projeto.
- Links para documentação das tecnologias.

## Critérios de aceite

- [ ] Em 390 px e no computador, em `/` e `/en`, escuro e claro, sem transbordo.
- [ ] Todo item tem logo legível nos dois modos.
- [ ] Leitor de tela lê cada grupo e o nome de cada item, uma vez só.
- [ ] Com `prefers-reduced-motion`, nada se move.

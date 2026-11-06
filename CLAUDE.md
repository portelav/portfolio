# CLAUDE.md

Contexto operacional para agentes neste repositório. Ler antes de qualquer tarefa.

## Projeto

**portfolio**: site pessoal de Lucas Portela (`portelav`), estudante de Ciência da Computação em Maceió. Para quem avalia estudante para estágio e para quem quer contratar um site, com o mesmo peso.
Reconstrução do zero, em repositório novo. A identidade visual já está pronta e não se redesenha aqui.

## Equipe

Lucas Portela (`portelav`), sozinho. Lucas aprova conteúdo e visual e faz o merge.

Repositório: `portelav/portfolio` (público). Deploy: Vercel, em projeto próprio, produção a partir da `main`.

## Marco atual

Reconstrução na `main` deste repositório. A versão antiga vem de outro repositório, privado, e segue em `portelav.vercel.app` até o lançamento, quando esse endereço passa para o projeto novo na Vercel. Lista de trabalho em `docs/ROADMAP.md`.

Onde está cada coisa:

| Pergunta | Documento |
|---|---|
| O quê e por quê, público, escopo, decisões do dono | `docs/PRD.md` |
| Por que cada decisão técnica foi tomada | `docs/adr/` |
| Como cada seção se comporta | `docs/fdd/<nome>.md` |
| O que vem agora e depois | `docs/ROADMAP.md` |
| Cor, tipografia, forma, movimento, tom de voz | `docs/design/DESIGN.md` |
| Pendências internas, avais de terceiros | `private/` (fora do git) |

## Estado atual

Direção "trabalho na primeira tela" aprovada (PRD, D44 a D56). O site inteiro está na `main` (`tasks/trabalho-primeiro.md`), publicado em `portelav-site.vercel.app` e fora do índice dos buscadores. A landing tem página de caso própria, e o cabeçalho tem menu no computador (PRD, D67 a D72). O LCP da página inicial tem exceção aceita (PRD, D60 e D63). Falta o currículo em PDF, e o lançamento segue o `docs/ROADMAP.md`. No endereço público, https://portelav.vercel.app, ainda está a versão antiga.

## Ambientes

| Ambiente | URL |
|---|---|
| Local | `http://localhost:3000` |
| Preview | URL da Vercel de cada branch e de cada PR |
| Produção (`main`) | https://portelav-site.vercel.app até o lançamento. Depois, https://portelav.vercel.app |

## Stack

| Camada | Escolha | ADR |
|---|---|---|
| Framework | Next.js 16, React 19, TypeScript 6.0 | 0001 |
| Estilo | Tailwind CSS 4, tokens do `DESIGN.md` | 0001 |
| Movimento | CSS e APIs do navegador | 0004 |
| Idiomas | `next-intl`, pt-BR em `/` e inglês em `/en` | 0002 |
| Hospedagem e medição | Vercel e Vercel Web Analytics | 0003 |

Sem banco, sem login e sem formulário. Se algum entrar, rodar `/kickoff` de novo antes.

Regras que decorrem da stack:

- Next.js 16: ler `node_modules/next/dist/docs/` antes de escrever código. `proxy.ts` no lugar de middleware. `params`, `searchParams`, `cookies()` e `headers()` são assíncronos.
- `AGENTS.md`, gerado pelo Next.js: manter e commitar.
- TypeScript fica na 6.0 enquanto o `typescript-eslint`, usado pelo `eslint-config-next`, não aceitar a 7.
- Todo texto de interface vive nos arquivos de mensagens, em pt-BR e em inglês, na mesma entrega. Nenhum texto fixo em componente.
- Animação só de `transform` e `opacity`. Nada de desfoque ou `mix-blend-mode` em elemento que se move. O que se mexe sozinho por mais de 5 s para ou tem pausa (WCAG 2.2.2).
- Nenhum cookie não essencial. Cookie novo muda o PRD, porque pede consentimento.

## Fluxo com agentes

Comandos em `.claude/commands/`, skills em `.claude/skills/`. Artefato-mestre de cada entrega: `tasks/{slug}.md` (template em `.claude/templates/task-template.md`).

1. `/plan <pedido>`: cria a branch `tipo/{slug}`, faz a triagem e escreve os Stages 1 a 5. Para no **Gate S2** até aprovação humana. Não escreve código.
2. `/exec`: implementa na ordem do plano, um commit por item, escreve os Stages 6 a 8.
3. `/walkthrough`: audita e escreve o Stage 9. APPROVED, WARNINGS ou BLOCKED.
4. `/pr`: abre o PR. Lucas faz o merge, ou autoriza no `/pr`.

| Comando ou skill | Para quê |
|---|---|
| `/feature-flow` | Orquestra refine → plan → exec → walkthrough → pr com gates humanos |
| `/refine` | Reescreve pedido vago e roteia |
| `/commit` | Microcommits atômicos em Conventional Commits |
| `/fix-loop` | Bug: reproduzir primeiro, corrigir até verde, PR com causa raiz |
| `/ui`, `/ui-ux-pro-max` | Componentes com os tokens; checklist de qualidade de interface |
| `/cot`, `/tot` | Raciocínio passo a passo; comparação de alternativas |

Skills de design usadas, instaladas no usuário (não no repositório): `taste-skill`, `emil-design-eng`, `animate`, `frontend-design`.

Hooks em `.claude/settings.json`: validação de frontmatter ao abrir a sessão, e lint e typecheck ao fim do turno quando o código mudou.

QA automático no navegador pelo MCP do Chrome DevTools, sem pedir licença, avisando. Depois pedir o teste manual. Fechar no fim só o Chrome aberto pelo MCP.

## Fluxo de trabalho: docs primeiro

1. Nenhuma seção sem FDD. O FDD é a spec.
2. Mudança de arquitetura ou de stack exige ADR antes do código.
3. O PRD é vivo: implementação divergiu, o doc muda na mesma branch.
4. Dúvida entre duas leituras do doc: perguntar. Decisão de produto é do dono, registrada no PRD com data.
5. Documento pronto ou seção concluída: commit imediato.

## Git

- Commits pequenos, uma mudança lógica por commit.
- Conventional Commits: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`. Título em inglês, imperativo, sem ponto final, até 72 caracteres.
- NUNCA adicionar Co-Authored-By, Generated with ou qualquer atribuição ou menção a IA em commits, PRs ou no README.
- **Base de trabalho:** `main`. Ela não toca no site antigo, que vem de outro repositório.
- **Padrão:** branch `tipo/nome` a partir da base e PR sem squash.
- **Ajuste pequeno vai direto na base, sem branch e sem PR:** texto, documentação ou correção que não muda layout, comportamento nem dependência.
- PR nunca é rascunho. Confirmar com Lucas antes de abrir, porque Lucas testa antes.
- Nunca `git push --force` em `main`. Nunca commitar `.env`, segredos ou credenciais.
- Lockfile: rodar `npm ci` limpo antes do push quando o npm local reescrever entradas que não têm a ver com a mudança.

## Repositório público

Tudo que entra no git fica visível para sempre, inclusive no histórico e nos diffs de PR. Antes de cada commit:

- **Segredo nunca.** Chave, token, senha e `.env` só na hospedagem ou em `.env.local`. O CI roda `gitleaks` e barra.
- **Dado de terceiro nunca:** paciente, cliente, colega, telefone pessoal, CPF, endereço de casa. Paciente não aparece nem com consentimento. Imagem de cliente ou de colega, como um print de projeto, só entra com autorização de quem aparece.
- **Exceção registrada:** o número de WhatsApp e o Gmail do próprio Lucas aparecem no site e no código por escolha própria (PRD, D9 e D24). Cada um mora em um arquivo só. Commit continua com o e-mail noreply.
- **Documento interno fica em `private/`** (ignorado aqui): dúvida aberta, pendência de terceiro, estratégia, opinião sobre alguém, situação pessoal. O doc público registra só decisão tomada e regra.
- **Mídia sem metadado.** Foto e vídeo novos entram limpos (`exiftool -all=`, `magick -strip`, `ffmpeg -map_metadata -1`): GPS, aparelho, autor, conta e id do documento saem.
- **Commit com o e-mail noreply** do GitHub, já configurado neste clone.
- **Direitos:** todos os direitos reservados. Sem licença de uso. Marcas e imagens de clientes e de colegas continuam de quem são.

## Idioma

- Documentação: português do Brasil.
- Código, identificadores, comentários, commits, branches: inglês.
- Interface: português do Brasil e inglês.

## Convenções de documento

- Markdown, uma ideia por seção, diagramas em Mermaid no próprio arquivo.
- Seção ainda não escrita recebe `> TODO` com o que falta, nunca texto inventado.

## Comandos

```bash
npm ci
npm run dev
```

Antes de abrir PR, estes ficam verdes:

```bash
npm run lint
npm run typecheck
npm run build
```

## Estrutura do código

```text
messages/            textos em pt-BR e inglês
public/              ícones e manifesto do kit; prints e vídeos em public/projetos/, por tela
src/app/[locale]/    layout raiz, páginas e 404, só composição
src/app/globals.css  tokens do DESIGN.md
src/components/      componentes
src/i18n/            rotas e carga de mensagens de next-intl
src/lib/             fontes, tema, metadados da marca, contato e dados dos projetos e tecnologias
src/proxy.ts         resolve o idioma pela URL
```

## Kit

Organizado pelo `/kickoff` do `claude-kit` em 2026-11-01 (kit 3ac1809).

- **Adotado:** `CLAUDE.md`, PRD leve, ADRs, FDDs por seção, `DESIGN.md`, ROADMAP leve, `tasks/{slug}.md`, README, `/plan`, `/exec`, `/walkthrough`, `/pr`, `/commit`, `/feature-flow`, `/refine`, `/fix-loop`, `/cot`, `/tot`, `/ui`, `/ui-ux-pro-max`, subagentes dos comandos adotados, hook de frontmatter, hook de lint e typecheck, CI com `gitleaks`, MCP do Chrome DevTools, regras de repositório público.
- **Fora, e quando entra:** ADD (entra se houver banco, login ou formulário que grava); `security-threat-model` (formulário, login ou upload); `/db-architect`, `/index-generator`, testes de RLS e migração no merge (banco); `/council` (decisão de produto com trade-off real que os documentos não resolvem); `/good-morning` (equipe); bot de revisão de PR (equipe; o GitHub não deixa o autor aprovar o próprio PR); `docs/research/` (pesquisa grande); Docker (serviço local); camada de serviço (regra de negócio).

Rodar `/kickoff` de novo revisa esta lista.

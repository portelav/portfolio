# CLAUDE.md

Contexto operacional para agentes neste repositório. Ler antes de qualquer tarefa.

## Projeto

**portfolio**: site pessoal de Lucas Portela (`portelav`), estudante de Ciência da Computação em Maceió. Fala primeiro com quem quer contratar um site, e depois com quem avalia estudante para estágio.

## Equipe

Lucas Portela (`portelav`), sozinho. Lucas aprova conteúdo e visual e faz o merge.

Repositório: `portelav/portfolio` (público). Deploy: Vercel, em projeto próprio, produção a partir da `main`.

## Decisões são do Lucas

- Nenhuma regra, proibição ou decisão entra nos documentos sem Lucas aprovar, uma por uma. Antes de escrever ou reescrever um documento, listar as regras que ele vai ter e perguntar cada uma, com a opção recomendada primeiro.
- O que o agente preencher sozinho aparece como proposta ou explicação, nunca como regra.
- Dúvida entre duas leituras de um documento: perguntar. Decisão do dono entra no registro do PRD, com data.
- O que ainda não foi decidido recebe `> TODO` com o que falta, nunca texto inventado.

## Estado atual

O site foi lançado em 2026-11-24 (PRD, D115): a `main` está publicada em https://portelav.vercel.app, que também responde em `portelav-site.vercel.app`, e aberta aos buscadores. A versão antiga, de outro repositório, privado, saiu do ar.

Em 2026-11-21 os documentos foram revistos (PRD, Rodada 16): clientes vêm primeiro, a paleta vai ser refeita em um modo só, a marca atual é o padrão sem ser trava, e Motion, GSAP e rolagem suave ficam liberados. A lista de trabalho está em `docs/ROADMAP.md`.

Onde está cada coisa:

| Pergunta | Documento |
|---|---|
| O quê e por quê, público, escopo, decisões do dono | `docs/PRD.md` |
| Por que cada decisão técnica foi tomada | `docs/adr/` |
| Como cada seção com comportamento funciona | `docs/fdd/<nome>.md` |
| O que vem agora e depois | `docs/ROADMAP.md` |
| Cor, tipografia, forma, movimento, tom de voz | `docs/design/DESIGN.md` |
| Pendências internas, avais de terceiros | `private/` (fora do git) |

## Ambientes

| Ambiente | URL |
|---|---|
| Local | `http://localhost:3000` |
| Preview | URL da Vercel de cada branch e de cada PR |
| Produção (`main`) | https://portelav.vercel.app, também em `portelav-site.vercel.app` |

## Stack

| Camada | Escolha | ADR |
|---|---|---|
| Framework | Next.js 16, React 19, TypeScript 6.0 | 0001 |
| Estilo | Tailwind CSS 4, tokens do `DESIGN.md` | 0001 |
| Movimento | CSS e APIs do navegador hoje. Motion e GSAP liberados, e entram quando uma animação concreta pedir | 0004, 0006 |
| 3D | Three.js, carregado só perto dos aparelhos | 0005 |
| Idiomas | `next-intl`, pt-BR em `/` e inglês em `/en` | 0002 |
| Hospedagem e medição | Vercel e Vercel Web Analytics | 0003 |

Sem banco, sem login e sem formulário. Se algum entrar, rodar `/kickoff` de novo antes, para trazer as peças de segurança e de dados.

Regras que decorrem da stack:

- Next.js 16: ler `node_modules/next/dist/docs/` antes de escrever código. `proxy.ts` no lugar de middleware. `params`, `searchParams`, `cookies()` e `headers()` são assíncronos.
- `AGENTS.md`, gerado pelo Next.js: manter e commitar.
- TypeScript fica na 6.0 enquanto o `typescript-eslint`, usado pelo `eslint-config-next`, não aceitar a 7.
- Todo texto de interface vive nos arquivos de mensagens, em pt-BR e em inglês, na mesma entrega. Nenhum texto fixo em componente.
- Nenhum cookie não essencial. Cookie novo muda o PRD, porque pede consentimento.

## Documentação

- O PRD guarda o estado atual e as decisões do dono, com data. Implementação divergiu: o PRD muda na mesma branch.
- FDD só para seção com comportamento, como preloader, aparelhos 3D, menu e página de caso. Texto e ajuste visual não pedem documento.
- ADR só para dependência nova ou troca de stack, antes do código.
- Documento pronto: commit logo depois que Lucas ler e aprovar.
- Markdown, uma ideia por seção, diagramas em Mermaid no próprio arquivo.

## Fluxo com agentes

Comandos em `.claude/commands/`, skills em `.claude/skills/`.

O fluxo completo vale para entrega grande, como os aparelhos 3D ou a nova direção visual. Ajuste de tela ou de texto dispensa o fluxo: o agente faz, mostra no navegador e Lucas aprova. A regra de branch da seção Git continua valendo.

1. `/plan <pedido>`: cria a branch `tipo/{slug}`, faz a triagem e escreve os Stages 1 a 5 de `tasks/{slug}.md` (template em `.claude/templates/task-template.md`). Para no **Gate S2** até aprovação humana. Não escreve código.
2. `/exec`: implementa na ordem do plano, um commit por item, escreve os Stages 6 a 8.
3. `/walkthrough`: audita e escreve o Stage 9. APPROVED, WARNINGS ou BLOCKED.
4. `/pr`: abre o PR. Lucas faz o merge, ou autoriza no `/pr` depois do CI verde.

| Comando ou skill | Para quê |
|---|---|
| `/feature-flow` | Orquestra refine → plan → exec → walkthrough → pr com gates humanos |
| `/refine` | Reescreve pedido vago e roteia |
| `/commit` | Microcommits atômicos em Conventional Commits |
| `/fix-loop` | Bug: reproduzir primeiro, corrigir até verde, PR com causa raiz |
| `/ui`, `/ui-ux-pro-max` | Componentes com os tokens; checklist de qualidade de interface |
| `/cot`, `/tot` | Raciocínio passo a passo; comparação de alternativas |

Skills de design disponíveis, instaladas no usuário (não no repositório): `taste-skill`, `emil-design-eng`, `animate`, `frontend-design`. Nenhuma é obrigatória: o agente escolhe a que serve em cada tarefa e diz qual usou.

Hooks em `.claude/settings.json`: validação de frontmatter ao abrir a sessão, e lint e typecheck ao fim do turno quando o código mudou.

QA automático no navegador pelo MCP do Chrome DevTools, sem pedir licença, avisando. Depois pedir o teste manual. No fim de cada tarefa, fechar o que o agente abriu: o Chrome do MCP inteiro, os servidores locais e o Docker. Nunca tocar no Chrome pessoal de Lucas.

## Git

- Commits pequenos, uma mudança lógica por commit.
- Conventional Commits: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `style`, `perf`, `ci`. Título em inglês, imperativo, sem ponto final, até 72 caracteres.
- NUNCA adicionar Co-Authored-By, Generated with ou qualquer atribuição ou menção a IA em commits, PRs ou no README. O método de trabalho pode ser contado no site e no README.
- **Base de trabalho:** `main`. Ela não toca no site antigo, que vem de outro repositório.
- **Padrão:** branch `tipo/nome` a partir da base e PR sem squash. O preview da branch é onde Lucas testa.
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
- **Mídia sem metadado.** Foto e vídeo novos entram limpos: GPS, aparelho, autor, conta e id do documento saem. Imagem pelo Aimg (animg.vercel.app), vídeo pelo `ffmpeg -map_metadata -1`, e o agente confere tudo com `exiftool` antes do commit.
  > TODO: testar o Aimg no Chrome (se a imagem sai do computador e se o resultado volta sem metadado) e instalar o `exiftool`. Até lá, imagem só entra conferida de outro jeito.
- **Commit com o e-mail noreply** do GitHub, já configurado neste clone.
- **Direitos:** todos os direitos reservados. Sem licença de uso. Marcas e imagens de clientes e de colegas continuam de quem são.

## Idioma

- Documentação: português do Brasil.
- Código, identificadores, comentários, commits, branches: inglês.
- Interface: português do Brasil e inglês.

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
src/app/[locale]/    layout raiz, inicial, páginas Projetos, Sobre, Serviços e Contato, casos e 404, só composição
src/app/globals.css  tokens do DESIGN.md
src/components/      componentes
src/i18n/            rotas e carga de mensagens de next-intl
src/lib/             fontes, tema, metadados da marca, contato e dados dos projetos e tecnologias
src/proxy.ts         resolve o idioma pela URL
```

## Kit

Organizado pelo `/kickoff` do `claude-kit` em 2026-11-01 (kit 3ac1809) e revisto em 2026-11-21 (mesma versão do kit), com cada regra aprovada por Lucas.

- **Adotado:** `CLAUDE.md`, PRD leve, ADRs, FDDs só para seção com comportamento, `DESIGN.md`, ROADMAP leve, `tasks/{slug}.md` para entrega grande, README, `/plan`, `/exec`, `/walkthrough`, `/pr`, `/commit`, `/feature-flow`, `/refine`, `/fix-loop`, `/cot`, `/tot`, `/ui`, `/ui-ux-pro-max`, subagentes dos comandos adotados, hook de frontmatter, hook de lint e typecheck, CI com `gitleaks`, MCP do Chrome DevTools, regras de repositório público.
- **Fora, e quando entra:** ADD (entra se houver banco, login ou formulário que grava); `security-threat-model` (formulário, login ou upload); `/db-architect`, `/index-generator`, testes de RLS e migração no merge (banco); `/council` (decisão de produto com trade-off real que os documentos não resolvem); `/good-morning` (equipe); bot de revisão de PR (equipe; o GitHub não deixa o autor aprovar o próprio PR); `docs/research/` (pesquisa grande); Docker (serviço local); camada de serviço (regra de negócio).

Rodar `/kickoff` de novo revisa esta lista.

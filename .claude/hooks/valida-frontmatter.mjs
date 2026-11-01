#!/usr/bin/env node
/**
 * Valida o frontmatter de agents, commands e skills do `.claude/`.
 *
 * ─── POR QUE ISTO EXISTE ─────────────────────────────────────────────────────
 * Em 2026-09-03 cinco arquivos estavam com o frontmatter inválido e ninguém sabia.
 * O padrão do defeito é sempre o mesmo: um `: ` (dois-pontos seguido de espaço) dentro
 * do valor de `description:` sem aspas — coisa natural de escrever em português
 * ("Stack: monorepo Laravel 12", "bug de UI/SPA: reproduz no navegador"). Para o YAML
 * aquilo vira um mapa dentro de um mapa compacto, e o bloco inteiro é rejeitado.
 *
 * O estrago é silencioso, e diferente por tipo:
 *   - AGENTE com frontmatter inválido é DESCARTADO. O `backend-laravel` simplesmente
 *     não aparecia na lista de subagentes, e nada avisava.
 *   - COMMAND e SKILL carregam, mas SEM descrição — e é a descrição que faz o disparo
 *     automático funcionar. Na prática só respondiam se chamados pelo nome exato.
 *
 * Nenhuma das duas falhas aparece como erro em lugar nenhum: some da lista, ou some do
 * gatilho. Por isso um validador, e não um comentário pedindo cuidado.
 *
 * ─── O QUE ELE NÃO É ─────────────────────────────────────────────────────────
 * Não é um parser de YAML, de propósito. A primeira versão tentou ser e acusou três
 * arquivos SAUDÁVEIS (mapa aninhado em `metadata:`, bloco `description: >`), o que é
 * pior que não ter validador: ninguém confia num alarme que mente. Aqui a varredura só
 * olha as chaves de primeiro nível e procura o defeito conhecido; qualquer linha
 * indentada — mapa aninhado, corpo de bloco, item de lista — é ignorada.
 *
 * Depender do pacote `yaml` obrigaria a rodar dentro de `frontend/`, e isto precisa
 * funcionar na raiz do repositório, em qualquer worktree, sem `npm install`.
 *
 * ─── COMO RODAR ──────────────────────────────────────────────────────────────
 *   node .claude/hooks/valida-frontmatter.mjs             # silencioso se estiver tudo bem
 *   node .claude/hooks/valida-frontmatter.mjs --verbose   # confirma quantos arquivos passaram
 *
 * Sai com 1 se achar frontmatter quebrado, agente/skill sem `name`, ou qualquer um sem
 * `description`. Command não precisa de `name`: o nome dele é o do arquivo.
 *
 * Os problemas saem no STDERR, e é de propósito: em hook de `SessionStart` o stdout vira
 * contexto da sessão (daí o caminho feliz ser silencioso), enquanto o stderr aparece para
 * quem está na frente do terminal — que é quem precisa ir corrigir o arquivo.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const barras = (p) => p.split('\\').join('/')

/*
 * `readdirSync(dir, { recursive: true })` só existe a partir do Node 20.1. O CI pina 22,
 * mas o hook roda na máquina de quem abre a sessão — e numa versão antiga a opção seria
 * IGNORADA em silêncio: a varredura viraria rasa e o validador diria "todos válidos"
 * tendo lido menos arquivos. Falha silenciosa é justamente o que este arquivo existe para
 * não ter, então é melhor recusar a rodar e dizer por quê.
 */
const [maior, menor] = process.versions.node.split('.').map(Number)
if (maior < 20 || (maior === 20 && menor < 1)) {
  console.error(
    `frontmatter do .claude: precisa de Node >= 20.1 para a varredura recursiva (esta é ${process.versions.node})`,
  )
  process.exit(1)
}

/** varre `.claude/` sob a raiz dada e devolve a lista de problemas (vazia = tudo certo) */
export function validaFrontmatter(raiz) {
  const candidatos = [
    ...varreDiretorio(raiz, 'agents').map((c) => ({ ...c, tipo: 'agente' })),
    ...varreDiretorio(raiz, 'commands').map((c) => ({ ...c, tipo: 'command' })),
    ...varreDiretorio(raiz, 'skills', 'SKILL.md').map((c) => ({ ...c, tipo: 'skill' })),
  ]

  const problemas = []
  // o que a peneira deixou de fora, com o MOTIVO: peneira silenciosa é como o validador
  // some sem ninguém notar, e o motivo errado atrapalha quem for diagnosticar
  const ignorados = []
  let total = 0

  for (const { p, tipo, motivo } of candidatos) {
    const rel = barras(relative(raiz, p))

    if (motivo) {
      ignorados.push(`${rel} (${motivo})`)
      continue
    }

    const m = readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)

    if (!m) {
      /*
       * ⚠️ O DISCRIMINANTE É TER FRONTMATTER, não o nome do arquivo (achado da review do
       * PR #1688, e a proposta é do Caio).
       *
       * As duas versões anteriores tentaram adivinhar pelo nome — primeiro exigindo kebab
       * minúsculo integral, depois olhando a caixa do primeiro token — e cada uma errava
       * de um lado: a primeira silenciava `Backend-Laravel.md` (agente de verdade com typo
       * de caixa), a segunda acusava `Readme.md` de apoio. O que de fato separa os dois
       * grupos é objetivo: definição TEM bloco `---`; documentação não tem.
       *
       * Então: com frontmatter, valida sempre, seja qual for o nome. Sem frontmatter, só é
       * problema se o nome for de definição (kebab minúsculo, que é o nome virando comando)
       * — aí é definição que esqueceu o bloco. O resto vai para `ignorados`.
       */
      if (tipo !== 'skill' && !nomeDeDefinicao(rel)) {
        ignorados.push(`${rel} (sem frontmatter e nome fora do padrão de definição)`)
        continue
      }
      total++
      // agente e skill sem frontmatter não carregam; command carrega com a descrição
      // caindo na primeira linha do corpo, o que é ruim mas não é fatal
      problemas.push(`${rel}: sem frontmatter${tipo === 'command' ? ' (a descrição vira a 1ª linha do corpo)' : ''}`)
      continue
    }

    total++

    const { chaves, defeitos } = varre(m[1])
    const consequencia = tipo === 'agente' ? 'o agente é DESCARTADO' : 'a descrição é perdida'
    for (const d of defeitos) problemas.push(`${rel}: ${d} (${consequencia})`)

    // `.get()`, não `.has()`: o Map guarda "tem conteúdo", e `description:` vazia entra
    // nele como `false`. Com `.has()` o validador dizia "todos válidos" para uma skill sem
    // descrição nenhuma — a mesma perda silenciosa que o resto deste arquivo persegue.
    if (tipo !== 'command' && !chaves.get('name')) problemas.push(`${rel}: "name" ausente ou vazio`)
    if (!chaves.get('description')) {
      problemas.push(`${rel}: "description" ausente ou vazia (é ela que dispara o uso automático)`)
    }
  }

  return { problemas, total, ignorados }
}

/**
 * O defeito de aspas de um valor escalar, ou `null` se ele estiver são.
 *
 * Olhar só o primeiro e o último caractere deixa o defeito passar por dentro:
 *
 *   description: "Use quando disser "manda pra prod": pipeline completo."
 *
 * Começa e termina com aspa dupla, mas o YAML fecha a string no segundo `"` e trava no
 * `: ` seguinte — exatamente o erro que este arquivo existe para pegar. E é o caminho
 * PROVÁVEL: metade das nossas descriptions tem frase de gatilho entre aspas duplas, então
 * quem for envolver um valor tende a usar aspas duplas por fora.
 *
 * Função separada porque é a regra mais densa daqui, e a única que rendeu falso negativo
 * em três revisões seguidas.
 */
export function defeitoDeAspas(valor, continuaAbaixo = false) {
  const aspa = valor[0]

  if (aspa === "'" || aspa === '"') {
    const sabor = aspa === "'" ? 'aspa simples' : 'aspa dupla'
    const fim = fimDoPar(valor)

    if (fim === -1) {
      // não fechou NESTA linha — o que é válido se o escalar continua indentado embaixo
      // (`description: "primeira parte` / `  segunda parte"`), e defeito se não continua
      return continuaAbaixo ? null : `abre ${sabor} e não fecha — feche o par`
    }

    const bruto = valor.slice(fim + 1)
    const resto = bruto.trim()
    if (!resto) return null

    // a mensagem mora num lugar só: ela aparecia nos dois ramos abaixo, e mensagem
    // duplicada é onde as duas cópias divergem sem ninguém perceber
    const aspaSolta = `tem ${sabor} não escapada dentro do valor — ${
      aspa === "'" ? "duplique-a ('')" : 'use aspas simples em volta'
    }`

    // ⚠️ Comentário PRECISA de espaço antes: `'faz coisa'#nota` é erro de verdade
    // ("Comments must be separated from other tokens by white space characters", medido no
    // parser), e a versão anterior olhava só o texto podado — via `#nota`, achava que era
    // comentário e liberava.
    if (!/^\s/.test(bruto)) {
      return resto.startsWith('#') ? 'tem comentário colado no valor — o YAML exige espaço antes do #' : aspaSolta
    }

    // depois do par só pode vir comentário; qualquer outra coisa significa que o par fechou
    // ANTES do fim do texto, ou seja, tem aspa solta no meio do valor
    return resto.startsWith('#') ? null : aspaSolta
  }

  /*
   * Flow (`{...}` / `[...]`) é mapa e lista escritos em UMA linha, e `: ` dentro deles é a
   * sintaxe normal: `metadata: {author: vini, ano: 2026}` é YAML válido. A regra de baixo
   * procura `: ` para achar mapa compacto ACIDENTAL — dentro de flow ela acha o mapa de
   * propósito e acusa arquivo saudável.
   */
  if (aspa === '{' || aspa === '[') return null

  // comentário inline (` #` ou início de linha) não faz parte do valor: `description: faz
  // coisa # nota: só leitura` é YAML válido, e sem tirar o comentário o `: ` dele acusava
  // arquivo saudável
  const semComentario = valor.replace(/(^|\s)#.*$/, '').trim()

  if (/:\s/.test(semComentario)) {
    return 'tem ": " dentro de um valor sem aspas — envolva o valor em aspas simples'
  }
  return null
}

/**
 * Índice da aspa que FECHA o par aberto em `valor[0]`, ou -1 se ele não fecha nesta linha.
 *
 * Substitui o par de regexes `^'...'$` / `^"..."$` que julgava o valor pelas PONTAS. Julgar
 * pelas pontas erra os dois lados: acusa `description: 'faz coisa' # nota` (válido, o
 * comentário fica fora do par) e deixa passar `description: "termina com aspa\"` (a barra
 * come a aspa de fechamento e o YAML estoura). A pergunta certa não é "termina com aspa?",
 * é "onde o par fecha, e o que sobra depois" — e essa só o scanner responde.
 *
 * Cada sabor escapa do seu jeito: dupla com barra invertida, simples duplicando.
 */
function fimDoPar(valor) {
  const aspa = valor[0]
  for (let i = 1; i < valor.length; i++) {
    if (aspa === '"' && valor[i] === '\\') {
      i++ // a barra escapa o PRÓXIMO caractere, seja ele qual for
      continue
    }
    if (valor[i] !== aspa) continue
    if (aspa === "'" && valor[i + 1] === "'") {
      i++ // '' é escape, não fechamento
      continue
    }
    return i
  }
  return -1
}

/** o conteúdo de um escalar, sem o par de aspas que o envolve (se houver) */
function semAspas(valor) {
  /*
   * Valor SEM aspas: o comentário não é conteúdo. `description: # TODO escrever` é YAML
   * válido com valor NULL — a skill carrega sem descrição e nunca dispara, que é o defeito
   * original deste arquivo. Passava porque a limpeza de comentário foi ensinada ao
   * `defeitoDeAspas` e não à medida de conteúdo: a quarta porta do mesmo "marcar em vez de
   * medir" (`.has()` → regex → `|| fechaAbaixo` → esta).
   */
  if (valor[0] !== "'" && valor[0] !== '"') return valor.replace(/(^|\s)#.*$/, '').trim()
  // pelo mesmo scanner do `defeitoDeAspas`: com o regex antigo, `description: '' # nota`
  // não casava o par, o valor inteiro passava como conteúdo e a descrição vazia voltava a
  // escapar — o achado que já tinha sido fechado, reaberto por outra porta
  const fim = fimDoPar(valor)
  return fim === -1 ? valor.slice(1).trim() : valor.slice(1, fim).trim()
}

/**
 * Chaves de primeiro nível do frontmatter, e o defeito conhecido.
 * @returns {{chaves: Map<string, boolean>, defeitos: string[]}} valor `true` = tem conteúdo
 */
function varre(bloco) {
  // `bloco` é o conteúdo DEPOIS do `---` de abertura, então linhas[0] é a linha 2 do
  // arquivo: as mensagens somam 2, não 1. O valor deste hook é alguém abrir o arquivo na
  // linha apontada — apontar uma acima manda a pessoa olhar a chave errada.
  const chaves = new Map()
  const defeitos = []
  const linhas = bloco.split(/\r?\n/)
  let ultimaChaveDeBloco = null

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i]
    if (!linha.trim()) continue

    // indentado = pertence à chave anterior (mapa aninhado, corpo de bloco, lista)
    if (/^\s/.test(linha)) {
      if (ultimaChaveDeBloco) chaves.set(ultimaChaveDeBloco, true)
      continue
    }
    if (linha.trimStart().startsWith('#')) continue

    /*
     * Item de sequência EM COLUNA ZERO é YAML válido e comum:
     *
     *   triggers:
     *   - /tot
     *   - "tree of thought"
     *
     * A lista pertence à chave anterior mesmo sem indentação (é como o `tot-explorer`
     * escreveria os gatilhos). Sem esta guarda o validador cospe uma linha de "não é uma
     * chave de primeiro nível" POR ITEM, num arquivo perfeitamente saudável — e acusar
     * arquivo bom é o motivo pelo qual a primeira versão deste validador foi reescrita.
     */
    if (/^-(\s|$)/.test(linha)) {
      if (ultimaChaveDeBloco) chaves.set(ultimaChaveDeBloco, true)
      continue
    }

    const m = linha.match(/^([A-Za-z0-9_-]+):(?:\s+(.*))?$/)
    if (!m) {
      defeitos.push(`linha ${i + 2}: não é uma chave de primeiro nível — ${linha.slice(0, 60)}`)
      continue
    }

    const [, chave, bruto] = m
    const valor = (bruto ?? '').trim()
    ultimaChaveDeBloco = null

    // `chave:` sozinha abre mapa aninhado ou bloco (`|`, `>`, `>-`, `|-`)
    if (!valor || /^[|>][-+]?$/.test(valor)) {
      chaves.set(chave, false)
      ultimaChaveDeBloco = chave
      continue
    }

    /*
     * Um escalar entre aspas pode atravessar linhas: a continuação vem INDENTADA, e o laço
     * a ignora (certo) — mas então a linha de abertura não pode ser julgada sozinha.
     *
     * Não basta EXISTIR continuação: o par precisa FECHAR nela. Só olhar "tem linha
     * indentada embaixo" perdoava `description: "quebrada de verdade` seguido de
     * `  continua sem fechar nunca` — YAML que estoura, liberado porque havia continuação.
     */
    const continuacao = []
    for (let j = i + 1; j < linhas.length && /^\s+\S/.test(linhas[j]); j++) continuacao.push(linhas[j].trim())
    const fechaAbaixo = continuacao.length > 0 && fimDoPar([valor, ...continuacao].join(' ')) !== -1

    const defeito = defeitoDeAspas(valor, fechaAbaixo)
    if (defeito) defeitos.push(`linha ${i + 2}: "${chave}" ${defeito}`)

    // `description: ''` e `description: ""` são valor PRESENTE e conteúdo VAZIO. Marcar
    // como conteúdo faria a skill passar sem descrição nenhuma — o mesmo buraco do
    // `.has()` que já foi corrigido aqui, entrando por outra porta.
    //
    // Num escalar multilinha o texto pode estar todo na continuação (`description: "` +
    // `  texto aqui"`), então o conteúdo é medido no valor INTEIRO. A versão anterior
    // resolvia isso com `|| fechaAbaixo`, que marcava "tem conteúdo" sem medir conteúdo —
    // e `description: ''` com uma linha indentada embaixo voltava a passar. Era a terceira
    // porta do mesmo defeito (`.has()`, depois o regex do `semAspas`, depois esta): medir
    // de verdade fecha a classe em vez de tapar mais um buraco.
    chaves.set(chave, semAspas(fechaAbaixo ? [valor, ...continuacao].join(' ') : valor).length > 0)
  }

  return { chaves, defeitos }
}

/**
 * Nome que o Claude Code carregaria como definição: kebab-case minúsculo, porque o nome do
 * arquivo VIRA o nome do agente/command. Só decide o caso sem frontmatter — quem tem bloco
 * `---` é validado independentemente do nome.
 */
function nomeDeDefinicao(caminho) {
  // `\.` escapado: sem a barra o ponto casaria qualquer caractere. Aqui era inofensivo (o
  // filtro de cima já garante o sufixo `.md`), mas regex adivinhando num arquivo cujo tema
  // é medir em vez de adivinhar não passa.
  const nome = caminho.split('/').pop().replace(/\.md$/i, '')
  return /^[a-z0-9][a-z0-9._-]*$/.test(nome)
}

/**
 * Todos os `.md` de um diretório, já com o motivo de quem não deve ser validado.
 *
 * Uma varredura só: a versão anterior chamava `readdirSync` recursivo duas vezes por
 * diretório — uma para os alvos, outra para a lista do `--verbose` — e a segunda rodava
 * mesmo no caminho mudo do `SessionStart`, que é justamente o que se fez questão de manter
 * barato.
 *
 * `recursive` para os dois formatos: command com namespace mora em subpasta
 * (`commands/deploy/full.md`) e skill agrupada também (`skills/ns/x/SKILL.md`).
 */
function varreDiretorio(raiz, pasta, aninhado) {
  const dir = join(raiz, '.claude', pasta)
  if (!existsSync(dir)) return []

  return readdirSync(dir, { recursive: true })
    .map((f) => barras(typeof f === 'string' ? f : String(f)))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const p = join(dir, f)
      // material de apoio da própria skill/agente (o `obsidian-note` tem examples/)
      if (f.toLowerCase().includes('examples/')) return { p, motivo: 'dentro de examples/' }
      // em skills o alvo é o nome fixo; TEMPLATE.md e afins não são definição
      if (aninhado && !(f.endsWith(`/${aninhado}`) || f === aninhado)) {
        return { p, motivo: `não é ${aninhado}` }
      }
      return { p }
    })
}

/*
 * O bloco de CLI só roda quando ESTE arquivo é o entrypoint.
 *
 * Sem a guarda ele executava no import — e quem importa é o próprio teste: num repo com
 * `.claude` quebrado, `node valida-frontmatter.test.mjs` saía 1 pelo `process.exit` daqui
 * e NENHUM caso chegava a rodar. Não dava falso verde, mas apagava o resultado da suíte
 * exatamente quando alguém está iterando no validador, que é quando ela mais serve.
 */
// `process.argv[1]` é undefined quando o módulo é carregado por `node --input-type=module
// -e` (que é como se exercita uma função exportada daqui em uma linha) — sem a checagem,
// o `pathToFileURL` lança e o import morre antes de qualquer uso.
const entrypoint = process.argv[1] ? pathToFileURL(process.argv[1]).href : null

if (import.meta.url === entrypoint) {
  const { problemas, total: alvos, ignorados } = validaFrontmatter(RAIZ)

  if (problemas.length) {
    console.error(`frontmatter do .claude: ${problemas.length} problema(s) em ${alvos} arquivos\n`)
    for (const p of problemas) console.error('  ✗ ' + p)
    process.exit(1)
  }

  // SILÊNCIO no caminho feliz: em hook de `SessionStart` o stdout entra como contexto
  // adicional da sessão, então uma linha de "nada errado" seria token gasto toda vez, para
  // sempre. Quem rodar à mão e quiser confirmação usa `--verbose`.
  if (process.argv.includes('--verbose')) {
    console.log(`frontmatter do .claude: ${alvos} arquivos, todos válidos`)
    // a peneira também aparece: se ela engolir um arquivo que era definição de verdade, o
    // sintoma é ausência, e ausência só é visível se alguém a imprimir
    if (ignorados.length) {
      // rótulo neutro, motivo em cada linha: "por parecerem documentação" valia só para
      // parte deles, e motivo errado atrapalha justamente quem usa esta lista para
      // descobrir que a peneira comeu algo indevido
      console.log(`\nignorados, não são definição (${ignorados.length}):`)
      for (const i of ignorados) console.log('  · ' + i)
    }
  }
}

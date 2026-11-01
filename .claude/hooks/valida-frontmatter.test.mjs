#!/usr/bin/env node
/**
 * Teste do validador de frontmatter. Roda com `node .claude/hooks/valida-frontmatter.test.mjs`.
 *
 * ─── POR QUE EXISTE ──────────────────────────────────────────────────────────
 * O validador é o único código executável deste PR, e a primeira versão dele tinha DOIS
 * falsos negativos da mesma classe que ele existe para pegar (achados 1 e 2 da review do
 * PR #1687): valor entre aspas duplas com aspa dupla solta dentro passava como válido, e
 * `description:` vazia também. Um guarda que mente é pior que guarda nenhum — então ele
 * ganha os casos que provam que continua pegando.
 *
 * ─── SEM RUNNER, DE PROPÓSITO ────────────────────────────────────────────────
 * O vitest vive em `frontend/` e exige `npm install`; este script precisa rodar na raiz,
 * em qualquer worktree e no CI, sem dependência — a mesma razão de o validador não usar o
 * pacote `yaml`. São ~20 linhas de harness para não arrastar um runner inteiro.
 *
 * Os fixtures são escritos num diretório temporário e apagados no fim; nada toca o
 * `.claude/` de verdade.
 */
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { validaFrontmatter } from './valida-frontmatter.mjs'

const casos = [
  {
    nome: 'frontmatter íntegro passa',
    arquivos: { 'agents/ok.md': ['name: ok', "description: 'faz coisa'"] },
    esperado: [],
  },
  {
    nome: '⚠️ `: ` em valor sem aspas é o defeito original',
    arquivos: { 'agents/dois-pontos.md': ['name: x', 'description: Stack: monorepo Laravel'] },
    esperado: ['dois-pontos.md: linha 3: "description" tem ": "'],
  },
  {
    nome: '⚠️ aspa DUPLA solta dentro de aspas duplas (falso negativo da 1ª versão)',
    arquivos: { 'agents/duplas.md': ['name: x', 'description: "diga "manda pra prod": e pronto"'] },
    esperado: ['duplas.md: linha 3: "description" tem aspa dupla não escapada'],
  },
  {
    nome: '⚠️ aspa SIMPLES solta dentro de aspas simples',
    arquivos: { 'agents/simples.md': ['name: x', "description: 'o 'gatilho' certo'"] },
    esperado: ['simples.md: linha 3: "description" tem aspa simples não escapada'],
  },
  {
    nome: 'aspa simples ESCAPADA (duplicada) é válida',
    arquivos: { 'agents/escapada.md': ['name: x', "description: 'o ''gatilho'' certo'"] },
    esperado: [],
  },
  {
    nome: '⚠️ description vazia (falso negativo da 1ª versão)',
    arquivos: { 'skills/vazia/SKILL.md': ['name: vazia', 'description:'] },
    esperado: ['SKILL.md: "description" ausente ou vazia'],
  },
  {
    nome: '⚠️ name vazio em agente é o caso fatal',
    arquivos: { 'agents/sem-nome.md': ['name:', "description: 'tem descrição'"] },
    esperado: ['sem-nome.md: "name" ausente ou vazio'],
  },
  {
    nome: 'mapa aninhado e bloco `>` são válidos (não acusar arquivo saudável)',
    arquivos: {
      'skills/bloco/SKILL.md': ['name: bloco', 'description: >', '  primeira linha', '  segunda linha', 'metadata:', '  author: laravel'],
    },
    esperado: [],
  },
  {
    nome: 'agente sem frontmatter é reportado',
    arquivos: { 'agents/pelado.md': null },
    esperado: ['pelado.md: sem frontmatter'],
  },
  {
    nome: 'command não precisa de `name` (o nome é o do arquivo)',
    arquivos: { 'commands/sem-nome.md': ["description: 'faz coisa'"] },
    esperado: [],
  },
  {
    nome: '⚠️ command em subpasta (namespace) também é varrido',
    arquivos: { 'commands/deploy/full.md': ["description: Stack: quebrada"] },
    esperado: ['full.md: linha 2: "description" tem ": "'],
  },

  /*
   * Os três abaixo saíram da quarta passada de review: foram achados por um bot, e o Caio
   * reproduziu cada um em fixture antes de aceitar. Nenhum atingia arquivo existente — os
   * três exigem uma segunda condição improvável — mas todos eram falso negativo de
   * verdade, e falso negativo é a única falha que este arquivo não pode ter.
   */
  {
    nome: '⚠️ skill em subpasta também é varrida (era rasa)',
    arquivos: { 'skills/ns/agrupada/SKILL.md': ['name: agrupada', 'description: Stack: quebrada'] },
    esperado: ['SKILL.md: linha 3: "description" tem ": "'],
  },
  {
    nome: '⚠️ aspas abertas e não fechadas',
    arquivos: { 'agents/aberta.md': ['name: x', 'description: "Use ao rodar migration'] },
    esperado: ['aberta.md: linha 3: "description" abre aspa dupla e não fecha'],
  },
  {
    nome: '⚠️ barra invertida escapa a BARRA, e a aspa fecha a string',
    // `"a\\" b"`: o `\\` é uma barra escapada, então o `"` seguinte encerra o valor e o
    // resto vira lixo — o lookbehind de um caractere lia isto como aspa escapada
    arquivos: { 'agents/barra.md': ['name: x', 'description: "a\\\\" b"'] },
    esperado: ['barra.md: linha 3: "description" tem aspa dupla não escapada'],
  },
  {
    nome: 'aspa dupla REALMENTE escapada é válida',
    arquivos: { 'agents/escapada-dupla.md': ['name: x', 'description: "diga \\"oi\\" pra ele"'] },
    esperado: [],
  },

  /* Da quinta passada. O segundo é falso POSITIVO — a falha que fez a primeira versão
     deste validador ser reescrita, e que o docblock dele promete não cometer. */
  {
    nome: '⚠️ valor entre aspas VAZIO não conta como conteúdo',
    arquivos: { 'skills/vazia-aspas/SKILL.md': ['name: vazia', "description: ''"] },
    esperado: ['SKILL.md: "description" ausente ou vazia'],
  },
  {
    nome: '⚠️ name entre aspas vazio em agente é o caso fatal',
    arquivos: { 'agents/nome-vazio.md': ['name: ""', "description: 'tem descrição'"] },
    esperado: ['nome-vazio.md: "name" ausente ou vazio'],
  },
  {
    nome: '⚠️ sequência em coluna zero é YAML válido (não acusar arquivo bom)',
    arquivos: {
      'skills/lista/SKILL.md': ['name: lista', "description: 'faz coisa'", 'triggers:', '- /tot', '- "tree of thought"'],
    },
    esperado: [],
  },
  {
    nome: 'defeito ao lado de uma sequência continua sendo apontado',
    arquivos: {
      'skills/lista-ruim/SKILL.md': ['name: ruim', 'description: Stack: quebrada', 'triggers:', '- /x'],
    },
    esperado: ['SKILL.md: linha 3: "description" tem ": "'],
  },

  /*
   * Da sexta passada. Os três primeiros são arquivo SAUDÁVEL: a regra de aspas julgava o
   * valor pelas pontas e acusava YAML válido — de novo a falha que o docblock promete não
   * cometer. Confirmei os três contra o parser de verdade antes de escrever o caso.
   */
  {
    nome: '⚠️ comentário depois do par é válido',
    arquivos: { 'agents/comentario.md': ['name: x', "description: 'faz coisa' # nota pra quem editar"] },
    esperado: [],
  },
  {
    nome: '⚠️ escalar entre aspas em mais de uma linha é válido',
    arquivos: { 'agents/multilinha.md': ['name: x', 'description: "primeira parte', '  segunda parte"'] },
    esperado: [],
  },
  {
    nome: '⚠️ aspas vazias com comentário continuam sendo vazias',
    arquivos: { 'skills/vazia-nota/SKILL.md': ['name: vazia', "description: '' # ainda escrevo"] },
    esperado: ['SKILL.md: "description" ausente ou vazia'],
  },
  {
    nome: '⚠️ barra invertida engolindo a aspa de fechamento',
    // `"termina com aspa\"`: a barra escapa a ASPA, o par nunca fecha e o YAML estoura
    arquivos: { 'agents/barra-final.md': ['name: x', 'description: "termina com aspa\\"'] },
    esperado: ['barra-final.md: linha 3: "description" abre aspa dupla e não fecha'],
  },
  {
    nome: 'README e TEMPLATE em agents/commands não são definição',
    arquivos: {
      'commands/README.md': null,
      'agents/TEMPLATE.md': null,
      'commands/valido.md': ["description: 'faz coisa'"],
    },
    esperado: [],
  },

  /* Da oitava passada. Três de arquivo saudável, um de defeito que escapava. */
  {
    nome: '⚠️ flow mapping em coluna zero é YAML válido',
    arquivos: {
      'agents/flow.md': ['name: flow', "description: 'faz coisa'", 'metadata: {author: vini, ano: 2026}', 'hooks: [{tipo: a}]'],
    },
    esperado: [],
  },
  {
    nome: '⚠️ aspa que não fecha NEM na continuação',
    arquivos: {
      'agents/nunca-fecha.md': ['name: x', 'description: "quebrada de verdade', '  continua sem fechar nunca'],
    },
    esperado: ['nunca-fecha.md: linha 3: "description" abre aspa dupla e não fecha'],
  },
  {
    nome: '⚠️ multilinha com o texto todo na continuação tem descrição',
    arquivos: { 'agents/so-continuacao.md': ['name: x', 'description: "', '  texto todo aqui embaixo"'] },
    esperado: [],
  },
  {
    nome: '⚠️ doc de apoio com qualquer nome em caixa alta é ignorado',
    arquivos: {
      'agents/NOTAS.md': null,
      'commands/ns/CHANGELOG.md': null,
      'agents/agente-real.md': ['name: real', "description: 'faz coisa'"],
    },
    esperado: [],
  },

  /* Da nona passada. Os três eram borda das regras que as passadas anteriores criaram. */
  {
    nome: '⚠️ aspas vazias com linha indentada embaixo continuam vazias',
    arquivos: { 'skills/vazia-linha/SKILL.md': ['name: vazia', "description: ''", '  linha indentada qualquer'] },
    esperado: ['SKILL.md: "description" ausente ou vazia'],
  },
  {
    nome: '⚠️ comentário inline com ": " é YAML válido',
    arquivos: { 'agents/comentario-dp.md': ['name: x', 'description: faz coisa # nota: só leitura'] },
    esperado: [],
  },
  {
    nome: 'defeito ANTES do comentário continua sendo apontado',
    arquivos: { 'agents/defeito-e-nota.md': ['name: x', 'description: Stack: monorepo # nota'] },
    esperado: ['defeito-e-nota.md: linha 3: "description" tem ": "'],
  },
  /*
   * ⚠️ A GUARDA DO FALSO POSITIVO DA PENEIRA, e ela já saiu da suíte uma vez.
   *
   * `Readme.md` e `Notas.md` de apoio não têm frontmatter e não podem ser acusados: o hook
   * sai 1 no primeiro problema, então seria erro em TODA sessão até alguém renomear o
   * arquivo. Numa versão anterior deste PR o caso do `Notas.md` foi trocado por outro
   * quando a regra mudou, e nada ocupou o lugar dele — foi assim que a regressão passou.
   */
  {
    nome: '⚠️ doc de apoio sem frontmatter não é acusado, qualquer que seja o nome',
    arquivos: {
      'agents/README-old.md': null,
      'agents/NOTAS_2.md': null,
      'agents/Readme.md': null,
      'agents/Notas.md': null,
      'agents/agente-valido.md': ['name: valido', "description: 'faz coisa'"],
    },
    esperado: [],
  },
  {
    // o contraponto: nome DE definição sem frontmatter continua sendo problema, senão a
    // peneira nova viraria porta para o defeito original entrar
    nome: 'definição em kebab sem frontmatter continua sendo apontada',
    arquivos: { 'agents/agente-sem-fm.md': null },
    esperado: ['agente-sem-fm.md: sem frontmatter'],
  },

  /*
   * Da décima passada, e estes REVISAM a regra da nona.
   *
   * Exigir o nome inteiro em ASCII minúsculo fechava o `README-old`, mas silenciava
   * `Backend-Laravel.md` (typo de caixa num agente de verdade), `revisão.md` (acento é nome
   * legítimo num repo em pt-BR) e `_interno.md` — os três saíam como `alvos=0`. Entre
   * acusar arquivo bom e calar sobre arquivo quebrado, calar é pior: ninguém investiga o
   * que não apareceu. A marca de documentação passou a ser o PRIMEIRO token em caixa alta.
   */
  {
    nome: '⚠️ nome fora do kebab minúsculo ainda é varrido',
    arquivos: {
      'agents/Backend-Laravel.md': ['name: X', 'description: Stack: quebrada'],
      'agents/_interno.md': ['name: y', 'description: Stack: quebrada'],
    },
    esperado: [
      'Backend-Laravel.md: linha 3: "description" tem ": "',
      '_interno.md: linha 3: "description" tem ": "',
    ],
  },
  {
    nome: '⚠️ nome com acento é varrido (repo em pt-BR)',
    arquivos: { 'agents/revisão.md': ['name: z', 'description: Stack: quebrada'] },
    esperado: ['revisão.md: linha 3: "description" tem ": "'],
  },
  {
    // `description: # TODO escrever` é YAML válido com valor null: carrega sem descrição e
    // nunca dispara. A limpeza de comentário tinha sido ensinada só ao `defeitoDeAspas`.
    nome: '⚠️ comentário no lugar do valor é descrição vazia',
    arquivos: { 'skills/todo/SKILL.md': ['name: todo', 'description: # TODO escrever'] },
    esperado: ['SKILL.md: "description" ausente ou vazia'],
  },
  {
    // o parser é explícito: "Comments must be separated from other tokens by white space"
    nome: '⚠️ cerquilha colada no valor quebra o YAML',
    arquivos: { 'agents/colada.md': ['name: x', "description: 'faz coisa'#nota"] },
    esperado: ['colada.md: linha 3: "description" tem comentário colado'],
  },
  {
    nome: 'cerquilha com espaço antes continua válida',
    arquivos: { 'agents/espacada.md': ['name: x', "description: 'faz coisa' #nota"] },
    esperado: [],
  },
  {
    nome: '⚠️ a peneira aparece: o que foi ignorado, e por quê',
    arquivos: {
      'agents/README.md': null,
      'agents/examples/nota.md': null,
      'skills/x/SKILL.md': ['name: x', "description: 'faz coisa'"],
      'skills/x/TEMPLATE.md': null,
      'agents/agente-ok.md': ['name: ok', "description: 'faz coisa'"],
    },
    esperado: [],
    total: 2,
    ignorados: [
      'agents/README.md (sem frontmatter e nome fora do padrão de definição)',
      'agents/examples/nota.md (dentro de examples/)',
      'skills/x/TEMPLATE.md (não é SKILL.md)',
    ],
  },
]

function monta(raiz, arquivos) {
  for (const [caminho, linhas] of Object.entries(arquivos)) {
    const destino = join(raiz, '.claude', caminho)
    mkdirSync(join(destino, '..'), { recursive: true })
    const corpo = linhas === null ? '# sem frontmatter\n' : `---\n${linhas.join('\n')}\n---\n\ncorpo\n`
    writeFileSync(destino, corpo)
  }
}

let falhas = 0
for (const caso of casos) {
  const raiz = mkdtempSync(join(tmpdir(), 'valida-fm-'))
  try {
    monta(raiz, caso.arquivos)
    const { problemas, total, ignorados } = validaFrontmatter(raiz)

    /*
     * `ignorados` e `total` são conferidos quando o caso declara — é a rede que sustenta a
     * peneira, e ela não tinha teste nenhum. Se a lista regredir (alguém devolver `[]`, ou
     * o formato do caminho mudar), o sintoma é AUSÊNCIA de saída, que é o modo de falha
     * que este arquivo inteiro persegue.
     */
    if (caso.ignorados) {
      const faltamIgnorados = caso.ignorados.filter((i) => !ignorados.some((x) => x.includes(i)))
      const sobramIgnorados = ignorados.filter((x) => !caso.ignorados.some((i) => x.includes(i)))
      for (const f of faltamIgnorados) problemas.push(`[ignorados] esperava conter: ${f}`)
      for (const s of sobramIgnorados) problemas.push(`[ignorados] não esperava: ${s}`)
    }
    if (caso.total !== undefined && total !== caso.total) {
      problemas.push(`[total] esperava ${caso.total} arquivo(s) validado(s), veio ${total}`)
    }

    const faltando = caso.esperado.filter((e) => !problemas.some((p) => p.includes(e)))
    // `sobrando` vale para TODO caso, não só para os de expectativa vazia: um caso que
    // espera um problema também não pode ganhar um segundo de brinde. Sem isto, um
    // defeito novo no validador (acusar arquivo saudável, duplicar mensagem) passaria
    // despercebido em 10 dos 11 casos — e acusar arquivo bom foi exatamente o erro da
    // primeira versão deste validador.
    const sobrando = problemas.filter((p) => !caso.esperado.some((e) => p.includes(e)))

    if (faltando.length || sobrando.length) {
      falhas++
      console.error(`✗ ${caso.nome}`)
      for (const f of faltando) console.error(`    esperava conter: ${f}`)
      for (const s of sobrando) console.error(`    não esperava:    ${s}`)
      if (faltando.length && problemas.length) console.error(`    obtido:          ${problemas.join(' | ')}`)
    } else {
      console.log(`✓ ${caso.nome}`)
    }
  } finally {
    rmSync(raiz, { recursive: true, force: true })
  }
}

if (falhas) {
  console.error(`\n${falhas} de ${casos.length} casos falharam`)
  process.exit(1)
}
console.log(`\n${casos.length} casos, todos passaram`)

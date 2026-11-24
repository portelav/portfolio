# PRD: portfolio

Documento vivo. O quê e por quê. Decisão de produto nova entra no registro da seção 11, com data, e depois no corpo. As decisões D1 a D91 estão em `docs/decisoes-ate-2026-11.md`. Valem as que a Rodada 16 não troca.

## 1. Visão

Site pessoal de Lucas Portela, estudante de Ciência da Computação em Maceió. Quem chega olha o trabalho, gosta muito e chama para um orçamento. O próprio site também é trabalho: é uma amostra do que Lucas entrega.

## 2. Público

Dois públicos, com clientes primeiro (D92):

- **Quem quer contratar um site:** dono de negócio ou profissional, sem olhar técnico, quase sempre no celular. Quer ver um site bom no ar e um jeito fácil de chamar.
- **Quem avalia estudante para estágio:** recrutador ou dev, com pouco tempo. Quer ver projeto real, a parte que a pessoa fez de fato e o currículo.

Posicionamento: quem entrega site no ar, com prova concreta e sem aumentar nada. Não se apresenta como sênior (D93).

## 3. Objetivo e medida

| Objetivo | Como medir | Meta |
|---|---|---|
| Trazer pedidos de orçamento | Conversas de quem quer um site, vindas pelo WhatsApp ou pelo e-mail do site, contadas à mão | Acompanhar, sem meta numérica |
| Ser visto | Visitas e origem no Vercel Web Analytics | Acompanhar, sem meta numérica |
| Entender quem é em pouco tempo | Teste com pessoas no celular | Recomendação: em 1 minuto, a pessoa diz quem é Lucas, cita um projeto e acha o contato |

## 4. Estrutura

Em teste (D103): uma landing para clientes, uma página para recrutadores e uma página para cada caso.

| Endereço | Para quem | O que tem |
|---|---|---|
| `/` e `/en` | Clientes | Abertura, os casos nos aparelhos 3D, como funciona e orçamento, contato |
| `/sobre` e `/en/about` | Recrutadores, pelo link do currículo e do LinkedIn | Quem é Lucas, como trabalha, tecnologias, currículo em PDF, link para os casos |
| Página de cada caso | Os dois | Landing da Dra. Thaiane, DraftCS, Crewz e o método |

> TODO: ordem e texto das seções da landing e do `/sobre`, menu e rodapé. Decididos com Lucas na nova direção. Se a estrutura não funcionar no teste, ela volta a ser decidida.

## 5. Escopo

"Na `main`" quer dizer publicado em `portelav-site.vercel.app`, ainda fora do endereço público e do índice dos buscadores.

| Item | Estado | FDD |
|---|---|---|
| Base técnica: Next.js, idiomas, tokens, ícones e CI | feito | não precisa |
| Cabeçalho, rodapé e 404 | na `main`; menu e rodapé revistos com a estrutura | `docs/fdd/cabecalho-rodape.md` |
| Abertura e preloader | na `main`; texto reescrito no tom novo | `docs/fdd/abertura.md` |
| Aparelhos 3D | na `main`; faltam ajustes | `docs/fdd/aparelhos-3d.md` |
| Páginas de caso: landing, DraftCS e Crewz | na `main`; textos reescritos no tom novo | `docs/fdd/caso.md` |
| Caso do método | a fazer (D104) | `docs/fdd/caso.md` |
| Landing e `/sobre` na estrutura nova | a fazer | a revisar |
| Paleta nova, em um modo só | a fazer (D96) | não precisa |

> TODO: quais ajustes faltam nos aparelhos 3D. Lucas lista.

Casos em destaque, nesta ordem (D3, D40):

| Caso | Tipo | Código | Link |
|---|---|---|---|
| Landing da Dra. Thaiane Lessa | Site de cliente, no ar (D105) | Repositório público | https://www.drathaianelessa.com.br |
| DraftCS | Jogo web, feito em dupla com o Vinicius | Repositório privado | https://draftcs.com |
| Crewz | Rede social, feita em dupla com o Vinicius | Repositório privado | https://crewz-ashy.vercel.app |

### Conteúdo pendente

| O quê | Quem manda | Para qual item |
|---|---|---|
| Currículo em PDF, nos dois idiomas | Lucas | `/sobre` |
| Revisão do inglês | Lucas | Todas |
| Preço em Serviços: sem preço, "a partir de" ou faixa (D107) | Lucas | Landing |
| Trajetória no Sobre e retrato (D108) | Lucas | `/sobre` |

## 6. Fora de escopo

- Formulário de contato: traz servidor, anti-spam e dados de terceiros, para ganho pequeno (D10). Se entrar, o `/kickoff` roda de novo antes.
- Banco, login e painel de edição: o conteúdo mora no repositório.
- Domínio próprio no lançamento: entra depois, sem retrabalho (D7).
- Google Analytics e qualquer cookie não essencial: pediriam banner de consentimento (D14).

## 7. Requisitos não funcionais

- **Telas:** celular, em 390 px, e computador, em 1440 px, desenhados juntos, cada um com o layout que serve àquela tela. Nenhuma entrega é aprovada sem os dois vistos no navegador (D109).
- **Desempenho, como recomendação:** LCP abaixo de 2,5 s no 4G. A página inicial tem exceção aceita por causa do preloader (D60 e D63). Sem deslocamento de layout na animação do nome (D101).
- **Acessibilidade, como meta:** WCAG 2.2 AA, sem checagem formal a cada entrega (D101).
- **SEO e compartilhamento:** título, descrição e prévia de link nos dois idiomas, com `hreflang` entre eles, na landing, no `/sobre` e em cada caso.

## 8. Regras de fora

Consulta em 2026-11-01. Esta tabela é leitura de produto, não parecer jurídico.

| Regra | Efeito no produto | Fonte |
|---|---|---|
| LGPD, transparência sobre tratamento de dados (art. 9º) | Nota curta de privacidade, em pt-BR e inglês: o que é medido, para quê, e que a Vercel processa (D57) | Lei 13.709/2018; [resumo do guia da ANPD](https://www.mattosfilho.com.br/?p=89899) |
| Cookie que identifica usuário é dado pessoal, e cookie não essencial pede consentimento com opção fácil de recusar | Nenhum cookie não essencial. Se um entrar, o site passa a precisar de banner | [Guia da ANPD, resumo](https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/direito-digital/anpd-divulga-novo-guia-com-orientacoes-sobre-cookies) |
| Web Analytics identifica visitante por hash da requisição, sem cookie, com sessão descartada em 24 horas | Sem banner por causa da medição. URLs não carregam dado pessoal | [Vercel](https://vercel.com/docs/analytics/privacy-policy) |
| Regras de publicidade odontológica do CFO valem para o caso da Dra. Thaiane | No caso, sem paciente identificável, sem antes e depois, sem promessa de resultado. Nome e CRO como na landing (D68) | `docs/PRD.md` do repositório `landing-drathaiane` |

Graus de certeza:

- A busca não encontrou posição da ANPD sobre analytics sem cookie. "Sem banner" é leitura do kickoff.
- A exceção da LGPD para uso particular e não econômico (art. 4º, I) não é usada aqui, porque o site também busca trabalho pago. Leitura do kickoff, sem fonte que confirme.

## 9. Riscos e premissas

| Risco ou premissa | Impacto | O que fazer |
|---|---|---|
| Inflar a própria participação em projeto feito em dupla | Perde credibilidade com quem avalia | Cada caso diz se foi sozinho ou em dupla, e com quem, sem arredondar para cima (D106) |
| Caso publicado sem autorização | Problema para cliente ou colega | Caso só vai ao ar com autorização de quem aparece ou divide a autoria, registrada em `private/` |
| Print da landing com paciente ou dado sensível | Problema profissional para a Dra. Thaiane | Paciente nunca aparece. Imagem de pessoa só com autorização |
| Recrutador ler o site como de freelancer, não de quem quer estágio | Perde a vaga | `/sobre` como porta própria, no link do currículo e do LinkedIn (D103) |
| Texto em dois idiomas sair de sincronia | Parte do site fica sem tradução | Toda entrega traz as duas línguas. Falta de mensagem quebra o build |
| Número de WhatsApp e e-mail públicos | Spam | Aceito pelo dono. Cada um mora em um arquivo só, para trocar ou tirar fácil |
| Site pela metade substituir o atual | Má impressão | Repositório e projeto próprios na Vercel. O endereço público só muda no lançamento (D21) |
| Preloader de cerca de 3,8 s em toda carga afastar quem tem pressa | Parte dos visitantes pode sair antes de ver o trabalho | Decisão mantida pelo dono (D46, D60 e Rodada 16) |

## 10. Critérios de pronto do lançamento

Exigidos (D102):

- [ ] Autorização registrada, em `private/`, para cada caso publicado.
- [ ] `lint`, `typecheck`, `build` e `gitleaks` verdes no CI.

Recomendados:

- Teste de 1 minuto no celular com pelo menos três pessoas de fora do projeto.
- LCP e WCAG da seção 7 conferidos com Lighthouse e à mão, em 390 px e 1440 px.
- Nota de privacidade no ar e nenhum cookie não essencial, conferido no navegador.
- Nenhum `> TODO` nos documentos que afete o que está no ar.

## 11. Registro de decisões

Cada rodada é uma conversa com o dono. Decisões numeradas para o agente citar. As rodadas 1 a 15 estão em `docs/decisoes-ate-2026-11.md`.

### Rodada 16 (2026-11-21 e 2026-11-22): revisão das regras

Lucas revisou com o agente as regras do CLAUDE.md, do PRD e do `DESIGN.md`, e as decisões D1 a D91, uma por uma. O estado anterior está guardado na tag `before-kickoff-review`.

- **D92.** Clientes vêm primeiro, e quem avalia estudante para estágio vem depois. Substitui D1.
- **D93.** Posicionamento: quem entrega site no ar, com prova concreta e sem aumentar nada. Não se apresenta como sênior. Substitui D2.
- **D94.** A medida principal são os pedidos de orçamento, contados à mão. Visitas e o teste de 1 minuto ficam de apoio. Ajusta D19.
- **D95.** A marca atual é o padrão, sem ser trava: muda quando Lucas pedir. Substitui D18.
- **D96.** O site passa a ter um modo de cor só, e sai o seletor de tema. A paleta é refeita, e o destaque pode deixar de ser âmbar. O logo é decidido vendo as paletas no site, cada uma com o logo em âmbar e com o logo na cor nova. Substitui D25 e D31.
- **D97.** Tom de voz: primeira pessoa, confiante, com fato ou número datado em cada afirmação, a parte de Lucas dita com clareza e uma decisão difícil ou um erro contado sem esconder. O curso aparece só no `/sobre`. As palavras genéricas de agência continuam vetadas; "full stack" e "soluções" continuam liberadas (D59).
- **D98.** A lista "O que não fazer" do `DESIGN.md` vira recomendação: o agente avisa quando um pedido bater nela, mas ela não barra o pedido.
- **D99.** Forma (raio, sombra, borda) fica em aberto até a nova direção. Tipografia, fontes e tamanhos ficam liberados.
- **D100.** Motion e GSAP ficam liberados. A biblioteca entra quando uma animação concreta pedir, com ADR. Rolagem suave fica liberada. Desfoque e `mix-blend-mode` em movimento continuam liberados (D84), com a medição de fluidez como recomendação. Ajusta D56, D58 e D84.
- **D101.** WCAG 2.2 AA continua como meta, sem checagem formal a cada entrega. A meta de LCP vira recomendação, e a exceção da página inicial continua (D63).
- **D102.** O lançamento exige só a autorização registrada de cada caso e o CI verde. Os outros critérios viram recomendação.
- **D103.** Estrutura em teste: uma landing para clientes em `/`, uma página `/sobre` para recrutadores, com o link do currículo e do LinkedIn levando a ela, e uma página para cada caso. Serviços e Contato viram seções da landing. Menu (D70, D80, D87) e rodapé (D32) são revistos com ela. Ajusta D78 e D79.
- **D104.** O método AI-Driven Development vira um caso próprio, ao lado dos três projetos. Ajusta D77.
- **D105.** A Dra. Thaiane aparece como cliente de Lucas, com o aval dela registrado em `private/` em 2026-11-22. Substitui D22.
- **D106.** Os textos da abertura e dos casos são reescritos no tom novo, frase por frase com Lucas. Cada caso continua dizendo a parte de Lucas, sem arredondar. O período do curso não aparece em lugar nenhum do site (D36). Ajusta D28, D48, D49, D50, D62 e D77.
- **D107.** Preço em Serviços fica em aberto, decidido quando a seção for escrita: sem preço, "a partir de" ou faixa. Ajusta D53.
- **D108.** A trajetória no `/sobre` e o retrato (D55, D72) são decididos quando o texto novo for escrito. Até lá, vale a D61. Tecnologias (D52) fica, e o lugar dela sai da estrutura nova.
- **D109.** Celular, em 390 px, e computador, em 1440 px, são desenhados juntos, e nenhuma entrega é aprovada sem os dois vistos no navegador.
- **D110.** O nome em 3D e o fundo em shader podem voltar a ser testados. Ajusta D85.
- **D111.** Os ícones de contato do cabeçalho ficam, e as cores deles são revistas com a paleta (D74, D75). A borda dos prints (D43) e a densidade das telas (D56) são revistas na nova direção.
- **D112.** O fluxo completo de agentes vale só para entrega grande, e os documentos ficam leves, conforme o `CLAUDE.md`. Ajusta D13.

Confirmadas sem mudança: D3, D5, D7, D8, D9, D10, D11, D12, D14, D16, D17 (4º período, passando ao 5º em 2027), D20, D21, D24, D26, D27, D36, D38, D40, D41, D44, D46, D47, D51, D54, D57, D59, D60, D63, D64, D65, D66, D67, D68, D69, D71, D73, D76, D81, D82, D83, D86, D88, D89, D90 e D91.

### Rodada 17 (2026-11-24): direção visual

- **D113.** A lista "O que evitar" do `DESIGN.md` fica com três avisos: degradê roxo, travessão no texto da interface, e barra de habilidade ou número sem fato. Ajusta D98.
- **D114.** A paleta é escolhida junto com fonte e forma, em direções completas testadas no site real. Ajusta D96 e D99.

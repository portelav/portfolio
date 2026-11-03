# PRD: portfolio

Documento vivo. O quê e por quê. Decisão de produto nova entra no registro da seção 12, com data, e depois no corpo.

## 1. Visão

Site pessoal de Lucas Portela, estudante de Ciência da Computação na Afya UNIMA, em Maceió. Quem chega entende rápido quem é Lucas, vê projetos reais e sabe como entrar em contato.

## 3. Público

Dois públicos com o mesmo peso (D1):

- **Quem avalia estudante para estágio:** recrutador ou dev, muitas vezes no celular e com pouco tempo. Quer ver projeto real, organização e o que a pessoa fez de fato. Desconfia de quem se apresenta como sênior sem ser.
- **Quem quer contratar um site:** dono de negócio ou profissional, sem olhar técnico. Quer ver um site bom no ar e um jeito fácil de chamar.

## 5. Objetivos e métricas

| Objetivo | Como medir | Meta |
|---|---|---|
| Entender quem é em pouco tempo | Teste com pessoas no celular | Em 1 minuto, a pessoa diz quem é Lucas, cita um projeto e acha o contato |
| Trazer conversa | Contatos recebidos pelo site, contados à mão | Acompanhar, sem meta numérica por enquanto |
| Ser visto | Visitas e origem no Vercel Web Analytics | Acompanhar, sem meta numérica por enquanto |

## 6. Escopo

Seções na ordem da página (D45). Detalhe no FDD de cada uma. "Protótipo" quer dizer que já roda na branch `proto/trabalho-primeiro`, mas ainda sem plano e auditoria.

| Item | Objetivo | FDD | Estado |
|---|---|---|---|
| Base técnica | Next.js, idiomas, tokens, ícones e CI prontos na `main` | não precisa, é só infraestrutura | feito |
| Cabeçalho e rodapé | Seletores de idioma e tema, nome depois do preloader, rodapé e página 404 | `docs/fdd/cabecalho-rodape.md` | protótipo |
| Abertura | Reescrever o nome no preloader e dizer quem é, o que faz e o que procura | `docs/fdd/abertura.md` | protótipo |
| Projetos | Mostrar os três casos em destaque, com a parte de Lucas em cada um | `docs/fdd/projetos.md` | protótipo |
| Sobre | Contar a trajetória de forma curta | `docs/fdd/sobre.md` | protótipo |
| Tecnologias | Listar linguagens e tecnologias que Lucas usa | `docs/fdd/tecnologias.md` | protótipo |
| Quer um site? | Dizer a quem quer contratar um site o que recebe e como funciona | `docs/fdd/quer-um-site.md` | protótipo |
| Contato | Levar a WhatsApp, e-mail, LinkedIn e GitHub | `docs/fdd/contato.md` | protótipo |
| Nota de privacidade | Dizer o que é medido e por quem, nos dois idiomas | no FDD de contato | falta |

Casos em destaque (D3):

| Caso | Tipo | Código | Link |
|---|---|---|---|
| Landing da Dra. Thaiane Lessa | Projeto real, no ar | Repositório público | https://www.drathaianelessa.com.br |
| DraftCS | Jogo web, feito em dupla | Repositório privado | https://draftcs.com |
| Crewz | Rede social, feita em dupla | Repositório privado | https://crewz-ashy.vercel.app |

### Conteúdo pendente

| O quê | Quem manda | Para qual item |
|---|---|---|
| Currículo em PDF, nos dois idiomas | Lucas | Abertura |
| Revisão do inglês | Lucas | Todas |

## 7. Fora de escopo

- Formulário de contato: traz servidor, anti-spam e mais obrigações de dados, para ganho pequeno (D10).
- Banco, login e painel de edição: o conteúdo mora no repositório.
- Domínio próprio na primeira versão: entra depois, sem retrabalho (D7).
- Google Analytics e qualquer cookie não essencial: pediriam banner de consentimento (D14).
- Redesenho da marca: a identidade já está pronta (D18).

## 8. Requisitos não funcionais

Valores propostos no kickoff, a ajustar se a medição real pedir.

- Desempenho: LCP abaixo de 2,5 s no 4G, sem deslocamento de layout na animação do nome.
- Acessibilidade: WCAG 2.2 AA.
- Dispositivos: celular primeiro, 390 px, e computador logo depois.
- SEO e compartilhamento: metadados e prévia de link nos dois idiomas, `hreflang` entre eles.

## Regras de fora

Consulta em 2026-11-01. Esta tabela é leitura de produto, não parecer jurídico.

| Regra | Efeito no produto | Fonte |
|---|---|---|
| LGPD, transparência sobre tratamento de dados (art. 9º) | Nota curta de privacidade, em pt-BR e inglês: o que é medido, para quê, e que a Vercel processa | Lei 13.709/2018; [resumo do guia da ANPD](https://www.mattosfilho.com.br/?p=89899) |
| Cookie que identifica usuário é dado pessoal, e cookie não essencial pede consentimento com opção fácil de recusar | Nenhum cookie não essencial. Se um entrar, o site passa a precisar de banner | [Guia da ANPD, resumo](https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/direito-digital/anpd-divulga-novo-guia-com-orientacoes-sobre-cookies) |
| Web Analytics identifica visitante por hash da requisição, sem cookie, com sessão descartada em 24 horas | Sem banner por causa da medição. URLs não carregam dado pessoal | [Vercel](https://vercel.com/docs/analytics/privacy-policy) |
| Regras de publicidade odontológica do CFO valem para o caso da Dra. Thaiane | No caso, sem paciente identificável, sem antes e depois, sem promessa de resultado. Nome e CRO como na landing | `docs/PRD.md` do repositório `landing-drathaiane` |

Graus de certeza:

- A busca não encontrou posição da ANPD sobre analytics sem cookie. "Sem banner" é leitura do kickoff.
- A exceção da LGPD para uso particular e não econômico (art. 4º, I) não é usada aqui, porque o site também busca trabalho pago. Leitura do kickoff, sem fonte que confirme.

## 9. Riscos e premissas

| Risco ou premissa | Impacto | O que fazer |
|---|---|---|
| Inflar a própria participação em projeto feito em dupla | Perde credibilidade com quem avalia | Cada caso diz se foi sozinho ou em dupla, e com quem, sem arredondar para cima. O detalhe fica para a conversa (D39) |
| Caso publicado sem autorização | Problema para cliente ou colega | Caso só vai ao ar com autorização de quem aparece ou divide a autoria |
| Print da landing com paciente ou dado sensível | Problema profissional para a Dra. Thaiane | Paciente nunca aparece. Imagem de pessoa só com autorização |
| Site com cara de template | Contradiz a marca e a proposta | Seguir "O que não fazer" do `DESIGN.md` |
| Texto em dois idiomas sair de sincronia | Parte do site fica sem tradução | Toda entrega traz as duas línguas. Falta de mensagem quebra o build |
| Número de WhatsApp e e-mail públicos | Spam | Aceito pelo dono. Cada um mora em um arquivo só, para trocar ou tirar fácil |
| Site pela metade substituir o atual | Má impressão | Repositório e projeto próprios na Vercel. O endereço público só muda no lançamento (D21) |
| Preloader de cerca de 3,8 s em toda carga afastar quem tem pressa | Parte dos visitantes pode sair antes de ver o trabalho | Decisão mantida pelo dono (D46). Observar no teste de 1 minuto e medir o LCP antes do lançamento |

## 10. Critérios de pronto

- [ ] Todas as seções da tabela implementadas em pt-BR e inglês, com FDD `implementado`.
- [ ] Teste de 1 minuto no celular feito com pelo menos três pessoas de fora do projeto.
- [ ] Autorização registrada, em `private/`, para cada caso publicado.
- [ ] LCP e WCAG da seção 8 conferidos com Lighthouse e à mão, em 390 px e no computador.
- [ ] Nota de privacidade no ar e nenhum cookie não essencial, conferido no navegador.
- [ ] Nenhum `> TODO` nos documentos que afete o que está no ar.
- [ ] `lint`, `typecheck`, `build` e `gitleaks` verdes no CI.

## 12. Registro de decisões

Cada rodada é uma conversa com o dono. Decisões numeradas (D1, D2...) para o agente citar.

### Rodada 1 (2026-11-01): kickoff

- **D1.** Objetivo: estágio e trabalhos de freela, com o mesmo peso.
- **D2.** Posicionamento: estudante promissor e organizado, que constrói projetos reais. Não se apresenta como sênior.
- **D3.** Casos em destaque: landing da Dra. Thaiane, DraftCS e Crewz.
- **D4.** Substituída por D20. Mesmo repositório `portelav/portfolio`. A versão antiga fica guardada na tag `v1-academic`.
- **D5.** Sem data fixa de lançamento.
- **D6.** Ajustada por D58. Stack: Next.js 16, Tailwind e Motion (ADR 0001).
- **D7.** Endereço: `portelav.vercel.app`. Domínio próprio depois.
- **D8.** Português e inglês desde o início (ADR 0002).
- **D9.** Contato por e-mail, LinkedIn, GitHub e botão de WhatsApp. O número próprio fica público, por escolha do dono.
- **D10.** Sem formulário de contato.
- **D11.** Branch e PR por padrão, sem obrigação para ajustes pequenos.
- **D12.** Nenhuma atribuição de IA, em qualquer aspecto.
- **D13.** Fluxo completo de agentes.
- **D14.** Medição com Vercel Web Analytics (ADR 0003).
- **D15.** Substituída por D21. Reconstrução na branch `v2`. Ela só entra na `main` no lançamento.
- **D16.** Ajustada por D27. O cursor do nome pisca e, depois de 5 s, para aceso. Volta a piscar ao passar o mouse ou focar. Atende à WCAG 2.2.2.
- **D17.** Curso: Ciência da Computação, Afya UNIMA, 4º período, passando ao 5º em 2027.
- **D18.** A identidade visual é a do kit de marca e não se redesenha neste projeto (`docs/design/DESIGN.md`).
- **D19.** Medida de sucesso: o teste de 1 minuto da seção 5, proposto no kickoff.

### Rodada 2 (2026-11-02): repositório

- **D20.** Repositório novo `portelav/portfolio`, sem o histórico da versão antiga, que era acadêmica. A versão antiga fica em um repositório privado à parte. Substitui D4.
- **D21.** Sem branch `v2`. A `main` do repositório novo é a reconstrução, em projeto próprio na Vercel. `portelav.vercel.app` passa para esse projeto no lançamento. Substitui D15.

### Rodada 3 (2026-11-02): revisão do PRD e do FDD da abertura

- **D22.** A landing da Dra. Thaiane aparece como projeto real, sem ser chamada de cliente.
- **D23.** A troca do Direito pela computação pode aparecer no site. É o motivo da Reescrita.
- **D24.** O e-mail de contato no site é o Gmail do próprio Lucas, por escolha do dono. Mora em um arquivo só.
- **D25.** O site tem modo escuro e claro, com seletor. O modo padrão fecha na base técnica.
- **D26.** Cabeçalho, rodapé e página 404 entram no escopo, com FDD próprio.
- **D27.** O foco só faz o cursor voltar a piscar onde o nome é link. Na abertura, o nome não recebe foco. Ajusta D16.
- **D28.** Na abertura, a frase de apresentação começa com "Lucas Portela", e há duas chamadas, para Projetos e para Contato.
- **D29.** Substituída por D46. Tempo fechado na D38. A Reescrita roda só na primeira carga da sessão, com teto provisório de 3 s. Lucas fecha o tempo vendo o protótipo no navegador. Não repete ao recarregar nem ao trocar de idioma ou de tema.
- **D30.** Substituída por D47. Na primeira dobra, o cabeçalho mostra só os seletores. O nome entra nele depois que a abertura sai da tela.

### Rodada 4 (2026-11-02): base técnica

- **D31.** O modo padrão é o escuro, e o texto corrido usa Red Hat Text. Fecha o modo padrão deixado em aberto na D25.

### Rodada 5 (2026-11-02): cabeçalho e rodapé

- **D32.** O rodapé tem só "Todos os direitos reservados" e o link da nota de privacidade. Os contatos ficam na seção Contato.
- **D33.** Ajustada por D47. O cabeçalho não tem menu. Depois que a abertura sai da tela, mostra o nome e os seletores.

### Rodada 6 (2026-11-02): abertura

- **D34.** A troca do Direito pela computação é contada no Sobre. A abertura tem só a frase curta de apresentação.
- **D35.** Substituída por D49. As chamadas da abertura são "Ver projetos" e "Falar comigo".
- **D36.** A frase de apresentação não cita o período do curso, para não envelhecer.
- **D37.** Substituída por D48. A frase de apresentação é "Me chamo Lucas Portela e estudo Ciência da Computação. Atualmente estou aprendendo a desenvolver com IA." Fala de como Lucas aprende, por escolha do dono, e não é atribuição de autoria. Ajusta o início previsto na D28.
- **D38.** Lucas aprovou no preview o tempo de 2,6 s da Reescrita e o layout da primeira dobra.

### Rodada 7 (2026-11-02): projetos

- **D39.** Substituída por D50. Os casos têm texto curto: a landing diz que foi feita sozinho, do desenho ao código, pensada primeiro para o celular. DraftCS e Crewz dizem só que foram feitos em dupla com o Vinicius.
- **D40.** Ordem dos casos: landing, DraftCS e Crewz.
- **D41.** O nome do Vinicius aparece nos casos, com link para o GitHub dele.
- **D42.** Ajustada por D45. O site é uma página única com rolagem: abertura, projetos, sobre e contato.
- **D43.** Os prints dos projetos têm borda fina de 1 px, para não se confundirem com o fundo.

### Rodada 8 (2026-11-03): direção "trabalho na primeira tela"

Depois de comparar o rascunho com uma amostra de portfólios de outros devs, o dono escolheu esta direção. A marca não muda (D18). Mudam a ordem, o texto e a densidade.

- **D44.** O trabalho aparece na primeira tela: quem é, o que faz, o que procura, as chamadas e o começo do primeiro caso, com o texto dele ao lado.
- **D45.** Ordem da página: abertura, projetos, sobre, tecnologias, "Quer um site?" e contato. Ajusta D42.
- **D46.** O preloader fica: a Reescrita roda em tela limpa em toda carga de `/` e `/en` sem âncora, e o nome voa até o cabeçalho, somando cerca de 3,8 s. A rolagem fica presa nesse tempo. Os tempos da Reescrita continuam os da D38. Substitui D29.
- **D47.** O nome fica no cabeçalho desde o fim do preloader. O cabeçalho sai ao rolar para baixo e volta ao rolar para cima. Substitui D30 e ajusta D33.
- **D48.** A frase de apresentação é "Me chamo Lucas Portela e já fiz alguns sites que estão no ar.", seguida de "Estudo Ciência da Computação em Maceió. Procuro estágio em desenvolvimento e faço sites para quem precisa de um." O aprendizado com IA passa para o Sobre, com o mesmo sentido da D37. Substitui D37.
- **D49.** As chamadas da abertura são "Quero um site" e "Falar sobre estágio", uma para cada público (D1). Substitui D35.
- **D50.** Cada caso diz a parte de Lucas no trabalho. Em dupla, com o nome do Vinicius ao lado (D41). Lucas confirmou o texto de cada caso. Substitui D39.
- **D51.** Cada caso tem um vídeo do próprio site sobre o print, um tocando por vez e com pausa. Celular e computador têm print e vídeo próprios. Quem aparece autorizou.
- **D52.** Tecnologias entra como seção própria, depois do Sobre, com os logos nas cores originais. O veto a ícones coloridos sai do `DESIGN.md`.
- **D53.** O bloco "Quer um site?" tem oferta, quatro passos e um botão para o WhatsApp com mensagem pronta. Sem preço por enquanto. Os passos são compromisso de Lucas com quem contrata.
- **D54.** Contato lista WhatsApp, e-mail, LinkedIn e GitHub, nessa ordem. Número e e-mail moram em um arquivo só. Ajusta a ordem da D9.
- **D55.** O Sobre conta a saída do Direito em uma frase, com um retrato ilustrado em tamanho contido. Sem efeito preso à rolagem. Mantém D34.
- **D56.** O site troca "muito espaço, poucos elementos por tela" por mais conteúdo em cada tela: quem chega sem contexto precisa entender o que Lucas faz. Sem biblioteca de rolagem suave.
- **D57.** A nota de privacidade é um bloco curto no fim da própria página, com o link do rodapé levando até ele. Mantém a página única (D42), sem rota nova.
- **D58.** Motion sai das dependências, porque nenhum componente o usa. O movimento fica em CSS e nas APIs do navegador (ADR 0004). Ajusta D6.
- **D59.** "Full stack" e "soluções" deixam de ser palavras vetadas, por decisão do dono.

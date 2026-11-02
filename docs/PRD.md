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

Seções previstas. Ordem e detalhe fecham no FDD de cada uma.

| Item | Objetivo | FDD | Estado |
|---|---|---|---|
| Base técnica | Next.js, idiomas, tokens, ícones e CI prontos na `main` | não precisa, é só infraestrutura | feito |
| Cabeçalho e rodapé | Seletores de idioma e tema, nome depois da abertura, rodapé e página 404 | `docs/fdd/cabecalho-rodape.md` | feito |
| Abertura | Apresentar o nome com a animação Reescrita e dizer quem é | `docs/fdd/abertura.md` | falta |
| Projetos | Mostrar os três casos em destaque, com o que Lucas fez em cada um | `docs/fdd/projetos.md` | falta |
| Sobre | Contar a trajetória de forma curta | `docs/fdd/sobre.md` | falta |
| Contato | Levar a e-mail, LinkedIn, GitHub e WhatsApp | `docs/fdd/contato.md` | falta |
| Nota de privacidade | Dizer o que é medido e por quem, nos dois idiomas | no FDD de contato | falta |

Casos em destaque (D3):

| Caso | Tipo | Código | Link |
|---|---|---|---|
| Landing da Dra. Thaiane Lessa | Projeto real, no ar | Repositório público | https://www.drathaianelessa.com.br |
| DraftCS | Jogo web, feito em dupla | Repositório privado | https://draftcs.com |
| Crewz | Rede social, feita em dupla | Repositório privado | > TODO: confirmar o link público |

### Conteúdo pendente

| O quê | Quem manda | Para qual item |
|---|---|---|
| Frase de apresentação, em pt-BR e inglês | Lucas | Abertura |
| O que Lucas fez em cada caso, com imagens | Lucas | Projetos |
| Texto do Sobre | Lucas | Sobre |
| Foto, se houver | Lucas | Sobre |
| Links finais de contato | Lucas | Contato |
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
| Inflar a própria participação em projeto feito em dupla | Perde credibilidade com quem avalia | Cada caso diz o que Lucas fez, sem arredondar para cima |
| Caso publicado sem autorização | Problema para cliente ou colega | Caso só vai ao ar com autorização de quem aparece ou divide a autoria |
| Print da landing com paciente ou dado sensível | Problema profissional para a Dra. Thaiane | Paciente nunca aparece. Imagem de pessoa só com autorização |
| Site com cara de template | Contradiz a marca e a proposta | Seguir "O que não fazer" do `DESIGN.md` |
| Texto em dois idiomas sair de sincronia | Parte do site fica sem tradução | Toda entrega traz as duas línguas. Falta de mensagem quebra o build |
| Número de WhatsApp e e-mail públicos | Spam | Aceito pelo dono. Cada um mora em um arquivo só, para trocar ou tirar fácil |
| Site pela metade substituir o atual | Má impressão | Repositório e projeto próprios na Vercel. O endereço público só muda no lançamento (D21) |

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
- **D6.** Stack: Next.js 16, Tailwind e Motion (ADR 0001).
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
- **D29.** A Reescrita roda só na primeira carga da sessão, com teto provisório de 3 s. Lucas fecha o tempo vendo o protótipo no navegador. Não repete ao recarregar nem ao trocar de idioma ou de tema.
- **D30.** Na primeira dobra, o cabeçalho mostra só os seletores. O nome entra nele depois que a abertura sai da tela.

### Rodada 4 (2026-11-02): base técnica

- **D31.** O modo padrão é o escuro, e o texto corrido usa Red Hat Text. Fecha o modo padrão deixado em aberto na D25.

### Rodada 5 (2026-11-02): cabeçalho e rodapé

- **D32.** O rodapé tem só "Todos os direitos reservados" e o link da nota de privacidade. Os contatos ficam na seção Contato.
- **D33.** O cabeçalho não tem menu. Depois que a abertura sai da tela, mostra o nome e os seletores.

### Rodada 6 (2026-11-02): abertura

- **D34.** A troca do Direito pela computação é contada no Sobre. A abertura tem só a frase curta de apresentação.
- **D35.** As chamadas da abertura são "Ver projetos" e "Falar comigo".
- **D36.** A frase de apresentação não cita o período do curso, para não envelhecer.
- **D37.** A frase de apresentação é "Me chamo Lucas Portela e estudo Ciência da Computação. Atualmente estou aprendendo a desenvolver com IA." Fala de como Lucas aprende, por escolha do dono, e não é atribuição de autoria. Ajusta o início previsto na D28.

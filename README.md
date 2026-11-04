# portfolio

Site pessoal de Lucas Portela, estudante de Ciência da Computação em Maceió.

**Estado:** em reconstrução do zero, com as seções em protótipo, ainda sem lançamento. Até lá, https://portelav.vercel.app continua mostrando a versão antiga, que não vem deste repositório.

## O que vem aí

- Abertura com o nome reescrito da letra de livro para a letra de código.
- Projetos reais logo na primeira tela, com vídeo e com o que fiz em cada um.
- Um caminho direto para quem quer contratar um site e outro para quem avalia estágio.
- Português e inglês, modo escuro e claro, celular primeiro.

## Stack da versão nova

- [Next.js 16](https://nextjs.org) e React 19, publicado na Vercel
- Tailwind CSS 4
- [next-intl](https://next-intl.dev)

Por que cada uma: [`docs/adr/`](docs/adr/).

## Rodar no local

```bash
npm ci
npm run dev
```

Abre em `http://localhost:3000`. Antes de um PR: `npm run lint`, `npm run typecheck` e `npm run build`.

## Documentação

| O quê | Onde |
|---|---|
| Produto, público, escopo, regras e decisões | [`docs/PRD.md`](docs/PRD.md) |
| Design system: marca, paleta, tipografia, movimento, tom de voz | [`docs/design/DESIGN.md`](docs/design/DESIGN.md) |
| Especificação de cada seção | [`docs/fdd/`](docs/fdd/) |
| Decisões técnicas | [`docs/adr/`](docs/adr/) |
| O que vem agora | [`docs/ROADMAP.md`](docs/ROADMAP.md) |

## Licença

Todos os direitos reservados. O código está aberto para leitura, sem licença de uso, cópia ou redistribuição. Marcas e imagens de clientes e de colegas continuam de quem são.

# Lucas Portela | Portfolio

Portfolio pessoal moderno criado para uma atividade da faculdade, com foco em apresentacao profissional, responsividade, animacoes suaves e organizacao de projetos.

## Tecnologias

- React
- TypeScript
- Vite
- CSS moderno
- Framer Motion

## Funcionalidades

- Hero com avatar estilizado, links sociais e chamada principal
- Secao sobre mim com texto profissional
- Habilidades com cards e barras de progresso
- Projetos com mockups visuais, tecnologias e chamada para repositorio
- Contato com email, GitHub, localizacao e formulario visual
- Navbar fixa, scroll suave, reveal on scroll e microinteracoes
- Layout responsivo para desktop, notebook, tablet e celular
- Suporte a `prefers-reduced-motion`

## Como Rodar Localmente

```bash
npm install
npm run dev
```

Depois, acesse o endereco mostrado no terminal.

## Build de Producao

```bash
npm run build
```

Os arquivos finais ficam na pasta `dist/`.

## Deploy

### Vercel

1. Envie o projeto para o GitHub.
2. Importe o repositorio na Vercel.
3. Use as configuracoes padrao do Vite:
   - Build command: `npm run build`
   - Output directory: `dist`

### GitHub Pages

1. Rode `npm run build`.
2. Publique a pasta `dist/` usando GitHub Pages ou uma action de deploy.

## Links

- Email: `lucasportelav@gmail.com`
- GitHub: `https://github.com/portelav/`
- LinkedIn: `adicione-quando-tiver`
- Site publicado: `adicione-o-link-aqui`

## Edicao Rapida

Os principais textos e links ficam em `src/content.ts`.

Para trocar cores, espacamentos e estilos visuais, edite `src/styles.css`.

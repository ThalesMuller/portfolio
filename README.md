# Portfólio de Thales Eduardo Müller

Site profissional em português brasileiro e currículo A4. O React gera o HTML no build do Vite. O mesmo perfil em TypeScript alimenta o website, o PDF e os metadados.

## Desenvolvimento

Use Node.js 24 e o npm.

```sh
npm ci
npm run dev
```

O Vite mostra a URL local. O botão de currículo funciona no servidor de desenvolvimento e na publicação estática.

```sh
npx playwright install chromium
npm run check
npm run preview
```

`check` reúne TypeScript, ESLint, Prettier, testes Vitest com cobertura, build e testes Playwright com axe. Use `npm run format` para formatar. O build grava `dist/`, incluindo o PDF. Use `npm run resume` para gerar apenas o currículo em `dist/thales-muller-curriculo.pdf`.

## Atualizações

Edite [o perfil canônico](src/content/profile.ts) e consulte o [guia de conteúdo](docs/content.md) para registrar as fontes ou importar um currículo. A skill `$portfolio-maintainer` adapta o fluxo a pedidos em linguagem natural.

Use um branch de trabalho `codex/<descrição>`. Depois das verificações, envie o branch e abra um PR para `master` quando esse for o destino disponível e autorizado. O GitHub indica `main` como branch padrão e a auditoria não encontrou `master`. Confirme o destino antes de abrir o PR. A revisão e o merge são humanos.

## Netlify

1. Conecte o repositório existente pelo painel da Netlify. O [netlify.toml](netlify.toml) define o build e o diretório publicado.
2. Em **Project configuration → Build & deploy → Continuous deployment → Branches and deploy contexts**, confira o branch de produção aprovado. O brief indica `master` e o GitHub aponta para `main`. Resolva a divergência com o mantenedor antes de alterar a configuração.
3. Na mesma seção, habilite Deploy Previews para pull requests e confira o link entregue no check da Netlify. Habilite a proteção do branch acordado no GitHub e torne obrigatório o check **Portfolio quality**.
4. Use `SITE_URL` para fixar a origem HTTPS pública quando necessário. A Netlify fornece `URL` nos builds conectados. Para simular os metadados localmente, copie `.env.example` para `.env.local`.

Consulte as [decisões de arquitetura](docs/architecture.md) e o [registro da implementação](docs/gauntlet.md).

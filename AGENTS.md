# Portfólio e currículo

- `src/content/profile.ts` é a fonte canônica do site, PDF e SEO. O schema e as funções de formatação ficam em `src/content/`. Registre fontes em [docs/content.md](docs/content.md).
- Escreva conteúdo público em pt-BR. Confirme mudanças profissionais com o titular, LinkedIn público ou documento fornecido. Use o histórico do Git para fatos históricos e mantenha datas desconhecidas em aberto. Prefira responsabilidade e contexto verificáveis.
- O Vite renderiza os componentes React em HTML estático. Mantenha a navegação sem JavaScript, HTML semântico e tokens em `src/styles/site.css`. Preserve foco, contraste e reflow em telas pequenas.
- O build chama o PDFKit a partir dos mesmos dados. Mantenha A4, texto selecionável, leitura em coluna única e links. Revise a renderização e a extração quando alterar conteúdo ou layout.
- Rode `npm run check` antes de publicar. Revise em browser as alterações visuais e valide a geração de PDF. Use revisores independentes, quando disponíveis, para riscos de conteúdo, design, código ou acessibilidade. Registre falhas materiais e revalide as correções.
- Trabalhe em `codex/<descrição>`, preserve mudanças locais e envie apenas o branch de trabalho. O destino solicitado é `master`. Se não existir ou divergir da configuração, informe a situação e confirme o destino com o mantenedor. Deixe o PR e o Deploy Preview para revisão humana. O merge na produção é humano.
- A skill [portfolio-maintainer](.agents/skills/portfolio-maintainer/SKILL.md) descreve o fluxo de atualização e entrega.

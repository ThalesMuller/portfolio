---
name: portfolio-maintainer
description: Atualiza o portfólio e o currículo do Thales, incluindo resumo, experiências, certificações, competências, projetos, contatos, layout e PDF. Use para mudanças neste repositório e para reconciliar o perfil com LinkedIn ou currículo fornecido.
---

# Manutenção do portfólio

1. Leia `AGENTS.md`, `docs/content.md` e o estado atual do Git. Identifique a alteração e prepare um branch `codex/<descrição>` sem mover mudanças locais alheias.
2. Para fatos profissionais, priorize confirmação do titular, LinkedIn público e currículo fornecido. Se o LinkedIn bloquear a consulta, use a fonte disponível e explicite o que ficou pendente. Extraia um PDF fornecido localmente e compare com as páginas antes de alterar o perfil. Registre a fonte da afirmação em `docs/content.md` e use sua chave no perfil.
3. Edite `src/content/profile.ts` para mudanças no conteúdo. Altere os componentes, tokens ou PDFKit para mudanças de apresentação. Preserve a geração do PDF e do HTML a partir do mesmo perfil.
4. Passe a mudança por revisão proporcional ao risco. Use revisores independentes quando disponíveis. Peça leitura do conteúdo e do PDF para mudanças de currículo e inspeção de screenshots reais para mudanças visuais. Corrija defeitos materiais e execute `npm run check`.
5. Entregue o branch com commit. Quando o fluxo de entrega estiver autorizado, confira o remoto, envie o branch e abra um PR para `master`. Se o destino não existir ou divergir do branch de produção, reporte a divergência e confirme o destino com o titular antes de abrir o PR. Use a ferramenta de PR do provedor configurado.
6. Informe o commit, resultados verificados, URL do PR e URL do Deploy Preview quando disponível. Deixe o merge e a publicação de produção para o mantenedor.

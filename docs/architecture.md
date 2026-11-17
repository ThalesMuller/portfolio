# Decisões de arquitetura

## React no build

O portfólio original usava React 17, Create React App 4, styled-components e um roteador. A rota de experiências estava vazia. O Vite preserva React e TypeScript e renderiza o documento completo por meio de `react-dom/server`. Os anchors, o foco e o download são nativos do navegador. Qualquer interação React futura pode introduzir uma entrada de cliente específica. O HTML de `renderToStaticMarkup` é adequado às páginas estáticas atuais.

O plugin de build integra as entradas estáticas de português e inglês, suas páginas 404, os currículos e os arquivos de busca. Uma tabela gera os redirects da hospedagem e atende o preview local. Os redirecionamentos mantêm os caminhos legados com uma seção real como destino.

As páginas `/` e `/en/` são completas e navegáveis sem JavaScript. Um módulo pequeno de cliente detecta a preferência do navegador na entrada pela raiz, lembra a escolha manual e mantém a seção na troca de idioma. A escolha explícita na URL prevalece sobre a preferência salva e a do navegador. O português é o fallback. O módulo não carrega React no navegador.

## Dados e PDF

Um perfil tipado e validado com Zod é importado pelos componentes, metadados e PDFKit. A marca editorial e as fontes das afirmações vivem em camadas distintas. Os textos editoriais têm versões `pt-BR` e `en` no mesmo perfil canônico; os fatos comuns são registrados uma vez. Cada versão é resolvida e validada antes de gerar HTML, metadados e PDF. As datas e os rótulos seguem o idioma ativo.

O PDFKit grava texto e anotações de link em A4, em uma coluna. O build publica um arquivo estático para cada idioma, com título e idioma do documento correspondentes; a Netlify serve o download diretamente. Ícones e imagens estão no site. A inspeção do PDF usa extração de texto, geometria e renderização visual.

## Visual e publicação

O CSS usa tokens locais, Instrument Sans e IBM Plex Mono com fontes auto-hospedadas. A abertura verde escura enquadra uma composição geométrica de metal e vidro, gerada com ImageGen. A trajetória usa uma linha cronológica em fundo claro, seguida por competências agrupadas e links de contato. A arte é decorativa e o CSS a omite em telas estreitas.

O HTML inclui metadados localizados e dados estruturados `Person`. A origem HTTPS configurada habilita URLs canônicas por idioma, alternativas `hreflang`, imagem social absoluta compartilhada e sitemap com as duas páginas. Deploy Previews recebem `noindex` e deixam de publicar sitemap. O repositório contém apenas os dados marcados para publicação, sem documentos pessoais originais.

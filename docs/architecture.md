# Decisões de arquitetura

## React no build

O portfólio original usava React 17, Create React App 4, styled-components e um roteador. A rota de experiências estava vazia. O Vite preserva React e TypeScript e renderiza o documento completo por meio de `react-dom/server`. Os anchors, o foco e o download são nativos do navegador. Qualquer interação React futura pode introduzir uma entrada de cliente específica. O HTML de `renderToStaticMarkup` é adequado às páginas estáticas atuais.

O plugin de build integra o HTML de entrada, a página 404, o currículo e os arquivos de busca. Uma tabela gera os redirects da hospedagem e atende o preview local. Os redirecionamentos mantêm os caminhos legados com uma seção real como destino.

## Dados e PDF

Um perfil tipado e validado com Zod é importado pelos componentes, metadados e PDFKit. A marca editorial e as fontes das afirmações vivem em camadas distintas. O conteúdo profissional usa descrições compartilhadas e formatação de datas pt-BR. O site e o PDF selecionam os mesmos fatos conforme o espaço disponível.

O PDFKit grava texto e anotações de link em A4, em uma coluna. O build publica um arquivo estático, então a Netlify pode servir o download sem função, navegador headless ou serviço pago na geração. Ícones e imagens estão no site. A inspeção do PDF usa extração de texto, geometria e renderização visual.

## Visual e publicação

O CSS usa tokens locais, Instrument Sans e IBM Plex Mono com fontes auto-hospedadas. A abertura verde escura enquadra uma composição geométrica de metal e vidro, gerada com ImageGen. A trajetória usa uma linha cronológica em fundo claro, seguida por competências agrupadas e links de contato. A arte é decorativa e o CSS a omite em telas estreitas.

O HTML inclui metadados e dados estruturados `Person`. A origem HTTPS configurada habilita URL canônica, imagem social absoluta e sitemap. Deploy Previews recebem `noindex` e deixam de publicar sitemap. O repositório contém apenas os dados marcados para publicação, sem documentos pessoais originais.

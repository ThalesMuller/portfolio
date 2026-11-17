# Revisão da implementação

Executada em 17/11/2026 no branch `codex/portfolio-gauntlet`.

## Auditoria e plano

A base `f2c31f3` usava React 17, TypeScript e Create React App 4. O histórico continha dois commits de migração à frente de `origin/main`. O repositório começou limpo. A auditoria executou a aplicação original em uma cópia ignorada, com o plugin ESLint desabilitado após a falha de configuração, e capturou desktop e mobile. A rota de experiências estava vazia, os metadados eram os padrões do CRA e o teste preservava a asserção de “Learn React”. A execução inicial de testes retornou ausência de testes no caminho Windows da cópia.

Três contextos independentes revisaram o plano. O crítico de conteúdo acumulou os papéis de recrutador, hiring manager, copywriter e fact checker. O crítico visual avaliou duas composições, uma abertura editorial verde-escura com trajetória clara e um currículo monocromático em papel quente. Foi escolhida a primeira. O crítico de engenharia avaliou arquitetura, rotas, QA e SEO.

Na revisão de release, três novos contextos independentes inspecionaram design e acessibilidade, currículo e fatos, e código/QA/SEO. Os pareceres se basearam no código, histórico, screenshots e PDF renderizados e resultados executados. Os papéis foram agrupados por especialidade para compartilhar a evidência pertinente.

## Achados e correções

| ID                  | Gravidade         | Evidência e correção                                                                                                                                                                                                                       | Estado               |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| FACT-001/002        | BLOCKING          | O histórico de 2022 usava “atualmente” na Compass e “cursando” na UNISC. O perfil canônico passou a exibir o início conhecido e o título atual confirmado pelo titular. Revisão factual independente refeita.                              | Resolvido            |
| D01/RECR-001        | MATERIAL          | O objetivo genérico e percentuais de habilidade ocupavam a abertura. O título Tech Lead, o contexto Livelo, a trajetória e os grupos de tecnologias agora estabelecem o posicionamento.                                                    | Resolvido            |
| ENG-02/03/04/06     | MATERIAL/BLOCKING | A rota vazia, o HTML inicial sem conteúdo, o download ausente e a falta de gates foram tratados com HTML React no build, redirects explícitos, PDFKit, testes e CI.                                                                        | Resolvido localmente |
| FACT-01/ARCH-PDF-01 | MATERIAL          | A descrição geral da Conectt aparecia associada a um cargo e desaparecia quando esse cargo recebia uma descrição própria. Site e PDF agora preservam os dois escopos. Teste de coexistência e revisão independente confirmaram a correção. | Resolvido            |
| ARCH-PDF-02         | MATERIAL          | Uma variação válida com Unicode corrompia texto no PDF Helvetica. Fontes Liberation Sans incorporadas e normalização NFC preservam a extração. Teste cobre `CI → CD` e `São José`.                                                         | Resolvido            |
| A11Y-01             | MATERIAL          | O Chrome com tamanho nativo de texto em 200% fez a navegação exceder telas estreitas. A navegação agora quebra linhas. Revalidação independente em 320, 390, 544 e 550 px passou.                                                          | Resolvido            |
| VIS-01              | MINOR             | Em 320 × 568 px, o CTA ficava parcialmente abaixo do quadro inicial. O hero compacto mantém o botão inteiro em y=438–486.                                                                                                                  | Resolvido            |
| COPY-01             | MINOR             | O grupo de C#, SQL, SharePoint e Power Platform passou a “Back-end, dados e plataformas”.                                                                                                                                                  | Resolvido            |
| SEO-P3-01           | MINOR             | Um link de agendamento adicionado ao perfil entrava em `Person.sameAs`. O campo opcional `identity` seleciona os perfis de identidade, com teste de regressão.                                                                             | Resolvido            |
| CAREER-01           | Limitação externa | LinkedIn retornou HTTP 999. O título atual foi confirmado pelo brief, enquanto empregador, início, responsabilidades, decisões e resultados recentes aguardam confirmação. O fallback factual passou pela revisão.                         | Documentado          |
| ENG-01              | Entrega externa   | GitHub e `ls-remote` confirmam `main` como padrão e ausência de `master`. O mantenedor precisa definir o destino do PR.                                                                                                                    | Pendente de escolha  |

## Evidências de verificação

- `npm run check` passou com TypeScript, ESLint, Prettier, 15 testes unitários/de integração, build e 13 testes de browser. A cobertura de lógica de aplicação foi 100% de linhas e 98,03% de branches. Uma instalação limpa com `npm ci` também passou.
- O Vitest cobre validação, datas, escopos de experiência, campos opcionais, extensões, renderização HTML, metadados e PDF. O Playwright verifica navegação, teclado, download real, redirecionamentos, 404, cinco larguras, axe, texto em 200% e screenshots de regressão.
- Baselines revisadas ficam em `tests/browser/__screenshots__/`. O teste permite uma pequena variação de rasterização entre sistemas. Uma mudança visual exige inspeção dos screenshots antes de atualizar as baselines.
- A versão normal do PDF tem uma página A4 com texto selecionável e três links. O cenário longo foi renderizado e conferido por um revisor independente em três páginas, com extração concordante entre pypdf e pdfplumber. Outro cenário acrescentou experiência, certificação e projeto, atingiu quatro páginas e preservou o marcador final.
- O crítico visual conferiu páginas completas desktop/mobile e screenshots de 320, 390, 768, 1024 e 1440 px. Quatro execuções independentes de axe retornaram zero violações e zero resultados inconclusivos. Teclado e download foram verificados com JavaScript desabilitado.
- O emulador oficial Netlify em modo offline respondeu homepage 200, caminhos legados 301, página desconhecida 404 e PDF 200 com `application/pdf` e `Content-Disposition` de download.
- O Lighthouse mobile medido no build de produção servido pelo emulador retornou 100 em performance, acessibilidade, boas práticas e SEO. LCP medido em 0,8 s e CLS em 0,039. Esses números pertencem ao ambiente local com simulação mobile.
- O Lighthouse desktop retornou 100 nas mesmas quatro categorias, LCP de 0,4 s e CLS de 0,033, também no emulador local.
- Gitleaks 8.30.1 verificou a árvore candidata com resultado de zero vazamentos. A skill local passou pelo validador nativo `quick_validate.py`.
- As evidências transitórias ficam em `.qa/evidence/`, ignoradas no Git. Incluem antes/depois, pareceres executados, PDF de estresse e relatório Lighthouse.

O escopo de browser foi Chrome/Chromium. Dispositivos físicos, leitores de tela reais e parsers comerciais de ATS ficaram fora da execução. O PDF possui texto e links, com as verificações descritas acima. Ele ainda não tem validação PDF/UA.

Os gates locais passaram. O workflow GitHub Actions está configurado para PRs e execução manual. A execução remota e o Deploy Preview aguardam a entrega no provedor, que depende da escolha do destino do PR.

O Judge independente conferiu os logs de gates e relatórios, inspecionou os screenshots finais e reextraiu e renderizou o PDF atual. Aprovou o candidato local com os achados materiais encerrados. A aprovação de entrega remota permanece pendente das verificações no provedor.

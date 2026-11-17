# Revisão da implementação

Executada em 17/11/2026 no branch `codex/portfolio-gauntlet`.

## Auditoria e plano

A base `f2c31f3` usava React 17, TypeScript e Create React App 4. O histórico continha dois commits de migração à frente de `origin/main`. O repositório começou limpo. A auditoria executou a aplicação original em uma cópia ignorada, com o plugin ESLint desabilitado após a falha de configuração, e capturou desktop e mobile. A rota de experiências estava vazia, os metadados eram os padrões do CRA e o teste preservava a asserção de “Learn React”. A execução inicial de testes retornou ausência de testes no caminho Windows da cópia.

Três contextos independentes revisaram o plano. O crítico de conteúdo acumulou os papéis de recrutador, hiring manager, copywriter e fact checker. O crítico visual avaliou duas composições, uma abertura editorial verde-escura com trajetória clara e um currículo monocromático em papel quente. Foi escolhida a primeira. O crítico de engenharia avaliou arquitetura, rotas, QA e SEO.

Na revisão de release, três novos contextos independentes inspecionaram design e acessibilidade, currículo e fatos, e código/QA/SEO. Os pareceres se basearam no código, histórico, screenshots e PDF renderizados e resultados executados. Os papéis foram agrupados por especialidade para compartilhar a evidência pertinente.

## Achados e correções

| ID                  | Gravidade         | Evidência e correção                                                                                                                                                                                                                       | Estado                               |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| FACT-001/002        | BLOCKING          | O histórico de 2022 usava “atualmente” na Compass e “cursando” na UNISC. O perfil canônico passou a exibir o início conhecido e o título atual confirmado pelo titular. Revisão factual independente refeita.                              | Resolvido                            |
| D01/RECR-001        | MATERIAL          | O objetivo genérico e percentuais de habilidade ocupavam a abertura. O título Tech Lead, o contexto Livelo, a trajetória e os grupos de tecnologias agora estabelecem o posicionamento.                                                    | Resolvido                            |
| ENG-02/03/04/06     | MATERIAL/BLOCKING | A rota vazia, o HTML inicial sem conteúdo, o download ausente e a falta de gates foram tratados com HTML React no build, redirects explícitos, PDFKit, testes e CI.                                                                        | Resolvido localmente                 |
| FACT-01/ARCH-PDF-01 | MATERIAL          | A descrição geral da Conectt aparecia associada a um cargo e desaparecia quando esse cargo recebia uma descrição própria. Site e PDF agora preservam os dois escopos. Teste de coexistência e revisão independente confirmaram a correção. | Resolvido                            |
| ARCH-PDF-02         | MATERIAL          | Uma variação válida com Unicode corrompia texto no PDF Helvetica. Fontes Liberation Sans incorporadas e normalização NFC preservam a extração. Teste cobre `CI → CD` e `São José`.                                                         | Resolvido                            |
| A11Y-01             | MATERIAL          | O Chrome com tamanho nativo de texto em 200% fez a navegação exceder telas estreitas. A navegação agora quebra linhas. Revalidação independente em 320, 390, 544 e 550 px passou.                                                          | Resolvido                            |
| VIS-01              | MINOR             | Em 320 × 568 px, o CTA ficava parcialmente abaixo do quadro inicial. O hero compacto mantém o botão inteiro em y=438–486.                                                                                                                  | Resolvido                            |
| COPY-01             | MINOR             | O grupo de C#, SQL, SharePoint e Power Platform passou a “Back-end, dados e plataformas”.                                                                                                                                                  | Resolvido                            |
| SEO-P3-01           | MINOR             | Um link de agendamento adicionado ao perfil entrava em `Person.sameAs`. O campo opcional `identity` seleciona os perfis de identidade, com teste de regressão.                                                                             | Resolvido                            |
| CAREER-01           | Limitação externa | A consulta pública ao LinkedIn foi bloqueada. A exportação do perfil fornecida depois pelo titular confirmou empregador, início e responsabilidades atuais. A importação e a revisão estão registradas abaixo.                             | Resolvido com a exportação fornecida |
| ENG-01              | Entrega externa   | O titular confirmou `main` como destino em 17/11/2026. PR #2 aberto para revisão humana e Deploy Preview disponível.                                                                                                                       | Resolvido                            |

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

## Importação da exportação fornecida

O titular forneceu `Profile.pdf` após a revisão inicial. As três páginas foram extraídas e renderizadas para conferência. O perfil canônico passou a apresentar Livelo Brasil desde novembro de 2024, os dois cargos na Compass e as responsabilidades atuais de liderança dos portais Operador e Seller. Datas de estágio e formação também foram atualizadas. A sobreposição dos cargos na Compass em agosto e setembro de 2023 permanece conforme a fonte. O registro acadêmico usa Análise e Desenvolvimento de Sistemas, UNISC, de 2017 a dezembro de 2024.

As competências agora incluem NestJS, Java, CQRS, MongoDB, Oracle, liderança e o nível profissional de inglês declarado no documento. Quatro grupos ocupam duas colunas no desktop. O currículo passou a duas páginas A4, mantendo o histórico profissional na primeira e competências/formação na segunda.

Um revisor independente comparou o conteúdo com todas as páginas de origem e com as fontes históricas mantidas. A extração do PDF atualizado preservou acentos, datas e três links de contato. As duas páginas renderizadas passaram pela revisão sem cortes ou descrições de cargo partidas. As evidências desta atualização ficam em `.qa/profile-import/`, com a fonte original mantida fora do repositório.

O teste de texto nativo em 200% identificou largura de 347 px em uma tela de 320 px com o conteúdo importado. A quebra de palavras foi aplicada por herança ao corpo da página para comportar os termos longos das descrições. A revalidação independente registrou fonte raiz de 32 px e largura de documento de 320 px, sem overflow de elementos ou texto. Screenshots reais em 320, 390, 768 e 1440 px e axe em 390 e 1440 px também passaram. As baselines foram atualizadas após essa inspeção.

`npm run check` passou novamente após a importação, com 15 testes unitários/de integração e 13 de browser, incluindo a comparação das baselines revisadas. A cobertura atual é de 100% das linhas e 95,09% dos branches da lógica de aplicação. Gitleaks verificou a árvore atualizada sem achados.

## Correções de formação e atuação atual

As confirmações diretas do titular passaram a sustentar a trajetória acadêmica e o escopo recente na Livelo. O perfil apresenta Engenharia de Computação de 2017 a 2023, com trancamento, e ADS em 2024, concluído em dezembro, com formatura em abril de 2025. O resumo e a experiência atual tratam de campanhas, CPP, paridade, comissionamento e performance de carrinho e checkout. Novembro de 2024 representa o início do cargo na empresa.

As competências incluem a stack atual, mensageria/cache e uma descrição curta da experiência com MCP e agentes. O texto contextual separa a experiência profissional do uso pessoal de Codex e é gerado no site e no PDF a partir do mesmo campo opcional.

Dois revisores independentes conferiram fatos, concisão, proveniência, screenshots desktop/mobile, reflow com fonte de 32 px e as duas páginas A4. Axe retornou zero violações em desktop e celular. O único achado documental foi corrigido e revalidado. As evidências desta rodada estão em `.qa/campaign-update/`.

O gate completo passou com 15 testes unitários/de integração e 13 testes de browser. A cobertura da lógica de aplicação ficou em 100% de linhas e 94,33% de branches. Gitleaks verificou a árvore candidata sem achados.

## Restauração da trajetória interna na Livelo

O titular confirmou março de 2026 como início em QEO e apontou a perda da fase anterior nos portais após a internalização. A trajetória foi corrigida para uma única entrada da Livelo, com Portais Operador e Seller de novembro de 2024 a março de 2026 e QEO desde março de 2026. A descrição de QEO passou a uma frase, e o resumo do perfil enfatiza liderança técnica e arquitetura.

A estrutura existente de empresa e cargos passou a concentrar as duas fases. O marcador opcional `period.current` permite indicar a atuação atual, enquanto os períodos históricos preservam suas datas. Os formatos anteriores de perfil continuam cobertos pelos testes. As verificações de HTML e PDF agora incluem as duas fases e a transição de março de 2026. As evidências desta correção ficam em `.qa/livelo-history/`.

A revisão independente aprovou o conteúdo, a proveniência, as duas páginas A4 e screenshots reais em 1440, 390 e 320 px. A entrada da Livelo preserva a fase anterior nos portais e apresenta QEO com uma descrição curta.

O gate completo passou com 15 testes unitários/de integração e 13 testes de browser. A cobertura é de 100% de linhas e 96,36% de branches. Gitleaks verificou a árvore candidata sem achados.

## Versão em inglês e download por idioma

O pedido do titular acrescentou inglês ao portfólio e ao currículo, com seletor PT/EN no topo. O perfil canônico reúne os textos nos dois idiomas e mantém datas, organizações, tecnologias, fontes e links em campos compartilhados. Uma comparação independente confirmou que o perfil português resolvido é exatamente igual ao conteúdo anterior. O inglês preserva o histórico Portais → QEO, as datas da Compass, a conclusão de ADS em dezembro de 2024, a cerimônia em abril de 2025 e o trancamento de Engenharia de Computação.

O build publica `/` e `/en/`, cada uma com conteúdo completo, metadados e download correspondentes. A detecção na entrada pela raiz considera a escolha salva e a lista de idiomas do navegador; português é o fallback. A seleção explícita prevalece e funciona com armazenamento bloqueado. Navegação, troca de idioma e downloads continuam disponíveis sem JavaScript. O módulo de preferência tem 0,87 kB comprimido neste build e preserva consulta e âncora ao trocar o idioma.

As revisões independentes conferiram tradução, invariantes dos fatos, prioridade de idioma, PDFs e reflow. Os dois currículos têm duas páginas A4, texto selecionável e os três links de contato. Screenshots reais foram conferidos nos dois idiomas em 1440, 390 e 320 px, com fonte normal e ampliada para 32 px. As quatro baselines foram atualizadas após inspeção. A primeira execução de axe identificou divergência entre o texto visível PT/EN e o nome acessível dos links; os rótulos passaram a incluir as siglas visíveis e a revalidação retornou zero violações nos quatro cenários de idioma e largura.

`npm run check` passou com TypeScript, ESLint, Prettier, 22 testes unitários/de integração, build e 31 testes de browser. A cobertura unitária é de 86,51% de linhas e 86,58% de branches; o módulo que acessa navegador e armazenamento é exercitado na suíte de browser. O emulador oficial da Netlify confirmou HTML 200, erros 404 localizados e ambos os PDFs 200 com os cabeçalhos de download esperados. Gitleaks verificou a árvore candidata sem achados. As evidências desta atualização ficam em `.qa/bilingual/`.

## Entrega e referências visuais do CI

O titular confirmou `main` como destino da entrega, resolvendo a divergência com `master`. O [PR #2](https://github.com/ThalesMuller/portfolio/pull/2) reúne o trabalho de `codex/portfolio-gauntlet`. A [prévia da Netlify](https://deploy-preview-2--portfolio-thales.netlify.app) foi gerada e conferida por HTTP: português e inglês 200, erros 404 localizados, downloads dos dois PDFs e `noindex` no preview.

A primeira execução Linux passou nos 22 testes unitários/de integração e em 28 dos 31 testes de navegador. As três falhas eram comparações visuais com referências Windows/Chrome. A inspeção independente das capturas mostrou uma linha adicional na descrição da Compass em cada versão móvel, somando 25 px, e o título do estágio em duas linhas no desktop português, somando 31 px. Não houve cortes, sobreposição ou perda de conteúdo. Os traces confirmaram respostas 200 das duas fontes auto-hospedadas, com bytes idênticos aos arquivos locais e nenhum erro de console.

O Playwright passou a usar referências separadas por plataforma. Os quatro arquivos Windows foram preservados byte a byte em `win32`; as quatro capturas reais Linux foram obtidas dos artefatos do CI e inspecionadas antes da inclusão em `linux`. A execução intermediária passou em 30 testes de navegador e sinalizou a referência inglesa desktop ausente; essa captura foi então revisada e incorporada. A tolerância continua em 2%, os 31 testes foram mantidos e as execuções normais não aprovam referências ausentes. O gate Windows completo passou novamente. Os resultados remotos ficam vinculados ao PR, e os artefatos e pareceres locais estão em `.qa/bilingual/`.

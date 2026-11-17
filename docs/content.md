# Manutenção do perfil

Edite [profile.ts](../src/content/profile.ts). O site e os currículos em português e inglês são gerados desses dados, e a validação falha no build quando algum perfil é inválido.

Mantenha as versões `pt-BR` e `en` de cada texto editorial no mesmo campo. Datas, organizações, tecnologias, fontes e destinos de links são compartilhados. O inglês traduz os fatos confirmados, sem acrescentar nível acadêmico, fluência ou responsabilidades. `localized.ts` resolve os textos e valida cada idioma com o mesmo schema. Os rótulos da interface ficam em `src/i18n/messages.ts`.

| Pedido                                      | Campo                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| Atualizar resumo ou título                  | `summary` ou `currentPosition.title`                                                    |
| Descrever o cargo atual                     | `experience`, no cargo com `period.current: true` dentro do vínculo com a empresa       |
| Adicionar experiência                       | `experience`, da mais recente para a mais antiga, com um ou mais cargos por organização |
| Atualizar competências                      | `skills` e, quando necessário, as referências de tecnologias nas experiências           |
| Atualizar idiomas e proficiência            | `languages`, com nome traduzido, nível compartilhado e fonte                            |
| Adicionar certificação, projeto ou formação | `certifications`, `projects` ou `education`                                             |
| Adicionar contato                           | `links`, com HTTPS ou `mailto:`                                                         |

Use `AAAA-MM` quando o mês estiver documentado e `AAAA` para o ano isolado. `currentPosition.title` define o título profissional do cabeçalho. A trajetória fica em `experience`, agrupada por empresa e com cargos da fase mais recente para a mais antiga. `period.current: true` identifica uma atuação atual e mantém o fim em aberto. Um período histórico sem fim exibe apenas o início conhecido. Dê a cada registro um ID estável.

Rode `npm run build` para atualizar as duas páginas e os dois currículos. Rode `npm run resume` para gerar só os PDFs: `thales-muller-curriculo.pdf` e `thales-muller-resume.pdf`. Confira a renderização e a extração de texto em ambos os idiomas depois de uma alteração relevante. Para delegar a atualização, peça ao Codex para usar `$portfolio-maintainer` e inclua a fonte ou confirmação que sustenta o pedido.

O português fica em `/` e o inglês em `/en/`. O seletor no topo funciona por links nativos. Com JavaScript disponível, a entrada pela raiz considera a escolha manual salva e, depois, o primeiro idioma suportado na lista do navegador; sem correspondência, usa português. A escolha manual usa `?lang=pt-BR` ou `?lang=en`, inclusive quando o armazenamento está bloqueado. A URL explícita `/en/` abre inglês. A troca preserva consulta e seção quando JavaScript está disponível.

## Importar uma nova fonte

Em links de perfis públicos que identificam o titular, use `identity: true` para incluí-los nos dados estruturados `Person.sameAs`. Links de agendamento e outros contatos utilitários podem omitir esse campo.

Anexe o PDF exportado do LinkedIn ou o currículo que deseja usar a uma sessão de manutenção. Extraia o texto localmente e compare com as páginas renderizadas do documento, especialmente títulos, datas, ordem dos cargos e links. Confirme com o titular as diferenças que o documento não esclarece. Incorpore os fatos autorizados em `profile.ts`, usando `linkedin` ou `user-resume` no registro, e atualize a tabela abaixo com a data e o escopo verificado. Mantenha o arquivo original e informações privadas fora do repositório.

## Proveniência

| Fonte                | Evidência                                                                                                     | Escopo                                                                                                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `owner`              | Brief e correções diretas do titular em 17/11/2026                                                            | Formação, conclusão e formatura, atuação atual em campanhas, stack, mensageria, cache e experiência profissional/pessoal com IA.                                                                                                |
| `portfolio-2022`     | Commit `f2c31f3`, `src/components/pages/Home/index.tsx`, `src/components/molecules/{Header,Footer}/index.tsx` | Nome completo, e-mail publicado anteriormente, cargos, datas históricas, formação, bolsa e tecnologias declaradas.                                                                                                              |
| `project-notes-2022` | Commit `f2c31f3`, `experienses.json`                                                                          | Portal de vendedores no contexto Compass UOL/Livelo, tecnologias da Tekann, SharePoint, Power Platform e ferramentas de qualidade na Conectt.                                                                                   |
| `github-profile`     | Perfil e metadados do repositório públicos, consultados em 17/11/2026                                         | Nome de exibição, URL do GitHub e URL existente da Netlify.                                                                                                                                                                     |
| `user-resume`        | Exportação LinkedIn `Profile.pdf`, fornecida pelo titular em 17/11/2026, três páginas                         | Página 1 registra Livelo Brasil desde novembro de 2024, liderança dos portais Operador e Seller, stack dos portais e inglês. Páginas 1–2 registram os dois cargos na Compass. Páginas 2–3 registram Tekann, Conectt e formação. |

A consulta pública ao LinkedIn em 17/11/2026 retornou HTTP 999. A exportação fornecida permitiu importar o histórico profissional e o início do cargo Tech Lead na Livelo em novembro de 2024. Depois, as confirmações diretas do titular atualizaram o escopo atual e corrigiram a formação, conforme registrado abaixo.

O PDF registra sobreposição entre os cargos da Compass em agosto e setembro de 2023. As datas foram preservadas conforme a fonte. A exportação registrava inglês como `Full Professional`; a confirmação posterior do titular define o quadro de idiomas como português nativo e inglês avançado, em português e inglês, sem inferir equivalência CEFR.

Redux Toolkit, SQL, Git, Azure Pipelines, SonarQube e Jest continuam apoiados nas fontes históricas indicadas nos registros correspondentes. A bolsa acadêmica de 2017 a 2019 também permanece ligada ao histórico de 2022. Nomes de clientes sem descrição de escopo, avaliações percentuais de habilidade e atividades antigas menos relevantes permanecem no histórico do Git.

## Correções confirmadas pelo titular

O titular confirmou Engenharia de Computação na UNISC entre 2017 e 2023, com trancamento em 2023. Em 2024, transferiu-se para Análise e Desenvolvimento de Sistemas após aproveitamento de estudos e concluiu o curso em dezembro de 2024. Confirmou a formatura em abril de 2025. Esses dados substituem o período agregado de 2017 a 2024 da exportação.

O titular confirmou a mudança para QEO em março de 2026. O vínculo interno com a Livelo aparece em uma única entrada, com Portais Operador e Seller de novembro de 2024 a março de 2026 e QEO de março de 2026 em diante. Novembro de 2024 permanece como início da internalização. O resumo e a descrição de QEO foram sintetizados após o titular pedir menos detalhe operacional.

A stack confirmada inclui Java, Spring, React com single-spa, BFFs NestJS, Oracle, RabbitMQ, SQS/SNS e Redis. As competências exibem Java e Spring como famílias de tecnologia. MongoDB e CQRS continuam apoiados no histórico da exportação.

O titular também confirmou uso profissional de Gemini e Kiro, participação no desenvolvimento de um MCP e criação de agentes no Copilot. O uso de Codex para skills e agentes pertence aos projetos pessoais. A descrição contextual dessa competência é compartilhada pelo site e pelo PDF.

O titular confirmou português nativo e inglês avançado em 17/11/2026. Os idiomas têm seção própria no site e nos currículos. `languages[].proficiency` armazena o nível uma única vez; os rótulos Nativo/Native e Avançado/Advanced são apresentados conforme o idioma da página ou do PDF. A menção anterior a inglês no grupo de liderança foi substituída por essa seção.

# Manutenção do perfil

Edite [profile.ts](../src/content/profile.ts). O site e o currículo são gerados desses dados, e a validação falha no build quando o perfil é inválido.

| Pedido                                      | Campo                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Atualizar resumo ou título                  | `summary` ou `currentPosition.title`                                                     |
| Descrever o cargo atual                     | `currentPosition` recebe organização, início, descrição e tecnologias conforme as fontes |
| Adicionar experiência                       | `experience`, da mais recente para a mais antiga, com um ou mais cargos por organização  |
| Atualizar competências                      | `skills` e, quando necessário, as referências de tecnologias nas experiências            |
| Adicionar certificação, projeto ou formação | `certifications`, `projects` ou `education`                                              |
| Adicionar contato                           | `links`, com HTTPS ou `mailto:`                                                          |

Use `AAAA-MM` quando o mês estiver documentado e `AAAA` para o ano isolado. Um cargo histórico sem fim aparece com o início conhecido. O cargo atual aparece no cabeçalho e ganha uma entrada na trajetória quando recebe informações adicionais. Dê a cada registro um ID estável.

Rode `npm run build` para atualizar o site e o currículo. Rode `npm run resume` para gerar só o PDF. Confira a versão renderizada e a extração de texto depois de uma alteração relevante. Para delegar a atualização, peça ao Codex para usar `$portfolio-maintainer` e inclua a fonte ou confirmação que sustenta o pedido.

## Importar uma nova fonte

Em links de perfis públicos que identificam o titular, use `identity: true` para incluí-los nos dados estruturados `Person.sameAs`. Links de agendamento e outros contatos utilitários podem omitir esse campo.

Anexe o PDF exportado do LinkedIn ou o currículo que deseja usar a uma sessão de manutenção. Extraia o texto localmente e compare com as páginas renderizadas do documento, especialmente títulos, datas, ordem dos cargos e links. Confirme com o titular as diferenças que o documento não esclarece. Incorpore os fatos autorizados em `profile.ts`, usando `linkedin` ou `user-resume` no registro, e atualize a tabela abaixo com a data e o escopo verificado. Mantenha o arquivo original e informações privadas fora do repositório.

## Proveniência

| Fonte                | Evidência                                                                                                     | Escopo                                                                                                                                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `owner`              | Brief de implementação recebido em 17/11/2026                                                                 | Cargo atual **Tech Lead** e URL do LinkedIn.                                                                                                                                                                              |
| `portfolio-2022`     | Commit `f2c31f3`, `src/components/pages/Home/index.tsx`, `src/components/molecules/{Header,Footer}/index.tsx` | Nome completo, e-mail publicado anteriormente, cargos, datas históricas, formação, bolsa e tecnologias declaradas.                                                                                                        |
| `project-notes-2022` | Commit `f2c31f3`, `experienses.json`                                                                          | Portal de vendedores no contexto Compass UOL/Livelo, tecnologias da Tekann, SharePoint, Power Platform e ferramentas de qualidade na Conectt.                                                                             |
| `github-profile`     | Perfil e metadados do repositório públicos, consultados em 17/11/2026                                         | Nome de exibição, URL do GitHub e URL existente da Netlify.                                                                                                                                                               |
| `user-resume`        | Exportação LinkedIn `Profile.pdf`, fornecida pelo titular em 17/11/2026, três páginas                         | Página 1 registra Livelo Brasil desde novembro de 2024, liderança dos portais Operador e Seller, stack atual e inglês. Páginas 1–2 registram os dois cargos na Compass. Páginas 2–3 registram Tekann, Conectt e formação. |

A consulta pública ao LinkedIn em 17/11/2026 retornou HTTP 999. A exportação fornecida em seguida permitiu verificar empregador, início e responsabilidades do cargo atual. Ela atualiza o histórico de 2022, incluindo início na Compass em julho de 2021, período de Tech Lead na Compass de agosto de 2023 a novembro de 2024, fim do estágio em fevereiro de 2020 e Análise e Desenvolvimento de Sistemas na UNISC de 2017 a dezembro de 2024.

O PDF registra sobreposição entre os cargos da Compass em agosto e setembro de 2023. As datas foram preservadas conforme a fonte. O período acadêmico foi publicado com as datas documentadas, sem atribuição de diploma ou conclusão. O nível de inglês traduz `Full Professional` como competência profissional completa.

Redux Toolkit, SQL, Git, Azure Pipelines, SonarQube e Jest continuam apoiados nas fontes históricas indicadas nos registros correspondentes. A bolsa acadêmica de 2017 a 2019 também permanece ligada ao histórico de 2022. Nomes de clientes sem descrição de escopo, avaliações percentuais de habilidade e atividades antigas menos relevantes permanecem no histórico do Git.

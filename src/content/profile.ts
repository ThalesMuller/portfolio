import { profileSchema } from './schema.ts';

export const profile = profileSchema.parse({
  name: 'Thales Eduardo Müller',
  displayName: 'Thales Müller',
  summary:
    'Lidero tecnicamente os portais Operador e Seller da Livelo, com foco em arquitetura escalável, qualidade de código e evolução sustentável dos produtos.',
  currentPosition: {
    title: 'Tech Lead',
    organization: 'Livelo Brasil',
    start: '2024-11',
    description:
      'Sou responsável pelo core técnico dos portais Operador e Seller, com micro frontends em React e TypeScript, NestJS como BFF e Java com CQRS. Atuo na padronização arquitetural, documentação técnica e evolução das práticas de engenharia.',
    technologies: ['React', 'TypeScript', 'NestJS', 'Java', 'CQRS', 'MongoDB', 'Oracle'],
    source: 'user-resume',
  },
  experience: [
    {
      id: 'compass-uol',
      organization: 'Compass UOL',
      roles: [
        {
          title: 'Tech Lead',
          period: { start: '2023-08', end: '2024-11' },
          description:
            'Liderei tecnicamente o Portal Seller da Livelo, com coordenação de times e definição arquitetural para micro frontends e integração de microsserviços. Promovi revisão de código, mentorias e alinhamento técnico.',
        },
        {
          title: 'Desenvolvedor front-end',
          period: { start: '2021-07', end: '2023-09' },
          description:
            'Participei da criação do Portal Seller da Livelo com React e TypeScript, em colaboração com equipes multidisciplinares, revisões de código e melhoria dos processos de desenvolvimento.',
        },
      ],
      technologies: ['React', 'TypeScript', 'Redux Toolkit', 'styled-components'],
      sources: ['user-resume', 'project-notes-2022'],
    },
    {
      id: 'tekann',
      organization: 'Tekann Mobile Solutions',
      roles: [
        {
          title: 'Desenvolvedor full stack',
          period: { start: '2021-01', end: '2021-06' },
          description:
            'Participei do desenvolvimento de uma aplicação global, do planejamento ao lançamento, com React e styled-components no front-end e C# com Entity Framework no back-end.',
        },
      ],
      technologies: ['React', 'C#', 'Entity Framework', 'SQL'],
      sources: ['user-resume', 'project-notes-2022'],
    },
    {
      id: 'conectt',
      organization: 'Conectt',
      roles: [
        {
          title: 'Desenvolvedor full stack',
          period: { start: '2020-03', end: '2020-12' },
          description:
            'Desenvolvi front-end com React e TypeScript e back-end com C#, com integração a serviços Microsoft Azure e pipelines de CI/CD no Azure DevOps.',
        },
        {
          title: 'Estagiário de desenvolvimento de software',
          period: { start: '2019-03', end: '2020-02' },
          description:
            'Atuei em desenvolvimento e suporte com SharePoint, Power Automate e PowerApps, além de C# e JavaScript para automação, fluxos de trabalho e aplicações internas.',
        },
      ],
      description:
        'Também trabalhei na estrutura interna de qualidade de código, com Azure Pipelines, SonarQube e Jest.',
      technologies: ['React', 'TypeScript', 'C#', 'Azure DevOps', 'CI/CD'],
      sources: ['user-resume', 'project-notes-2022'],
    },
  ],
  skills: [
    {
      id: 'front-end',
      title: 'Front-end',
      items: ['React', 'TypeScript', 'JavaScript', 'Micro frontends', 'Redux Toolkit', 'styled-components'],
      sources: ['user-resume', 'portfolio-2022', 'project-notes-2022'],
    },
    {
      id: 'back-end',
      title: 'Back-end e dados',
      items: ['NestJS', 'Java', 'CQRS', 'MongoDB', 'Oracle', 'C#', 'Entity Framework', 'SQL'],
      sources: ['user-resume', 'portfolio-2022', 'project-notes-2022'],
    },
    {
      id: 'leadership',
      title: 'Liderança e comunicação',
      items: [
        'Liderança técnica',
        'Definição arquitetural',
        'Mentoria',
        'Documentação técnica',
        'Inglês · competência profissional completa',
      ],
      sources: ['user-resume'],
    },
    {
      id: 'engineering',
      title: 'Qualidade e entrega',
      items: ['Git', 'Azure DevOps', 'Azure Pipelines', 'CI/CD', 'SonarQube', 'Jest', 'Revisão de código'],
      sources: ['user-resume', 'portfolio-2022', 'project-notes-2022'],
    },
  ],
  education: [
    {
      id: 'analise-desenvolvimento-sistemas',
      title: 'Análise e Desenvolvimento de Sistemas',
      institution: 'Universidade de Santa Cruz do Sul (UNISC)',
      period: { start: '2017', end: '2024-12' },
      source: 'user-resume',
    },
    {
      id: 'bolsa',
      title: 'Bolsista em projetos acadêmicos',
      institution: 'UNISC',
      period: { start: '2017', end: '2019' },
      description: 'Projetos Wearable e Inclusão Digital.',
      source: 'portfolio-2022',
    },
  ],
  links: [
    { id: 'email', label: 'E-mail', href: 'mailto:thales.em@gmail.com', source: 'user-resume' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/thalesemuller/',
      source: 'user-resume',
      identity: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/ThalesMuller',
      source: 'github-profile',
      identity: true,
    },
  ],
});

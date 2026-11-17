import { profileSchema } from './schema.ts';

export const profile = profileSchema.parse({
  name: 'Thales Eduardo Müller',
  displayName: 'Thales Müller',
  summary:
    'Minha trajetória passa pelo desenvolvimento full stack e pelo front-end de produtos web, como o portal de vendedores do marketplace da Livelo.',
  currentPosition: { title: 'Tech Lead', source: 'owner' },
  experience: [
    {
      id: 'compass-uol',
      organization: 'Compass UOL',
      roles: [
        {
          title: 'Desenvolvedor front-end júnior',
          period: { start: '2021-06' },
          description:
            'Trabalhei no front-end do portal de vendedores do marketplace da Livelo, em um sistema com arquitetura de microsserviços.',
        },
      ],
      technologies: ['React', 'TypeScript', 'Redux Toolkit', 'styled-components'],
      sources: ['portfolio-2022', 'project-notes-2022'],
    },
    {
      id: 'tekann',
      organization: 'Tekann',
      roles: [
        {
          title: 'Desenvolvedor full stack júnior',
          period: { start: '2021-01', end: '2021-06' },
          description: 'Desenvolvi software com React no front-end e C#, Entity Framework e SQL no back-end.',
        },
      ],
      technologies: ['React', 'C#', 'Entity Framework', 'SQL'],
      sources: ['portfolio-2022', 'project-notes-2022'],
    },
    {
      id: 'conectt',
      organization: 'Conectt',
      roles: [
        {
          title: 'Desenvolvedor full stack júnior',
          period: { start: '2020-03', end: '2020-12' },
        },
        {
          title: 'Estagiário de desenvolvimento full stack',
          period: { start: '2019-03', end: '2020-03' },
        },
      ],
      description:
        'Trabalhei com SharePoint e Power Platform em projetos para clientes e com Azure Pipelines, SonarQube e Jest na estrutura interna de qualidade de código.',
      technologies: ['SharePoint', 'Power Platform', 'Azure Pipelines', 'SonarQube', 'Jest'],
      sources: ['portfolio-2022', 'project-notes-2022'],
    },
  ],
  skills: [
    {
      id: 'front-end',
      title: 'Front-end',
      items: ['React', 'TypeScript', 'JavaScript', 'Redux Toolkit', 'styled-components'],
      sources: ['portfolio-2022', 'project-notes-2022'],
    },
    {
      id: 'back-end',
      title: 'Back-end, dados e plataformas',
      items: ['C#', 'Entity Framework', 'SQL', 'SharePoint', 'Power Platform'],
      sources: ['portfolio-2022', 'project-notes-2022'],
    },
    {
      id: 'engineering',
      title: 'Qualidade e entrega',
      items: ['Git', 'Azure DevOps', 'Azure Pipelines', 'SonarQube', 'Jest'],
      sources: ['portfolio-2022', 'project-notes-2022'],
    },
  ],
  education: [
    {
      id: 'computacao',
      title: 'Engenharia de Computação',
      institution: 'Universidade de Santa Cruz do Sul (UNISC)',
      period: { start: '2017' },
      source: 'portfolio-2022',
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
    { id: 'email', label: 'E-mail', href: 'mailto:thales.em@gmail.com', source: 'portfolio-2022' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/thalesemuller/',
      source: 'owner',
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

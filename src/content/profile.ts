import { defaultLocale } from '../i18n/locale.ts';
import { resolveProfile, type ProfileContent } from './localized.ts';

export const profileContent = {
  name: 'Thales Eduardo Müller',
  displayName: 'Thales Müller',
  summary: {
    'pt-BR': 'Tech Lead na Livelo, com foco em arquitetura, qualidade de software e evolução de produtos digitais.',
    en: 'Tech Lead at Livelo, focused on architecture, software quality and the continued development of digital products.',
  },
  currentPosition: {
    title: {
      'pt-BR': 'Tech Lead',
      en: 'Tech Lead',
    },
    source: 'owner',
  },
  experience: [
    {
      id: 'livelo',
      organization: 'Livelo Brasil',
      roles: [
        {
          title: {
            'pt-BR': 'Tech Lead · QEO',
            en: 'Tech Lead · QEO',
          },
          period: {
            start: '2026-03',
            current: true,
          },
          description: {
            'pt-BR':
              'Liderança técnica do time de campanhas do Shopping Livelo, com foco em performance e evolução dos sistemas comerciais.',
            en: "Technical leadership of Shopping Livelo's campaign team, focusing on performance and the continued development of commercial systems.",
          },
        },
        {
          title: {
            'pt-BR': 'Tech Lead · Portais',
            en: 'Tech Lead · Portals',
          },
          period: {
            start: '2024-11',
            end: '2026-03',
          },
          description: {
            'pt-BR':
              'Liderança técnica dos portais Operador e Seller, com micro frontends React, BFFs NestJS e serviços Java. Padronização arquitetural, documentação e qualidade de código.',
            en: 'Technical leadership of the Operador and Seller portals, using React micro frontends, NestJS BFFs and Java services. Architecture standardization, documentation and code quality.',
          },
        },
      ],
      technologies: ['React', 'NestJS', 'Java', 'Oracle'],
      sources: ['owner', 'user-resume'],
    },
    {
      id: 'compass-uol',
      organization: 'Compass UOL',
      roles: [
        {
          title: {
            'pt-BR': 'Tech Lead',
            en: 'Tech Lead',
          },
          period: {
            start: '2023-08',
            end: '2024-11',
          },
          description: {
            'pt-BR':
              'Liderei tecnicamente o Portal Seller da Livelo, com coordenação de times e definição arquitetural para micro frontends e integração de microsserviços. Promovi revisão de código, mentorias e alinhamento técnico.',
            en: "Led technical work on Livelo's Seller Portal, coordinating teams and defining the architecture for micro frontends and microservice integration. Promoted code reviews, mentoring and technical alignment.",
          },
        },
        {
          title: {
            'pt-BR': 'Desenvolvedor front-end',
            en: 'Front-end Developer',
          },
          period: {
            start: '2021-07',
            end: '2023-09',
          },
          description: {
            'pt-BR':
              'Participei da criação do Portal Seller da Livelo com React e TypeScript, em colaboração com equipes multidisciplinares, revisões de código e melhoria dos processos de desenvolvimento.',
            en: "Helped build Livelo's Seller Portal with React and TypeScript, collaborating with multidisciplinary teams on code reviews and improvements to development processes.",
          },
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
          title: {
            'pt-BR': 'Desenvolvedor full stack',
            en: 'Full-stack Developer',
          },
          period: {
            start: '2021-01',
            end: '2021-06',
          },
          description: {
            'pt-BR':
              'Participei do desenvolvimento de uma aplicação global, do planejamento ao lançamento, com React e styled-components no front-end e C# com Entity Framework no back-end.',
            en: 'Contributed to a global application from planning through launch, using React and styled-components on the front end and C# with Entity Framework on the back end.',
          },
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
          title: {
            'pt-BR': 'Desenvolvedor full stack',
            en: 'Full-stack Developer',
          },
          period: {
            start: '2020-03',
            end: '2020-12',
          },
          description: {
            'pt-BR':
              'Desenvolvi front-end com React e TypeScript e back-end com C#, com integração a serviços Microsoft Azure e pipelines de CI/CD no Azure DevOps.',
            en: 'Developed front ends with React and TypeScript and back ends with C#, integrating Microsoft Azure services and CI/CD pipelines in Azure DevOps.',
          },
        },
        {
          title: {
            'pt-BR': 'Estagiário de desenvolvimento de software',
            en: 'Software Development Intern',
          },
          period: {
            start: '2019-03',
            end: '2020-02',
          },
          description: {
            'pt-BR':
              'Atuei em desenvolvimento e suporte com SharePoint, Power Automate e PowerApps, além de C# e JavaScript para automação, fluxos de trabalho e aplicações internas.',
            en: 'Worked on development and support with SharePoint, Power Automate and PowerApps, as well as C# and JavaScript for automation, workflows and internal applications.',
          },
        },
      ],
      description: {
        'pt-BR': 'Também trabalhei na estrutura interna de qualidade de código, com Azure Pipelines, SonarQube e Jest.',
        en: 'Also worked on internal code quality infrastructure using Azure Pipelines, SonarQube and Jest.',
      },
      technologies: ['React', 'TypeScript', 'C#', 'Azure DevOps', 'CI/CD'],
      sources: ['user-resume', 'project-notes-2022'],
    },
  ],
  skills: [
    {
      id: 'front-end',
      title: {
        'pt-BR': 'Front-end',
        en: 'Front end',
      },
      items: [
        'React',
        'TypeScript',
        'single-spa',
        'JavaScript',
        'Micro frontends',
        'Redux Toolkit',
        'styled-components',
      ],
      sources: ['owner', 'user-resume', 'portfolio-2022', 'project-notes-2022'],
    },
    {
      id: 'back-end',
      title: {
        'pt-BR': 'Back-end e dados',
        en: 'Back end and data',
      },
      items: ['Java', 'Spring', 'NestJS', 'Oracle', 'CQRS', 'MongoDB', 'C#', 'Entity Framework', 'SQL'],
      sources: ['owner', 'user-resume', 'portfolio-2022', 'project-notes-2022'],
    },
    {
      id: 'leadership',
      title: {
        'pt-BR': 'Liderança e comunicação',
        en: 'Leadership and communication',
      },
      items: [
        {
          'pt-BR': 'Liderança técnica',
          en: 'Technical leadership',
        },
        {
          'pt-BR': 'Definição arquitetural',
          en: 'Architectural design',
        },
        {
          'pt-BR': 'Mentoria',
          en: 'Mentoring',
        },
        {
          'pt-BR': 'Documentação técnica',
          en: 'Technical documentation',
        },
      ],
      sources: ['user-resume'],
    },
    {
      id: 'messaging',
      title: {
        'pt-BR': 'Mensageria e cache',
        en: 'Messaging and caching',
      },
      items: ['RabbitMQ', 'Amazon SQS', 'Amazon SNS', 'Redis'],
      sources: ['owner'],
    },
    {
      id: 'ai-engineering',
      title: {
        'pt-BR': 'IA aplicada à engenharia',
        en: 'AI in engineering',
      },
      description: {
        'pt-BR':
          'Participação no desenvolvimento de um MCP e criação de agentes no Copilot. Uso pessoal de Codex para criar skills e agentes.',
        en: 'Contributed to the development of an MCP and created agents in Copilot. Personal use of Codex to create skills and agents.',
      },
      items: ['Gemini', 'Kiro', 'Copilot', 'Codex'],
      sources: ['owner'],
    },
    {
      id: 'engineering',
      title: {
        'pt-BR': 'Qualidade e entrega',
        en: 'Quality and delivery',
      },
      items: [
        'Git',
        'Azure DevOps',
        'Azure Pipelines',
        'CI/CD',
        'SonarQube',
        'Jest',
        {
          'pt-BR': 'Revisão de código',
          en: 'Code review',
        },
      ],
      sources: ['user-resume', 'portfolio-2022', 'project-notes-2022'],
    },
  ],
  languages: [
    {
      id: 'portuguese',
      name: { 'pt-BR': 'Português', en: 'Portuguese' },
      proficiency: 'native',
      source: 'owner',
    },
    {
      id: 'english',
      name: { 'pt-BR': 'Inglês', en: 'English' },
      proficiency: 'advanced',
      source: 'owner',
    },
  ],
  education: [
    {
      id: 'analise-desenvolvimento-sistemas',
      title: {
        'pt-BR': 'Análise e Desenvolvimento de Sistemas',
        en: 'Systems Analysis and Development',
      },
      institution: 'Universidade de Santa Cruz do Sul (UNISC)',
      period: {
        start: '2024',
        end: '2024-12',
      },
      description: {
        'pt-BR':
          'Curso concluído em dezembro de 2024, após transferência e aproveitamento de estudos. Formatura em abril de 2025.',
        en: 'Completed in December 2024 following a transfer and recognition of prior coursework. Graduation ceremony in April 2025.',
      },
      source: 'owner',
    },
    {
      id: 'engenharia-computacao',
      title: {
        'pt-BR': 'Engenharia de Computação',
        en: 'Computer Engineering',
      },
      institution: 'Universidade de Santa Cruz do Sul (UNISC)',
      period: {
        start: '2017',
        end: '2023',
      },
      description: {
        'pt-BR': 'Curso trancado em 2023. Transferência para Análise e Desenvolvimento de Sistemas em 2024.',
        en: 'Program paused in 2023. Transferred to Systems Analysis and Development in 2024.',
      },
      source: 'owner',
    },
    {
      id: 'bolsa',
      title: {
        'pt-BR': 'Bolsista em projetos acadêmicos',
        en: 'Academic project scholarship recipient',
      },
      institution: 'UNISC',
      period: {
        start: '2017',
        end: '2019',
      },
      description: {
        'pt-BR': 'Projetos Wearable e Inclusão Digital.',
        en: 'Wearable and Digital Inclusion projects.',
      },
      source: 'portfolio-2022',
    },
  ],
  links: [
    {
      id: 'email',
      label: {
        'pt-BR': 'E-mail',
        en: 'Email',
      },
      href: 'mailto:thales.em@gmail.com',
      source: 'user-resume',
    },
    {
      id: 'linkedin',
      label: {
        'pt-BR': 'LinkedIn',
        en: 'LinkedIn',
      },
      href: 'https://www.linkedin.com/in/thalesemuller/',
      source: 'user-resume',
      identity: true,
    },
    {
      id: 'github',
      label: {
        'pt-BR': 'GitHub',
        en: 'GitHub',
      },
      href: 'https://github.com/ThalesMuller',
      source: 'github-profile',
      identity: true,
    },
  ],
} satisfies ProfileContent;

export const profiles = {
  'pt-BR': resolveProfile(profileContent, 'pt-BR'),
  en: resolveProfile(profileContent, 'en'),
};

export const profile = profiles[defaultLocale];

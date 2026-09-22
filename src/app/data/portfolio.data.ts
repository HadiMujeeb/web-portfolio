export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface SkillItem {
  name: string;
  /** Key into SKILL_ICONS */
  icon: string;
}

export interface SkillGroup {
  icon: string;
  title: string;
  items: SkillItem[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  /** Tailwind class for the coloured left edge */
  accent: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface SocialLink {
  label: string;
  icon: string;
  url: string;
}

export const PROFILE = {
  name: 'Hadi Mujeeb',
  initials: 'HM',
  role: 'Full Stack & AI Engineer',
  year: 2026,
  // heroImage:
  //   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  // heroImageFallback: 'https://placehold.co/800x800/111111/ffffff?text=Hadi+Mujeeb',
    heroImage: './assets/hadi-mujeeb.png',

  heroImageFallback:
    'https://placehold.co/800x800/111111/ffffff?text=Hadi+Mujeeb',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
];

export const HERO_STATS: Stat[] = [
  { value: '4+', label: 'Years Experience' },
  { value: '30+', label: 'Projects Shipped' },
  { value: '100%', label: 'Client Satisfaction' },
];

export const HIGHLIGHTS: Highlight[] = [
  {
    icon: 'fa-solid fa-code',
    title: 'Full Stack Mastery',
    description:
      'Proficient across the entire stack—from modern reactive frontends (React, Next.js, Tailwind) to resilient cloud-native backends (Node.js, Python, Go, PostgreSQL).',
  },
  {
    icon: 'fa-solid fa-brain',
    title: 'AI & Machine Learning',
    description:
      'Integrating cutting-edge LLMs, generative AI workflows, and intelligent APIs to build smart automated solutions and high-utility software agents.',
  },
  {
    icon: 'fa-solid fa-gauge-high',
    title: 'Performance & Scale',
    description:
      'Optimizing application throughput, minimizing latency, and implementing secure cloud architectures on AWS and Vercel for enterprise-grade reliability.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: 'fa-solid fa-laptop-code',
    title: 'Frontend',
    items: [
      { name: 'React.js', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'HTML5/CSS3', icon: 'html5' },
    ],
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'Python', icon: 'python' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'GraphQL', icon: 'graphql' },
    ],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Database & Cloud',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: 'redis' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Docker', icon: 'docker' },
    ],
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'AI & Tools',
    items: [
      { name: 'Gemini API', icon: 'gemini' },
      { name: 'OpenAI', icon: 'openai' },
      { name: 'Git / GitHub', icon: 'github' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'CI/CD', icon: 'cicd' },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Senior Full Stack Engineer',
    company: 'Apex Technologies • Remote',
    period: '2023 — Present',
    description:
      'Leading the development of cloud-scale microservices and responsive user interfaces. Architected real-time AI analytics pipelines that improved user retention by 35%.',
    accent: 'border-l-white',
  },
  {
    role: 'Full Stack Developer',
    company: 'Nexus Labs • San Francisco, CA',
    period: '2021 — 2023',
    description:
      'Developed and maintained robust React/Node.js web applications, optimized database query performance in PostgreSQL, and integrated third-party payment gateways and APIs.',
    accent: 'border-l-neutral-600',
  },
  {
    role: 'Frontend Developer Intern',
    company: 'PixelCraft Studio',
    period: '2020 — 2021',
    description:
      'Crafted responsive web interfaces using HTML5, Tailwind CSS, and JavaScript. Collaborated with UI/UX designers to implement pixel-perfect, accessible layouts.',
    accent: 'border-l-neutral-800',
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'Quantum AI Studio',
    description:
      'Generative workspace powered by multi-modal LLMs for real-time text and image creation with seamless export features.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'Gemini'],
    link: '#contact',
  },
  {
    title: 'FinPulse Analytics',
    description:
      'Real-time stock market data visualization and predictive portfolio tracking dashboard with low-latency WebSockets.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js'],
    link: '#contact',
  },
  {
    title: 'DevSync Workspace',
    description:
      'Collaborative code editor and document collaboration tool with live cursor sync and integrated version control.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tags: ['TypeScript', 'GraphQL'],
    link: '#contact',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com' },
  { label: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: 'https://linkedin.com' },
  { label: 'Twitter', icon: 'fa-brands fa-twitter', url: 'https://twitter.com' },
];

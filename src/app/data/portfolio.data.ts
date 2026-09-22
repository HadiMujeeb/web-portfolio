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
  highlights: string[];
  /** Tailwind class for the coloured left edge */
  accent: string;
}

export interface Education {
  title: string;
  institution: string;
  period: string;
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
  role: 'MEAN Stack Developer',
  availability: 'Available for MEAN Stack Developer Roles',
  summary:
    'Passionate MEAN Stack Developer with 1+ year of experience building scalable web applications using Angular, Node.js, Express.js, and MongoDB. Skilled in RESTful APIs, real-time features, authentication systems, and payment integrations. Experienced in ERP and production-grade applications within onsite and remote team environments, with a strong focus on clean code, performance optimization, and scalable solutions.',
  year: 2026,
  heroImage: './assets/hadi-mujeeb.png',
  heroImageFallback:
    'https://placehold.co/800x800/111111/ffffff?text=Hadi+Mujeeb',
  resumeFile: '/Hadi_Mujeeb_Resume.txt',
  resumeFileName: 'Hadi_Mujeeb_Resume.txt',
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Resume', href: '#resume' },
];

export const HERO_STATS: Stat[] = [
  { value: '1+', label: 'Years Experience' },
  { value: '2', label: 'Featured Projects' },
  { value: 'ERP', label: 'Production Apps' },
];

export const HIGHLIGHTS: Highlight[] = [
  {
    icon: 'fa-solid fa-code',
    title: 'MEAN Stack Development',
    description:
      'Building scalable web applications with Angular, Node.js, Express.js, and MongoDB — from reusable UI modules to stable backend APIs.',
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'APIs, Real-Time & Payments',
    description:
      'Experienced with RESTful APIs, WebSocket, WebRTC, authentication systems, Razorpay payments, and cloud image storage.',
  },
  {
    icon: 'fa-solid fa-gauge-high',
    title: 'Performance & Clean Architecture',
    description:
      'Improving Angular performance with lazy loading, OnPush change detection, and trackBy, while following MVC and clean architecture in onsite and remote teams.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    icon: 'fa-solid fa-laptop-code',
    title: 'Frontend',
    items: [
      { name: 'Angular', icon: 'angular' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Bootstrap', icon: 'bootstrap' },
      { name: 'HTML5/CSS3', icon: 'html5' },
      { name: 'Responsive Design', icon: 'html5' },
    ],
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express.js', icon: 'express' },
      { name: 'REST APIs', icon: 'express' },
      { name: 'WebSocket', icon: 'websocket' },
      { name: 'WebRTC', icon: 'webrtc' },
    ],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Database & Cloud',
    items: [
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'SQL', icon: 'postgresql' },
      { name: 'AWS (EC2, S3)', icon: 'aws' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Nginx', icon: 'nginx' },
    ],
  },
  {
    icon: 'fa-solid fa-screwdriver-wrench',
    title: 'Tools & Architecture',
    items: [
      { name: 'Git / GitHub', icon: 'github' },
      { name: 'GitHub Actions', icon: 'cicd' },
      { name: 'Postman', icon: 'postman' },
      { name: 'MVC Architecture', icon: 'cicd' },
      { name: 'Clean Architecture', icon: 'cicd' },
      { name: 'C (Basics)', icon: 'c' },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'MEAN Stack Developer',
    company: 'Synram Software Services Pvt Ltd • Madhya Pradesh, India (Onsite & Remote)',
    period: 'Jun 2025 — Present',
    highlights: [
      'Contributed to ERP-based enterprise application development within a collaborative team.',
      'Upgraded multiple Angular projects to newer versions while maintaining module compatibility.',
      'Improved Angular performance using lazy loading, OnPush change detection, and trackBy.',
      'Developed modules, features, and reusable components based on business requirements.',
      'Integrated RESTful APIs with backend services for stable and scalable applications.',
    ],
    accent: 'border-l-white',
  },
  {
    role: 'MEAN Stack Developer',
    company: 'Brototype • Kerala, India',
    period: 'Oct 2023 — Mar 2025',
    highlights: [
      'Completed intensive project-based training focused on MEAN stack technologies.',
      'Built multiple full-stack web applications using Angular, Node.js, Express.js, and MongoDB.',
      'Developed backend APIs and implemented authentication systems.',
      'Integrated payment gateways and cloud-based image storage.',
      'Collaborated on team projects and code reviews.',
    ],
    accent: 'border-l-neutral-600',
  },
];

export const EDUCATION: Education[] = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Manipal University Jaipur',
    period: '2026 — Expected 2029',
    accent: 'border-l-white',
  },
  {
    title: 'MEAN Stack Web Development',
    institution: 'Brototype, Kerala',
    period: 'Oct 2023 — Mar 2025',
    accent: 'border-l-neutral-600',
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'SpeakElse',
    description:
      'Real-time communication platform with video/audio calling via WebRTC and Socket.IO, plus authentication, Razorpay payments, and cloud image uploads. Backend deployed on AWS and frontend on Vercel.',
    image:
      'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=800&q=80',
    tags: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'WebRTC', 'Socket.IO', 'Razorpay'],
    link: '#contact',
  },
  {
    title: 'Sofazon',
    description:
      'Full-stack e-commerce web application with authentication, cart and order management, an admin dashboard, and Razorpay payment gateway integration.',
    image:
      'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'Bootstrap', 'Razorpay'],
    link: '#contact',
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com' },
  { label: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: 'https://linkedin.com' },
];

/* Typed content extracted from src/content/resume.md
 * (Francis Samande Declaro — ~/Downloads/Resume - 24092025.md).
 */

export const profile = {
  name: "Francis Samande Declaro",
  title: "Front-End Lead / Senior Engineer",
  location: "Singapore",
  phone: "(65) 9010 9146",
  email: "francis.declaro.092283@gmail.com",
  linkedin: "https://www.linkedin.com/in/francis-declaro-22b4366a/",
  yearsTotal: 18,
};

export type Skill = {
  name: string;
  years: number;
};

export const skills: Skill[] = [
  { name: "Javascript / JQuery", years: 18 },
  { name: "HTML / CSS3 / SASS / Bootstrap", years: 18 },
  { name: "PHP / Symfony / CakePHP / MySQL", years: 8 },
  { name: "React / Create React App / Mobx State Tree", years: 6 },
  { name: "Vite + React, MUI, Redux, RTK, Styled Components, React Forms", years: 5 },
  { name: "AWS, CI/CD", years: 5 },
  { name: "RequireJS / Kendo UI", years: 4 },
  { name: "Outsystems", years: 4 },
  { name: "NodeJS / Express / MongoDB / Webpack", years: 2 },
  { name: "Vue / Vuex / Cordova / TailwindCSS", years: 1.5 },
  { name: "React + D3.js, ApexCharts, Charts", years: 1 },
  { name: "Next.js, TailwindCSS, TypeScript", years: 0.5 },
  { name: "Java Spring Boot, MySQL", years: 0.5 },
  { name: "AI Prompts, GenAI, CoPilot", years: 0.5 },
];

export const tools: string[] = [
  "VS Code",
  "XCode",
  "IntelliJ",
  "Android Studio",
  "DBeaver",
  "Git",
  "Github",
  "Gitlab",
  "BitBucket",
  "Figma",
  "Sketch",
  "Photoshop",
  "Zeplin",
  "Notion",
  "Slack",
  "Miro",
  "Jira",
  "Jenkins",
  "SonarQube",
  "JFrog",
  "GitHub Copilot",
  "Jarvis",
];

export type Project = {
  name: string;
  url?: string;
  tags: string[];
};

export type Role = {
  company: string;
  role: string;
  dates: string;
  featured?: boolean;
  projects?: Project[];
  note?: string;
};

export const experience: Role[] = [
  {
    company: "RIDIK CLPS Inc — SEA (Nasdaq: CLPS)",
    role: "Lead / Senior Frontend Engineer",
    dates: "Dec 2024 — Present",
    featured: true,
    projects: [
      {
        name: "Pilot Insights",
        url: "https://ace.sq.com.sg/pilot-insights-web",
        tags: [
          "Vite React → Next.js migration",
          "JWT auth",
          "micro-frontends",
          "TailwindCSS",
          "MUI",
          "TypeScript",
          "Vitest + RTL",
          "D3.js charts",
          "chatbot",
          "AI prompts, Copilot, Jarvis",
          "SonarQube coverage",
        ],
      },
      {
        name: "ACE-UI",
        url: "https://ace.sq.com.sg/aceweb",
        tags: [
          "CRA → Vite React migration",
          "React Hooks",
          "Redux / Persist",
          "MUI / Bootstrap",
          "Apex Charts",
          "query builder",
          "Jest, Cypress",
        ],
      },
    ],
  },
  {
    company: "Tata Consultancy Services, Singapore",
    role: "Lead / Senior Frontend Engineer",
    dates: "Jan 2023 — Dec 2024",
    featured: true,
    projects: [
      {
        name: "CCE / SFC",
        url: "https://ace.sq.com.sg/cceweb",
        tags: ["Vite React / Hooks", "RTK / Persist", "MUI", "React Forms", "Vitest + RTL"],
      },
      {
        name: "SCOOT",
        url: "https://ace.sq.com.sg/scoot",
        tags: ["Vite React / Hooks", "RTK / Persist", "MUI", "React Forms"],
      },
      {
        name: "ACE-UI",
        url: "https://ace.sq.com.sg/aceweb",
        tags: ["CRA, React Hooks", "Redux / Persist", "Apex Charts", "query builder"],
      },
      {
        name: "CI / CD",
        tags: ["AWS", "Bitbucket", "Jira", "SonarQube", "JFrog", "Jenkins"],
      },
    ],
  },
  {
    company: "U3InfoTech, Singapore",
    role: "Lead / Senior Frontend Developer",
    dates: "Aug 2021 — Jan 2023",
    featured: true,
    projects: [
      {
        name: "CCE / SFC",
        url: "https://ace.sq.com.sg/cceweb",
        tags: ["Vite React / Hooks", "RTK / Persist", "MUI"],
      },
      {
        name: "ACE-UI",
        url: "https://ace.sq.com.sg/aceweb",
        tags: ["CRA, React Hooks", "Redux / Persist", "MUI / Bootstrap", "Apex Charts", "query builder"],
      },
      {
        name: "CI / CD",
        tags: ["AWS", "Bitbucket", "Jira", "SonarQube", "JFrog", "Jenkins"],
      },
    ],
  },
  {
    company: "Sciente / Great Eastern, Singapore",
    role: "Lead / Senior Frontend Developer",
    dates: "Feb 2021 — Aug 2021",
    featured: true,
    note: "Led front-end work for Great Eastern's digital insurance platforms.",
  },
  {
    company: "Sciente / Great Eastern, Singapore",
    role: "Senior Frontend Developer",
    dates: "Jun 2020 — Feb 2021",
    featured: true,
    projects: [
      {
        name: "leodesign.io + pattern sites, GE-app",
        tags: [
          "CI/CD, GitRunner, Linode, CloudFlare",
          "Vue / Vuex",
          "SCSS / TailwindCSS",
          "Node, Webpack, Cordova",
          "Storybook, Bit.dev, Lerna, Cypress",
        ],
      },
      { name: "AEM CMS", tags: ["content management"] },
      { name: "Responsive EDM email templates", tags: ["email"] },
    ],
  },
];

export const archive: (Role & { blurb: string })[] = [
  {
    company: "NCS Hub, Singapore",
    role: "UX/UI Lead",
    dates: "Jul 2019 — May 2020",
    blurb: "Design and UX leadership for NCS web products.",
  },
  {
    company: "NCS Hub, Singapore",
    role: "Application / Frontend Developer",
    dates: "Jun 2015 — Jun 2019",
    blurb:
      "Six portals — singtel-go.com, EboltWeb, CorpBiz, Opal, UCP, GE FutureState. React/CRA + MobX, RequireJS/Kendo, OutSystems, Node/Express.",
  },
  {
    company: "Eclaro Inc, Quezon City PH",
    role: "Senior UI / UX / Frontend / PHP Developer",
    dates: "Nov 2010 — Jun 2015",
    blurb: "AmericanTowns, GreenTowns, AARP local. CakePHP, jQuery, MongoDB / MySQL, social APIs.",
  },
  {
    company: "Netbooster-Asia | Yellowasp, PH",
    role: "Frontend Consultant / PHP Developer",
    dates: "Mar 2008 — Nov 2010",
    blurb: "Symfony, WordPress, LifeRay portal, Facebook apps. Cross-browser to the bone (IE6+).",
  },
  {
    company: "Thumbs InterActive Media, PH",
    role: "Web Developer (PHP / ASP)",
    dates: "Dec 2007 — Mar 2008",
    blurb: "Websites, CMS builds, IIS/Apache + PHP + MySQL hosting.",
  },
  {
    company: "ONEGCC, Ortigas PH",
    role: "Web Designer / Developer",
    dates: "Apr 2007 — Nov 2007",
    blurb: "PHP / Drupal / Joomla sites, Photoshop → HTML/CSS, open-source JS libraries.",
  },
  {
    company: "American Power Conversion, Cavite PH",
    role: "Manufacturing Engineer Tech",
    dates: "Jan 2006 — Feb 2007",
    blurb: "Production line, BOM, ECOs, process engineering — where the factory brain came from.",
  },
];

export type Education = {
  school: string;
  degree: string;
  dates: string;
};

export const education: Education[] = [
  {
    school: "De La Salle, Dasmarinas Cavite, PH",
    degree: "BS Computer Science",
    dates: "Jun 2001 — Mar 2005",
  },
  {
    school: "Colegio San Agustin, Makati, PH",
    degree: "Elementary & High School",
    dates: "Jun 1991 — Mar 2001",
  },
];

/* Words that ride the hero conveyor belt */
export const beltItems = [
  "react",
  "next.js",
  "typescript",
  "vite",
  "tailwindcss",
  "redux / rtk",
  "d3.js",
  "node",
  "aws",
  "ci/cd",
  "vue",
  "php",
  "18 yrs",
  "genai",
];

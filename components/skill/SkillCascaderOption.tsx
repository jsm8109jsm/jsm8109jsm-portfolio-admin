interface Option {
  value: string;
  label: string;
  children?: Option[];
}

export const options: Option[] = [
  {
    value: "languages",
    label: "Languages",
    children: [
      {
        value: "c",
        label: "C",
      },
      {
        value: "cpp",
        label: "C++",
      },
      {
        value: "html",
        label: "HTML5",
      },
      {
        value: "css",
        label: "CSS3",
      },
      {
        value: "js",
        label: "JavaScript",
      },
      {
        value: "ts",
        label: "TypeScript",
      },
      {
        value: "python",
        label: "Python",
      },
    ],
  },
  {
    value: "ajax",
    label: "Ajax",
    children: [
      {
        value: "axios",
        label: "Axios",
      },
    ],
  },
  {
    value: "tools",
    label: "Tools",
    children: [
      {
        value: "git",
        label: "git",
      },
      {
        value: "github",
        label: "GitHub",
      },
      {
        value: "vsc",
        label: "Visual Studio Code",
      },
      {
        value: "gitkraken",
        label: "GitKraken",
      },
      {
        value: "figma",
        label: "Figma",
      },
      {
        value: "notion",
        label: "Notion",
      },
      {
        value: "slack",
        label: "slack",
      },
    ],
  },
  {
    value: "fw",
    label: "Front-end F/W, Library",
    children: [
      {
        value: "react",
        label: "React.js",
      },
      {
        value: "next",
        label: "Next.js",
      },
    ],
  },
  {
    value: "designs",
    label: "Design System",
    children: [
      {
        value: "sass",
        label: "Sass",
      },
      {
        value: "cssmodules",
        label: "CSS MODULES",
      },
      {
        value: "styledcomponents",
        label: "Styled-Components",
      },
      {
        value: "mui",
        label: "Material UI",
      },
      {
        value: "emotion",
        label: "Emotion.js",
      },
      {
        value: "tailwind",
        label: "tailwindcss",
      },
    ],
  },
  {
    value: "state",
    label: "State Management",
    children: [
      {
        value: "redux",
        label: "Redux",
      },
      {
        value: "recoil",
        label: "Recoil",
      },
      {
        value: "reactquery",
        label: "React Query",
      },
    ],
  },
  {
    value: "deployment",
    label: "Deployment",
    children: [
      {
        value: "s3",
        label: "S3",
      },
      {
        value: "route53",
        label: "Route 53",
      },
    ],
  },
];

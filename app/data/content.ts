export const profile = {
    name: 'Mathias Jørgensen',
    role: 'Customer Success Coordinator',
    tagline: 'Service by day · coding by evening · gaming by night',
    location: 'Denmark',
    email: 'mathias@jorqensen.dev',
    github: 'jorqensen',
    about: [
        {
            title: 'The day job',
            icon: 'i-ph-headset-duotone',
            text: 'Hi, I\'m Mathias, a Danish sarcasm enthusiast who helps people for a living. As a Customer Success Coordinator at Ordbogen A/S, my job is making sure people actually get what they came for, and I\'m happiest when a problem that looked hopeless turns out to be a five-minute fix.',
        },
        {
            title: 'Writing code',
            icon: 'i-ph-code-duotone',
            text: 'So how did I end up writing code? Curiosity, mostly, plus a truly unreasonable number of hours in front of a PC. I wanted to know how things worked, kept pulling at the thread, and never really stopped. Taking things apart to understand them is a decent foundation for both support and software.',
        },
        {
            title: 'Free time',
            icon: 'i-ph-game-controller-duotone',
            text: 'When I clock out, I\'d rather be with the people I care about. Most of my free time goes to friends and family, whether that\'s a long dinner, a lazy weekend, or just hanging out. The rest goes to gaming, where I\'m more of a completionist and collector than a competitor. I\'ll happily chase a game to 100%, and my Steam library keeps growing faster than I can play it.',
            link: { label: 'View my Steam profile', href: 'https://steamcommunity.com/id/jorqensen' },
        },
    ],
    skills: [
        { label: 'VS Code', icon: 'i-ph-code-duotone' },
        { label: 'PhpStorm', icon: 'i-ph-lightning-duotone' },
        { label: 'PHP', icon: 'i-ph-brackets-curly-duotone' },
        { label: 'Go', icon: 'i-ph-file-code-duotone' },
        { label: 'React', icon: 'i-ph-atom-duotone' },
        { label: 'Vue.js', icon: 'i-ph-file-vue-duotone' },
        { label: 'SolidJS', icon: 'i-ph-circles-three-duotone' },
        { label: 'Svelte', icon: 'i-ph-fire-duotone' },
        { label: 'PostgreSQL', icon: 'i-ph-database-duotone' },
        { label: 'Bun', icon: 'i-ph-bread-duotone' },
        { label: 'Deno', icon: 'i-ph-hexagon-duotone' },
        { label: 'Bash', icon: 'i-ph-terminal-window-duotone' },
        { label: 'Linux', icon: 'i-ph-linux-logo-duotone' },
        { label: 'Windows', icon: 'i-ph-windows-logo-duotone' },
        { label: 'Ansible', icon: 'i-ph-gear-six-duotone' },
        { label: 'Docker', icon: 'i-ph-cube-duotone' },
    ],
};

export const experience = [
    {
        role: 'Customer Success Coordinator',
        company: 'Ordbogen A/S',
        period: '2022 – Present',
        tags: ['IT', 'Service', 'Sales'],
    },
    {
        role: 'Software Developer',
        company: 'Customers 1st',
        period: '2022',
        tags: ['PHP', 'Angular', 'MySQL'],
    },
    {
        role: 'Head of Development',
        company: 'Kviknet ApS',
        period: '2021 – 2022',
        tags: ['PHP', 'JavaScript', 'DevOps'],
    },
    {
        role: 'Customer Service Representative',
        company: 'Bambora',
        period: '2021',
        tags: ['Salesforce', 'Service', 'IT'],
    },
    {
        role: 'Customer Service Representative',
        company: 'Kviknet ApS',
        period: '2020 – 2021',
        tags: ['Sales', 'Support', 'IT'],
    },
    {
        role: 'Customer Service Agent',
        company: 'YouSee A/S',
        period: '2019 – 2020',
        tags: ['Sales', 'Support', 'IT'],
    },
    {
        role: 'Developer & Support',
        company: 'cHosting ApS',
        period: '2017',
        tags: ['PHP', 'JS', 'MySQL', 'IT'],
    },
    {
        role: 'Teaching Assistant',
        company: 'Hjallese Fritidsklub',
        period: '2017',
        tags: ['People'],
    },
    {
        role: 'Fitter',
        company: 'Montør Gruppen',
        period: '2016',
        tags: ['Construction'],
    },
    {
        role: 'Service Assistant',
        company: 'SuperBrugsen',
        period: '2012 – 2016',
        tags: ['People'],
    },
];

export const openSource = [
    {
        title: 'obtain',
        description: 'Fetch commonly used files remotely to your local machine',
        tags: ['Go', 'CLI'],
        href: 'https://github.com/jorqensen/obtain',
    },
    {
        title: 'leap',
        description: 'A bookmark manager for directories in your CLI with a TUI for browsing.',
        tags: ['CLI', 'TUI'],
        href: 'https://github.com/jorqensen/leap',
    },
    {
        title: 'whoami',
        description: 'The source code for my website',
        tags: ['Nuxt'],
        href: 'https://github.com/jorqensen/whoami',
    },
    {
        title: 'skills',
        description: 'A collection of agentic coding skills',
        tags: ['AI'],
        href: 'https://github.com/jorqensen/skills',
    },
];

export const socials = [
    { label: 'GitHub', href: `https://github.com/${profile.github}`, icon: 'i-ph-github-logo-duotone' },
    { label: 'X', href: 'https://x.com/jorqensen', icon: 'i-ph-x-logo-duotone' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jorqensen', icon: 'i-ph-linkedin-logo-duotone' },
    { label: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/jorqensen', icon: 'i-ph-beer-stein-duotone' },
];

export const uses = [
    {
        title: 'PC',
        description: 'The specs of my custom-built PC.',
        items: [
            { name: 'Motherboard', description: 'Asus B650M-A Prime Wi-Fi II', icon: 'i-ph-circuitry-duotone' },
            { name: 'CPU', description: 'AMD Ryzen 7 7800X3D', icon: 'i-ph-cpu-duotone' },
            { name: 'Cooling', description: 'Corsair H100x RGB Elite 240mm', icon: 'i-ph-fan-duotone' },
            { name: 'Storage', description: 'Kingston Fury Renegade 2TB NVMe PCIe 4.0 SSD', icon: 'i-ph-hard-drive-duotone' },
            { name: 'Memory', description: 'Kingston Fury Beat 32GB DDR5-6000', icon: 'i-ph-memory-duotone' },
            { name: 'Graphics Card', description: 'Asus Radeon RX 7900 GRE 16GB', icon: 'i-ph-graphics-card-duotone' },
            { name: 'Tower', description: 'Corsair 4000D Airflow Tempered Glass (White)', icon: 'i-ph-computer-tower-duotone' }
        ],
    },
    {
        title: 'Peripherals',
        description: 'The gear around the PC that I use every day.',
        items: [
            { name: 'Monitors', description: 'Samsung LC32G5xT & ASUS VG249', icon: 'i-ph-desktop-duotone' },
            { name: 'Keyboard', description: 'Logitech MX Keys', icon: 'i-ph-keyboard-duotone' },
            { name: 'Mouse', description: 'Logitech MX Master 4S', icon: 'i-ph-mouse-duotone' },
            { name: 'Headphones', description: 'HyperX Cloud 3 & Earbuds', icon: 'i-ph-headphones-duotone' },
            { name: 'Microphone', description: 'Blue Baby Bottle', icon: 'i-ph-microphone-duotone' },
            { name: 'Phone', description: 'Google Pixel 7 Pro', icon: 'i-ph-device-mobile-duotone' }
        ],
    },
    {
        title: 'Software',
        description: 'The apps and tools I reach for when building things.',
        items: [
            { name: 'Editor', description: 'Zed & VSCode', icon: 'i-ph-code-duotone' },
            { name: 'Shell', description: 'Fish shell for interactive use, bash for scripting', icon: 'i-ph-terminal-window-duotone' },
            { name: 'Starship', description: 'Fast, customizable shell prompt', icon: 'i-ph-rocket-launch-duotone' },
            { name: 'Browser', description: 'Vivaldi & Chrome', icon: 'i-ph-globe-duotone' }
        ],
    },
];

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Full Stack' | 'Frontend' | 'Web Application';
  date: string;
  techStack: string[];
  description: string;
  bullets: string[];
  githubUrl: string;
  liveUrl?: string;
  highlights: string[];
  featured: boolean;
  demoType: 'chai' | 'todo' | 'restaurant' | 'spotify';
}

export interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  period: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  score: string;
  location: string;
  details?: string[];
}

export interface TrainingItem {
  organization: string;
  program: string;
  period: string;
  topics: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Gaurav Soni",
    role: "Full Stack Developer",
    yearsOfExperience: "2+ Years",
    location: "New Delhi, Delhi, India",
    email: "gsoni7424@gmail.com",
    phone: "08851415479",
    phoneInternational: "+91 8851415479",
    github: "https://github.com/gsoni7424",
    linkedin: "https://linkedin.com",
    portfolioUrl: "https://portfolio.gauravsoni.dev",
    customDomain: "portfolio.gauravsoni.dev",
    bio: "Full-Stack Developer with 3+ years of experience in building scalable and high-performing web applications. Aiming to specialize in React and Node.js Full-stack development.",
    status: "Available for full-time roles & freelance contracts",
    quickStats: [
      { label: "Dynamic Sites Built", value: "20+" },
      { label: "API Latency Reduction", value: "40%" },
      { label: "CI/CD Deployment Speedup", value: "60%" },
      { label: "Mobile Traffic Boost", value: "+35%" }
    ]
  },
  experience: [
    {
      company: "People-Per-Hour (Freelancer Platform)",
      role: "Full-Stack Developer",
      type: "Remote / Freelance",
      period: "August 2025 – Present",
      bullets: [
        "Architected and deployed 20+ dynamic websites using React and Node.js, directly boosting client engagement by 30%.",
        "Engineered and optimized RESTful APIs in Node.js/Express, slashing server response and total data load time by 40%.",
        "Streamlined continuous integration and delivery by setting up automated CI/CD pipelines, cutting manual release overhead by 60%.",
        "Crafted mobile-first, highly responsive user interfaces that expanded client mobile traffic by 35%.",
        "Spearheaded legacy code migrations to modern React and Next.js frameworks, lowering ongoing software maintenance costs by 20%."
      ],
      metrics: [
        { label: "Sites Delivered", value: "20+" },
        { label: "Load Time", value: "-40%" },
        { label: "Release Overhead", value: "-60%" },
        { label: "Maintenance Cost", value: "-20%" }
      ]
    }
  ] as ExperienceItem[],
  projects: [
    {
      id: "spotify-clone",
      title: "Spotify Clone (Music Player)",
      tagline: "Web-Based Audio Streaming Experience with Local Storage & Web Audio API",
      category: "Frontend",
      date: "November 2025",
      techStack: ["HTML5", "CSS3", "JavaScript", "Web Audio API", "Local Storage", "UI Design"],
      description: "A faithful recreation of Spotify's desktop web player. Includes real playback controls, track progress seeking, dynamic queue rendering, and local storage caching for offline listening.",
      bullets: [
        "Built a Spotify Clone web app using HTML, CSS, and JavaScript, replicating the core functionality of a music streaming platform.",
        "Integrated play, pause, next song, and scrubbing seekbar controls, offering users an engaging and interactive playback experience.",
        "Fetched and managed songs using JavaScript APIs and local storage to enable quick loading and offline playback.",
        "Implemented dynamic song rendering and active track highlighting for a realistic player interface with clean visuals."
      ],
      highlights: ["Playback Engine", "Active Track Sync", "Offline Caching", "Spotify UI"],
      githubUrl: "https://github.com/gsoni7424/spotify-clone",
      liveUrl: "https://spotify-clone-mus.netlify.app",
      featured: true,
      demoType: "spotify"
    },
    {
      id: "restaurant-order-booking",
      title: "Restaurant Order & Table Booking Website",
      tagline: "Interactive Dine-In Reservation & Dynamic Food Ordering Platform",
      category: "Web Application",
      date: "October 2025",
      techStack: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Local Storage", "Payment Flow"],
      description: "A complete customer-facing restaurant web platform featuring dynamic categorized menus, instant cart modifications, online checkout redirect, and interactive table seating reservations.",
      bullets: [
        "Developed a responsive restaurant order booking website using HTML, CSS, and JavaScript, ensuring seamless usability across all devices.",
        "Designed an interactive menu system allowing users to browse and add food items to the cart dynamically.",
        "Implemented a cart functionality where users can view, update, and remove selected items before checkout.",
        "Integrated a 'Proceed to Payment' feature that redirects users to a dedicated payment page for order completion.",
        "Added a table booking option enabling customers to reserve seats conveniently through an interactive form."
      ],
      highlights: ["Dynamic Cart", "Table Reservation", "Interactive Menu", "Order Checkout"],
      githubUrl: "https://github.com/gsoni7424/restaurant-order-booking",
      liveUrl: "https://restaurent-order-booking.netlify.app",
      featured: true,
      demoType: "restaurant"
    },
    {
      id: "get-me-a-chai",
      title: "Get-Me-A-Chai",
      tagline: "Crowdfunding & Creator Support Platform inspired by Patreon",
      category: "Full Stack",
      date: "September 2025",
      techStack: ["Next.js", "Express.js", "MongoDB", "Razorpay", "NextAuth.js", "Tailwind CSS"],
      description: "A comprehensive creator support and micro-patronage web app allowing creators to raise financial contributions ('buy a chai') directly from their loyal audience with automated payment receipts.",
      bullets: [
        "Developed a Patreon-inspired crowdfunding platform allowing creators to accept micro-donations seamlessly.",
        "Engineered robust RESTful APIs to handle financial transactions, user accounts, and campaign analytics.",
        "Integrated NextAuth.js for secure role-based OAuth and credential authentication with dynamic form validation.",
        "Integrated Razorpay payment gateway with automated real-time webhooks, instant checkout verification, and donor receipts.",
        "Constructed dual dynamic dashboards for creators (earnings, backers, payout status) and supporters (pledge history)."
      ],
      highlights: ["Razorpay Payments", "NextAuth Security", "Creator Analytics", "Dual Dashboards"],
      githubUrl: "https://github.com/gsoni7424/get-me-a-chai",
      liveUrl: "https://get-me-a-chai.vercel.app",
      featured: true,
      demoType: "chai"
    },
    {
      id: "todo-list-webapp",
      title: "Todo-List WebApp",
      tagline: "High-Performance Task Manager with Real-Time State & MongoDB",
      category: "Full Stack",
      date: "September 2025",
      techStack: ["React.js", "Vite", "Tailwind CSS", "MongoDB", "Express.js", "REST APIs"],
      description: "A fast, responsive task management application built with Vite and React. Supports full CRUD operations, persistent MongoDB storage, and fluid drag/filter states.",
      bullets: [
        "Built a responsive To-Do List web app using React.js with the Vite build tool for fast development and optimized performance.",
        "Implemented CRUD operations to add, update, and delete tasks, with all todos stored securely in MongoDB.",
        "Utilized Tailwind CSS to design a clean, modern, and fully responsive UI experience.",
        "Focused on smooth user experience with efficient state management and real-time task updates."
      ],
      highlights: ["Vite Optimized", "MongoDB Persistence", "Real-Time CRUD", "Tailwind Design"],
      githubUrl: "https://github.com/gsoni7424/todo-list-webapp",
      liveUrl: "https://todo-list-1-8web.onrender.com/",
      featured: false,
      demoType: "todo"
    }
  ] as ProjectItem[],
  skills: {
    languages: [
      { name: "JavaScript (ES6+)", level: 92, badge: "Core" },
      { name: "TypeScript", level: 85, badge: "Strong" },
      { name: "HTML5", level: 95, badge: "Expert" },
      { name: "CSS3", level: 92, badge: "Expert" }
    ],
    frontend: [
      { name: "React.js", level: 92, badge: "Core" },
      { name: "Next.js", level: 88, badge: "Full Stack" },
      { name: "Tailwind CSS", level: 94, badge: "Expert" },
      { name: "Vite", level: 90, badge: "Build Tool" },
      { name: "Responsive Design", level: 95, badge: "Mobile First" }
    ],
    backend: [
      { name: "Node.js", level: 88, badge: "Core" },
      { name: "Express.js", level: 90, badge: "API Engine" },
      { name: "RESTful APIs", level: 92, badge: "Architect" },
      { name: "NextAuth.js", level: 84, badge: "Auth" },
      { name: "Razorpay Integration", level: 86, badge: "Payments" }
    ],
    databases: [
      { name: "MongoDB", level: 88, badge: "NoSQL" },
      { name: "Mongoose", level: 85, badge: "ODM" },
      { name: "Local Storage / IndexedDB", level: 95, badge: "Client State" }
    ],
    tools: [
      { name: "Git & GitHub", level: 90, badge: "Version Control" },
      { name: "VS Code", level: 95, badge: "IDE" },
      { name: "CI/CD Automation", level: 82, badge: "Pipelines" },
      { name: "Postman", level: 88, badge: "API Testing" },
      { name: "npm / yarn / pnpm", level: 90, badge: "Package Mgmt" }
    ],
    competencies: [
      "Object-Oriented Programming (OOPS)",
      "RESTful API Design & Integration",
      "CI/CD Pipeline Automation",
      "Full-Stack State Management",
      "Clean Architecture & Code Modularity",
      "Cross-Browser Responsive Layouts",
      "Agile & Remote Team Collaboration",
      "Effective Technical Communication"
    ]
  },
  education: [
    {
      institution: "Zakir Husain Delhi College (University of Delhi)",
      degree: "Bachelor of Arts (Program)",
      period: "2020 – 2023",
      score: "7.6 CGPA",
      location: "New Delhi, Delhi",
      details: [
        "Graduated with a 7.6 CGPA cumulative academic standing.",
        "Active member of university digital initiatives and student collaboration groups."
      ]
    }
  ] as EducationItem[],
  trainings: [
    {
      organization: "Coding Ninjas",
      program: "Full Stack Web Development",
      period: "May 2025 – October 2025",
      topics: [
        "Advanced Backend Architecture (Node.js, Express, MongoDB, REST APIs)",
        "Modern Frontend Engineering (React.js, Component Lifecycle, Hooks, State)",
        "Data Structures & Algorithms in JavaScript",
        "Industry Best Practices: Modular Code, Clean Patterns, and Git Workflows"
      ]
    }
  ] as TrainingItem[]
};

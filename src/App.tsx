
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  DATA                                      */
/* -------------------------------------------------------------------------- */

const portrait =
  "https://res.cloudinary.com/dswa5docr/image/upload/v1789320949/e1e00fcd-6007-489b-8b5e-0328b57550cf.png";

const aboutImage =
  "https://res.cloudinary.com/dswa5docr/image/upload/v1789319615/ai_generated_laptop_playing_headshot_gcvrou.png";

const demoImages = {
  portrait:
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1600&q=90",
  developer:
    "https://flowzi.pt/metodo/metodo-03-desenvolvimento-960.jpg",
  abstract:
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=90",
  architecture:
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=90",
  desk:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=90",
  night:
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=90",
  screen:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=90",
};

const socialLinks: { label: string; href: string; icon: React.ElementType }[] = [
  {
    label: "GitHub",
    href: "https://github.com/Roshan0612",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/roshan-gawade-469bb422a/",
    icon: Linkedin,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Roshan0612/",
    icon: ({ size = 15 }: { size?: number }) => (
      <span
        className="flex items-center justify-center rounded-[4px] border border-[#c9ff57]/60 bg-[#c9ff57]/10 font-black text-[#c9ff57]"
        style={{ width: size, height: size, fontSize: Math.max(size - 8, 9) }}
      >
        LC
      </span>
    ),
  },
  {
    label: "Email",
    href: "mailto:roshangawade0612@gmail.com",
    icon: Mail,
  },
];

const projects = [
  {
    title: "Autozynq",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1786435986/e566bba0-e7c0-49f3-b11d-c252cc55845f.png",
    demo: demoImages.screen,
    description:
      "Built a production-ready Zapier/Make-style automation platform with a visual node-based builder and real-time workflow execution. Supports webhooks, Google Forms/Sheets triggers, retries, and error handling. Includes 15+ integration nodes, execution monitoring, idempotency, and secure OAuth via NextAuth.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "React Flow",
      "Prisma ORM",
      "PostgreSQL",
      "NextAuth",
      "TailwindCSS",
      "Shadcn UI",
      "Google APIs",
      "OpenAI/Grok AI",
      "Zod",
      "Node.js",
    ],
    github: "https://github.com/Roshan0612/Autozynq",
    live: "https://autozynq-9bs2.vercel.app/",
    status: "Currently Working",
  },
  {
    title: "FitTrack",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1762323535/WhatsApp_Image_2025-11-05_at_11.48.43_6b3fe802_lxbfdq.jpg",
    demo: demoImages.developer,
    description:
      "Full-stack gym management application with admin and user portals, exercise and diet management, coupons, subscriptions, progress tracking, calorie monitoring and JWT-based role authentication.",
    tech: [
      "React.js",
      "Tailwind",
      "CSS",
      "Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "JWT",
    ],
    github: "https://github.com/Roshan0612/FitTrack",
    live: "https://tinyurl.com/29t4mtyj",
  },
  {
    title: "Vyaparix",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1788970839/c040e2ef-e478-4216-92df-c252c8773c19.png",
    demo: demoImages.architecture,
    description:
      "B2B marketplace for industrial and commercial products, suppliers and buying opportunities. Includes a Next.js storefront, Express API, PostgreSQL/Prisma backend, enquiry flow, admin management and category/company discovery.",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Express 5",
      "PostgreSQL",
      "Prisma",
      "JWT",
      "bcryptjs",
      "Zod",
    ],
    github: "https://github.com/Roshan0612/Vyaparix",
    live: "https://client-gamma-eight-44.vercel.app/",
  },
  {
    title: "Tribal E-Commerce",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1762324261/WhatsApp_Image_2025-04-02_at_10.20.41_f9ee9fd7_fu6ycs.jpg",
    demo: demoImages.abstract,
    description:
      "Full-stack e-commerce application for tribal communities using MERN, Razorpay and JWT role authentication, with product categorization, cart functionality and support for multiple tribal profiles and listings.",
    tech: [
      "React.js",
      "Tailwind",
      "CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "JWT",
    ],
    github: "https://github.com/Roshan0612/tribesHub-E_marketplace",
    live: "#",
  },
  {
    title: "SpeakForge",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1788459949/speakForge_Logo_ddzwfs.png",
    demo: demoImages.night,
    description:
      "Communication training application for interviews, debates, storytelling and pressure responses with AI-driven coaching, voice analysis, session scoring and progress tracking.",
    tech: [
      "React Native",
      "Expo",
      "Express",
      "Prisma",
      "PostgreSQL",
      "JWT",
      "AI Analysis",
      "Voice AI",
    ],
    github: "https://github.com/Roshan0612/SpeakForge",
    live: "#",
  },
  {
    title: "Marvedge Screen Recorder",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1789326178/fb2494c8-bc5a-4bcc-a89d-b74f9e4e5f63.png",
    demo: demoImages.screen,
    description:
      "Lightweight screen recording web application for quick captures and sharing.",
    tech: [
      "Nextjs.js",
      "Typescript",
      "AWS",
      "Tailwind CSS",
      "FFMPEG",
      "MediaRecorder API",
    ],
    github: "https://github.com/Roshan0612/marvedge-screen-recorder",
    live: "https://marvedge-screen-recorder.onrender.com/",
  },
  {
    title: "AI Workflow",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1789326077/f41b4b69-d831-460d-8715-26ce65ed0c1c.png",
    demo: demoImages.abstract,
    description: "AI-powered workflow project.",
    tech: ["React", "Node.js", "AI", "APIs"],
    github: "https://github.com/Roshan0612/ai-workflow",
    live: "https://ai-workflow-hcko.onrender.com/",
  },
  {
    title: "Collaborative Task Manager",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1767893537/8ff7fb06-5a5f-4f1b-9d7b-4c56f83ef2a0.png",
    demo: demoImages.desk,
    description: "Collaborative task management application.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Roshan0612/Collaborative-Task-Manager",
    live: "https://collaborative-task-manager-1-r7i4.onrender.com/",
  },
  {
    title: "OwnPresences",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1767893796/35d47676-dfa3-47aa-8e6f-ff0522166623.png",
    demo: demoImages.night,
    description: "Web presence and profile project.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Roshan0612/ownpresence",
    live: "https://ownpresences.onrender.com",
  },
  {
    title: "GigFlow",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1768227951/709c761e-7522-42fc-84d6-9f54353e710a.png",
    demo: demoImages.architecture,
    description: "Freelance gig marketplace application.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Roshan0612/gigflow",
    live: "https://gigflow-client.onrender.com",
  },
  {
    title: "Makeup Studio Website",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1762324496/WhatsApp_Image_2025-11-05_at_12.03.50_358abeba_b4rirx.jpg",
    demo: demoImages.portrait,
    description: "Responsive modern website for a makeup studio.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "#",
    live: "https://www.ratikamakeup.studio/",
  },
  {
    title: "Webtruvo",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1770229124/e0f59266-ddff-43bd-b1cc-f2b3e2a4a22d.png",
    demo: demoImages.developer,
    description: "Web project built for experimentation and practical development.",
    tech: ["React", "Node.js", "Web"],
    github: "https://github.com/Roshan0612/webtruvo",
    live: "https://webtruvo.onrender.com/",
  },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Vivirelle Lifestyle & Fragrances Pvt Ltd",
    location: "Remote",
    period: "Jan 2026 – Present",
    type: "Internship",
    description:
      "Developed and deployed an internal product inventory management dashboard using React.js and Node.js/Express, reducing stock-tracking discrepancies and improving operational efficiency.",
    achievements: [
      "Designed and integrated RESTful APIs to support product catalog filtering, enabling sorting of lifestyle items by fragrance notes, price, and availability.",
      "Optimized PostgreSQL queries, improving page load performance for high-resolution product imagery by 25%.",
      "Collaborated with the founding team in an Agile workflow to translate business requirements into scalable technical features and production-ready solutions.",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "JavaScript",
      "HTML",
      "CSS",
    ],
    website: "https://edpcurators.com",
  },
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Hybrid",
    period: "June 2025 – Present",
    type: "Freelance",
    description:
      "Designed and developed fully responsive, modern websites for 5 clients using React.js, JavaScript, Tailwind CSS, Vite, HTML, and CSS, enhancing online visibility and engagement.",
    achievements: [
      "Built 10+ dynamic and reusable UI components with strong type safety, improving user experience and maintainability by 25%.",
      "Collaborated closely with clients to gather requirements, incorporate feedback, and deliver customized, high-performance solutions on schedule.",
    ],
    technologies: [
      "React.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "HTML",
      "CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    website: "https://www.ratikamakeup.studio",
  },
  {
    title: "Web Developer Intern",
    company: "SLRTCE",
    location: "Mumbai, India",
    period: "July 2024 – Aug 2024",
    type: "Internship",
    description:
      "Developed a responsive weather web application during a one-month internship, integrating real-time weather data and building an intuitive interface for users.",
    achievements: [
      "Designed and implemented a responsive frontend using HTML, CSS, JavaScript, and React.",
      "Integrated a weather API to retrieve and display real-time weather conditions and forecast data.",
      "Built dynamic UI components that updated weather information based on API responses.",
    ],
    technologies: ["React.js", "JavaScript", "HTML", "CSS", "REST API"],
    website: "",
  },
];

const education = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "Shree L.R Tiwari College of Engineering",
    place: "Mumbai, India",
    period: "09/2022 - 06/2026",
    result: "8.166 CGPA",
    index: "01",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1789320465/2bdea6a2-62bd-474d-8392-cc0964b2b415.png",
  },
  {
    degree: "HSC In Science PCMB",
    school: "Kankavli College Kankavli",
    place: "Kankavli Sindhudurg, India",
    period: "06/2020 - 03/2021",
    result: "82.83%",
    index: "02",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1789320501/cda86e25-723d-4ad7-bb49-0fbe8ef206d3.png",
  },
  {
    degree: "SSC",
    school: "Vidyamandir Highschool Kankavli",
    place: "Kankavli Sindhudurg, India",
    period: "06/2018 - 03/2019",
    result: "84.80%",
    index: "03",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1789320557/c1ee1b3c-b164-48c6-9a1b-6313d1bb9bc5.png",
  },
];

const skillGroups = {
  Frontend: [
    "React.js",
    "Next.js",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Bootstrap",
  ],
  Backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "JWT",
    "OAuth",
    "NextAuth",
    "Java",
    "C",
  ],
  Databases: ["MongoDB", "PostgreSQL", "MySQL", "Prisma ORM"],
  "Tools & Cloud": [
    "Docker",
    "Git & GitHub",
    "AWS",
    "Postman",
    "VS Code",
    "GSAP",
  ],
  "Modern Stack": [
    "React Flow",
    "NextAuth",
    "Google APIs",
    "AI Integration",
    "FFmpeg",
    "Razorpay",
  ],
};

/* -------------------------------------------------------------------------- */
/*                              GLOBAL STYLE                                  */
/* -------------------------------------------------------------------------- */

const GlobalStyle = () => (
  <style>{`
    :root {
      --bg: #080808;
      --fg: #f3f1eb;
      --muted: #8b8b88;
      --line: rgba(255,255,255,.11);
      --soft: rgba(255,255,255,.055);
      --accent: #c9ff57;
    }

    html {
      scroll-behavior: auto;
      background: var(--bg);
    }

    body {
      margin: 0;
      background: var(--bg);
      color: var(--fg);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      overflow-x: hidden;
    }

    * {
      box-sizing: border-box;
    }

    ::selection {
      background: var(--accent);
      color: #090909;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button,
    input,
    textarea {
      font: inherit;
    }

    .portfolio-shell {
      background:
        radial-gradient(circle at 15% 10%, rgba(201,255,87,.035), transparent 24%),
        radial-gradient(circle at 85% 35%, rgba(255,255,255,.025), transparent 25%),
        #080808;
    }

    .noise {
      position: fixed;
      inset: 0;
      z-index: 80;
      pointer-events: none;
      opacity: .035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
    }

    .display {
      font-family: Arial, Helvetica, sans-serif;
      letter-spacing: -.075em;
    }

    .outline-text {
      color: transparent;
      -webkit-text-stroke: 1px rgba(255,255,255,.22);
    }

    .hairline {
      height: 1px;
      background: var(--line);
    }

    .magnetic {
      will-change: transform;
    }

    .project-image {
      transform: translateZ(0);
      will-change: transform;
    }

    .hide-scrollbar {
      scrollbar-width: none;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .cursor-dot {
      position: fixed;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent);
      pointer-events: none;
      z-index: 1000;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    }

    .cursor-ring {
      position: fixed;
      width: 34px;
      height: 34px;
      border: 1px solid rgba(255,255,255,.7);
      border-radius: 50%;
      pointer-events: none;
      z-index: 999;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    }

    .mobile-intro-sequence {
      display: none;
    }

    @media (max-width: 900px) {
      .cursor-dot,
      .cursor-ring {
        display: none;
      }
    }

    @media (max-width: 900px) {
      .mobile-intro-desktop-content {
        display: none !important;
      }

      .mobile-intro-sequence {
        position: absolute;
        inset: 0;
        z-index: 10;
        display: block !important;
        overflow: hidden;
        background:
          radial-gradient(circle at 79% 28%, rgba(201,255,87,.09), transparent 25%),
          #080808;
      }

      .mobile-intro-sequence::after {
        position: absolute;
        inset: 0;
        z-index: 5;
        pointer-events: none;
        content: "";
        background: linear-gradient(180deg, rgba(8,8,8,.2), transparent 35%, rgba(8,8,8,.7));
      }

      .mobile-intro-grain {
        position: absolute;
        inset: 0;
        z-index: 6;
        pointer-events: none;
        opacity: .06;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='mobile-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23mobile-noise)' opacity='.65'/%3E%3C/svg%3E");
      }

      .mobile-intro-portrait-frame {
        position: absolute;
        inset: 0 0 0 18%;
        overflow: hidden;
        transform-origin: 70% 50%;
        will-change: transform, clip-path, opacity;
      }

      .mobile-intro-portrait {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: 70% center;
        filter: grayscale(.25) contrast(1.08);
        will-change: transform;
      }

      .mobile-intro-portrait-shade {
        position: absolute;
        inset: 0;
        background:
          linear-gradient(90deg, #080808 0%, rgba(8,8,8,.72) 24%, rgba(8,8,8,.12) 76%, rgba(8,8,8,.48) 100%),
          linear-gradient(180deg, rgba(8,8,8,.42), transparent 45%, rgba(8,8,8,.84));
      }

      .mobile-intro-line {
        position: absolute;
        z-index: 7;
        height: 1px;
        transform-origin: left center;
        background: rgba(255,255,255,.32);
      }

      .mobile-intro-line-top {
        top: 19%;
        left: 20px;
        width: 47%;
      }

      .mobile-intro-line-bottom {
        right: 20px;
        bottom: 18%;
        width: 38%;
        background: rgba(201,255,87,.65);
      }

      .mobile-intro-word {
        position: absolute;
        top: 39%;
        left: 20px;
        z-index: 8;
        color: #f3f1eb;
        font-size: clamp(4.25rem, 20vw, 5.9rem);
        font-weight: 900;
        line-height: .78;
        white-space: nowrap;
        will-change: transform, opacity, letter-spacing;
      }

      .mobile-intro-role {
        position: absolute;
        top: calc(39% + 82px);
        left: 24px;
        z-index: 8;
        color: rgba(201,255,87,.8);
        font-size: 8px;
        line-height: 1.4;
        text-transform: uppercase;
        white-space: nowrap;
        will-change: transform, opacity, letter-spacing;
      }

      .mobile-intro-lime-ring {
        position: absolute;
        top: 25%;
        right: 14%;
        z-index: 7;
        width: 10px;
        height: 10px;
        border: 1px solid rgba(201,255,87,.8);
        border-radius: 999px;
        box-shadow: 0 0 20px rgba(201,255,87,.5);
      }

      .mobile-intro-signal {
        position: absolute;
        z-index: 8;
        width: 4px;
        height: 4px;
        background: var(--accent);
        box-shadow: 0 0 16px rgba(201,255,87,.8);
        animation: mobileIntroSignal 2.2s ease-in-out infinite;
      }

      .mobile-intro-signal-one { top: 19%; right: 20%; }
      .mobile-intro-signal-two { bottom: 26%; left: 16%; animation-delay: .7s; }

      .mobile-intro-footer {
        position: absolute;
        right: 20px;
        bottom: 9%;
        left: 20px;
        z-index: 8;
        display: flex;
        justify-content: space-between;
        color: rgba(255,255,255,.42);
        font-size: 8px;
        letter-spacing: .2em;
        text-transform: uppercase;
      }
    }

    @keyframes mobileIntroSignal {
      0%, 100% { opacity: .3; transform: scale(.8); }
      50% { opacity: 1; transform: scale(1.45); }
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto !important;
      }

      *,
      *::before,
      *::after {
        animation-duration: .001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: .001ms !important;
      }
    }
  `}</style>
);

/* -------------------------------------------------------------------------- */
/*                              CURSOR SYSTEM                                  */
/* -------------------------------------------------------------------------- */

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let frame = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.25;
      ry += (my - ry) * 0.25;

      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                           MICRO MOTION HELPERS                              */
/* -------------------------------------------------------------------------- */

function Magnetic({
  children,
  strength = 18,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${(x / rect.width) * strength}px, ${
      (y / rect.height) * strength
    }px)`;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0px, 0px)";
    }
  };

  return (
    <div
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}

function WordReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "110%", rotate: 4 }}
        whileInView={{ y: "0%", rotate: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function MovingBackgroundWords({
  text,
  direction = 1,
  top = "15%",
  size = "clamp(100px, 19vw, 320px)",
}: {
  text: string;
  direction?: number;
  top?: string;
  size?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-180 * direction}px`, `${280 * direction}px`]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 20;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 12;
      el.style.setProperty("--mx", `${xOffset}px`);
      el.style.setProperty("--my", `${yOffset}px`);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        top,
        fontSize: size,
        transform: "translate(var(--mx, 0px), var(--my, 0px))",
      }}
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-black uppercase leading-none text-white/[0.035] display select-none"
    >
      {text}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              CINEMATIC INTRO                                */
/* -------------------------------------------------------------------------- */

function Intro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [finished, setFinished] = useState(false);

  const tiles = useMemo(() => Array.from({ length: 42 }, (_, i) => i), []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    const introDuration = isMobile ? 3500 : 4600;
    const timer = window.setTimeout(() => {
      setFinished(true);
      window.setTimeout(onComplete, 850);
    }, introDuration);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.025,
            filter: "blur(8px)",
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[200] overflow-hidden bg-[#080808]"
        >
          <div className="mobile-intro-desktop-content">
          {/* Image underneath the tile architecture */}
          <motion.div
            initial={{ scale: 1.16, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.92 }}
            transition={{
              duration: 3.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-[9%] overflow-hidden sm:inset-[7%] lg:inset-[5%]"
          >
            <motion.img
              src={portrait}
              alt=""
              initial={{ scale: 1.18, x: "-4%" }}
              animate={{ scale: 1, x: "0%" }}
              transition={{
                duration: 4.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/35" />
          </motion.div>

          {/* moving scan */}
          <motion.div
            initial={{ y: "-120%" }}
            animate={{ y: "120%" }}
            transition={{
              duration: 3.5,
              delay: 0.3,
              ease: "linear",
            }}
            className="absolute left-0 top-0 h-[35vh] w-full bg-gradient-to-b from-transparent via-[#c9ff57]/10 to-transparent"
          />

          {/* brick / tile reveal */}
          <div className="absolute inset-[9%] grid grid-cols-6 grid-rows-7 sm:inset-[7%] lg:inset-[5%] lg:grid-cols-7">
            {tiles.map((tile) => {
              const row = Math.floor(tile / 6);
              const col = tile % 6;

              return (
                <motion.div
                  key={tile}
                  initial={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: 0,
                    scale: [1, 1.04, 0.75],
                    x:
                      (col - 2.5) * (9 + ((row * 13) % 17)),
                    y:
                      (row - 3) * (8 + ((col * 17) % 19)),
                    rotate: ((tile * 17) % 13) - 6,
                  }}
                  transition={{
                    duration: 1.15,
                    delay: 0.65 + ((tile * 37) % 850) / 1000,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-[.5px] border-white/[0.045] bg-[#080808]"
                />
              );
            })}
          </div>

          {/* Typography fragments */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="relative w-full max-w-6xl">
              <motion.div
                initial={{ y: 90, opacity: 0, letterSpacing: ".3em" }}
                animate={{ y: 0, opacity: 1, letterSpacing: "-.07em" }}
                transition={{
                  delay: 1.05,
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="display text-center text-[clamp(4rem,13vw,12rem)] font-black leading-[.78] text-white"
              >
                ROSHAN
              </motion.div>

              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 1.45,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 text-center text-xs uppercase tracking-[.45em] text-white/60 sm:text-sm"
              >
                SOFTWARE ENGINEER
              </motion.div>
            </div>
          </div>

          {/* Micro information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-7 left-6 right-6 flex items-end justify-between text-[9px] uppercase tracking-[.28em] text-white/45 sm:left-10 sm:right-10"
          >
            <div>
              <div>Portfolio / 2026</div>
              <div className="mt-1 text-white/20">Mumbai, India</div>
            </div>

            <div className="text-right">
              <div className="text-[#c9ff57]">Initializing</div>
              <motion.div
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 3.5, delay: 0.8, ease: "linear" }}
                className="mt-2 ml-auto h-px w-32 bg-[#c9ff57]"
              />
            </div>
          </motion.div>

          {/* tiny floating blocks */}
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              initial={{
                opacity: 0,
                x: item % 2 ? -50 : 50,
                y: item * 20,
              }}
              animate={{
                opacity: [0, 1, 0.35],
                x: 0,
                y: [0, -10, 10, 0],
              }}
              transition={{
                delay: 1.7 + item * 0.11,
                duration: 2.2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="absolute h-1.5 w-1.5 bg-[#c9ff57]"
              style={{
                left: `${15 + item * 13}%`,
                top: `${18 + ((item * 17) % 55)}%`,
              }}
            />
          ))}
          </div>

          <div className="mobile-intro-sequence" aria-hidden="true">
            <div className="mobile-intro-grain" />
            <div className="mobile-intro-signal mobile-intro-signal-one" />
            <div className="mobile-intro-signal mobile-intro-signal-two" />
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-intro-line mobile-intro-line-top"
            />
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-intro-line mobile-intro-line-bottom"
            />

            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.12, opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", scale: 1, opacity: 0.86 }}
              transition={{ duration: 1.8, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-intro-portrait-frame"
            >
              <motion.img
                src="https://res.cloudinary.com/dswa5docr/image/upload/v1789484618/69e93ed8-d9c0-4443-ad97-a5f80c1aa803.png"
                alt=""
                initial={{ scale: 1.2, x: "5%" }}
                animate={{ scale: 1, x: "0%" }}
                transition={{ duration: 3.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mobile-intro-portrait"
              />
              <div className="mobile-intro-portrait-shade" />
            </motion.div>

            <motion.div
              initial={{ y: 38, opacity: 0, letterSpacing: ".22em" }}
              animate={{ y: 0, opacity: 1, letterSpacing: "-.08em" }}
              transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-intro-word display"
            >
              ROSHAN
            </motion.div>

            <motion.div
              initial={{ x: -24, opacity: 0, letterSpacing: ".75em" }}
              animate={{ x: 0, opacity: 1, letterSpacing: ".42em" }}
              transition={{ duration: 0.9, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-intro-role"
            >
              SOFTWARE ENGINEER
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.8, 0.45], scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, delay: 1.8, ease: "easeInOut" }}
              className="mobile-intro-lime-ring"
            />

            <div className="mobile-intro-footer">
              <span>Portfolio / 2026</span>
              <span className="text-[#c9ff57]">Initializing</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   NAV                                      */
/* -------------------------------------------------------------------------- */

function Navigation() {
  const [open, setOpen] = useState(false);

  const links = [
    "home",
    "about",
    "skills",
    "projects",
    "experience",
    "education",
    "contact",
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 4.75,
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed left-0 right-0 top-0 z-[90] px-5 py-5 sm:px-8 lg:px-10"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Magnetic strength={10}>
            <a href="#hero" className="group flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-[9px] font-bold">
                RG
              </span>
              <span className="hidden text-[10px] uppercase tracking-[.28em] text-white/70 sm:block">
                Roshan Gawade
              </span>
            </a>
          </Magnetic>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Magnetic key={link} strength={8}>
                <a
                  href={link === "home" ? "#hero" : `#${link}`}
                  className="text-[9px] uppercase tracking-[.24em] text-white/45 transition-colors hover:text-white"
                >
                  {link === "home" ? "Home" : link}
                </a>
              </Magnetic>
            ))}
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white md:hidden"
          >
            <Menu size={16} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-[#080808]"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15"
            >
              <X size={18} />
            </button>

            <div className="flex h-full flex-col justify-center px-8">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={link === "home" ? "#hero" : `#${link}`}
                  onClick={() => setOpen(false)}
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.65 }}
                  className="display border-b border-white/10 py-5 text-5xl font-bold uppercase tracking-[-.05em]"
                >
                  {link === "home" ? "Home" : link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   HERO                                     */
/* -------------------------------------------------------------------------- */

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "23%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.13]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]);
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const roles = [
    "Software Engineer",
    "Computer Engineer",
    "Full-Stack Developer",
    "Web Developer",
  ];

  const [role, setRole] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRole((v) => (v + 1) % roles.length);
    }, 2400);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[120vh] overflow-hidden"
    >
      <MovingBackgroundWords
        text="SOFTWARE ENGINEER"
        direction={1}
        top="18%"
        size="clamp(90px, 18vw, 300px)"
      />

      <div className="absolute inset-0">
        <motion.div
          style={{ opacity: fade }}
          className="absolute inset-0"
        >
          <div className="absolute left-[8%] top-[23%] h-44 w-44 rounded-full bg-[#c9ff57]/[0.035] blur-3xl" />
          <div className="absolute bottom-[15%] right-[5%] h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />

          <div className="absolute bottom-[9%] left-0 right-0 h-px bg-white/[0.08]" />

          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="absolute right-[5%] top-[17%] h-[34vh] w-[60vw] max-w-[420px] overflow-hidden sm:right-[8%] sm:h-[55vh] sm:w-[42vw] sm:max-w-[650px] lg:h-[62vh]"
          >
            <motion.img
              src={portrait}
              alt="Roshan Gawade"
              className="h-full w-full object-cover object-center grayscale-[.25]"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 4.9,
                duration: 1.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

            <motion.div
              animate={{ y: ["-100%", "220%"] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 top-0 h-20 w-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
            />

            <div className="absolute bottom-4 left-4 text-[8px] uppercase tracking-[.3em] text-white/50">
              Software Engineer / Portfolio
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] items-center px-5 pt-24 sm:px-8 lg:px-12"
      >
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 4.85,
              duration: 1.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-7 flex items-center gap-3 text-[9px] uppercase tracking-[.35em] text-[#c9ff57]"
          >
            <span className="h-px w-10 bg-[#c9ff57]" />
            Software Engineer
          </motion.div>

          <motion.h1
            style={{ x: titleX }}
            className="display relative max-w-[1000px] text-[clamp(4.8rem,12vw,12rem)] font-black uppercase leading-[.77] tracking-[-.08em]"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 4.9,
                  duration: 1.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                Roshan
              </motion.span>
            </span>

            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 5.02,
                  duration: 1.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block text-white/20"
              >
                Gawade
              </motion.span>
            </span>
          </motion.h1>

          <div className="mt-9 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roles[role]}
                  initial={{ y: 18, opacity: 0, filter: "blur(5px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -18, opacity: 0, filter: "blur(5px)" }}
                  transition={{ duration: 0.45 }}
                  className="display text-2xl font-bold tracking-[-.04em] text-white sm:text-3xl"
                >
                  {roles[role]}
                </motion.div>
              </AnimatePresence>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 5.25,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base"
              >
                Computer Science Engineering graduate with hands-on experience
                in full-stack web development using React.js, Node.js,
                Express.js, MongoDB, PostgreSQL, and MySQL. Built scalable web
                applications through internships, freelance work, and personal
                projects, and solved 200+ DSA problems on LeetCode and
                GeeksforGeeks.
              </motion.p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.4, duration: 1 }}
                className="flex gap-3"
              >
                <Magnetic strength={12}>
                  <a
                    href="/roshan-resume.pdf"
                    download
                    className="group relative flex items-center gap-4 overflow-hidden border border-white/20 px-5 py-4 text-[9px] uppercase tracking-[.25em]"
                  >
                    <span className="relative z-10">Resume</span>
                    <ArrowUpRight size={14} className="relative z-10" />
                    <span className="absolute inset-0 -translate-x-full bg-[#c9ff57] transition-transform duration-500 group-hover:translate-x-0" />
                  </a>
                </Magnetic>

                <Magnetic strength={12}>
                  <a
                    href="#projects"
                    className="flex items-center gap-4 border border-white/10 bg-white/[0.04] px-5 py-4 text-[9px] uppercase tracking-[.25em] transition-colors hover:bg-white/[0.09]"
                  >
                    Explore
                    <ArrowDown size={14} />
                  </a>
                </Magnetic>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.55, duration: 0.9 }}
                className="flex items-center gap-2"
              >
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Magnetic key={label} strength={10}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/70 transition-all duration-300 hover:border-[#c9ff57]/50 hover:bg-[#c9ff57]/10 hover:text-[#c9ff57]"
                    >
                      {typeof Icon === "function" ? <Icon /> : <Icon size={15} />}
                    </a>
                  </Magnetic>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5 }}
        className="absolute bottom-8 left-5 flex items-center gap-3 text-[8px] uppercase tracking-[.3em] text-white/30 sm:left-8 lg:left-12"
      >
        <motion.span
          animate={{ scaleY: [1, 1.8, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="h-7 w-px origin-bottom bg-[#c9ff57]"
        />
        Scroll to explore
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   ABOUT                                    */
/* -------------------------------------------------------------------------- */

function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-4, 5]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["-60%", "18%"]);

  const highlights = [
    ["Clean Code", "Writing maintainable, scalable code with best practices"],
    ["Innovation", "Constantly exploring new technologies and approaches"],
    ["Collaboration", "Strong team player with excellent communication skills"],
    ["Performance", "Optimizing applications for speed and efficiency"],
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen overflow-hidden border-t border-white/[0.08] py-32 sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.015] grayscale sm:opacity-[0.025]">
        <img
          src="https://res.cloudinary.com/dswa5docr/image/upload/v1789322591/1f550daa-605d-481e-9c0e-eea43baa69f2.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <motion.div
        style={{
          x: textX,
          top: "9%",
          fontSize: "clamp(130px, 23vw, 380px)",
        }}
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-black uppercase leading-none text-white/[0.035] display select-none"
      >
        ABOUT
      </motion.div>

      <motion.div
        style={{ x: lineX }}
        className="absolute top-[23%] left-0 h-px w-[80vw] bg-white/[0.08]"
      />

      <div className="relative mx-auto grid max-w-[1600px] gap-20 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
        <div className="relative">
          <div className="sticky top-32">
            <div className="mb-8 flex items-center gap-3 text-[9px] uppercase tracking-[.35em] text-[#c9ff57]">
              <span className="h-px w-9 bg-[#c9ff57]" />
              About
            </div>

            <h2 className="display max-w-xl text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[.82] tracking-[-.07em]">
              <WordReveal>Computer</WordReveal>{" "}
              <WordReveal delay={0.08}>Engineer.</WordReveal>
              <br />
              <span className="text-white/20">
                <WordReveal delay={0.16}>Full-Stack</WordReveal>
              </span>
              <br />
              <WordReveal delay={0.24}>Developer.</WordReveal>
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 110 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="mt-10 h-px bg-[#c9ff57]"
            />
          </div>
        </div>

        <div className="relative">
          <motion.div
            style={{ y: imageY, rotate: imageRotate }}
            className="relative ml-auto h-[38vh] w-full max-w-[420px] overflow-hidden border border-white/10 sm:h-[50vh] sm:max-w-[570px]"
          >
            <motion.img
              src={aboutImage}
              alt=""
              className="h-full w-full object-cover object-center grayscale-[.35]"
              style={{ y: imageY }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 flex justify-between text-[8px] uppercase tracking-[.28em] text-white/45">
              <span>React / Node / Systems</span>
              <span>01—06</span>
            </div>

            <motion.div
              animate={{
                x: ["-110%", "110%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear",
              }}
              className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 max-w-2xl text-lg leading-8 text-white/55 sm:text-xl"
          >
            Computer Science and Engineering graduate with  hands-on experience in full-stack development,
scalable system design, and cloud deployment, along with freelance development experience. Experienced in building
production-ready applications while contributing across frontend, backend, APIs, automation, and deployment in
real-world environments. Solved 200+ DSA problems on LeetCode and GeeksforGeeks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Magnetic key={label} strength={10}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/75 transition-all duration-300 hover:border-[#c9ff57]/50 hover:bg-[#c9ff57]/10 hover:text-[#c9ff57]"
                >
                  <Icon size={15} />
                </a>
              </Magnetic>
            ))}
          </motion.div>

          <div className="mt-20 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
            {highlights.map(([title, text], index) => (
              <motion.div
                key={title}
                initial={{
                  opacity: 0,
                  y: 50,
                  x: index % 2 === 0 ? -25 : 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden border-b border-white/10 p-7 transition-colors hover:bg-white/[0.035]"
              >
                <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#c9ff57] transition-transform duration-500 group-hover:scale-y-100" />

                <div className="flex items-start justify-between">
                  <h3 className="display text-2xl font-bold tracking-[-.04em]">
                    {title}
                  </h3>

                  <span className="text-[8px] text-white/20">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-5 max-w-sm text-sm leading-6 text-white/35 transition-colors group-hover:text-white/60">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  SKILLS                                    */
/* -------------------------------------------------------------------------- */

function SkillField() {
  const [active, setActive] =
    useState<keyof typeof skillGroups>("Frontend");

  const categories = Object.keys(skillGroups) as Array<keyof typeof skillGroups>;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative min-h-[650px] overflow-hidden border border-white/10 bg-[#0b0b0b]"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9ff57]/[0.045] blur-3xl"
      />

      <div className="absolute inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full min-h-[650px] flex-col justify-between p-6 sm:p-9">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`relative overflow-hidden border px-4 py-3 text-[9px] uppercase tracking-[.22em] transition-all ${
                active === category
                  ? "border-[#c9ff57]/60 text-[#c9ff57]"
                  : "border-white/10 text-white/35 hover:border-white/30 hover:text-white"
              }`}
            >
              <motion.span
                initial={false}
                animate={{
                  scaleX: active === category ? 1 : 0,
                }}
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#c9ff57]"
              />
              {category}
              <span className="ml-3 text-white/20">0{index + 1}</span>
            </button>
          ))}
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <motion.div
            key={active}
            initial={{
              scale: 0.85,
              opacity: 0,
              rotate: -5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute text-center"
          >
            <div className="text-[8px] uppercase tracking-[.4em] text-[#c9ff57]">
              Selected field
            </div>
            <div className="display mt-4 text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-[-.08em] text-white/10">
              {active}
            </div>
          </motion.div>

          <div className="relative grid w-full max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {skillGroups[active].map((skill, index) => (
                <motion.div
                  key={`${active}-${skill}`}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                    y: 40,
                    rotate: index % 2 ? 4 : -4,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                    y: -30,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative overflow-hidden border border-white/10 bg-[#0b0b0b]/80 px-4 py-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#c9ff57]/40"
                >
                  <span className="absolute left-0 top-0 h-px w-0 bg-[#c9ff57] transition-all duration-500 group-hover:w-full" />
                  <span className="absolute bottom-0 right-0 h-0 w-px bg-[#c9ff57] transition-all duration-500 group-hover:h-full" />

                  <div className="text-[8px] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="mt-3 text-sm font-medium text-white/75 group-hover:text-white">
                    {skill}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-5 text-[8px] uppercase tracking-[.25em] text-white/25">
          <span>Move through the field</span>
          <span>{skillGroups[active].length} technologies</span>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["-50%", "18%"]);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative overflow-hidden border-t border-white/[0.08] py-32 sm:py-40"
    >
      <motion.div
        style={{
          x: textX,
          top: "7%",
          fontSize: "clamp(110px, 21vw, 350px)",
        }}
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-black uppercase leading-none text-white/[0.035] display select-none"
      >
        TOOLKIT
      </motion.div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[.35em] text-[#c9ff57]">
              <span className="h-px w-9 bg-[#c9ff57]" />
              Skills
            </div>

            <h2 className="display max-w-4xl text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[.78] tracking-[-.08em]">
              <WordReveal>Technical</WordReveal>{" "}
              <span className="text-white/20">
                <WordReveal delay={0.1}>range.</WordReveal>
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-white/35">
            Frontend, backend, databases, cloud tooling and modern application
            infrastructure.
          </p>
        </div>

        <SkillField />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  PROJECTS                                   */
/* -------------------------------------------------------------------------- */

function ProjectStage() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const project = projects[active];

  const next = () =>
    setActive((current) => (current + 1) % projects.length);

  const previous = () =>
    setActive((current) =>
      current === 0 ? projects.length - 1 : current - 1
    );

  const handleStageMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    e.currentTarget.style.setProperty("--px", `${x * 14}px`);
    e.currentTarget.style.setProperty("--py", `${y * 10}px`);
  };

  return (
    <div className="relative">
      <div
        ref={stageRef}
        onMouseMove={handleStageMove}
        onMouseLeave={() => {
          setHovered(false);
          if (stageRef.current) {
            stageRef.current.style.setProperty("--px", "0px");
            stageRef.current.style.setProperty("--py", "0px");
          }
        }}
        onMouseEnter={() => setHovered(true)}
        className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[#0a0a0a] sm:min-h-[700px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{
              opacity: 0,
              clipPath: "inset(100% 0 0 0)",
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              clipPath: "inset(0% 0 0 0)",
              scale: 1,
            }}
            exit={{
              opacity: 0,
              clipPath: "inset(0 100% 0 0)",
              scale: 0.98,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-[5%] overflow-hidden sm:inset-[8%]"
          >
            <motion.img
              src={project.image}
              alt={project.title}
              initial={{ scale: 1.2, x: "4%" }}
              animate={{
                scale: 1,
                x: "0%",
              }}
              transition={{
                duration: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transform:
                  "translate(var(--px, 0px), var(--py, 0px)) scale(1.02)",
              }}
              className="project-image h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/20" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-9 lg:p-12">
          <div className="flex flex-col justify-between gap-6 sm:gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-[8px] uppercase tracking-[.3em] text-[#c9ff57]">
                <span>
                  {String(active + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
                <span className="h-px w-10 bg-[#c9ff57]" />
                <span>{project.status || "Selected project"}</span>
              </div>

              <div className="sm:hidden">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={project.title}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="display text-3xl font-black uppercase leading-[.8] tracking-[-.06em]"
                    >
                      {project.title}
                    </motion.h3>
                  </AnimatePresence>

                  <div className="flex shrink-0 gap-2">
                    {project.github !== "#" && (
                      <Magnetic strength={8}>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 w-9 items-center justify-center border border-white/15 bg-black/30 backdrop-blur transition-colors hover:border-[#c9ff57]/60"
                          aria-label={`${project.title} GitHub`}
                        >
                          <Github size={14} />
                        </a>
                      </Magnetic>
                    )}

                    {project.live !== "#" && (
                      <Magnetic strength={8}>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-9 items-center gap-2 border border-[#c9ff57]/40 bg-[#c9ff57] px-3 text-[7px] font-bold uppercase tracking-[.18em] text-black"
                        >
                          Open
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${project.title}-description-mobile`}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="max-w-xl text-xs leading-5 text-white/55"
                  >
                    {project.description}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="hidden sm:block">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={project.title}
                    initial={{ y: 45, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="display text-[clamp(3rem,7vw,7rem)] font-black uppercase leading-[.8] tracking-[-.07em]"
                  >
                    {project.title}
                  </motion.h3>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${project.title}-description`}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-7 max-w-2xl text-sm leading-6 text-white/55 sm:text-base"
                  >
                    {project.description}
                  </motion.p>
                </AnimatePresence>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.slice(0, 7).map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="border border-white/10 bg-black/30 px-3 py-2 text-[8px] uppercase tracking-[.14em] text-white/45 backdrop-blur"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 gap-2 sm:flex">
              {project.github !== "#" && (
                <Magnetic strength={8}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 w-12 items-center justify-center border border-white/15 bg-black/30 backdrop-blur transition-colors hover:border-[#c9ff57]/60"
                  >
                    <Github size={15} />
                  </a>
                </Magnetic>
              )}

              {project.live !== "#" && (
                <Magnetic strength={8}>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center gap-3 border border-[#c9ff57]/40 bg-[#c9ff57] px-5 text-[9px] font-bold uppercase tracking-[.2em] text-black"
                  >
                    Open
                    <ArrowUpRight size={14} />
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </div>

        <div className="absolute right-5 top-5 z-30 flex gap-2 sm:right-8 sm:top-8">
          <button
            onClick={previous}
            className="flex h-10 w-10 items-center justify-center border border-white/15 bg-black/30 transition-colors hover:border-white/40"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center border border-white/15 bg-black/30 transition-colors hover:border-white/40"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Project film strip */}
      <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2">
        {projects.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setActive(index)}
            className={`group relative h-16 w-24 shrink-0 overflow-hidden border transition-all sm:h-24 sm:w-36 ${
              active === index
                ? "border-[#c9ff57]"
                : "border-white/10 opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover object-center grayscale transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/35" />
            <span className="absolute bottom-2 left-2 text-[7px] uppercase tracking-[.16em] text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleX = useTransform(scrollYProgress, [0, 1], ["-55%", "18%"]);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative overflow-hidden border-t border-white/[0.08] py-32 sm:py-40"
    >
      <motion.div
        style={{
          x: titleX,
          top: "8%",
          fontSize: "clamp(100px,23vw,390px)",
        }}
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-black uppercase leading-none tracking-[-.09em] text-white/[0.035] display select-none"
      >
        WORK
      </motion.div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-20 flex items-end justify-between gap-8">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[.35em] text-[#c9ff57]">
              <span className="h-px w-9 bg-[#c9ff57]" />
              Selected Work
            </div>

            <h2 className="display text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[.78] tracking-[-.08em]">
              Projects<span className="text-white/20">.</span>
            </h2>
          </div>

          <div className="hidden text-right text-[8px] uppercase tracking-[.25em] text-white/25 sm:block">
            <div>12 projects</div>
            <div className="mt-2">Interactive archive</div>
          </div>
        </div>

        <ProjectStage />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                EXPERIENCE                                   */
/* -------------------------------------------------------------------------- */

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -120 : 120, 0]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -7 : 7, 0]
  );

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  return (
    <motion.article
      ref={ref}
      style={{ x, rotate, scale }}
      className="relative overflow-hidden border border-white/10 bg-[#0b0b0b] p-6 sm:p-9 lg:p-11"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-0 h-px w-full origin-left bg-[#c9ff57]"
      />

      <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <div className="text-[9px] uppercase tracking-[.3em] text-[#c9ff57]">
            {experience.period}
          </div>

          <h3 className="display mt-5 text-3xl font-bold uppercase leading-[.9] tracking-[-.05em] text-white sm:text-4xl">
            {experience.title}
          </h3>

          <div className="mt-5 text-sm text-white/50">
            {experience.company}
          </div>

          <div className="mt-3 flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-white/25">
            <MapPin size={11} />
            {experience.location}
          </div>

          {experience.website && (
            <Magnetic strength={8}>
              <a
                href={experience.website}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 border-b border-white/15 pb-2 text-[8px] uppercase tracking-[.2em] text-white/45 hover:border-[#c9ff57] hover:text-[#c9ff57]"
              >
                Visit
                <ExternalLink size={11} />
              </a>
            </Magnetic>
          )}
        </div>

        <div>
          <p className="max-w-2xl text-base leading-7 text-white/55">
            {experience.description}
          </p>

          <div className="mt-9 space-y-5">
            {experience.achievements.map((achievement, i) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                }}
                className="flex gap-4 border-t border-white/10 pt-5"
              >
                <span className="mt-1 text-[8px] text-[#c9ff57]">
                  0{i + 1}
                </span>
                <p className="text-sm leading-6 text-white/40">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {experience.technologies.map((technology) => (
              <span
                key={technology}
                className="border border-white/10 px-3 py-2 text-[8px] uppercase tracking-[.12em] text-white/30"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const giantX = useTransform(scrollYProgress, [0, 1], ["5%", "-12%"]);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative overflow-hidden border-t border-white/[0.08] py-32 sm:py-40"
    >
      <motion.div
        style={{ x: giantX }}
        className="pointer-events-none absolute top-[7%] whitespace-nowrap"
      >
        <div className="display text-[clamp(100px,22vw,360px)] font-black uppercase leading-none tracking-[-.09em] text-white/[0.035]">
          JOURNEY
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[.35em] text-[#c9ff57]">
            <span className="h-px w-9 bg-[#c9ff57]" />
            Experience
          </div>

          <h2 className="display max-w-5xl text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[.78] tracking-[-.08em]">
            Where I{" "}
            <span className="text-white/20">
              <WordReveal>worked.</WordReveal>
            </span>
          </h2>
        </div>

        <div className="relative space-y-7">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-2 top-0 hidden w-px bg-[#c9ff57]/50 lg:block"
          />

          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company}-${experience.title}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 EDUCATION                                  */
/* -------------------------------------------------------------------------- */

function EducationCard({
  item,
  index,
}: {
  item: (typeof education)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 30%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [index === 0 ? -9 : index === 1 ? 7 : -5, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <motion.article
      ref={ref}
      style={{ y, rotate, scale, opacity }}
      className="group relative min-h-[340px] overflow-hidden border border-white/10 bg-[#0b0b0b] p-6 sm:p-9"
    >
      <img
        src={item.image}
        alt={item.school}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 grayscale transition-all duration-500 group-hover:opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <motion.div
        className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#c9ff57]/[0.045] blur-3xl"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
        }}
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[9px] uppercase tracking-[.3em] text-[#c9ff57]">
            Education
          </span>

          <motion.span
            whileHover={{ rotate: 90, scale: 1.2 }}
            className="text-[9px] text-white/20"
          >
            {item.index}
          </motion.span>
        </div>

        <div className="mt-20">
          <h3 className="display max-w-xl text-3xl font-bold uppercase leading-[.9] tracking-[-.05em] text-white sm:text-4xl">
            {item.degree}
          </h3>

          <p className="mt-5 text-sm text-white/50">{item.school}</p>

          <div className="mt-3 flex flex-wrap gap-4 text-[8px] uppercase tracking-[.2em] text-white/25">
            <span>{item.place}</span>
            <span>{item.period}</span>
          </div>
        </div>

        <div className="mt-12 flex items-end justify-between">
          <div className="text-[8px] uppercase tracking-[.25em] text-white/20">
            Result
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="display text-4xl font-black tracking-[-.05em] text-[#c9ff57]"
          >
            {item.result}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#c9ff57] transition-transform duration-700 group-hover:scale-x-100" />
    </motion.article>
  );
}

function Education() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-12%", "10%"]);

  return (
    <section
      ref={ref}
      id="education"
      className="relative overflow-hidden border-t border-white/[0.08] py-32 sm:py-40"
    >
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute top-[8%] whitespace-nowrap"
      >
        <div className="display text-[clamp(100px,21vw,350px)] font-black uppercase leading-none tracking-[-.09em] text-white/[0.035]">
          LEARNING
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[.35em] text-[#c9ff57]">
            <span className="h-px w-9 bg-[#c9ff57]" />
            Education
          </div>

          <h2 className="display text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[.78] tracking-[-.08em]">
            The{" "}
            <span className="text-white/20">
              <WordReveal>foundation.</WordReveal>
            </span>
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {education.map((item, index) => (
            <EducationCard key={item.degree} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  CONTACT                                   */
/* -------------------------------------------------------------------------- */

function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const titleX = useTransform(scrollYProgress, [0, 1], ["12%", "-8%"]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xgooeayn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setSent(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      window.setTimeout(() => setSent(false), 4500);
    } catch {
      window.alert("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const contactMethods = [
    {
      name: "LinkedIn",
      description: "Professional conversations",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/roshan-gawade-469bb422a/",
    },
    {
      name: "WhatsApp",
      description: "Quick conversations",
      icon: MessageCircle,
      href: "https://wa.me/918551879434",
    },
    {
      name: "Email",
      description: "Projects & opportunities",
      icon: Mail,
      href: "https://mail.google.com/mail/u/0/#inbox?compose=new",
    },
    {
      name: "Phone",
      description: "Direct conversation",
      icon: Phone,
      href: "tel:+918551879434",
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.08] bg-[#dedcd7] py-32 text-[#080808] sm:py-40"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] grayscale sm:opacity-[0.12]">
        <img
          src={portrait}
          alt=""
          className="h-full w-full object-cover object-center object-right"
        />
      </div>

      <motion.div
        style={{ x: titleX }}
        className="pointer-events-none absolute top-[8%] whitespace-nowrap"
      >
        <div className="display text-[clamp(100px,22vw,370px)] font-black uppercase leading-none tracking-[-.09em] text-black/[0.045]">
          CONTACT
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-20 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[.35em] text-black/45">
              <span className="h-px w-9 bg-black/40" />
              Contact
            </div>

            <h2 className="display max-w-4xl text-[clamp(4rem,9vw,9rem)] font-black uppercase leading-[.78] tracking-[-.08em]">
              Let's make
              <br />
              something
              <br />
              <span className="text-black/25">real.</span>
            </h2>

            <p className="mt-10 max-w-md text-sm leading-7 text-black/50">
              Open to conversations around projects, engineering roles,
              freelance work and interesting technical challenges.
            </p>

            <div className="mt-12 space-y-2">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;

                return (
                  <Magnetic key={method.name} strength={12}>
                    <a
                      href={method.href}
                      target={
                        method.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.href.startsWith("http")
                          ? "noreferrer"
                          : undefined
                      }
                      className="group flex items-center justify-between border-t border-black/10 py-5 px-3 transition-all duration-300 hover:bg-black/[0.08] hover:rounded-md"
                    >
                      <div className="flex items-center gap-4">
                        <Icon
                          size={16}
                          className="transition-all duration-300 text-black/75 group-hover:text-black"
                        />
                        <div>
                          <div className="text-sm font-medium text-black/80 transition-all duration-300 group-hover:text-black">
                            {method.name}
                          </div>
                          <div className="mt-1 text-[8px] uppercase tracking-[.18em] text-black/35 transition-all duration-300 group-hover:text-black/70">
                            {method.description}
                          </div>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={15}
                        className="text-black/70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black"
                      />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <motion.form
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="relative mx-auto max-w-[520px] overflow-hidden rounded-[2.3rem] border-[8px] border-black bg-[#0d0d0d] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-4"
            >
              <div className="relative rounded-[1.6rem] border border-black/10 bg-white/80 p-5 sm:p-7">
                <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-center pt-2">
                  <div className="h-2 w-24 rounded-full bg-black/90 shadow-[0_0_0_1px_rgba(255,255,255,0.18)]" />
                </div>
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#c9ff57]/30 blur-3xl" />

                <div className="relative z-10 grid gap-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <label className="group">
                    <span className="text-[9px] font-medium uppercase tracking-[.25em] text-black/60">
                      Name
                    </span>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-sm text-black placeholder:text-black/35 outline-none transition-colors focus:border-black"
                    />
                  </label>

                  <label className="group">
                    <span className="text-[9px] font-medium uppercase tracking-[.25em] text-black/60">
                      Email
                    </span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-sm text-black placeholder:text-black/35 outline-none transition-colors focus:border-black"
                    />
                  </label>
                </div>

                <label>
                  <span className="text-[9px] font-medium uppercase tracking-[.25em] text-black/60">
                    Subject
                  </span>
                  <input
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-3 w-full border-0 border-b border-black/20 bg-transparent px-0 py-3 text-sm text-black placeholder:text-black/35 outline-none focus:border-black"
                  />
                </label>

                <label>
                  <span className="text-[9px] font-medium uppercase tracking-[.25em] text-black/60">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-3 w-full resize-none border-0 border-b border-black/20 bg-transparent px-0 py-3 text-sm text-black placeholder:text-black/35 outline-none focus:border-black"
                  />
                </label>

                <Magnetic strength={10}>
                  <button
                    disabled={sending}
                    type="submit"
                    className="group relative flex w-full items-center justify-between overflow-hidden bg-black px-6 py-5 text-left text-white"
                  >
                    <span className="relative z-10 text-[9px] uppercase tracking-[.25em]">
                      {sending
                        ? "Sending..."
                        : sent
                        ? "Message sent"
                        : "Send message"}
                    </span>

                    <span className="relative z-10">
                      {sent ? <Check size={16} /> : <ArrowUpRight size={16} />}
                    </span>

                    <span className="absolute inset-0 origin-left scale-x-0 bg-[#c9ff57] transition-transform duration-500 group-hover:scale-x-100" />
                  </button>
                </Magnetic>

                <div className="flex justify-between text-[8px] uppercase tracking-[.18em] text-black/30">
                  <span>Roshan Gawade</span>
                  <span>Mumbai, India</span>
                </div>
                </div>
              </div>
            </motion.form>
          </div>
        </div>

        <div className="mt-32 overflow-hidden border-y border-black/10 py-7">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max whitespace-nowrap"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="display mr-16 text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-[-.06em]"
              >
                ROSHAN GAWADE&nbsp;&nbsp;•&nbsp;&nbsp; SOFTWARE ENGINEER&nbsp;&nbsp;•
              </div>
            ))}
          </motion.div>
        </div>

        <footer className="mt-8 flex flex-col justify-between gap-4 text-[8px] uppercase tracking-[.2em] text-black/35 sm:flex-row">
          <span>Roshan Gawade</span>
          <span>Software Engineer</span>
          <span>© 2026</span>
        </footer>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    APP                                     */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.documentElement.style.background = "#080808";

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      document.body.style.overflow = previous;
    }, 4700);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previous;
    };
  }, []);

  const finishIntro = () => {
    setIntroDone(true);
    document.body.style.overflow = "";
  };

  return (
    <div className="portfolio-shell min-h-screen">
      <GlobalStyle />
      <Cursor />
      <div className="noise" />

      <Intro onComplete={finishIntro} />

      <Navigation />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

    </div>
  );
}

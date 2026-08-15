import React, { useState } from "react";
import {
  Code2,
  Database,
  Cloud,
  Server,
  Globe,
  Palette,
  Terminal,
  GitBranch,
  Container,
  Send,
  Braces,
  FileCode2,
  Layers,
  ShieldCheck,
  Workflow,
  BrainCircuit,
  Coffee,
  Zap,
  Component,
  Boxes,
  Network,
  CreditCard,
  MousePointer2,
  Sparkles,
  Briefcase,
  Rocket,
} from "lucide-react";

type SkillColor =
  | "cyan"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "yellow"
  | "gray";

type Skill = {
  name: string;
  icon: React.ElementType;
  color: SkillColor;
  level: string;
  description: string;
  usedIn: string[];
  category: string;
};

type SkillCategory = {
  title: string;
  icon: React.ElementType;
  description: string;
  color: SkillColor;
  skills: Skill[];
};

const colorMap: Record<
  SkillColor,
  {
    text: string;
    border: string;
    glow: string;
    bg: string;
    ring: string;
  }
> = {
  cyan: {
    text: "text-cyan-300",
    border: "border-cyan-400/40",
    glow: "shadow-cyan-400/30",
    bg: "bg-cyan-400/10",
    ring: "ring-cyan-400/30",
  },

  blue: {
    text: "text-blue-300",
    border: "border-blue-400/40",
    glow: "shadow-blue-400/30",
    bg: "bg-blue-400/10",
    ring: "ring-blue-400/30",
  },

  green: {
    text: "text-emerald-300",
    border: "border-emerald-400/40",
    glow: "shadow-emerald-400/30",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-400/30",
  },

  purple: {
    text: "text-purple-300",
    border: "border-purple-400/40",
    glow: "shadow-purple-400/30",
    bg: "bg-purple-400/10",
    ring: "ring-purple-400/30",
  },

  orange: {
    text: "text-orange-300",
    border: "border-orange-400/40",
    glow: "shadow-orange-400/30",
    bg: "bg-orange-400/10",
    ring: "ring-orange-400/30",
  },

  yellow: {
    text: "text-yellow-300",
    border: "border-yellow-400/40",
    glow: "shadow-yellow-400/30",
    bg: "bg-yellow-400/10",
    ring: "ring-yellow-400/30",
  },

  gray: {
    text: "text-gray-200",
    border: "border-gray-400/30",
    glow: "shadow-gray-400/20",
    bg: "bg-gray-400/10",
    ring: "ring-gray-400/20",
  },
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Component,
    description: "Building responsive and interactive interfaces",
    color: "cyan",

    skills: [
      {
        name: "React.js",
        icon: Component,
        color: "cyan",
        level: "Advanced",
        category: "Frontend",
        description:
          "Built reusable component systems, dashboards and production interfaces with React.",
        usedIn: [
          "FitTrack",
          "Tribal E-Commerce",
          "Freelance Projects",
          "Vivirelle Dashboard",
        ],
      },

      {
        name: "Next.js",
        icon: Layers,
        color: "gray",
        level: "Advanced",
        category: "Frontend",
        description:
          "Used for full-stack applications, routing, server-side features and production deployments.",
        usedIn: [
          "Autozynq",
          "Marvedge Screen Recorder",
          "AI Workflow",
        ],
      },

      {
        name: "TypeScript",
        icon: Braces,
        color: "blue",
        level: "Advanced",
        category: "Language",
        description:
          "Used to add strong typing, safer APIs and maintainable application architecture.",
        usedIn: [
          "Autozynq",
          "Marvedge Screen Recorder",
          "Freelance Projects",
        ],
      },

      {
        name: "JavaScript",
        icon: Zap,
        color: "yellow",
        level: "Advanced",
        category: "Language",
        description:
          "Primary language used across frontend, backend, APIs and interactive web applications.",
        usedIn: [
          "FitTrack",
          "Autozynq",
          "Freelance Projects",
          "Vivirelle",
        ],
      },

      {
        name: "Tailwind CSS",
        icon: Palette,
        color: "cyan",
        level: "Advanced",
        category: "Styling",
        description:
          "Used for responsive layouts, design systems and fast UI development.",
        usedIn: [
          "Autozynq",
          "FitTrack",
          "Tribal E-Commerce",
          "Freelance Projects",
        ],
      },

      {
        name: "HTML",
        icon: Globe,
        color: "orange",
        level: "Advanced",
        category: "Frontend",
        description:
          "Semantic HTML and accessible page structures for responsive applications.",
        usedIn: [
          "Freelance Projects",
          "Vivirelle",
          "FitTrack",
        ],
      },

      {
        name: "CSS",
        icon: Palette,
        color: "blue",
        level: "Advanced",
        category: "Styling",
        description:
          "Custom layouts, animations, responsive behavior and visual polish.",
        usedIn: [
          "Portfolio",
          "Freelance Projects",
          "FitTrack",
        ],
      },

      {
        name: "Bootstrap",
        icon: Boxes,
        color: "purple",
        level: "Intermediate",
        category: "Frontend",
        description:
          "Used for responsive layouts and rapid UI development in earlier projects.",
        usedIn: ["Freelance Projects"],
      },
    ],
  },

  {
    title: "Backend",
    icon: Server,
    description: "APIs, authentication and application logic",
    color: "green",

    skills: [
      {
        name: "Node.js",
        icon: Server,
        color: "green",
        level: "Advanced",
        category: "Backend",
        description:
          "Built REST APIs, backend services and application logic using Node.js.",
        usedIn: [
          "FitTrack",
          "Autozynq",
          "Tribal E-Commerce",
          "Vivirelle",
        ],
      },

      {
        name: "Express.js",
        icon: Send,
        color: "gray",
        level: "Advanced",
        category: "Backend",
        description:
          "Created REST endpoints, middleware, authentication and backend services.",
        usedIn: [
          "FitTrack",
          "Tribal E-Commerce",
          "Vivirelle",
          "Freelance Projects",
        ],
      },

      {
        name: "REST APIs",
        icon: Network,
        color: "cyan",
        level: "Advanced",
        category: "Backend",
        description:
          "Designed APIs for authentication, CRUD operations, filtering and application workflows.",
        usedIn: [
          "FitTrack",
          "Autozynq",
          "Vivirelle",
        ],
      },

      {
        name: "JWT",
        icon: ShieldCheck,
        color: "purple",
        level: "Advanced",
        category: "Security",
        description:
          "Implemented token-based authentication and role-based access control.",
        usedIn: [
          "FitTrack",
          "Tribal E-Commerce",
        ],
      },

      {
        name: "Java",
        icon: Coffee,
        color: "orange",
        level: "Intermediate",
        category: "Language",
        description:
          "Used for programming fundamentals, object-oriented development and DSA practice.",
        usedIn: [
          "DSA Practice",
          "Academic Projects",
        ],
      },

      {
        name: "C",
        icon: Code2,
        color: "blue",
        level: "Intermediate",
        category: "Language",
        description:
          "Used for programming fundamentals, data structures and academic development.",
        usedIn: [
          "DSA Practice",
          "Academic Projects",
        ],
      },
    ],
  },

  {
    title: "Databases",
    icon: Database,
    description: "Data modeling, queries and persistence",
    color: "purple",

    skills: [
      {
        name: "MongoDB",
        icon: Database,
        color: "green",
        level: "Advanced",
        category: "Database",
        description:
          "Designed schemas and handled application data for MERN applications.",
        usedIn: [
          "FitTrack",
          "Tribal E-Commerce",
          "Freelance Projects",
        ],
      },

      {
        name: "PostgreSQL",
        icon: Database,
        color: "blue",
        level: "Advanced",
        category: "Database",
        description:
          "Used with Prisma for relational data modeling and production application workflows.",
        usedIn: [
          "Autozynq",
          "Vivirelle",
        ],
      },

      {
        name: "MySQL",
        icon: Database,
        color: "orange",
        level: "Intermediate",
        category: "Database",
        description:
          "Used for relational database concepts, queries and application development.",
        usedIn: [
          "Academic Projects",
          "Database Practice",
        ],
      },

      {
        name: "Prisma ORM",
        icon: Boxes,
        color: "gray",
        level: "Advanced",
        category: "ORM",
        description:
          "Used for type-safe database access, schemas, relations and queries.",
        usedIn: ["Autozynq"],
      },
    ],
  },

  {
    title: "Tools & Cloud",
    icon: Cloud,
    description: "Development, deployment and infrastructure",
    color: "orange",

    skills: [
      {
        name: "Docker",
        icon: Container,
        color: "blue",
        level: "Intermediate",
        category: "DevOps",
        description:
          "Used to containerize applications and maintain consistent development environments.",
        usedIn: [
          "Backend Projects",
          "Deployment Practice",
        ],
      },

      {
        name: "Git & GitHub",
        icon: GitBranch,
        color: "gray",
        level: "Advanced",
        category: "Development",
        description:
          "Version control, feature branches, commits and collaborative development.",
        usedIn: ["All Major Projects"],
      },

      {
        name: "AWS",
        icon: Cloud,
        color: "orange",
        level: "Intermediate",
        category: "Cloud",
        description:
          "Used for cloud deployment and infrastructure experimentation.",
        usedIn: [
          "Marvedge Screen Recorder",
          "Cloud Projects",
        ],
      },

      {
        name: "Postman",
        icon: Send,
        color: "orange",
        level: "Advanced",
        category: "API",
        description:
          "Used to test, debug and validate REST APIs during backend development.",
        usedIn: [
          "FitTrack",
          "Autozynq",
          "Vivirelle",
        ],
      },

      {
        name: "VS Code",
        icon: Terminal,
        color: "blue",
        level: "Advanced",
        category: "Development",
        description:
          "Primary development environment for frontend and backend projects.",
        usedIn: ["Daily Development"],
      },

      {
        name: "GSAP",
        icon: MousePointer2,
        color: "green",
        level: "Intermediate",
        category: "Animation",
        description:
          "Used for advanced web animations and interactive UI experiences.",
        usedIn: [
          "Portfolio",
          "Frontend Experiments",
        ],
      },
    ],
  },

  {
    title: "Modern Stack",
    icon: Rocket,
    description: "Advanced tools used in recent projects",
    color: "cyan",

    skills: [
      {
        name: "React Flow",
        icon: Workflow,
        color: "cyan",
        level: "Advanced",
        category: "Visualization",
        description:
          "Used to build Autozynq's visual node-based workflow editor.",
        usedIn: ["Autozynq"],
      },

      {
        name: "NextAuth",
        icon: ShieldCheck,
        color: "purple",
        level: "Advanced",
        category: "Authentication",
        description:
          "Implemented authentication and secure session management.",
        usedIn: ["Autozynq"],
      },

      {
        name: "Google APIs",
        icon: Globe,
        color: "blue",
        level: "Advanced",
        category: "Integrations",
        description:
          "Connected external Google services to workflow automation.",
        usedIn: ["Autozynq"],
      },

      {
        name: "AI Integration",
        icon: BrainCircuit,
        color: "purple",
        level: "Advanced",
        category: "AI",
        description:
          "Integrated AI-powered workflow functionality and automated email generation.",
        usedIn: [
          "Autozynq",
          "AI Workflow",
        ],
      },

      {
        name: "FFmpeg",
        icon: FileCode2,
        color: "orange",
        level: "Intermediate",
        category: "Media",
        description:
          "Used for browser-based screen recording and video processing workflows.",
        usedIn: [
          "Marvedge Screen Recorder",
        ],
      },

      {
        name: "Razorpay",
        icon: CreditCard,
        color: "blue",
        level: "Intermediate",
        category: "Payments",
        description:
          "Integrated online payment workflows for e-commerce and subscription features.",
        usedIn: [
          "FitTrack",
          "Tribal E-Commerce",
        ],
      },
    ],
  },
];

const Skills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const handleEnter = (skill: Skill) => {
    setActiveSkill(skill);
  };

  const handleLeave = () => {
    setActiveSkill(null);
  };

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[120px]" />

        <div className="absolute left-[10%] top-[20%] h-2 w-2 animate-pulse rounded-full bg-cyan-300/70" />

        <div className="absolute right-[15%] top-[30%] h-1.5 w-1.5 animate-pulse rounded-full bg-purple-300/70 [animation-delay:1s]" />

        <div className="absolute bottom-[20%] left-[25%] h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300/70 [animation-delay:2s]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-medium text-cyan-300 backdrop-blur-xl">
            <Sparkles size={14} />
            TECHNICAL TOOLKIT
          </div>

          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Skills that{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              build things
            </span>
          </h2>

          <div className="mx-auto mb-7 h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Hover over a skill to see exactly where I've used it in real
            projects and professional work.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid gap-8 lg:grid-cols-2">

          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            const categoryColors = colorMap[category.color];

            return (
              <div
                key={category.title}
                className="group relative overflow-visible rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/[0.12] sm:p-7"
              >

                {/* Category glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.025] via-transparent to-cyan-500/[0.025]" />

                {/* Category header */}
                <div className="relative z-10 mb-7 flex items-center gap-4">

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${categoryColors.border} ${categoryColors.bg} ${categoryColors.text} shadow-lg`}
                  >
                    <CategoryIcon size={22} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      {category.title}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      {category.description}
                    </p>
                  </div>

                </div>

                {/* Skill nodes */}
                <div className="relative z-20 grid grid-cols-2 gap-3 sm:grid-cols-3">

                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    const colors = colorMap[skill.color];
                    const isActive =
                      activeSkill?.name === skill.name;

                    return (
                      <div
                        key={skill.name}
                        className="relative"
                        onMouseEnter={() => handleEnter(skill)}
                        onMouseLeave={handleLeave}
                      >

                        <button
                          type="button"
                          onFocus={() => handleEnter(skill)}
                          onBlur={handleLeave}
                          onClick={() => {
                            if (
                              activeSkill?.name === skill.name
                            ) {
                              setActiveSkill(null);
                            } else {
                              setActiveSkill(skill);
                            }
                          }}
                          className={`
                            group/skill relative flex min-h-[112px] w-full
                            flex-col items-center justify-center gap-3
                            overflow-hidden rounded-2xl border
                            px-3 py-4 text-center outline-none
                            transition-all duration-300
                            ${
                              isActive
                                ? `${colors.border} ${colors.bg} scale-[1.035] ${colors.glow} shadow-xl`
                                : "border-white/[0.06] bg-gray-950/60 hover:border-white/[0.15] hover:bg-white/[0.05]"
                            }
                            focus-visible:ring-2 ${colors.ring}
                          `}
                          style={{
                            animationDelay: `${
                              categoryIndex * 100 +
                              skillIndex * 50
                            }ms`,
                          }}
                        >

                          {/* Shine */}
                          <span className="pointer-events-none absolute -left-[120%] top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-all duration-700 group-hover/skill:left-[130%]" />

                          {/* Icon glow */}
                          <span
                            className={`absolute h-10 w-10 rounded-full ${colors.bg} opacity-0 blur-xl transition-opacity duration-300 group-hover/skill:opacity-100 ${
                              isActive
                                ? "opacity-100"
                                : ""
                            }`}
                          />

                          {/* Icon */}
                          <span
                            className={`
                              relative flex h-11 w-11 items-center
                              justify-center rounded-xl border
                              ${colors.border}
                              ${colors.bg}
                              ${colors.text}
                              transition-all duration-300
                              group-hover/skill:scale-110
                              group-hover/skill:-translate-y-0.5
                              ${
                                isActive
                                  ? "scale-110 -translate-y-0.5"
                                  : ""
                              }
                            `}
                          >
                            <Icon
                              size={21}
                              strokeWidth={1.8}
                            />
                          </span>

                          {/* Skill name */}
                          <span
                            className={`relative text-xs font-semibold transition-colors duration-300 sm:text-sm ${
                              isActive
                                ? colors.text
                                : "text-gray-300 group-hover/skill:text-white"
                            }`}
                          >
                            {skill.name}
                          </span>

                          {/* Active dot */}
                          <span
                            className={`absolute bottom-2 h-1 w-1 rounded-full ${colors.bg} transition-all duration-300 ${
                              isActive
                                ? "scale-100 opacity-100"
                                : "scale-0 opacity-0"
                            }`}
                          />

                        </button>

                        {/* Floating detail card */}
                        {isActive && (
                          <div
                            className="
                              pointer-events-none
                              absolute left-1/2 top-1/2
                              z-[100]
                              w-[min(360px,calc(100vw-32px))]
                              -translate-x-1/2
                              -translate-y-1/2
                              animate-[skillCardIn_.2s_ease-out]
                            "
                          >

                            <div
                              className="
                                relative overflow-hidden rounded-2xl
                                border border-white/15
                                bg-gray-950/95
                                p-5
                                shadow-[0_25px_80px_rgba(0,0,0,0.75)]
                                backdrop-blur-2xl
                              "
                            >

                              {/* Card glow */}
                              <div
                                className={`absolute -left-10 -top-10 h-28 w-28 rounded-full ${colors.bg} blur-3xl`}
                              />

                              <div className="relative">

                                {/* Card header */}
                                <div className="mb-4 flex items-start justify-between gap-4">

                                  <div className="flex items-center gap-3">

                                    <div
                                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colors.border} ${colors.bg} ${colors.text}`}
                                    >
                                      <Icon size={19} />
                                    </div>

                                    <div>
                                      <h4 className="text-base font-bold text-white">
                                        {skill.name}
                                      </h4>

                                      <span
                                        className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${colors.text}`}
                                      >
                                        {skill.level}
                                      </span>
                                    </div>

                                  </div>

                                  <span
                                    className={`rounded-full border ${colors.border} ${colors.bg} px-2 py-1 text-[9px] font-semibold uppercase tracking-wider ${colors.text}`}
                                  >
                                    {skill.category}
                                  </span>

                                </div>

                                {/* Description */}
                                <p className="mb-5 text-xs leading-relaxed text-gray-400">
                                  {skill.description}
                                </p>

                                {/* Used in */}
                                <div>

                                  <div className="mb-2 flex items-center gap-2">

                                    <Briefcase
                                      size={13}
                                      className={colors.text}
                                    />

                                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300">
                                      Used in
                                    </span>

                                  </div>

                                  <div className="flex flex-wrap gap-1.5">

                                    {skill.usedIn.map(
                                      (project) => (
                                        <span
                                          key={project}
                                          className="rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-medium text-gray-300"
                                        >
                                          {project}
                                        </span>
                                      )
                                    )}

                                  </div>

                                </div>

                              </div>

                            </div>

                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>

              </div>
            );
          })}

        </div>

        {/* Interaction hint */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.025] px-4 py-2 text-[11px] text-gray-500 backdrop-blur-xl">

            <MousePointer2 size={13} />

            <span className="hidden sm:inline">
              Hover a skill to explore where it was used
            </span>

            <span className="sm:hidden">
              Tap a skill to explore
            </span>

          </div>
        </div>

      </div>

      {/* Animation */}
      <style>{`
        @keyframes skillCardIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.94);
          }

          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>

    </section>
  );
};

export default Skills;
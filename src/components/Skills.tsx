import React, { useState } from "react";
import { Network } from "lucide-react";
import {
  SiAmazonaws,
  SiCss3,
  SiDocker,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: React.ElementType;
  level: string;
  description: string;
  usedIn: string[];
};

type Category = {
  title: string;
  description: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    title: "Frontend",
    description: "Interfaces, systems & interaction",
    skills: [
      {
        name: "React.js",
        icon: SiReact,
        level: "Advanced",
        description:
          "Reusable component systems, dashboards and production interfaces.",
        usedIn: ["FitTrack", "Tribal E-Commerce", "Vyaparix", "Freelance Projects"],
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        level: "Advanced",
        description:
          "Full-stack applications, routing, server-side features and production deployments.",
        usedIn: ["Autozynq", "Vyaparix", "Marvedge Screen Recorder"],
      },
      {
        name: "React Native",
        icon: SiReact,
        level: "Intermediate",
        description:
          "Cross-platform mobile interfaces and application experiences.",
        usedIn: ["SpeakForge"],
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        level: "Advanced",
        description:
          "Strong typing, safer APIs and maintainable application architecture.",
        usedIn: ["Autozynq", "Vyaparix", "SpeakForge"],
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        level: "Advanced",
        description:
          "Frontend, backend APIs and interactive application development.",
        usedIn: ["FitTrack", "Autozynq", "Freelance Projects"],
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        level: "Advanced",
        description:
          "Responsive layouts, design systems and rapid UI development.",
        usedIn: ["Autozynq", "FitTrack", "Vyaparix"],
      },
      {
        name: "HTML",
        icon: SiHtml5,
        level: "Advanced",
        description:
          "Semantic and accessible structures for responsive applications.",
        usedIn: ["Freelance Projects", "Vivirelle", "FitTrack"],
      },
      {
        name: "CSS",
        icon: SiCss3,
        level: "Advanced",
        description:
          "Custom layouts, animations, responsive behavior and visual polish.",
        usedIn: ["Portfolio", "Freelance Projects", "FitTrack"],
      },
    ],
  },

  {
    title: "Backend",
    description: "APIs, services & application logic",
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        level: "Advanced",
        description:
          "Backend services, APIs and server-side application architecture.",
        usedIn: ["Autozynq", "FitTrack", "Vyaparix"],
      },
      {
        name: "Express.js",
        icon: SiExpress,
        level: "Advanced",
        description:
          "REST APIs, middleware and backend application development.",
        usedIn: ["FitTrack", "Vyaparix", "Freelance Projects"],
      },
      {
        name: "REST APIs",
        icon: Network,
        level: "Advanced",
        description:
          "Designing and integrating structured APIs for production applications.",
        usedIn: ["Vivirelle", "FitTrack", "Vyaparix"],
      },
      {
        name: "JWT",
        icon: SiJsonwebtokens,
        level: "Advanced",
        description:
          "Authentication and role-based access control.",
        usedIn: ["FitTrack", "Tribal E-Commerce", "Vyaparix"],
      },
    ],
  },

  {
    title: "Database",
    description: "Data modeling & persistence",
    skills: [
      {
        name: "MongoDB",
        icon: SiMongodb,
        level: "Advanced",
        description:
          "Document-oriented data modeling and application persistence.",
        usedIn: ["FitTrack", "Tribal E-Commerce", "Freelance Projects"],
      },
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        level: "Advanced",
        description:
          "Relational data systems, queries and production application data.",
        usedIn: ["Autozynq", "Vyaparix", "SpeakForge", "Vivirelle"],
      },
      {
        name: "Prisma ORM",
        icon: SiPrisma,
        level: "Advanced",
        description:
          "Type-safe database access and maintainable relational data layers.",
        usedIn: ["Autozynq", "Vyaparix", "SpeakForge"],
      },
    ],
  },

  {
    title: "Tools & Cloud",
    description: "Deployment, workflow & infrastructure",
    skills: [
      {
        name: "Git",
        icon: SiGit,
        level: "Advanced",
        description:
          "Version control, branching and collaborative development workflows.",
        usedIn: ["All projects"],
      },
      {
        name: "AWS",
        icon: SiAmazonaws,
        level: "Intermediate",
        description:
          "Cloud services and deployment workflows.",
        usedIn: ["Marvedge Screen Recorder"],
      },
      {
        name: "Docker",
        icon: SiDocker,
        level: "Intermediate",
        description:
          "Containerized development and deployment workflows.",
        usedIn: ["Projects"],
      },
      {
        name: "AI APIs",
        icon: SiOpenai,
        level: "Intermediate",
        description:
          "Integrating AI-powered workflows and intelligent application features.",
        usedIn: ["Autozynq", "SpeakForge"],
      },
    ],
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSkill, setActiveSkill] = useState(0);

  const category = categories[activeCategory];
  const skill = category.skills[activeSkill] || category.skills[0];

  return (
    <section id="skills" className="refined-section refined-skills">
      <div className="refined-container">
        <div className="section-intro section-intro-wide">
          <div className="section-index">02 / TOOLKIT</div>

          <h2>
            Tools I use
            <br />
            <span>to build.</span>
          </h2>

          <p>
            A practical stack shaped by real projects, production work and
            continuous experimentation.
          </p>
        </div>

        <div className="skills-interface">
          <aside className="skills-sidebar">
            <div className="eyebrow">Categories</div>

            {categories.map((item, index) => (
              <button
                key={item.title}
                className={`skill-category ${
                  activeCategory === index ? "active" : ""
                }`}
                onClick={() => {
                  setActiveCategory(index);
                  setActiveSkill(0);
                }}
              >
                <span className="skill-category-number">
                  0{index + 1}
                </span>

                <span className="skill-category-name">
                  {item.title}
                </span>

                <span className="skill-category-count">
                  {item.skills.length}
                </span>
              </button>
            ))}
          </aside>

          <div className="skills-content">
            <div className="skills-content-heading">
              <div>
                <span className="eyebrow">{category.description}</span>
                <h3>{category.title}</h3>
              </div>

              <span className="skills-count">
                {String(category.skills.length).padStart(2, "0")} technologies
              </span>
            </div>

            <div className="skills-list">
              {category.skills.map((item, index) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    className={`skill-row ${
                      activeSkill === index ? "active" : ""
                    }`}
                    onMouseEnter={() => setActiveSkill(index)}
                    onClick={() => setActiveSkill(index)}
                  >
                    <span className="skill-row-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <Icon size={18} strokeWidth={1.5} />

                    <span className="skill-row-name">
                      {item.name}
                    </span>

                    <span className="skill-row-level">
                      {item.level}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="skill-detail">
              <div className="skill-detail-mark">
                {React.createElement(skill.icon, {
                  size: 32,
                  strokeWidth: 1.2,
                })}
              </div>

              <div>
                <span className="eyebrow">Selected technology</span>

                <h4>{skill.name}</h4>

                <p>{skill.description}</p>

                <div className="skill-used">
                  <span>Used in</span>

                  <div>
                    {skill.usedIn.map((project) => (
                      <span key={project}>{project}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
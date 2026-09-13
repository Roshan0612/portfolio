import React, { useState } from "react";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Autozynq",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1786435986/e566bba0-e7c0-49f3-b11d-c252cc55845f.png",
    description:
      "Production-ready Zapier/Make-style automation platform with a visual node-based builder, real-time workflow execution, integrations, monitoring and secure OAuth.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "React Flow",
      "Prisma ORM",
      "PostgreSQL",
      "NextAuth",
      "TailwindCSS",
      "OpenAI/Grok AI",
    ],
    github: "https://github.com/Roshan0612/Autozynq",
    live: "https://autozynq-9bs2.vercel.app/",
    status: "Currently Working",
  },

  {
    title: "FitTrack",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1762323535/WhatsApp_Image_2025-11-05_at_11.48.43_6b3fe802_lxbfdq.jpg",
    description:
      "Full-stack gym management platform with separate admin and user portals, subscriptions, diet plans, exercise tracking and role-based authentication.",
    technologies: [
      "React.js",
      "Tailwind",
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
    description:
      "B2B marketplace for discovering industrial and commercial products, suppliers and buying opportunities.",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Express 5",
      "PostgreSQL",
      "Prisma",
      "JWT",
      "Zod",
    ],
    github: "https://github.com/Roshan0612/Vyaparix",
    live: "https://client-gamma-eight-44.vercel.app/",
  },

  {
    title: "Tribal E-Commerce",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1762324261/WhatsApp_Image_2025-04-02_at_10.20.41_f9ee9fd7_fu6ycs.jpg",
    description:
      "Full-stack e-commerce application for tribal communities with product categorization, shopping cart functionality, Razorpay payments and role-based access.",
    technologies: [
      "React.js",
      "Tailwind",
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
    description:
      "Communication training application for interviews, debates, storytelling and pressure responses with AI-driven coaching, voice analysis and progress tracking.",
    technologies: [
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
      "https://res.cloudinary.com/dswa5docr/image/upload/v1768761937/b1d3140e-06e5-498a-adc0-7b172a827e51.png",
    description:
      "Lightweight screen recording web application designed for quick captures and sharing.",
    technologies: [
      "Next.js",
      "TypeScript",
      "AWS",
      "Tailwind CSS",
      "FFMPEG",
      "MediaRecorder API",
    ],
    github:
      "https://github.com/Roshan0612/marvedge-screen-recorder",
    live: "https://marvedge-screen-recorder.onrender.com/",
  },

  {
    title: "AI Workflow",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1767892981/89ce4c8c-6ca9-43b5-8860-c797f3969f4b.png",
    description: "",
    technologies: [],
    github: "https://github.com/Roshan0612/ai-workflow",
    live: "https://ai-workflow-hcko.onrender.com/",
  },

  {
    title: "Collaborative Task Manager",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1767893537/8ff7fb06-5a5f-4f1b-9d7b-4c56f83ef2a0.png",
    description: "",
    technologies: [],
    github:
      "https://github.com/Roshan0612/Collaborative-Task-Manager",
    live: "https://collaborative-task-manager-1-r7i4.onrender.com/",
  },

  {
    title: "OwnPresences",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1767893796/35d47676-dfa3-47aa-8e6f-ff0522166623.png",
    description: "",
    technologies: [],
    github: "https://github.com/Roshan0612/ownpresence",
    live: "https://ownpresences.onrender.com/",
  },

  {
    title: "GigFlow",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1768227951/709c761e-7522-42fc-84d6-9f54353e710a.png",
    description: "",
    technologies: [],
    github: "https://github.com/Roshan0612/gigflow",
    live: "https://gigflow-client.onrender.com",
  },

  {
    title: "Makeup Studio Website",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1762324496/WhatsApp_Image_2025-11-05_at_12.03.50_358abeba_b4rirx.jpg",
    description: "",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    github: "#",
    live: "https://www.ratikamakeup.studio/",
  },

  {
    title: "New Project",
    image:
      "https://res.cloudinary.com/dswa5docr/image/upload/v1770229124/e0f59266-ddff-43bd-b1cc-f2b3e2a4a22d.png",
    description: "",
    technologies: [],
    github: "https://github.com/Roshan0612/webtruvo",
    live: "https://webtruvo.onrender.com/",
  },
];

const Projects = () => {
  const [active, setActive] = useState(0);

  const project = projects[active];

  return (
    <section id="projects" className="refined-section refined-projects">
      <div className="refined-container">
        <div className="section-intro">
          <div className="section-index">03 / SELECTED WORK</div>

          <h2>
            Things I've
            <br />
            <span>built.</span>
          </h2>

          <p>
            A selection of products, platforms and experiments built across
            frontend, backend and full-stack development.
          </p>
        </div>

        <div className="project-showcase">
          <div className="project-preview">
            <div className="project-preview-image">
              <img src={project.image} alt={project.title} />

              <div className="project-preview-overlay" />

              <div className="project-preview-index">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </div>

              <div className="project-preview-links">
                {project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={17} />
                    Live
                  </a>
                )}

                {project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={17} />
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="project-information">
            <div className="eyebrow">Featured project</div>

            <h3>{project.title}</h3>

            <p className="project-description">
              {project.description ||
                "A project built as part of my continued exploration of modern web development."}
            </p>

            {project.technologies.length > 0 && (
              <div className="project-technologies">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            )}

            {project.status && (
              <div className="project-status">
                <span />
                {project.status}
              </div>
            )}

            <div className="project-counter">
              <span>Explore projects</span>

              <div className="project-counter-buttons">
                <button
                  disabled={active === 0}
                  onClick={() =>
                    setActive((value) => Math.max(0, value - 1))
                  }
                >
                  ←
                </button>

                <button
                  disabled={active === projects.length - 1}
                  onClick={() =>
                    setActive((value) =>
                      Math.min(projects.length - 1, value + 1)
                    )
                  }
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="project-index-list">
          {projects.map((item, index) => (
            <button
              key={item.title}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <ArrowUpRight size={15} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
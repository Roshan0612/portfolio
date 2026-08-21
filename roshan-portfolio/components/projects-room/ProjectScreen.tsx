"use client";

interface Project {
  name: string;
  type: string;
  description: string;
  technologies: string[];
}

interface ProjectScreenProps {
  project: Project;
  index: number;
}

export default function ProjectScreen({
  project,
  index,
}: ProjectScreenProps) {
  return (
    <div className="project-screen">

      <div className="screen-top">

        <span>
          ROSHAN.DEV
        </span>

        <span>
          PROJECT_
          {String(index + 1).padStart(2, "0")}
        </span>

      </div>

      <div className="screen-content">

        <span className="screen-number">
          0{index + 1}
        </span>

        <div>

          <span className="screen-category">
            {project.type}
          </span>

          <h1>
            {project.name}
          </h1>

          <p>
            {project.description}
          </p>

          <div className="screen-tech">

            {project.technologies.map(
              (tech) => (
                <span key={tech}>
                  {tech}
                </span>
              )
            )}

          </div>

          <div className="screen-buttons">

            <button>
              VIEW PROJECT
              <span>↗</span>
            </button>

            <button>
              GITHUB
              <span>↗</span>
            </button>

          </div>

        </div>

      </div>

      <div className="screen-bottom">

        <span>
          FULL STACK DEVELOPMENT
        </span>

        <span>
          2026
        </span>

      </div>

    </div>
  );
}
import React from "react";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

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
    technologies: [
      "React.js",
      "JavaScript",
      "HTML",
      "CSS",
      "REST API",
    ],
    website: "",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="refined-section refined-experience">
      <div className="refined-container">
        <div className="section-intro">
          <div className="section-index">04 / EXPERIENCE</div>

          <h2>
            Where I've
            <br />
            <span>worked.</span>
          </h2>

          <p>
            Professional experience across internships, freelance work and
            real-world product development.
          </p>
        </div>

        <div className="experience-list">
          {experiences.map((experience, index) => (
            <article className="experience-item" key={experience.company}>
              <div className="experience-marker">
                <span>0{index + 1}</span>
                <div />
              </div>

              <div className="experience-main">
                <div className="experience-heading">
                  <div>
                    <span className="experience-type">
                      {experience.type}
                    </span>

                    <h3>{experience.title}</h3>

                    <a
                      href={experience.website || undefined}
                      target={experience.website ? "_blank" : undefined}
                      rel={
                        experience.website
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={!experience.website ? "disabled" : ""}
                    >
                      {experience.company}

                      {experience.website && (
                        <ExternalLink size={14} />
                      )}
                    </a>
                  </div>

                  <div className="experience-meta">
                    <span>
                      <Calendar size={14} />
                      {experience.period}
                    </span>

                    <span>
                      <MapPin size={14} />
                      {experience.location}
                    </span>
                  </div>
                </div>

                <div className="experience-body">
                  <p>{experience.description}</p>

                  <div className="experience-columns">
                    <div>
                      <span className="eyebrow">Impact</span>

                      <ul>
                        {experience.achievements.map((achievement) => (
                          <li key={achievement}>
                            <span>↗</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="eyebrow">Stack</span>

                      <div className="experience-tech">
                        {experience.technologies.map((technology) => (
                          <span key={technology}>
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="experience-bottom">
                  <span>
                    Experience {String(index + 1).padStart(2, "0")}
                  </span>

                  <ArrowUpRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="resume-panel">
          <div>
            <span className="eyebrow">Want the complete story?</span>
            <h3>Take a look at my resume.</h3>
          </div>

          <a
            href="/roshan-resume.pdf"
            download="Roshan-Gawade-Resume.pdf"
          >
            Download resume
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
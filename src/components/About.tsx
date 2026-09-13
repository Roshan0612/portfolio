import React from "react";
import { Code2, Lightbulb, Users, Zap, ArrowUpRight } from "lucide-react";

const About = () => {
  const highlights = [
    {
      number: "01",
      icon: Code2,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable code with strong engineering practices.",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Exploring new technologies and practical approaches to solve problems.",
    },
    {
      number: "03",
      icon: Users,
      title: "Collaboration",
      description:
        "Working closely with teams and clients to turn requirements into products.",
    },
    {
      number: "04",
      icon: Zap,
      title: "Performance",
      description:
        "Improving speed, responsiveness and efficiency across applications.",
    },
  ];

  return (
    <section id="about" className="refined-section refined-about">
      <div className="refined-container">
        <div className="section-intro">
          <div className="section-index">01 / ABOUT</div>

          <h2>
            Building with
            <br />
            <span>purpose.</span>
          </h2>

          <p>
            A computer engineer focused on creating useful, scalable and
            thoughtful digital experiences.
          </p>
        </div>

        <div className="about-main-grid">
          <div className="about-copy">
            <div className="about-big-mark">RG</div>

            <div className="about-copy-content">
              <div className="eyebrow">A little about me</div>

              <h3>
                Final-Year Computer Engineer
                <br />
                & Full-Stack Developer
              </h3>

              <p>
                I'm a final-year Computer Engineering student with a strong
                foundation in full-stack web development. Specializing in the
                MERN stack, I build responsive, scalable applications that
                solve real-world problems.
              </p>

              <p>
                With hands-on experience as a freelancer, I've successfully
                delivered 5+ high-quality client projects, consistently
                improving user experience by 25%. I enjoy working closely with
                clients to understand their needs and turn those requirements
                into polished products.
              </p>

              <p>
                My toolkit includes React.js, Node.js, MongoDB, PostgreSQL,
                TypeScript and modern responsive design practices.
              </p>

              <div className="about-stat-row">
                <div>
                  <strong>5+</strong>
                  <span>Client projects</span>
                </div>

                <div>
                  <strong>200+</strong>
                  <span>DSA problems</span>
                </div>

                <div>
                  <strong>25%</strong>
                  <span>UX improvement</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-principles">
            <div className="eyebrow">How I work</div>

            <div className="principles-list">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <article className="principle-card" key={item.number}>
                    <div className="principle-top">
                      <span>{item.number}</span>

                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    <h4>{item.title}</h4>

                    <p>{item.description}</p>

                    <div className="principle-arrow">
                      <ArrowUpRight size={16} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
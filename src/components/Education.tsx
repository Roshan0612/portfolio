import React from "react";
import { ArrowUpRight, GraduationCap } from "lucide-react";

const educationList = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution:
      "Shree L.R Tiwari College of Engineering (Mumbai University)",
    location: "Mumbai, India",
    period: "09/2022 - 06/2026",
    result: "8.166 CGPA",
  },
  {
    degree: "HSC In Science PCMB",
    institution: "Kankavli College Kankavli",
    location: "Kankavli Sindhudurg, India",
    period: "06/2020 - 03/2021",
    result: "82.83%",
  },
  {
    degree: "SSC",
    institution: "Vidyamandir Highschool Kankavli",
    location: "Kankavli Sindhudurg, India",
    period: "06/2018 - 03/2019",
    result: "84.80%",
  },
];

const Education = () => {
  return (
    <section id="education" className="refined-section refined-education">
      <div className="refined-container">
        <div className="section-intro">
          <div className="section-index">05 / EDUCATION</div>

          <h2>
            The foundation
            <br />
            <span>behind the work.</span>
          </h2>

          <p>
            Academic milestones that shaped my foundation in computer science
            and engineering.
          </p>
        </div>

        <div className="education-list">
          {educationList.map((education, index) => (
            <article className="education-item" key={education.degree}>
              <div className="education-year">
                <span>0{index + 1}</span>
                <strong>{education.period}</strong>
              </div>

              <div className="education-icon">
                <GraduationCap size={22} strokeWidth={1.4} />
              </div>

              <div className="education-content">
                <span className="eyebrow">
                  {education.location}
                </span>

                <h3>{education.degree}</h3>

                <p>{education.institution}</p>
              </div>

              <div className="education-result">
                <span>Result</span>
                <strong>{education.result}</strong>

                <ArrowUpRight size={17} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
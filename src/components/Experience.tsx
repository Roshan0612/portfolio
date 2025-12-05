import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Freelance Web Developer',
      company: 'Self-employed',
      location: '',
      period: 'July 2025 – present',
      type: 'Freelance',
      description: 'Designed and developed a responsive and modern website for a makeup studio using React.Js, JavaScript, Tailwind CSS, Vite, HTML, and CSS.',
      achievements: [
        'Built dynamic and reusable UI components with type safety to enhance user experience and maintainability.',
        'Worked directly with the client to gather requirements, implement feedback, and deliver a tailored, user-friendly solution.'
      ],
      technologies: ['React.Js','Next.js', 'JavaScript','Typescript', 'Tailwind CSS', 'Vite', 'HTML', 'CSS','Node.js','Express.js'],
      website: '#'
    },
    
  ];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/roshan-resume.pdf"; 
    link.download = "roshan-resume.pdf";       
    link.click();
  };

  return (
    <section id="experience" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Work <span className="text-teal-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey showcasing growth, impact, and technical expertise across different organizations
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-blue-500 to-orange-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-teal-400 rounded-full border-4 border-slate-900 z-10"></div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <div className="bg-slate-800 rounded-xl p-6 shadow-xl hover:bg-slate-700 transition-all duration-300 hover:shadow-2xl">
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-teal-400 font-semibold">{exp.company}</h4>
                          <a href={exp.website} className="text-gray-400 hover:text-teal-400 transition-colors duration-300">
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </div>
                      <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    <div className="mb-4">
                      <h5 className="text-white font-semibold mb-2">Key Achievements:</h5>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-gray-300 text-sm flex items-start">
                            <span className="text-teal-400 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-white font-semibold mb-2">Technologies:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs hover:bg-slate-600 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16" onClick={handleDownload}>
          <button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
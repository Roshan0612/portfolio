import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      location: 'Remote',
      period: 'July 2025 – Present',
      type: 'Freelance',
      description: 'Designed and developed fully responsive, modern websites for 5 clients using React.js, JavaScript, Tailwind CSS, Vite, HTML, and CSS, enhancing online visibility and engagement.',
      achievements: [
        'Built 10+ dynamic and reusable UI components with strong type safety, improving user experience and maintainability by 25%.',
        'Collaborated closely with clients to gather requirements, incorporate feedback, and deliver customized, high-performance solutions on schedule.'
      ],
      technologies: ['React.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML', 'CSS', 'Node.js', 'Express.js', 'MongoDB'],
      website: '#'
    }
  ];

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/roshan-resume.pdf"; 
    link.download = "roshan-resume.pdf";       
    link.click();
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-[1920px] mx-auto px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My professional journey showcasing growth, impact, and technical expertise across different organizations
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-blue-500 to-orange-500 animate-shimmer"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-teal-400 rounded-full border-4 border-slate-900 z-10 animate-glow shadow-lg shadow-teal-400/50"></div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <div className="glass rounded-2xl p-8 card-hover shadow-xl border border-slate-700/50 hover:border-teal-400/50 transition-all group">
                    <div className="flex flex-wrap items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">{exp.title}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <h4 className="text-teal-400 font-semibold text-lg">{exp.company}</h4>
                          <a href={exp.website} className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-125">
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                      <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold border border-orange-500/40 hover:border-orange-500/60 transition-all">
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center text-gray-400 text-sm mb-6 gap-6">
                      <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                        <Calendar size={16} className="text-teal-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                        <MapPin size={16} className="text-teal-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed text-lg group-hover:text-gray-200 transition-colors">{exp.description}</p>

                    <div className="mb-6">
                      <h5 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Key Achievements</h5>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-gray-300 text-sm flex items-start leading-relaxed hover:text-gray-200 transition-colors">
                            <span className="text-teal-400 mr-3 mt-1 flex-shrink-0">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-slate-800/80 text-gray-300 px-3 py-2 rounded-lg text-xs font-medium hover:bg-teal-500/20 hover:text-teal-300 hover:border-teal-400/50 transition-all duration-300 border border-slate-700/50 cursor-default"
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

        <div className="text-center mt-20">
          <button onClick={handleDownload} className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl btn-hover">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
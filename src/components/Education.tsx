import React from 'react';

const Education = () => {
  const educationList = [
    {
      degree: 'SSC',
      institution: 'Vidyamandir Highschool Kankavli',
      location: 'Kankavli Sindhudurg, India',
      period: '06/2018 - 03/2019',
      details: [
        '84.83%'
      ]
    },
    {
      degree: 'HSC In Science PCMB',
      institution: 'Kankavli College Kankavli',
      location: 'Kankavli Sindhudurg, India',
      period: '06/2020 - 03/2021',
      details: [
        '82.83%'
      ]
    },
    {
      degree: 'Bachelor of Engineering in Computer Science',
      institution: 'Shree L.R Tiwari College of Engineering (Mumbai University)',
      location: 'Mumbai, India',
      period: '09/2022 - 06/2026',
      details: [
        '7.9 CGPA'
      ]
    }
  ];

  return (
    <section id="education" className="w-full py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-8 lg:px-16 xl:px-24">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Education
            <span className="gradient-text"> & Qualifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-gray-700 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My academic background and achievements in technology and computer science
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-gray-600 to-orange-500 animate-shimmer"></div>
          <div className="space-y-12">
            {educationList.map((edu, index) => (
              <div 
                key={index} 
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} animate-scale-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 bg-teal-400 rounded-full border-4 border-gray-950 z-10 animate-glow shadow-lg shadow-teal-400/50"></div>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <div className="glass rounded-2xl p-8 card-hover shadow-xl border border-gray-800/50 hover:border-teal-400/50 transition-all group">
                    <div className="flex flex-wrap items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">{edu.degree}</h3>
                        <h4 className="text-teal-400 font-semibold text-lg">{edu.institution}</h4>
                      </div>
                      <span className="bg-gray-700/20 text-gray-300 px-4 py-2 rounded-full text-sm font-semibold border border-gray-600/40 hover:border-gray-600/60 transition-all">
                        {edu.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center text-gray-400 text-sm mb-6">
                      <span className="group-hover:text-gray-300 transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                        {edu.location}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {edu.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="text-gray-300 text-sm flex items-center gap-3 font-medium group-hover:text-gray-200 transition-colors">
                          <span className="text-teal-400 flex-shrink-0">→</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

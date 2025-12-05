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
    <section id="education" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Education
            <span className="text-teal-400"> & Qualifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic background and achievements in technology and computer science
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 via-blue-500 to-orange-500"></div>
          <div className="space-y-12">
            {educationList.map((edu, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-teal-400 rounded-full border-4 border-slate-900 z-10"></div>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <div className="bg-slate-800 rounded-xl p-6 shadow-xl hover:bg-slate-700 transition-all duration-300 hover:shadow-2xl">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                        <h4 className="text-teal-400 font-semibold">{edu.institution}</h4>
                      </div>
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                        {edu.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center text-gray-400 text-sm mb-4 space-x-4">
                      <span>{edu.location}</span>
                    </div>
                    <ul className="space-y-1">
                      {edu.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="text-gray-300 text-sm flex items-start">
                          <span className="text-teal-400 mr-2">•</span>
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

import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      color: 'from-blue-500 to-purple-600',
      skills: [
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'TypeScript', icon: '🟦' },
        { name: 'Next.js', icon: '⬢' },
        { name: 'React JS', icon: '⚛️' },
        { name: 'Redux', icon: '🔄' },
        { name: 'Tailwind CSS', icon: '💨' },
        { name: 'Bootstrap', icon: '🅱️' },
        { name: 'GSAP', icon: '🎬' }
      ]
    },
    {
      title: 'Backend',
      color: 'from-teal-500 to-green-600',
      skills: [
        { name: 'Node JS', icon: '🟢' },
        { name: 'Express JS', icon: '🚀' },
        { name: 'MySQL', icon: '🐬' },
        { name: 'MongoDB', icon: '🍃' }
      ]
    },
    {
      title: 'Languages',
      color: 'from-orange-500 to-red-600',
      skills: [
        { name: 'C', icon: '©️' },
        { name: 'C++', icon: '➕' },
        { name: 'Java', icon: '☕' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'TypeScript', icon: '🟦' }
      ]
    },
    {
      title: 'Tools',
      color: 'from-purple-500 to-pink-600',
      skills: [
        { name: 'Git', icon: '📝' },
        { name: 'GitHub', icon: '🐙' },
        { name: 'VS Code', icon: '💻' },
        { name: 'IntelliJ IDEA', icon: '🧠' },
        { name: 'Postman', icon: '📮' },
        { name: 'Compass', icon: '🧭' },
        { name: 'Vercel', icon: '▲' },
        { name: 'Docker', icon: '🐳' } // added Docker
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Technical <span className="text-teal-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            These are the technologies I've worked with during my learning journey and projects
            — each helping me grow as a developer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 transition-all duration-300 border border-slate-700">
              <h3 className={`text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="bg-slate-900 rounded-lg p-4 hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-teal-400/50"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{skill.icon}</div>
                      <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
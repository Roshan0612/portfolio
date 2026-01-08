import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      color: 'from-gray-400 to-gray-600',
      skills: [
        { name: 'JavaScript', icon: '⚡' },
        { name: 'TypeScript', icon: '🟦' },
        { name: 'C', icon: '©️' },
        { name: 'Java', icon: '☕' },
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'Bootstrap', icon: '🅱️' },
        { name: 'React.js', icon: '⚛️' },
        { name: 'Next.js', icon: '⬢' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express.js', icon: '🚀' },
        { name: 'Tailwind CSS', icon: '💨' }
      ]
    },
    {
      title: 'Databases',
      color: 'from-teal-500 to-green-600',
      skills: [
        { name: 'MySQL', icon: '🐬' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'PostgreSQL', icon: '🐘' }
      ]
    },
    {
      title: 'Development Tools & Platforms',
      color: 'from-orange-500 to-red-600',
      skills: [
        { name: 'Docker', icon: '🐳' },
        { name: 'VS Code', icon: '💻' },
        { name: 'Render', icon: '☁️' },
        { name: 'Git & GitHub', icon: '🐙' },
        { name: 'Postman', icon: '📮' },
        { name: 'IntelliJ IDEA', icon: '🧠' },
        { name: 'Cursor', icon: '📝' },
        { name: 'GSAP', icon: '🎬' }
      ]
    },
    {
      title: 'Additional Skills',
      color: 'from-gray-500 to-gray-700',
      skills: [
        { name: 'RESTful APIs', icon: '🔌' },
        { name: 'JWT Authentication', icon: '🔐' },
        { name: 'Version Control', icon: '📝' },
        { name: 'Redux', icon: '🔄' },
        { name: 'Context API', icon: '🌐' },
        { name: 'Responsive Design', icon: '📱' },
        { name: 'CI/CD Basics', icon: '🔄' },
        { name: 'DSA (150Q)', icon: '🧩' }
      ]
    }
  ];

  return (
    <section id="skills" className="w-full py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-8 lg:px-16 xl:px-24">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-gray-700 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            These are the technologies I've worked with during my learning journey and projects
            — each helping me grow as a developer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="glass rounded-2xl p-10 card-hover border border-gray-800/50 hover:border-teal-400/50 animate-scale-in group overflow-hidden relative"
              style={{ animationDelay: `${categoryIndex * 0.15}s` }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-gray-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h3 className={`text-2xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="bg-gray-950/60 backdrop-blur-sm rounded-xl p-4 card-hover border border-gray-800/60 hover:border-teal-400/60 transition-all duration-300 group/skill animate-scale-in"
                    style={{ animationDelay: `${categoryIndex * 0.15 + skillIndex * 0.05}s` }}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-3 animate-float inline-block transition-transform group-hover/skill:scale-125" style={{ animationDelay: `${skillIndex * 0.2}s` }}>{skill.icon}</div>
                      <span className="text-gray-300 font-medium text-sm block group-hover/skill:text-teal-300 transition-colors duration-300">{skill.name}</span>
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
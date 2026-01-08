import React from 'react';
import { Code, Lightbulb, Users, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code with best practices'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly exploring new technologies and approaches'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Strong team player with excellent communication skills'
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-[1920px] mx-auto px-8 sm:px-12 lg:px-16 xl:px-24">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-gray-700 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-left stagger-1 space-y-6">
            <h3 className="text-3xl font-bold text-white leading-tight">
              Final-Year Computer Engineer & Full-Stack Developer
            </h3>
            <div className="space-y-5 text-gray-300 leading-relaxed text-lg">
              <p className="hover:text-gray-200 transition-colors duration-300">
                I'm a final-year Computer Engineering student with a strong foundation in full-stack web development. Specializing in the MERN stack, I build responsive, scalable applications that solve real-world problems.
              </p>
              <p className="hover:text-gray-200 transition-colors duration-300">
                With hands-on experience as a freelancer, I've successfully delivered 5+ high-quality client projects, consistently improving user experience by 25%. I thrive on collaborating with clients to understand their needs and delivering customized solutions that exceed expectations.
              </p>
              <p className="hover:text-gray-200 transition-colors duration-300">
                Passionate about clean code, innovative solutions, and continuous learning. My toolkit includes modern technologies like React.js, Node.js, MongoDB, and responsive design practices.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-fade-in-right stagger-2">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="glass p-8 rounded-xl card-hover animate-scale-in group border border-gray-800/50 hover:border-teal-400/50"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="text-teal-400 mb-4 animate-float transition-transform group-hover:scale-110" style={{ animationDelay: `${index * 0.5}s` }}>
                    <Icon size={36} />
                  </div>
                  <h4 className="text-white font-bold mb-2 text-lg">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
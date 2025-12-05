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
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            About <span className="text-teal-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Passionate about building the future of web
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                With over 5 years of experience in full-stack development, I specialize in creating 
                robust web applications using modern technologies. My journey began with a fascination 
                for problem-solving and has evolved into a career dedicated to crafting exceptional 
                digital experiences.
              </p>
              <p>
                I thrive in collaborative environments where I can contribute to innovative projects 
                while continuously learning and growing. My approach combines technical expertise with 
                user-centric design thinking to deliver solutions that not only work flawlessly but 
                also delight users.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source projects, mentoring 
                junior developers, or exploring the latest trends in technology and design.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <div className="text-teal-400 mb-4">
                    <Icon size={32} />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
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
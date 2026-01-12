import React from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'FitTrack',
      image :"https://res.cloudinary.com/dswa5docr/image/upload/v1762323535/WhatsApp_Image_2025-11-05_at_11.48.43_6b3fe802_lxbfdq.jpg",
      description: '• Developed a full-stack responsive web application for gym management with separate admin and user portals.• Admin portal: Create and manage exercises, diet plans, coupons, and subscriptions; assign exercises and diet plans to individual users; track subscription status and user activity.• User portal: View assigned diet and exercise plans, track daily calories, and monitor personal progress based on input data.• Implemented JWT authentication for secure role-based access control and Framer Motion animations for a smooth,responsive UI.• Designed MongoDB schemas to handle user profiles, plans, subscriptions, and activity efficiently.• Tech Stack: MERN, React.js, Node.js, Express.js, MongoDB, JWT, Framer Motion, Tailwind CSS',
      technologies: ['React.js', 'Tailwind', 'CSS', 'Motion', 'Node.js', 'Express.js', 'MongoDB','Razorpay', 'JWT'],
      github: 'https://github.com/Roshan0612/FitTrack',
      demo: 'https://tinyurl.com/29t4mtyj',
      featured: true
    },
    {
      title: 'Tribal E-Commerce',
       image :"https://res.cloudinary.com/dswa5docr/image/upload/v1762324261/WhatsApp_Image_2025-04-02_at_10.20.41_f9ee9fd7_fu6ycs.jpg",
      description: 'E-Commerce Platform. Developed a full-stack e-commerce application for tribal communities using the MERN stack. Integrated Razorpay to enable secure and seamless online transactions. Implemented JWT-based authentication with role-based access control. Designed product categorization and shopping cart functionality. Enabled middleman support to manage multiple tribal profiles and product listings.',
      technologies: ['React.js', 'Tailwind', 'CSS',, 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'JWT'],
      github: 'https://github.com/Roshan0612/tribesHub-E_marketplace',
      demo: '#',
      featured: true
    },
    
    {
      title: 'Autozynq',
      image: 'https://res.cloudinary.com/dswa5docr/image/upload/v1767939812/dfd123e6-3706-49d1-99cf-22ad81c1e896.png',
      description: '• Built a Make.com-inspired workflow automation platform with a React Flow visual builder for intuitive workflow design.• Implemented backend-validated workflow schemas with webhook-driven execution engine supporting conditional branching, idempotency, cancellation, and detailed step-level logs.• Designed a pluggable node system for third-party integrations (Google Forms, Gmail, AI APIs), enabling scalable automation without engine rewrites.• Developed comprehensive debug dashboards for workflows, triggers, and executions to inspect payloads, execution paths, and failures in real-time.• Tech Stack: React Flow, TypeScript, Node.js, Express.js, MongoDB, Webhooks, Google APIs, Postman',
      technologies: ['React Flow', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Webhooks', 'Google APIs', 'Rest APIs'],
      github: 'https://github.com/Roshan0612/Autozynq',
      demo: '#',
      featured: true,
      status: 'Currently Working'
    },
    
    {
      title: 'makeup studio website',
      description: '',
      image: 'https://res.cloudinary.com/dswa5docr/image/upload/v1762324496/WhatsApp_Image_2025-11-05_at_12.03.50_358abeba_b4rirx.jpg',
      technologies: ['React', 'TypeScript', 'vite','tailwind css'],
      demo: 'https://www.ratikamakeup.studio/',
      featured: true
    },
    // Additional projects appended to bottom (non-featured)
    {
      title: 'AI Workflow',
      description: '',
      image: 'https://res.cloudinary.com/dswa5docr/image/upload/v1767892981/89ce4c8c-6ca9-43b5-8860-c797f3969f4b.png',
      technologies: [],
      demo: 'https://ai-workflow-hcko.onrender.com/',
      github: 'https://github.com/Roshan0612/ai-workflow',
      featured: false
    },
    {
      title: 'Collaborative Task Manager',
      description: '',
      image: 'https://res.cloudinary.com/dswa5docr/image/upload/v1767893537/8ff7fb06-5a5f-4f1b-9d7b-4c56f83ef2a0.png',
      technologies: [],
      demo: 'https://collaborative-task-manager-1-r7i4.onrender.com/',
      github: 'https://github.com/Roshan0612/Collaborative-Task-Manager',
      featured: false
    },
    {
      title: 'OwnPresences',
      description: '',
      image: 'https://res.cloudinary.com/dswa5docr/image/upload/v1767893796/35d47676-dfa3-47aa-8e6f-ff0522166623.png',
      technologies: [],
      demo: 'https://ownpresences.onrender.com/',
      github: 'https://github.com/Roshan0612/ownpresence',
      featured: false
    },
    {
      title: 'GigFlow',
      description: '',
      image: 'https://res.cloudinary.com/dswa5docr/image/upload/v1768227951/709c761e-7522-42fc-84d6-9f54353e710a.png',
      technologies: [],
      demo: 'https://gigflow-client.onrender.com',
      github: 'https://github.com/Roshan0612/gigflow',
      featured: false
    }
    
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="w-full py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-8 lg:px-16 xl:px-24">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-gray-700 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of my recent work, demonstrating technical skills and creative problem-solving
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-20 mb-24">
          {featuredProjects.map((project, index) => (
            <div 
              key={index} 
              className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''} animate-scale-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl border border-gray-800/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 gap-4">
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        className="bg-teal-500/90 hover:bg-teal-600 text-white p-4 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg hover:shadow-teal-500/50 backdrop-blur-sm border border-teal-400/50"
                      >
                        <Eye size={24} />
                      </a>
                    )}
                    <a
                      href={project.github}
                      className="bg-gray-900/90 hover:bg-gray-800 text-white p-4 rounded-full transition-all duration-300 hover:scale-125 hover:shadow-lg hover:shadow-gray-400/20 backdrop-blur-sm border border-gray-700/50"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold text-white animate-fade-in-up leading-tight" style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>{project.title}</h3>
                  {project.status && (
                    <span className="px-3 py-1 bg-teal-400/20 border border-teal-400/50 text-teal-300 text-xs font-semibold rounded-full animate-fade-in-up" style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-8 leading-relaxed text-lg animate-fade-in-up" style={{ animationDelay: `${index * 0.2 + 0.2}s` }}>{project.description}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="glass px-4 py-2 rounded-full text-sm text-gray-300 hover:text-teal-300 border border-gray-800/50 hover:border-teal-400/50 transition-all duration-300 hover:scale-105 animate-scale-in group/tech"
                      style={{ animationDelay: `${index * 0.2 + 0.3 + techIndex * 0.05}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6 pt-4">
                  <a
                    href={project.demo}
                    className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-all duration-300 font-medium link-hover group/link"
                  >
                    <ExternalLink size={20} className="group-hover/link:translate-x-1 transition-transform" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 font-medium link-hover group/link"
                  >
                    <Github size={20} className="group-hover/link:translate-x-1 transition-transform" />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden card-hover group border border-gray-800/50 hover:border-teal-400/50 transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                    <a
                      href={project.demo}
                      className="bg-teal-500/80 hover:bg-teal-600 text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-teal-400/50"
                    >
                      <Eye size={18} />
                    </a>
                    <a
                      href={project.github}
                      className="bg-gray-900/80 hover:bg-gray-800 text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-700/50"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors">{project.title}</h4>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-900/60 text-gray-300 px-3 py-1 rounded-lg text-xs font-medium border border-gray-800/50 hover:border-teal-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-500 text-xs font-medium py-1 px-2">+{project.technologies.length - 3}</span>
                    )}
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

export default Projects;
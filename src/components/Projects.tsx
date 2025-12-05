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
      title: 'makeup studio website',
      description: '',
      image: 'https://res.cloudinary.com/dswa5docr/image/upload/v1762324496/WhatsApp_Image_2025-11-05_at_12.03.50_358abeba_b4rirx.jpg',
      technologies: ['React', 'TypeScript', 'vite','tailwind css'],
      demo: 'https://www.ratikamakeup.studio/',
      featured: true
    },
    
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Featured <span className="text-teal-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating technical skills and creative problem-solving
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-16 mb-20">
          {featuredProjects.map((project, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover rounded-xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex space-x-4">
                      <a
                        href={project.demo}
                        className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition-colors duration-300"
                      >
                        <Eye size={20} />
                      </a>
                      <a
                        href={project.github}
                        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition-colors duration-300"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-slate-600 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.demo}
                    className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors duration-300"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <Github size={18} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center"></h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <div key={index} className="bg-slate-900 rounded-xl overflow-hidden hover:bg-slate-700 transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <a
                      href={project.demo}
                      className="bg-slate-800/80 hover:bg-teal-500 text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <Eye size={16} />
                    </a>
                    <a
                      href={project.github}
                      className="bg-slate-800/80 hover:bg-slate-600 text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <Github size={16} />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-slate-800 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-500 text-xs">+{project.technologies.length - 3} more</span>
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
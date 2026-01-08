import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const AnimatedText = () => {
  const roles = ['Computer Engineer', 'Full-Stack Developer', 'Web Developer'];
  const [currentRole, setCurrentRole] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState('');
  const [typing, setTyping] = React.useState(true);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayedText.length < roles[currentRole].length) {
        timeout = setTimeout(() => {
          setDisplayedText(roles[currentRole].slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setTyping(false);
        }, 1200);
      }
    } else {
      timeout = setTimeout(() => {
        setTyping(true);
        setDisplayedText('');
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, typing, currentRole, roles]);

  return (
    <span className="inline-block w-full text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-gray-300 to-gray-400 text-center">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/roshan-resume.pdf"; 
    link.download = "roshan-resume.pdf";       
    link.click();
  };

  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-500/20 to-teal-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-gray-700/20 to-gray-800/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-gray-700/10 to-gray-800/5 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-[1920px] mx-auto px-3 sm:px-8 lg:px-16 xl:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
              Hi, I'm <span className="gradient-text bg-clip-text">Roshan Gawade</span>
            </h1>
            <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-200 mb-8 h-20 relative font-semibold animate-fade-in-up stagger-1">
              <span className="inline-flex items-baseline gap-2 align-middle">
                <span className="align-middle">I am a</span>
                <span className="align-middle"><AnimatedText /></span>
              </span>
            </div>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up stagger-2">
              Final-year Computer Engineering student with a strong foundation in full-stack web development. Skilled in building responsive, scalable, and user-friendly applications using the MERN stack. Experienced freelancer with a proven track record of delivering tailored, high-quality client projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12 animate-fade-in-up stagger-3">
              <button
                className="bg-gradient-to-r from-teal-400 to-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:from-teal-500 hover:to-gray-800 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 btn-hover group relative overflow-hidden"
                onClick={handleDownload}
              >
                <span className="relative z-10">Download Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-3 border-2 border-teal-400/50 text-teal-300 rounded-lg font-semibold hover:border-teal-400 hover:text-teal-200 transition-all duration-300 hover:bg-teal-400/10">
                Explore My Work
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6 animate-fade-in-up stagger-4">
              <a
                href="https://github.com/Roshan0612"
                className="p-3 rounded-full text-gray-400 hover:text-teal-400 bg-gray-900/50 hover:bg-teal-400/10 transition-all duration-300 transform hover:scale-125 border border-gray-800/50 hover:border-teal-400/30 group"
                aria-label="GitHub"
              >
                <Github size={20} className="transition-transform group-hover:rotate-12" />
              </a>
              <a
                href="https://www.linkedin.com/in/roshan-gawade-469bb422a/"
                className="p-3 rounded-full text-gray-400 hover:text-gray-300 bg-gray-900/50 hover:bg-gray-700/20 transition-all duration-300 transform hover:scale-125 border border-gray-800/50 hover:border-teal-400/30 group"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="transition-transform group-hover:rotate-12" />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                className="p-3 rounded-full text-gray-400 hover:text-orange-400 bg-gray-900/50 hover:bg-orange-400/10 transition-all duration-300 transform hover:scale-125 border border-gray-800/50 hover:border-orange-400/30 group"
                aria-label="Email"
              >
                <Mail size={20} className="transition-transform group-hover:rotate-12" />
              </a>
            </div>
          </div>

          {/* Right side - Profile photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-teal-400 p-1 bg-gradient-to-r from-teal-400 to-gray-700 animate-pulse-slow shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                  <img
                    src="https://res.cloudinary.com/dswa5docr/image/upload/v1767027372/headshot_roshan_portfolio_lwgaci.jpg"
                    alt="Roshan Gawade"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* Floating elements around the photo */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full animate-float shadow-lg shadow-teal-400/50"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-gray-600 rounded-full animate-float-delayed shadow-lg shadow-gray-600/50"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-orange-400 rounded-full animate-float shadow-lg shadow-orange-400/50"></div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <button
            onClick={scrollToAbout}
            className="inline-flex flex-col items-center text-gray-400 hover:text-teal-400 transition-all duration-300 group"
            aria-label="Scroll down"
          >
            <span className="text-sm font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Scroll Down</span>
            <ChevronDown size={32} className="group-hover:translate-y-1 transition-transform duration-300 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
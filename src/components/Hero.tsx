import React from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const AnimatedText = () => {
  const roles = ['Software Engineer','Software Developer', 'Full-Stack Developer'];
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
    <span className="inline-block w-full text-transparent bg-clip-text bg-gradient-to-r from-[#39ff14] via-[#00fff7] to-[#ff00cc] text-center">
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
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="animate-fade-in-up text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Roshan Gawade</span>
            </h1>
            <div className="text-2xl sm:text-3xl lg:text-4xl text-gray-200 mb-8 h-16 relative font-medium">
              <span className="inline-flex items-baseline gap-2 align-middle">
                <span className="align-middle">I am a</span>
                <span className="align-middle"><AnimatedText /></span>
              </span>
            </div>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              I craft exceptional digital experiences through clean code, innovative solutions, and user-centric design. Specializing in modern web technologies and scalable applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <button
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:from-teal-500 hover:to-blue-600 shadow-lg"
                onClick={handleDownload}
              >
                Download Resume
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6 mb-16">
              <a
                href="https://github.com/Roshan0612"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/roshan-gawade-469bb422a/"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 transform hover:scale-110"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Right side - Profile photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gradient-to-r from-teal-400 to-blue-500 p-1 bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse-slow">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                  <img
                    src="https://res.cloudinary.com/dswa5docr/image/upload/v1758390561/WhatsApp_Image_2025-09-20_at_23.19.04_5eda370c_uqeq67.jpg"
                    alt="Roshan Gawade"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* Floating elements around the photo */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-blue-500 rounded-full animate-float-delayed"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-orange-400 rounded-full animate-float"></div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <button
            onClick={scrollToAbout}
            className="animate-bounce text-gray-400 hover:text-teal-400 transition-colors duration-300"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
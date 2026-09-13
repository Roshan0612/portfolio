import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const LeetCodeIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M21.5 14.5H13.8C13.05 14.5 12.45 13.9 12.45 13.15C12.45 12.4 13.05 11.8 13.8 11.8H21.5C22.25 11.8 22.85 12.4 22.85 13.15C22.85 13.9 22.25 14.5 21.5 14.5Z"
      fill="currentColor"
    />

    <path
      d="M7.15 20.8C5.65 19.95 4.35 18.75 3.4 17.3C2.45 15.85 1.9 14.2 1.8 12.5C1.7 10.8 2.05 9.05 2.85 7.5C3.65 5.95 4.85 4.6 6.3 3.65C7.75 2.7 9.4 2.15 11.1 2.05C12.8 1.95 14.55 2.3 16.1 3.1L14.8 5.45C13.7 4.9 12.45 4.65 11.25 4.75C10.05 4.85 8.9 5.3 7.95 6.05C7 6.8 6.25 7.8 5.8 8.95C5.35 10.1 5.2 11.35 5.4 12.55C5.6 13.75 6.1 14.85 6.9 15.75C7.7 16.65 8.75 17.3 9.9 17.65C11.05 18 12.3 18 13.45 17.65C14.6 17.3 15.65 16.65 16.45 15.75L18.4 17.65C17.25 18.85 15.8 19.75 14.2 20.25C12.6 20.75 10.9 20.85 9.25 20.55C8.5 20.4 7.8 20.15 7.15 20.8Z"
      fill="currentColor"
    />

    <path
      d="M12.05 9.1L16.55 4.6C17.05 4.1 17.85 4.1 18.35 4.6C18.85 5.1 18.85 5.9 18.35 6.4L13.85 10.9L12.05 9.1Z"
      fill="currentColor"
    />
  </svg>
);

const roles = [
  "Software Engineer",
  "Computer Engineer",
  "Full-Stack Developer",
  "Web Developer",
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const speed = isDeleting ? 38 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setRoleText(currentRole.substring(0, roleText.length + 1));

        if (roleText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1300);
        }
      } else {
        setRoleText(currentRole.substring(0, roleText.length - 1));

        if (roleText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [roleText, roleIndex, isDeleting]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 900) return;

      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      if (imageRef.current) {
        imageRef.current.style.transform = `
          perspective(1200px)
          rotateY(${x * 7}deg)
          rotateX(${y * -7}deg)
          translate3d(${x * 10}px, ${y * 10}px, 0)
        `;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const downloadResume = () => {
    const link = document.createElement("a");

    link.href = "/roshan-resume.pdf";
    link.download = "Roshan-Gawade-Resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section ref={heroRef} id="hero" className="premium-hero">
      <div className="hero-noise" />

      <div className="hero-grid" />

      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-kicker">
            <span className="hero-kicker-dot" />
            <span>Computer Engineer · Full-Stack Developer</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-small">Hi, I'm</span>

            <span className="hero-name">
              Roshan
              <span className="hero-name-accent">.</span>
            </span>

            <span className="hero-surname">Gawade</span>
          </h1>

          <div className="hero-role">
            <span className="hero-role-label">I build as a</span>

            <span className="hero-role-value">
              {roleText}
              <span className="hero-caret" />
            </span>
          </div>

          <p className="hero-description">
            Computer Science Engineering graduate with hands-on experience
            building scalable full-stack applications using React.js,
            Node.js, Express.js, MongoDB, PostgreSQL, and MySQL.
          </p>

          <div className="hero-actions">
            <button
              className="hero-primary-button"
              onClick={downloadResume}
            >
              <span>Download Resume</span>

              <span className="hero-button-icon">
                <ArrowUpRight size={17} />
              </span>
            </button>

            <button
              className="hero-secondary-button"
              onClick={() => scrollTo("projects")}
            >
              <span>View my work</span>

              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="hero-socials">
            <span className="hero-social-label">Find me on</span>

            <div className="hero-social-line" />

            <a
              href="https://github.com/Roshan0612"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/roshan-gawade-469bb422a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>

            <a
              href="https://leetcode.com/u/RoshanGawade10/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
            >
              <LeetCodeIcon size={18} />
            </a>

            <a
              href="mailto:roshangawade160@gmail.com"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper" ref={imageRef}>
            <div className="hero-image-glow" />

            <div className="hero-image-frame">
              <div className="hero-image-inner">
                <img
                  src="https://res.cloudinary.com/dswa5docr/image/upload/v1767027372/headshot_roshan_portfolio_lwgaci.jpg"
                  alt="Roshan Gawade"
                />
              </div>
            </div>

            <div className="hero-floating-number">
              <span>01</span>
              <small>/ ENGINEER</small>
            </div>

            <div className="hero-floating-status">
              <span className="status-dot" />
              <span>Available for opportunities</span>
            </div>

            <div className="hero-image-decoration hero-decoration-one" />
            <div className="hero-image-decoration hero-decoration-two" />
          </div>
        </div>
      </div>

      <button
        className="hero-scroll-indicator"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about section"
      >
        <span>Scroll to explore</span>

        <span className="hero-scroll-icon">
          <ArrowDown size={16} />
        </span>
      </button>

      <div className="hero-side-label">
        <span>MUMBAI · INDIA</span>
      </div>
    </section>
  );
};

export default Hero;
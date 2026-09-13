import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const marker = window.scrollY + window.innerHeight * 0.35;

      let current = "hero";

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (section && marker >= section.offsetTop) {
          current = item.id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`premium-header ${
          scrolled ? "premium-header-scrolled" : ""
        }`}
      >
        <div className="premium-header-inner">
          <button
            className="premium-logo"
            onClick={() => scrollToSection("hero")}
            aria-label="Go to homepage"
          >
            <span className="premium-logo-symbol">
              <span />
              <span />
            </span>

            <span className="premium-logo-text">RG</span>
          </button>

          <nav className="premium-navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`premium-nav-link ${
                  activeSection === item.id ? "active" : ""
                }`}
              >
                <span>{item.label}</span>

                {activeSection === item.id && (
                  <span className="premium-nav-line" />
                )}
              </button>
            ))}
          </nav>

          <button
            className="premium-header-contact"
            onClick={() => scrollToSection("contact")}
          >
            <span>Let's talk</span>

            <span className="premium-header-arrow">
              <ArrowUpRight size={15} />
            </span>
          </button>

          <button
            className="premium-mobile-toggle"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <div
        className={`premium-mobile-menu ${
          isMenuOpen ? "premium-mobile-menu-open" : ""
        }`}
      >
        <div className="premium-mobile-menu-inner">
          <span className="premium-mobile-eyebrow">Navigation</span>

          {navItems.map((item, index) => (
            <button
              key={item.id}
              className="premium-mobile-link"
              onClick={() => scrollToSection(item.id)}
            >
              <span className="premium-mobile-number">
                0{index + 1}
              </span>

              <span>{item.label}</span>

              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
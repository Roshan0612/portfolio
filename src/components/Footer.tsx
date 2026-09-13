import React from "react";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="refined-footer">
      <div className="refined-container">
        <div className="footer-main">
          <div>
            <span className="footer-mark">RG</span>

            <p>
              Computer Engineer
              <br />
              & Full-Stack Developer
            </p>
          </div>

          <a href="#hero" className="footer-back">
            Back to top
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="footer-bottom">
          <span>© {year} Roshan Gawade</span>

          <span>Designed & developed with care.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
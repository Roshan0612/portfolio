import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import IntroAnimation from "./components/IntroAnimation";
import Lenis from "lenis";

function App() {
  const [introComplete, setIntroComplete] = React.useState(false);

  React.useEffect(() => {
    if (!introComplete) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [introComplete]);

  React.useEffect(() => {
    if (!introComplete) return;

    const sections = document.querySelectorAll("main section");

    sections.forEach((section) => {
      section.classList.add("premium-section");
    });

    const animatedElements = document.querySelectorAll(
      "main section h1, main section h2, main section h3, main section p, main section .glass, main section article, main section button"
    );

    animatedElements.forEach((element, index) => {
      const el = element as HTMLElement;

      if (el.closest("#hero")) return;

      el.classList.add("scroll-reveal");

      el.style.setProperty(
        "--reveal-delay",
        `${Math.min(index % 6, 5) * 70}ms`
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [introComplete]);

  React.useEffect(() => {
    if (!introComplete) return;

    const cursor = document.createElement("div");
    cursor.className = "premium-cursor";

    const cursorDot = document.createElement("div");
    cursorDot.className = "premium-cursor-dot";

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    const moveCursor = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

      requestAnimationFrame(animateCursor);
    };

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select"
    );

    const addHover = () => {
      cursor.classList.add("cursor-hover");
    };

    const removeHover = () => {
      cursor.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", moveCursor);

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", addHover);
      element.addEventListener("mouseleave", removeHover);
    });

    animateCursor();

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", addHover);
        element.removeEventListener("mouseleave", removeHover);
      });

      cursor.remove();
      cursorDot.remove();
    };
  }, [introComplete]);

  return (
    <div className="portfolio-root">
      {!introComplete && (
        <IntroAnimation
          onComplete={() => {
            setIntroComplete(true);
          }}
        />
      )}

      <div
        className={`portfolio-content ${
          introComplete ? "portfolio-ready" : ""
        }`}
      >
        <Header />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
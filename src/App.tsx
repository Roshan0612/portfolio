import React from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

import IntroAnimation from './components/IntroAnimation';

function App() {
  const [introComplete, setIntroComplete] =
    React.useState(false);

  return (
    <div className="min-h-screen bg-[#070707]">
      {!introComplete && (
        <IntroAnimation
          onComplete={() => setIntroComplete(true)}
        />
      )}

      <div
        className={`
          transition-opacity
          duration-700
          ${
            introComplete
              ? 'opacity-100'
              : 'opacity-0'
          }
        `}
      >
        <Header />

        <main>
          <Hero introComplete={introComplete} />

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
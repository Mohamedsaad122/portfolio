import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ParticleField } from './components/ParticleField';
import { BackToTop } from './components/BackToTop';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { Statistics } from './components/Statistics';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// MARKER-MAKE-KIT-INVOKED

export default function App() {
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div
          className="relative min-h-screen"
          style={{ background: 'var(--background)', color: 'var(--foreground)' }}
        >
          <ParticleField isDark={theme === 'dark'} />
          <CustomCursor />
          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            language={language}
            toggleLanguage={toggleLanguage}
          />

          <main>
            <Hero language={language} />
            <About language={language} />
            <Skills language={language} />
            <Experience language={language} />
            <Projects language={language} />
            <Certifications language={language} />
            <Services language={language} />
            <Testimonials language={language} />
            <Statistics language={language} />
            <Contact language={language} />
          </main>

          <Footer language={language} />
          <BackToTop />
        </div>
      )}
    </>
  );
}

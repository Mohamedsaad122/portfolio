import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { Language, content } from '../data/content';
import { Theme } from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: () => void;
}

const sections = ['about', 'skills', 'experience', 'projects', 'certifications', 'services', 'testimonials', 'statistics', 'contact'] as const;

export function Navbar({ theme, toggleTheme, language, toggleLanguage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  const navItems = sections.map(s => ({ id: s, label: t[s as keyof typeof t] }));

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={scrolled ? {
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--glass-border)',
        } : { background: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-black tracking-widest"
            style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--primary)', textShadow: '0 0 20px var(--cyan-glow, rgba(34,211,238,0.4))' }}
          >
            MS
          </motion.button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 6).map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-1.5 rounded-lg text-sm transition-all duration-200 relative"
                style={{
                  color: activeSection === id ? 'var(--primary)' : 'var(--muted-foreground)',
                  fontWeight: activeSection === id ? 600 : 400,
                }}
              >
                {label}
                {activeSection === id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: 'var(--primary)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm glass transition-all hover:scale-105"
              style={{ color: 'var(--foreground)', border: '1px solid var(--border)' }}
              aria-label="Toggle language"
            >
              <Globe size={14} />
              <span className="text-xs font-medium">{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center transition-all hover:scale-105"
              style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="lg:hidden w-9 h-9 rounded-lg glass flex items-center justify-center"
              style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 p-4 glass lg:hidden"
            style={{ borderBottom: '1px solid var(--glass-border)' }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left px-4 py-3 rounded-lg text-sm transition-all"
                  style={{
                    color: activeSection === id ? 'var(--primary)' : 'var(--foreground)',
                    background: activeSection === id ? 'var(--glass-bg)' : 'transparent',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

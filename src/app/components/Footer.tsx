import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Language, content } from '../data/content';

interface FooterProps { language: Language; }

export function Footer({ language }: FooterProps) {
  const t = content[language].footer;
  const nav = content[language].nav;

  const sections = ['about', 'skills', 'experience', 'projects', 'certifications', 'services', 'testimonials', 'contact'] as const;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative py-16"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)',
        zIndex: 1,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div
              className="text-3xl font-black tracking-widest"
              style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--primary)', textShadow: '0 0 20px rgba(34,211,238,0.4)' }}
            >
              MS
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--muted-foreground)' }}>
              {t.tagline}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: 'https://github.com/mohamedsaad', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/mohamedsaad', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:mohamedSaad.dev@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
              {language === 'en' ? 'Navigation' : 'التنقل'}
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {sections.map(s => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo(s)}
                    className="text-sm hover:text-primary transition-colors text-start"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {nav[s as keyof typeof nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
              {language === 'en' ? 'Contact' : 'تواصل'}
            </p>
            <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <a href="mailto:mohamedSaad.dev@gmail.com" className="hover:text-primary transition-colors">
                mohamedSaad.dev@gmail.com
              </a>
              <a href="tel:+201000000000" className="hover:text-primary transition-colors">
                +20 100 000 0000
              </a>
              <span>{language === 'en' ? 'Egypt' : 'مصر'}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t.rights}</p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
            {t.madeWith} <Heart size={12} fill="var(--accent)" style={{ color: 'var(--accent)' }} /> {t.and} {t.coffee} ☕
          </p>
        </div>
      </div>
    </footer>
  );
}

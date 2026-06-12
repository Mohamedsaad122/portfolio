import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Award } from 'lucide-react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface CertificationsProps { language: Language; }

export function Certifications({ language }: CertificationsProps) {
  const t = content[language].certifications;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="certifications" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.items.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="glass rounded-2xl p-5 relative overflow-hidden group cursor-default"
              style={{
                border: `1px solid ${hovered === i ? 'var(--primary)' : 'var(--border)'}`,
                boxShadow: hovered === i ? 'var(--glow-primary)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Gradient background blur */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: `linear-gradient(135deg, ${cert.color.replace('from-', '').split(' ')[0]}, transparent)` }}
              />

              <div className="relative flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, var(--glass-bg), var(--glass-bg))`, border: '1px solid var(--border)' }}
                >
                  {cert.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1 leading-snug" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>
                    {cert.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--primary)' }}>{cert.issuer}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
                  {cert.date}
                </span>
                <Award size={14} style={{ color: 'var(--accent)' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

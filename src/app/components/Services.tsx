import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface ServicesProps { language: Language; }

export function Services({ language }: ServicesProps) {
  const t = content[language].services;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.items.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="glass rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden cursor-default"
              style={{
                border: `1px solid ${hovered === i ? 'var(--primary)' : 'var(--border)'}`,
                boxShadow: hovered === i ? 'var(--glow-primary)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Bg glow */}
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle, var(--primary), transparent)',
                  opacity: hovered === i ? 0.12 : 0,
                }}
              />

              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl relative"
                style={{
                  background: hovered === i ? 'var(--gradient-primary)' : 'var(--glass-bg)',
                  border: '1px solid var(--border)',
                  transition: 'all 0.3s ease',
                }}
              >
                {service.icon}
              </div>

              <div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {service.description}
                </p>
              </div>

              <ul className="flex flex-col gap-2 mt-2">
                {service.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <CheckCircle2 size={12} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

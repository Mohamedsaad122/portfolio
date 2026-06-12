import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface ExperienceProps { language: Language; }

export function Experience({ language }: ExperienceProps) {
  const t = content[language].experience;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div ref={ref} className="relative">
          {/* Center line */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--primary), var(--accent), transparent)' }}
          />

          <div className="flex flex-col gap-8">
            {t.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`flex gap-6 items-start md:w-1/2 ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                  style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--glow-primary)' }}
                >
                  <Briefcase size={20} style={{ color: 'white' }} />
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-5 flex-1" style={{ border: '1px solid var(--border)' }}>
                  <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                    <h3 className="font-bold text-base" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>
                      {item.title}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                      style={{ background: 'var(--glass-bg)', color: 'var(--primary)', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>{item.company}</p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map(tech => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ background: 'var(--glass-bg)', color: 'var(--muted-foreground)', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

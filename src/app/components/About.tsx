import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin, Mail, Phone, User } from 'lucide-react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface AboutProps { language: Language; }

export function About({ language }: AboutProps) {
  const t = content[language].about;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story + Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="glass rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                  <User size={18} style={{ color: 'white' }} />
                </div>
                <h3 className="font-bold text-lg" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>
                  {t.sectionTitle}
                </h3>
              </div>
              <p className="leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>{t.intro}</p>
              <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{t.story}</p>
            </div>

            <div className="glass rounded-2xl p-6" style={{ border: '1px solid var(--border)' }}>
              <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{t.goal}</p>
            </div>

            {/* Contact info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: t.location },
                { icon: Mail, label: t.email },
                { icon: Phone, label: t.phone },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="glass rounded-xl p-3 flex items-center gap-3" style={{ border: '1px solid var(--border)' }}>
                  <Icon size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <h3 className="font-bold text-xl mb-8" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>
              {language === 'en' ? 'Career Timeline' : 'المسيرة المهنية'}
            </h3>

            {/* Timeline line */}
            <div className="absolute top-14 left-5 bottom-0 w-px" style={{ background: 'var(--border)' }} />

            <div className="flex flex-col gap-6">
              {t.timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex gap-5 relative"
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0 mt-1">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold z-10 relative"
                      style={{ background: 'var(--gradient-primary)', color: 'white', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass rounded-xl p-4 flex-1" style={{ border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                      <h4 className="font-bold text-sm" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>{item.title}</h4>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--glass-bg)', color: 'var(--primary)', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

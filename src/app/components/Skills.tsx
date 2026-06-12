import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface SkillsProps { language: Language; }

function SkillBar({ name, level, icon, delay = 0, inView }: {
  name: string; level: number; icon: string; delay?: number; inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass rounded-xl p-4 transition-all duration-300 cursor-default"
      style={{
        border: `1px solid ${hovered ? 'var(--primary)' : 'var(--border)'}`,
        boxShadow: hovered ? 'var(--glow-primary)' : 'none',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>{name}</span>
        </div>
        <span className="text-xs font-bold" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--muted)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'var(--gradient-primary)' }}
        />
      </div>
    </motion.div>
  );
}

export function Skills({ language }: SkillsProps) {
  const t = content[language].skills;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {t.categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1 rounded" style={{ background: 'var(--gradient-primary)', opacity: 0.4 }} />
                <h3 className="text-sm font-bold tracking-wide uppercase px-3" style={{
                  color: 'var(--primary)',
                  fontFamily: 'JetBrains Mono, monospace',
                  whiteSpace: 'nowrap',
                }}>
                  {cat.name}
                </h3>
                <div className="h-px flex-1 rounded" style={{ background: 'var(--gradient-primary)', opacity: 0.4 }} />
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                  delay={ci * 0.1 + si * 0.08}
                  inView={inView}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest mb-6" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
            {language === 'en' ? 'Also Familiar With' : 'مألوف أيضاً'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Figma', 'VS Code', 'Postman', 'npm/pnpm', 'Vite', 'ESLint', 'Prettier', 'Axios', 'React Router', 'Zustand'].map(tech => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full text-xs glass"
                style={{ border: '1px solid var(--border)', color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

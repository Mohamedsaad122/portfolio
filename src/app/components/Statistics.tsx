import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';
import { useCounter } from '../hooks/useCounter';

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
  inView: boolean;
}

function StatCard({ value, suffix, label, delay = 0, inView }: StatCardProps) {
  const { count, ref } = useCounter(value, 2000, true);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-2xl p-8 text-center relative overflow-hidden group cursor-default hover:scale-105 transition-transform duration-300"
      style={{ border: '1px solid var(--border)' }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at center, rgba(34,211,238,0.06), transparent 70%)' }}
      />

      <div
        className="text-5xl xl:text-6xl font-black mb-2 relative"
        style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--primary)', textShadow: '0 0 30px var(--primary)' }}
      >
        {inView ? count : 0}{suffix}
      </div>

      <p className="text-sm font-medium relative" style={{ color: 'var(--muted-foreground)' }}>
        {label}
      </p>
    </motion.div>
  );
}

interface StatisticsProps { language: Language; }

export function Statistics({ language }: StatisticsProps) {
  const t = content[language].statistics;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="statistics" className="relative py-24" style={{ zIndex: 1 }}>
      {/* Background stripe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(34,211,238,0.04) 0%, rgba(167,139,250,0.04) 100%)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {t.items.map((stat, i) => (
            <StatCard
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.12}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

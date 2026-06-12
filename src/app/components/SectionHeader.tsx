import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from 'motion/react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      <p className="text-sm font-semibold tracking-widest uppercase mb-3"
        style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
        {subtitle}
      </p>
      <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>
        <span className="gradient-text">{title}</span>
      </h2>
      <div className="mt-4 flex items-center gap-2 justify-center">
        <div className="h-px w-16 rounded" style={{ background: 'var(--gradient-primary)' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} />
        <div className="h-px w-16 rounded" style={{ background: 'var(--gradient-primary)' }} />
      </div>
    </motion.div>
  );
}

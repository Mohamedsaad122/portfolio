import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface TestimonialsProps { language: Language; }

export function Testimonials({ language }: TestimonialsProps) {
  const t = content[language].testimonials;
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const goTo = (idx: number, direction: number) => {
    setDir(direction);
    setActive(idx);
  };
  const prev = () => goTo((active - 1 + t.items.length) % t.items.length, -1);
  const next = () => goTo((active + 1) % t.items.length, 1);

  return (
    <section id="testimonials" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Main testimonial */}
            <div className="relative overflow-hidden rounded-2xl glass mb-8" style={{ border: '1px solid var(--border)', minHeight: '280px' }}>
              {/* Quote mark */}
              <div
                className="absolute top-4 left-6 text-8xl font-black opacity-10 leading-none select-none"
                style={{ color: 'var(--primary)', fontFamily: 'Georgia, serif' }}
              >
                "
              </div>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={active}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -dir * 60 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="p-8 md:p-10"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.items[active].rating }).map((_, i) => (
                      <Star key={i} size={16} fill="var(--accent)" style={{ color: 'var(--accent)' }} />
                    ))}
                  </div>

                  <p className="text-lg leading-relaxed mb-8 italic" style={{ color: 'var(--foreground)' }}>
                    "{t.items[active].text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: 'var(--gradient-primary)', color: 'white' }}
                    >
                      {t.items[active].avatar}
                    </div>
                    <div>
                      <p className="font-bold" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>{t.items[active].name}</p>
                      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{t.items[active].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                {language === 'ar' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>

              <div className="flex gap-2">
                {t.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > active ? 1 : -1)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? '24px' : '8px',
                      background: i === active ? 'var(--primary)' : 'var(--border)',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                {language === 'ar' ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

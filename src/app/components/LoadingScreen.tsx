import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }
        const increment = prev < 60 ? 3 : prev < 85 ? 1.5 : 0.8;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    const phaseTimer = setTimeout(() => setPhase(1), 800);
    const phaseTimer2 = setTimeout(() => setPhase(2), 1600);

    return () => {
      clearInterval(timer);
      clearTimeout(phaseTimer);
      clearTimeout(phaseTimer2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
      style={{ background: '#03070f' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />

      <div className="relative flex flex-col items-center gap-8 px-8">
        {/* Logo / Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="text-5xl font-black tracking-widest mb-1"
            style={{ fontFamily: 'Outfit, sans-serif', color: '#22d3ee', textShadow: '0 0 30px rgba(34,211,238,0.5)' }}>
            MS
          </div>
          <AnimatePresence mode="wait">
            {phase >= 1 && (
              <motion.p
                key="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: '#94a3b8' }}
              >
                {phase >= 2 ? 'Mohamed Saad' : 'Front-End Developer'}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress bar */}
        <div className="w-72 relative">
          <div className="h-px w-full" style={{ background: 'rgba(34,211,238,0.15)' }} />
          <motion.div
            className="absolute top-0 left-0 h-px"
            style={{ background: 'linear-gradient(90deg, #22d3ee, #a78bfa)', width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
          <div
            className="absolute top-0 h-1 w-4 rounded-full blur-sm -translate-y-1/2"
            style={{
              left: `${progress}%`,
              background: '#22d3ee',
              boxShadow: '0 0 10px #22d3ee',
            }}
          />
        </div>

        {/* Percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mono text-xs"
          style={{ color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}
        >
          {Math.round(progress).toString().padStart(3, '0')} / 100
        </motion.div>
      </div>
    </motion.div>
  );
}

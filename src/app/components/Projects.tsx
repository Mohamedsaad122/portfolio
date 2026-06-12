import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Star, Search } from 'lucide-react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface ProjectsProps { language: Language; }

export function Projects({ language }: ProjectsProps) {
  const t = content[language].projects;
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const categories = ['all', ...Array.from(new Set(t.items.map(p => p.category)))];

  const filtered = t.items.filter(p => {
    const matchFilter = filter === 'all' || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <section id="projects" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--muted-foreground)' }} />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search projects...' : 'البحث في المشاريع...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none glass"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                background: 'var(--glass-bg)',
              }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: filter === cat ? 'var(--gradient-primary)' : 'var(--glass-bg)',
                  color: filter === cat ? 'white' : 'var(--muted-foreground)',
                  border: `1px solid ${filter === cat ? 'transparent' : 'var(--border)'}`,
                  boxShadow: filter === cat ? 'var(--glow-primary)' : 'none',
                }}
              >
                {cat === 'all' ? t.filterAll : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                className="glass rounded-2xl overflow-hidden group relative"
                style={{
                  border: `1px solid ${hovered === project.id ? 'var(--primary)' : 'var(--border)'}`,
                  boxShadow: hovered === project.id ? 'var(--glow-primary)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Project image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, var(--background) 0%, transparent 60%)',
                  }} />

                  {project.featured && (
                    <div
                      className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold"
                      style={{ background: 'var(--gradient-primary)', color: 'white' }}
                    >
                      <Star size={10} fill="white" />
                      {language === 'en' ? 'Featured' : 'مميز'}
                    </div>
                  )}

                  <span
                    className="absolute top-3 right-3 text-xs px-2 py-1 rounded-lg glass"
                    style={{ border: '1px solid var(--border)', color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-black text-lg mb-2" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 mb-4">
                    {Object.entries(project.stats).map(([key, val]) => (
                      <div key={key}>
                        <p className="text-xs font-bold" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>{val}</p>
                        <p className="text-xs capitalize" style={{ color: 'var(--muted-foreground)' }}>{key}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map(tech => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded"
                        style={{ background: 'var(--glass-bg)', color: 'var(--muted-foreground)', border: '1px solid var(--border)', fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium glass transition-all hover:scale-105"
                      style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <Github size={14} />
                      {t.viewCode}
                    </a>
                    {project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                        style={{ background: 'var(--gradient-primary)', color: 'white', boxShadow: 'var(--glow-primary)' }}
                      >
                        <ExternalLink size={14} />
                        {t.liveDemo}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p style={{ color: 'var(--muted-foreground)' }}>
              {language === 'en' ? 'No projects found.' : 'لا توجد مشاريع.'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

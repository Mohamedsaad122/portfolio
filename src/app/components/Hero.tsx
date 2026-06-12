import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Download, ArrowRight, ChevronDown } from 'lucide-react';
import { Language, content } from '../data/content';
import gsap from 'gsap';
import * as THREE from 'three';

interface HeroProps {
  language: Language;
}

function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Outer wireframe icosahedron
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // Inner sphere
    const innerGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Torus ring
    const torusGeo = new THREE.TorusGeometry(2.2, 0.02, 8, 80);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.5,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    scene.add(torus);

    // Second ring
    const torus2Geo = new THREE.TorusGeometry(2.5, 0.015, 8, 80);
    const torus2Mat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.4,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.rotation.x = -Math.PI / 4;
    torus2.rotation.y = Math.PI / 6;
    scene.add(torus2);

    // Glow center
    const glowGeo = new THREE.SphereGeometry(0.9, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.05,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', onMouse);

    let animId: number;
    let t = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.005;
      outerMesh.rotation.x = t * 0.3 + mouseY * 0.5;
      outerMesh.rotation.y = t * 0.5 + mouseX * 0.5;
      innerMesh.rotation.x = -t * 0.4;
      innerMesh.rotation.y = t * 0.3;
      torus.rotation.z = t * 0.2;
      torus2.rotation.z = -t * 0.15;
      const pulse = Math.sin(t * 2) * 0.05 + 1;
      glowMesh.scale.setScalar(pulse);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      outerGeo.dispose(); outerMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      torusGeo.dispose(); torusMat.dispose();
      torus2Geo.dispose(); torus2Mat.dispose();
      glowGeo.dispose(); glowMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}

export function Hero({ language }: HeroProps) {
  const t = content[language].hero;
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const els = textRef.current.querySelectorAll('[data-anim]');
    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    );
  }, [language]);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mohamedsaad', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/mohamedsaad', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mohamedSaad.dev@gmail.com', label: 'Email' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(167,139,250,0.08) 0%, transparent 60%)',
      }} />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Text content */}
        <div ref={textRef} className={`flex flex-col gap-6 ${language === 'ar' ? 'lg:order-2' : ''}`}>
          {/* Available badge */}
          <motion.div
            data-anim
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 w-fit"
          >
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium glass"
              style={{ border: '1px solid rgba(34,211,238,0.3)', color: 'var(--primary)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
              {t.available}
            </span>
          </motion.div>

          {/* Greeting */}
          <div data-anim>
            <p className="text-lg mb-1" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
              <span style={{ color: 'var(--primary)' }}>{'> '}</span>{t.greeting}
            </p>
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl font-black leading-none"
              style={{ fontFamily: 'Outfit, Cairo, sans-serif', color: 'var(--foreground)' }}
            >
              {t.name}
            </h1>
          </div>

          {/* Title */}
          <div data-anim>
            <h2
              className="text-2xl sm:text-3xl xl:text-4xl font-bold gradient-text"
              style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}
            >
              {t.title}
            </h2>
          </div>

          {/* Subtitle */}
          <p data-anim className="text-base leading-relaxed max-w-lg" style={{ color: 'var(--muted-foreground)' }}>
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div data-anim className="flex flex-wrap gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: 'var(--gradient-primary)',
                color: 'var(--primary-foreground)',
                boxShadow: 'var(--glow-primary)',
              }}
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {t.contactMe}
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="/cv.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm glass transition-all"
              style={{ border: '1px solid var(--border)', color: 'var(--foreground)' }}
            >
              <Download size={16} />
              {t.downloadCV}
            </motion.a>
          </div>

          {/* Social links */}
          <div data-anim className="flex items-center gap-3 pt-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass flex items-center justify-center"
              style={{ border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* 3D Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className={`relative h-96 lg:h-[520px] ${language === 'ar' ? 'lg:order-1' : ''}`}
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Hero3D />
          </div>
          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute top-8 left-4 glass rounded-xl px-3 py-2"
            style={{ border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-medium" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>⚛️ React.js</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-12 left-4 glass rounded-xl px-3 py-2"
            style={{ border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-medium" style={{ color: 'var(--accent)', fontFamily: 'JetBrains Mono, monospace' }}>🔷 TypeScript</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
            className="absolute top-16 right-4 glass rounded-xl px-3 py-2"
            style={{ border: '1px solid var(--border)' }}
          >
            <p className="text-xs font-medium" style={{ color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace' }}>💨 Tailwind</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
          {t.scrollDown}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} style={{ color: 'var(--primary)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Send } from 'lucide-react';
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from 'react-icons/fa6';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface ContactProps { language: Language; }

const WHATSAPP_URL = 'https://wa.me/201068017201';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mohamed-saad-4b1055334';
const GITHUB_URL = 'https://github.com/Mohamedsaad122';
const EMAIL = 'moamedsaad122@gmail.com';
const PHONE = '+20 106 801 7201';
const PHONE_TEL = 'tel:+201068017201';

export function Contact({ language }: ContactProps) {
  const t = content[language].contact;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const inputStyle = {
    background: 'var(--input-background)',
    border: '1px solid var(--border)',
    color: 'var(--foreground)',
    borderRadius: '12px',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: t.emailLabel,
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      color: '#ea4335',
      glow: 'rgba(234,67,53,0.2)',
      external: false,
    },
    {
      icon: FaPhone,
      label: t.phoneLabel,
      value: PHONE,
      href: PHONE_TEL,
      color: '#22c55e',
      glow: 'rgba(34,197,94,0.2)',
      external: false,
    },
    {
      icon: FaLocationDot,
      label: t.locationLabel,
      value: t.location,
      href: '#',
      color: 'var(--primary)',
      glow: 'rgba(34,211,238,0.2)',
      external: false,
    },
    {
      icon: FaWhatsapp,
      label: t.whatsappLabel,
      value: PHONE,
      href: WHATSAPP_URL,
      color: '#25D366',
      glow: 'rgba(37,211,102,0.2)',
      external: true,
    },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: GITHUB_URL,
      label: 'GitHub',
      color: '#e2e8f0',
      gradient: 'linear-gradient(135deg, #24292e, #586069)',
    },
    {
      icon: FaLinkedin,
      href: LINKEDIN_URL,
      label: 'LinkedIn',
      color: '#fff',
      gradient: 'linear-gradient(135deg, #0077B5, #00a0dc)',
    },
    {
      icon: FaWhatsapp,
      href: WHATSAPP_URL,
      label: 'WhatsApp',
      color: '#fff',
      gradient: 'linear-gradient(135deg, #25D366, #128C7E)',
    },
    {
      icon: FaEnvelope,
      href: `mailto:${EMAIL}`,
      label: 'Email',
      color: '#fff',
      gradient: 'linear-gradient(135deg, #ea4335, #c62828)',
    },
  ];

  return (
    <section id="contact" className="relative py-24" style={{ zIndex: 1 }}>
      {/* Background radial gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34,211,238,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          {/* ─── Left: Info panel ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {t.intro}
            </p>

            {/* Contact info cards */}
            <div className="flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, label, value, href, color, glow, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4 group"
                  style={{
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${glow}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `linear-gradient(135deg, ${color}33, ${color}22)`, border: `1px solid ${color}44` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
                      {label}
                    </p>
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social buttons */}
            <div>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted-foreground)', fontFamily: 'JetBrains Mono, monospace' }}>
                {language === 'en' ? 'Connect with me' : 'تواصل معي عبر'}
              </p>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map(({ icon: Icon, href, label, color, gradient }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={label === 'Email' ? undefined : '_blank'}
                    rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      background: gradient,
                      color,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Right: Contact form ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 flex flex-col gap-4"
              style={{ border: '1px solid var(--border)' }}
            >
              {/* Decorative top bar */}
              <div className="h-1 w-full rounded-full" style={{ background: 'var(--gradient-primary)' }} />

              <h3 className="font-bold text-lg" style={{ fontFamily: 'Outfit, Cairo, sans-serif' }}>
                {language === 'en' ? 'Send a Message' : 'أرسل رسالة'}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="contact-name"
                    placeholder={t.namePlaceholder}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    style={inputStyle}
                    onFocus={e => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--primary)';
                      (e.target as HTMLInputElement).style.boxShadow = 'var(--glow-primary)';
                    }}
                    onBlur={e => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--border)';
                      (e.target as HTMLInputElement).style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="contact-email"
                    placeholder={t.emailPlaceholder}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    style={inputStyle}
                    onFocus={e => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--primary)';
                      (e.target as HTMLInputElement).style.boxShadow = 'var(--glow-primary)';
                    }}
                    onBlur={e => {
                      (e.target as HTMLInputElement).style.borderColor = 'var(--border)';
                      (e.target as HTMLInputElement).style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <input
                type="text"
                id="contact-subject"
                placeholder={t.subjectPlaceholder}
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                required
                style={inputStyle}
                onFocus={e => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--primary)';
                  (e.target as HTMLInputElement).style.boxShadow = 'var(--glow-primary)';
                }}
                onBlur={e => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--border)';
                  (e.target as HTMLInputElement).style.boxShadow = 'none';
                }}
              />

              <textarea
                id="contact-message"
                placeholder={t.messagePlaceholder}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => {
                  (e.target as HTMLTextAreaElement).style.borderColor = 'var(--primary)';
                  (e.target as HTMLTextAreaElement).style.boxShadow = 'var(--glow-primary)';
                }}
                onBlur={e => {
                  (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)';
                  (e.target as HTMLTextAreaElement).style.boxShadow = 'none';
                }}
              />

              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    color: '#22c55e',
                    border: '1px solid rgba(34,197,94,0.3)',
                  }}
                >
                  ✅ {t.successMessage}
                </motion.p>
              )}

              <motion.button
                type="submit"
                id="contact-submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm disabled:opacity-70 transition-all"
                style={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  boxShadow: 'var(--glow-primary)',
                  cursor: sending ? 'wait' : 'pointer',
                }}
              >
                <Send size={16} />
                {sending ? t.sending : t.sendButton}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

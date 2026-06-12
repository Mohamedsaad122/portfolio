import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import { Language, content } from '../data/content';
import { SectionHeader } from './SectionHeader';

interface ContactProps { language: Language; }

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

  const contactInfo = [
    { icon: Mail, label: t.emailLabel, value: 'mohamedSaad.dev@gmail.com', href: 'mailto:mohamedSaad.dev@gmail.com' },
    { icon: Phone, label: t.phoneLabel, value: '+20 100 000 0000', href: 'tel:+201000000000' },
    { icon: MapPin, label: t.locationLabel, value: t.location, href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mohamedsaad', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/mohamedsaad', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mohamedSaad.dev@gmail.com', label: 'Email' },
  ];

  const inputStyle = {
    background: 'var(--input-background)',
    border: '1px solid var(--border)',
    color: 'var(--foreground)',
    borderRadius: '12px',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    fontSize: '14px',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <section id="contact" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader title={t.sectionTitle} subtitle={t.sectionSubtitle} />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {t.intro}
            </p>

            <div className="flex flex-col gap-3">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="glass rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-102 group"
                  style={{ border: '1px solid var(--border)', textDecoration: 'none' }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <Icon size={16} style={{ color: 'white' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{value}</p>
                  </div>
                </a>
              ))}

              {/* WhatsApp */}
              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 flex items-center gap-4 transition-all hover:scale-102 group"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t.whatsappLabel}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>+20 100 000 0000</p>
                </div>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    style={inputStyle}
                    onFocus={e => ((e.target as HTMLInputElement).style.borderColor = 'var(--primary)')}
                    onBlur={e => ((e.target as HTMLInputElement).style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    style={inputStyle}
                    onFocus={e => ((e.target as HTMLInputElement).style.borderColor = 'var(--primary)')}
                    onBlur={e => ((e.target as HTMLInputElement).style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder={t.subjectPlaceholder}
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                required
                style={inputStyle}
                onFocus={e => ((e.target as HTMLInputElement).style.borderColor = 'var(--primary)')}
                onBlur={e => ((e.target as HTMLInputElement).style.borderColor = 'var(--border)')}
              />
              <textarea
                placeholder={t.messagePlaceholder}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => ((e.target as HTMLTextAreaElement).style.borderColor = 'var(--primary)')}
                onBlur={e => ((e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)')}
              />

              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }}
                >
                  {t.successMessage}
                </motion.p>
              )}

              <motion.button
                type="submit"
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

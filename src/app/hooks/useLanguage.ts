import { useState, useEffect, useCallback } from 'react';
import { Language } from '../data/content';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('portfolio-lang') as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('portfolio-lang', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  }, []);

  const isRTL = language === 'ar';

  return { language, toggleLanguage, isRTL };
}

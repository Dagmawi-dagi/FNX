'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationSchema } from '@/utils/types';
import { TRANSLATIONS } from '@/utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  formattedDate: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    // Check localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zema_language') as Language;
      if (saved && ['en', 'am', 'ti', 'or'].includes(saved)) {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zema_language', lang);
    }
  };

  useEffect(() => {
    const localeMap: Record<Language, string> = {
      en: 'en-US',
      am: 'am-ET',
      ti: 'ti-ET',
      or: 'om-ET'
    };

    const dateStr = new Date().toLocaleDateString(localeMap[language] || 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setFormattedDate(dateStr);
  }, [language]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formattedDate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

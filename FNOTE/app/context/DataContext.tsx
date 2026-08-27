'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Article, 
  EventItem, 
  VacancyItem, 
  SocialChannelItem, 
  CharityProject,
  NewsItem,
  SubscriberItem,
  NewsletterDispatch
} from '@/utils/types';
import { 
  NEWS_ARTICLES, 
  EVENTS_DATA, 
  VACANCIES_DATA, 
  SOCIAL_CHANNELS, 
  CHARITY_PROJECTS,
  DEFAULT_SUBSCRIBERS,
  DEFAULT_DISPATCHES
} from '@/utils/constants';

interface DataContextType {
  // Articles / Blog
  articles: Article[];
  addArticle: (article: Omit<Article, 'id'>) => Article;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Events
  events: EventItem[];
  addEvent: (event: Omit<EventItem, 'id'>) => EventItem;
  updateEvent: (id: string, updated: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Vacancies
  vacancies: VacancyItem[];
  addVacancy: (vacancy: Omit<VacancyItem, 'id'>) => VacancyItem;
  updateVacancy: (id: string, updated: Partial<VacancyItem>) => void;
  deleteVacancy: (id: string) => void;

  // Social Channels & Networks
  socialChannels: SocialChannelItem[];
  addSocialChannel: (channel: Omit<SocialChannelItem, 'id'>) => SocialChannelItem;
  updateSocialChannel: (id: string, updated: Partial<SocialChannelItem>) => void;
  deleteSocialChannel: (id: string) => void;

  // Charity & Community Work
  charityWorks: CharityProject[];
  addCharityWork: (charity: Omit<CharityProject, 'id'>) => CharityProject;
  updateCharityWork: (id: string, updated: Partial<CharityProject>) => void;
  deleteCharityWork: (id: string) => void;

  // Newsletter & Subscribers
  subscribers: SubscriberItem[];
  addSubscriber: (sub: Omit<SubscriberItem, 'id' | 'subscribedAt'>) => { subscriber: SubscriberItem; isNew: boolean };
  updateSubscriber: (id: string, updated: Partial<SubscriberItem>) => void;
  deleteSubscriber: (id: string) => void;
  
  // Newsletter Dispatches / Bulletins
  dispatches: NewsletterDispatch[];
  addDispatch: (dispatch: Omit<NewsletterDispatch, 'id'>) => NewsletterDispatch;
  updateDispatch: (id: string, updated: Partial<NewsletterDispatch>) => void;
  deleteDispatch: (id: string) => void;

  // Reset to default seed data
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ARTICLES: 'fnote_tsidk_articles_v1',
  EVENTS: 'fnote_tsidk_events_v1',
  VACANCIES: 'fnote_tsidk_vacancies_v1',
  SOCIALS: 'fnote_tsidk_socials_v1',
  CHARITY: 'fnote_tsidk_charity_v1',
  SUBSCRIBERS: 'fnote_tsidk_subscribers_v1',
  DISPATCHES: 'fnote_tsidk_dispatches_v1'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
  const [socialChannels, setSocialChannels] = useState<SocialChannelItem[]>([]);
  const [charityWorks, setCharityWorks] = useState<CharityProject[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [dispatches, setDispatches] = useState<NewsletterDispatch[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage or initialize with seed constants
  useEffect(() => {
    try {
      const savedArticles = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      const savedEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
      const savedVacancies = localStorage.getItem(STORAGE_KEYS.VACANCIES);
      const savedSocials = localStorage.getItem(STORAGE_KEYS.SOCIALS);
      const savedCharity = localStorage.getItem(STORAGE_KEYS.CHARITY);
      const savedSubscribers = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
      const savedDispatches = localStorage.getItem(STORAGE_KEYS.DISPATCHES);

      setArticles(savedArticles ? JSON.parse(savedArticles) : NEWS_ARTICLES);
      setEvents(savedEvents ? JSON.parse(savedEvents) : EVENTS_DATA);
      setVacancies(savedVacancies ? JSON.parse(savedVacancies) : VACANCIES_DATA);
      setSocialChannels(savedSocials ? JSON.parse(savedSocials) : SOCIAL_CHANNELS);
      setCharityWorks(savedCharity ? JSON.parse(savedCharity) : CHARITY_PROJECTS);
      setSubscribers(savedSubscribers ? JSON.parse(savedSubscribers) : DEFAULT_SUBSCRIBERS);
      setDispatches(savedDispatches ? JSON.parse(savedDispatches) : DEFAULT_DISPATCHES);
    } catch (e) {
      console.warn('LocalStorage access issue, using default constants:', e);
      setArticles(NEWS_ARTICLES);
      setEvents(EVENTS_DATA);
      setVacancies(VACANCIES_DATA);
      setSocialChannels(SOCIAL_CHANNELS);
      setCharityWorks(CHARITY_PROJECTS);
      setSubscribers(DEFAULT_SUBSCRIBERS);
      setDispatches(DEFAULT_DISPATCHES);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
      localStorage.setItem(STORAGE_KEYS.VACANCIES, JSON.stringify(vacancies));
      localStorage.setItem(STORAGE_KEYS.SOCIALS, JSON.stringify(socialChannels));
      localStorage.setItem(STORAGE_KEYS.CHARITY, JSON.stringify(charityWorks));
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(subscribers));
      localStorage.setItem(STORAGE_KEYS.DISPATCHES, JSON.stringify(dispatches));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [articles, events, vacancies, socialChannels, charityWorks, subscribers, dispatches, isInitialized]);

  // --- Article CRUD ---
  const addArticle = (data: Omit<Article, 'id'>): Article => {
    const newArticle: Article = {
      ...data,
      id: 'art-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      views: data.views || 100
    };
    setArticles(prev => [newArticle, ...prev]);
    return newArticle;
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  // --- Event CRUD ---
  const addEvent = (data: Omit<EventItem, 'id'>): EventItem => {
    const newEvent: EventItem = {
      ...data,
      id: 'ev-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // --- Vacancy CRUD ---
  const addVacancy = (data: Omit<VacancyItem, 'id'>): VacancyItem => {
    const newVac: VacancyItem = {
      ...data,
      id: 'vac-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
    };
    setVacancies(prev => [newVac, ...prev]);
    return newVac;
  };

  const updateVacancy = (id: string, updated: Partial<VacancyItem>) => {
    setVacancies(prev => prev.map(v => v.id === id ? { ...v, ...updated } : v));
  };

  const deleteVacancy = (id: string) => {
    setVacancies(prev => prev.filter(v => v.id !== id));
  };

  // --- Social Channels CRUD ---
  const addSocialChannel = (data: Omit<SocialChannelItem, 'id'>): SocialChannelItem => {
    const newChan: SocialChannelItem = {
      ...data,
      id: 'soc-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
    };
    setSocialChannels(prev => [...prev, newChan]);
    return newChan;
  };

  const updateSocialChannel = (id: string, updated: Partial<SocialChannelItem>) => {
    setSocialChannels(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteSocialChannel = (id: string) => {
    setSocialChannels(prev => prev.filter(s => s.id !== id));
  };

  // --- Charity Work CRUD ---
  const addCharityWork = (data: Omit<CharityProject, 'id'>): CharityProject => {
    const newCharity: CharityProject = {
      ...data,
      id: 'ch-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
    };
    setCharityWorks(prev => [newCharity, ...prev]);
    return newCharity;
  };

  const updateCharityWork = (id: string, updated: Partial<CharityProject>) => {
    setCharityWorks(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCharityWork = (id: string) => {
    setCharityWorks(prev => prev.filter(c => c.id !== id));
  };

  // --- Newsletter Subscribers CRUD ---
  const addSubscriber = (data: Omit<SubscriberItem, 'id' | 'subscribedAt'>): { subscriber: SubscriberItem; isNew: boolean } => {
    const existing = subscribers.find(s => s.email.toLowerCase().trim() === data.email.toLowerCase().trim());
    if (existing) {
      // Re-activate and update topics/frequency if already exists
      const updatedSub: SubscriberItem = {
        ...existing,
        ...data,
        status: 'active'
      };
      setSubscribers(prev => prev.map(s => s.id === existing.id ? updatedSub : s));
      return { subscriber: updatedSub, isNew: false };
    }

    const newSub: SubscriberItem = {
      ...data,
      id: 'sub-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };
    setSubscribers(prev => [newSub, ...prev]);
    return { subscriber: newSub, isNew: true };
  };

  const updateSubscriber = (id: string, updated: Partial<SubscriberItem>) => {
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteSubscriber = (id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
  };

  // --- Newsletter Dispatches CRUD ---
  const addDispatch = (data: Omit<NewsletterDispatch, 'id'>): NewsletterDispatch => {
    const newDispatch: NewsletterDispatch = {
      ...data,
      id: 'disp-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      sentAt: data.status === 'sent' ? new Date().toISOString() : data.sentAt
    };
    setDispatches(prev => [newDispatch, ...prev]);
    return newDispatch;
  };

  const updateDispatch = (id: string, updated: Partial<NewsletterDispatch>) => {
    setDispatches(prev => prev.map(d => d.id === id ? { ...d, ...updated } : d));
  };

  const deleteDispatch = (id: string) => {
    setDispatches(prev => prev.filter(d => d.id !== id));
  };

  const resetAllData = () => {
    setArticles(NEWS_ARTICLES);
    setEvents(EVENTS_DATA);
    setVacancies(VACANCIES_DATA);
    setSocialChannels(SOCIAL_CHANNELS);
    setCharityWorks(CHARITY_PROJECTS);
    setSubscribers(DEFAULT_SUBSCRIBERS);
    setDispatches(DEFAULT_DISPATCHES);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.VACANCIES);
    localStorage.removeItem(STORAGE_KEYS.SOCIALS);
    localStorage.removeItem(STORAGE_KEYS.CHARITY);
    localStorage.removeItem(STORAGE_KEYS.SUBSCRIBERS);
    localStorage.removeItem(STORAGE_KEYS.DISPATCHES);
  };

  return (
    <DataContext.Provider
      value={{
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        vacancies,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        socialChannels,
        addSocialChannel,
        updateSocialChannel,
        deleteSocialChannel,
        charityWorks,
        addCharityWork,
        updateCharityWork,
        deleteCharityWork,
        subscribers,
        addSubscriber,
        updateSubscriber,
        deleteSubscriber,
        dispatches,
        addDispatch,
        updateDispatch,
        deleteDispatch,
        resetAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};


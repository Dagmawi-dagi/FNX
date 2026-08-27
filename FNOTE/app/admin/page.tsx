'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Briefcase, 
  HandHeart, 
  Share2, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X, 
  Save, 
  ArrowUpRight, 
  Radio, 
  Sparkles, 
  Users, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  RotateCcw,
  ExternalLink,
  Coins,
  FileText,
  Mail,
  Send,
  Download,
  Filter,
  Inbox
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';
import { 
  Article, 
  EventItem, 
  VacancyItem, 
  CharityProject, 
  SocialChannelItem,
  CharityCategory,
  SubscriberItem,
  NewsletterDispatch,
  NewsletterTopic,
  NewsletterFrequency,
  Language
} from '@/utils/types';

type AdminTab = 'overview' | 'blog' | 'events' | 'vacancies' | 'charity' | 'socials' | 'newsletter';

export default function AdminDeskDashboard() {
  const { language } = useLanguage();
  const { 
    articles, addArticle, updateArticle, deleteArticle,
    events, addEvent, updateEvent, deleteEvent,
    vacancies, addVacancy, updateVacancy, deleteVacancy,
    charityWorks, addCharityWork, updateCharityWork, deleteCharityWork,
    socialChannels, addSocialChannel, updateSocialChannel, deleteSocialChannel,
    subscribers, addSubscriber, updateSubscriber, deleteSubscriber,
    dispatches, addDispatch, updateDispatch, deleteDispatch,
    resetAllData
  } = useData();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal states
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const [vacancyModalOpen, setVacancyModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<VacancyItem | null>(null);

  const [charityModalOpen, setCharityModalOpen] = useState(false);
  const [editingCharity, setEditingCharity] = useState<CharityProject | null>(null);

  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialChannelItem | null>(null);

  // Newsletter & Subscriber states
  const [subscriberModalOpen, setSubscriberModalOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<SubscriberItem | null>(null);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [editingDispatch, setEditingDispatch] = useState<NewsletterDispatch | null>(null);
  const [previewDispatch, setPreviewDispatch] = useState<NewsletterDispatch | null>(null);

  const [activeNewsletterSubTab, setActiveNewsletterSubTab] = useState<'subscribers' | 'dispatches' | 'analytics'>('subscribers');
  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [subscriberFilterFreq, setSubscriberFilterFreq] = useState<string>('all');
  const [subscriberFilterTopic, setSubscriberFilterTopic] = useState<string>('all');
  const [dispatchSearch, setDispatchSearch] = useState('');

  const [subscriberForm, setSubscriberForm] = useState<{
    email: string;
    name: string;
    frequency: NewsletterFrequency;
    topics: NewsletterTopic[];
    language: Language;
    status: 'active' | 'paused' | 'unsubscribed';
  }>({
    email: '',
    name: '',
    frequency: 'weekly',
    topics: ['liturgy_feasts', 'monasteries_charity'],
    language: 'am',
    status: 'active'
  });

  const [dispatchForm, setDispatchForm] = useState<{
    edition: string;
    subject: string;
    preheader: string;
    targetFrequency: 'all' | NewsletterFrequency;
    targetTopics: NewsletterTopic[];
    targetLanguage: 'all' | Language;
    content: string;
    author: string;
    status: 'sent' | 'draft' | 'scheduled';
  }>({
    edition: `Weekly Spiritual Bulletin #${(dispatches?.length || 0) + 94}`,
    subject: '',
    preheader: '',
    targetFrequency: 'all',
    targetTopics: ['liturgy_feasts', 'monasteries_charity', 'sermons_patristics'],
    targetLanguage: 'all',
    content: '',
    author: 'Fnote Tsidk Theological Editorial Desk',
    status: 'sent'
  });

  // Form states
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Spiritual',
    author: 'Fnote Tsidk Editorial Desk',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    isBreaking: false,
    views: 1200
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Liturgical Feast' as EventItem['category'],
    date: 'August 28, 2026',
    time: '05:30 AM – 12:30 PM (EAT)',
    location: 'Holy Trinity Cathedral, Addis Ababa',
    description: '',
    isUpcoming: true,
    registrationOpen: false,
    isLiveBroadcast: true
  });

  const [vacancyForm, setVacancyForm] = useState({
    title: '',
    department: 'Editorial & News',
    type: 'Full-time',
    location: 'Addis Ababa (On-site)',
    deadline: 'September 15, 2026',
    experience: '2+ Years in Media or Church Translation',
    description: '',
    requirementsText: 'Bachelor degree in Journalism, Theology or related field\nFluency in Amharic and Ge\'ez or English\nCommitment to orthodox ethics'
  });

  const [charityForm, setCharityForm] = useState({
    title: '',
    category: 'Monastery Support' as CharityCategory,
    location: 'Waldiba & Remote Monasteries',
    date: 'Active Campaign 2026',
    description: '',
    beneficiaries: '1,000+ Monks & Ascetics',
    targetAmount: '2,500,000 ETB',
    raisedAmount: '1,800,000 ETB',
    status: 'Active' as CharityProject['status'],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    organizer: 'Fnote Tsidk Charity Brigade',
    impactHighlight: 'Delivered food rations and solar power kits to 15 remote hermitages.'
  });

  const [socialForm, setSocialForm] = useState({
    name: '',
    platform: 'YouTube',
    handle: '@FnoteTsidkOfficial',
    subscribers: '150k Followers',
    description: '',
    link: 'https://youtube.com',
    badge: 'Official Media',
    color: '#FF0000',
    icon: 'youtube'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- Article Handlers ---
  const handleOpenArticleModal = (art?: Article) => {
    if (art) {
      setEditingArticle(art);
      setArticleForm({
        title: art.title,
        category: art.category,
        author: art.author,
        date: art.date,
        excerpt: art.excerpt,
        content: art.content,
        imageUrl: art.imageUrl,
        isBreaking: !!art.isBreaking,
        views: art.views || 500
      });
    } else {
      setEditingArticle(null);
      setArticleForm({
        title: '',
        category: 'Spiritual',
        author: 'Fnote Tsidk Editorial Desk',
        date: new Date().toISOString().split('T')[0],
        excerpt: '',
        content: '',
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        isBreaking: false,
        views: 1000
      });
    }
    setBlogModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      updateArticle(editingArticle.id, articleForm);
      showToast('Article updated successfully!');
    } else {
      addArticle(articleForm);
      showToast('New article published to Blog!');
    }
    setBlogModalOpen(false);
  };

  // --- Event Handlers ---
  const handleOpenEventModal = (ev?: EventItem) => {
    if (ev) {
      setEditingEvent(ev);
      setEventForm({
        title: ev.title,
        category: ev.category,
        date: ev.date,
        time: ev.time,
        location: ev.location,
        description: ev.description,
        isUpcoming: ev.isUpcoming,
        registrationOpen: ev.registrationOpen,
        isLiveBroadcast: !!ev.isLiveBroadcast
      });
    } else {
      setEditingEvent(null);
      setEventForm({
        title: '',
        category: 'Liturgical Feast',
        date: 'September 27, 2026',
        time: '06:00 AM – 01:00 PM (EAT)',
        location: 'Meskel Square, Addis Ababa',
        description: '',
        isUpcoming: true,
        registrationOpen: false,
        isLiveBroadcast: true
      });
    }
    setEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, eventForm);
      showToast('Event updated successfully!');
    } else {
      addEvent(eventForm);
      showToast('New event scheduled!');
    }
    setEventModalOpen(false);
  };

  // --- Vacancy Handlers ---
  const handleOpenVacancyModal = (vac?: VacancyItem) => {
    if (vac) {
      setEditingVacancy(vac);
      setVacancyForm({
        title: vac.title,
        department: vac.department,
        type: vac.type,
        location: vac.location,
        deadline: vac.deadline,
        experience: vac.experience,
        description: vac.description,
        requirementsText: vac.requirements.join('\n')
      });
    } else {
      setEditingVacancy(null);
      setVacancyForm({
        title: '',
        department: 'Editorial & News',
        type: 'Full-time',
        location: 'Addis Ababa (On-site)',
        deadline: 'October 15, 2026',
        experience: '2+ Years Experience',
        description: '',
        requirementsText: 'Bachelor degree in relevant field\nExcellent linguistic skills\nEthical dedication to church heritage'
      });
    }
    setVacancyModalOpen(true);
  };

  const handleSaveVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = vacancyForm.requirementsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const vacData = {
      title: vacancyForm.title,
      department: vacancyForm.department,
      type: vacancyForm.type,
      location: vacancyForm.location,
      deadline: vacancyForm.deadline,
      experience: vacancyForm.experience,
      description: vacancyForm.description,
      requirements
    };

    if (editingVacancy) {
      updateVacancy(editingVacancy.id, vacData);
      showToast('Vacancy updated successfully!');
    } else {
      addVacancy(vacData);
      showToast('New vacancy position posted!');
    }
    setVacancyModalOpen(false);
  };

  // --- Charity Handlers ---
  const handleOpenCharityModal = (ch?: CharityProject) => {
    if (ch) {
      setEditingCharity(ch);
      setCharityForm({
        title: ch.title,
        category: ch.category,
        location: ch.location,
        date: ch.date,
        description: ch.description,
        beneficiaries: ch.beneficiaries,
        targetAmount: ch.targetAmount || '',
        raisedAmount: ch.raisedAmount || '',
        status: ch.status,
        imageUrl: ch.imageUrl,
        organizer: ch.organizer,
        impactHighlight: ch.impactHighlight || ''
      });
    } else {
      setEditingCharity(null);
      setCharityForm({
        title: '',
        category: 'Monastery Support',
        location: 'Lake Tana Monasteries & Hermitages',
        date: 'Active Project 2026',
        description: '',
        beneficiaries: '850+ Ascetics & Monks',
        targetAmount: '1,800,000 ETB',
        raisedAmount: '950,000 ETB',
        status: 'Active',
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        organizer: 'Fnote Tsidk Monastic Welfare Wing',
        impactHighlight: 'Provided food grains, blankets, and solar lamps.'
      });
    }
    setCharityModalOpen(true);
  };

  const handleSaveCharity = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCharity) {
      updateCharityWork(editingCharity.id, charityForm);
      showToast('Charity project updated successfully!');
    } else {
      addCharityWork(charityForm);
      showToast('New charity mission launched!');
    }
    setCharityModalOpen(false);
  };

  // --- Social Channels Handlers ---
  const handleOpenSocialModal = (soc?: SocialChannelItem) => {
    if (soc) {
      setEditingSocial(soc);
      setSocialForm({
        name: soc.name,
        platform: soc.platform,
        handle: soc.handle,
        subscribers: soc.subscribers,
        description: soc.description,
        link: soc.link || soc.url,
        badge: soc.badge,
        color: soc.color,
        icon: soc.icon
      });
    } else {
      setEditingSocial(null);
      setSocialForm({
        name: 'TikTok Official',
        platform: 'TikTok',
        handle: '@FnoteTsidk',
        subscribers: '100,000+ Followers',
        description: 'Short spiritual video teachings and Ge\'ez hymns.',
        link: 'https://tiktok.com',
        badge: 'Shorts & Audio',
        color: '#000000',
        icon: 'video'
      });
    }
    setSocialModalOpen(true);
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...socialForm,
      url: socialForm.link
    };
    if (editingSocial) {
      updateSocialChannel(editingSocial.id, data);
      showToast('Social channel updated!');
    } else {
      addSocialChannel(data);
      showToast('Social channel added!');
    }
    setSocialModalOpen(false);
  };

  // --- Newsletter Subscriber Handlers ---
  const handleOpenSubscriberModal = (sub?: SubscriberItem) => {
    if (sub) {
      setEditingSubscriber(sub);
      setSubscriberForm({
        email: sub.email,
        name: sub.name || '',
        frequency: sub.frequency,
        topics: sub.topics,
        language: sub.language,
        status: sub.status
      });
    } else {
      setEditingSubscriber(null);
      setSubscriberForm({
        email: '',
        name: '',
        frequency: 'weekly',
        topics: ['liturgy_feasts', 'monasteries_charity', 'sermons_patristics'],
        language: 'am',
        status: 'active'
      });
    }
    setSubscriberModalOpen(true);
  };

  const handleSaveSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberForm.email.trim()) return;

    if (editingSubscriber) {
      updateSubscriber(editingSubscriber.id, {
        email: subscriberForm.email.trim(),
        name: subscriberForm.name.trim() || undefined,
        frequency: subscriberForm.frequency,
        topics: subscriberForm.topics.length > 0 ? subscriberForm.topics : ['liturgy_feasts'],
        language: subscriberForm.language,
        status: subscriberForm.status
      });
      showToast('Subscriber preferences updated.');
    } else {
      const res = addSubscriber({
        email: subscriberForm.email.trim(),
        name: subscriberForm.name.trim() || undefined,
        frequency: subscriberForm.frequency,
        topics: subscriberForm.topics.length > 0 ? subscriberForm.topics : ['liturgy_feasts'],
        language: subscriberForm.language,
        status: subscriberForm.status,
        source: 'admin_desk'
      });
      showToast(res.isNew ? 'New subscriber registered to newsletter!' : 'Existing subscriber record updated.');
    }
    setSubscriberModalOpen(false);
  };

  const handleToggleSubscriberStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'paused' : 'active';
    updateSubscriber(id, { status: nextStatus });
    showToast(`Subscriber status changed to ${nextStatus}.`);
  };

  const handleDeleteSubscriber = (id: string, email: string) => {
    if (confirm(`Are you sure you want to remove subscriber "${email}"?`)) {
      deleteSubscriber(id);
      showToast('Subscriber removed from list.');
    }
  };

  // --- Newsletter Dispatch Handlers ---
  const handleOpenDispatchModal = (disp?: NewsletterDispatch) => {
    if (disp) {
      setEditingDispatch(disp);
      setDispatchForm({
        edition: disp.edition,
        subject: disp.subject,
        preheader: disp.preheader,
        targetFrequency: disp.targetFrequency,
        targetTopics: (disp.targetTopics || ['liturgy_feasts']) as NewsletterTopic[],
        targetLanguage: (disp.targetLanguage || 'all') as 'all' | Language,
        content: disp.content,
        author: disp.author,
        status: disp.status
      });
    } else {
      setEditingDispatch(null);
      setDispatchForm({
        edition: `Weekly Spiritual Bulletin #${dispatches.length + 94}`,
        subject: '',
        preheader: '',
        targetFrequency: 'all',
        targetTopics: ['liturgy_feasts', 'monasteries_charity', 'sermons_patristics'],
        targetLanguage: 'all',
        content: `Peace and grace to the beloved flock of Christ.\n\nIn this week's spiritual dispatch, we reflect upon the liturgical readings and share urgent updates regarding our monastic relief initiatives:\n\n1. Gospel & Synaxarium Reflection:\n"He that hath ears to hear, let him hear." The patristic homilies remind us of constant prayer and vigilance.\n\n2. Monastic Preservation Fund:\nThanks to generous donors, solar electrification and dry grain rations were dispatched to remote hermit sanctuaries.\n\n3. Upcoming Liturgical Broadcasts:\nJoin us this Sunday at 06:00 AM (EAT) for live Divine Liturgy and St. Yared hymns.\n\nMay the intercession of the Holy Mother of God be with us all. Amen.`,
        author: 'Fnote Tsidk Theological Editorial Desk',
        status: 'sent'
      });
    }
    setDispatchModalOpen(true);
  };

  const handleSaveDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchForm.subject.trim() || !dispatchForm.content.trim()) return;

    // Calculate realistic target recipients count
    const targetAudienceCount = Math.max(
      120,
      dispatchForm.targetFrequency === 'all' 
        ? (subscribers.length + 4280)
        : Math.round((subscribers.length + 4280) * 0.65)
    );

    if (editingDispatch) {
      updateDispatch(editingDispatch.id, {
        ...dispatchForm,
        recipientsCount: targetAudienceCount
      });
      showToast('Newsletter dispatch updated.');
    } else {
      addDispatch({
        ...dispatchForm,
        recipientsCount: targetAudienceCount,
        openRate: '79.4%',
        clicksCount: Math.round(targetAudienceCount * 0.38)
      });
      showToast(dispatchForm.status === 'sent' 
        ? `Spiritual Bulletin dispatched to ${targetAudienceCount.toLocaleString()} subscribers!`
        : 'Spiritual Bulletin draft saved.'
      );
    }
    setDispatchModalOpen(false);
  };

  const handleDeleteDispatch = (id: string, edition: string) => {
    if (confirm(`Delete dispatch edition "${edition}"?`)) {
      deleteDispatch(id);
      showToast('Dispatch record deleted.');
    }
  };

  // CSV Export utility
  const handleExportSubscribersCSV = () => {
    const headers = ['Email', 'Name', 'Frequency', 'Topics', 'Language', 'Status', 'Joined Date', 'Source'];
    const rows = subscribers.map(s => [
      `"${s.email}"`,
      `"${s.name || ''}"`,
      `"${s.frequency}"`,
      `"${s.topics.join(';')}"`,
      `"${s.language}"`,
      `"${s.status}"`,
      `"${s.subscribedAt}"`,
      `"${s.source || 'portal'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fnote_tsidk_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${subscribers.length} subscriber records to CSV.`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#004225] py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#004225] text-[#FFCF9D] border border-[#FFB000] shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#FFB000]" />
          <span className="text-xs font-bold font-serif">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Admin Desk Banner */}
        <div className="rounded-3xl bg-[#004225] text-[#F5F5DC] p-6 sm:p-8 border border-[#004225]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FAF7EE]/15 text-[#FFCF9D] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>Admin & Editorial Control Desk</span>
              </span>
              <span className="text-xs text-[#F5F5DC]/70 font-mono">v2.6 • Live DB</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-serif text-[#F5F5DC]">
              Fnote Tsidk Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#F5F5DC]/80 max-w-2xl">
              Manage live blog posts, liturgical calendar events, ministry vacancies, community charity projects, and broadcast social channels in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-[#FAF7EE]/15 hover:bg-[#FAF7EE]/25 border border-[#FFCF9D]/30 text-[#F5F5DC] text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <span>View Public Portal</span>
              <ArrowUpRight className="w-4 h-4 text-[#FFCF9D]" />
            </Link>

            <button
              onClick={() => {
                if (confirm('Reset all Blog, Events, Vacancies, and Charity data back to initial seed data?')) {
                  resetAllData();
                  showToast('Data reset to original templates.');
                }
              }}
              className="px-3.5 py-2.5 rounded-xl bg-[#FAF7EE]/10 hover:bg-rose-900/40 border border-[#FAF7EE]/20 text-[#F5F5DC]/80 hover:text-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset to default seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Overview Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div 
            onClick={() => setActiveTab('blog')}
            className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1 hover:border-[#004225]/40 transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Blog Articles</span>
              <div className="p-2 rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">{articles.length}</p>
            <p className="text-[11px] text-[#004225]/80">Published in 6 categories</p>
          </div>

          <div 
            onClick={() => setActiveTab('events')}
            className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1 hover:border-[#004225]/40 transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Church Events</span>
              <div className="p-2 rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:scale-110 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">{events.length}</p>
            <p className="text-[11px] text-[#004225]/80">Feasts & live broadcasts</p>
          </div>

          <div 
            onClick={() => setActiveTab('vacancies')}
            className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1 hover:border-[#004225]/40 transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Open Vacancies</span>
              <div className="p-2 rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:scale-110 transition-transform">
                <Briefcase className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">{vacancies.length}</p>
            <p className="text-[11px] text-[#004225]/80">Recruiting staff & talent</p>
          </div>

          <div 
            onClick={() => setActiveTab('charity')}
            className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1 hover:border-[#004225]/40 transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Charity Projects</span>
              <div className="p-2 rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:scale-110 transition-transform">
                <HandHeart className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">{charityWorks.length}</p>
            <p className="text-[11px] text-[#004225]/80">Monastic & food relief</p>
          </div>

          <div 
            onClick={() => setActiveTab('newsletter')}
            className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1 hover:border-[#004225]/40 transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Newsletter</span>
              <div className="p-2 rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">{subscribers.length}</p>
            <p className="text-[11px] text-[#004225]/80">{dispatches.length} editions dispatched</p>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#004225]/15">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'blog'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog & Articles ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'events'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events & Broadcasts ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vacancies')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'vacancies'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Vacancies ({vacancies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('charity')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'charity'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
            }`}
          >
            <HandHeart className="w-4 h-4" />
            <span>Social & Charity ({charityWorks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('socials')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'socials'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Channels ({socialChannels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'newsletter'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Newsletter & Dispatches ({subscribers.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#004225]">Quick Creation Actions</h2>
                  <p className="text-xs text-[#004225]/75">Instantly launch new content to public pages with single clicks.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
                <button
                  onClick={() => handleOpenArticleModal()}
                  className="p-5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] text-left space-y-2 transition-all group cursor-pointer"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:bg-[#FAF7EE] group-hover:text-[#004225]">
                    <Plus className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-serif">Create Blog Article</h3>
                  <p className="text-xs opacity-75">Publish spiritual teachings & essays.</p>
                </button>

                <button
                  onClick={() => handleOpenEventModal()}
                  className="p-5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] text-left space-y-2 transition-all group cursor-pointer"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:bg-[#FAF7EE] group-hover:text-[#004225]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-serif">Schedule Church Event</h3>
                  <p className="text-xs opacity-75">Announce liturgical feasts & live streams.</p>
                </button>

                <button
                  onClick={() => handleOpenVacancyModal()}
                  className="p-5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] text-left space-y-2 transition-all group cursor-pointer"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:bg-[#FAF7EE] group-hover:text-[#004225]">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-serif">Post Vacancy Opening</h3>
                  <p className="text-xs opacity-75">Recruit journalists, choir hosts & staff.</p>
                </button>

                <button
                  onClick={() => handleOpenCharityModal()}
                  className="p-5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] text-left space-y-2 transition-all group cursor-pointer"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:bg-[#FAF7EE] group-hover:text-[#004225]">
                    <HandHeart className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-serif">Add Charity Mission</h3>
                  <p className="text-xs opacity-75">Monastery sustenance & aid relief.</p>
                </button>

                <button
                  onClick={() => handleOpenDispatchModal()}
                  className="p-5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] text-left space-y-2 transition-all group cursor-pointer"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-[#004225] text-[#FFCF9D] group-hover:bg-[#FAF7EE] group-hover:text-[#004225]">
                    <Send className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold font-serif">Dispatch Bulletin</h3>
                  <p className="text-xs opacity-75">Broadcast spiritual digest to subscribers.</p>
                </button>
              </div>
            </div>

            {/* Recent Items Preview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Articles */}
              <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-4">
                <div className="flex items-center justify-between border-b border-[#004225]/10 pb-3">
                  <h3 className="font-bold text-sm text-[#004225] font-serif flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#004225]" />
                    <span>Recent Blog Dispatches</span>
                  </h3>
                  <button onClick={() => setActiveTab('blog')} className="text-xs font-bold text-[#004225] hover:underline">
                    View All ({articles.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {articles.slice(0, 3).map((art) => (
                    <div key={art.id} className="p-3.5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/10 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#004225] text-[#FFCF9D]">
                          {art.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#004225] line-clamp-1">{art.title}</h4>
                        <p className="text-[11px] text-[#004225]/70">{art.author} • {art.date}</p>
                      </div>
                      <button
                        onClick={() => handleOpenArticleModal(art)}
                        className="p-2 rounded-xl bg-[#FAF7EE] hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Charity Projects */}
              <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-4">
                <div className="flex items-center justify-between border-b border-[#004225]/10 pb-3">
                  <h3 className="font-bold text-sm text-[#004225] font-serif flex items-center gap-2">
                    <HandHeart className="w-4 h-4 text-[#004225]" />
                    <span>Active Community Charity Projects</span>
                  </h3>
                  <button onClick={() => setActiveTab('charity')} className="text-xs font-bold text-[#004225] hover:underline">
                    View All ({charityWorks.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {charityWorks.slice(0, 3).map((ch) => (
                    <div key={ch.id} className="p-3.5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/10 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white">
                          {ch.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#004225] line-clamp-1">{ch.title}</h4>
                        <p className="text-[11px] text-[#004225]/70">{ch.location} • {ch.beneficiaries}</p>
                      </div>
                      <button
                        onClick={() => handleOpenCharityModal(ch)}
                        className="p-2 rounded-xl bg-[#FAF7EE] hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: BLOG & ARTICLES MANAGER */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#004225]">
                  Manage Blog Posts & Theological Articles
                </h2>
                <p className="text-xs text-[#004225]/75">
                  Published items immediately reflect on the public Blog and Home news feed.
                </p>
              </div>

              <button
                onClick={() => handleOpenArticleModal()}
                className="px-5 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#FFB000]" />
                <span>New Blog Article</span>
              </button>
            </div>

            {/* Articles Table/List */}
            <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#004225]">
                  <thead className="bg-[#004225] text-[#FFCF9D] font-serif uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">Article Title & Details</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Views</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#004225]/10">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-[#F5F5DC]/80 transition-colors">
                        <td className="p-4 max-w-xs sm:max-w-md">
                          <div className="font-bold text-sm text-[#004225] line-clamp-1">{art.title}</div>
                          <div className="text-[11px] text-[#004225]/70 line-clamp-1">{art.excerpt}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#004225]/10 text-[#004225] font-bold text-[10px]">
                            {art.category}
                          </span>
                        </td>
                        <td className="p-4 font-medium">{art.author}</td>
                        <td className="p-4 whitespace-nowrap text-[#004225]/80">{art.date}</td>
                        <td className="p-4 font-mono font-bold text-[#004225]">{art.views?.toLocaleString() || 500}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenArticleModal(art)}
                              className="p-2 rounded-lg bg-[#FAF7EE] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-colors"
                              title="Edit Article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete article "${art.title}"?`)) {
                                  deleteArticle(art.id);
                                  showToast('Article deleted.');
                                }
                              }}
                              className="p-2 rounded-lg bg-[#FAF7EE] border border-rose-200 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EVENTS & BROADCASTS MANAGER */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#004225]">
                  Manage Liturgical Feasts & Broadcast Events
                </h2>
                <p className="text-xs text-[#004225]/75">
                  Scheduled church celebrations, pilgrimage dates, and live satellite broadcasts.
                </p>
              </div>

              <button
                onClick={() => handleOpenEventModal()}
                className="px-5 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#FFB000]" />
                <span>Schedule New Event</span>
              </button>
            </div>

            <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#004225]">
                  <thead className="bg-[#004225] text-[#FFCF9D] font-serif uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">Event Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Live Stream</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#004225]/10">
                    {events.map((ev) => (
                      <tr key={ev.id} className="hover:bg-[#F5F5DC]/80 transition-colors">
                        <td className="p-4 max-w-xs">
                          <div className="font-bold text-sm text-[#004225]">{ev.title}</div>
                          <div className="text-[11px] text-[#004225]/70 line-clamp-1">{ev.description}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#004225]/10 text-[#004225] font-bold text-[10px]">
                            {ev.category}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <div className="font-bold">{ev.date}</div>
                          <div className="text-[11px] text-[#004225]/70">{ev.time}</div>
                        </td>
                        <td className="p-4 text-[#004225]/85 max-w-xs">{ev.location}</td>
                        <td className="p-4">
                          {ev.isLiveBroadcast ? (
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px] inline-flex items-center gap-1">
                              <Radio className="w-3 h-3 text-rose-600 animate-pulse" /> Live HD
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#004225]/60">On-site only</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEventModal(ev)}
                              className="p-2 rounded-lg bg-[#FAF7EE] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-colors"
                              title="Edit Event"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete event "${ev.title}"?`)) {
                                  deleteEvent(ev.id);
                                  showToast('Event removed.');
                                }
                              }}
                              className="p-2 rounded-lg bg-[#FAF7EE] border border-rose-200 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                              title="Delete Event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VACANCIES & RECRUITMENT */}
        {activeTab === 'vacancies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#004225]">
                  Manage Ministry Vacancies & Careers
                </h2>
                <p className="text-xs text-[#004225]/75">
                  Openings for broadcast staff, theological researchers, sound engineers, and community liaisons.
                </p>
              </div>

              <button
                onClick={() => handleOpenVacancyModal()}
                className="px-5 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#FFB000]" />
                <span>Post New Vacancy</span>
              </button>
            </div>

            <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#004225]">
                  <thead className="bg-[#004225] text-[#FFCF9D] font-serif uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">Position Title</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Type & Location</th>
                      <th className="p-4">Deadline</th>
                      <th className="p-4">Requirements</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#004225]/10">
                    {vacancies.map((vac) => (
                      <tr key={vac.id} className="hover:bg-[#F5F5DC]/80 transition-colors">
                        <td className="p-4 max-w-xs">
                          <div className="font-bold text-sm text-[#004225]">{vac.title}</div>
                          <div className="text-[11px] text-[#004225]/70 line-clamp-1">{vac.description}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#004225] text-[#FFCF9D] font-bold text-[10px]">
                            {vac.department}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-bold">{vac.type}</div>
                          <div className="text-[11px] text-[#004225]/70">{vac.location}</div>
                        </td>
                        <td className="p-4 whitespace-nowrap font-medium text-rose-800">{vac.deadline}</td>
                        <td className="p-4 text-[11px] text-[#004225]/80">{vac.requirements.length} qualifications</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenVacancyModal(vac)}
                              className="p-2 rounded-lg bg-[#FAF7EE] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-colors"
                              title="Edit Vacancy"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete vacancy "${vac.title}"?`)) {
                                  deleteVacancy(vac.id);
                                  showToast('Vacancy removed.');
                                }
                              }}
                              className="p-2 rounded-lg bg-[#FAF7EE] border border-rose-200 hover:bg-rose-600 hover:text-white text-rose-600 transition-colors"
                              title="Delete Vacancy"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SOCIALS & COMMUNITY CHARITY WORK */}
        {activeTab === 'charity' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#004225]">
                  Manage Community & Charity Outreach
                </h2>
                <p className="text-xs text-[#004225]/75">
                  Direct missions supporting hermitages, monastery food supplies, elderly feeding, and free healthcare.
                </p>
              </div>

              <button
                onClick={() => handleOpenCharityModal()}
                className="px-5 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#FFB000]" />
                <span>Create Charity Mission</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charityWorks.map((ch) => (
                <div key={ch.id} className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-[#004225] text-[#FFCF9D] text-xs font-bold">
                        {ch.category}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ch.status === 'Active' ? 'bg-emerald-600 text-white' : 'bg-[#FFB000] text-[#004225]'
                      }`}>
                        {ch.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base font-serif text-[#004225] line-clamp-2">
                      {ch.title}
                    </h3>

                    <p className="text-xs text-[#004225]/80 line-clamp-2">{ch.description}</p>

                    <div className="space-y-1 text-xs pt-1 border-t border-[#004225]/10">
                      <div className="flex justify-between">
                        <span className="text-[#004225]/70">Location:</span>
                        <span className="font-bold">{ch.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#004225]/70">Beneficiaries:</span>
                        <span className="font-bold">{ch.beneficiaries}</span>
                      </div>
                      {ch.targetAmount && (
                        <div className="flex justify-between">
                          <span className="text-[#004225]/70">Target Budget:</span>
                          <span className="font-bold text-emerald-800">{ch.targetAmount}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#004225]/10">
                    <button
                      onClick={() => handleOpenCharityModal(ch)}
                      className="px-3 py-1.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete charity mission "${ch.title}"?`)) {
                          deleteCharityWork(ch.id);
                          showToast('Charity mission removed.');
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SOCIAL MEDIA CHANNELS */}
        {activeTab === 'socials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#004225]">
                  Official Social Channels & Live Feeds
                </h2>
                <p className="text-xs text-[#004225]/75">
                  Configure YouTube streaming links, Telegram feeds, Facebook pages, and podcast platforms.
                </p>
              </div>

              <button
                onClick={() => handleOpenSocialModal()}
                className="px-5 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#FFB000]" />
                <span>Add Social Channel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialChannels.map((soc) => (
                <div key={soc.id} className="p-5 rounded-2xl bg-[#FAF7EE] border border-[#004225]/15 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#004225] font-serif">{soc.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#004225] text-[#FFCF9D] font-bold">
                        {soc.badge || soc.platform}
                      </span>
                    </div>
                    <p className="text-xs font-mono font-bold text-[#004225]/80">{soc.handle}</p>
                    <p className="text-xs text-[#004225]/70 line-clamp-2">{soc.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#004225]/10">
                    <span className="text-xs font-bold text-emerald-800">{soc.subscribers}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenSocialModal(soc)}
                        className="p-2 rounded-lg bg-[#F5F5DC] hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete channel "${soc.name}"?`)) {
                            deleteSocialChannel(soc.id);
                            showToast('Social channel removed.');
                          }
                        }}
                        className="p-2 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: NEWSLETTER & SUBSCRIBERS */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6">
            {/* Header with Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-serif text-[#004225]">
                  Spiritual Bulletin & Subscriber Management
                </h2>
                <p className="text-xs text-[#004225]/75">
                  Publish weekly liturgical digests, manage subscriber preferences, and analyze broadcast reach.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleExportSubscribersCSV}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#004225]/20 hover:bg-[#FFCF9D]/30 text-[#004225] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export subscriber emails to CSV file"
                >
                  <Download className="w-4 h-4 text-[#004225]" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => handleOpenSubscriberModal()}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#004225]/30 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#FFB000]" />
                  <span>Add Subscriber</span>
                </button>

                <button
                  onClick={() => handleOpenDispatchModal()}
                  className="px-5 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#FFCF9D]" />
                  <span>Compose & Send Bulletin</span>
                </button>
              </div>
            </div>

            {/* Newsletter Sub-Tabs Navigation */}
            <div className="flex items-center gap-2 border-b border-[#004225]/15 pb-2">
              <button
                onClick={() => setActiveNewsletterSubTab('subscribers')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeNewsletterSubTab === 'subscribers'
                    ? 'bg-[#004225] text-[#F5F5DC]'
                    : 'bg-[#FAF7EE] text-[#004225] hover:bg-[#FFCF9D]/30'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>Active Subscribers ({subscribers.length})</span>
              </button>

              <button
                onClick={() => setActiveNewsletterSubTab('dispatches')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeNewsletterSubTab === 'dispatches'
                    ? 'bg-[#004225] text-[#F5F5DC]'
                    : 'bg-[#FAF7EE] text-[#004225] hover:bg-[#FFCF9D]/30'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>Dispatches & Editions ({dispatches.length})</span>
              </button>

              <button
                onClick={() => setActiveNewsletterSubTab('analytics')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeNewsletterSubTab === 'analytics'
                    ? 'bg-[#004225] text-[#F5F5DC]'
                    : 'bg-[#FAF7EE] text-[#004225] hover:bg-[#FFCF9D]/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>Audience Analytics & Delivery</span>
              </button>
            </div>

            {/* SUB-VIEW 1: SUBSCRIBERS DIRECTORY */}
            {activeNewsletterSubTab === 'subscribers' && (
              <div className="space-y-4">
                {/* Filter and Search controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF7EE] p-3 rounded-2xl border border-[#004225]/15">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-[#004225]/50" />
                    <input
                      type="text"
                      value={subscriberSearch}
                      onChange={(e) => setSubscriberSearch(e.target.value)}
                      placeholder="Search by email, name or location..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-1.5 text-xs text-[#004225] font-bold">
                      <Filter className="w-3.5 h-3.5 text-[#004225]/60" />
                      <span>Frequency:</span>
                    </div>
                    <select
                      value={subscriberFilterFreq}
                      onChange={(e) => setSubscriberFilterFreq(e.target.value)}
                      aria-label="Filter subscribers by frequency"
                      className="px-3 py-1.5 rounded-lg bg-[#F5F5DC] border border-[#004225]/20 text-xs font-medium text-[#004225] focus:outline-none"
                    >
                      <option value="all">All Frequencies</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                      <option value="monthly">Monthly</option>
                      <option value="special_alerts">Special Alerts</option>
                    </select>

                    <select
                      value={subscriberFilterTopic}
                      onChange={(e) => setSubscriberFilterTopic(e.target.value)}
                      aria-label="Filter subscribers by topic"
                      className="px-3 py-1.5 rounded-lg bg-[#F5F5DC] border border-[#004225]/20 text-xs font-medium text-[#004225] focus:outline-none"
                    >
                      <option value="all">All Topics</option>
                      <option value="liturgy_feasts">Liturgical Feasts</option>
                      <option value="monasteries_charity">Monasteries & Relief</option>
                      <option value="sermons_patristics">Patristic Sermons</option>
                      <option value="peace_dialogue">Peace Dialogue</option>
                      <option value="youth_education">Youth Education</option>
                      <option value="breaking_news">Breaking News</option>
                    </select>
                  </div>
                </div>

                {/* Subscribers Table */}
                <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#004225] text-[#F5F5DC] border-b border-[#002816]">
                          <th className="p-4 font-bold">Subscriber Info</th>
                          <th className="p-4 font-bold">Frequency</th>
                          <th className="p-4 font-bold">Subscribed Topics</th>
                          <th className="p-4 font-bold">Language</th>
                          <th className="p-4 font-bold">Status</th>
                          <th className="p-4 font-bold">Joined</th>
                          <th className="p-4 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#004225]/10">
                        {subscribers
                          .filter((s) => {
                            const matchSearch =
                              s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
                              (s.name && s.name.toLowerCase().includes(subscriberSearch.toLowerCase()));
                            const matchFreq =
                              subscriberFilterFreq === 'all' || s.frequency === subscriberFilterFreq;
                            const matchTopic =
                              subscriberFilterTopic === 'all' ||
                              s.topics.includes(subscriberFilterTopic as NewsletterTopic);
                            return matchSearch && matchFreq && matchTopic;
                          })
                          .map((sub) => (
                            <tr key={sub.id} className="hover:bg-[#F5F5DC]/60 transition-colors">
                              <td className="p-4">
                                <div className="space-y-0.5">
                                  <p className="font-bold text-[#004225] flex items-center gap-1.5">
                                    <span>{sub.email}</span>
                                    {sub.source === 'admin_desk' && (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#FFCF9D] text-[#004225] font-bold">Admin</span>
                                    )}
                                  </p>
                                  {sub.name && (
                                    <p className="text-[11px] text-[#004225]/70">{sub.name}</p>
                                  )}
                                </div>
                              </td>

                              <td className="p-4">
                                <span className="px-2.5 py-1 rounded-full bg-[#004225]/10 text-[#004225] font-bold text-[10px] capitalize">
                                  {sub.frequency.replace('_', ' ')}
                                </span>
                              </td>

                              <td className="p-4">
                                <div className="flex flex-wrap gap-1 max-w-xs">
                                  {sub.topics.slice(0, 3).map((t, idx) => (
                                    <span
                                      key={idx}
                                      className="px-1.5 py-0.5 rounded bg-[#F5F5DC] border border-[#004225]/15 text-[9px] text-[#004225]/80 font-medium"
                                    >
                                      {t.replace('_', ' ')}
                                    </span>
                                  ))}
                                  {sub.topics.length > 3 && (
                                    <span className="px-1.5 py-0.5 rounded bg-[#004225]/10 text-[9px] text-[#004225] font-bold">
                                      +{sub.topics.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td className="p-4 font-mono font-bold uppercase text-[10px] text-[#004225]">
                                {sub.language}
                              </td>

                              <td className="p-4">
                                <button
                                  onClick={() => handleToggleSubscriberStatus(sub.id, sub.status)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                    sub.status === 'active'
                                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                  }`}
                                  title="Click to toggle active / paused"
                                >
                                  {sub.status.toUpperCase()}
                                </button>
                              </td>

                              <td className="p-4 text-[11px] text-[#004225]/70">
                                {sub.subscribedAt}
                              </td>

                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleOpenSubscriberModal(sub)}
                                    className="p-2 rounded-lg bg-[#F5F5DC] hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-colors"
                                    title="Edit Subscriber Preferences"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubscriber(sub.id, sub.email)}
                                    className="p-2 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 transition-colors"
                                    title="Delete Subscriber"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: DISPATCHES & EDITIONS */}
            {activeNewsletterSubTab === 'dispatches' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF7EE] p-3 rounded-2xl border border-[#004225]/15">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-[#004225]/50" />
                    <input
                      type="text"
                      value={dispatchSearch}
                      onChange={(e) => setDispatchSearch(e.target.value)}
                      placeholder="Search dispatches by title or edition..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handleOpenDispatchModal()}
                    className="px-4 py-2 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#FFB000]" />
                    <span>New Bulletin Draft</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dispatches
                    .filter((d) =>
                      d.subject.toLowerCase().includes(dispatchSearch.toLowerCase()) ||
                      d.edition.toLowerCase().includes(dispatchSearch.toLowerCase())
                    )
                    .map((disp) => (
                      <div
                        key={disp.id}
                        className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-4 shadow-sm flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#004225] text-[#FFCF9D] font-bold text-[10px]">
                              {disp.edition}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                disp.status === 'sent'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {disp.status.toUpperCase()}
                            </span>
                          </div>

                          <h3 className="text-base font-bold font-serif text-[#004225] leading-snug">
                            {disp.subject}
                          </h3>

                          <p className="text-xs text-[#004225]/80 line-clamp-2">
                            {disp.preheader}
                          </p>

                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#004225]/10 text-center">
                            <div className="p-2 rounded-xl bg-[#F5F5DC]">
                              <span className="block text-xs font-black text-[#004225]">
                                {disp.recipientsCount.toLocaleString()}
                              </span>
                              <span className="text-[9px] text-[#004225]/70">Recipients</span>
                            </div>
                            <div className="p-2 rounded-xl bg-[#F5F5DC]">
                              <span className="block text-xs font-black text-emerald-800">
                                {disp.openRate || '78.5%'}
                              </span>
                              <span className="text-[9px] text-[#004225]/70">Open Rate</span>
                            </div>
                            <div className="p-2 rounded-xl bg-[#F5F5DC]">
                              <span className="block text-xs font-black text-[#004225]">
                                {disp.clicksCount?.toLocaleString() || '1,640'}
                              </span>
                              <span className="text-[9px] text-[#004225]/70">Clicks</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-[#004225]/10 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-[#004225]/70">
                            {disp.sentAt ? new Date(disp.sentAt).toLocaleDateString() : 'Draft'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setPreviewDispatch(disp)}
                              className="px-3 py-1.5 rounded-lg bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-1 transition-colors"
                              title="Preview Bulletin Email"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#FFB000]" />
                              <span>Preview</span>
                            </button>

                            <button
                              onClick={() => handleOpenDispatchModal(disp)}
                              className="p-1.5 rounded-lg bg-[#F5F5DC] hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-colors"
                              title="Edit Edition"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteDispatch(disp.id, disp.edition)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 transition-colors"
                              title="Delete Dispatch Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 3: AUDIENCE & DELIVERY ANALYTICS */}
            {activeNewsletterSubTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1">
                    <span className="text-xs font-bold text-[#004225]/70 uppercase">Global Readers</span>
                    <p className="text-3xl font-black font-serif text-[#004225]">{subscribers.length + 4280}+</p>
                    <p className="text-[11px] text-emerald-800 font-bold">+18.4% this month</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1">
                    <span className="text-xs font-bold text-[#004225]/70 uppercase">Average Open Rate</span>
                    <p className="text-3xl font-black font-serif text-emerald-800">79.8%</p>
                    <p className="text-[11px] text-[#004225]/70">Industry avg: 24.2%</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1">
                    <span className="text-xs font-bold text-[#004225]/70 uppercase">Active Frequencies</span>
                    <p className="text-3xl font-black font-serif text-[#004225]">Weekly 68%</p>
                    <p className="text-[11px] text-[#004225]/70">Daily 18% &bull; Monthly 14%</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-1">
                    <span className="text-xs font-bold text-[#004225]/70 uppercase">Deliverability Score</span>
                    <p className="text-3xl font-black font-serif text-[#004225]">99.4%</p>
                    <p className="text-[11px] text-emerald-800 font-bold">Zero spam flags</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Topic Popularity Breakdown */}
                  <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-4">
                    <h3 className="font-bold text-sm text-[#004225] font-serif">
                      Top Subscribed Topic Categories
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Liturgical Feasts & Fasting Calendars', pct: 88, count: '3,780 readers' },
                        { name: 'Monasteries & Humanitarian Relief', pct: 76, count: '3,250 readers' },
                        { name: 'Patristic Sermons & St. Yared Chants', pct: 71, count: '3,040 readers' },
                        { name: 'Peace & Community Reconciliation', pct: 64, count: '2,740 readers' },
                        { name: 'Sunday School & Youth Literacy', pct: 52, count: '2,220 readers' },
                        { name: 'Breaking Orthodox News', pct: 45, count: '1,930 readers' },
                      ].map((top, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#004225]">{top.name}</span>
                            <span className="text-[#004225]/70">{top.count} ({top.pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[#F5F5DC] overflow-hidden">
                            <div
                              className="h-full bg-[#004225] rounded-full"
                              style={{ width: `${top.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Engine Health & Quick Dispatch */}
                  <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[#004225] font-bold text-sm">
                        <ShieldCheck className="w-5 h-5 text-[#004225]" />
                        <span>Fnote Tsidk Mail Delivery Infrastructure</span>
                      </div>
                      <p className="text-xs text-[#004225]/80 leading-relaxed">
                        Bulletins are distributed via our dedicated SMTP cluster with SPF, DKIM, and DMARC authentication.
                      </p>

                      <div className="p-4 rounded-2xl bg-[#004225] text-[#F5F5DC] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#FFCF9D]">Upcoming Scheduled Issue:</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#FFCF9D]/20 text-[#FFCF9D] text-[10px] font-bold">
                            Friday 07:00 AM EAT
                          </span>
                        </div>
                        <p className="text-xs font-serif font-bold">
                          Feast of St. Mary (Filseta) & Monastery Relief Dispatch
                        </p>
                        <p className="text-[11px] text-[#F5F5DC]/70">
                          Estimated audience: {subscribers.length + 4280} verified inbox recipients.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => handleOpenDispatchModal()}
                        className="w-full py-3 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-[#FFCF9D]" />
                        <span>Compose New Spiritual Digest Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* --- BLOG ARTICLE MODAL --- */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <h3 className="text-xl font-black font-serif text-[#004225]">
                {editingArticle ? 'Edit Blog Article' : 'Create New Blog Post'}
              </h3>
              <button onClick={() => setBlogModalOpen(false)} className="p-2 rounded-full hover:bg-[#004225]/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Article Title *</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="e.g. The Liturgical Beauty of the Ge'ez Degua Chants"
                  className="w-full p-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none focus:border-[#004225]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Category</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="Spiritual">Spiritual</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Multimedia">Multimedia</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Social">Social</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Author</label>
                  <input
                    type="text"
                    required
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Publish Date</label>
                  <input
                    type="date"
                    required
                    value={articleForm.date}
                    onChange={(e) => setArticleForm({ ...articleForm, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={articleForm.imageUrl}
                  onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Short Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  required
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Full Article Content</label>
                <textarea
                  rows={6}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  placeholder="Write the full theological essay or spiritual commentary..."
                  className="w-full p-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="breakingCheck"
                  checked={articleForm.isBreaking}
                  onChange={(e) => setArticleForm({ ...articleForm, isBreaking: e.target.checked })}
                  className="w-4 h-4 accent-[#004225]"
                />
                <label htmlFor="breakingCheck" className="text-xs font-bold cursor-pointer">
                  Mark as Breaking News / Top Highlight Bulletin
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#004225]/15">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#004225]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#FFB000]" />
                  <span>{editingArticle ? 'Save Changes' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EVENT MODAL --- */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <h3 className="text-xl font-black font-serif text-[#004225]">
                {editingEvent ? 'Edit Event' : 'Schedule New Church Event'}
              </h3>
              <button onClick={() => setEventModalOpen(false)} className="p-2 rounded-full hover:bg-[#004225]/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Event Title *</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="e.g. Annual Feast of St. Gabriel / Timket Epiphany"
                  className="w-full p-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none focus:border-[#004225]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value as EventItem['category'] })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="Liturgical Feast">Liturgical Feast</option>
                    <option value="Conference">Conference</option>
                    <option value="Peace Dialogue">Peace Dialogue</option>
                    <option value="Choir Concert">Choir Concert</option>
                    <option value="Broadcast">Broadcast</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Date *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    placeholder="e.g. July 26, 2026"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Time Window</label>
                  <input
                    type="text"
                    required
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    placeholder="e.g. 05:00 AM – 01:00 PM (EAT)"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Location / Route</label>
                  <input
                    type="text"
                    required
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    placeholder="e.g. Kulubi Monastery / Live on Fnote Tsidk TV"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Event Description & Program Details</label>
                <textarea
                  rows={3}
                  required
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Outline liturgical vigils, choir performances, and bishop addresses..."
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventForm.isLiveBroadcast}
                    onChange={(e) => setEventForm({ ...eventForm, isLiveBroadcast: e.target.checked })}
                    className="w-4 h-4 accent-[#004225]"
                  />
                  <span>Live HD Satellite & Web Broadcast</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventForm.registrationOpen}
                    onChange={(e) => setEventForm({ ...eventForm, registrationOpen: e.target.checked })}
                    className="w-4 h-4 accent-[#004225]"
                  />
                  <span>Online Registration Open</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#004225]/15">
                <button
                  type="button"
                  onClick={() => setEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#004225]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#FFB000]" />
                  <span>{editingEvent ? 'Save Changes' : 'Schedule Event'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- VACANCY MODAL --- */}
      {vacancyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <h3 className="text-xl font-black font-serif text-[#004225]">
                {editingVacancy ? 'Edit Vacancy' : 'Post New Ministry Vacancy'}
              </h3>
              <button onClick={() => setVacancyModalOpen(false)} className="p-2 rounded-full hover:bg-[#004225]/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVacancy} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Position Title *</label>
                <input
                  type="text"
                  required
                  value={vacancyForm.title}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, title: e.target.value })}
                  placeholder="e.g. Senior Theological Editor & Broadcast Host"
                  className="w-full p-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none focus:border-[#004225]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Department</label>
                  <select
                    value={vacancyForm.department}
                    onChange={(e) => setVacancyForm({ ...vacancyForm, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="Editorial & News">Editorial & News</option>
                    <option value="Broadcast & Engineering">Broadcast & Engineering</option>
                    <option value="Theology & Research">Theology & Research</option>
                    <option value="Digital & Social">Digital & Social</option>
                    <option value="Translation & Outreach">Translation & Outreach</option>
                    <option value="Audio & Sound Engineering">Audio & Sound Engineering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Job Type</label>
                  <select
                    value={vacancyForm.type}
                    onChange={(e) => setVacancyForm({ ...vacancyForm, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Location</label>
                  <input
                    type="text"
                    required
                    value={vacancyForm.location}
                    onChange={(e) => setVacancyForm({ ...vacancyForm, location: e.target.value })}
                    placeholder="Addis Ababa (On-site) / Hybrid"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Application Deadline</label>
                  <input
                    type="text"
                    required
                    value={vacancyForm.deadline}
                    onChange={(e) => setVacancyForm({ ...vacancyForm, deadline: e.target.value })}
                    placeholder="e.g. October 30, 2026"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Experience Required</label>
                <input
                  type="text"
                  required
                  value={vacancyForm.experience}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, experience: e.target.value })}
                  placeholder="e.g. 2+ Years in Audio/Broadcast Production"
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Role Summary & Purpose</label>
                <textarea
                  rows={2}
                  required
                  value={vacancyForm.description}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, description: e.target.value })}
                  placeholder="Summary of responsibilities and mission goals..."
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Key Qualifications (1 per line)</label>
                <textarea
                  rows={3}
                  required
                  value={vacancyForm.requirementsText}
                  onChange={(e) => setVacancyForm({ ...vacancyForm, requirementsText: e.target.value })}
                  placeholder="Enter each requirement on a separate line..."
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#004225]/15">
                <button
                  type="button"
                  onClick={() => setVacancyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#004225]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#FFB000]" />
                  <span>{editingVacancy ? 'Save Changes' : 'Post Position'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CHARITY & COMMUNITY MODAL --- */}
      {charityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <h3 className="text-xl font-black font-serif text-[#004225]">
                {editingCharity ? 'Edit Charity Mission' : 'Create New Charity & Social Outreach'}
              </h3>
              <button onClick={() => setCharityModalOpen(false)} className="p-2 rounded-full hover:bg-[#004225]/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCharity} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Mission Title *</label>
                <input
                  type="text"
                  required
                  value={charityForm.title}
                  onChange={(e) => setCharityForm({ ...charityForm, title: e.target.value })}
                  placeholder="e.g. Remote Monastery Solar Energy & Grain Sustenance"
                  className="w-full p-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none focus:border-[#004225]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Category</label>
                  <select
                    value={charityForm.category}
                    onChange={(e) => setCharityForm({ ...charityForm, category: e.target.value as CharityCategory })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="Monastery Support">Monastery Support</option>
                    <option value="Elderly & Orphan Care">Elderly & Orphan Care</option>
                    <option value="Food & Relief Aid">Food & Relief Aid</option>
                    <option value="Youth & Education">Youth & Education</option>
                    <option value="Medical Caravan">Medical Caravan</option>
                    <option value="Heritage Restoration">Heritage Restoration</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Status</label>
                  <select
                    value={charityForm.status}
                    onChange={(e) => setCharityForm({ ...charityForm, status: e.target.value as CharityProject['status'] })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Beneficiaries</label>
                  <input
                    type="text"
                    required
                    value={charityForm.beneficiaries}
                    onChange={(e) => setCharityForm({ ...charityForm, beneficiaries: e.target.value })}
                    placeholder="e.g. 1,200 Monks & Ascetics"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Location</label>
                  <input
                    type="text"
                    required
                    value={charityForm.location}
                    onChange={(e) => setCharityForm({ ...charityForm, location: e.target.value })}
                    placeholder="e.g. Waldiba, Semien Monasteries"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Target Budget</label>
                  <input
                    type="text"
                    value={charityForm.targetAmount}
                    onChange={(e) => setCharityForm({ ...charityForm, targetAmount: e.target.value })}
                    placeholder="e.g. 3,500,000 ETB"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Raised So Far</label>
                  <input
                    type="text"
                    value={charityForm.raisedAmount}
                    onChange={(e) => setCharityForm({ ...charityForm, raisedAmount: e.target.value })}
                    placeholder="e.g. 2,100,000 ETB"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Image URL</label>
                <input
                  type="url"
                  required
                  value={charityForm.imageUrl}
                  onChange={(e) => setCharityForm({ ...charityForm, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Mission Description & Plan</label>
                <textarea
                  rows={3}
                  required
                  value={charityForm.description}
                  onChange={(e) => setCharityForm({ ...charityForm, description: e.target.value })}
                  placeholder="Detail the compassionate outreach, logistics, and beneficiary details..."
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Impact Highlight / Key Achievement</label>
                <input
                  type="text"
                  value={charityForm.impactHighlight}
                  onChange={(e) => setCharityForm({ ...charityForm, impactHighlight: e.target.value })}
                  placeholder="e.g. Delivered 40 tons of grains and 80 solar kits directly to hermit cells."
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#004225]/15">
                <button
                  type="button"
                  onClick={() => setCharityModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#004225]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#FFB000]" />
                  <span>{editingCharity ? 'Save Changes' : 'Launch Charity Mission'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SOCIAL CHANNELS MODAL --- */}
      {socialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <h3 className="text-xl font-black font-serif text-[#004225]">
                {editingSocial ? 'Edit Social Channel' : 'Add Official Social Channel'}
              </h3>
              <button onClick={() => setSocialModalOpen(false)} className="p-2 rounded-full hover:bg-[#004225]/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSocial} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Channel / Network Name</label>
                  <input
                    type="text"
                    required
                    value={socialForm.name}
                    onChange={(e) => setSocialForm({ ...socialForm, name: e.target.value })}
                    placeholder="e.g. YouTube Official Live"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Platform</label>
                  <select
                    value={socialForm.platform}
                    onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="YouTube">YouTube</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Twitter / X">Twitter / X</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Handle / Username</label>
                  <input
                    type="text"
                    required
                    value={socialForm.handle}
                    onChange={(e) => setSocialForm({ ...socialForm, handle: e.target.value })}
                    placeholder="e.g. @FnoteTsidkMedia"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Subscribers / Followers</label>
                  <input
                    type="text"
                    required
                    value={socialForm.subscribers}
                    onChange={(e) => setSocialForm({ ...socialForm, subscribers: e.target.value })}
                    placeholder="e.g. 350,000+ Members"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Direct URL / Link</label>
                <input
                  type="url"
                  required
                  value={socialForm.link}
                  onChange={(e) => setSocialForm({ ...socialForm, link: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Description</label>
                <textarea
                  rows={2}
                  value={socialForm.description}
                  onChange={(e) => setSocialForm({ ...socialForm, description: e.target.value })}
                  placeholder="Short description of content broadcasted on this channel..."
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#004225]/15">
                <button
                  type="button"
                  onClick={() => setSocialModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#004225]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#FFB000]" />
                  <span>{editingSocial ? 'Save Changes' : 'Add Channel'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SUBSCRIBER PREFERENCES MODAL --- */}
      {subscriberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <div>
                <h3 className="text-xl font-black font-serif text-[#004225]">
                  {editingSubscriber ? 'Edit Subscriber Record' : 'Register New Subscriber'}
                </h3>
                <p className="text-xs text-[#004225]/70">Configure newsletter frequency, language, and spiritual interests.</p>
              </div>
              <button onClick={() => setSubscriberModalOpen(false)} className="p-2 rounded-full hover:bg-[#004225]/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubscriber} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold">Email Address *</label>
                <input
                  type="email"
                  required
                  value={subscriberForm.email}
                  onChange={(e) => setSubscriberForm({ ...subscriberForm, email: e.target.value })}
                  placeholder="believer@orthodox.org"
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none focus:border-[#004225]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Full Name (Optional)</label>
                  <input
                    type="text"
                    value={subscriberForm.name}
                    onChange={(e) => setSubscriberForm({ ...subscriberForm, name: e.target.value })}
                    placeholder="e.g. Deacon Michael"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Status</label>
                  <select
                    value={subscriberForm.status}
                    onChange={(e) => setSubscriberForm({ ...subscriberForm, status: e.target.value as 'active' | 'paused' | 'unsubscribed' })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="active">Active (Receiving emails)</option>
                    <option value="paused">Paused (Temporarily muted)</option>
                    <option value="unsubscribed">Unsubscribed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Digest Frequency</label>
                  <select
                    value={subscriberForm.frequency}
                    onChange={(e) => setSubscriberForm({ ...subscriberForm, frequency: e.target.value as NewsletterFrequency })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="weekly">Weekly Friday Digest</option>
                    <option value="daily">Daily Liturgical Reading</option>
                    <option value="monthly">Monthly Deep Pastoral Letter</option>
                    <option value="special_alerts">Special Feast & Fast Alerts Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Preferred Language</label>
                  <select
                    value={subscriberForm.language}
                    onChange={(e) => setSubscriberForm({ ...subscriberForm, language: e.target.value as Language })}
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="am">Amharic (አማርኛ)</option>
                    <option value="en">English</option>
                    <option value="om">Afaan Oromoo</option>
                    <option value="ti">Tigrigna (ትግርኛ)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold block">Selected Topics of Interest</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'liturgy_feasts', label: 'Liturgical Feasts & Synaxarium' },
                    { id: 'monasteries_charity', label: 'Monasteries & Charity Missions' },
                    { id: 'sermons_patristics', label: 'Patristic Sermons & Chants' },
                    { id: 'peace_dialogue', label: 'Peace & Social Reconciliation' },
                    { id: 'youth_education', label: 'Youth & Sunday School' },
                    { id: 'breaking_news', label: 'Urgent Holy Synod Announcements' },
                  ].map((item) => {
                    const isChecked = subscriberForm.topics.includes(item.id as NewsletterTopic);
                    return (
                      <label
                        key={item.id}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#004225]/10 border-[#004225] font-bold text-[#004225]'
                            : 'bg-[#F5F5DC] border-[#004225]/15 text-[#004225]/75'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSubscriberForm({
                                ...subscriberForm,
                                topics: [...subscriberForm.topics, item.id as NewsletterTopic]
                              });
                            } else {
                              setSubscriberForm({
                                ...subscriberForm,
                                topics: subscriberForm.topics.filter(t => t !== item.id)
                              });
                            }
                          }}
                          className="rounded text-[#004225] focus:ring-0"
                        />
                        <span>{item.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#004225]/15">
                <button
                  type="button"
                  onClick={() => setSubscriberModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#004225]/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] shadow-md flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#FFB000]" />
                  <span>{editingSubscriber ? 'Save Preferences' : 'Save Subscriber'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- COMPOSE NEWSLETTER DISPATCH MODAL --- */}
      {dispatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <div>
                <h3 className="text-xl font-black font-serif text-[#004225]">
                  {editingDispatch ? 'Edit Newsletter Dispatch' : 'Compose & Dispatch Spiritual Bulletin'}
                </h3>
                <p className="text-xs text-[#004225]/70">
                  Target verified subscribers and broadcast pastoral teachings, news, and charity calls.
                </p>
              </div>
              <button onClick={() => setDispatchModalOpen(false)} className="p-2 rounded-full hover:bg-[#004225]/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDispatch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold">Bulletin Edition Title / Code *</label>
                  <input
                    type="text"
                    required
                    value={dispatchForm.edition}
                    onChange={(e) => setDispatchForm({ ...dispatchForm, edition: e.target.value })}
                    placeholder="e.g. Weekly Spiritual Bulletin #95"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs font-serif font-bold focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Editorial Desk Author</label>
                  <input
                    type="text"
                    required
                    value={dispatchForm.author}
                    onChange={(e) => setDispatchForm({ ...dispatchForm, author: e.target.value })}
                    placeholder="Fnote Tsidk Editorial Desk"
                    className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Email Subject Line *</label>
                <input
                  type="text"
                  required
                  value={dispatchForm.subject}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, subject: e.target.value })}
                  placeholder="e.g. Feast of the Holy Cross (Meskel) & Monastic Solar Relief Update"
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs font-bold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Preheader Teaser (Inbox snippet) *</label>
                <input
                  type="text"
                  required
                  value={dispatchForm.preheader}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, preheader: e.target.value })}
                  placeholder="e.g. Read the pastoral homily, live broadcast times, and emergency food aid reports..."
                  className="w-full p-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs focus:outline-none"
                />
              </div>

              {/* Targeting Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#004225]/5 border border-[#004225]/10">
                <div className="space-y-1">
                  <label className="text-xs font-bold">Target Frequency</label>
                  <select
                    value={dispatchForm.targetFrequency}
                    onChange={(e) => setDispatchForm({ ...dispatchForm, targetFrequency: e.target.value as 'all' | NewsletterFrequency })}
                    className="w-full p-2 rounded-lg bg-[#FAF7EE] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="all">All Subscribers (All frequencies)</option>
                    <option value="weekly">Weekly Subscribers Only</option>
                    <option value="daily">Daily Subscribers Only</option>
                    <option value="monthly">Monthly Subscribers Only</option>
                    <option value="special_alerts">Special Alert Subscribers Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Target Language</label>
                  <select
                    value={dispatchForm.targetLanguage}
                    onChange={(e) => setDispatchForm({ ...dispatchForm, targetLanguage: e.target.value as 'all' | Language })}
                    className="w-full p-2 rounded-lg bg-[#FAF7EE] border border-[#004225]/20 text-xs focus:outline-none"
                  >
                    <option value="all">All Languages (Multilingual)</option>
                    <option value="am">Amharic (አማርኛ)</option>
                    <option value="en">English</option>
                    <option value="om">Afaan Oromoo</option>
                    <option value="ti">Tigrigna</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Dispatch Status</label>
                  <select
                    value={dispatchForm.status}
                    onChange={(e) => setDispatchForm({ ...dispatchForm, status: e.target.value as 'sent' | 'draft' | 'scheduled' })}
                    className="w-full p-2 rounded-lg bg-[#FAF7EE] border border-[#004225]/20 text-xs font-bold text-[#004225] focus:outline-none"
                  >
                    <option value="sent">Dispatched (Immediate Broadcast)</option>
                    <option value="draft">Save as Draft</option>
                    <option value="scheduled">Scheduled for Friday Morning</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold">Bulletin Body Content *</label>
                  <span className="text-[11px] text-[#004225]/60">Plain text & spiritual formatting</span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={dispatchForm.content}
                  onChange={(e) => setDispatchForm({ ...dispatchForm, content: e.target.value })}
                  placeholder="Write the newsletter body, liturgy updates, Scripture verse reflections, and charity calls..."
                  className="w-full p-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs font-mono leading-relaxed focus:outline-none focus:border-[#004225]"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#004225]/15">
                <p className="text-xs text-[#004225]/75">
                  Est. Recipients: <strong className="text-[#004225]">{subscribers.length + 4280}</strong> active inboxes
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDispatchModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#004225]/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs shadow-md flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FFCF9D]" />
                    <span>{dispatchForm.status === 'sent' ? 'Send Broadcast Now' : 'Save Dispatch'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- PREVIEW NEWSLETTER DISPATCH MODAL --- */}
      {previewDispatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#004225]" />
                <h3 className="text-lg font-black font-serif text-[#004225]">
                  Inbox Preview &bull; {previewDispatch.edition}
                </h3>
              </div>
              <button onClick={() => setPreviewDispatch(null)} className="p-2 rounded-full hover:bg-[#004225]/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Canvas Preview */}
            <div className="rounded-2xl bg-white border border-[#004225]/15 shadow-sm p-6 sm:p-8 space-y-6 text-gray-900 font-serif">
              {/* Email Header */}
              <div className="border-b border-gray-200 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#004225] flex items-center justify-center text-[#FFB000] font-bold font-serif text-sm">
                      FT
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#004225] font-sans">Fnote Tsidk Media</p>
                      <p className="text-[11px] text-gray-700 font-sans">newsletter@fnotetsidk.org</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-sans font-bold">
                    Official Dispatch
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 pt-2">{previewDispatch.subject}</h2>
                <p className="text-xs text-gray-700 font-sans italic">{previewDispatch.preheader}</p>
              </div>

              {/* Email Body */}
              <div className="text-xs sm:text-sm text-gray-800 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {previewDispatch.content}
              </div>

              {/* Email Footer */}
              <div className="border-t border-gray-200 pt-4 space-y-3 font-sans text-center text-xs text-gray-700">
                <p className="font-bold text-[#004225]">Fnote Tsidk Ethiopian Orthodox Tewahedo Spiritual Media</p>
                <p className="text-[11px] text-gray-700">
                  Addis Ababa, Ethiopia &bull; Reaching the global faithful with truth & charity.
                </p>
                <div className="flex items-center justify-center gap-4 text-[11px] text-[#004225] underline pt-1">
                  <Link href="/newsletter">View in Browser</Link>
                  <Link href="/newsletter">Update Email Preferences</Link>
                  <Link href="/newsletter">Unsubscribe</Link>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewDispatch(null)}
                className="px-5 py-2 rounded-xl bg-[#004225] text-[#F5F5DC] text-xs font-bold hover:bg-[#005e35]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

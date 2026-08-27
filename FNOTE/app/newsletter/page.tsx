'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Sparkles, 
  BookOpen, 
  HandHeart, 
  Layers, 
  Bell, 
  Clock, 
  Eye, 
  FileText, 
  Share2, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck,
  Search,
  Download,
  Filter
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';
import { NewsletterTopic, NewsletterFrequency, Language, NewsletterDispatch } from '@/utils/types';

export default function NewsletterPortalPage() {
  const { language } = useLanguage();
  const { addSubscriber, subscribers, dispatches } = useData();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<NewsletterFrequency>('weekly');
  const [selectedTopics, setSelectedTopics] = useState<NewsletterTopic[]>([
    'liturgy_feasts',
    'monasteries_charity',
    'sermons_patristics'
  ]);
  const [subLanguage, setSubLanguage] = useState<Language>(language);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Reader modal for viewing a past bulletin
  const [activeDispatch, setActiveDispatch] = useState<NewsletterDispatch | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTopic = (topic: NewsletterTopic) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const topicsToSave: NewsletterTopic[] = selectedTopics.length > 0 ? selectedTopics : ['liturgy_feasts', 'monasteries_charity'];
    const res = addSubscriber({
      email: email.trim(),
      name: name.trim() || undefined,
      frequency,
      topics: topicsToSave,
      language: subLanguage,
      status: 'active',
      source: 'dedicated_newsletter'
    });

    setIsSuccess(true);
    setFeedbackMessage(
      res.isNew 
        ? 'Welcome to the Fnote Tsidk community! Your subscription is active.'
        : 'Your email and topic preferences have been successfully updated.'
    );
  };

  const filteredDispatches = dispatches.filter(d => 
    d.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.edition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20 pt-4">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#004225] border border-[#002816] text-[#F5F5DC] p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none p-6">
            <Mail className="w-80 h-80 text-[#FFCF9D]" />
          </div>

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7EE]/15 border border-[#FFCF9D]/30 text-[#FFCF9D] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB000]" />
              <span>Orthodox Spiritual Bulletins & Dispatches</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-[#F5F5DC] tracking-tight">
              Fnote Tsidk Weekly Spiritual Bulletin
            </h1>

            <p className="text-sm sm:text-base text-[#F5F5DC]/85 leading-relaxed">
              Curated by certified Ethiopian Orthodox Tewahedo Church theological scholars, choir directors, and field journalists. Published weekly in Amharic, English, Tigrinya, and Afaan Oromoo.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#FFCF9D]">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#FFB000]" />
                <strong className="text-[#F5F5DC]">{subscribers.length + 4280}+</strong> Active Subscribers
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#FFB000]" />
                Published Every <strong className="text-[#F5F5DC]">Friday 07:00 AM EAT</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFB000]" />
                100% Free &bull; Ad-free &bull; Verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Subscription Interface */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/20 p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Col: Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#004225] font-serif">
                  Join the Spiritual Media Newsletter
                </h2>
                <p className="text-xs sm:text-sm text-[#004225]/75 mt-1">
                  Tailor your subscription topics and receive edifying content directly in your inbox.
                </p>
              </div>

              {isSuccess ? (
                <div className="p-6 rounded-2xl bg-[#004225] text-[#F5F5DC] space-y-4 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-[#FFB000] shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-[#F5F5DC]">Subscription Confirmed!</h3>
                      <p className="text-xs text-[#FFCF9D]">{feedbackMessage}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#F5F5DC]/80">
                    We will send our Friday spiritual bulletin and important feast day notifications to <strong className="text-[#FFB000]">{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setEmail('');
                      setName('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FAF7EE] text-[#004225] font-bold text-xs hover:bg-[#F5F5DC] transition-colors"
                  >
                    Subscribe Another Email Address
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#004225]">Full Name (Optional)</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Martha Haile"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/45 focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#004225]">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/45 focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>

                  {/* Delivery Frequency */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#004225]">Delivery Frequency</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'weekly', title: 'Weekly Bulletin', sub: 'Every Friday' },
                        { id: 'daily', title: 'Daily Verses', sub: 'Morning Readings' },
                        { id: 'monthly', title: 'Monthly Journal', sub: 'Monastic Focus' },
                        { id: 'special_alerts', title: 'Special Alerts', sub: 'Feasts & Relief' },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFrequency(f.id as NewsletterFrequency)}
                          className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                            frequency === f.id
                              ? 'bg-[#004225] text-[#F5F5DC] border-[#004225] shadow-sm'
                              : 'bg-[#F5F5DC] text-[#004225] border-[#004225]/20 hover:bg-[#FAF7EE]'
                          }`}
                        >
                          <span className="font-bold block">{f.title}</span>
                          <span className={`text-[10px] ${frequency === f.id ? 'text-[#FFCF9D]' : 'text-[#004225]/65'}`}>
                            {f.sub}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#004225]">Topic Preferences (Multi-Select)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'liturgy_feasts', title: 'Liturgical Feasts & Fasting Calendars', icon: Sparkles },
                        { id: 'monasteries_charity', title: 'Monasteries & Humanitarian Relief', icon: HandHeart },
                        { id: 'sermons_patristics', title: 'Patristic Sermons & St. Yared Chants', icon: BookOpen },
                        { id: 'peace_dialogue', title: 'Peace & Inter-Faith Reconciliation', icon: Users },
                        { id: 'youth_education', title: 'Sunday School & Youth Literacy', icon: Layers },
                        { id: 'breaking_news', title: 'Breaking Orthodox News & Patriarchal Messages', icon: Bell },
                      ].map((item) => {
                        const isSelected = selectedTopics.includes(item.id as NewsletterTopic);
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleTopic(item.id as NewsletterTopic)}
                            className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                              isSelected
                                ? 'bg-[#004225]/10 border-[#004225] font-bold text-[#004225]'
                                : 'bg-[#F5F5DC] border-[#004225]/15 text-[#004225]/75 hover:bg-[#FAF7EE]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#004225]' : 'text-[#004225]/60'}`} />
                              <span>{item.title}</span>
                            </div>
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isSelected ? 'bg-[#004225] border-[#004225] text-[#F5F5DC]' : 'border-[#004225]/30'
                            }`}>
                              {isSelected && <CheckCircle2 className="w-3 h-3 text-[#FFCF9D]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Language and Submit */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#004225]">Language:</span>
                      <select
                        value={subLanguage}
                        onChange={(e) => setSubLanguage(e.target.value as Language)}
                        aria-label="Newsletter Language Preference"
                        className="px-3 py-1.5 rounded-lg bg-[#F5F5DC] border border-[#004225]/20 text-xs font-semibold text-[#004225] focus:outline-none"
                      >
                        <option value="am">አማርኛ (Amharic)</option>
                        <option value="en">English</option>
                        <option value="ti">ትግርኛ (Tigrinya)</option>
                        <option value="or">Afaan Oromoo</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4 text-[#FFCF9D]" />
                      <span>Confirm Free Subscription</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Col: Bulletin Highlights & Why Subscribe */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-[#004225] text-[#F5F5DC] p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#FFB000]">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="text-base font-bold text-[#F5F5DC]">What’s Inside Every Edition</h3>
                </div>

                <ul className="space-y-3 text-xs text-[#F5F5DC]/85">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] mt-1.5 shrink-0" />
                    <span><strong>Gospel Reflections:</strong> Patristic commentaries and teachings on the weekly Synaxarium (*Senkessar*).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] mt-1.5 shrink-0" />
                    <span><strong>Monastery Relief Dispatches:</strong> Verified updates on food delivery, solar kits, and hermit care in rural Ethiopian sanctuaries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] mt-1.5 shrink-0" />
                    <span><strong>Sacred Chants & Hymnology:</strong> Deep dives into St. Yared’s Ge'ez notation, *Degua*, and *Ziq* compositions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] mt-1.5 shrink-0" />
                    <span><strong>Live Broadcast Guides:</strong> Streaming frequencies, satellite transponders, and YouTube Live alerts.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15 space-y-2">
                <div className="flex items-center gap-2 text-[#004225] font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#004225]" />
                  <span>Privacy & Freedom Guarantee</span>
                </div>
                <p className="text-[11px] text-[#004225]/75 leading-relaxed">
                  We respect your sacred time and privacy. Your email address is never shared, sold, or used for commercial advertisements. Unsubscribe anytime with one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Published Bulletins Archive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#004225]/20 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#004225]">
              <FileText className="w-4 h-4 text-[#FFB000]" />
              <span>Dispatched Editions</span>
            </div>
            <h2 className="text-2xl font-black text-[#004225] font-serif mt-0.5">
              Spiritual Bulletin Public Archive
            </h2>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#004225]/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search past bulletins..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF7EE] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
            />
          </div>
        </div>

        {/* Dispatches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDispatches.map((dispatch) => (
            <div
              key={dispatch.id}
              className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-6 space-y-4 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#004225] text-[#FFCF9D] font-bold text-[10px]">
                    {dispatch.edition}
                  </span>
                  <span className="text-[#004225]/60 text-[11px]">
                    {dispatch.sentAt ? new Date(dispatch.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently Dispatched'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#004225] font-serif leading-snug">
                  {dispatch.subject}
                </h3>

                <p className="text-xs text-[#004225]/80 line-clamp-3 leading-relaxed">
                  {dispatch.preheader}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dispatch.targetTopics.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#F5F5DC] border border-[#004225]/10 text-[10px] font-semibold text-[#004225]"
                    >
                      #{t.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#004225]/10 flex items-center justify-between">
                <div className="text-[11px] text-[#004225]/70">
                  <span>Author: {dispatch.author}</span>
                </div>

                <button
                  onClick={() => setActiveDispatch(dispatch)}
                  className="px-4 py-2 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FFB000]" />
                  <span>Read Bulletin</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bulletin Reader Modal */}
      {activeDispatch && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7EE] text-[#004225] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#004225]/30 max-h-[90vh] overflow-y-auto animate-scaleUp">
            <div className="sticky top-0 bg-[#004225] text-[#F5F5DC] p-6 rounded-t-3xl flex items-center justify-between z-10">
              <div>
                <span className="text-xs font-bold text-[#FFCF9D] uppercase tracking-wider">
                  {activeDispatch.edition}
                </span>
                <h3 className="text-lg font-bold font-serif text-[#F5F5DC] mt-0.5 line-clamp-1">
                  {activeDispatch.subject}
                </h3>
              </div>
              <button
                onClick={() => setActiveDispatch(null)}
                className="w-8 h-8 rounded-full bg-[#FAF7EE]/15 hover:bg-[#FAF7EE]/30 text-[#F5F5DC] flex items-center justify-center transition-colors shrink-0"
              >
                &times;
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15 space-y-1">
                <p className="text-xs font-bold text-[#004225]">Editorial Summary:</p>
                <p className="text-xs text-[#004225]/85 italic">{activeDispatch.preheader}</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#004225]/90 whitespace-pre-line leading-relaxed font-sans">
                {activeDispatch.content}
              </div>

              <div className="pt-6 border-t border-[#004225]/15 flex flex-wrap items-center justify-between gap-4 text-xs text-[#004225]/75">
                <div>
                  <p><strong>Editorial Desk:</strong> {activeDispatch.author}</p>
                  <p><strong>Recipients:</strong> {activeDispatch.recipientsCount.toLocaleString()} Readers</p>
                </div>

                <button
                  onClick={() => setActiveDispatch(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs transition-colors"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

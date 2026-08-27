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
  Bell, 
  Sparkles, 
  BookOpen, 
  HeartHandshake, 
  HandHeart, 
  ShieldCheck, 
  Layers, 
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';
import { NewsletterTopic, NewsletterFrequency, Language } from '@/utils/types';

interface TopicOption {
  id: NewsletterTopic;
  titleEn: string;
  titleAm: string;
  icon: React.ElementType;
}

const TOPIC_OPTIONS: TopicOption[] = [
  {
    id: 'liturgy_feasts',
    titleEn: 'Liturgical Feasts & Fasting Calendars',
    titleAm: 'የበዓላትና የአጽዋማት መቁጠሪያ',
    icon: Sparkles
  },
  {
    id: 'monasteries_charity',
    titleEn: 'Monasteries & Humanitarian Relief',
    titleAm: 'የገዳማት ድጋፍና የበጎ አድራጎት ዜና',
    icon: HandHeart
  },
  {
    id: 'sermons_patristics',
    titleEn: 'Patristic Sermons & St. Yared Chants',
    titleAm: 'የአበው ስብከቶችና የቅዱስ ያሬድ ዜማዎች',
    icon: BookOpen
  },
  {
    id: 'peace_dialogue',
    titleEn: 'Peace & Community Reconciliation',
    titleAm: 'የሰላምና የእርቅ ውይይቶች',
    icon: HeartHandshake
  },
  {
    id: 'youth_education',
    titleEn: 'Sunday School & Youth Literacy',
    titleAm: 'የሰንበት ት/ቤትና የወጣቶች ትምህርት',
    icon: Layers
  },
  {
    id: 'breaking_news',
    titleEn: 'Breaking Church & National News',
    titleAm: 'አስቸኳይ የቤተክርስቲያን ዜናዎች',
    icon: Bell
  }
];

export const NewsletterSection: React.FC = () => {
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
      source: 'portal_home'
    });

    setIsSuccess(true);
    setFeedbackMessage(
      res.isNew 
        ? 'Congratulations! You have joined the Fnote Tsidk Spiritual Media Bulletin.'
        : 'Welcome back! Your preferences and email have been successfully updated.'
    );
  };

  const latestDispatch = dispatches && dispatches.length > 0 ? dispatches[0] : null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="portal-newsletter-section">
      <div className="rounded-3xl bg-gradient-to-br from-[#004225] via-[#00331D] to-[#002213] text-[#F5F5DC] p-6 sm:p-10 lg:p-12 shadow-xl border border-[#002816] relative overflow-hidden">
        {/* Background decorative watermark */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
          <BookOpen className="w-96 h-96 text-[#FFCF9D]" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading & Bulletin Overview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFCF9D]/15 border border-[#FFCF9D]/30 text-[#FFCF9D] text-xs font-bold">
              <Mail className="w-3.5 h-3.5 text-[#FFB000]" />
              <span>Official Weekly Spiritual Digest</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F5F5DC] font-serif leading-tight">
                {language === 'am' 
                  ? 'የፍኖተ ጽድቅ ሳምንታዊ መንፈሳዊ መጽሔት በኢሜይልዎ'
                  : 'Fnote Tsidk Spiritual Media Bulletin Delivered to Your Inbox'}
              </h2>
              <p className="text-xs sm:text-sm text-[#F5F5DC]/80 leading-relaxed">
                {language === 'am'
                  ? 'የአበው ስብከቶች፣ የበዓላትና የአጽዋማት ማብራሪያዎች፣ የገዳማት ወቅታዊ ዜና እና የቀጥታ ስርጭት መርሃ ግብሮች በየሳምንቱ አርብ ጠዋት ይደርስዎታል።'
                  : 'Receive verified Orthodox theological reflections, Ge\'ez hymn analyses, monastery relief alerts, and live transmission schedules every Friday morning.'}
              </p>
            </div>

            {/* Subscriber stats & Trust indicators */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-[#002816]/70 border border-[#004225] text-left">
                <span className="block text-2xl font-black text-[#FFB000]">{subscribers.length + 4280}+</span>
                <span className="text-[11px] text-[#FFCF9D]/90 font-medium">Faithful Readers Worldwide</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#002816]/70 border border-[#004225] text-left">
                <span className="block text-2xl font-black text-[#FFB000]">100% Free</span>
                <span className="text-[11px] text-[#FFCF9D]/90 font-medium">No Ads &bull; 1-Click Unsubscribe</span>
              </div>
            </div>

            {/* Recent Bulletin Snippet Card */}
            {latestDispatch && (
              <div className="rounded-2xl bg-[#002816]/90 border border-[#FFCF9D]/20 p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#FFCF9D]">
                  <span className="font-bold uppercase tracking-wider">{latestDispatch.edition}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FFB000]" />
                    <span>Recent Issue</span>
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#F5F5DC] line-clamp-1">
                  {latestDispatch.subject}
                </h4>
                <p className="text-[11px] text-[#F5F5DC]/70 line-clamp-2">
                  {latestDispatch.preheader}
                </p>
                <div className="pt-1">
                  <Link
                    href="/newsletter"
                    className="text-[11px] font-bold text-[#FFB000] hover:text-[#FFCF9D] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Browse Bulletin Archive</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Subscription Form */}
          <div className="lg:col-span-7 bg-[#FAF7EE] text-[#004225] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#FAF7EE]/50">
            {isSuccess ? (
              <div className="py-8 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#004225] text-[#FFB000] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-2xl font-black text-[#004225]">
                    {language === 'am' ? 'ምዝገባዎ በተሳካ ሁኔታ ተጠናቋል!' : 'Subscription Confirmed!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#004225]/80">
                    {feedbackMessage}
                  </p>
                  <p className="text-xs text-[#004225]/60">
                    Sent to: <span className="font-bold text-[#004225]">{email}</span>
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setEmail('');
                      setName('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] transition-colors"
                  >
                    Manage / Subscribe Another Email
                  </button>
                  <Link
                    href="/newsletter"
                    className="px-5 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#004225]/30 text-[#004225] font-bold text-xs hover:bg-[#F5F5DC] transition-colors"
                  >
                    View Dispatched Bulletins
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#004225] tracking-tight">
                    {language === 'am' ? 'የግል መረጃና ምርጫዎችዎን ያስገቡ' : 'Customize Your Spiritual Feed'}
                  </h3>
                  <p className="text-xs text-[#004225]/70 mt-0.5">
                    Select your preferred topics and email delivery schedule.
                  </p>
                </div>

                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225] block">
                      Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dn. Yohannes Tesfaye"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/45 focus:outline-none focus:border-[#004225]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225] block">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/45 focus:outline-none focus:border-[#004225]"
                    />
                  </div>
                </div>

                {/* Delivery Frequency Tabs */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#004225] block">
                    Preferred Frequency
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'weekly', label: 'Weekly (Fridays)', badge: 'Recommended' },
                      { id: 'daily', label: 'Daily (Readings)', badge: 'Daily' },
                      { id: 'monthly', label: 'Monthly Digest', badge: 'Summary' },
                      { id: 'special_alerts', label: 'Alerts Only', badge: 'Breaking' },
                    ].map((freq) => (
                      <button
                        key={freq.id}
                        type="button"
                        onClick={() => setFrequency(freq.id as NewsletterFrequency)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                          frequency === freq.id
                            ? 'bg-[#004225] text-[#F5F5DC] border-[#004225] shadow-sm'
                            : 'bg-[#F5F5DC] text-[#004225] border-[#004225]/20 hover:bg-[#FAF7EE]'
                        }`}
                      >
                        <span>{freq.label}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                          frequency === freq.id ? 'bg-[#FFCF9D] text-[#004225]' : 'bg-[#004225]/10 text-[#004225]/80'
                        }`}>
                          {freq.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topics Selection Grid */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#004225] block">
                      Select Topics of Interest
                    </label>
                    <span className="text-[11px] text-[#004225]/60 font-medium">
                      {selectedTopics.length} selected
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TOPIC_OPTIONS.map((topic) => {
                      const isSelected = selectedTopics.includes(topic.id);
                      const Icon = topic.icon;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => toggleTopic(topic.id)}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs ${
                            isSelected
                              ? 'bg-[#004225]/10 border-[#004225] text-[#004225] font-bold'
                              : 'bg-[#F5F5DC] border-[#004225]/15 text-[#004225]/75 hover:bg-[#FAF7EE]'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#004225] text-[#FFCF9D]' : 'bg-[#004225]/15 text-[#004225]'
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate leading-tight">
                              {language === 'am' ? topic.titleAm : topic.titleEn}
                            </p>
                          </div>
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#004225] border-[#004225] text-[#F5F5DC]' : 'border-[#004225]/30'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3 h-3 text-[#FFCF9D]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Language Preference & Submit */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-bold text-[#004225]">Language:</span>
                    <select
                      value={subLanguage}
                      onChange={(e) => setSubLanguage(e.target.value as Language)}
                      aria-label="Newsletter Language Preference"
                      className="px-3 py-1.5 rounded-lg bg-[#F5F5DC] border border-[#004225]/20 text-xs font-semibold text-[#004225] focus:outline-none focus:border-[#004225]"
                    >
                      <option value="am">አማርኛ (Amharic)</option>
                      <option value="en">English</option>
                      <option value="ti">ትግርኛ (Tigrinya)</option>
                      <option value="or">Afaan Oromoo</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shrink-0"
                  >
                    <Send className="w-4 h-4 text-[#FFCF9D]" />
                    <span>Join Free Newsletter</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

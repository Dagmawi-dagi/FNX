'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Radio, 
  Play, 
  Pause, 
  Volume2, 
  Headphones, 
  Bell, 
  CheckCircle, 
  Heart, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  ExternalLink,
  MailCheck
} from 'lucide-react';
import { PODCAST_EPISODES, ANNOUNCEMENTS, PEACE_STORIES } from '@/utils/constants';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';

export const Sidebar: React.FC = () => {
  const { language, t } = useLanguage();
  const { addSubscriber, subscribers } = useData();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activePodcast, setActivePodcast] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subMessage, setSubMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      const res = addSubscriber({
        email: emailInput.trim(),
        name: nameInput.trim() || undefined,
        frequency: 'weekly',
        topics: ['liturgy_feasts', 'monasteries_charity', 'breaking_news'],
        language: language,
        status: 'active',
        source: 'sidebar'
      });
      setSubscribed(true);
      setSubMessage(res.isNew 
        ? 'Thank you! You are now subscribed to the weekly spiritual bulletin.' 
        : 'Welcome back! Your subscription preferences have been updated.');
      setEmailInput('');
      setNameInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <aside className="space-y-8">
      {/* 1. Live Radio & Liturgical Stream Card (Forest Green Accent) */}
      <div className="overflow-hidden rounded-3xl bg-[#004225] border border-[#002816] p-6 shadow-md relative text-[#F5F5DC]">
        <div className="flex items-center justify-between pb-4 border-b border-[#002816]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#002816] flex items-center justify-center text-[#FFB000]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F5F5DC] tracking-wide font-serif">FNOTE TSIDK 24/7 AUDIO</h3>
              <p className="text-[11px] text-[#FFCF9D] font-medium">Sacred Chants & Ge'ez Hymns</p>
            </div>
          </div>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB000] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFB000]"></span>
          </span>
        </div>

        {/* Player controls */}
        <div className="py-5 flex items-center gap-4">
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="w-14 h-14 rounded-2xl bg-[#FAF7EE] hover:bg-[#FFCF9D] text-[#004225] flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0"
            aria-label={isPlayingAudio ? 'Pause stream' : 'Play stream'}
          >
            {isPlayingAudio ? (
              <Pause className="w-6 h-6 fill-current text-[#004225]" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1 text-[#004225]" />
            )}
          </button>

          <div className="flex-1 space-y-1.5 overflow-hidden">
            <div className="text-xs font-bold text-[#F5F5DC] truncate">
              {isPlayingAudio ? "Now Streaming: St. Yared Liturgical Choir" : "Click to stream live sanctuary audio"}
            </div>
            {/* Equalizer animation */}
            <div className="flex items-end gap-1 h-5">
              {[40, 70, 90, 60, 100, 50, 80, 45, 95, 30].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-[#FFB000] transition-all duration-300 ${
                    isPlayingAudio ? 'animate-bounce' : 'opacity-30'
                  }`}
                  style={{
                    height: isPlayingAudio ? `${h}%` : '20%',
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#002816] flex items-center justify-between text-[11px] text-[#FFCF9D]">
          <span>Bitrate: 320 kbps (Lossless)</span>
          <span className="text-[#F5F5DC] font-bold">1,240 Online</span>
        </div>
      </div>

      {/* 2. Official Announcements & Synod Bulletins (Warm Cream Card) */}
      <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#004225]" />
            <h3 className="font-bold text-[#004225] text-base tracking-wide">{t.ui.announcements}</h3>
          </div>
          <span className="text-[11px] text-[#004225]/70 font-medium">Official Dispatch</span>
        </div>

        <div className="space-y-3">
          {ANNOUNCEMENTS.map((ann) => (
            <div
              key={ann.id}
              className="p-3.5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15 hover:border-[#004225]/40 transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-[#FFCF9D]/40 text-[#004225] font-bold">
                  {ann.tag}
                </span>
                <span className="text-[#004225]/60">{ann.date}</span>
              </div>
              <h4 className="text-xs font-bold text-[#004225] group-hover:text-[#005e35] transition-colors leading-snug">
                {ann.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Featured Podcasts */}
      <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[#004225]" />
            <h3 className="font-bold text-[#004225] text-base tracking-wide">Sacred Echoes Podcast</h3>
          </div>
          <span className="text-xs text-[#004225] font-bold">Weekly</span>
        </div>

        <div className="space-y-3">
          {PODCAST_EPISODES.map((ep) => (
            <div
              key={ep.id}
              onClick={() => setActivePodcast(activePodcast === ep.id ? null : ep.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                activePodcast === ep.id
                  ? 'bg-[#FFCF9D]/30 border-[#004225]/40'
                  : 'bg-[#F5F5DC] border-[#004225]/15 hover:border-[#004225]/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-[#004225] leading-snug">{ep.title}</h4>
                  <p className="text-[11px] text-[#004225]/70 mt-1">
                    By {ep.speaker} • <span className="text-[#004225] font-semibold">{ep.duration}</span>
                  </p>
                </div>
                <button 
                  className={`p-2 rounded-xl shrink-0 transition-colors ${
                    activePodcast === ep.id 
                      ? 'bg-[#004225] text-[#F5F5DC]' 
                      : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/20 hover:bg-[#FFCF9D]'
                  }`}
                  aria-label="Play podcast"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Peace & Dialogue Forum */}
      <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-6 space-y-4 shadow-md">
        <div className="flex items-center gap-2 text-[#004225]">
          <Sparkles className="w-4 h-4 text-[#FFB000]" />
          <h3 className="font-bold text-[#004225] text-base">{t.ui.peaceDialogue}</h3>
        </div>
        <p className="text-xs text-[#004225]/80 leading-relaxed">
          Supporting the Inter-Religious Council of Ethiopia and youth-led peaceful coexistence dialogues across all 12 regional states.
        </p>
        <div className="p-3 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15 text-xs text-[#004225] font-semibold flex items-center justify-between">
          <span>Active Peace Forums</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#004225] text-[#F5F5DC] font-bold">120+ Forums</span>
        </div>
      </div>

      {/* 5. Newsletter & Weekly Spiritual Digest */}
      <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FFB000]">Spiritual Media Bulletin</span>
            <h3 className="font-bold text-[#004225] text-base font-serif">Weekly Digest & Hymns</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#004225]/10 text-[#004225] text-[10px] font-bold">
            {subscribers.length + 4280}+ Subscribed
          </span>
        </div>
        <p className="text-xs text-[#004225]/75 leading-relaxed">
          Receive theological reflections, feast day announcements, monastery relief updates, and weekly choir schedules every Friday.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-[#004225] text-xs text-[#F5F5DC] flex items-start gap-2.5 animate-fadeIn">
            <CheckCircle className="w-5 h-5 shrink-0 text-[#FFB000] mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">{subMessage}</p>
              <p className="text-[11px] text-[#FFCF9D]">You will receive the next bulletin on Friday at 07:00 AM (EAT).</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2.5">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your full name (optional)"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
            />
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95 shadow-sm"
            >
              <Send className="w-3.5 h-3.5 text-[#FFCF9D]" />
              <span>Subscribe to Weekly Bulletin</span>
            </button>
            <div className="text-center pt-1">
              <Link 
                href="/newsletter" 
                className="text-[11px] font-bold text-[#004225] hover:underline inline-flex items-center gap-1"
              >
                <span>Customize topics or read past issues</span>
                <ExternalLink className="w-3 h-3 text-[#FFB000]" />
              </Link>
            </div>
          </form>
        )}
      </div>
    </aside>
  );
};

'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Tv, 
  Radio, 
  Bell, 
  CheckCircle, 
  Sparkles, 
  Share2, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';

export default function EventsPage() {
  const { language } = useLanguage();
  const { events } = useData();
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'pilgrimage'>('all');

  const toggleReminder = (id: string) => {
    setReminders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredEvents = events.filter(ev => {
    if (activeTab === 'live') return ev.isLiveBroadcast;
    if (activeTab === 'pilgrimage') return ev.location.includes('Lalibela') || ev.location.includes('Axum') || ev.location.includes('Gondar') || ev.location.includes('Kulubi');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#004225] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004225] text-[#FFCF9D] text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-[#FFB000]" />
            <span>Liturgical Calendar & Live Feasts</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif text-[#004225]">
            Upcoming Sacred Events & Pilgrimages
          </h1>
          <p className="text-sm sm:text-base text-[#004225]/80 leading-relaxed">
            Stay informed with official Ethiopian Church liturgical feast days, international pilgrimages, youth conferences, and live satellite broadcasts.
          </p>
        </div>

        {/* Navigation / Filter Tabs */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/20 hover:bg-[#FFCF9D]/30'
            }`}
          >
            All Scheduled Events
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'live'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/20 hover:bg-[#FFCF9D]/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FFB000] animate-ping" />
            <span>Live Satellite Feeds</span>
          </button>
          <button
            onClick={() => setActiveTab('pilgrimage')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pilgrimage'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/20 hover:bg-[#FFCF9D]/30'
            }`}
          >
            Historic Pilgrimages
          </button>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => {
            const hasReminder = reminders[event.id];
            return (
              <div
                key={event.id}
                className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 overflow-hidden shadow-md hover:shadow-xl hover:border-[#004225]/40 transition-all flex flex-col justify-between"
              >
                <div className="p-7 space-y-5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#004225] text-[#FFCF9D] text-[11px] font-bold shadow-sm">
                      {event.category}
                    </span>
                    {event.isLiveBroadcast && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004225] text-[#F5F5DC] text-[11px] font-bold border border-[#FFB000]/40">
                        <Tv className="w-3 h-3 text-[#FFB000]" />
                        <span>Live Broadcast</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#004225] font-serif leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#004225]/80 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Meta Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-[#004225] p-3 rounded-2xl bg-[#F5F5DC] border border-[#004225]/10">
                      <Calendar className="w-4 h-4 text-[#004225] shrink-0" />
                      <div>
                        <span className="block font-bold">{event.date}</span>
                        <span className="text-[10px] text-[#004225]/70">{event.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#004225] p-3 rounded-2xl bg-[#F5F5DC] border border-[#004225]/10">
                      <MapPin className="w-4 h-4 text-[#004225] shrink-0" />
                      <div>
                        <span className="block font-bold">{event.location}</span>
                        <span className="text-[10px] text-[#004225]/70">Central Sanctuary</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-[#F5F5DC] border-t border-[#004225]/15 flex items-center justify-between gap-4">
                  <button
                    onClick={() => toggleReminder(event.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      hasReminder
                        ? 'bg-[#004225] text-[#F5F5DC]'
                        : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/20 hover:bg-[#FFCF9D]'
                    }`}
                  >
                    {hasReminder ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-[#FFB000]" />
                        <span>Reminder Set</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3.5 h-3.5 text-[#004225]" />
                        <span>Set Reminder</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/contact"
                    className="text-xs font-bold text-[#004225] hover:underline flex items-center gap-1"
                  >
                    <span>Inquire / Attend</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Broadcast Notice */}
        <div className="rounded-3xl bg-[#004225] text-[#F5F5DC] p-8 sm:p-10 shadow-xl border border-[#002816] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FFCF9D] text-xs font-black uppercase tracking-wider">
              <Tv className="w-4 h-4 text-[#FFB000]" />
              <span>Broadcast Notice</span>
            </div>
            <h3 className="text-2xl font-bold text-[#F5F5DC] font-serif">
              Want to host a live broadcast for your parish or spiritual event?
            </h3>
            <p className="text-xs sm:text-sm text-[#FFCF9D] max-w-xl">
              Fnote Tsidk's mobile outside broadcast (OB) units travel across all regions of Ethiopia for feast day recordings, cathedral inaugurations, and conference coverage.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-2xl bg-[#FFCF9D] hover:bg-[#FFB000] text-[#004225] font-bold text-xs shrink-0 transition-all shadow-md active:scale-95"
          >
            Request OB Broadcast Unit
          </Link>
        </div>

      </div>
    </div>
  );
}

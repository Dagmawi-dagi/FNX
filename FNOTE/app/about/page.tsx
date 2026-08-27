'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  Radio, 
  Tv, 
  Users, 
  BookOpen, 
  MapPin, 
  Award, 
  HeartHandshake,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { LOCATION_INFO } from '@/utils/constants';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#004225] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-[#004225] text-[#F5F5DC] p-8 sm:p-14 overflow-hidden shadow-2xl border border-[#002816]">
          {/* Subtle Background Decoration */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#FFCF9D]/10 blur-3xl pointer-events-none" />
          <div className="absolute right-10 bottom-0 opacity-10 hidden md:block">
            <Sparkles className="w-80 h-80 text-[#FFB000]" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002816] text-[#FFCF9D] border border-[#FFCF9D]/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#FFB000]" />
              <span>{language === 'am' ? 'ስለ ፍኖተ ጽድቅ' : 'About Fnote Tsidk'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-serif text-[#F5F5DC]">
              {language === 'am' 
                ? 'ፍኖተ ጽድቅ መንፈሳዊ ሚዲያ — የእውነት እና የሰላም መንገድ' 
                : 'Fnote Tsidk Spiritual Media — The Path of Truth & Heritage'}
            </h1>

            <p className="text-sm sm:text-base text-[#FFCF9D] leading-relaxed">
              Founded in Addis Ababa, Fnote Tsidk (ፍኖተ ጽድቅ — "The Path of Righteousness") is Ethiopia's dedicated independent spiritual media platform. We preserve centuries of Ethiopian Christian liturgical hymnology, Ge'ez scholarship, and champion inter-religious harmony across the nation and diaspora.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-2xl bg-[#FFCF9D] hover:bg-[#FFB000] text-[#004225] font-bold text-sm transition-all shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Connect With Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/events"
                className="px-6 py-3 rounded-2xl bg-[#002816] hover:bg-[#001c10] border border-[#FFCF9D]/40 text-[#F5F5DC] font-bold text-sm transition-all"
              >
                View Broadcast Events
              </Link>
            </div>
          </div>
        </div>

        {/* Pillars / Core Missions */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-[#004225] uppercase tracking-widest">Our Guiding Pillars</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#004225] tracking-tight font-serif">
              Sacred Heritage, Truthful Broadcasting
            </h2>
            <p className="text-xs sm:text-sm text-[#004225]/80">
              Serving the faithful with spiritual nourishment, historic preservation, and cross-cultural unity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 shadow-sm space-y-4 hover:border-[#004225]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#004225] text-[#FFB000] flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#004225] font-serif">Ge'ez & Theological Scholarship</h3>
              <p className="text-xs text-[#004225]/80 leading-relaxed">
                Digitizing and broadcasting ancient liturgical texts, St. Yared musical notations, and scholarly homilies translated into modern Amharic, Tigrinya, and Afaan Oromoo.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 shadow-sm space-y-4 hover:border-[#004225]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#004225] text-[#FFB000] flex items-center justify-center shadow-md">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#004225] font-serif">Inter-Religious Peace & Dialogue</h3>
              <p className="text-xs text-[#004225]/80 leading-relaxed">
                Working closely with religious leaders and civil society to cultivate peaceful coexistence, mutual respect, and community healing throughout Ethiopia.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 shadow-sm space-y-4 hover:border-[#004225]/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#004225] text-[#FFB000] flex items-center justify-center shadow-md">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#004225] font-serif">24/7 Global Satellite & Digital Reach</h3>
              <p className="text-xs text-[#004225]/80 leading-relaxed">
                Reaching millions of households worldwide with uninterrupted high-definition live feeds from major sanctuaries in Lalibela, Axum, Gondar, and Addis Ababa.
              </p>
            </div>
          </div>
        </div>

        {/* Studio & Advisory Board Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/20 p-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-black text-[#004225] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-[#004225]" />
              <span>Editorial Integrity</span>
            </div>
            <h3 className="text-2xl font-bold text-[#004225] font-serif">
              Guided by Clergy, Scholars & Ethical Journalists
            </h3>
            <p className="text-xs sm:text-sm text-[#004225]/85 leading-relaxed">
              Every broadcast, text commentary, and historical documentary is reviewed by our Advisory Council of Senior Theologians, Church Historians, and accredited media professionals to guarantee accuracy, reverence, and spiritual depth.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15">
                <span className="block text-2xl font-black text-[#004225]">24/7</span>
                <span className="text-xs font-medium text-[#004225]/80">Uninterrupted Global Stream</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15">
                <span className="block text-2xl font-black text-[#004225]">4</span>
                <span className="text-xs font-medium text-[#004225]/80">Broadcast Languages</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#004225] text-[#F5F5DC] p-8 space-y-6 shadow-xl border border-[#002816]">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#FFCF9D]/40 bg-[#FAF7EE] shrink-0">
                <Image
                  src="/logo.png"
                  alt="Fnote Tsidk Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#F5F5DC] font-serif">Fnote Tsidk Central Studios</h4>
                <p className="text-xs text-[#FFCF9D]">Addis Ababa, Ethiopia</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#FFCF9D] leading-relaxed">
              Our central broadcast facilities in Kazanchis house 4 digital recording studios, an archive digitization lab for ancient manuscripts, and our multi-lingual editorial team.
            </p>
            <div className="space-y-3 pt-2 text-xs text-[#F5F5DC]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FFB000] shrink-0" />
                <span>{LOCATION_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#FFB000] shrink-0" />
                <span>{LOCATION_INFO.phone}</span>
              </div>
            </div>
            <Link
              href="/vacancy"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF7EE] hover:bg-[#FFCF9D] text-[#004225] font-bold text-xs transition-colors"
            >
              <span>Join Our Team (Open Vacancies)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

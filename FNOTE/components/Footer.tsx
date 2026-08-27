'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Radio, 
  Globe2 
} from 'lucide-react';
import { LOCATION_INFO } from '@/utils/constants';
import { useLanguage } from '@/app/context/LanguageContext';
import { LocationMap } from './LocationMap';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#004225] border-t border-[#002816] text-[#F5F5DC]">
      {/* 1. Location & Interactive Map Section in Footer */}
      <section className="border-b border-[#002816] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#FFCF9D] text-xs font-black uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-[#FFB000]" />
                <span>{t.ui.findUs}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#F5F5DC] tracking-tight font-serif">
                Visit Fnote Tsidk Studios & Central Offices in Addis Ababa
              </h2>
              <p className="text-xs sm:text-sm text-[#FFCF9D] max-w-2xl">
                Located in the heart of Kazanchis near UNECA, welcoming visitors, researchers, clergy, and media partners for broadcast production and heritage preservation.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-[#002816] hover:bg-[#001c10] border border-[#FFCF9D]/30 text-[#F5F5DC] font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
            >
              <span>Full Contact & Inquiry Form</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#FFB000]" />
            </Link>
          </div>

          {/* Interactive Google Map of HQ */}
          <LocationMap showDetails={true} />
        </div>
      </section>

      {/* 2. Main Footer Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#FFCF9D]/40 bg-[#FAF7EE] shadow-md shrink-0">
                <Image
                  src="/logo.png"
                  alt="Fnote Tsidk Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-[#F5F5DC] tracking-tight font-serif">
                  FNOTE <span className="text-[#FFCF9D]">TSIDK</span>
                </span>
                <span className="text-[10px] font-bold text-[#FFCF9D]/80 uppercase tracking-wider">
                  ፍኖተ ጽድቅ • Spiritual Media
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#F5F5DC]/85 leading-relaxed max-w-md">
              Fnote Tsidk (ፍኖተ ጽድቅ) is dedicated to broadcasting sacred Ethiopian Christian liturgical heritage, inter-religious dialogue for peace, theological scholarship, and authentic spiritual dispatches from holy sites across Ethiopia.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#F5F5DC]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002816] border border-[#FFCF9D]/20">
                <Globe2 className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>4 Languages</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002816] border border-[#FFCF9D]/20">
                <Radio className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>24/7 Global Audio</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-[#FFCF9D] uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  {t.nav.home || 'Home'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  {t.nav.about || 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  {t.nav.blog || 'Blog'}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  {t.nav.events || 'Events'}
                </Link>
              </li>
              <li>
                <Link href="/socials" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  {t.nav.socials || 'Socials'}
                </Link>
              </li>
              <li>
                <Link href="/vacancy" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  {t.nav.vacancy || 'Vacancy'}
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="hover:text-[#FFCF9D] text-[#FFCF9D] font-bold transition-colors">
                  Newsletter & Bulletins
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Media & Broadcast */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-[#FFCF9D] uppercase tracking-wider">Broadcast & Feeds</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/socials" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  Community Charity & Relief Work
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  Liturgical Chants Audio
                </Link>
              </li>
              <li>
                <Link href="/socials" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  Fnote Tsidk YouTube Live
                </Link>
              </li>
              <li>
                <Link href="/socials" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  Telegram Audio & Bulletins
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  Feast Day Live Schedules
                </Link>
              </li>
              <li>
                <Link href="/vacancy" className="hover:text-[#FFCF9D] text-[#F5F5DC]/90 transition-colors">
                  Career & Volunteer Openings
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & HQ Direct */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-[#FFCF9D] uppercase tracking-wider">Headquarters</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-[#F5F5DC]">
                <MapPin className="w-3.5 h-3.5 text-[#FFB000] shrink-0 mt-0.5" />
                <span>{LOCATION_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2 text-[#F5F5DC]">
                <Phone className="w-3.5 h-3.5 text-[#FFB000] shrink-0" />
                <span>{LOCATION_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#F5F5DC]">
                <Mail className="w-3.5 h-3.5 text-[#FFB000] shrink-0" />
                <span>{LOCATION_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#F5F5DC]">
                <Clock className="w-3.5 h-3.5 text-[#FFB000] shrink-0" />
                <span>Mon – Sat: 8:00 AM – 6:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-[#002816] bg-[#002816] px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFCF9D]/80">
          <p>© 2026 Fnote Tsidk (ፍኖተ ጽድቅ) Spiritual Media Association. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-[#FFCF9D] font-bold hover:text-[#F5F5DC] transition-colors">Admin Desk</Link>
            <Link href="/contact" className="hover:text-[#F5F5DC] transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[#F5F5DC] transition-colors">Terms of Broadcast</Link>
            <Link href="/contact" className="hover:text-[#F5F5DC] transition-colors">Editorial Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

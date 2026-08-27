'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Sparkles, 
  Tv, 
  Headphones, 
  Image as ImageIcon, 
  ArrowRight, 
  HeartHandshake, 
  MapPin, 
  Calendar, 
  ShieldCheck 
} from 'lucide-react';
import { BreakingNews } from '@/components/BreakingNews';
import { Hero } from '@/components/Hero';
import { NewsGrid } from '@/components/NewsGrid';
import { Sidebar } from '@/components/Sidebar';
import { NewsletterSection } from '@/components/NewsletterSection';
import { useLanguage } from '@/app/context/LanguageContext';
import Link from 'next/link';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Breaking News Ticker */}
      <BreakingNews />

      {/* 2. Hero Editorial Banner */}
      <Hero />

      {/* 3. Peace & Dialogue National Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/20 p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#004225] text-[#F5F5DC] flex items-center justify-center shrink-0 shadow-sm">
              <HeartHandshake className="w-6 h-6 text-[#FFCF9D]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#004225]">
                  National Initiative
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFCF9D]/50 text-[#004225] text-[10px] font-bold">
                  2026 Peace Forum
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#004225]">
                Inter-Religious Dialogue & Community Reconciliation in Ethiopia
              </h3>
              <p className="text-xs sm:text-sm text-[#004225]/80 max-w-2xl">
                Joint programs by the Ethiopian Orthodox Tewahedo Church, Islamic Affairs Supreme Council, Evangelical Churches Fellowship, and Catholic Secretariat.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="px-5 py-3 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shrink-0 shadow-md"
          >
            <span>Join Local Forum</span>
            <ArrowRight className="w-4 h-4 text-[#FFCF9D]" />
          </Link>
        </div>
      </section>

      {/* 4. Main Two-Column Layout: NewsGrid + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main 2-columns */}
          <div className="lg:col-span-2">
            <NewsGrid />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* 5. Dedicated Portal Newsletter Subscription Section */}
      <NewsletterSection />

      {/* 6. Multimedia Heritage Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/20 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#004225]/15 pb-4">
            <div>
              <div className="flex items-center gap-2 text-[#004225] text-xs font-black uppercase tracking-widest">
                <ImageIcon className="w-4 h-4 text-[#FFB000]" />
                <span>Visual Archives & Sacred Heritage</span>
              </div>
              <h3 className="text-2xl font-black text-[#004225] tracking-tight mt-1">
                Monasteries, Manuscripts & Liturgical Traditions
              </h3>
            </div>
            <Link
              href="/contact"
              className="text-xs font-bold text-[#004225] hover:text-[#005e35] flex items-center gap-1"
            >
              <span>Submit Archival Photography</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFB000]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#002816] border border-[#004225]/20">
              <img
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80"
                alt="Lalibela Rock Churches"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002816] via-[#002816]/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#FFCF9D] uppercase tracking-widest">UNESCO Heritage</span>
                <h4 className="text-sm font-bold text-[#F5F5DC]">Biete Giyorgis Monolithic Cross</h4>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#002816] border border-[#004225]/20">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                alt="Demera Bonfire Meskel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002816] via-[#002816]/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#FFCF9D] uppercase tracking-widest">Living Tradition</span>
                <h4 className="text-sm font-bold text-[#F5F5DC]">Meskel Square Demera Chants</h4>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#002816] border border-[#004225]/20">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
                alt="Lake Tana Monasteries"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002816] via-[#002816]/40 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-[#FFCF9D] uppercase tracking-widest">Ge'ez Manuscripts</span>
                <h4 className="text-sm font-bold text-[#F5F5DC]">Illuminated Lake Tana Gospels</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

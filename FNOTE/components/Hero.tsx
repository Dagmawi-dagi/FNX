'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, Calendar, User, Clock, ArrowRight, Sparkles, Tv, Share2 } from 'lucide-react';
import { MOCK_NEWS } from '@/utils/constants';
import { useLanguage } from '@/app/context/LanguageContext';
import { LiveTvModal } from './LiveTvModal';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const featured = MOCK_NEWS[0];

  const formattedFeaturedDate = new Date(featured.date).toLocaleDateString(
    language === 'en' ? 'en-US' : language === 'am' ? 'am-ET' : 'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' }
  );

  return (
    <>
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Background Visual with overlays */}
        <div className="relative min-h-[480px] lg:min-h-[540px] w-full rounded-3xl overflow-hidden border border-[#004225]/20 shadow-xl flex items-end bg-[#004225]">
          <div className="absolute inset-0 z-0">
            <img
              src={featured.imageUrl}
              alt={featured.title}
              className="w-full h-full object-cover object-center filter brightness-60"
            />
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#002816] via-[#004225]/80 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 w-full">
            <div className="max-w-3xl space-y-5">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#FFCF9D] text-[#004225] text-xs font-black tracking-widest uppercase shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#004225]" />
                  {t.categories[featured.category as keyof typeof t.categories] || featured.category}
                </span>

                <span className="px-3 py-1 rounded-full bg-[#F5F5DC]/90 text-[#004225] text-xs font-semibold flex items-center gap-2 backdrop-blur-sm shadow-sm">
                  <Calendar className="w-3.5 h-3.5 text-[#004225]" />
                  {formattedFeaturedDate}
                </span>

                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#FFCF9D] font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#FFB000]" />
                  5 min read
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#F5F5DC] tracking-tight leading-[1.15] drop-shadow-sm">
                {featured.title}
              </h1>

              {/* Excerpt */}
              <p className="text-base sm:text-lg text-[#F5F5DC]/90 font-normal leading-relaxed max-w-2xl line-clamp-3">
                {featured.excerpt}
              </p>

              {/* Actions & Author Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={`#story-${featured.id}`}
                  className="px-6 py-3.5 rounded-xl bg-[#FAF7EE] hover:bg-[#FFCF9D] text-[#004225] font-black text-sm tracking-wide shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{t.ui.readStory}</span>
                  <ArrowRight className="w-4 h-4 text-[#004225]" />
                </a>

                <button
                  onClick={() => setLiveModalOpen(true)}
                  className="px-5 py-3.5 rounded-xl bg-[#002816]/90 hover:bg-[#002816] border border-[#FFCF9D]/40 text-[#F5F5DC] font-bold text-sm tracking-wide backdrop-blur-md flex items-center gap-2.5 transition-all active:scale-95 shadow-md"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FFB000] text-[#002816] flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>{t.ui.liveStream}</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-[#FFCF9D] pl-2">
                  <div className="w-7 h-7 rounded-full bg-[#002816] border border-[#FFCF9D]/30 flex items-center justify-center text-[#F5F5DC]">
                    <User className="w-4 h-4" />
                  </div>
                  <span>By <strong className="text-[#F5F5DC]">{featured.author}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live TV Modal */}
      <LiveTvModal isOpen={liveModalOpen} onClose={() => setLiveModalOpen(false)} />
    </>
  );
};

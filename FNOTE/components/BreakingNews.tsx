'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Flame, BellRing, ChevronRight, Zap } from 'lucide-react';
import { MOCK_NEWS } from '@/utils/constants';
import { useLanguage } from '@/app/context/LanguageContext';

export const BreakingNews: React.FC = () => {
  const { t } = useLanguage();
  const [isPaused, setIsPaused] = useState(false);

  const breakingItems = MOCK_NEWS.filter(n => n.isBreaking).concat(MOCK_NEWS.slice(1, 3));

  return (
    <div className="w-full bg-[#FAF7EE] border-b border-[#004225]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3">
        {/* Breaking Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004225] text-[#F5F5DC] font-black text-[11px] tracking-wider uppercase shrink-0 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-[#FFB000] fill-current" />
          <span>{t.ui.breaking}</span>
        </div>

        {/* Marquee Container */}
        <div 
          className="relative flex-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex items-center gap-8 whitespace-nowrap text-xs font-semibold text-[#004225] ${isPaused ? '' : 'animate-marquee'}`}>
            {breakingItems.map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={`#story-${item.id}`}
                className="inline-flex items-center gap-2 hover:text-[#005e35] transition-colors group cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000]"></span>
                <span className="text-[#004225] font-bold">[{item.category}]</span>
                <span className="group-hover:underline text-[#004225]">{item.title}</span>
                <span className="text-[10px] text-[#004225]/60 font-normal">({item.date})</span>
              </a>
            ))}
          </div>
        </div>

        {/* Trending indicator */}
        <div className="hidden md:flex items-center gap-1 text-[11px] font-bold text-[#004225] shrink-0">
          <Flame className="w-3.5 h-3.5 text-[#FFB000]" />
          <span>{t.ui.trending}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </div>
  );
};

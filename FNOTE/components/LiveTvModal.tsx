'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Tv, Users, Volume2, ShieldCheck, Share2 } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface LiveTvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveTvModal: React.FC<LiveTvModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#004225] border-b border-[#002816] text-[#F5F5DC]">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB000] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFB000]"></span>
            </span>
            <div className="flex items-center gap-2">
              <Tv className="w-5 h-5 text-[#FFB000]" />
              <span className="font-bold text-[#F5F5DC] tracking-wide font-serif">FNOTE TSIDK LIVE TV • {t.nav.onAir}</span>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-bold bg-[#002816] text-[#FFCF9D] rounded-full border border-[#FFCF9D]/30">
              1080p HD
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-[#FFCF9D] mr-2">
              <Users className="w-3.5 h-3.5 text-[#FFB000]" />
              <span>3,842 watching</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#F5F5DC] hover:bg-[#002816] rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1280&q=80"
            alt="Live Stream Thumbnail"
            className="w-full h-full object-cover opacity-60 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

          {/* Center Play overlay */}
          <div className="absolute flex flex-col items-center gap-4 text-center px-4">
            <div className="w-20 h-20 rounded-full bg-[#FAF7EE] text-[#004225] flex items-center justify-center shadow-2xl ring-4 ring-[#FFCF9D]/50 cursor-pointer hover:scale-105 transition-transform">
              <Volume2 className="w-8 h-8 ml-1 text-[#004225]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#F5F5DC] drop-shadow-md">Holy Liturgy & Choral Hymns Live from Holy Trinity Cathedral</p>
              <p className="text-sm text-[#FFCF9D] font-medium mt-1">Main Sanctuary Broadcast • Addis Ababa</p>
            </div>
          </div>

          {/* Bottom Video Controls Simulator */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F5F5DC] bg-black/75 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-[#004225] font-bold text-[#F5F5DC] text-[10px] tracking-wider uppercase border border-[#FFCF9D]/30">Live</span>
              <span>01:42:15</span>
              <span className="text-white/40">|</span>
              <span className="flex items-center gap-1 text-[#FFCF9D]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFB000]" /> High Quality Stream
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="hover:text-[#FFCF9D] flex items-center gap-1 text-[#F5F5DC] transition-colors">
                <Share2 className="w-3.5 h-3.5 text-[#FFB000]" /> Share Stream
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#FAF7EE] border-t border-[#004225]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#004225]">
          <div>
            <span className="font-bold text-[#004225]">Next Program:</span> Sacred Heritage Hour — 2:00 PM (EAT)
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#004225]/75">Audio: Ge'ez Liturgical Chants</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold hover:bg-[#005e35] transition-colors shadow-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  ArrowUpRight, 
  Share2, 
  Bookmark, 
  Sparkles, 
  MessageSquare, 
  X, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { MOCK_NEWS, CATEGORIES } from '@/utils/constants';
import { NewsItem, Category } from '@/utils/types';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';

export const NewsGrid: React.FC = () => {
  const { language, t } = useLanguage();
  const { articles } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const displayList = articles.length > 0 ? articles : MOCK_NEWS;

  const filteredNews = selectedCategory === 'All'
    ? displayList
    : displayList.filter(n => n.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Category Pills Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#004225]/15">
        <div>
          <h2 className="text-2xl font-black text-[#004225] tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFB000]" />
            <span>Latest News & Dispatches</span>
          </h2>
          <p className="text-xs text-[#004225]/75 mt-0.5">Updated hourly from regional and diaspora correspondents</p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#004225] text-[#F5F5DC] shadow-sm'
                : 'bg-[#FAF7EE] text-[#004225] hover:bg-[#FFCF9D]/30 border border-[#004225]/15'
            }`}
          >
            {t.ui.browseAll}
          </button>
          {CATEGORIES.filter(c => c !== 'Home').map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#004225] text-[#F5F5DC] shadow-sm'
                  : 'bg-[#FAF7EE] text-[#004225] hover:bg-[#FFCF9D]/30 border border-[#004225]/15'
              }`}
            >
              {t.categories[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            id={`story-${item.id}`}
            onClick={() => setActiveArticle(item)}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 hover:border-[#004225]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            {/* Image Box */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#002816]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002816]/60 via-transparent to-transparent" />

              {/* Badges on Image */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#004225] text-[#F5F5DC] text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {item.category}
                </span>
                {item.isBreaking && (
                  <span className="px-2 py-0.5 rounded-lg bg-[#FFCF9D] text-[#004225] text-[10px] font-black uppercase shadow-sm">
                    Breaking
                  </span>
                )}
              </div>

              {/* Bookmark Button */}
              <button
                onClick={(e) => toggleBookmark(item.id, e)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-[#FAF7EE]/90 backdrop-blur-md text-[#004225] hover:bg-[#FFCF9D] border border-[#004225]/20 transition-colors shadow-sm"
                aria-label="Bookmark story"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkedIds.includes(item.id) ? 'fill-[#FFB000] text-[#FFB000]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-[#004225]/70">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#004225]" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#004225]" />
                    {item.author}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#004225] group-hover:text-[#005e35] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-[#004225]/80 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#004225]/15 flex items-center justify-between text-xs font-bold text-[#004225]">
                <span className="flex items-center gap-1 group-hover:text-[#005e35]">
                  {t.ui.readStory}
                  <ChevronRight className="w-4 h-4 text-[#FFB000] group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[#004225]/60 font-normal text-[11px]">4 min read</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Full Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            {/* Close */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#004225] text-[#F5F5DC] hover:bg-[#005e35] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badge & Meta */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full bg-[#004225] text-[#F5F5DC] font-bold text-xs uppercase">
                {activeArticle.category}
              </span>
              <span className="text-xs text-[#004225]/75 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#004225]" />
                {activeArticle.date}
              </span>
              <span className="text-xs text-[#004225]/75 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#004225]" />
                {activeArticle.author}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-[#004225] leading-tight">
              {activeArticle.title}
            </h2>

            {/* Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#002816] border border-[#004225]/20">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-[#004225] leading-relaxed text-base">
              <p className="text-lg font-medium text-[#004225] italic border-l-4 border-[#004225] pl-4 py-2 bg-[#FFCF9D]/20 rounded-r-xl">
                {activeArticle.excerpt}
              </p>
              <p>{activeArticle.content}</p>
              <p>
                As spiritual broadcasts and community engagements continue to expand across Ethiopia and its global diaspora, Fnote Tsidk Spiritual Media remains dedicated to ethical reporting, sacred preservation, and inter-religious mutual understanding.
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#004225]/20 flex items-center justify-between">
              <span className="text-xs text-[#004225]/70">Published by Fnote Tsidk Editorial Board • Addis Ababa</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] transition-colors shadow-sm"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

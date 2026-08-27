'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  Clock, 
  Share2, 
  X, 
  Sparkles, 
  Eye 
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';
import { Article } from '@/utils/types';

export default function BlogPage() {
  const { language } = useLanguage();
  const { articles } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const tags = ['All', 'Spiritual', 'Ethiopia', 'Multimedia', 'Podcast', 'Social', 'Arts'];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || art.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#004225] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004225] text-[#FFCF9D] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#FFB000]" />
            <span>Fnote Tsidk Sacred Blog & Dispatches</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif text-[#004225]">
            Spiritual Wisdom, History & Teachings
          </h1>
          <p className="text-sm sm:text-base text-[#004225]/80 leading-relaxed">
            Explore deep theological reflections, Ge'ez hymn studies, saintly chronicles, and church heritage articles curated by Fnote Tsidk scholars.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-4 sm:p-6 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004225]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blog articles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                      : 'bg-[#F5F5DC] text-[#004225] hover:bg-[#FFCF9D]/30 border border-[#004225]/15'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#004225]/40 transition-all cursor-pointer flex flex-col group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#004225]">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#004225] text-[#FFCF9D] text-[11px] font-bold shadow-md border border-[#FFCF9D]/30">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-[#004225]/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#004225]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#004225]" />
                      {article.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#004225] font-serif leading-snug group-hover:text-[#005e35] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#004225]/80 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#004225]/10 flex items-center justify-between text-xs font-bold text-[#004225]">
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    Read Article <ArrowRight className="w-3.5 h-3.5 text-[#004225]" />
                  </span>
                  <span className="text-[11px] text-[#004225]/60 font-normal">
                    {article.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 space-y-3 bg-[#FAF7EE] rounded-3xl border border-[#004225]/15">
            <BookOpen className="w-10 h-10 text-[#004225]/40 mx-auto" />
            <h3 className="text-lg font-bold text-[#004225]">No articles found</h3>
            <p className="text-xs text-[#004225]/70">Try modifying your search keywords or choosing a different tag.</p>
          </div>
        )}

      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            
            {/* Top Close Bar */}
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <span className="px-3 py-1 rounded-full bg-[#004225] text-[#FFCF9D] text-xs font-bold">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-full hover:bg-[#004225]/10 text-[#004225] transition-colors cursor-pointer"
                aria-label="Close reader"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Header info */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#004225] font-serif leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#004225]/75">
                <span>By <strong>{activeArticle.author}</strong></span>
                <span>•</span>
                <span>Published on {activeArticle.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-[#004225]" /> {activeArticle.views.toLocaleString()} reads</span>
              </div>
            </div>

            {/* Image */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#004225] border border-[#004225]/20">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content text */}
            <div className="space-y-4 text-sm sm:text-base text-[#004225] leading-relaxed">
              <p className="text-base font-semibold italic border-l-4 border-[#004225] pl-4 py-2 bg-[#FFCF9D]/20 rounded-r-xl">
                {activeArticle.excerpt}
              </p>
              <p>{activeArticle.content}</p>
              <p>
                Fnote Tsidk Spiritual Media continues to bring the faithful closer to our centuries-old spiritual heritage through authoritative historical documentation, liturgical research, and daily broadcast excellence.
              </p>
            </div>

            {/* Bottom Footer */}
            <div className="pt-4 border-t border-[#004225]/15 flex items-center justify-between">
              <span className="text-xs text-[#004225]/70">Fnote Tsidk Editorial Archives • Addis Ababa</span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] transition-colors shadow-sm cursor-pointer"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

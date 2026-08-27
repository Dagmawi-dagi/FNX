'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Radio, 
  Search, 
  Menu, 
  X, 
  Globe, 
  Tv, 
  LogIn, 
  Sparkles, 
  PhoneCall, 
  ChevronDown,
  Calendar,
  BookOpen,
  Briefcase,
  Share2,
  Info,
  Mail,
  Home as HomeIcon
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { Language } from '@/utils/types';
import { LiveTvModal } from './LiveTvModal';

const languages: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'EN' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ' },
  { code: 'ti', label: 'Tigrinya', native: 'ትግርኛ' },
  { code: 'or', label: 'Afaan Oromoo', native: 'Oromoo' }
];

export const Header: React.FC = () => {
  const { language, setLanguage, t, formattedDate } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveTvOpen, setLiveTvOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const NAV_ITEMS = [
    { label: t.nav.home || 'Home', href: '/', icon: HomeIcon },
    { label: t.nav.about || 'About Us', href: '/about', icon: Info },
    { label: t.nav.blog || 'Blog', href: '/blog', icon: BookOpen },
    { label: t.nav.events || 'Events', href: '/events', icon: Calendar },
    { label: t.nav.socials || 'Socials', href: '/socials', icon: Share2 },
    { label: t.nav.vacancy || 'Vacancy', href: '/vacancy', icon: Briefcase },
    { label: 'Newsletter', href: '/newsletter', icon: Mail },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F5F5DC]/95 shadow-md backdrop-blur-xl border-b border-[#004225]/20' 
          : 'bg-[#F5F5DC] border-b border-[#004225]/15'
      }`}>
        {/* Top Announcement & Utility Bar (Forest Green Accent) */}
        <div className="bg-[#004225] border-b border-[#002816] text-xs text-[#F5F5DC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
            {/* Live On-Air Banner & Date */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLiveTvOpen(true)}
                className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#002816] text-[#F5F5DC] font-bold border border-[#FFCF9D]/30 hover:border-[#FFB000] transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#FFB000] animate-ping"></span>
                <span className="tracking-wider">{t.nav.onAir}</span>
              </button>

              <span className="hidden md:inline-block text-[#FFCF9D] font-medium text-[11px]">
                {formattedDate}
              </span>
            </div>

            {/* Quick Actions & Language Selector */}
            <div className="flex items-center gap-3 sm:gap-6">
              <Link 
                href="/contact" 
                className="hidden sm:flex items-center gap-1.5 text-[#F5F5DC] hover:text-[#FFCF9D] font-medium transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>{t.nav.contact}</span>
              </Link>

              <button
                onClick={() => setLiveTvOpen(true)}
                className="flex items-center gap-1.5 text-[#F5F5DC] hover:text-[#FFCF9D] font-medium transition-colors cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>{t.nav.liveTv}</span>
              </button>

              {/* Language Switcher Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#002816] hover:bg-[#005e35] text-[#F5F5DC] text-xs font-semibold border border-[#FFCF9D]/30 transition-colors cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#FFB000]" />
                  <span>{currentLang.native}</span>
                  <ChevronDown className="w-3 h-3 text-[#FFCF9D]" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#FAF7EE] border border-[#004225]/30 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
                          language === lang.code
                            ? 'bg-[#004225] text-[#F5F5DC] font-bold'
                            : 'text-[#004225] hover:bg-[#FFCF9D]/30'
                        }`}
                      >
                        <span>{lang.label}</span>
                        <span className="opacity-70 font-normal text-[11px]">{lang.native}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Admin Desk Direct Link */}
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF7EE]/15 hover:bg-[#FAF7EE]/25 text-[#FFCF9D] font-bold text-xs border border-[#FFCF9D]/40 transition-colors"
                title="Admin Desk Dashboard"
              >
                <Sparkles className="w-3 h-3 text-[#FFB000]" />
                <span>Admin Desk</span>
              </Link>

              {/* Login Portal Link */}
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-[#FAF7EE] hover:bg-[#FFCF9D] text-[#004225] font-black border border-[#004225]/20 shadow-sm transition-all active:scale-95 text-xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#004225]" />
                <span className="hidden sm:inline">{t.nav.login}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Branding & Navigation Container (Warm Beige Canvas) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-[#004225] shadow-md shadow-[#004225]/15 bg-[#FAF7EE] p-0.5 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Fnote Tsidk Logo"
                  width={56}
                  height={56}
                  className="object-cover rounded-xl w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#004225] flex items-center gap-1.5 font-serif">
                  FNOTE <span className="text-[#004225] font-extrabold tracking-normal">TSIDK</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#004225]/80 uppercase tracking-wider flex items-center gap-1">
                  <span>ፍኖተ ጽድቅ</span>
                  <span className="w-1 h-1 rounded-full bg-[#004225]/40 inline-block" />
                  <span>{language === 'am' ? 'መንፈሳዊ ሚዲያ' : 'Spiritual Media'}</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive 
                        ? 'text-[#F5F5DC] bg-[#004225] font-bold shadow-sm' 
                        : 'text-[#004225] hover:bg-[#FFCF9D]/40'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl text-[#004225] hover:bg-[#FFCF9D]/30 border border-[#004225]/20 transition-colors cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Radio Quick Player Toggle */}
              <button
                onClick={() => setLiveTvOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Radio className="w-4 h-4 text-[#FFB000] animate-pulse" />
                <span>Live Studio</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-[#004225] hover:bg-[#FFCF9D]/30 border border-[#004225]/20 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <div className="border-t border-[#004225]/20 bg-[#FAF7EE] px-4 py-3 shadow-inner animate-in slide-in-from-top-2 duration-200">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#004225] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Fnote Tsidk articles, Ge'ez hymns, audio podcasts, Synod bulletins..."
                className="w-full bg-transparent text-sm text-[#004225] placeholder-[#004225]/50 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#004225]/70 hover:text-[#004225] font-semibold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#004225]/20 bg-[#F5F5DC] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-200 shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-3 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
                      isActive 
                        ? 'bg-[#004225] text-[#F5F5DC] font-bold shadow-sm' 
                        : 'bg-[#FAF7EE] border border-[#004225]/15 text-[#004225]'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-75" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-[#FAF7EE] border border-[#004225]/15 text-sm font-semibold text-[#004225] flex items-center justify-between"
              >
                <span>{t.nav.contact}</span>
                <PhoneCall className="w-4 h-4 text-[#004225]" />
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-[#FAF7EE] border border-[#004225]/15 text-sm font-semibold text-[#004225] flex items-center justify-between"
              >
                <span>{t.nav.login}</span>
                <LogIn className="w-4 h-4 text-[#004225]" />
              </Link>
            </div>

            <div className="pt-2 border-t border-[#004225]/15">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLiveTvOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-sm shadow-md cursor-pointer"
              >
                <Tv className="w-4 h-4 text-[#FFB000]" />
                <span>Watch Fnote Tsidk Live TV</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Live TV Modal popup */}
      <LiveTvModal isOpen={liveTvOpen} onClose={() => setLiveTvOpen(false)} />
    </>
  );
};

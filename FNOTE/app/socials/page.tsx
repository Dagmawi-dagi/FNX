'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Users, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  HandHeart, 
  Coins, 
  BookOpen, 
  Stethoscope, 
  Home, 
  Flame,
  ArrowRight,
  X,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';
import { CharityProject, CharityCategory } from '@/utils/types';
import { CHARITY_BANK_ACCOUNTS } from '@/utils/constants';

export default function SocialsCharityPage() {
  const { language } = useLanguage();
  const { charityWorks, socialChannels } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<CharityProject | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  // Volunteer form state
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Addis Ababa',
    interests: 'Food & Relief Aid',
    message: ''
  });

  const categories: (string | CharityCategory)[] = [
    'All',
    'Monastery Support',
    'Elderly & Orphan Care',
    'Food & Relief Aid',
    'Youth & Education',
    'Medical Caravan',
    'Heritage Restoration'
  ];

  const filteredProjects = charityWorks.filter(proj => {
    return selectedCategory === 'All' || proj.category === selectedCategory;
  });

  const handleCopyAccount = (text: string, index: number) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerSubmitted(true);
    setTimeout(() => {
      setVolunteerSubmitted(false);
      setShowVolunteerModal(false);
      setVolunteerForm({
        name: '',
        phone: '',
        email: '',
        city: 'Addis Ababa',
        interests: 'Food & Relief Aid',
        message: ''
      });
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#004225] py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-[#004225] text-[#F5F5DC] p-8 sm:p-12 lg:p-16 border border-[#004225]/30 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-[#FFCF9D]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-[#FFB000]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7EE]/10 border border-[#FFCF9D]/30 text-[#FFCF9D] text-xs font-bold uppercase tracking-wider">
              <HandHeart className="w-4 h-4 text-[#FFB000]" />
              <span>Media Community Charity & Social Outreach • የበጎ አድራጎት አገልግሎት</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-tight text-[#F5F5DC]">
              Faith in Action: <span className="text-[#FFCF9D]">Serving Hermits, Elders & Youth</span>
            </h1>

            <p className="text-sm sm:text-base text-[#F5F5DC]/85 leading-relaxed">
              Fnote Tsidk Spiritual Media translates spiritual broadcast into direct compassionate action. Together with our global audience and local volunteers, we sustain remote hermitages, deliver life-saving relief, sponsor rural deacon education, and provide free specialized medical missions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setShowDonationModal(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#FFB000] hover:bg-[#ffa000] text-[#004225] font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Coins className="w-4 h-4" />
                <span>Contribute / Support Projects</span>
              </button>

              <button
                onClick={() => setShowVolunteerModal(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#FAF7EE]/15 hover:bg-[#FAF7EE]/25 border border-[#FFCF9D]/40 text-[#F5F5DC] font-bold text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#FFCF9D]" />
                <span>Join Volunteer Brigade</span>
              </button>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-2 shadow-sm">
            <div className="p-3 w-fit rounded-2xl bg-[#004225] text-[#FFCF9D]">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">1,200+</h3>
            <p className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Desert Monks Sustained</p>
            <p className="text-xs text-[#004225]/80">Solar kits, lamps & organic grains delivered to remote hermitages.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-2 shadow-sm">
            <div className="p-3 w-fit rounded-2xl bg-[#004225] text-[#FFCF9D]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">45,000+</h3>
            <p className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Hot Meals & Blankets</p>
            <p className="text-xs text-[#004225]/80">Regular community soup kitchens for vulnerable elders & street youth.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-2 shadow-sm">
            <div className="p-3 w-fit rounded-2xl bg-[#004225] text-[#FFCF9D]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">14,000+</h3>
            <p className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Hymn Books & Liturgy Primers</p>
            <p className="text-xs text-[#004225]/80">Equipping rural Sunday school pupils and deacon students.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-2 shadow-sm">
            <div className="p-3 w-fit rounded-2xl bg-[#004225] text-[#FFCF9D]">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">420+</h3>
            <p className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Free Eye Surgeries</p>
            <p className="text-xs text-[#004225]/80">Cataract interventions and health checks via mobile medical caravans.</p>
          </div>
        </section>

        {/* Category Filters */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#004225]/15 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">
                Active Charity Initiatives & Outreach
              </h2>
              <p className="text-xs sm:text-sm text-[#004225]/75">
                Explore transparent humanitarian and spiritual heritage missions currently spearheaded by our media fellowship.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#004225] text-[#FFCF9D] self-start sm:self-auto">
              {filteredProjects.length} Active Missions
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                    : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Charity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#004225]/10">
                    <Image
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#004225] text-[#FFCF9D] text-xs font-bold shadow-md">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase shadow-md ${
                        project.status === 'Active' ? 'bg-emerald-500 text-white' :
                        project.status === 'Ongoing' ? 'bg-[#FFB000] text-[#004225]' : 'bg-gray-600 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#004225]/70">
                      <MapPin className="w-3.5 h-3.5 text-[#004225]" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-[#004225] leading-snug line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#004225]/80 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {project.impactHighlight && (
                      <div className="p-3 rounded-2xl bg-[#F5F5DC] border border-[#004225]/10 flex items-start gap-2 text-xs text-[#004225]/90">
                        <Sparkles className="w-4 h-4 text-[#FFB000] shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-relaxed">{project.impactHighlight}</span>
                      </div>
                    )}

                    <div className="space-y-1.5 pt-1 text-xs">
                      <div className="flex items-center justify-between text-[#004225]/80 font-medium">
                        <span>Beneficiaries:</span>
                        <strong className="text-[#004225]">{project.beneficiaries}</strong>
                      </div>
                      {project.targetAmount && (
                        <div className="flex items-center justify-between text-[#004225]/80 font-medium">
                          <span>Target Budget:</span>
                          <strong className="text-[#004225]">{project.targetAmount}</strong>
                        </div>
                      )}
                      {project.raisedAmount && (
                        <div className="flex items-center justify-between text-[#004225]/80 font-medium">
                          <span>Raised So Far:</span>
                          <strong className="text-emerald-700">{project.raisedAmount}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowDonationModal(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Coins className="w-3.5 h-3.5 text-[#FFB000]" />
                    <span>Support Mission</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#004225]/20 hover:bg-[#FFCF9D]/30 text-[#004225] text-xs font-bold transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bank & Mobile Money Transfer Information */}
        <section className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/20 p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Direct Contributions</span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#004225]">
                Verified Bank & Mobile Transfer Accounts
              </h2>
              <p className="text-xs sm:text-sm text-[#004225]/80">
                All contributions are dedicated 100% to verified monastic sustenance, relief food supplies, and medical missions.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-[#004225] text-[#FFCF9D] self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-[#FFB000]" />
              <span>Audited Ministry Fund</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHARITY_BANK_ACCOUNTS.map((acc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#004225] font-serif">{acc.bankName}</span>
                  <p className="text-sm sm:text-base font-black font-mono tracking-wider text-[#004225]">
                    {acc.accountNumber}
                  </p>
                  <p className="text-[11px] text-[#004225]/70">{acc.accountName}</p>
                </div>

                <button
                  onClick={() => handleCopyAccount(acc.accountNumber, idx)}
                  className="p-2.5 rounded-xl bg-[#FAF7EE] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-[#004225] transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
                  title="Copy Account Number"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Community Channels & Social Network Dispatch */}
        <section className="rounded-3xl bg-[#004225] text-[#F5F5DC] p-8 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#FFCF9D] uppercase tracking-wider">Online Fellowship & Updates</span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#F5F5DC]">
              Follow Our Live Broadcasts & Charity Dispatches
            </h2>
            <p className="text-xs sm:text-sm text-[#F5F5DC]/80">
              Stay connected with daily humanitarian dispatches, video reports from monastic missions, and weekly prayer streams across all official channels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialChannels.map((chan) => (
              <a
                key={chan.id}
                href={chan.link || chan.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#FAF7EE]/10 border border-[#FFCF9D]/20 hover:bg-[#FAF7EE]/20 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#FFCF9D] font-serif">{chan.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF7EE]/20 text-[#F5F5DC] font-semibold">
                      {chan.badge || chan.platform}
                    </span>
                  </div>
                  <p className="text-xs text-[#F5F5DC]/70">{chan.handle}</p>
                  <p className="text-[11px] text-[#FFCF9D]/90 font-medium">{chan.subscribers}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#FFCF9D] group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* Donation / Support Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <div>
                <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Contribute to Charity</span>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-[#004225]">
                  {selectedProject ? selectedProject.title : 'Fnote Tsidk Community Charity Fund'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowDonationModal(false);
                  setSelectedProject(null);
                }}
                className="p-2 rounded-full hover:bg-[#004225]/10 text-[#004225] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-[#004225]/85 leading-relaxed">
                Please transfer your contribution directly to any of the verified Fnote Tsidk Media charity accounts below. Use the mission title or your name as a payment reference.
              </p>

              <div className="space-y-3">
                {CHARITY_BANK_ACCOUNTS.map((acc, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-[#004225]">{acc.bankName}</span>
                      <p className="text-sm font-mono font-bold text-[#004225]">{acc.accountNumber}</p>
                      <p className="text-[10px] text-[#004225]/70">{acc.accountName}</p>
                    </div>
                    <button
                      onClick={() => handleCopyAccount(acc.accountNumber, idx + 10)}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF7EE] border border-[#004225]/20 hover:bg-[#004225] hover:text-[#F5F5DC] text-xs font-bold transition-all cursor-pointer"
                    >
                      {copiedIndex === idx + 10 ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#004225] text-[#F5F5DC] space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-[#FFCF9D] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Contribution Receipt Confirmation</span>
                </div>
                <p className="text-[11px] text-[#F5F5DC]/80">
                  After transfer, send your receipt snapshot to our Telegram helpline <strong>@FnoteTsidkCharity</strong> or SMS/call <strong>+251 91 123 4567</strong> for acknowledgment.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowDonationModal(false);
                  setSelectedProject(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] font-bold text-xs hover:bg-[#005e35] transition-colors cursor-pointer"
              >
                Close & Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Signup Modal */}
      {showVolunteerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <div>
                <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Join Volunteer Brigade</span>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-[#004225]">
                  Become a Community Volunteer
                </h3>
              </div>
              <button
                onClick={() => setShowVolunteerModal(false)}
                className="p-2 rounded-full hover:bg-[#004225]/10 text-[#004225] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {volunteerSubmitted ? (
              <div className="text-center py-10 space-y-3 bg-[#004225] text-[#F5F5DC] rounded-2xl p-6">
                <CheckCircle2 className="w-12 h-12 text-[#FFB000] mx-auto animate-bounce" />
                <h4 className="text-xl font-bold font-serif">Welcome to the Fellowship!</h4>
                <p className="text-xs text-[#FFCF9D] max-w-md mx-auto">
                  Thank you for volunteering your time and skills. Our community outreach coordinator will reach out to connect you with current field missions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225]">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004225]/60" />
                      <input
                        type="text"
                        required
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        placeholder="e.g. Deacon Yonas Birhanu"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225]">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004225]/60" />
                      <input
                        type="tel"
                        required
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        placeholder="+251 911 000 000"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225]">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004225]/60" />
                      <input
                        type="email"
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225]">Primary City / Region</label>
                    <input
                      type="text"
                      value={volunteerForm.city}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, city: e.target.value })}
                      placeholder="Addis Ababa / Regional / Diaspora"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#004225]">Area of Service Interest</label>
                  <select
                    value={volunteerForm.interests}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, interests: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                  >
                    <option value="Food & Relief Aid">Food Preparation & Distribution</option>
                    <option value="Monastery Support">Monastery Cargo & Logistics Expeditions</option>
                    <option value="Medical Caravan">Medical & Health Professional Service</option>
                    <option value="Youth & Education">Sunday School Teaching & Literacy Caravans</option>
                    <option value="Media & Photography">Media Documentation & Social Storytelling</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#004225]">Brief Note / Skills</label>
                  <textarea
                    rows={3}
                    value={volunteerForm.message}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                    placeholder="Tell us about your background (e.g. driver, doctor, teacher, logistics, youth leader)..."
                    className="w-full p-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowVolunteerModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#004225] hover:bg-[#004225]/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FFB000]" />
                    <span>Submit Volunteer Registration</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && !showDonationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <span className="px-3 py-1 rounded-full bg-[#004225] text-[#FFCF9D] text-xs font-bold">
                {selectedProject.category}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full hover:bg-[#004225]/10 text-[#004225] cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-[#004225]/10">
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-black font-serif text-[#004225]">
                {selectedProject.title}
              </h2>

              <div className="flex flex-wrap gap-4 text-xs text-[#004225]/75">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#004225]" /> {selectedProject.location}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-[#004225]" /> {selectedProject.date}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#004225]" /> {selectedProject.beneficiaries}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#004225]/85 leading-relaxed">
                {selectedProject.description}
              </p>

              {selectedProject.impactHighlight && (
                <div className="p-4 rounded-2xl bg-[#004225] text-[#F5F5DC] space-y-1">
                  <span className="text-xs font-bold text-[#FFCF9D] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FFB000]" /> Verified Mission Impact
                  </span>
                  <p className="text-xs text-[#F5F5DC]/90">{selectedProject.impactHighlight}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-bold text-[#004225] hover:bg-[#004225]/10 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => setShowDonationModal(true)}
                className="px-6 py-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] text-xs font-bold flex items-center gap-2 hover:bg-[#005e35] shadow-md"
              >
                <Coins className="w-4 h-4 text-[#FFB000]" />
                <span>Support This Mission</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

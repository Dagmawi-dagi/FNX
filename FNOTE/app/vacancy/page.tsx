'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  X, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  User, 
  Mail, 
  Phone,
  ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useData } from '@/app/context/DataContext';
import { Vacancy } from '@/utils/types';

export default function VacancyPage() {
  const { language } = useLanguage();
  const { vacancies } = useData();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    coverNote: ''
  });

  const departments = ['All', 'Editorial & News', 'Broadcast & Engineering', 'Theology & Research', 'Digital & Social', 'Translation & Outreach', 'Audio & Sound Engineering'];

  const filteredVacancies = vacancies.filter(vac => {
    return selectedDept === 'All' || vac.department.toLowerCase().includes(selectedDept.toLowerCase()) || selectedDept.toLowerCase().includes(vac.department.toLowerCase());
  });

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveVacancy(null);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        portfolioUrl: '',
        coverNote: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#004225] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#004225] text-[#FFCF9D] text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-[#FFB000]" />
            <span>Careers & Ministry Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif text-[#004225]">
            Join the Fnote Tsidk Media Team
          </h1>
          <p className="text-sm sm:text-base text-[#004225]/80 leading-relaxed">
            Dedicate your professional talents in journalism, sacred translation, broadcast engineering, or digital storytelling to amplify Ethiopian spiritual heritage.
          </p>
        </div>

        {/* Why work with us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#004225]" />
            <h3 className="font-bold text-base text-[#004225] font-serif">Mission-Driven Work</h3>
            <p className="text-xs text-[#004225]/80 leading-relaxed">
              Serve a greater purpose by documenting sacred traditions and promoting peaceful coexistence.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-2">
            <Sparkles className="w-6 h-6 text-[#004225]" />
            <h3 className="font-bold text-base text-[#004225] font-serif">Modern Production Lab</h3>
            <p className="text-xs text-[#004225]/80 leading-relaxed">
              Work with state-of-the-art 4K camera rigs, acoustic recording suites, and AI-assisted archive tools.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 space-y-2">
            <Clock className="w-6 h-6 text-[#004225]" />
            <h3 className="font-bold text-base text-[#004225] font-serif">Competitive Benefits</h3>
            <p className="text-xs text-[#004225]/80 leading-relaxed">
              Comprehensive health coverage, transportation allowances, and ongoing theological and technical training.
            </p>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedDept === dept
                  ? 'bg-[#004225] text-[#F5F5DC] shadow-md'
                  : 'bg-[#FAF7EE] text-[#004225] border border-[#004225]/15 hover:bg-[#FFCF9D]/30'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Vacancies List */}
        <div className="space-y-4">
          {filteredVacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#004225]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#004225] text-[#FFCF9D] text-xs font-bold">
                    {vacancy.department}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F5F5DC] border border-[#004225]/20 text-xs font-semibold text-[#004225]">
                    {vacancy.type}
                  </span>
                  <span className="text-xs text-[#004225]/70 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#004225]" />
                    {vacancy.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#004225] font-serif">
                  {vacancy.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#004225]/80 leading-relaxed">
                  {vacancy.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#004225]/70 pt-1">
                  <span>Deadline: <strong>{vacancy.deadline}</strong></span>
                  <span>•</span>
                  <span>{vacancy.requirements.length} core qualifications</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                <button
                  onClick={() => setActiveVacancy(vacancy)}
                  className="px-6 py-3 rounded-2xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Apply for Position</span>
                  <ArrowRight className="w-4 h-4 text-[#FFCF9D]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Application Modal */}
      {activeVacancy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF7EE] border border-[#004225]/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#004225]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#004225]/15 pb-4">
              <div>
                <span className="text-xs font-bold text-[#004225]/70 uppercase tracking-wider">Application Form</span>
                <h2 className="text-xl sm:text-2xl font-black text-[#004225] font-serif">
                  {activeVacancy.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveVacancy(null)}
                className="p-2 rounded-full hover:bg-[#004225]/10 text-[#004225] transition-colors cursor-pointer"
                aria-label="Close application"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4 bg-[#004225] text-[#F5F5DC] rounded-3xl p-6">
                <CheckCircle2 className="w-12 h-12 text-[#FFB000] mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold font-serif">Application Submitted!</h3>
                <p className="text-xs sm:text-sm text-[#FFCF9D] max-w-md mx-auto">
                  Thank you for applying to Fnote Tsidk Media. Our recruitment committee will review your credentials and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15 space-y-2">
                  <h4 className="text-xs font-bold text-[#004225] uppercase tracking-wider">Key Requirements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#004225]/85">
                    {activeVacancy.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225]">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004225]/60" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Deacon Daniel Tesfaye"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225]">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004225]/60" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. name@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225]">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004225]/60" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 911 000 000"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#004225]">Portfolio / CV Link (Optional)</label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004225]/60" />
                      <input
                        type="url"
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        placeholder="https://drive.google.com/..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#004225]">Cover Letter / Statement of Purpose</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Briefly describe your experience and spiritual motivation for this role..."
                    className="w-full p-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveVacancy(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-[#004225] hover:bg-[#004225]/10 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FFB000]" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

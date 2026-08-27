'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Globe, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Building2, 
  Radio, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { LOCATION_INFO } from '@/utils/constants';
import { LocationMap } from '@/components/LocationMap';

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'editorial',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'editorial',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#004225] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#002816]">
        <div className="max-w-7xl mx-auto text-center space-y-4 text-[#F5F5DC]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#002816] border border-[#FFCF9D]/30 text-[#FFCF9D] text-xs font-bold uppercase tracking-widest">
            <Globe className="w-3.5 h-3.5 text-[#FFB000]" />
            <span>{t.nav.contact} • Addis Ababa Central Bureau</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-5xl font-black text-[#F5F5DC] tracking-tight leading-tight font-serif">
            Connect with <span className="text-[#FFCF9D]">Fnote Tsidk Spiritual Media</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#F5F5DC]/85 leading-relaxed">
            Have a story tip, broadcast inquiry, liturgical research request, vacancy application, or community peace initiative to share? Reach our editorial desk and studio teams in Addis Ababa.
          </p>
        </div>
      </section>

      {/* Main Content: Form + Fast Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-6 sm:p-8 space-y-6 shadow-md text-[#004225]">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#004225]">Direct Communication Channels</h3>
                <p className="text-xs text-[#004225]/75">
                  Our broadcast operations and editorial staff are available during working hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15">
                  <div className="p-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-[#FFB000]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#004225]">Headquarters</h4>
                    <p className="text-xs text-[#004225]/80 mt-0.5 leading-relaxed">{LOCATION_INFO.address}</p>
                    <p className="text-[11px] text-[#004225] font-bold mt-0.5">{LOCATION_INFO.landmark}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15">
                  <div className="p-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] shrink-0 shadow-sm">
                    <Phone className="w-5 h-5 text-[#FFB000]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#004225]">Telephone Lines</h4>
                    <p className="text-xs text-[#004225]/80 mt-0.5">{LOCATION_INFO.phone}</p>
                    <p className="text-[11px] text-[#004225] font-bold mt-0.5">24/7 Studio Hotline</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15">
                  <div className="p-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] shrink-0 shadow-sm">
                    <Mail className="w-5 h-5 text-[#FFB000]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#004225]">Electronic Mail</h4>
                    <p className="text-xs text-[#004225]/80 mt-0.5">{LOCATION_INFO.email}</p>
                    <p className="text-xs text-[#004225]/80">{LOCATION_INFO.broadcastEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F5F5DC] border border-[#004225]/15">
                  <div className="p-2.5 rounded-xl bg-[#004225] text-[#F5F5DC] shrink-0 shadow-sm">
                    <Clock className="w-5 h-5 text-[#FFB000]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#004225]">Visiting & Office Hours</h4>
                    <p className="text-xs text-[#004225]/80 mt-0.5">{LOCATION_INFO.officeHours}</p>
                    <p className="text-[11px] text-[#004225]/70">{LOCATION_INFO.studioHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FAF7EE] border border-[#004225]/15 p-6 sm:p-10 shadow-md space-y-6 text-[#004225]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#004225] text-xs font-black uppercase tracking-widest">
                  <MessageSquare className="w-4 h-4 text-[#FFB000]" />
                  <span>Send an Inquiry</span>
                </div>
                <h3 className="text-2xl font-black text-[#004225] tracking-tight">Editorial & General Message Desk</h3>
                <p className="text-xs text-[#004225]/75">
                  Fill out the form below. Messages are typically answered within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#004225] text-[#F5F5DC] text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7EE] text-[#004225] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#F5F5DC]">Message Received Successfully</h4>
                  <p className="text-xs text-[#FFCF9D] max-w-md mx-auto">
                    Thank you for contacting Fnote Tsidk Spiritual Media. Your dispatch has been routed to our editorial and studio team.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-xl bg-[#FAF7EE] text-[#004225] font-bold text-xs hover:bg-[#FFCF9D] transition-colors shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#004225]">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Deacon Solomon / Selamawit"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#004225]">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#004225]">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 9... / International"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#004225]">Inquiry Topic *</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] focus:outline-none focus:border-[#004225]"
                      >
                        <option value="editorial">Editorial Story Tip & News</option>
                        <option value="broadcast">Live TV & Broadcast Schedule</option>
                        <option value="peace">Peace & Dialogue Forum</option>
                        <option value="archive">Ge'ez Manuscript & Archive Research</option>
                        <option value="support">Donations & Charity Sponsorship</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#004225]">Message / Story Details *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please provide details regarding your message or inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#FFCF9D]" />
                        <span>{t.ui.sendMsg}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Location Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#004225] text-xs font-black uppercase tracking-widest">
            <MapPin className="w-4 h-4 text-[#FFB000]" />
            <span>Interactive Map & Location</span>
          </div>
          <LocationMap showDetails={true} />
        </div>
      </section>
    </div>
  );
}

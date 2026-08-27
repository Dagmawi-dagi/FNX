'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  LogIn, 
  CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 600);
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative overflow-hidden bg-[#F5F5DC]">
      <div className="relative w-full max-w-md bg-[#FAF7EE] border border-[#004225]/20 rounded-3xl p-8 sm:p-10 shadow-md space-y-6 text-[#004225]">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#004225] hover:text-[#005e35] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Media Portal</span>
        </Link>

        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#004225] flex items-center justify-center text-[#F5F5DC] mx-auto shadow-sm">
            <Sparkles className="w-6 h-6 text-[#FFB000]" />
          </div>
          <h1 className="text-2xl font-black text-[#004225] tracking-tight">Associate & Contributor Portal</h1>
          <p className="text-xs text-[#004225]/75">
            Sign in to submit sermons, liturgical field dispatches, or manage broadcast feeds.
          </p>
        </div>

        {success ? (
          <div className="p-6 rounded-2xl bg-[#004225] text-center space-y-2 animate-in fade-in text-[#F5F5DC]">
            <CheckCircle2 className="w-8 h-8 text-[#FFB000] mx-auto" />
            <h3 className="text-sm font-bold text-[#F5F5DC]">Authenticated Successfully</h3>
            <p className="text-xs text-[#FFCF9D]">Redirecting to editorial dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#004225]">Associate Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#004225]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@fnotetsidk.org"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#004225]">Access Key / Password</label>
                <a href="#" className="text-[11px] text-[#004225] font-semibold hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#004225]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F5DC] border border-[#004225]/20 text-xs text-[#004225] placeholder-[#004225]/50 focus:outline-none focus:border-[#004225]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[#004225] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#004225]/30 text-[#004225] focus:ring-0 bg-[#F5F5DC]"
                />
                <span>Remember this terminal</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#004225] hover:bg-[#005e35] text-[#F5F5DC] font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#FFCF9D]" />
                  <span>Sign In to Fnote Tsidk Desk</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-[#004225]/15 text-center space-y-2">
          <p className="text-[11px] text-[#004225]/80">
            Need contributor credentials?{' '}
            <Link href="/contact" className="text-[#004225] font-bold hover:underline">
              Submit Contributor Application
            </Link>
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#004225]/70">
            <ShieldCheck className="w-3.5 h-3.5 text-[#004225]" />
            <span>End-to-End Encrypted Media Desk</span>
          </div>
        </div>
      </div>
    </div>
  );
}

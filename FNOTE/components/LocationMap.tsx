'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Copy, Check, Clock, Phone, Building2 } from 'lucide-react';
import { LOCATION_INFO } from '@/utils/constants';
import { useLanguage } from '@/app/context/LanguageContext';

interface LocationMapProps {
  showDetails?: boolean;
  className?: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({ showDetails = true, className = '' }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${LOCATION_INFO.name}, ${LOCATION_INFO.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-[#004225]/20 bg-[#FAF7EE] shadow-md ${className}`}>
      {/* Map Header Header / Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#002816] bg-[#004225] px-6 py-4 text-[#F5F5DC]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#002816] text-[#FFB000] border border-[#FFCF9D]/30 shadow-sm">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#F5F5DC] tracking-wide text-base">{t.ui.findUs}</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#002816] px-2.5 py-0.5 text-[11px] font-bold text-[#FFCF9D] border border-[#FFCF9D]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FFB000] animate-pulse" />
                Open Today
              </span>
            </div>
            <p className="text-xs text-[#FFCF9D]">{LOCATION_INFO.landmark}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl border border-[#FFCF9D]/30 bg-[#002816] px-3.5 py-2 text-xs font-semibold text-[#F5F5DC] transition-all hover:bg-[#001c10] active:scale-95 shadow-sm"
            title="Copy address"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#FFB000]" />
                <span className="text-[#FFCF9D] font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#FFCF9D]" />
                <span>Copy Address</span>
              </>
            )}
          </button>

          <a
            href={LOCATION_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#FAF7EE] hover:bg-[#FFCF9D] px-4 py-2 text-xs font-bold text-[#004225] transition-all active:scale-95 shadow-sm"
          >
            <Navigation className="h-3.5 w-3.5 text-[#004225]" />
            <span>Get Directions</span>
            <ExternalLink className="h-3 w-3 opacity-75 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Embed Map Container */}
      <div className="relative h-72 sm:h-80 md:h-96 w-full bg-[#F5F5DC]">
        <iframe
          src={LOCATION_INFO.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'contrast(1.02)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Zema Headquarters Map in Kazanchis Addis Ababa"
          className="w-full h-full"
        />

        {/* Floating Badge */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm rounded-2xl border border-[#002816] bg-[#004225]/95 p-4 shadow-xl backdrop-blur-md text-[#F5F5DC]">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-[#002816] p-2 text-[#FFB000] border border-[#FFCF9D]/30 shrink-0">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFCF9D]">
                Central Broadcast Center
              </h4>
              <p className="text-xs font-semibold text-[#F5F5DC] leading-snug">
                {LOCATION_INFO.address}
              </p>
              <p className="text-[11px] text-[#FFCF9D]/80">
                GPS: {LOCATION_INFO.coordinates.lat}° N, {LOCATION_INFO.coordinates.lng}° E
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Grid */}
      {showDetails && (
        <div className="grid grid-cols-1 divide-y divide-[#004225]/15 sm:grid-cols-3 sm:divide-y-0 sm:divide-x border-t border-[#004225]/15 bg-[#FAF7EE] p-4 text-xs text-[#004225]">
          <div className="flex items-center gap-3 p-2">
            <Clock className="h-4 w-4 text-[#004225] shrink-0" />
            <div>
              <p className="font-semibold text-[#004225]">Office Hours</p>
              <p className="text-[#004225]/75">{LOCATION_INFO.officeHours}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <Phone className="h-4 w-4 text-[#004225] shrink-0" />
            <div>
              <p className="font-semibold text-[#004225]">Direct Phone</p>
              <p className="text-[#004225]/75">{LOCATION_INFO.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <MapPin className="h-4 w-4 text-[#004225] shrink-0" />
            <div>
              <p className="font-semibold text-[#004225]">Transit & Access</p>
              <p className="text-[#004225]/75">Kazanchis Light Rail & UNECA Station</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

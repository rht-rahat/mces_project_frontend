'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, MapPin, Tag, CheckCircle, Calendar } from 'lucide-react';
import { api } from '../../../hooks/useApi';

export default function PackageDetails({ params }) {
  const router = useRouter();
  
  // Await params using React's use() hook to handle async params in App Router robustly
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { data: pkg, isLoading, error } = useQuery({
    queryKey: ['package', id],
    queryFn: () => api.getPackage(id),
    enabled: !!id
  });

  const getImageUrl = (url) => {
    if (!url) return '';
    return url.startsWith('/') ? `http://localhost:5000${url}` : url;
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="text-sm font-semibold text-teal-800">লোড করা হচ্ছে...</span>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <span className="text-sm font-semibold text-rose-600">প্যাকেজটি খুঁজে পাওয়া যায়নি!</span>
        <Link href="/" className="text-xs text-teal-700 font-bold underline flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-slate-500 hover:text-teal-700 text-xs font-semibold mb-8 focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>পূর্ববর্তী পেজে ফিরে যান</span>
      </button>

      {/* Package Header Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Image and Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="h-96 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
            <img 
              src={getImageUrl(pkg.imageUrl)} 
              alt={pkg.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold rounded-lg flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>{pkg.destination}</span>
              </span>
              <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold rounded-lg flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>সময়কাল: {pkg.duration}</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
              {pkg.title}
            </h1>
            
            <p className="text-slate-650 text-xs md:text-sm leading-relaxed whitespace-pre-line pt-2">
              {pkg.description}
            </p>
          </div>

          {/* Itinerary */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="font-bold text-slate-800 text-base flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-teal-700" />
                <span>ভ্রমণ পরিকল্পনা (Detailed Itinerary):</span>
              </h3>
              
              <div className="space-y-4 relative pl-4 border-l border-slate-200 mt-4">
                {pkg.itinerary.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-teal-700 border-2 border-white shadow-sm" />
                    <p className="text-xs md:text-sm text-slate-700 font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Bookings card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border border-teal-50 shadow-xl sticky top-28 space-y-6">
            <div>
              <span className="text-xs text-slate-400 block font-semibold">প্যাকেজ রেট (জনপ্রতি)</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-extrabold text-teal-800">৳{pkg.price.toLocaleString('bn-BD')}</span>
                <span className="text-xs text-slate-400 font-medium">/ অল ইনক্লুসিভ</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800">প্যাকেজের অন্তর্ভুক্ত সেবাসমূহ:</h4>
              <ul className="space-y-2 text-slate-550 text-xs font-medium">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>২/৩ স্টার মানের হোটেল আবাসন</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>প্রতিদিনের সকালের নাস্তা</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>অভিজ্ঞ সাইটসিয়িং গাইড সাপোর্ট</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>এয়ারপোর্ট পিক অ্যান্ড ড্রপ সার্ভিস</span>
                </li>
              </ul>
            </div>

            {/* Book Now Button */}
            <Link
              href={`/#appointment-form?service=Tours&item=${encodeURIComponent(pkg.title)}`}
              className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold curvy-button shadow-md flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>প্যাকেজটি বুক করুন</span>
            </Link>

            <div className="text-center text-[10px] text-slate-400 pt-2">
              <p>বুকিং করার ২৪ ঘণ্টার মধ্যে আমাদের কনসালট্যান্ট কল করে বুকিং কনফার্ম করবে।</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

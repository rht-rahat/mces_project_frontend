'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Briefcase, MapPin, Globe, Users, ArrowLeft, Filter, BookOpen } from 'lucide-react';
import { api, getImageUrl } from '../../hooks/useApi';
import countries from '../../utils/countries';
import OptimizedImage from '../../components/OptimizedImage';
import useSEO from '../../hooks/useSEO';

function CircularsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useSEO({
    title: 'বিদেশে দক্ষ শ্রমিক রিক্রুটমেন্ট সার্কুলার',
    description: 'রোমানিয়া, জাপান ও মধ্যপ্রাচ্যে দক্ষ কর্মী নিয়োগের সর্বশেষ সার্কুলার দেখুন। নিরাপদ ও নির্ভরযোগ্য ক্যারিয়ার গড়তে ইউরোপ ও এশিয়ার বিভিন্ন দেশের নতুন সার্কুলার।',
    canonicalPath: '/circulars',
  });

  // Filters state
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [jobCategory, setJobCategory] = useState(searchParams.get('category') || '');
  const [selectedCirc, setSelectedCirc] = useState(null); // Detail view

  // Fetch circulars with filters
  const { data: circulars = [], isLoading } = useQuery({
    queryKey: ['circulars', country, jobCategory],
    queryFn: () => api.getCirculars({ country, jobCategory })
  });

  const categories = ['Construction', "Labor Worker", "Mason", "Carpenter", "Scaffolder", ' Civil Engineer', " Piping Engineer", "Civil Supervisor", 'Caregiver', 'Driving', 'Hospitality', 'IT/Engineering', "Civil Foreman", "Piping Supervisor", ' Piping Foreman', "Pipe Fitter", "Welder", "Plumber", "Helper"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Detail Modal / Overlay View */}
      {selectedCirc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCirc(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            {/* Image Header */}
            <div className="relative h-48 md:h-56 w-full bg-slate-100 overflow-hidden rounded-t-3xl">
              <OptimizedImage
                src={getImageUrl(selectedCirc.imageUrl)} 
                alt={selectedCirc.title}
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <button 
                onClick={() => setSelectedCirc(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-slate-900 rounded-full transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 rotate-90" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-800 text-[10px] font-bold rounded-full">
                    {selectedCirc.country}
                  </span>
                  <span className="px-3 py-1 bg-teal-600/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                    {selectedCirc.jobCategory}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-white leading-tight drop-shadow-sm">
                  {selectedCirc.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                  <Briefcase className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">বেতন পরিসীমা</p>
                  <p className="text-sm md:text-base font-extrabold text-teal-800">{selectedCirc.salaryRange}</p>
                </div>
              </div>

              {selectedCirc.description && (
                <div className="mb-8">
                  <h3 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-gradient-to-b from-teal-500 to-teal-300 rounded-full" />
                    <span>বিস্তারিত বিবরণ</span>
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl">
                    {selectedCirc.description}
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-gradient-to-b from-teal-500 to-teal-300 rounded-full" />
                  <span>প্রয়োজনীয় যোগ্যতাসমূহ</span>
                </h3>
                <ul className="space-y-2.5 text-slate-500 text-xs md:text-sm">
                  {selectedCirc.requirements?.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedCirc(null)}
                  className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 text-xs font-semibold rounded-xl transition-all"
                >
                  বন্ধ করুন
                </button>
                <a 
                  href="/#appointment-form"
                  onClick={() => setSelectedCirc(null)}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  আবেদন করুন
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-xs font-semibold mb-5">
          <Briefcase className="w-3.5 h-3.5" />
          <span>সার্কুলার লিস্ট</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
          বিদেশে দক্ষ শ্রমিক<br className="md:hidden" /> রিক্রুটমেন্ট সার্কুলার
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-teal-600 to-teal-400 mx-auto mt-5 rounded-full" />
        <p className="text-slate-400 mt-4 text-xs md:text-sm max-w-2xl mx-auto">নিরাপদ ও নির্ভরযোগ্য ক্যারিয়ার গড়তে ইউরোপ ও এশিয়ার বিভিন্ন দেশের নতুন সার্কুলারগুলো ফিল্টার করে দেখুন।</p>
      </div>

      {/* Filter Options */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
          <div className="p-2 bg-teal-50 rounded-lg">
            <Filter className="w-4 h-4 text-teal-700" />
          </div>
          <span>ফিল্টার</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 bg-white min-w-[170px] transition-all"
            aria-label="Country filter"
          >
            <option value="">সকল দেশ</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={jobCategory}
            onChange={(e) => setJobCategory(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 bg-white min-w-[170px] transition-all"
            aria-label="Job category filter"
          >
            <option value="">সকল ক্যাটাগরি</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      {isLoading ? (
        <div className="text-center py-20">
          <span className="text-sm font-semibold text-teal-800">লোড করা হচ্ছে...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {circulars.map((circ) => (
            <div
              key={circ._id || circ.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-52 md:h-60 w-full bg-slate-100 overflow-hidden">
                <OptimizedImage
                  src={getImageUrl(circ.imageUrl)}
                  alt={circ.title}
                  containerClassName="w-full h-full"
                  className="group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-800 text-[10px] font-bold rounded-full shadow-sm">
                    {circ.country}
                  </span>
                  <span className="px-3 py-1 bg-teal-700/90 backdrop-blur-sm text-white text-[10px] font-bold rounded-full shadow-sm">
                    {circ.jobCategory}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm md:text-lg leading-snug line-clamp-2 group-hover:text-teal-700 transition-colors">
                    {circ.title}
                  </h3>
                  {circ.description && (
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {circ.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-teal-800 font-extrabold text-xs bg-teal-50 py-1.5 px-3 rounded-lg border border-teal-100">
                      বেতন: {circ.salaryRange}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCirc(circ)}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1"
                  >
                    <span>বিস্তারিত দেখুন</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </button>
                  <a
                    href="/#appointment-form"
                    className="px-5 py-2.5 bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow-md transition-all"
                  >
                    আবেদন ফরম
                  </a>
                </div>
              </div>
            </div>
          ))}

          {circulars.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="p-3 bg-slate-50 rounded-full w-fit mx-auto mb-4">
                <Briefcase className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-slate-400 text-sm font-medium">এই ফিল্টারে কোনো সার্কুলার খুঁজে পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default function Circulars() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <span className="text-sm font-semibold text-teal-800">লোডিং হচ্ছে...</span>
      </div>
    }>
      <CircularsContent />
    </Suspense>
  );
}

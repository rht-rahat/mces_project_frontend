'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, User, Calendar, BookOpen } from 'lucide-react';
import { api, getImageUrl } from '../../../hooks/useApi';

export default function BlogDetails({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => api.getBlog(id),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="text-sm font-semibold text-teal-800">লোড করা হচ্ছে...</span>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <span className="text-sm font-semibold text-rose-600">ব্লগটি খুঁজে পাওয়া যায়নি!</span>
        <Link href="/" className="text-xs text-teal-700 font-bold underline flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-slate-500 hover:text-teal-700 text-xs font-semibold mb-8 focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>পূর্ববর্তী পেজে ফিরে যান</span>
      </button>

      <article className="space-y-6">
        {/* Cover image */}
        <div className="h-[400px] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
          <img 
            src={getImageUrl(blog.imageUrl)} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Metadata */}
        <div className="flex items-center space-x-4 text-xs text-slate-400">
          <span className="flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span>পোস্ট করেছেন: {blog.author}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>
              {new Date(blog.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight">
          {blog.title}
        </h1>

        {/* Divider */}
        <div className="h-0.5 w-16 bg-teal-700 rounded-full" />

        {/* Content */}
        <p className="text-slate-650 text-xs md:text-sm leading-relaxed whitespace-pre-line pt-4 font-light">
          {blog.content}
        </p>

      </article>
    </div>
  );
}

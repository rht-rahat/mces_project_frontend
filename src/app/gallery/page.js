"use client";

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../hooks/useApi';
import { Maximize2, X, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from '../../components/Pagination';
import OptimizedImage from '../../components/OptimizedImage';
import useSEO from '../../hooks/useSEO';

const Gallery = () => {
  useSEO({
    title: 'ফটো গ্যালারি',
    description: 'MCES International Overseas Travel Agency এর ফটো গ্যালারি। আমাদের মেমোরিজ ও ইভেন্টের ছবি দেখুন।',
    canonicalPath: '/gallery',
  });

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['publicGallery'],
    queryFn: api.getGallery,
  });

  const totalPages = Math.max(1, Math.ceil(images.length / perPage));
  const paginatedImages = useMemo(() => {
    const start = (page - 1) * perPage;
    return images.slice(start, start + perPage);
  }, [images, page, perPage]);

  useEffect(() => {
    setPage(1);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const handleKey = useCallback((e) => {
    if (selectedIndex === null) return;
    if (e.key === 'Escape') setSelectedIndex(null);
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  }, [selectedIndex, handlePrev, handleNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-teal-600"></div>
      </div>
    );
  }

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="text-teal-600 font-bold text-xs uppercase tracking-widest px-3 py-1 bg-teal-50 rounded-full">আওয়ার মেমোরিজ</span>
        <h1 className="text-3xl font-extrabold text-slate-800 mt-2">ফটো গ্যালারি</h1>
        <div className="h-1 w-10 bg-teal-600 mx-auto mt-3 rounded-full" />
      </div>

      {images.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedImages.map((item, idx) => {
            const actualIndex = (page - 1) * perPage + idx;
            const isFeatured = actualIndex % 5 === 0;
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedIndex(actualIndex)}
                className={`group relative overflow-hidden rounded-3xl bg-white border shadow-sm cursor-zoom-in ${
                  isFeatured ? 'md:col-span-2 md:row-span-2 h-[340px] md:h-[460px]' : 'h-[220px]'
                }`}
              >
                <OptimizedImage src={item.imageUrl} alt={item.title} containerClassName="w-full h-full" className="group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between text-white">
                    <h3 className="font-bold text-sm truncate">{item.title}</h3>
                    <Maximize2 className="w-4 h-4 text-teal-400" />
                  </div>
                  {item.description && <p className="text-slate-300 text-xs mt-1 line-clamp-2">{item.description}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400"><ImageIcon className="w-8 h-8 mx-auto mb-2" /><span>গ্যালারিতে কোনো ছবি নেই।</span></div>
      )}

      {images.length > 0 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Close */}
            <button onClick={() => setSelectedIndex(null)} className="absolute top-6 right-6 z-10 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Close lightbox">
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 z-10 px-3 py-1.5 bg-white/10 text-white/80 text-xs font-semibold rounded-full" aria-live="polite">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full text-center"
            >
              <OptimizedImage
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill={false}
                width={800}
                height={600}
                containerClassName="max-h-[75vh] mx-auto"
                className="rounded-xl shadow-2xl object-contain"
              />
              <h2 className="text-white font-bold text-lg mt-4">{selectedImage.title}</h2>
              {selectedImage.description && <p className="text-slate-400 text-sm mt-1">{selectedImage.description}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

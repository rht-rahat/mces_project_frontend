'use client';

import Image from 'next/image';
import { useState } from 'react';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#e2e8f0"/>
  <rect x="0" y="0" width="${w}" height="${h}" fill="url(#g)"/>
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e2e8f0" stop-opacity="1"/>
      <stop offset="50%" stop-color="#f1f5f9" stop-opacity="1"/>
      <stop offset="100%" stop-color="#e2e8f0" stop-opacity="1"/>
    </linearGradient>
  </defs>
</svg>`;

const toBase64 = (str) => typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export default function OptimizedImage({ src, alt, className, containerClassName, priority = false, fill = true, width, height, aspectRatio, sizes }) {
  const [error, setError] = useState(false);

  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  if (!src || error) {
    return (
      <div className={`bg-slate-100 flex items-center justify-center ${containerClassName || ''}`}>
        <span className="text-slate-300 text-xs">No image</span>
      </div>
    );
  }

  const imgProps = {
    src,
    alt: alt || '',
    className: `object-cover ${className || ''}`,
    priority,
    sizes: defaultSizes,
    onError: () => setError(true),
    placeholder: 'blur',
    blurDataURL: `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`,
  };

  if (fill) {
    return (
      <div className={`relative overflow-hidden ${containerClassName || ''}`} style={aspectRatio ? { aspectRatio } : undefined}>
        <Image {...imgProps} fill />
      </div>
    );
  }

  return (
    <Image {...imgProps} width={width} height={height} className={imgProps.className} />
  );
}

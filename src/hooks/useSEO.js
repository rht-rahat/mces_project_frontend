import { useEffect } from 'react';

export default function useSEO({ title, description, ogImage, canonicalPath }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | MCES International`;
    }

    const setMeta = (name, content, property = false) => {
      if (!content) return;
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (property) {
          el.setAttribute('property', name);
        } else {
          el.setAttribute('name', name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);

    if (ogImage) {
      setMeta('og:image', ogImage, true);
    }

    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', `${window.location.origin}${canonicalPath}`);
    }
  }, [title, description, ogImage, canonicalPath]);
}

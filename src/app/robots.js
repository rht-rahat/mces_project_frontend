export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/user-dashboard/', '/api/'],
      },
    ],
    sitemap: 'https://www.mcesbd.com/sitemap.xml',
  };
}

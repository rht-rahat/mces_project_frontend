export default async function sitemap() {
  const siteUrl = 'https://www.mcesbd.com';

  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/circulars`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  let blogRoutes = [];
  let packageRoutes = [];

  try {
    const [blogsRes, packagesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://mces-project-backend.vercel.app/api'}/blogs`).catch(() => null),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://mces-project-backend.vercel.app/api'}/packages`).catch(() => null),
    ]);

    if (blogsRes?.ok) {
      const blogs = await blogsRes.json();
      blogRoutes = (blogs || []).map((blog) => ({
        url: `${siteUrl}/blogs/${blog._id || blog.id}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }

    if (packagesRes?.ok) {
      const packages = await packagesRes.json();
      packageRoutes = (packages || []).map((pkg) => ({
        url: `${siteUrl}/packages/${pkg._id || pkg.id}`,
        lastModified: new Date(pkg.updatedAt || pkg.createdAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch {}

  return [...staticRoutes, ...blogRoutes, ...packageRoutes];
}

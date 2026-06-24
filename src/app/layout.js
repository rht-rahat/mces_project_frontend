import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiveChat from '../components/LiveChat';
import JsonLd from '../components/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mcesbd.com';

export const metadata = {
  title: {
    default: 'MCES INTERNATIONAL OVERSEAS TRAVEL AGENCY - বিদেশে নিয়োগ ও পাসপোর্ট ম্যানেজমেন্ট সিস্টেম',
    template: '%s | MCES International',
  },
  description: 'দক্ষ শ্রমিক পাঠানো, বিদেশের বিশ্ববিদ্যালয়ে উচ্চশিক্ষা ভর্তি, নেপাল-শ্রীলঙ্কা ট্যুর প্যাকেজ ও পাসপোর্ট ট্র্যাকিং সুবিধা সংবলিত বিশ্বস্ত প্ল্যাটফর্ম।',
  keywords: ['MCES', 'overseas travel agency', 'বিদেশে নিয়োগ', 'দক্ষ শ্রমিক', 'পাসপোর্ট ট্র্যাকিং', 'ট্যুর প্যাকেজ', 'উচ্চশিক্ষা', 'Skilled labor recruitment', 'Bangladesh overseas employment', 'Romania job', 'Japan job', 'Nepal tour', 'Sri Lanka tour'],
  authors: [{ name: 'MCES International', url: siteUrl }],
  creator: 'MCES International',
  publisher: 'MCES International',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: 'MCES International',
    title: 'MCES INTERNATIONAL OVERSEAS TRAVEL AGENCY - বিদেশে নিয়োগ ও পাসপোর্ট ম্যানেজমেন্ট সিস্টেম',
    description: 'দক্ষ শ্রমিক পাঠানো, বিদেশের বিশ্ববিদ্যালয়ে উচ্চশিক্ষা ভর্তি, নেপাল-শ্রীলঙ্কা ট্যুর প্যাকেজ ও পাসপোর্ট ট্র্যাকিং সুবিধা সংবলিত বিশ্বস্ত প্ল্যাটফর্ম।',
    images: [
      {
        url: '/logo.jpeg',
        width: 800,
        height: 600,
        alt: 'MCES International',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCES International - Overseas Travel & Recruitment Agency',
    description: 'Skilled labor recruitment, overseas education, tour packages & passport tracking platform.',
    images: ['/logo.jpeg'],
    creator: '@mcesbd',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MCES International Overseas Travel Agency',
    url: siteUrl,
    logo: `${siteUrl}/logo.jpeg`,
    description: 'দক্ষ শ্রমিক পাঠানো, বিদেশের বিশ্ববিদ্যালয়ে উচ্চশিক্ষা ভর্তি, নেপাল-শ্রীলঙ্কা ট্যুর প্যাকেজ ও পাসপোর্ট ট্র্যাকিং সুবিধা সংবলিত বিশ্বস্ত প্ল্যাটফর্ম।',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-1789-650969',
      contactType: 'customer service',
      availableLanguage: ['Bengali', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Liton Khan Shopping Complex (3rd Floor), Palash',
      addressLocality: 'Narsingdi',
      addressRegion: 'Dhaka',
      postalCode: '1610',
      addressCountry: 'BD',
    },
    sameAs: [
      'https://facebook.com/mcesbd',
      'https://wa.me/8801789650969',
    ],
  };

  return (
    <html lang="bn" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://mces-project-backend.vercel.app" />
        <link rel="dns-prefetch" href="https://mces-project-backend.vercel.app" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <LiveChat />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

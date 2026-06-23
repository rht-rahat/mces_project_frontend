import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiveChat from '../components/LiveChat';

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

export const metadata = {
  title: 'MCES INTERNATIONAL OVERSEAS TRAVEL AGENCY  - বিদেশে নিয়োগ ও পাসপোর্ট ম্যানেজমেন্ট সিস্টেম',
  description: 'দক্ষ শ্রমিক পাঠানো, বিদেশের বিশ্ববিদ্যালয়ে উচ্চশিক্ষা ভর্তি, নেপাল-শ্রীলঙ্কা ট্যুর প্যাকেজ ও পাসপোর্ট ট্র্যাকিং সুবিধা সংবলিত বিশ্বস্ত প্ল্যাটফর্ম।',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${inter.variable} ${outfit.variable}`}>
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

import Link from 'next/link';
import { Globe, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-teal-600 text-white rounded-tr-lg rounded-bl-lg">
                {/* <Globe className="w-5 h-5" /> */}
                <Image width={56} height={56} src="/logo.jpeg" alt="MCES International logo" className="w-12 h-12" />
              </div>
              <span className="text-xl font-bold text-white">MCES INTERNATIONAL</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              A modern trusted platform for skilled labor recruitment, overseas education, tour package booking & passport services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/circulars" className="hover:text-teal-400 transition-colors">Job Circulars</Link>
              </li>
              <li>
                <Link href="/#tour-packages" className="hover:text-teal-400 transition-colors">Tour Packages</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-teal-400 transition-colors">Photo Gallery</Link>
              </li>
              <li>
                <Link href="/#passport-track" className="hover:text-teal-400 transition-colors">Passport Tracking</Link>
              </li>
              <li>
                <Link href="/#blogs" className="hover:text-teal-400 transition-colors">Blog & News</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Visa Processing Service</li>
              <li>Overseas Education Admission</li>
              <li>Passport Management</li>
              <li>Live Consultant Support</li>
            </ul>
          </div>

          {/* Office details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Office Details</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                <span>Liton Khan Shopping Complex (3rd Floor), Palash, Narsingdi, Dhaka 1610</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span>+880 1789-650969</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span>info@mcesbd.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>WhatsApp: +880 1789-650969</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MCES INTERNATIONAL OVERSEAS TRAVEL AGENCY. All rights reserved. Developed By: Rahat</p>
        </div>
      </div>
    </footer>
  );
}

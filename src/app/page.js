"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Map,
  FileText,
  CheckSquare,
  Phone,
  UserCheck,
  ShieldCheck,
  Star,
  Calendar,
  ArrowRight,
  Search,
  Eye,
  Download,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { api, getImageUrl } from "../hooks/useApi";
import SliderBanner from "../components/SliderBanner";
import { showToast } from "../utils/swal";
import Pagination from "../components/Pagination";
import OptimizedImage from "../components/OptimizedImage";
import useSEO from "../hooks/useSEO";

export default function Home() {
  useSEO({
    title: 'MCES INTERNATIONAL OVERSEAS TRAVEL AGENCY',
    description: 'দক্ষ শ্রমিক পাঠানো, বিদেশের বিশ্ববিদ্যালয়ে উচ্চশিক্ষা ভর্তি, নেপাল-শ্রীলঙ্কা ট্যুর প্যাকেজ ও পাসপোর্ট ট্র্যাকিং সুবিধা সংবলিত বিশ্বস্ত প্ল্যাটফর্ম।',
    canonicalPath: '/',
  });
  // 1. Fetching dynamic items
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: api.getPackages,
  });

  const { data: circulars = [] } = useQuery({
    queryKey: ["circulars"],
    queryFn: api.getCirculars,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: api.getReviews,
  });

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: api.getBlogs,
  });

  // Pagination states
  const [pkgPage, setPkgPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);
  const pkgsPerPage = 6;
  const blogsPerPage = 4;

  const pkgTotalPages = Math.max(1, Math.ceil(packages.length / pkgsPerPage));
  const paginatedPackages = useMemo(() => {
    const start = (Math.min(pkgPage, pkgTotalPages) - 1) * pkgsPerPage;
    return packages.slice(start, start + pkgsPerPage);
  }, [packages, pkgPage, pkgsPerPage, pkgTotalPages]);

  const blogTotalPages = Math.max(1, Math.ceil(blogs.length / blogsPerPage));
  const paginatedBlogs = useMemo(() => {
    const start = (Math.min(blogPage, blogTotalPages) - 1) * blogsPerPage;
    return blogs.slice(start, start + blogsPerPage);
  }, [blogs, blogPage, blogsPerPage, blogTotalPages]);

  useEffect(() => { setPkgPage(1); }, [packages.length]);
  useEffect(() => { setBlogPage(1); }, [blogs.length]);

  // 2. Tracking State
  const [trackNumber, setTrackNumber] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState("");
  const [isTrackLoading, setIsTrackLoading] = useState(false);

  const handleTrackPassport = async (e) => {
    e.preventDefault();
    if (!trackNumber.trim()) return;

    setIsTrackLoading(true);
    setTrackError("");
    setTrackResult(null);

    try {
      const res = await api.trackPassport(trackNumber);
      setTrackResult(res);
    } catch (err) {
      setTrackError(
        err.message ||
          "পাসপোর্ট খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক নাম্বার দিন।",
      );
    } finally {
      setIsTrackLoading(false);
    }
  };

  // 3. Appointment Form State
  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentEmail, setAppointmentEmail] = useState("");
  const [appointmentPhone, setAppointmentPhone] = useState("");
  const [appointmentService, setAppointmentService] = useState("Skilled Labor");
  const [appointmentMsg, setAppointmentMsg] = useState("");
  const [appointmentSuccess, setAppointmentSuccess] = useState("");
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setIsSubmittingAppointment(true);
    setAppointmentSuccess("");

    try {
      const res = await api.submitContact({
        name: appointmentName,
        email: appointmentEmail,
        phone: appointmentPhone,
        message: appointmentMsg,
        type: "appointment",
        serviceName: appointmentService,
      });
      setAppointmentSuccess(res.message);
      setAppointmentName("");
      setAppointmentEmail("");
      setAppointmentPhone("");
      setAppointmentMsg("");
      showToast('success', "আপনার অ্যাপয়েন্টমেন্ট সফলভাবে জমা দেওয়া হয়েছে।");
    } catch (err) {
      showToast('error', "সরাসরি নোটিফিকেশন পাঠাতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setIsSubmittingAppointment(false);
    }
  };

  // 4. Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setContactSuccess("");

    try {
      const res = await api.submitContact({
        name: contactName,
        email: contactEmail,
        message: contactMsg,
        type: "contact",
      });
      setContactSuccess(res.message);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
      showToast('success', "আপনার বার্তা সফলভাবে পাঠানো হয়েছে।");
    } catch (err) {
      showToast('error', "যোগাযোগ ফর্ম পাঠাতে সমস্যা হয়েছে।");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const services = [
    {
      title: "দক্ষ শ্রমিক নিয়োগ",
      icon: Briefcase,
      color: "bg-emerald-50 text-emerald-700",
      description:
        "রোমানিয়া, জাপান ও মধ্যপ্রাচ্যে দক্ষ কর্মী নিয়োগ। সম্পূর্ণ বিশ্বস্ত রিক্রুটিং চ্যানেল ও ভিসা নিশ্চিতকরণ।",
      consultant: "কনসালট্যান্ট: রুবেল (+880 1789-650969)",
      link: "/circulars",
    },
    {
      title: "বিদেশে ভর্তি ও উচ্চশিক্ষা",
      icon: GraduationCap,
      color: "bg-indigo-50 text-indigo-700",
      description:
        "যুক্তরাজ্য, ইউরোপ, ইউএসএ ও কানাডার শীর্ষ বিশ্ববিদ্যালয়সমূহে ভর্তির আবেদন, স্কলারশিপ ও ভিসা প্রসেসিং।",
      consultant: "কনসালট্যান্ট: রাহাত (+880 1627-462766)",
      link: "#appointment-form",
    },
    {
      title: "ট্যুর প্যাকেজ বুকিং",
      icon: Map,
      color: "bg-amber-50 text-amber-700",
      description:
        "নেপাল, শ্রীলঙ্কা, ভারত, কক্সবাজার, সুন্দরবন ও বান্দরবনের লাক্সারি এবং বাজেট ফ্রেন্ডলি ট্রাভেল প্ল্যান।",
      consultant: "কনসালট্যান্ট: রুবেল (+880 1789-650969)",
      link: "#tour-packages",
    },
    // {
    //   title: 'ভিসা প্রসেসিং ও ডকুমেন্টেশন',
    //   icon: FileText,
    //   color: 'bg-rose-50 text-rose-700',
    //   description: 'ভিসা ফরম পূরণ, ব্যাংক স্টেটমেন্ট রেডি ও ইন্টারভিউ প্রিপারেশন গাইডলাইনসহ সম্পূর্ণ ভিসা প্রসেসিং অ্যাসিস্ট্যান্স।',
    //   consultant: 'কনসালট্যান্ট: সাবিনা ইয়াসমিন (+৮৮০১৭১২-৩৩৪৪৫৫)',
    //   link: '#appointment-form'
    // },
    // {
    //   title: 'পাসপোর্ট ট্র্যাকিং ও ম্যানেজমেন্ট',
    //   icon: CheckSquare,
    //   color: 'bg-teal-50 text-teal-700',
    //   description: 'আপনার জমা দেওয়া পাসপোর্ট এবং ফাইলের সঠিক অবস্থান ও আপডেট জানুন আমাদের লাইভ ট্র্যাকার প্যানেলে।',
    //   consultant: 'কনসালট্যান্ট: জাহিদ হাসান (+৮৮০১৭১২-৫৫৬৬৭৭)',
    //   link: '#passport-track'
    // }
  ];

  return (
    <div className="bg-teal-50/20">
      {/* 1. Homepage Slider Banner */}
      <SliderBanner />

      {/* 2. Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Our Services
          </h2>
          <div className="h-1 w-20 bg-teal-700 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 mt-4 text-sm md:text-base leading-relaxed">
            MCES INTERNATIONAL OVERSEAS TRAVEL AGENCY provides trusted & transparent skilled labor
            recruitment, overseas education consultancy, tour packages, and
            fastest visa processing services.
          </p>
        </div>

        {/* Curvy cards with interactive states */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 curvy-card border border-teal-50 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`p-4 rounded-2xl w-fit ${srv.color} mb-6 shadow-sm`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {srv.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <div className="text-xs font-semibold text-teal-800 mb-4 bg-teal-50/50 py-2 px-3 rounded-lg flex items-center space-x-1.5">
                    <UserCheck className="w-4 h-4 text-teal-700 flex-shrink-0" />
                    <span className="truncate">{srv.consultant}</span>
                  </div>
                  <Link
                    href={srv.link}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center space-x-1 hover:translate-x-1 transition-transform"
                  >
                    <span>বিস্তারিত দেখুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Passport Live Tracking Widget */}
      <section
        id="passport-track"
        className="bg-gradient-to-r from-teal-900 via-teal-850 to-emerald-900 text-white py-20 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-700/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-emerald-600/20 rounded-full blur-2xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              পাসপোর্ট ও ফাইল লাইভ ট্র্যাকিং
            </h2>
            <p className="text-teal-200 mt-3 text-xs md:text-sm">
              আপনার আবেদন ফাইলটির বর্তমান অবস্থা জানতে পাসপোর্ট নাম্বার দিয়ে
              সার্চ করুন।
            </p>
          </div>

          {/* Tracking Form */}
          <form
            onSubmit={handleTrackPassport}
            className="max-w-lg mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex shadow-lg"
          >
            <input
              type="text"
              required
              placeholder="আপনার পাসপোর্ট নাম্বার লিখুন (যেমন: EE1234567)"
              value={trackNumber}
              onChange={(e) => setTrackNumber(e.target.value)}
              className="flex-1 px-4 py-3 bg-transparent placeholder-teal-200 text-white rounded-xl text-xs md:text-sm focus:outline-none"
            />
            <button
              type="submit"
              disabled={isTrackLoading}
              className="px-6 py-3 bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs md:text-sm curvy-button shadow-md flex items-center space-x-1.5 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>
                {isTrackLoading ? "ট্র্যাকিং হচ্ছে..." : "ট্র্যাক করুন"}
              </span>
            </button>
          </form>

          {/* Track Results */}
          {trackError && (
            <div className="mt-6 max-w-md mx-auto p-4 bg-rose-500/20 border border-rose-400/40 text-rose-200 rounded-xl text-xs">
              {trackError}
            </div>
          )}

          {trackResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 max-w-md mx-auto bg-white text-slate-800 p-6 rounded-2xl shadow-xl text-left border border-teal-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm md:text-base">
                  পাসপোর্ট স্থিতি রিপোর্ট
                </h4>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    trackResult.status === "Approved"
                      ? "bg-emerald-100 text-emerald-800"
                      : trackResult.status === "Rejected"
                        ? "bg-rose-100 text-rose-800"
                        : trackResult.status === "In Process"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {trackResult.status}
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">নাম:</span>
                  <span className="font-semibold text-slate-800">
                    {trackResult.holderName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">পাসপোর্ট নাম্বার:</span>
                  <span className="font-semibold text-slate-800 font-mono">
                    {trackNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">জমা দেওয়ার তারিখ:</span>
                  <span className="font-semibold text-slate-800">
                    {trackResult.submissionDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">দেশ (Country):</span>
                  <span className="font-semibold text-slate-800">
                    {trackResult.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">সর্বশেষ আপডেট:</span>
                  <span className="font-semibold text-slate-800">
                    {new Date(trackResult.updatedAt).toLocaleDateString(
                      "bn-BD",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </span>
                </div>
              </div>

              {/* Status Stepper visualization */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between relative">
                  {["Submitted", "In Process", "Approved"].map((st, i) => {
                    const statuses = [
                      "Submitted",
                      "In Process",
                      "Approved",
                      "Rejected",
                    ];
                    const currentIdx = statuses.indexOf(trackResult.status);
                    const stepIdx = statuses.indexOf(st);

                    const isCompleted = currentIdx >= stepIdx;
                    const isRejectedStep =
                      trackResult.status === "Rejected" && st === "Approved";

                    return (
                      <div
                        key={st}
                        className="flex flex-col items-center flex-1 relative z-10"
                      >
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isRejectedStep
                              ? "bg-rose-100 text-rose-800"
                              : isCompleted
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {isRejectedStep ? "X" : i + 1}
                        </div>
                        <span className="text-[10px] mt-1.5 text-slate-500 font-semibold">
                          {st}
                        </span>
                      </div>
                    );
                  })}
                  {/* Line connector */}
                  <div className="absolute top-3 left-0 right-0 h-0.5 bg-slate-100 -z-0" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. Tour Packages Section */}
      <section
        id="tour-packages"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Best Tour Packages
          </h2>
          <div className="h-1 w-20 bg-teal-700 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 mt-4 text-xs md:text-sm">
            Explore the most exciting domestic & international tour packages.
            Book newly added packages in real-time!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(packages.length > 0 ? paginatedPackages : []).map((pkg, idx) => (
            <motion.div
              key={pkg._id || pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden border border-teal-50 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Package Image */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                <OptimizedImage
                  src={getImageUrl(pkg.imageUrl)}
                  alt={pkg.title}
                  containerClassName="w-full h-full"
                  className="transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-3 right-3 px-3 py-1 bg-teal-700 text-white text-[10px] font-bold rounded-full shadow-sm">
                  {pkg.destination}
                </span>
              </div>

              {/* Package Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mb-4">
                    <span>সময়কাল: {pkg.duration}</span>
                  </div>
                  <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      প্যাকেজ মূল্য
                    </span>
                    <span className="text-base font-extrabold text-teal-800">
                      ৳{pkg.price.toLocaleString("bn-BD")}
                    </span>
                  </div>
                  <Link
                    href={`/packages/${pkg._id || pkg.id}`}
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold curvy-button shadow-sm"
                  >
                    বুক করুন
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {packages.length === 0 && (
            <div className="col-span-full text-center py-12 text-sm text-slate-400 bg-white border border-teal-50 rounded-2xl">
              লোকাল ফাইলে সিড করা প্যাকেজসমূহ পেতে সার্ভার চালু থাকা নিশ্চিত
              করুন।
            </div>
          )}
        </div>

        {packages.length > 0 && (
          <Pagination currentPage={pkgPage} totalPages={pkgTotalPages} onPageChange={setPkgPage} />
        )}
      </section>

      {/* 5. Skilled Labor Circulars Section */}
      <section className="bg-slate-50 py-20 border-y border-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              New Circulars & Job News
            </h2>
            <div className="h-1 w-20 bg-teal-700 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 mt-4 text-xs md:text-sm">
              Apply for overseas jobs through government & private recruiting
              agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(circulars.length > 0 ? circulars : [])
              .slice(0, 4)
              .map((circ, idx) => (
                <motion.div
                  key={circ._id || circ.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl border border-teal-50 shadow-sm flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 hover:shadow-md transition-shadow"
                >
                  {/* Circular image */}
                  <div className="w-full md:w-36 h-28 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                    <OptimizedImage
                      src={getImageUrl(circ.imageUrl)}
                      alt={circ.title}
                      containerClassName="w-full h-full"
                    />
                  </div>

                  {/* Circular Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-md text-[9px] font-bold">
                          {circ.country}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {circ.jobCategory}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-1">
                        {circ.title}
                      </h3>
                      <p className="text-teal-800 font-extrabold text-xs mt-1">
                        বেতন: {circ.salaryRange}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        href={`/circulars?id=${circ._id || circ.id}`}
                        className="text-xs font-bold text-teal-700 hover:text-teal-900"
                      >
                        যোগ্যতা ও বিবরণ
                      </Link>
                      <a
                        href="#appointment-form"
                        className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-[10px] font-semibold curvy-button shadow-sm"
                      >
                        আবেদন ফরম
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/circulars"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-teal-200 text-teal-800 hover:bg-teal-50 text-xs font-bold curvy-button transition-colors"
            >
              <span>সকল কাজের সার্কুলার দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Appointment Form Section */}
      <section
        id="appointment-form"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Form info */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold rounded-full uppercase">
              বুকিং প্যানেল
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
              আমাদের অভিজ্ঞ কনসালট্যান্টের সাথে সরাসরি অ্যাপয়েন্টমেন্ট নিন
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">
              আপনি কি দক্ষ শ্রমিক হিসেবে কাজ করতে বিদেশে যেতে চান? অথবা বিদেশের
              স্বনামধন্য বিশ্ববিদ্যালয়ে ভর্তি হতে চান? আমাদের সংশ্লিষ্ট
              ডিপার্টমেন্টের প্রফেশনাল কনসালট্যান্টদের সাথে কথা বলতে নিচের ফরমটি
              পূরণ করুন।
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    সুবিধাজনক সিডিউল নির্বাচন
                  </h4>
                  <p className="text-xs text-slate-500">
                    আপনার পছন্দ অনুযায়ী দিন ও সময় নির্ধারণ করতে পারবেন।
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    নিরাপদ ও নির্ভরযোগ্য সেবা
                  </h4>
                  <p className="text-xs text-slate-500">
                    আপনার সকল তথ্য সম্পূর্ণ গোপন এবং নিরাপদ থাকবে।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Widget */}
          <div className="bg-white p-8 curvy-card border border-teal-50 shadow-xl">
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              অ্যাপয়েন্টমেন্ট বুকিং ফরম
            </h3>

            {appointmentSuccess && (
              <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 text-xs rounded-xl font-bold">
                {appointmentSuccess}
              </div>
            )}

            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={appointmentName}
                    onChange={(e) => setAppointmentName(e.target.value)}
                    className="w-full px-4 py-2 text-xs border border-slate-200 curvy-input focus:outline-none focus:border-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    মোবাইল নাম্বার *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="মোবাইল নাম্বার"
                    value={appointmentPhone}
                    onChange={(e) => setAppointmentPhone(e.target.value)}
                    className="w-full px-4 py-2 text-xs border border-slate-200 curvy-input focus:outline-none focus:border-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  ইমেইল এড্রেস *
                </label>
                <input
                  type="email"
                  required
                  placeholder="আপনার ইমেইল"
                  value={appointmentEmail}
                  onChange={(e) => setAppointmentEmail(e.target.value)}
                  className="w-full px-4 py-2 text-xs border border-slate-200 curvy-input focus:outline-none focus:border-teal-700"
                />
              </div>

              <div>
                <label htmlFor="appointment-department" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  ডিপার্টমেন্ট নির্বাচন করুন
                </label>
                <select
                  id="appointment-department"
                  value={appointmentService}
                  onChange={(e) => setAppointmentService(e.target.value)}
                  className="w-full px-4 py-2 text-xs border border-slate-200 curvy-input focus:outline-none focus:border-teal-700 bg-white"
                >
                  <option value="Skilled Labor">
                    দক্ষ শ্রমিক নিয়োগ (Work Permit)
                  </option>
                  <option value="Study Abroad">
                    বিদেশে উচ্চশিক্ষা (Study Abroad)
                  </option>
                  <option value="Tour Packages">
                    ট্যুর প্যাকেজ বুকিং (Tours)
                  </option>
                  <option value="Visa Processing">
                    ভিসা প্রসেসিং সেবা (Visa)
                  </option>
                  <option value="Passport Management">
                    পাসপোর্ট ও ফাইল ট্র্যাকিং (Passport)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  আপনার মেসেজ/প্রশ্ন *
                </label>
                <textarea
                  required
                  rows="3"
                  placeholder="আপনার চাহিদা বা প্রশ্নটি লিখুন..."
                  value={appointmentMsg}
                  onChange={(e) => setAppointmentMsg(e.target.value)}
                  className="w-full px-4 py-2 text-xs border border-slate-200 curvy-input focus:outline-none focus:border-teal-700"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingAppointment}
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold curvy-button shadow-md transition-colors"
              >
                {isSubmittingAppointment
                  ? "অ্যাপয়েন্টমেন্ট বুকিং হচ্ছে..."
                  : "অ্যাপয়েন্টমেন্ট নিশ্চিত করুন"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. Client Reviews Slider */}
      <section className="bg-slate-50 py-20 border-y border-teal-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Success Stories
            </h2>
            <div className="h-1 w-20 bg-teal-700 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 mt-4 text-xs md:text-sm">
              Feedback from our valued clients working in Romania, Japan &
              across the globe.
            </p>
          </div>

          {reviews.length > 0 && (
            <ReviewSlider reviews={reviews} getImageUrl={getImageUrl} />
          )}

          {reviews.length === 0 && (
            <div className="text-center py-16 text-slate-400 text-xs">
              No reviews yet.
            </div>
          )}
        </div>
      </section>

      {/* 8. Blogs Section */}
      <section
        id="blogs"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Travel & Global Employment Blog
          </h2>
          <div className="h-1 w-20 bg-teal-700 mx-auto mt-4 rounded-full" />
          <p className="text-slate-500 mt-4 text-xs md:text-sm">
            Informative blog posts on overseas education, construction worker
            recruitment & travel guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(blogs.length > 0 ? paginatedBlogs : []).map((post, idx) => (
            <motion.div
              key={post._id || post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden border border-teal-50 shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow"
            >
              <div className="w-full md:w-48 h-40 bg-slate-100 flex-shrink-0">
                <OptimizedImage
                  src={getImageUrl(post.imageUrl)}
                  alt={post.title}
                  containerClassName="w-full h-full"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase">
                    পোস্ট করেছেন: {post.author}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm md:text-base mt-1 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {post.content?.replace(/<[^>]*>/g, '')}
                  </p>
                </div>
                <Link
                  href={`/blogs/${post._id || post.id}`}
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 mt-4 flex items-center space-x-1"
                >
                  <span>সম্পূর্ণ ব্লগ পড়ুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {blogs.length > 0 && (
          <Pagination currentPage={blogPage} totalPages={blogTotalPages} onPageChange={setBlogPage} />
        )}
      </section>

      {/* 9. Contact Page Section (Details, Form, Map Pointer) */}
      <section
        id="contact"
        className="bg-slate-50 py-20 border-t border-teal-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
              Contact Us
            </h2>
            <div className="h-1 w-20 bg-teal-700 mx-auto mt-4 rounded-full" />
            <p className="text-slate-500 mt-4 text-xs">
              Our office address, map location & direct messaging details are
              provided below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Office Details Card */}
            <div className="bg-white p-8 rounded-2xl border border-teal-50 shadow-sm space-y-6 lg:col-span-1">
              <div>
                <h3 className="font-bold text-slate-800 text-base mb-1">
                  Head Office (Dhaka)
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Liton Khan Shopping Complex (3rd Floor), Palash, Narsingdi,
                  Dhaka 1610.
                </p>
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="text-xs">
                  <span className="text-slate-400 block">Mobile Helpline:</span>
                  <span className="font-bold text-slate-800">
                    +880 1789-650969
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block">Email:</span>
                  <span className="font-bold text-slate-800">
                    info@mcesbd.com
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block">
                    WhatsApp Support:
                  </span>
                  <span className="font-bold text-slate-850">
                    +880 1789-650969
                  </span>
                </div>
              </div>

              <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 flex items-center space-x-3 text-xs text-teal-850">
                <Info className="w-5 h-5 text-teal-600 flex-shrink-0" />
                <span>
                  Our office is open Saturday-Thursday, 9:00 AM to 6:00 PM.
                </span>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="bg-white p-8 rounded-2xl border border-teal-50 shadow-sm lg:col-span-1">
              <h3 className="font-bold text-slate-800 text-base mb-4">
                Send a Message
              </h3>

              {contactSuccess && (
                <div className="mb-4 p-3.5 bg-emerald-100 text-emerald-800 text-xs rounded-xl font-bold">
                  {contactSuccess}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 curvy-input focus:outline-none focus:border-teal-700 bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 curvy-input focus:outline-none focus:border-teal-700 bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows="3"
                    placeholder="Write your message or question..."
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 curvy-input focus:outline-none focus:border-teal-700 bg-slate-50 focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold curvy-button shadow-md transition-colors"
                >
                  {isSubmittingContact ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Google Map Pointer Integration */}
            <div className="rounded-2xl overflow-hidden border border-teal-50 shadow-sm lg:col-span-1 h-[320px] bg-slate-100 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3645.427428257949!2d90.64265427590215!3d23.980679079895808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37542da395344259%3A0x7450581f239c3fcc!2sLiton%20Khan%20Shopping%20Center!5e0!3m2!1sen!2sbd!4v1782207244216!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="MCES International Office Location - Liton Khan Shopping Center, Narsingdi, Dhaka"
              ></iframe>
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.128795551939!2d90.3888636154316!3d23.751688594247547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a5369c0d4f%3A0xe5a363a032dfa9a3!2sPanthapath%20Signal!5e0!3m2!1sen!2sbd!4v1655000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ReviewSlider({ reviews, getImageUrl }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);
  }, [reviews.length]);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoPlay]);

  const goTo = useCallback(
    (idx) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
      startAutoPlay();
    },
    [current, startAutoPlay],
  );

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    startAutoPlay();
  }, [reviews.length, startAutoPlay]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % reviews.length);
    startAutoPlay();
  }, [reviews.length, startAutoPlay]);

  const rev = reviews[current];

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Prev */}
      <button
        onClick={goPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-2.5 bg-white border border-slate-200 hover:bg-teal-50 hover:text-teal-700 rounded-full shadow-sm transition-colors"
        aria-label="Previous review"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next */}
      <button
        onClick={goNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-2.5 bg-white border border-slate-200 hover:bg-teal-50 hover:text-teal-700 rounded-full shadow-sm transition-colors"
        aria-label="Next review"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="bg-white p-8 md:p-10 rounded-2xl border border-teal-50 shadow-sm"
          >
            <div className="flex items-center space-x-1 mb-5">
              {[...Array(rev.rating || 5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-slate-600 text-sm md:text-base italic leading-relaxed mb-8">
              &ldquo;{rev.reviewText}&rdquo;
            </p>
            <div className="flex items-center space-x-4 pt-5 border-t border-slate-100">
                <OptimizedImage
                  src={getImageUrl(rev.imageUrl)}
                  alt={rev.clientName}
                  containerClassName="w-12 h-12 rounded-full shrink-0"
                  className="rounded-full border-2 border-teal-100"
                />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  {rev.clientName}
                </h4>
                <span className="text-xs text-slate-400">{rev.clientRole}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-teal-700 w-6"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

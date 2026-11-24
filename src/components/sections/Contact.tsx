"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { FiSend, FiMail, FiMapPin, FiCheckCircle, FiAlertTriangle, FiClock } from "react-icons/fi";
import { portfolioData } from "../../config/portfolioData";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16" data-aos="fade-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 mb-4">
            06 / GET IN TOUCH
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans">
            Contact &amp; Collaboration
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans leading-relaxed">
            Interested in discussing technical leadership, distributed system architecture, or high-throughput backend services? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6" data-aos="fade-right">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans mb-3">
                Let&apos;s build something great.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
                Whether you have an enterprise system to architect, cloud infrastructure to automate, or are looking to expand your engineering team, I would love to connect.
              </p>
            </div>

            {/* Profile Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/[0.1] flex-shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="Shariyer Shazan Profile Photo"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-base font-bold text-white font-sans">
                  {portfolioData.name}
                </div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">
                  Lead Full-Stack &amp; DevOps Engineer
                </div>
                <div className="text-xs text-slate-400 font-sans mt-0.5">
                  YouFresh LLC
                </div>
              </div>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3">
              <a
                href="mailto:shariyershazan1@gmail.com"
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.04] transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#38bdf8] flex-shrink-0">
                  <FiMail className="text-lg" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Direct Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#38bdf8] transition-colors font-sans mt-0.5">
                    shariyershazan1@gmail.com
                  </div>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3.5 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#38bdf8] flex-shrink-0">
                  <FiMapPin className="text-lg" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Location</div>
                  <div className="text-sm font-semibold text-white font-sans mt-0.5">
                    Tejgaon, Dhaka, Bangladesh
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3.5 cursor-default">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <FiClock className="text-lg" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Response Window</div>
                  <div className="text-sm font-medium text-slate-300 font-sans mt-0.5">
                    Typically replies within 24 hours
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7" data-aos="fade-left">
            <div className="p-7 sm:p-9 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-2xl">
              {/* Status Diagnostic Messages */}
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start gap-3">
                  <FiCheckCircle className="text-emerald-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block mb-0.5">Message Sent Successfully</span>
                    Thank you! Your message has been received. I will review and reply within 24 hours.
                  </div>
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                  <FiAlertTriangle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block mb-0.5">Submission Failed</span>
                    Unable to send message right now. Please email directly at shariyershazan1@gmail.com.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-white/[0.03] border border-white/[0.1] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-white/[0.03] border border-white/[0.1] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      defaultValue=""
                      className="w-full bg-[#0d111a] border border-white/[0.1] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all font-sans cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-950 text-slate-500">
                        Select inquiry type...
                      </option>
                      <option value="Full-Time Role" className="bg-slate-950 text-white">
                        Full-Time Opportunity
                      </option>
                      <option value="Contract / Consulting" className="bg-slate-950 text-white">
                        Contract / Consulting
                      </option>
                      <option value="System Architecture" className="bg-slate-950 text-white">
                        System Architecture &amp; DevOps
                      </option>
                      <option value="General Inquiry" className="bg-slate-950 text-white">
                        General Inquiry
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="e.g. Staff Engineer Opportunity"
                      className="w-full bg-white/[0.03] border border-white/[0.1] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project, team goals, or engineering requirements..."
                    className="w-full bg-white/[0.03] border border-white/[0.1] focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all resize-none font-sans"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-semibold text-sm tracking-tight flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend className="text-sm" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

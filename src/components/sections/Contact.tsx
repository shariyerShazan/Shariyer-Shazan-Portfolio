"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { FiSend, FiMail, FiMapPin, FiTerminal, FiActivity, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
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
    <section id="contact" className="py-28 px-6 min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#0a0f1d] via-[#0b101c] to-[#0a0f1d] relative overflow-hidden">
      {/* Visual background glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#00f0ff]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] bg-[#8b5cf6]/5 rounded-full blur-[90px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">05.</span>
          Get In Touch
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT COLUMN: CONNECTION TELEMETRY & CHANNELS */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6" data-aos="fade-right">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block">
                  // PING CHANNELS
                </span>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white leading-tight font-sans tracking-tight">
                  Let's engineer something great.
                </h3>
              </div>
              
              <p className="text-xs md:text-sm text-[#cbd5e1] leading-relaxed font-sans opacity-85">
                Whether you have an enterprise system to build, backend pipelines to optimize, or are looking to expand your engineering team, my inbox is always open.
              </p>

              {/* Direct Info Cards */}
              <div className="space-y-3 pt-2">
                {/* Systems Operator Profile Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0f172a]/35 border border-[#1e293b]/70 hover:border-[#00f0ff]/40 transition-all duration-300 group hover:bg-[#00f0ff]/5">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#00f0ff]/30 flex-shrink-0">
                    <Image 
                      src="/profile.jpg" 
                      alt="Shariyer Shazan Profile Photo" 
                      width={56}
                      height={56}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">// SYSTEM ADMINISTRATOR</div>
                    <div className="text-xs md:text-sm font-semibold text-white font-mono group-hover:text-[#00f0ff] transition-colors">
                      {portfolioData.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Distributed Systems & Backend Architect
                    </div>
                  </div>
                </div>

                <a 
                  href="mailto:shariyershazan1@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#0f172a]/35 border border-[#1e293b]/70 hover:border-[#00f0ff]/40 transition-all duration-300 group hover:bg-[#00f0ff]/5"
                >
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[#00f0ff] group-hover:scale-105 transition-transform duration-300">
                    <FiMail className="text-lg" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Direct Email</div>
                    <div className="text-xs md:text-sm font-semibold text-white group-hover:text-[#00f0ff] transition-colors font-mono">
                      shariyershazan1@gmail.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0f172a]/35 border border-[#1e293b]/70 cursor-default">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[#00f0ff]">
                    <FiMapPin className="text-lg" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Operational Hub</div>
                    <div className="text-xs md:text-sm font-semibold text-white font-sans">
                      Dhaka, Bangladesh
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PING SIMULATION WRAPPER */}
            <div className="bg-[#040810] border border-[#1e293b] rounded-xl p-4 relative overflow-hidden hidden lg:flex flex-col h-[160px] shadow-inner font-mono text-[10px] leading-relaxed text-[#22c55e]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
              
              <div className="flex justify-between items-center mb-2 border-b border-slate-900 pb-1.5 flex-shrink-0">
                <div className="flex items-center gap-2 text-[#00f0ff]">
                  <FiTerminal className="animate-pulse" />
                  <span>CONNECTION_STREAM</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <FiActivity className="text-emerald-500 text-xs animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              <div className="flex-grow space-y-1 overflow-hidden pr-2">
                <div className="text-[#00f0ff]">$ ping -c 3 shariyer-shazan.services</div>
                <div>64 bytes from shazan_node_1: icmp_seq=1 ttl=64 time=0.038 ms</div>
                <div>64 bytes from shazan_node_1: icmp_seq=2 ttl=64 time=0.045 ms</div>
                <div className="text-emerald-300 font-bold">[READY] Channel connection parameters authorized.</div>
                <div className="text-[#cbd5e1]/40">awaiting_client_payload_stream...</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CYBER FORM CARD */}
          <div className="lg:col-span-7" data-aos="fade-left">
            <div className="bg-[#0f172a]/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-[#1e293b]/70 hover:border-[#00f0ff]/30 transition-all duration-500 relative overflow-hidden shadow-2xl">
              
              {/* Techy background scan grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.01)_1px,transparent_1px)] bg-[size:100%_10px] pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#00f0ff]/5 to-transparent rounded-bl-full pointer-events-none"></div>

              {/* Status Diagnostic Messages */}
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs md:text-sm flex items-start gap-3 font-mono animate-fadeIn relative z-10">
                  <FiCheckCircle className="text-emerald-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">PAYLOAD_DISPATCHED</span>
                    Message transmitted successfully. My gateways will process and respond within 24 hours.
                  </div>
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs md:text-sm flex items-start gap-3 font-mono animate-fadeIn relative z-10">
                  <FiAlertTriangle className="text-red-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">DISPATCH_FAILED</span>
                    Unable to transmit package blocks. Please retry or contact me directly via email.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-slate-400 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-[#00f0ff]/65 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/20 placeholder-slate-700 transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder="e.g. john@example.com"
                      className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-[#00f0ff]/65 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/20 placeholder-slate-700 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="type" className="text-xs font-mono text-slate-400 uppercase tracking-wider">Inquiry Type</label>
                    <select
                      id="type"
                      name="type"
                      required
                      defaultValue=""
                      className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-[#00f0ff]/65 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/20 transition-all font-sans cursor-pointer"
                    >
                      <option value="" disabled className="bg-slate-950 text-slate-500">Select inquiry type...</option>
                      <option value="Full-Time Role" className="bg-slate-950 text-white">Full-Time Role</option>
                      <option value="Contract / Freelance" className="bg-slate-950 text-white">Contract / Freelance</option>
                      <option value="System Design Consult" className="bg-slate-950 text-white">System Design Consult</option>
                      <option value="General Collaboration" className="bg-slate-950 text-white">General Collaboration</option>
                      <option value="Other" className="bg-slate-950 text-white">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-mono text-slate-400 uppercase tracking-wider">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required 
                      placeholder="e.g. System Integration Details"
                      className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-[#00f0ff]/65 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/20 placeholder-slate-700 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-slate-400 uppercase tracking-wider">Message Details</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    placeholder="Enter project descriptions, pipelines workflows, or target roles specifications..."
                    className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-[#00f0ff]/65 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/20 placeholder-slate-700 transition-all resize-none font-sans"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-3.5 rounded-xl bg-[#00f0ff] hover:bg-[#00d8e6] text-black font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(0,240,255,0.15)] hover:shadow-[0_4px_25px_rgba(0,240,255,0.3)] transition-all disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4.5 w-4.5 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Transmitting Stream...
                    </>
                  ) : (
                    <>
                      <FiSend className="text-base" /> Send Message
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

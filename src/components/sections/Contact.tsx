"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";

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
    <section id="contact" className="py-24 px-6 min-h-screen flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">05.</span>
          Let's Connect
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="bg-[#0f172a] rounded-xl p-8 border border-[#1e293b] shadow-2xl relative" data-aos="fade-up">
          {success && (
            <div className="mb-6 p-4 rounded bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] text-center font-mono">
              Message sent successfully! I will get back to you soon.
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500 text-red-500 text-center font-mono">
              Failed to send message. Please try again later.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-mono text-[#94a3b8]">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full bg-[#0a0f1d] border border-[#334155] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-mono text-[#94a3b8]">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  className="w-full bg-[#0a0f1d] border border-[#334155] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-mono text-[#94a3b8]">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required 
                className="w-full bg-[#0a0f1d] border border-[#334155] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-mono text-[#94a3b8]">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                required 
                className="w-full bg-[#0a0f1d] border border-[#334155] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00f0ff] transition-colors resize-none"
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

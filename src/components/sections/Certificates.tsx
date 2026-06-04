"use client";

import { useState } from "react";
import { portfolioData } from "../../config/portfolioData";
import { Button } from "../ui/Button";
import { TbCertificate } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  return (
    <section id="certificates" className="py-24 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 flex items-center gap-4" data-aos="fade-right">
          <span className="text-[#00f0ff] font-mono text-2xl md:text-4xl">06.</span>
          Certifications
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[#475569] to-transparent ml-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.certificates.map((cert, index) => (
            <div 
              key={index} 
              className="bg-[#0f172a] p-6 rounded border border-[#1e293b] flex flex-col hover:border-[#00f0ff]/50 transition-colors group"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="flex items-center gap-4 mb-4">
                <TbCertificate className="text-4xl text-[#00f0ff]" />
                <h3 className="text-xl font-bold text-[#f8fafc] leading-tight">{cert.title}</h3>
              </div>
              
              <p className="text-[#94a3b8] mb-8 flex-grow">
                {cert.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => setSelectedCert(cert.fileUrl || "/certificates/placeholder.pdf")}
                >
                  View Certificate
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = cert.fileUrl || "/certificates/placeholder.pdf";
                    link.download = `${cert.title.split(' ').join('_')}_Certificate`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[#0a0f1d]/95 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#0f172a] border border-[#334155] rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-[#334155] bg-[#0a0f1d]">
                <h3 className="text-white font-bold">Certificate Preview</h3>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="text-[#94a3b8] hover:text-[#00f0ff] transition-all p-2 cursor-pointer rounded-full hover:bg-[rgba(0,240,255,0.1)]"
                  aria-label="Close modal"
                >
                  <IoMdClose className="text-2xl" />
                </button>
              </div>
              
              <div className="w-full h-auto min-h-[400px] flex items-center justify-center p-6 bg-grid-pattern">
                <div className="text-center">
                   <div className="text-[#00f0ff] text-6xl mb-4 flex justify-center opacity-50">
                     <TbCertificate />
                   </div>
                   <p className="text-[#94a3b8] font-mono whitespace-pre-wrap">
                      [Certificate Display Placeholder]<br/>
                      File: {selectedCert}
                   </p>
                </div>
              </div>
              
              <div className="p-4 border-t border-[#334155] bg-[#0a0f1d] flex justify-end">
                 <Button variant="secondary" size="sm" className="cursor-pointer" onClick={() => setSelectedCert(null)}>
                   Close Preview
                 </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;

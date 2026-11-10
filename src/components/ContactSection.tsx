'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [lastWaUrl, setLastWaUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Residential',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build structured, universally compatible WhatsApp message
    const lines = [
      `*New Property Inquiry — Azaan Estate*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*Email:* ${formData.email}`,
      `*Interest:* ${formData.propertyType}`,
      `*Message:* ${formData.message || 'Interested in Bahria Town Lahore properties'}`
    ];

    const encodedText = encodeURIComponent(lines.join('\n'));
    const waUrl = `https://api.whatsapp.com/send?phone=923045351802&text=${encodedText}`;

    setLastWaUrl(waUrl);
    setSubmitted(true);

    // Trigger WhatsApp: On mobile navigate directly (prevents popup blocker), on desktop open new tab
    if (typeof window !== 'undefined') {
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = waUrl;
      } else {
        const link = document.createElement('a');
        link.href = waUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 border-t border-[#e8e6df] bg-[#f6f5f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Info Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eeeae1] border border-[#ded9cc] text-[#875d46] text-xs font-bold tracking-wider uppercase mb-4">
              <span>Private VIP Advisory</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1c241e] tracking-tight mb-6 leading-tight">
              Connect With Our <br />
              <span className="text-[#875d46]">Luxury Estate Advisors</span>
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed mb-8">
              Whether you are acquiring a signature residential villa, expanding your corporate portfolio with prime commercial plaza floors, or investing in skyline towers, our advisors ensure discreet, seamless execution.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#eae7df] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#f5f1e8] text-[#875d46] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[#1c241e] font-bold text-sm">Abubakr — Direct Line</h4>
                  <p className="text-stone-500 text-xs">0304-5351802</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#eae7df] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#f5f1e8] text-[#875d46] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[#1c241e] font-bold text-sm">Private Email</h4>
                  <p className="text-stone-500 text-xs">abubakr@azaanestate.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#eae7df] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#f5f1e8] text-[#875d46] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[#1c241e] font-bold text-sm">Headquarters</h4>
                  <p className="text-stone-500 text-xs">Avenue One, Financial District & Skyline Boulevard</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Form Column */}
          <div className="bg-white border border-[#e8e6df] rounded-[32px] p-6 sm:p-8 shadow-xl shadow-stone-900/5">
            <h3 className="text-xl font-bold text-[#1c241e] mb-1">Schedule Private Viewing</h3>
            <p className="text-xs text-stone-500 mb-6">Our senior associate will get in touch within 2 hours.</p>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1c241e]">Inquiry Prepared</h4>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto mt-1">
                    Your message has been drafted. If WhatsApp didn&apos;t launch automatically, tap below:
                  </p>
                </div>

                <div>
                  <a
                    href={lastWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20b957] text-white text-xs sm:text-sm font-bold transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.004 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.333.63 4.63 1.826 6.638L2.667 29.333l6.861-1.796A13.263 13.263 0 0 0 16.004 29.333C23.37 29.333 29.333 23.362 29.333 16S23.37 2.667 16.004 2.667zm0 24.267c-2.145 0-4.244-.575-6.08-1.665l-.435-.258-4.073 1.067 1.084-3.955-.283-.455A10.886 10.886 0 0 1 5.067 16c0-6.03 4.907-10.933 10.937-10.933S26.933 9.97 26.933 16 22.034 26.934 16.004 26.934zm5.993-8.182c-.328-.165-1.942-.957-2.242-1.067-.3-.11-.518-.165-.736.165s-.845 1.067-1.036 1.287c-.19.22-.382.247-.71.082-.328-.165-1.385-.51-2.638-1.627-.975-.87-1.633-1.943-1.824-2.271-.19-.328-.02-.505.144-.668.147-.146.328-.382.491-.573.164-.19.218-.328.328-.546.11-.22.055-.41-.027-.573-.082-.165-.736-1.774-1.009-2.429-.265-.636-.535-.55-.736-.56-.19-.008-.41-.01-.627-.01s-.573.082-.873.41c-.3.328-1.145 1.12-1.145 2.73s1.172 3.165 1.335 3.383c.164.22 2.307 3.52 5.59 4.937.782.337 1.391.539 1.866.69.784.25 1.498.215 2.062.13.629-.094 1.942-.793 2.216-1.56.274-.764.274-1.42.19-1.558-.082-.137-.3-.22-.627-.383z"/>
                    </svg>
                    <span>Click to Send via WhatsApp</span>
                  </a>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        propertyType: 'Residential',
                        message: '',
                      });
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Hashmi"
                      className="w-full px-4 py-2.5 bg-[#fbfaf8] border border-[#e5e1d7] rounded-xl text-stone-900 text-sm focus:outline-none focus:border-[#875d46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+92 300 0000000"
                      className="w-full px-4 py-2.5 bg-[#fbfaf8] border border-[#e5e1d7] rounded-xl text-stone-900 text-sm focus:outline-none focus:border-[#875d46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-[#fbfaf8] border border-[#e5e1d7] rounded-xl text-stone-900 text-sm focus:outline-none focus:border-[#875d46]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Property Interest
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#fbfaf8] border border-[#e5e1d7] rounded-xl text-stone-900 text-sm focus:outline-none focus:border-[#875d46]"
                  >
                    <option value="Residential">Residential Luxury Villas</option>
                    <option value="Commercial">Commercial Plazas & Retail</option>
                    <option value="Highrise">Skyline Penthouses & Towers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Message or Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Preferred time for walkthrough or specific requirements..."
                    className="w-full px-4 py-2.5 bg-[#fbfaf8] border border-[#e5e1d7] rounded-xl text-stone-900 text-sm focus:outline-none focus:border-[#875d46]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#1c241e] hover:bg-[#2e3a31] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry Request</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

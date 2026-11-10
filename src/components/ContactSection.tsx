'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Residential',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build WhatsApp message
    const waMessage =
      `🏠 *New Property Inquiry — Azaan Estate*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `🏷️ *Interest:* ${formData.propertyType}\n` +
      `💬 *Message:* ${formData.message || 'No additional message'}`;

    const waUrl = `https://wa.me/923045351802?text=${encodeURIComponent(waMessage)}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: 'Residential',
        message: '',
      });
    }, 4000);
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
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#1c241e]">Inquiry Received</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Thank you! Your message has been sent to Abubakr via WhatsApp. He will get back to you shortly.
                </p>
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

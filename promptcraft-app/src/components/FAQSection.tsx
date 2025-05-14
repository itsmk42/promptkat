"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "What is PromptCraft?",
    answer: "PromptCraft is a curated marketplace for high-quality AI prompts, designed to help users get the best results from their favorite AI platforms."
  },
  {
    question: "How do I purchase a prompt?",
    answer: "Simply browse our library, select a prompt, and follow the checkout process. You can then copy and use your prompt instantly."
  },
  {
    question: "Can I customize prompts?",
    answer: "Yes! All prompts are designed to be easily customizable. You can edit variable fields to suit your specific needs."
  },
  {
    question: "Which AI platforms are supported?",
    answer: "Our prompts work with all major AI platforms, including ChatGPT, Claude, Gemini, and more."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="rounded-xl bg-gray-900/80 border border-gray-700 divide-y divide-gray-800 shadow-lg">
      {faqs.map((faq, idx) => (
        <div key={idx}>
          <button
            className={`w-full text-left px-6 py-5 focus:outline-none flex items-center justify-between transition-colors ${openIndex === idx ? "bg-gray-800/60" : "hover:bg-gray-800/40"}`}
            onClick={() => toggleFAQ(idx)}
            aria-expanded={openIndex === idx}
          >
            <span className="font-semibold text-base text-white">{faq.question}</span>
            <svg className={`w-4 h-4 ml-4 transform transition-transform ${openIndex === idx ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 px-6 ${openIndex === idx ? "max-h-40 py-2" : "max-h-0 py-0"}`}
            style={{ color: "#d1d5db" }}
          >
            {openIndex === idx && <p className="text-gray-300 text-sm">{faq.answer}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
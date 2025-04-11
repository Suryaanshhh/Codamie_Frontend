import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);
    
    const faqs = [
      {
        question: "How does the matching algorithm work?",
        answer: "Our matching algorithm looks at multiple factors including your preferred programming languages, development environment, coding style, project interests, and career goals. We also consider your responses to our tech personality assessment to find people who complement your approach to problem-solving."
      },
      {
        question: "Is Codamie only for romantic relationships?",
        answer: "Not at all! While many users find romantic connections, Codamie is also perfect for finding coding partners, mentors, project collaborators, or just friends who share your passion for technology. You can specify what type of connections you're looking for in your profile."
      },
      {
        question: "Do I need to be a professional developer to join?",
        answer: "Absolutely not! Codamie welcomes everyone from beginners to seasoned professionals. Whether you're learning to code, working as a developer, or just interested in tech, you'll find people at similar stages who share your interests."
      },
      {
        question: "Can I share my GitHub or portfolio on my profile?",
        answer: "Yes! We encourage linking your GitHub, portfolio, or other relevant professional profiles. This helps potential matches get a better sense of your work and interests, creating more meaningful initial connections."
      },
      {
        question: "Are there any in-person events?",
        answer: "Yes, we regularly organize hackathons, code retreats, and social gatherings in major tech hubs. All events are announced in our app and via email for members. We also have virtual events accessible to everyone regardless of location."
      },
      {
        question: "How much does membership cost?",
        answer: "Codamie offers a free basic membership that allows you to create a profile and receive matches. Our premium plan offers additional features like unlimited messaging, advanced filters, and priority matching starting at $14.99/month. We also offer a 7-day free trial of premium features."
      }
    ];
    
    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
    
    return (
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Questions</span></h2>
            <p className="text-gray-600">Everything you need to know about finding your code companion.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className={`flex justify-between items-center w-full p-5 text-left font-medium rounded-lg ${activeIndex === index ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 hover:bg-indigo-50'}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-5 rounded-lg mt-1 shadow-sm"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          
          <div className="max-w-lg mx-auto mt-12 text-center">
            <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is ready to help.</p>
            <button className="px-6 py-3 rounded-md border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    );
  }
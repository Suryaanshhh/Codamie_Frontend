import React from 'react';

export default function ContactUs() {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2 text-center">
          <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Get in Touch</span>
        </h1>
        <p className="text-gray-600 text-center mb-12">We're here to answer any questions about your coding love journey</p>
        
        {/* Suggestion Card with Google Form Link */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-indigo-600 text-5xl mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Have a question or suggestion?</h3>
          <p className="text-gray-600 mb-8">We'd love to hear from you! Please fill out our Google Form to get in touch with our team.</p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLScWPjr3wCvcpB-TKno2rHlM3lQczixhY4AEPF-Y4zUII-N-HA/viewform" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Go to Google Form
          </a>
        </div>
      </div>
    </div>
  );
}
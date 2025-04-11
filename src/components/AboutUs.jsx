import React from 'react';


export function AboutUs() {
  return (
    <section className="py-20 bg-indigo-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Our <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Story</span></h2>
          <p className="text-gray-600">Where passion for code creates meaningful connections.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">We believe in <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">code-compatibility</span></h3>
            <p className="text-gray-600 mb-6">
              Founded in 2025 by a of developer who never found love through shared coding projects, 
              Codamie was born from the simple idea that genuine connections can form when people 
              share a passion for building and creating together.
            </p>
            <p className="text-gray-600 mb-6">
              Our platform helps tech enthusiasts find their perfect match based on coding languages, 
              project interests, and development philosophy. We believe that great relationships, like 
              great code, are built on mutual understanding, communication, and collaboration.
            </p>
            <p className="text-gray-600">
              With thousands of successful matches and countless lines of code written together, 
              we're proud to be where tech-minded individuals find meaningful connections.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-4xl font-bold mb-3">5k+</div>
              <p className="text-gray-600">Successful matches</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-4xl font-bold mb-3">15+</div>
              <p className="text-gray-600">Countries reached</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-4xl font-bold mb-3">98%</div>
              <p className="text-gray-600">Match satisfaction</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-4xl font-bold mb-3">24/7</div>
              <p className="text-gray-600">Support & community</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Meet Our <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Team</span></h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-1">Alex Router</h4>
                <p className="text-indigo-600 text-sm mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">Full-stack developer with a passion for clean code and bringing people together.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-1">Jordan Query</h4>
                <p className="text-indigo-600 text-sm mb-3">CTO</p>
                <p className="text-gray-600 text-sm">Database expert who believes the right schema leads to the right relationship.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-1">Taylor Function</h4>
                <p className="text-indigo-600 text-sm mb-3">Head of Matching</p>
                <p className="text-gray-600 text-sm">Algorithm specialist who crafts our matching system with mathematical precision.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
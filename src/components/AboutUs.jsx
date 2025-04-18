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
              Founded in 2025 by a  developer who never found love through shared coding projects,
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
              <div className="text-indigo-600 text-4xl font-bold mb-3">37k+</div>
              <p className="text-gray-600">"Hey" texts that never worked</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-4xl font-bold mb-3">0</div>
              <p className="text-gray-600">Accidental soulmates found while stalking</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-4xl font-bold mb-3">102%</div>
              <p className="text-gray-600">Believers in love at first sight</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-indigo-600 text-4xl font-bold mb-3">∞</div>
              <p className="text-gray-600">Efforts</p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Meet <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">ME</span></h3>

          <div className=" grid md:grid-cols-3 gap-8r">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              
              <div className="p-6">
                <h4 className="font-bold text-lg mb-1">Suryansh Dwivedi</h4>
                <p className="text-indigo-600 text-sm mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">Backend developer who only wanted love not lessons.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from 'react';

export default function HeroSection(){
     const codeSnippets = [
        {
          id: 1,
          fileName: "Us.js",
          content: [
            { type: "keyword", content: "import" },
            { type: "text", content: " bond " },
            { type: "keyword", content: "from" },
            { type: "string", content: " \"Heart\"" },
            { type: "text", content: ";" },
            { type: "linebreak" },
            { type: "comment", content: "// Defined once only" },
            { type: "linebreak" },
            { type: "comment", content: "// As we are one" },
            { type: "linebreak" },
            { type: "linebreak" },
            { type: "keyword", content: "const" },
            { type: "text", content: " " },
            { type: "variable", content: "Us" },
            { type: "text", content: " = " },
            { type: "variable", content: "You" },
            { type: "operator", content: " + " },
            { type: "variable", content: "Me" },
            { type: "text", content: ";" },
            { type: "linebreak" },
            { type: "function", content: "bond.push" },
            { type: "text", content: "(" },
            { type: "variable", content: "Us" },
            { type: "text", content: ");" },
            { type: "linebreak" },
            { type: "linebreak" },
            { type: "keyword", content: "return" },
            { type: "text", content: " bond;" }
          ]
        },
        {
          id: 2,
          fileName: "Together.js",
          content: [
            { type: "keyword", content: "import" },
            { type: "text", content: " time " },
            { type: "keyword", content: "from" },
            { type: "string", content: " \"Life\"" },
            { type: "text", content: ";" },
            { type: "linebreak" },
            { type: "comment", content: "// Loop runs always" },
            { type: "linebreak" },
            { type: "comment", content: "// As love never ends" },
            { type: "linebreak" },
            { type: "linebreak" },
            { type: "keyword", content: "const" },
            { type: "text", content: " " },
            { type: "variable", content: "Together" },
            { type: "text", content: " = " },
            { type: "variable", content: "Forever" },
            { type: "text", content: ";" },
            { type: "linebreak" },
            { type: "function", content: "time.push" },
            { type: "text", content: "(" },
            { type: "variable", content: "Together" },
            { type: "text", content: ");" },
            { type: "linebreak" },
            { type: "linebreak" },
            { type: "keyword", content: "return" },
            { type: "text", content: " time;" }
          ]
        },
        {
          id: 3,
          fileName: "Love.js",
          content: [
            { type: "keyword", content: "import" },
            { type: "text", content: " heart " },
            { type: "keyword", content: "from" },
            { type: "string", content: " \"Me\"" },
            { type: "text", content: ";" },
            { type: "linebreak" },
            { type: "comment", content: "// Use const only" },
            { type: "linebreak" },
            { type: "comment", content: "// As love is constant" },
            { type: "linebreak" },
            { type: "linebreak" },
            { type: "keyword", content: "const" },
            { type: "text", content: " " },
            { type: "variable", content: "Love" },
            { type: "text", content: " = " },
            { type: "variable", content: "You" },
            { type: "text", content: ";" },
            { type: "linebreak" },
            { type: "function", content: "heart.push" },
            { type: "text", content: "(" },
            { type: "variable", content: "Love" },
            { type: "text", content: ");" },
            { type: "linebreak" },
            { type: "linebreak" },
            { type: "keyword", content: "return" },
            { type: "text", content: " heart;" }
          ]
        }
      ];
    
      // Select two specific code snippets to display (first and second)
      const displaySnippets = [codeSnippets[0], codeSnippets[1]];

      // Code-themed love poem lines
      const poemLines = [
        "while(alive) { love.commit(); }",
        "function love() { return forever; }",
        "if(you && me) { us = true; }"
      ];
    
      // Render a code snippet based on content array
      const renderCodeContent = (content) => {
        return content.map((item, index) => {
          if (item.type === "linebreak") {
            return <br key={index} />;
          }
          
          let className = "";
          switch (item.type) {
            case "keyword":
              className = "text-indigo-400";
              break;
            case "string":
              className = "text-emerald-300";
              break;
            case "comment":
              className = "text-gray-500";
              break;
            case "variable":
              className = "text-amber-300";
              break;
            case "function":
              className = "text-blue-300";
              break;
            case "operator":
              className = "text-pink-300";
              break;
            default:
              className = "text-gray-200";
          }
          
          return <span key={index} className={className}>{item.content}</span>;
        });
      };
    
    return(
        <section className="pt-32 pb-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Where Developers Find Their <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Perfect Match</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Codamie connects tech enthusiasts through shared passion for code. Express your love story in the language you both understand.
              </p>
              
              {/* Code Poetry */}
              <div className="mb-8 bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-400 font-mono text-sm">
                {poemLines.map((line, index) => (
                  <div key={index} className="mb-2 last:mb-0 text-gray-700">{line}</div>
                ))}
              </div>
              
              <div className="flex gap-4 mb-8">
                <button className="px-6 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                  Start Coding Together
                </button>
                <button className="px-6 py-3 rounded-md border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition-colors">
                  Explore Profiles
                </button>
              </div>
            </div>
            
            {/* Code Gallery with Artwork */}
            <div className="lg:w-1/2 flex flex-col items-center">
              {/* Heart-shaped code artwork */}
              <div className="mb-6 w-32 h-32 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path 
                    d="M50 90 C100 30 150 10 50 -30 C-50 10 0 30 50 90"
                    fill="none"
                    stroke="url(#heartGradient)"
                    strokeWidth="2"
                  />
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <text x="50" y="45" fontFamily="monospace" fontSize="8" textAnchor="middle" fill="#4f46e5">
                    {`{heart: true}`}
                  </text>
                </svg>
              </div>
              
              {/* Code Cards */}
              <div className="flex justify-center gap-6">
                {displaySnippets.map(snippet => (
                  <div
                    key={snippet.id}
                    className="w-64 rounded-lg overflow-hidden shadow-lg bg-gray-900"
                  >
                    <div className="bg-gray-800 px-4 py-2 flex items-center">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      </div>
                      <div className="ml-4 text-gray-300 text-xs font-mono">{snippet.fileName}</div>
                    </div>
                    <div className="p-4 font-mono text-sm leading-relaxed">
                      {renderCodeContent(snippet.content)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
import React, { useEffect, useRef, useState } from "react";
import { CodeCard } from "./CodeCard";

export const LoveCard = () => {
  const scrollRef = useRef(null);
  const [scrolling, setScrolling] = useState(true);
  
  const cards = [
    {
      fileName: "Love.js",
      importStatement: 'import heart from "Me"',
      comments: [
        "// Use const only",
        "// As love is constant",
      ],
      codeLines: [
        "const Love = You;",
        "heart.push(Love);",
        "heart.push(Affection);",
        "heart.push(Care);",
      ],
      returnLine: "return heart;",
    },
    {
      fileName: "Us.js",
      importStatement: 'import bond from "Heart"',
      comments: [
        "// Defined once only",
        "// As we are one",
      ],
      codeLines: [
        "const Us = You + Me;",
        "bond.push(Us);",
        "bond.push(Memories);",
        "bond.push(Moments);",
      ],
      returnLine: "return bond;",
    },
    {
      fileName: "Together.js",
      importStatement: 'import time from "Life"',
      comments: [
        "// Loop runs always",
        "// As love never ends",
      ],
      codeLines: [
        "const Together = Forever;",
        "time.push(Together);",
        "time.push(Laughter);",
        "time.push(Happiness);",
      ],
      returnLine: "return time;",
    },
    {
      fileName: "Soul.js",
      importStatement: 'import destiny from "Fate"',
      comments: [
        "// Matched once only",
        "// As we belong",
      ],
      codeLines: [
        "const Soul = You & Me;",
        "destiny.push(Soul);",
        "destiny.push(Heartbeat);",
        "destiny.push(Energy);",
      ],
      returnLine: "return destiny;",
    },
  ];

  // Duplicate cards for infinite scrolling effect
  const duplicatedCards = [...cards, ...cards, ...cards];
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let scrollPosition = 0;
    let animationId;
    
    const scroll = () => {
      if (!scrolling) return;
      
      scrollPosition += 0.5; // Adjust speed here
      
      // Reset position for infinite loop
      if (scrollPosition >= scrollContainer.scrollWidth / 3) {
        scrollPosition = 0;
        scrollContainer.scrollLeft = scrollPosition;
      } else {
        scrollContainer.scrollLeft = scrollPosition;
      }
      
      animationId = requestAnimationFrame(scroll);
    };
    
    scroll();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [scrolling]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-rose-600">Our Love Story in Code</h1>
      
      <div 
        className="relative w-full overflow-hidden py-8 mb-8"
        onMouseEnter={() => setScrolling(false)}
        onMouseLeave={() => setScrolling(true)}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-rose-50 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-rose-50 to-transparent pointer-events-none"></div>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-scroll scrollbar-hide py-4 px-16"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6">
            {duplicatedCards.map((card, index) => (
              <div 
                key={`${card.fileName}-${index}`}
                className="flex-shrink-0"
                style={{ width: '250px' }}
              >
                <CodeCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };
const token = localStorage.getItem("Token")
// Create a separate component for carousel items to properly handle the hooks
const CarouselItem = ({ item, index, x, itemWidth, trackItemOffset, round, effectiveTransition }) => {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={`relative shrink-0 flex flex-col ${round
          ? "items-center justify-center text-center bg-[#060606] border-0"
          : "items-start justify-between bg-[#222] border border-[#222] rounded-[12px]"
        } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY: rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={effectiveTransition}
    >
      <div className={`${round ? "p-0 m-0" : "mb-4 p-5"}`}>
        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060606]">
          {item.Avatar}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-1 font-black text-lg text-white">
          {item.Name}
        </div>
        <p className="text-sm text-white">{`A ${item.CodingLanguage} Developer`}</p>
      </div>
    </motion.div>
  );
};

export default function Carousel({
  items: propItems = [],
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const [profileItems, setProfileItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const storageToken = localStorage.getItem("Token")
  if (token) {
    localStorage.setItem("Token", token);
  }
  else {
    localStorage.setItem("Token", storageToken);
  }


  // Determine which items to use - API data or prop data
  const items = profileItems.length > 0 ? profileItems : propItems;

  useEffect(() => {
    const jwt=localStorage.getItem("Token")
    setLoading(true);
    axios.get("http://localhost:3000/showProfiles", { headers: { Authorization: jwt} })
      .then((response) => {
        console.log("API Response:", response.data.profile); // Debugging
        if (response.data.profile && Array.isArray(response.data.profile)) {
          setProfileItems(response.data.profile);
        } else {
          console.warn("API did not return an array of profiles");
        }
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setError("Failed to fetch profiles");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const carouselItems = items.length > 0 ? (loop ? [...items, items[0]] : items) : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered) && items.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1; // Animate to clone.
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };

  function addToMatch() {
    if (carouselItems.length > 0 && currentIndex < carouselItems.length) {
      console.log("Adding to match:", carouselItems[currentIndex]);
      axios.post("http://localhost:3000/createMatchRequest", carouselItems[currentIndex], {
        headers: {
          Authorization: token
        }
      }).then((response) => {
        alert("Match sent")
      }).catch((err) => {
        console.log(err)
      })
    } else {
      console.warn("No item to match at current index");
    }
  }

  // Show loading state
  if (loading && items.length === 0) {
    return (
      <div
        className={`relative overflow-hidden p-4 flex items-center justify-center ${round ? "rounded-full border border-white" : "rounded-[24px] border border-[#222]"
          }`}
        style={{
          width: `${baseWidth}px`,
          height: round ? `${baseWidth}px` : "200px",
        }}
      >
        <p>Loading profiles...</p>
      </div>
    );
  }

  // Show error state
  if (error && items.length === 0) {
    return (
      <div
        className={`relative overflow-hidden p-4 flex items-center justify-center ${round ? "rounded-full border border-white" : "rounded-[24px] border border-[#222]"
          }`}
        style={{
          width: `${baseWidth}px`,
          height: round ? `${baseWidth}px` : "200px",
        }}
      >
        <p>Error loading profiles. Please try again later.</p>
      </div>
    );
  }

  // Show empty state
  if (items.length === 0) {
    return (
      <div
        className={`relative overflow-hidden p-4 flex items-center justify-center ${round ? "rounded-full border border-white" : "rounded-[24px] border border-[#222]"
          }`}
        style={{
          width: `${baseWidth}px`,
          height: round ? `${baseWidth}px` : "200px",
        }}
      >
        <p>No profiles available.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${round ? "rounded-full border border-white" : "rounded-[24px] border border-[#222]"
        }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselItem
            key={index}
            item={item}
            index={index}
            x={x}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            round={round}
            effectiveTransition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div
        className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
          }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${currentIndex % items.length === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
                }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={addToMatch} className="border border-green-500 rounded-2xl p-1 w-[100px] mt-2">Match</button>
        <button className="border border-red-500 rounded-2xl p-1 w-[100px] mt-2">Unmatch</button>
      </div>
    </div>
  );
}
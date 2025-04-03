import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-4"
    >
      {children}
    </motion.div>
  );
};

const MatchRequestItem = ({ item, isSelected, onAccept, onReject }) => {
  return (
    <div className={`p-5 bg-[#222] rounded-[12px] border border-[#222] ${isSelected ? 'border-white' : ''} flex flex-col`}>
      <div className="flex justify-between items-center mb-4">
        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060606]">
          {item.icon || '👤'}
        </span>
        <span className="text-xs text-gray-400">{item.requestTime || '2h ago'}</span>
      </div>
      <div className="mb-3">
        <div className="mb-1 font-black text-lg text-white">
          {item.title || item}
        </div>
        <p className="text-sm text-white">{item.description || ''}</p>
      </div>
      <div className="flex justify-between gap-2 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReject(item);
          }}
          className="flex-1 py-2 bg-[#333] hover:bg-[#444] text-white rounded-lg transition-colors duration-200"
        >
          Reject
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAccept(item);
          }}
          className="flex-1 py-2 bg-green-600/20 hover:bg-green-600/40 text-green-500 rounded-lg border border-green-500/30 transition-colors duration-200"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

const MatchRequestList = ({
  requests = [
    { title: 'Suryansh Dwivedi', description: 'Wants to connect with you', id: 1, icon: '🦹', requestTime: '2h ago' },
    { title: 'Jane Smith', description: 'Sent you a connection request', id: 2, icon: '👩‍🎨', requestTime: '5h ago' },
    { title: 'Alex Johnson', description: 'Would like to chat with you', id: 3, icon: '👨‍💼', requestTime: '1d ago' },
    { title: 'Maria Garcia', description: 'Connection request pending', id: 4, icon: '👩‍💻', requestTime: '2d ago' },
    { title: 'Raj Patel', description: 'Wants to collaborate', id: 5, icon: '🧙‍♂️', requestTime: '3d ago' }
  ],
  onRequestAccept,
  onRequestReject,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleAccept = (item) => {
    console.log('Request accepted:', item);
    if (onRequestAccept) {
      onRequestAccept(item);
    }
  };

  const handleReject = (item) => {
    console.log('Request rejected:', item);
    if (onRequestReject) {
      onRequestReject(item);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  // Keyboard navigation: arrow keys, tab, and enter selection
  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, requests.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < requests.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(requests[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [requests, selectedIndex, onItemSelect, enableArrowNavigation]);

  // Scroll the selected item into view if needed
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth',
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`relative w-[350px] bg-[#060606] rounded-[24px] border border-[#222] overflow-hidden ${className}`}>
      <div className="px-4 py-3 border-b border-[#222] bg-[#111]">
        <h2 className="text-lg font-bold text-white">Match Requests</h2>
        <p className="text-xs text-gray-400">{requests.length} pending requests</p>
      </div>
      
      <div
        ref={listRef}
        className={`max-h-[400px] overflow-y-auto p-4 ${
          displayScrollbar
            ? "[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060606] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]"
            : "scrollbar-hide"
        }`}
        onScroll={handleScroll}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#222 #060606',
        }}
      >
        {requests.map((request, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <MatchRequestItem 
              item={request} 
              isSelected={selectedIndex === index} 
              onAccept={() => handleAccept(request)}
              onReject={() => handleReject(request)}
            />
          </AnimatedItem>
        ))}
      </div>
      
      {showGradients && (
        <>
          <div
            className="absolute top-[50px] left-0 right-0 h-[50px] bg-gradient-to-b from-[#060606] to-transparent pointer-events-none transition-opacity duration-300 ease"
            style={{ opacity: topGradientOpacity }}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-[50px] bg-gradient-to-t from-[#060606] to-transparent pointer-events-none transition-opacity duration-300 ease"
            style={{ opacity: bottomGradientOpacity }}
          ></div>
        </>
      )}
    </div>
  );
};

export default MatchRequestList;
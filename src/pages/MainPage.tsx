import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Page Components
const UserProfile = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <h2 className="text-3xl font-semibold mb-6">Your Profile</h2>
    {/* Add profile content here */}
  </div>
);

const ChatBot = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <h2 className="text-3xl font-semibold mb-6">Chat Assistant</h2>
    {/* Add chatbot interface here */}
  </div>
);

const MatchRequests = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <h2 className="text-3xl font-semibold mb-6">Match Requests</h2>
    {/* Add match requests content here */}
  </div>
);

const Matches = () => (
  <div className="h-full flex flex-col items-center justify-center">
    <h2 className="text-3xl font-semibold mb-6">Your Matches</h2>
    {/* Add matches content here */}
  </div>
);

const MainPage: React.FC = () => {
  const [activePage, setActivePage] = useState<'profile' | 'chatbot' | 'requests' | 'matches'>('profile');

  const pages = {
    profile: <UserProfile />,
    chatbot: <ChatBot />,
    requests: <MatchRequests />,
    matches: <Matches />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <NavButton
            active={activePage === 'profile'}
            onClick={() => setActivePage('profile')}
            icon="👤"
            label="Profile"
          />
          <NavButton
            active={activePage === 'chatbot'}
            onClick={() => setActivePage('chatbot')}
            icon="💭"
            label="ChatBot"
          />
          <NavButton
            active={activePage === 'requests'}
            onClick={() => setActivePage('requests')}
            icon="💌"
            label="Requests"
          />
          <NavButton
            active={activePage === 'matches'}
            onClick={() => setActivePage('matches')}
            icon="❤️"
            label="Matches"
          />
        </div>

        {/* Content Area */}
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 min-h-[600px]"
        >
          {pages[activePage]}
        </motion.div>
      </div>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center px-6 py-3 rounded-xl transition-all duration-300
      ${active 
        ? 'bg-rose-500 text-white shadow-lg scale-105' 
        : 'bg-white text-gray-600 hover:bg-rose-100'}
    `}
  >
    <span className="text-2xl mb-1">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

export default MainPage; 
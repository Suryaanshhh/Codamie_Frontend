import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"
import { User, Heart, UserPlus, MessageSquareMore, Code, Github, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
// Sample profiles data
const profiles = [
  {
    id: 1,
    name: 'Alex',
    age: 28,
    emoji: '👨‍💻',
    role: 'Full Stack Developer',
    skills: ['JavaScript', 'React', 'Node.js'],
    bio: 'Passionate about clean code and building amazing user experiences. Looking for someone who shares my enthusiasm for technology and innovation.',
    github: 'https://github.com/alex',
  },
  {
    id: 2,
    name: 'Sarah',
    age: 25,
    emoji: '👩‍💻',
    role: 'Frontend Developer',
    skills: ['React', 'TypeScript', 'Tailwind'],
    bio: 'Creative developer with an eye for design. Love building beautiful and accessible web applications.',
    github: 'https://github.com/sarah',
  },
  {
    id: 3,
    name: 'Mike',
    age: 30,
    emoji: '🧑‍💻',
    role: 'Backend Developer',
    skills: ['Python', 'Django', 'PostgreSQL'],
    bio: 'Backend enthusiast specializing in scalable architectures. Always eager to learn new technologies.',
    github: 'https://github.com/mike',
  },
  {
    id: 4,
    name: 'Emma',
    age: 27,
    emoji: '👩‍💻',
    role: 'DevOps Engineer',
    skills: ['Docker', 'Kubernetes', 'AWS'],
    bio: 'Automating everything possible. Passionate about CI/CD and cloud technologies.',
    github: 'https://github.com/emma',
  }
];




const UserProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userProfiles, setUserProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipedProfiles, setSwipedProfiles] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle URL token if present
  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) {
      localStorage.setItem("token", urlToken);
    }
  }, [searchParams]);

  // Fetch profiles
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    axios.get("http://localhost:3000/showprofiles", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then((response) => {
      if (response.data && response.data.profile) {
        setUserProfiles(response.data.profile);
      } else {
        setUserProfiles([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching profiles:", error);
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []); // Empty dependency array means this runs once on component mount

  const currentProfile = userProfiles.length > 0 ? userProfiles[currentProfileIndex] : null;

  const handleSwipe = (direction) => {
    if (!currentProfile) return;
    
    // Add current profile to swiped set
    setSwipedProfiles(prev => new Set([...prev, currentProfile.id]));
    
    // Move to next profile if available
    if (currentProfileIndex < userProfiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    }
    
    console.log(`Swiped ${direction} on ${currentProfile.Name}`);
  };

  const handleNavigate = (direction) => {
    if (direction === 'prev' && currentProfileIndex > 0) {
      setCurrentProfileIndex(prev => prev - 1);
    } else if (direction === 'next' && currentProfileIndex < userProfiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading profiles...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="text-xl text-red-600">Failed to load profiles. Please try again later.</div>
      </div>
    );
  }

  // No profiles available
  if (userProfiles.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="text-xl text-gray-600">No profiles available</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-[500px] flex flex-col relative">
      <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
        <button 
          onClick={() => handleNavigate('prev')}
          disabled={currentProfileIndex === 0}
          className={`p-2 rounded-full ${currentProfileIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
        <button 
          onClick={() => handleNavigate('next')}
          disabled={currentProfileIndex === userProfiles.length - 1}
          className={`p-2 rounded-full ${currentProfileIndex === userProfiles.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-white rounded-lg p-6">
        <div className="text-8xl animate-bounce">{currentProfile.Avatar}</div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentProfile.Name}, {currentProfile.Age}
          </h2>
          <p className="text-blue-600 font-medium">{currentProfile.devType}</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <Code size={16} className="text-gray-600" />
            <span className="text-gray-600">{currentProfile.CodingLanguage}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-700 text-center">{currentProfile.Biodata}</p>
        </div>

        <div className="text-sm text-gray-500">
          Profile {currentProfileIndex + 1} of {userProfiles.length}
        </div>
      </div>

      <div className="flex justify-center space-x-4 p-4">
        <button 
          className="p-4 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 shadow-lg hover:shadow-xl"
          onClick={() => handleSwipe('left')}
        >
          <X size={24} />
        </button>
        <button 
          className="p-4 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors duration-200 shadow-lg hover:shadow-xl"
          onClick={() => handleSwipe('right')}
        >
          <Check size={24} />
        </button>
      </div>
    </div>
  );
};
const UserMatches = () => (
  <div className="h-[500px] overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Perfect Matches</h2>
    <div className="grid grid-cols-2 gap-4">
      {[
        { emoji: '👩‍💻', name: 'Emma', age: 26, role: 'Frontend Dev' },
        { emoji: '👨‍💻', name: 'James', age: 29, role: 'Backend Dev' },
        { emoji: '🧑‍💻', name: 'Sam', age: 27, role: 'UI/UX Designer' },
        { emoji: '👩‍💻', name: 'Sophie', age: 25, role: 'Data Scientist' }
      ].map((match, index) => (
        <div key={index} className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-5xl">{match.emoji}</div>
            <div className="text-center">
              <p className="font-medium text-gray-800">{match.name}, {match.age}</p>
              <p className="text-sm text-blue-600">{match.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MatchRequests = () => (
  <div className="h-[500px] overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Connection Requests</h2>
    <div className="space-y-4">
      {[
        { emoji: '👨‍💻', name: 'Michael', age: 29, role: 'DevOps Engineer', mutual: 3 },
        { emoji: '👩‍💻', name: 'Lisa', age: 27, role: 'Software Architect', mutual: 4 }
      ].map((request, index) => (
        <div key={index} className="bg-white rounded-lg p-4 flex items-center space-x-4">
          <div className="text-4xl">{request.emoji}</div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{request.name}, {request.age}</h3>
            <p className="text-sm text-blue-600">{request.role}</p>
            <p className="text-sm text-gray-600">{request.mutual} mutual connections</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <UserPlus size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AiChatBot = () => (
  <div className="h-[500px] flex flex-col">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Code Assistant</h2>
    <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-4">
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[80%]">
          Hey! I need help with a React component. 🤔
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
          <div className="text-2xl mb-2">🤖</div>
          I'd be happy to help! What specific part of React are you working with?
        </div>
      </div>
    </div>
    <div className="flex space-x-2 mt-4">
      <input
        type="text"
        placeholder="Ask anything about coding..."
        className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Send
      </button>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'matches', icon: Heart, label: 'Matches' },
    { id: 'requests', icon: UserPlus, label: 'Requests' },
    { id: 'chat', icon: MessageSquareMore, label: 'AI Chat' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'matches':
        return <UserMatches />;
      case 'requests':
        return <MatchRequests />;
      case 'chat':
        return <AiChatBot />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-4 border-b bg-white">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center p-4 space-y-1 transition-colors duration-200
                    ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
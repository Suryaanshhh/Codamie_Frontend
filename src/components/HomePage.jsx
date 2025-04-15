import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"
import { User, Heart, HeartOff,Eye, UserPlus, MessageSquareMore, Code, Github, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode"





const UserProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [originalProfiles, setOriginalProfiles] = useState([]);
  const [orderedProfiles, setOrderedProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swipedProfiles, setSwipedProfiles] = useState(new Set());
  const [viewedProfiles, setViewedProfiles] = useState(new Set());
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
          const profiles = response.data.profile;
          setOriginalProfiles(profiles);
          setOrderedProfiles([...profiles]); // Create a copy to maintain original order initially
        } else {
          setOriginalProfiles([]);
          setOrderedProfiles([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); 

  // Safely get the current profile
  const currentProfile = currentProfileIndex < orderedProfiles.length ? orderedProfiles[currentProfileIndex] : null;

  // Mark current profile as viewed when it changes
  useEffect(() => {
    if (currentProfile) {
      setViewedProfiles(prev => new Set([...prev, currentProfile.id]));
    }
  }, [currentProfileIndex, currentProfile]);

  const handleSwipe = (direction) => {
    if (!currentProfile) return;

    // Add current profile to swiped set
    setSwipedProfiles(prev => new Set([...prev, currentProfile.id]));

    if (direction === "left") {
      // Create a new array with the current profile moved to the end
      const updatedProfiles = [...orderedProfiles];
      const profileToMove = updatedProfiles.splice(currentProfileIndex, 1)[0];
      updatedProfiles.push(profileToMove);
      
      setOrderedProfiles(updatedProfiles);
      // Keep the same index - this will now show the next profile
      // unless we're at the end of the list
      if (currentProfileIndex >= updatedProfiles.length - 1) {
        setCurrentProfileIndex(updatedProfiles.length - 1);
      }
    } else if (direction === "right") {
      // Handle right swipe - create match request
      const Personid = { id: currentProfile.UserId };
      axios.post("http://localhost:3000/createMatchRequest", Personid, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error("Error creating match request:", error);
      });
      
      // For right swipe, remove the profile and move to the next one
      const updatedProfiles = [...orderedProfiles];
      updatedProfiles.splice(currentProfileIndex, 1);
      setOrderedProfiles(updatedProfiles);
      
      // Make sure the index doesn't go out of bounds
      if (currentProfileIndex >= updatedProfiles.length) {
        setCurrentProfileIndex(Math.max(0, updatedProfiles.length - 1));
      }
    }
  };

  const handleNavigate = (direction) => {
    if (direction === 'prev' && currentProfileIndex > 0) {
      setCurrentProfileIndex(prev => prev - 1);
    } else if (direction === 'next' && currentProfileIndex < orderedProfiles.length - 1) {
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
  if (orderedProfiles.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="text-xl text-gray-600">No profiles available</div>
      </div>
    );
  }

  // Check if this is a second chance profile (was previously swiped left)
  const isSecondChanceProfile = () => {
    if (!currentProfile) return false;
    
    const originalIndex = originalProfiles.findIndex(p => p.id === currentProfile.id);
    const currentOrderIndex = orderedProfiles.findIndex(p => p.id === currentProfile.id);
    
    return currentOrderIndex > originalIndex;
  };

  // Check if this profile has been viewed before
  const hasBeenViewedBefore = () => {
    if (!currentProfile) return false;
    
    // If this profile is in viewedProfiles set AND it's not the first time we're viewing it
    // (we consider the first viewing as "current" not "previous")
    const profileViews = Array.from(viewedProfiles).filter(id => id === currentProfile.id).length;
    return viewedProfiles.has(currentProfile.id) && profileViews > 1;
  };

  // If we've somehow lost our current profile, show an empty state
  if (!currentProfile) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="text-xl text-gray-600">No more profiles to show</div>
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
          disabled={currentProfileIndex === orderedProfiles.length - 1}
          className={`p-2 rounded-full ${currentProfileIndex === orderedProfiles.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6 bg-white rounded-lg p-6">
        {/* Status indicators */}
        <div className="absolute top-2 right-2 flex space-x-2">
          {hasBeenViewedBefore() && (
            <div className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full flex items-center text-xs">
              <Eye size={12} className="mr-1" /> Previously viewed
            </div>
          )}
        </div>
        
        <div className="text-8xl animate-bounce">{currentProfile.Avatar}</div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentProfile.Name}, {currentProfile.Age}, {currentProfile.Gender[0]}
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

        {/* Status indicators */}
        <div className="flex flex-wrap justify-center gap-2">
          {isSecondChanceProfile() && (
            <span className="text-xs text-orange-500 italic px-2 py-1 bg-orange-50 rounded-full">
              You previously passed on this profile
            </span>
          )}
        </div>

        <div className="text-sm text-gray-500">
          Profile {currentProfileIndex + 1} of {orderedProfiles.length}
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


const UserMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/matchList", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then((response) => {
        setMatches(response.data.matches);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Get the current user's ID from the token
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : { userID: null };
  const currentUserID = decoded.userID;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-indigo-600 font-medium">Loading your matches...</div>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <User size={40} className="mb-2 text-gray-400" />
        <p className="text-lg font-medium">No matches found yet</p>
        <p className="text-sm">Keep exploring to find your perfect match!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-indigo-800 text-center">Your Perfect Matches</h2>
      <div className="h-96 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match, index) => {
            // Determine if the current user is User1 or User2
            const isUser1 = currentUserID === match.User1;
            const isUser2 = currentUserID === match.User2;
            
            // Only show matches where the current user is involved
            if (!isUser1 && !isUser2) return null;
            
            // Get the name of the other user
            const otherUserName = isUser1 ? match.User2Name : match.User1Name;
            
            // Generate a consistent color based on the name
            const nameHash = otherUserName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const colors = ['bg-pink-100', 'bg-purple-100', 'bg-indigo-100', 'bg-blue-100', 'bg-teal-100'];
            const borderColors = ['border-pink-300', 'border-purple-300', 'border-indigo-300', 'border-blue-300', 'border-teal-300'];
            const textColors = ['text-pink-800', 'text-purple-800', 'text-indigo-800', 'text-blue-800', 'text-teal-800'];
            
            const colorIndex = nameHash % colors.length;
            
            return (
              <div 
                key={index} 
                className={`${colors[colorIndex]} border ${borderColors[colorIndex]} rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white ${textColors[colorIndex]}`}>
                      {otherUserName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className={`font-medium ${textColors[colorIndex]}`}>{otherUserName}</p>
                    <p className="text-xs text-gray-500">Perfect Match</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const MatchRequests = () => {

  function requestAccepted(data) {
    axios.post("http://localhost:3000/addToMatch", data, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.error("Error accepting request:", error);
    })
  }

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/showMatchRequests", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((response) => {
      console.log(response.data.allMatches)
      setRequests(response.data.allMatches)
    }).catch((error) => {
      console.error("Error fetching requests:", error);
    })
  }, [])

  return <div className="h-[500px] overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Connection Requests</h2>
    <div className="space-y-4">
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <div key={index} className="bg-white rounded-lg p-4 flex items-center space-x-4">
            <div className="text-4xl">{request.Avatar}</div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{request.Name}, {request.Age}</h3>
              <p className="text-sm text-blue-600">{request.devType}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-red-600 hover:bg-red-200 rounded-full transition-colors">
                <HeartOff size={20} />
              </button>
              <button onClick={() => requestAccepted(request)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                <UserPlus size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-gray-500">No connection requests available</p>
        </div>
      )}
    </div>
  </div>
};
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
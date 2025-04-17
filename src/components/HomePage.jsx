import React, { useEffect, useState,useRef} from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"
import { User, Heart, HeartOff,Eye, UserPlus,MessageCircle,Send ,Calendar, MessageSquareMore, Code, Github, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode"
import { io } from 'socket.io-client';




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
  const [chatModal, setChatModal] = useState({
    isOpen: false,
    recipientId: null,
    recipientName: ""
  });
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  
  // Socket.io connection
  const socketRef = useRef();
  const [connected, setConnected] = useState(false);

  // Get the current user's ID from the token
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : { userID: null };
  const currentUserID = decoded.userID;

  // Initialize socket connection
  useEffect(() => {
    // Create socket connection
    socketRef.current = io('http://localhost:3000', {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    // Socket connection events
    socketRef.current.on('connect', () => {
      console.log('Connected to socket server');
      setConnected(true);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnected(false);
    });

    // Listen for incoming messages
    socketRef.current.on('receive_message', (messageData) => {
      if (chatModal.isOpen && chatModal.recipientId === messageData.senderId) {
        // Add message to chat if the chat with this user is open
        setChatMessages(prevMessages => [...prevMessages, {
          sender: messageData.senderId,
          content: messageData.content,
          timestamp: messageData.createdAt
        }]);
        
        // Mark message as read
        markMessagesAsRead(messageData.senderId);
      } else {
        // Could add notification logic here when receiving a message
        // and the chat is not open with that user
        console.log('New message received:', messageData);
      }
    });

    socketRef.current.on('message_sent', (response) => {
      if (!response.success) {
        console.error('Error sending message:', response.error);
        // Could add error handling UI here
      }
    });

    // Clean up on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [chatModal]);

  // Fetch matches
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

  // Fetch chat history when opening chat
  const fetchChatHistory = async (recipientId) => {
    try {
      const response = await axios.get(`http://localhost:3000/${recipientId}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      
      // Transform messages to the format our component uses
      const formattedMessages = response.data.messages.map(msg => ({
        sender: msg.senderId,
        content: msg.content,
        timestamp: msg.createdAt
      }));
      
      setChatMessages(formattedMessages);
      
      // Mark messages from this sender as read
      markMessagesAsRead(recipientId);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setChatMessages([]);
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async (senderId) => {
    try {
      await axios.put(`http://localhost:3000/read/${senderId}`, {}, {
        headers: { Authorization: localStorage.getItem("token") }
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const openChatModal = async (recipientId, recipientName) => {
    setChatModal({
      isOpen: true,
      recipientId,
      recipientName
    });
    
    // Fetch chat history
    await fetchChatHistory(recipientId);
  };

  const closeChatModal = () => {
    setChatModal({
      isOpen: false,
      recipientId: null,
      recipientName: ""
    });
    setMessage("");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !connected) return;

    // Create message object
    const messageData = {
      senderId: currentUserID,
      recipientId: chatModal.recipientId,
      content: message
    };
    
    // Send message through socket
    socketRef.current.emit('send_message', messageData);
    
    // Add message to local state (optimistic UI update)
    const newMessage = {
      sender: currentUserID,
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
  };

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
            
            // Get the name and ID of the other user
            const otherUserName = isUser1 ? match.User2Name : match.User1Name;
            const otherUserId = isUser1 ? match.User2 : match.User1;
            
            // Generate a consistent color based on the name
            const nameHash = otherUserName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const colors = ['bg-pink-100', 'bg-purple-100', 'bg-indigo-100', 'bg-blue-100', 'bg-teal-100'];
            const borderColors = ['border-pink-300', 'border-purple-300', 'border-indigo-300', 'border-blue-300', 'border-teal-300'];
            const textColors = ['text-pink-800', 'text-purple-800', 'text-indigo-800', 'text-blue-800', 'text-teal-800'];
            const buttonColors = ['bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-blue-500', 'bg-teal-500'];
            
            const colorIndex = nameHash % colors.length;
            
            return (
              <div 
                key={index} 
                className={`${colors[colorIndex]} border ${borderColors[colorIndex]} rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white ${textColors[colorIndex]}`}>
                      {otherUserName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className={`font-medium ${textColors[colorIndex]}`}>{otherUserName}</p>
                    <div className="flex items-center">
                      <p className="text-xs text-gray-500">Perfect Match</p>
                      {match.isOnline && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => openChatModal(otherUserId, otherUserName)}
                  className={`w-full ${buttonColors[colorIndex]} hover:opacity-90 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all duration-200`}
                >
                  <MessageCircle size={16} className="mr-2" />
                  <span>Send Message</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Modal */}
      {chatModal.isOpen && (
        <div className="fixed inset-0 bg-indigo-100 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-medium">
                  {chatModal.recipientName.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{chatModal.recipientName}</span>
              </div>
              <button 
                onClick={closeChatModal}
                className="text-white hover:bg-indigo-700 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chatMessages.map((msg, i) => {
                const isCurrentUser = msg.sender === currentUserID;
                return (
                  <div 
                    key={i} 
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs px-4 py-2 rounded-lg shadow-sm ${
                        isCurrentUser 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${isCurrentUser ? 'text-indigo-100' : 'text-gray-500'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Message Input */}
            <form onSubmit={sendMessage} className="border-t border-gray-200 p-3 flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button 
                type="submit"
                disabled={!connected}
                className={`${connected ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400'} text-white px-4 py-2 rounded-r-lg transition-colors duration-200`}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};



const MatchRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function viewProfile(data) {
    setSelectedProfile(data);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

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

  return (
    <div className="relative">
      <div className="h-96 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Connection Requests</h2>
        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex items-center space-x-4 shadow-sm hover:shadow transition-all">
                <div className="text-4xl">{request.Avatar}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{request.Name}, {request.Age}</h3>
                  <p className="text-sm text-blue-600">{request.devType}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors">
                    <HeartOff size={20} />
                  </button>
                  <button 
                    onClick={() => requestAccepted(request)} 
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <UserPlus size={20} />
                  </button>
                 
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-gray-500">No connection requests available</p>
            </div>
          )}
        </div>
      </div>

      {/* Compact Profile Modal */}
      {showModal && selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-sm shadow-lg">
            {/* Compact Header */}
            <div className="relative bg-indigo-600 py-3 px-4">
              <button 
                onClick={closeModal} 
                className="absolute right-3 top-2.5 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-3xl bg-white text-indigo-600 rounded-full h-12 w-12 flex items-center justify-center">
                  {selectedProfile.Avatar}
                </div>
                <div className="text-white">
                  <h2 className="text-lg font-semibold">{selectedProfile.Name}, {selectedProfile.Age}</h2>
                  <div className="flex items-center mt-0.5">
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                      {selectedProfile.devType}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Content */}
            <div className="p-4 max-h-72 overflow-y-auto">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center">
                  <User size={16} className="text-indigo-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="text-sm font-medium">{selectedProfile.Gender}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Code size={16} className="text-indigo-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Language</p>
                    <p className="text-sm font-medium">{selectedProfile.CodingLanguage}</p>
                  </div>
                </div>
              </div>

              {/* Bio (if exists) */}
              {selectedProfile.Biodata && (
                <div className="mb-3">
                  <h3 className="text-xs uppercase text-gray-500 font-semibold mb-1">Bio</h3>
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                    {selectedProfile.Biodata}
                  </p>
                </div>
              )}

              {/* Member Since */}
              <div className="flex items-center text-xs text-gray-500 mt-2">
                <Calendar size={14} className="mr-1.5" />
                Member since {new Date(selectedProfile.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short'
                })}
              </div>
            </div>

            {/* Compact Actions */}
            <div className="bg-gray-50 p-3 flex space-x-2">
              <button 
                onClick={closeModal}
                className="flex-1 py-1.5 border border-gray-300 rounded text-gray-600 text-sm hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  requestAccepted(selectedProfile);
                  closeModal();
                }}
                className="flex-1 py-1.5 bg-indigo-600 rounded text-white text-sm hover:bg-indigo-700 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



const AiChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto scroll to bottom when messages update
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Format conversation history for API
    const conversationHistory = messages
      .reduce((acc, msg, index, array) => {
        if (msg.sender === 'user' && index + 1 < array.length && array[index + 1].sender === 'bot') {
          acc.push({
            user: msg.text,
            bot: array[index + 1].text
          });
        }
        return acc;
      }, []);
    
    setIsLoading(true);
    setInput('');
    
    try {
      const response = await fetch('http://localhost:3000/aiBot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          conversationHistory
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Add bot response
      setMessages(prevMessages => [
        ...prevMessages,
        { text: data.generated_text, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "I'm having trouble connecting right now. Please try again later.", sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="h-[500px] flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Delulu Mate</h2>
      <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <>
            <div className="flex justify-end">
            </div>
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
                <div className="text-2xl mb-2">🐾</div>
                I am your AI soulmate! Here to help you with improving your mental health.
              </div>
            </div>
          </>
        ) : (
          messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white shadow-sm'
                } rounded-lg p-3 max-w-[80%]`}
              >
                {message.sender === 'bot' && <div className="text-2xl mb-2">🐾</div>}
                {message.text}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
              <div className="text-2xl mb-2">🐾</div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={sendMessage} className="flex space-x-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about coding..."
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`px-6 py-3 ${
            isLoading || !input.trim() ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white rounded-lg transition-colors`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 p-8">
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
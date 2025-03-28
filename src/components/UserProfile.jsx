import React, { useState } from 'react';
import { Heart, Code } from 'lucide-react';

const emojis = [
  '👨‍💻',  '🤓', '😎',  
   '👽', '🦸', '🦹', 
  '🧝',  '🤠', '👩‍🔬', '👨‍🔬'
];

const programmingLanguages = [
  'JavaScript', 
  'Python', 
  'Java', 
  'C++', 
];

export const UserProfile = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    console.log(selectedEmoji)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white flex items-center justify-center">
            <Heart className="mr-3 text-white" />
            Create Your Coder Cupid Profile
            <Code className="ml-3 text-white" />
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Emoji Selection */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl mb-4 text-gray-700">Choose Your Avatar</h2>
            <div className="grid grid-cols-5 gap-4">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  className={`text-6xl p-2 rounded-lg transition-all duration-300 ${
                    selectedEmoji === emoji 
                    ? 'bg-purple-200 border-4 border-purple-500 scale-110' 
                    : 'hover:bg-pink-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {selectedEmoji && (
              <p className="mt-4 text-gray-600">
                Selected Avatar: {selectedEmoji}
              </p>
            )}
          </div>

          {/* Coding Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-gray-700">Coding Experience</label>
              <select
                name="experience"
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              >
                <option value="">Select Experience Level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Favorite Programming Language</label>
              <select
                name="favoriteLanguage"
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              >
                <option value="">Select Your Favorite Language</option>
                {programmingLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block mb-2 text-gray-700">Your Interests</label>
            <div className="flex mb-4">
              <input
                type="text"
                name="newInterest"
                className="w-full p-3 border-2 border-pink-200 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Add an interest"
              />
              <button
                type="button"
                className="bg-purple-500 text-white px-4 rounded-lg hover:bg-purple-600 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {/* Interests will be dynamically added here */}
            </div>
          </div>

          {/* About Me */}
          <div>
            <label className="block mb-2 text-gray-700">Tell Us About Yourself</label>
            <textarea
              name="bio"
              className="w-full p-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              rows="4"
              placeholder="Share your coding passion, dreams, and what you're looking for in a partner..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
            >
              Create Codamie Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


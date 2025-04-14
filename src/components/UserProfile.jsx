import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from 'axios';

export default function UserProfile() {

  const [searchParams] = useSearchParams();

  const urlToken = searchParams.get("token");
  if (urlToken) {
    localStorage.setItem("token", urlToken);
  }
  console.log(urlToken)


  const [avatar, setAvatar] = useState('👩‍💻');
  const [codingLanguage, setCodingLanguage] = useState('JavaScript');
  const [engineeringForte, setEngineeringForte] = useState('Full Stack Developer');
  const [about, setAbout] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const maxCharCount = 150;

  // Avatar options with cool emojis
  const avatarOptions = [
    { emoji: '👩‍💻', label: 'Woman Technologist' },
    { emoji: '👨‍💻', label: 'Man Technologist' },
    { emoji: '🧑', label: 'Person Technologist' },
    { emoji: '👸', label: 'Princess' },
    { emoji: '🦸‍♀️', label: 'Superwoman' },
    { emoji: '🦸‍♂️', label: 'Superman' },
    { emoji: '🧙‍♀️', label: 'Wizard Woman' },
    { emoji: '🧙‍♂️', label: 'Wizard Man' },
    { emoji: '👾', label: 'Alien Monster' },
    { emoji: '🤖', label: 'Robot' }
  ];

  // Programming language options
  const languageOptions = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Go',
    'Ruby'
  ];

  // Engineering forte options
  const forteOptions = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'AI Engineer',
    'DevOps Engineer',
    'Mobile Developer'
  ];

  // Gender options
  const genderOptions = [
    'Female',
    'Male',
    'Non-binary',
    'Other',
    'Prefer not to say'
  ];

  // Update character count when about text changes
  useEffect(() => {
    setCharCount(about.length);
  }, [about]);

  // Handle avatar selection
  const handleAvatarChange = (selectedAvatar) => {
    setAvatar(selectedAvatar);
  };

  // Handle about text change
  const handleAboutChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharCount) {
      setAbout(text);
    }
  };

  // Handle age input
  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 18 && parseInt(value) <= 100)) {
      setAge(value);
    }
  };


  function createProfile() {
    const data = {
      Avatar: avatar,
      Age: age,
      CodingLanguage: codingLanguage,
      Forte: engineeringForte,
      Biodata: about,
      Gender: gender
    }


    axios.post("http://localhost:3000/createUserProfile", data, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }

  return (
    <section className="py-16 bg-indigo-50 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
          Create Your Coding Profile
        </h2>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left Column - Avatar */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Choose your avatar
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {avatarOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAvatarChange(option.emoji)}
                      className={`text-2xl p-1 rounded-lg transition-all ${avatar === option.emoji
                        ? 'bg-indigo-100 border-2 border-indigo-500 scale-105'
                        : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        }`}
                      title={option.label}
                    >
                      {option.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Avatar Display */}
              <div className="flex justify-center mb-6">
                <div className="bg-indigo-50 rounded-full w-24 h-24 flex items-center justify-center">
                  <span className="text-5xl">{avatar}</span>
                </div>
              </div>

              {/* Profile Summary - Mobile only */}
              <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 rounded-lg md:hidden">
                <h3 className="text-md font-medium text-gray-800 mb-2">Your Profile</h3>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{avatar}</span>
                  <div>
                    <div className="text-sm text-gray-600 font-medium">{engineeringForte}</div>
                    <div className="text-sm text-indigo-600">{codingLanguage}</div>
                    <div className="text-sm text-gray-500">{age && `${age} years`} • {gender}</div>
                  </div>
                </div>
                {about && (
                  <div className="text-sm text-gray-600 mt-2 border-t border-gray-200 pt-2">
                    {about.length > 50 ? `${about.substring(0, 50)}...` : about}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="md:col-span-3">
              <div className="space-y-4 mb-6">
                {/* Age and Gender Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Age Input */}
                  <div>
                    <label htmlFor="age" className="block text-gray-700 text-sm font-medium mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      value={age}
                      onChange={handleAgeChange}
                      min="18"
                      max="100"
                      placeholder="Enter age"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-gray-700 bg-white border border-gray-300"
                    />
                  </div>

                  {/* Gender Selection */}
                  <div>
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-2">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 pl-3 pr-10 text-gray-700 appearance-none bg-white border border-gray-300"
                      >
                        <option value="">Select gender</option>
                        {genderOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coding Language Selection */}
                <div>
                  <label htmlFor="codingLanguage" className="block text-gray-700 text-sm font-medium mb-2">
                    Favorite Coding Language
                  </label>
                  <div className="relative">
                    <select
                      id="codingLanguage"
                      value={codingLanguage}
                      onChange={(e) => setCodingLanguage(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 pl-3 pr-10 text-gray-700 appearance-none bg-white border border-gray-300"
                    >
                      {languageOptions.map((language, index) => (
                        <option key={index} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Engineering Forte Selection */}
                <div>
                  <label htmlFor="engineeringForte" className="block text-gray-700 text-sm font-medium mb-2">
                    Engineering Forte
                  </label>
                  <div className="relative">
                    <select
                      id="engineeringForte"
                      value={engineeringForte}
                      onChange={(e) => setEngineeringForte(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 pl-3 pr-10 text-gray-700 appearance-none bg-white border border-gray-300"
                    >
                      {forteOptions.map((forte, index) => (
                        <option key={index} value={forte}>
                          {forte}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>


                <div>
                  <label htmlFor="engineeringForte" className="block text-gray-700 text-sm font-medium mb-2">
                    Engineering Forte
                  </label>
                  <div className="relative">

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <label htmlFor="about" className="block text-gray-700 text-sm font-medium mb-2">
                    About Me
                  </label>
                  <div className="relative">
                    <textarea
                      id="about"
                      value={about}
                      onChange={handleAboutChange}
                      placeholder="Tell potential matches about yourself, your coding journey, and what you're looking for..."
                      rows="5"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-gray-700 bg-white border border-gray-300 resize-none"
                    />
                    <div className={`text-xs mt-1 text-right ${charCount > maxCharCount * 0.8 ? 'text-amber-600' : 'text-gray-500'}`}>
                      {charCount}/{maxCharCount} characters
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Summary - Desktop only */}
              <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-4 rounded-lg hidden md:block">
                <h3 className="text-md font-medium text-gray-800 mb-2">Your Profile</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{avatar}</span>
                  <div>
                    <div className="text-sm text-gray-600 font-medium">{engineeringForte}</div>
                    <div className="text-sm text-indigo-600">{codingLanguage}</div>
                    <div className="text-sm text-gray-500">{age && `${age} years`} • {gender}</div>
                  </div>
                  {about && (
                    <div className="text-sm text-gray-600 border-l border-gray-200 pl-4">
                      {about.length > 50 ? `${about.substring(0, 50)}...` : about}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button onClick={createProfile} className="mt-6 w-full py-3 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            Save Profile
          </button>
        </div>
      </div>
    </section>
  );
}
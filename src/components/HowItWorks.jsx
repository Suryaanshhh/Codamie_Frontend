import React from 'react';
import { UserPlus, Send, MessageSquare, Bot, Code2, Heart } from 'lucide-react';

const features = [
  {
    title: "Smart Developer Matchmaking",
    description: "Our algorithm matches you based on coding languages, frameworks, and development philosophies. Find someone who shares your passion for clean code and proper indentation.",
    icon: UserPlus,
    color: "from-violet-600 to-indigo-600"
  },
  {
    title: "Connection Requests",
    description: "Send a 'pull request' to connect. Include a custom message showcasing your personality, just like your commit messages - clear, concise, and occasionally witty.",
    icon: Send,
    color: "from-blue-600 to-cyan-600"
  },
  {
    title: "Real-time Chat",
    description: "Once connected, start debugging life together. Our real-time messaging system is faster than your development environment, with zero lag time.",
    icon: MessageSquare,
    color: "from-emerald-600 to-teal-600"
  },
  {
    title: "AI Companion",
    description: "No matches yet? Our AI companion is always online to chat, debug your dating strategy, or discuss the latest tech trends. Think of it as pair programming for your love life.",
    icon: Bot,
    color: "from-orange-600 to-red-600"
  }
];

export default function HowItWorks() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Codamie</span> Works
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Where algorithms meet romance, and every match is a perfect compilation
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <div className="mb-6">
                  <div className={`rounded-lg bg-gradient-to-r ${feature.color} p-2 w-12 h-12 flex items-center justify-center`}>
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-50 to-cyan-50 p-8 ring-1 ring-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code2 className="h-6 w-6 text-indigo-600" />
                <Heart className="h-5 w-5 text-pink-500" />
              </div>
              <span className="text-sm text-gray-500">Finding your perfect pair programmer...</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Ready to compile your love story?</h3>
            <p className="mt-2 text-gray-600">
              Join thousands of developers who found their perfect match. Whether you're a front-end fashionista or a backend boss, there's someone out there who complements your stack perfectly.
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Start Coding Together
                <Heart className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
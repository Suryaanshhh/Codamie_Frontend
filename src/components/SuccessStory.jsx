import React from 'react';
import { Heart, Code2, Coffee, Bug, GitBranch } from 'lucide-react';

const stories = [
  {
    id: 1,
    title: "404 Found: Love in the Debug Queue",
    author: "Priya Debugger & Arjun Query",
    role: "Senior Bug Creators",
    content: "We met while fixing the same infinite loop. Turns out, we were both stuck in one - just emotionally.",
    icon: Bug
  },
  {
    id: 2,
    title: "Git Blame Led to Git Ring",
    author: "Neha Branch & Rahul Merge",
    role: "Code Conflict Resolvers",
    content: "She git-blamed me for breaking production. I git-blamed her heart. Now we're in a committed relationship.",
    icon: GitBranch
  },
  {
    id: 3,
    title: "The Coffee.join(Hearts) Story",
    author: "Sneha Script & Mohit Module",
    role: "Caffeine Dependent Developers",
    content: "Our love started with a shared coffee machine error. Now we're a perfect brew of compilation and compatibility.",
    icon: Coffee
  },
  {
    id: 4,
    title: "From Code Review to 'I Do' View",
    author: "Kavita Loop & Tanmay Terminal",
    role: "Pull Request Partners",
    content: "She approved my PR, I approved her proposal. Best merge conflict resolution ever.",
    icon: Code2
  }
];

export default function SuccessStories() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Success Stories from the <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Where merge conflicts lead to marriage contracts
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {stories.map((story) => {
            const IconComponent = story.icon;
            return (
              <article key={story.id} className="flex flex-col items-start justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-x-4 text-xs">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-indigo-600" />
                    <Heart className="h-4 w-4 text-pink-500" />
                  </div>
                  <span className="text-gray-500">{story.role}</span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-indigo-600">
                    {story.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{story.content}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {story.author.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">{story.author}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
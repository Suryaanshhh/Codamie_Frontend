import React, { useState } from 'react';

export default function Blog() {
  // Blog post data
  const blogPosts = [
    {
      id: 1,
      category: "Love & Code",
      title: "When Our Git Branches Merged: A Developer Love Story",
      author: "Jessica Chen",
      date: "April 5, 2025",
      image: "/api/placeholder/800/500",
      excerpt: "How a pull request turned into a marriage proposal and what other developers can learn from our journey together.",
      content: `
        <p>It all started with a heated GitHub discussion about the proper way to format JSON. I was adamant about my approach; he wouldn't budge on his. What began as a technical disagreement blossomed into late-night code reviews that had less to do with code and more to do with getting to know each other.</p>
        
        <p>Three years later, Max proposed by creating a special Git repository where the commit history spelled out "Will you marry me?" when viewed as a contribution graph. How could I say no to someone who would go to such lengths?</p>
        
        <h3>The Debugging Process of Love</h3>
        
        <p>Dating another developer comes with unique advantages. We troubleshoot household problems like we debug code, breaking issues down methodically. When we disagree, we create "branches" of our argument, work through them separately, then "merge" our conclusions.</p>
        
        <p>Communication is our strong suit. We've established our own protocols and know when to use synchronous versus asynchronous communication. Sometimes a quick Slack message works; other times, we need a face-to-face "standup" to resolve issues.</p>
        
        <h3>Building Our Relationship Library</h3>
        
        <p>Just as we rely on tried-and-true code libraries in our work, we've developed our own relationship functions we can call when needed:</p>
        
        <ul>
          <li><code>resolveConflict(issue, perspectives)</code> - Our approach to working through disagreements</li>
          <li><code>celebrateWin(achievement, partner)</code> - Supporting each other's professional victories</li>
          <li><code>scheduleQualityTime(date, activity)</code> - Making sure work doesn't consume our relationship</li>
        </ul>
        
        <p>For any developers navigating romance with another tech enthusiast, remember: the best relationships, like the best code, require constant refactoring, thoughtful documentation, and regular deployment of appreciation.</p>
      `
    },
    {
      id: 2,
      category: "Dating Tips",
      title: "5 Perfect Date Ideas for Developer Couples",
      author: "Marcus Johnson",
      date: "March 28, 2025",
      image: "/api/placeholder/800/500",
      excerpt: "Move beyond coffee shop coding sessions with these creative date ideas that combine romance and technology.",
      content: `
        <p>Developer couples often default to side-by-side coding sessions as quality time. While there's something intimate about quietly solving problems together, variety keeps relationships exciting. Here are five date ideas tailored for couples who speak the language of code:</p>
        
        <h3>1. Hackathon for Two</h3>
        
        <p>Create your own mini hackathon! Set a timer for 4-6 hours and build something fun together that you've both been wanting to try. Maybe it's a smart home gadget, a game, or a website for your future pet. The key is choosing a project with a definable endpoint so you can celebrate your accomplishment together.</p>
        
        <h3>2. Tech Museum Adventure</h3>
        
        <p>Many cities have interactive technology or science museums. Make a day of exploring exhibits, challenging each other in interactive games, and discussing how far technology has come—and where it might go next. End the day with dinner where you can continue your conversations.</p>
        
        <h3>3. Retro Gaming Night</h3>
        
        <p>Set up classic consoles or visit an arcade bar. There's something delightfully nostalgic about pixelated graphics and simple gameplay mechanics. Plus, taking turns or playing cooperatively creates natural opportunities for playful competition and teamwork.</p>
        
        <h3>4. Code & Cook</h3>
        
        <p>Programming and cooking have surprising similarities—both involve following procedures to create something greater than the sum of its parts. Find a recipe neither of you has tried, approach it like a coding problem, and collaborate on executing it. Bonus: You'll enjoy eating the results together!</p>
        
        <h3>5. Stargazing with Tech</h3>
        
        <p>Bring a telescope and astronomy apps to a dark spot away from city lights. There's something deeply romantic about exploring the cosmos together, identifying constellations, and contemplating the same questions that have fascinated humans for millennia—now with the assistance of technology.</p>
        
        <p>Remember, the goal of these dates isn't to be productive—it's to connect. Use your shared love of technology as a foundation, but focus on building memories rather than applications.</p>
      `
    },
    {
      id: 3,
      category: "Technical Tutorials",
      title: "Building a React-Powered Digital Love Letter",
      author: "Aisha Patel",
      date: "March 15, 2025",
      image: "/api/placeholder/800/500",
      excerpt: "Express your feelings through code with this step-by-step guide to creating an interactive love letter using React.",
      content: `
        <p>There's something uniquely personal about building something for someone you care about. In this tutorial, I'll walk you through creating a digital love letter that showcases both your technical skills and your feelings.</p>
        
        <h3>Project Overview</h3>
        
        <p>We'll build a React application that presents an interactive love letter with animations, personalized messages, and perhaps a few inside jokes. The final product will be something you can send as a link or deploy permanently as a testament to your relationship.</p>
        
        <h3>Setting Up the Project</h3>
        
        <p>First, create a new React application:</p>
        
        <pre><code>npx create-react-app love-letter
cd love-letter</code></pre>
        
        <p>Install the necessary dependencies:</p>
        
        <pre><code>npm install framer-motion react-confetti styled-components</code></pre>
        
        <h3>Creating the Love Letter Component</h3>
        
        <p>The heart of our application will be the LoveLetter component. Here's a simplified version to get you started:</p>
        
        <pre><code>import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import styled from 'styled-components';

const LoveLetterContainer = styled.div\`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff5f5;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
\`;

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const openLetter = () => {
    setIsOpen(true);
    setTimeout(() => setShowConfetti(true), 500);
    setTimeout(() => setShowConfetti(false), 5000);
  };
  
  return (
    <>
      {showConfetti && <Confetti />}
      <LoveLetterContainer>
        {!isOpen ? (
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={openLetter}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <h2>A Special Message for You</h2>
            <p>Click to open</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>To My Favorite Person</h1>
            <p>
              // Your heartfelt message goes here
            </p>
            <p>
              // Maybe reference your inside jokes or special memories
            </p>
            <p className="signature">
              With all my heart,<br />
              Your Name
            </p>
          </motion.div>
        )}
      </LoveLetterContainer>
    </>
  );
};

export default LoveLetter;</code></pre>
        
        <h3>Personalizing Your Love Letter</h3>
        
        <p>This is where you make the project truly yours. Consider adding:</p>
        
        <ul>
          <li>Photos that appear with animations</li>
          <li>Interactive elements that reveal special messages when clicked</li>
          <li>Background music that's significant to your relationship</li>
          <li>A timeline of your relationship milestones</li>
        </ul>
        
        <p>Remember, the technical implementation matters less than the thought behind it. Your partner will appreciate the effort and personal touches more than perfect code.</p>
        
        <h3>Deployment</h3>
        
        <p>Once you're happy with your creation, deploy it using a service like Netlify or Vercel:</p>
        
        <pre><code>npm run build
npx netlify-cli deploy</code></pre>
        
        <p>This will give you a URL you can share with your special someone.</p>
        
        <h3>Conclusion</h3>
        
        <p>Building something personal with your technical skills creates a unique expression of your feelings. It combines what you're good at with what you care about—a powerful combination that's sure to make an impression.</p>
        
        <p>If you create your own version, I'd love to hear about it in the comments (details omitted for privacy, of course)!</p>
      `
    },
    {
      id: 4,
      category: "Success Stories",
      title: "From Stack Overflow to Soulmates: How We Found Love Through Code Reviews",
      author: "David & Sophia Rodriguez",
      date: "March 5, 2025",
      image: "/api/placeholder/800/500",
      excerpt: "Our journey from online code collaboration to walking down the aisle, and the lessons we learned along the way.",
      content: `
        <p>Five years ago, I (David) posted a question on Stack Overflow about optimizing a particularly tricky database query. Most responses were helpful but clinical—except for one. Sophia's answer not only solved my problem but included a witty comment about my variable naming that made me laugh out loud in my otherwise silent office.</p>
        
        <p>I checked her profile and noticed we had answered questions in many of the same categories. On impulse, I sent a message thanking her for the help and asking if she'd be willing to review some other code I was working on. To my surprise, she agreed.</p>
        
        <h3>From Collaboration to Connection</h3>
        
        <p>What started as occasional code reviews evolved into daily conversations. We moved from Stack Overflow to GitHub, then to Slack, and finally to video calls. The first time we actually saw each other's faces was three months after that initial interaction.</p>
        
        <p>We were both surprised to find that the comfortable rapport we'd developed through text translated perfectly to real-time conversation. Our first video call was supposed to last 30 minutes—it went for four hours.</p>
        
        <h3>The Long-Distance Challenge</h3>
        
        <p>I was in Seattle; Sophia was in Austin. For a year, we maintained what we jokingly called our "distributed relationship system"—with daily video calls, watching movies simultaneously while on voice chat, and even cooking the same meals together from our respective kitchens.</p>
        
        <p>We met in person for the first time at a tech conference in Chicago. By the end of that week, we both knew this was something special.</p>
        
        <h3>Merging Our Lives</h3>
        
        <p>Six months later, I transferred to my company's Austin office. A year after that, I proposed with a custom mechanical keyboard where the special keys spelled out "Marry Me?" When pressed in sequence, they triggered a small screen to display photos from our relationship.</p>
        
        <p>Last month, we were married in a ceremony that included subtle nods to how we met—our vows contained coding metaphors, and our wedding hashtag was #MergeRequest. Our cake topper featured two laptops with hearts on the screens.</p>
        
        <h3>What We've Learned</h3>
        
        <p>Finding love through a shared passion for technology taught us several things:</p>
        
        <ol>
          <li>Technical communication skills translate surprisingly well to relationship communication</li>
          <li>Remote connection can be deeply meaningful before ever meeting in person</li>
          <li>Shared problem-solving approaches often indicate compatibility in other areas</li>
          <li>Never underestimate where helping someone else might lead</li>
        </ol>
        
        <p>For those still searching for their perfect pair programmer in life, our advice is simple: be authentically yourself in all your interactions, technical and otherwise. Your unique perspective might be exactly what catches someone's attention—just as Sophia's witty code review comment caught mine.</p>
      `
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  // Handle post selection
  const handlePostClick = (postId) => {
    const post = blogPosts.find(p => p.id === postId);
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  // Handle back to posts list
  const handleBackClick = () => {
    setSelectedPost(null);
  };

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-2 text-center">
          The <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Codamie</span> Blog
        </h1>
        <p className="text-gray-600 text-center mb-12">Where code and connection intertwine</p>
        
        {selectedPost ? (
          // Single Post View
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={handleBackClick}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to all posts
            </button>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-3">
                  <span className="bg-indigo-100 text-indigo-800 py-1 px-2 rounded-md mr-3">
                    {selectedPost.category}
                  </span>
                  <span className="mr-3">{selectedPost.date}</span>
                  <span>By {selectedPost.author}</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
                
                <div 
                  className="prose prose-indigo max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Blog Post Listing
          <>
            {/* Category filter */}
            <div className="flex flex-wrap justify-center mb-12">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Blog posts grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <div 
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                 
                  
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="bg-indigo-100 text-indigo-800 py-1 px-2 rounded-md mr-2">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <button
                        onClick={() => handlePostClick(post.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  2
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  3
                </button>
                <span className="px-3 py-1">...</span>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  8
                </button>
                <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                  Next
                </button>
              </nav>
            </div>
            
            {/* Newsletter signup */}
            <div className="mt-16 bg-indigo-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Subscribe to our newsletter</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Get the latest articles on tech romance, dating tips for developers, and success stories delivered to your inbox.</p>
              
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-l-md border-t border-b border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
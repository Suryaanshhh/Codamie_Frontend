import BlurText from "./Blurtext";
import ProfileCard from "./ProifleCard";
import MatchesList from "./MatchesList";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

// Sample items with the structure compatible with our styled MatchesList
const matchItems = [
  { title: 'Suryansh Dwivedi', description: 'JavaScript Developer', id: 1, icon: '🦹' },
  { title: 'Jane Smith', description: 'UX Designer', id: 2, icon: '👩‍🎨' },
  { title: 'Alex Johnson', description: 'Product Manager', id: 3, icon: '👨‍💼' },
  { title: 'Maria Garcia', description: 'Backend Developer', id: 4, icon: '👩‍💻' },
  { title: 'Raj Patel', description: 'DevOps Engineer', id: 5, icon: '🧙‍♂️' },
  { title: 'Lin Wei', description: 'AI Researcher', id: 6, icon: '🤖' },
  { title: 'Sarah Connor', description: 'Security Specialist', id: 7, icon: '🔒' },
  { title: 'John Doe', description: 'Frontend Developer', id: 8, icon: '👨‍💻' },
  { title: 'Emma Wilson', description: 'Data Scientist', id: 9, icon: '📊' },
  { title: 'Michael Brown', description: 'Mobile Developer', id: 10, icon: '📱' }
];

export const Homepage = () => {
  return (
    <div className="min-h-screen bg-rose-50">
      {/* Header section with blurred text */}
      <div className="pt-16 pb-12">
        <BlurText
          text="Welcome to Codamie"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-5xl font-serif flex justify-center"
        />
      </div>

      {/* Main content with profile cards and matches list */}
      <div className="flex justify-center items-start gap-12 px-8 flex-wrap md:flex-nowrap">
        {/* Profile Card Container */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6 text-center">Discover Profiles</h2>
          <div style={{ height: '600px', position: 'relative' }}>
            <ProfileCard
              baseWidth={350}
              autoplay={false}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        </div>

        {/* Matches List Container */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6 text-center">Your Matches</h2>
          <div style={{ height: '600px', position: 'relative' }}>
            <MatchesList
              items={matchItems}
              onItemSelect={(item, index) => console.log(item, index)}
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={true}
            />
          </div>
        </div>
      </div>

      {/* Footer with gradient line */}
      <div className="mt-16 pb-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-6"></div>
        <p className="text-center text-gray-400 text-sm">© 2025 Codamie. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Homepage;
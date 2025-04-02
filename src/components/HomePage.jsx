import BlurText from "./Blurtext";
import ProfileCard from "./ProifleCard"
const handleAnimationComplete = () => {
    console.log('Animation completed!');
};

export const Homepage = () => {
    return <div className='min-h-screen bg-rose-50'>
        <div className="pt-10">
            <BlurText
                text="Welcome to Codamie"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-4xl  font-serif flex justify-center"
            />
        </div>

        <div className="m-15" style={{ height: '600px', position: 'relative' }}>
            <ProfileCard
                baseWidth={300}
                autoplay={false}
                autoplayDelay={3000}
                pauseOnHover={true}
                loop={true}
                round={false}
            />
        </div>

        
    </div>
}
import { Link } from 'react-router-dom'
import { FaRocket, FaUsers, FaTrophy, FaCode, FaCalendar, FaClock, FaHeart, FaLaptopCode, FaUsersCog, FaFileCode, FaAward, FaChartLine, FaMapMarkerAlt } from 'react-icons/fa'
import { HiOutlineUserGroup, HiOutlineLightningBolt, HiOutlineClipboardCheck, HiOutlinePresentationChartLine } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import Button from '../components/ui/Button'
import Navigation from '../components/layout/Navigation'
import Footer from '../components/layout/Footer'

// Import brand icons
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaJs, 
  FaAws, FaGoogle, FaGithub, FaDocker, FaFigma 
} from 'react-icons/fa'
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, 
  SiMongodb, SiPostgresql, SiFirebase, 
  SiVercel, SiRedux, SiGraphql, SiKubernetes,
  SiDjango, SiFlask, SiExpress, SiNestjs,
  SiAmazon, SiMicrosoft, SiApple, SiIntel,
  SiNvidia, SiAdobe, SiSpotify, SiNetflix
} from 'react-icons/si'

export default function LandingPage() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { currentPhase } = useSelector((state) => state.phase)

  const getPhaseInfo = () => {
    const phases = {
      registration: { label: 'Registration', color: 'text-blue-600' },
      team_formation: { label: 'Team Formation', color: 'text-green-600' },
      hackathon_live: { label: 'Hackathon Live', color: 'text-purple-600' },
      submission: { label: 'Submission', color: 'text-yellow-600' },
      judging: { label: 'Judging', color: 'text-orange-600' },
      results: { label: 'Results', color: 'text-red-600' },
    }
    return phases[currentPhase] || phases.registration
  }

  const phaseInfo = getPhaseInfo()

  // Logo data with minimal black style and real colors on hover
  const topLogos = [
    { Icon: FaReact, name: 'React', color: '#61DAFB', delay: '0s' },
    { Icon: SiTypescript, name: 'TypeScript', color: '#3178C6', delay: '0.2s' },
    { Icon: SiNextdotjs, name: 'Next.js', color: '#000000', delay: '0.4s' },
    { Icon: FaNodeJs, name: 'Node.js', color: '#339933', delay: '0.6s' },
    { Icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4', delay: '0.8s' },
    { Icon: SiRedux, name: 'Redux', color: '#764ABC', delay: '1s' },
    { Icon: SiGraphql, name: 'GraphQL', color: '#E10098', delay: '1.2s' },
    { Icon: SiNestjs, name: 'NestJS', color: '#E0234E', delay: '1.4s' },
  ]

  const bottomLogos = [
    { Icon: FaPython, name: 'Python', color: '#3776AB', delay: '0s' },
    { Icon: SiDjango, name: 'Django', color: '#092E20', delay: '0.2s' },
    { Icon: FaAws, name: 'AWS', color: '#FF9900', delay: '0.4s' },
    { Icon: FaGoogle, name: 'Google', color: '#4285F4', delay: '0.6s' },
    { Icon: SiMicrosoft, name: 'Microsoft', color: '#00A4EF', delay: '0.8s' },
    { Icon: FaDocker, name: 'Docker', color: '#2496ED', delay: '1s' },
    { Icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5', delay: '1.2s' },
    { Icon: SiMongodb, name: 'MongoDB', color: '#47A248', delay: '1.4s' },
    { Icon: SiPostgresql, name: 'PostgreSQL', color: '#336791', delay: '1.6s' },
    { Icon: SiFirebase, name: 'Firebase', color: '#FFCA28', delay: '1.8s' },
    { Icon: FaFigma, name: 'Figma', color: '#F24E1E', delay: '2s' },
    { Icon: SiAdobe, name: 'Adobe', color: '#FF0000', delay: '2.2s' },
    { Icon: SiNvidia, name: 'NVIDIA', color: '#76B900', delay: '2.4s' },
    { Icon: SiIntel, name: 'Intel', color: '#0071C5', delay: '2.6s' },
    { Icon: SiApple, name: 'Apple', color: '#000000', delay: '2.8s' },
    { Icon: SiSpotify, name: 'Spotify', color: '#1DB954', delay: '3s' },
    { Icon: SiNetflix, name: 'Netflix', color: '#E50914', delay: '3.2s' },
  ]

  // EVENT LOCATION - CHANGE THIS TO YOUR LOCATION
  const eventLocation = {
    name: 'Tech Innovation Center',
    address: '123 Innovation Drive, San Francisco, CA 94107',
    coordinates: '37.7749,-122.4194', // Latitude,Longitude for San Francisco
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6821566882766!2d-122.419416484682!3d37.774929779759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c9a1c7c6d%3A0x3c4c3c8b0b0b0b0b!2s123%20Innovation%20Drive%2C%20San%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus'
    // To get a new embed URL: 
    // 1. Go to Google Maps
    // 2. Find your location
    // 3. Click "Share" → "Embed a map"
    // 4. Copy the iframe src URL
  }

  // Roadmap data
  const roadmapSteps = [
    {
      id: 1,
      title: 'Registration',
      description: 'Sign up and get approved to participate',
      icon: <FaUsers className="w-5 h-5" />,
      color: 'border-blue-600',
      hoverColor: 'bg-blue-50',
      position: 'left'
    },
    {
      id: 2,
      title: 'Team Formation',
      description: 'Join or create your dream team',
      icon: <FaUsersCog className="w-5 h-5" />,
      color: 'border-green-600',
      hoverColor: 'bg-green-50',
      position: 'right'
    },
    {
      id: 3,
      title: 'Hackathon Kickoff',
      description: '24-hour coding marathon begins',
      icon: <FaLaptopCode className="w-5 h-5" />,
      color: 'border-purple-600',
      hoverColor: 'bg-purple-50',
      position: 'left'
    },
    {
      id: 4,
      title: 'Project Submission',
      description: 'Submit your final project',
      icon: <FaFileCode className="w-5 h-5" />,
      color: 'border-yellow-600',
      hoverColor: 'bg-yellow-50',
      position: 'right'
    },
    {
      id: 5,
      title: 'Judging',
      description: 'Projects evaluated by experts',
      icon: <HiOutlinePresentationChartLine className="w-5 h-5" />,
      color: 'border-orange-600',
      hoverColor: 'bg-orange-50',
      position: 'left'
    },
    {
      id: 6,
      title: 'Results & Awards',
      description: 'Winners announced and prizes awarded',
      icon: <FaAward className="w-5 h-5" />,
      color: 'border-red-600',
      hoverColor: 'bg-red-50',
      position: 'right'
    }
  ]

  // Image gallery data
  const galleryImages = [
    {
      id: 1,
      src: '/img1.jpeg',
      alt: 'Hackathon participants collaborating',
      size: 'big', // big or small
      colSpan: 'col-span-2 md:col-span-2',
      rowSpan: 'row-span-2'
    },
    {
      id: 2,
      src: '/img2.jpeg',
      alt: 'Coding session in progress',
      size: 'small',
      colSpan: 'col-span-1 md:col-span-1',
      rowSpan: 'row-span-1'
    },
    {
      id: 3,
      src: '/img3.jpeg',
      alt: 'Team brainstorming ideas',
      size: 'small',
      colSpan: 'col-span-1 md:col-span-1',
      rowSpan: 'row-span-1'
    },
    {
      id: 4,
      src: '/img4.jpeg',
      alt: 'Final presentations',
      size: 'big',
      colSpan: 'col-span-2 md:col-span-2',
      rowSpan: 'row-span-2'
    },
    {
      id: 5,
      src: '/img5.jpeg',
      alt: 'Networking at the event',
      size: 'small',
      colSpan: 'col-span-1 md:col-span-1',
      rowSpan: 'row-span-1'
    },
    {
      id: 6,
      src: '/img6.jpeg',
      alt: 'Winners celebration',
      size: 'small',
      colSpan: 'col-span-1 md:col-span-1',
      rowSpan: 'row-span-1'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main>
        {/* Hero Section with Image */}
        <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/image1.jpeg" 
              alt="Hackathon Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            {/* Phase & Donate Badge */}
            <div className="inline-flex items-center gap-6 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 ${phaseInfo.color}`}></div>
                <span className="font-medium text-white">{phaseInfo.label}</span>
              </div>
              <div className="h-4 w-px bg-white/30"></div>
              <Link 
                to="/donate" 
                className="flex items-center gap-2 text-white hover:text-red-300 transition-colors group"
              >
                <FaHeart className="w-3 h-3 text-red-400 group-hover:text-red-300 transition-colors" />
                <span className="text-sm font-medium">Donate</span>
              </Link>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block">Build.</span>
              <span className="block mt-2">Collaborate.</span>
              <span className="block mt-2">Innovate.</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Join the ultimate 24-hour hackathon experience. Work with brilliant minds,
              build amazing projects, and compete for incredible prizes.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 bg-gray-900 text-white hover:bg-gray-800 border-0">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="px-8 bg-gray-900 text-white hover:bg-gray-800 border-0">
                      <FaRocket className="mr-2" />
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="px-8 bg-transparent border border-white text-white hover:bg-white/10"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Infinite Scroll Logo Marquee Section */}
        <section className="py-12 bg-white overflow-hidden">
          <div className="relative">
            {/* Fade gradients on left and right */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            {/* Top Row - Scrolls to Right */}
            <div className="mb-10">
              <div className="flex animate-scroll-right">
                {/* Double the logos for seamless loop */}
                {[...topLogos, ...topLogos].map((logo, index) => (
                  <div 
                    key={`top-${index}`}
                    className="flex-shrink-0 px-8"
                    style={{ animationDelay: logo.delay }}
                  >
                    <div className="group relative flex flex-col items-center">
                      <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 group-hover:border-transparent transition-all duration-500 group-hover:shadow-lg">
                        <logo.Icon 
                          className="w-12 h-12 text-gray-800 group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                      <span className="mt-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        {logo.name}
                      </span>
                      {/* Color overlay on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500"
                        style={{ backgroundColor: logo.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bottom Row - Scrolls to Left */}
            <div>
              <div className="flex animate-scroll-left">
                {/* Double the logos for seamless loop */}
                {[...bottomLogos, ...bottomLogos].map((logo, index) => (
                  <div 
                    key={`bottom-${index}`}
                    className="flex-shrink-0 px-8"
                    style={{ animationDelay: logo.delay }}
                  >
                    <div className="group relative flex flex-col items-center">
                      <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-200 group-hover:border-transparent transition-all duration-500 group-hover:shadow-lg">
                        <logo.Icon 
                          className="w-12 h-12 text-gray-800 group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                      <span className="mt-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        {logo.name}
                      </span>
                      {/* Color overlay on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500"
                        style={{ backgroundColor: logo.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Section Title */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Technologies & Partners
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Work with industry-leading technologies and tools supported by our partners
            </p>
          </div>
        </section>

        {/* Why Participate Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Why Participate?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our hackathon brings together the best minds for an unforgettable experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="border border-gray-200 p-6 hover:border-gray-900 transition-all duration-300 group">
                <div className="mb-4">
                  <HiOutlineUserGroup className="w-8 h-8 text-gray-900 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Team Collaboration</h3>
                <p className="text-gray-600">
                  Work with talented developers, designers, and innovators. Build connections that last beyond the hackathon.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="border border-gray-200 p-6 hover:border-gray-900 transition-all duration-300 group">
                <div className="mb-4">
                  <FaTrophy className="w-8 h-8 text-gray-900 group-hover:text-yellow-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amazing Prizes</h3>
                <p className="text-gray-600">
                  Win cash prizes, tech gadgets, mentorship opportunities, and recognition from industry leaders.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="border border-gray-200 p-6 hover:border-gray-900 transition-all duration-300 group">
                <div className="mb-4">
                  <HiOutlineLightningBolt className="w-8 h-8 text-gray-900 group-hover:text-purple-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Real Projects</h3>
                <p className="text-gray-600">
                  Build solutions to real-world problems. Your project could be the next big thing!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Event Timeline Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="border border-gray-200 bg-white p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Event Timeline</h2>
                  <div className="space-y-6">
                    {/* Timeline Item 1 */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                        <FaCalendar className="w-5 h-5 text-gray-900" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">24-Hour Hackathon</h4>
                        <p className="text-gray-600 mt-1">
                          Build your project from scratch in just 24 hours
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Item 2 */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                        <HiOutlineClipboardCheck className="w-5 h-5 text-gray-900" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Real-time Collaboration</h4>
                        <p className="text-gray-600 mt-1">
                          Team chat, GitHub integration, and live updates
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Join Button */}
                  <div className="mt-8">
                    <Link to="/signup">
                      <Button size="lg" className="px-8 bg-gray-900 text-white hover:bg-gray-800">
                        Join Now
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div>
                  <div className="border border-gray-200 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Current Phase</span>
                        <span className={`font-medium ${phaseInfo.color}`}>
                          {phaseInfo.label}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="h-2 bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-gray-900 transition-all duration-1000"
                          style={{
                            width: phaseInfo.progress || '16%'
                          }}
                        />
                      </div>
                      
                      {/* Phase Labels */}
                      <div className="grid grid-cols-6 gap-1 text-xs text-gray-500">
                        <div className="text-center">Reg.</div>
                        <div className="text-center">Teams</div>
                        <div className="text-center">Live</div>
                        <div className="text-center">Submit</div>
                        <div className="text-center">Judge</div>
                        <div className="text-center">Results</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Event Roadmap</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow the journey from registration to victory
              </p>
            </div>
            
            {/* Roadmap Container */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2 hidden md:block"></div>
              
              {/* Roadmap Steps */}
              <div className="space-y-12">
                {roadmapSteps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`relative flex items-center ${
                      step.position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                    } gap-8`}
                  >
                    {/* Left Side Content */}
                    {step.position === 'left' ? (
                      <div className="flex-1 text-right hidden md:block">
                        <h3 className="font-semibold text-gray-900 text-lg">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    ) : null}
                    
                    {/* Center Node */}
                    <div className="relative z-10 flex-shrink-0">
                      <div 
                        className={`w-12 h-12 border-2 ${step.color} flex items-center justify-center bg-white hover:${step.hoverColor} transition-colors cursor-pointer group`}
                      >
                        <div className="text-gray-900 group-hover:scale-110 transition-transform">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Side Content */}
                    {step.position === 'right' ? (
                      <div className="flex-1 hidden md:block">
                        <h3 className="font-semibold text-gray-900 text-lg">{step.title}</h3>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                      </div>
                    ) : null}
                    
                    {/* Mobile Content (always shows below) */}
                    <div className="flex-1 md:hidden">
                      <h3 className="font-semibold text-gray-900 text-lg">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative overflow-hidden ${image.colSpan} ${image.rowSpan} group`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {image.alt}
                      </div>
                    </div>
                  </div>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
              ))}
            </div>
            
            {/* Optional: Gallery Navigation/Controls */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 italic text-sm">
                Glimpses from previous hackathon events
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-gray-400">Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">24</div>
                <div className="text-gray-400">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">$10k+</div>
                <div className="text-gray-400">In Prizes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Location Map Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-full mb-4">
                <FaMapMarkerAlt className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Event Location</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join us at our venue for an unforgettable hackathon experience
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Location Details Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg h-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Venue Details</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-900" />
                        Location
                      </h4>
                      <p className="text-gray-600">{eventLocation.name}</p>
                      <p className="text-gray-600">{eventLocation.address}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Event Details</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3"></span>
                          <span>24-hour non-stop hackathon</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3"></span>
                          <span>Free food & beverages provided</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3"></span>
                          <span>High-speed internet access</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3"></span>
                          <span>Comfortable workspaces</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Getting There</h4>
                      <p className="text-gray-600 mb-3">
                        The venue is easily accessible by public transportation and has ample parking available.
                      </p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(eventLocation.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium"
                      >
                        <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="lg:col-span-2">
                <div className="border border-gray-200 rounded-lg overflow-hidden h-full">
                  <div className="relative h-[400px] md:h-[500px]">
                    <iframe
                      src={eventLocation.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Hackathon Event Location"
                      className="absolute inset-0"
                    ></iframe>
                    
                    {/* Map Overlay Instructions */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-md shadow-sm">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Tip:</span> Drag to explore the area around the venue
                      </p>
                    </div>
                  </div>
                  
                  {/* Map Footer */}
                  <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <p className="text-sm text-gray-600">
                        View on{' '}
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventLocation.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 hover:underline font-medium"
                        >
                          Google Maps
                        </a>
                      </p>
                      <p className="text-xs text-gray-500">
                        Location: {eventLocation.coordinates}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Update Note */}
          
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
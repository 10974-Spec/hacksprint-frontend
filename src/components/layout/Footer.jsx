import { FaGithub, FaTwitter, FaDiscord, FaHeart, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Hackathon
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Build amazing projects, collaborate with brilliant minds, and compete in an unforgettable 24-hour hackathon experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</Link></li>
              <li><Link to="/schedule" className="text-gray-600 hover:text-gray-900 text-sm">Schedule</Link></li>
              <li><Link to="/prizes" className="text-gray-600 hover:text-gray-900 text-sm">Prizes</Link></li>
              <li><Link to="/judges" className="text-gray-600 hover:text-gray-900 text-sm">Judges</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/conduct" className="text-gray-600 hover:text-gray-900 text-sm">Code of Conduct</Link></li>
              <li><Link to="/guidelines" className="text-gray-600 hover:text-gray-900 text-sm">Submission Guidelines</Link></li>
              <li><Link to="/criteria" className="text-gray-600 hover:text-gray-900 text-sm">Judging Criteria</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-gray-900 text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Connect & Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors"
              >
                <FaGithub className="w-4 h-4 text-gray-900" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors"
              >
                <FaTwitter className="w-4 h-4 text-gray-900" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors"
              >
                <FaDiscord className="w-4 h-4 text-gray-900" />
              </a>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Stay updated</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-sm"
                />
                <button className="px-3 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800">
                  <FaEnvelope className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              © {currentYear} Hackathon Platform. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-gray-900">
                Terms of Service
              </Link>
              <Link to="/donate" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                <FaHeart className="w-3 h-3 text-red-500" />
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
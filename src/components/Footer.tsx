import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative bg-white border-t border-black/10 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Contact */}
          <div className="text-center space-y-2">
            <a
              href="mailto:emmanuel@getmotion.video"
              className="block text-black/70 hover:text-black transition-colors text-sm sm:text-base font-sans"
            >
              emmanuel@getmotion.video
            </a>
            <a
              href="https://wa.me/33768256764"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black/70 hover:text-black transition-colors text-sm sm:text-base font-sans"
            >
              +33 7 68 25 67 64
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              to="/privacy"
              className="text-black/60 hover:text-black transition-colors text-xs sm:text-sm font-sans"
            >
              Privacy Policy
            </Link>
            <span className="text-black/30">•</span>
            <Link
              to="/terms"
              className="text-black/60 hover:text-black transition-colors text-xs sm:text-sm font-sans"
            >
              Terms
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-black/40 text-xs sm:text-sm font-sans">
            © 2025 GetMotion
          </div>
        </div>
      </div>
    </footer>
  )
}

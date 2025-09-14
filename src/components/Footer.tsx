import { Instagram, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/20 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-white">Capo Vape Toronto</h3>
            <p className="text-gray-300 leading-relaxed font-light">
              Experience premium shisha meets cozy, social atmosphere. Where luxury hookah culture comes to life in the heart of Scarborough.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/capovape.ca" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 p-3 transition-colors border border-white"
              >
                <Instagram size={24} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Quick Contact</h4>
            <div className="space-y-4">
              <a href="tel:+16478099552" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <Phone size={20} />
                <span>+1 647-809-9552</span>
              </a>
              <a href="mailto:Moonloungetoronto@gmail.com" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                <Mail size={20} />
                <span>capovape@gmail.com</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>1811 Lawrence Ave E, Scarborough, ON M1R 2Y3</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white">Hours</h4>
            <div className="space-y-2 text-gray-300 font-light">
              <div className="flex justify-between">
                <span>Wed–Thu</span>
                <span>3pm–2am</span>
              </div>
              <div className="flex justify-between">
                <span>Fri–Sat</span>
                <span>5pm–3am</span>
              </div>
              <div className="flex justify-between">
                <span>Sun–Tue</span>
                <span>3pm–2am</span>
              </div>
            </div>
            <div className="bg-white/5 p-4 border border-white/20">
              <p className="text-white font-semibold text-sm">Reservations Recommended</p>
              <p className="text-gray-300 text-sm">Call or DM us on Instagram</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Solvenear. All rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
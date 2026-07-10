import { Mail, Phone, Clock, MapPin, Instagram, Heart } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (tab: 'menu' | 'about' | 'calendar') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-bakery-brown-dark text-bakery-cream-light border-t-2 border-bakery-gold/20 pt-16 pb-8" id="bakery-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bakery-cream-dark rounded-xl p-1 flex items-center justify-center border border-bakery-gold/30">
              <Logo className="w-8 h-8" />
            </div>
            <div>
              <span className="block font-serif text-lg tracking-wider font-extrabold uppercase text-white leading-none">
                Goldilocks
              </span>
              <span className="block font-sans text-[9px] tracking-widest text-bakery-gold font-bold uppercase mt-0.5">
                Micro-Bakery
              </span>
            </div>
          </div>
          <p className="text-xs text-bakery-cream-dark/70 leading-relaxed font-light">
            Crafting luxury artisanal brownies and gourmet cookies in exclusive micro-batches.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-bakery-brown-medium hover:bg-bakery-gold hover:text-bakery-brown-dark transition-all duration-300"
              aria-label="Instagram link"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-bakery-gold">Explore Menu</h4>
          <ul className="space-y-2.5 text-xs text-bakery-cream-dark/80 font-medium">
            <li>
              <button onClick={() => onNavigate('menu')} className="hover:text-bakery-gold transition-colors cursor-pointer text-left">
                Artisanal Brownies & Blondies
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('menu')} className="hover:text-bakery-gold transition-colors cursor-pointer text-left">
                Hand-Rolled Lattice Pies
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('menu')} className="hover:text-bakery-gold transition-colors cursor-pointer text-left">
                36-Hour Sourdoughs & Brioche
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('menu')} className="hover:text-bakery-gold transition-colors cursor-pointer text-left">
                Premium Layered Celebration Cakes
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('menu')} className="hover:text-bakery-gold transition-colors cursor-pointer text-left">
                Warm Cream Cheese Cinnamon Rolls
              </button>
            </li>
          </ul>
        </div>

        {/* Pre-order Policy column */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-bakery-gold">Our Philosophy</h4>
          <div className="space-y-3 text-xs text-bakery-cream-dark/80 font-light leading-relaxed">
            <div className="flex items-start gap-2.5">
              <Clock size={15} className="text-bakery-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">2 Days Prior Pre-Orders</p>
                <p className="text-bakery-cream-dark/60 mt-0.5">
                  To achieve maximum fermentation and pristine quality, place orders at least 48 hours in advance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-bakery-gold mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Fresh Handcrafted Quality</p>
                <p className="text-bakery-cream-dark/60 mt-0.5">
                  Baked exclusively to order. Never mass-produced, always curated with luxury ingredients.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info column */}
        <div className="space-y-4" id="bakery-contact-section">
          <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-bakery-gold">Contact & Orders</h4>
          <ul className="space-y-3 text-xs text-bakery-cream-dark/80 font-medium">
            <li className="flex items-center gap-3">
              <Mail size={15} className="text-bakery-gold" />
              <a href="mailto:goldilocksmicrobakery@gmail.com" className="hover:text-bakery-gold transition-colors">
                goldilocksmicrobakery@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} className="text-bakery-gold" />
              <a href="tel:03276930916" className="hover:text-bakery-gold transition-colors font-mono">
                03276930916
              </a>
            </li>
            <li className="text-[10px] text-bakery-cream-dark/50 pt-2 border-t border-bakery-brown-medium/50">
              Feel free to call or email us directly for bespoke event catering or special order requests.
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-bakery-brown-medium/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-bakery-cream-dark/50 font-light">
        <p>© 2026 Goldilocks Micro-Bakery. All culinary rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with baking passion and <Heart size={12} className="text-bakery-gold fill-current" /> for sweet enthusiasts.
        </p>
      </div>
    </footer>
  );
}

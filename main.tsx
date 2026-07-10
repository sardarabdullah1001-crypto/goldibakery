import { Star, Mail, Phone, Clock, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import Logo from './Logo';

interface AboutUsProps {
  onExploreMenu: () => void;
}

export default function AboutUs({ onExploreMenu }: AboutUsProps) {
  return (
    <div className="py-12 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-us-page">
      
      {/* Narrative Intro / Hero Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bakery-gold/10 border border-bakery-gold/20 text-xs font-semibold tracking-wider text-bakery-brown-medium uppercase">
            <Star size={13} className="fill-current text-bakery-gold" />
            <span>The Story of Goldilocks</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-bakery-brown-dark leading-tight">
            The Exquisite Art of <span className="text-bakery-gold italic">Slow-Batch</span> Baking.
          </h1>
          <p className="text-base text-bakery-brown-light leading-relaxed font-light">
            Founded with a commitment to pure culinary tradition, <strong className="font-medium text-bakery-brown-dark">Goldilocks Micro-Bakery</strong> was born out of a passion for high-fat French butter, slow fermentation, and the perfect blistered crust.
          </p>
          <p className="text-base text-bakery-brown-light leading-relaxed font-light">
            We do not believe in mass production. Instead, every single sourdough boule, braided brioche loaf, and fudgy salted caramel brownie is mixed, rolled, and shaped by hand. Our 36-hour slow fermentation process lets nature cultivate rich flavors and gentle digestibility, creating a bakery experience that feels both comforting and luxurious.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onExploreMenu}
              className="px-8 py-4 rounded-full bg-bakery-brown-dark text-bakery-cream hover:bg-bakery-brown-medium transition-all font-bold tracking-wide text-sm shadow-md cursor-pointer"
            >
              Explore the Menu
            </button>
            <a
              href="mailto:goldilocksmicrobakery@gmail.com"
              className="px-8 py-4 rounded-full border border-bakery-brown-medium/30 text-bakery-brown-dark hover:bg-bakery-cream-dark/40 transition-all font-bold tracking-wide text-sm flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              <span>Inquire for Bespoke Events</span>
            </a>
          </div>
        </div>

        {/* Narrative Visual Card */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-bakery-gold rounded-3xl rotate-3 opacity-10" />
          <div className="relative bg-bakery-cream-light border border-bakery-cream-dark rounded-3xl p-8 shadow-xl space-y-6">
            <div className="w-16 h-16 bg-bakery-cream-dark rounded-2xl flex items-center justify-center border border-bakery-gold/20">
              <Logo className="w-12 h-12" />
            </div>
            <p className="font-serif italic text-lg text-bakery-brown-dark leading-relaxed">
              &ldquo;Goldilocks stands for precise luxury. Our baking represents loops of endless dedication, premium Belgian chocolate, and meticulous timing. Because perfect taste cannot be rushed.&rdquo;
            </p>
            <div className="pt-2 border-t border-bakery-cream-dark">
              <p className="font-bold text-sm text-bakery-brown-dark">The Culinary Team</p>
              <p className="text-xs text-bakery-gold font-bold tracking-wider uppercase mt-0.5">Goldilocks Micro-Bakery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Features Grid */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-bakery-brown-dark">
            Our Golden Standards
          </h2>
          <p className="text-sm text-bakery-brown-light font-light leading-relaxed">
            Every ingredient is hand-selected and strictly organic where possible, and we follow rigorous traditional European techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-bakery-cream-light border border-bakery-cream-dark rounded-2xl p-8 space-y-4 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-bakery-gold/10 rounded-xl flex items-center justify-center text-bakery-gold">
              <Award size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg text-bakery-brown-dark">Pristine Butter & Grains</h3>
            <p className="text-xs text-bakery-brown-light font-light leading-relaxed">
              We exclusively use 82% fat grass-fed pasture butter and stone-ground heritage flours to guarantee structural perfection and deep crumb aromatics.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-bakery-cream-light border border-bakery-cream-dark rounded-2xl p-8 space-y-4 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-bakery-gold/10 rounded-xl flex items-center justify-center text-bakery-gold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg text-bakery-brown-dark">36-Hour Fermentation</h3>
            <p className="text-xs text-bakery-brown-light font-light leading-relaxed">
              By taking over 36 hours for leavening, our doughs break down gluten proteins naturally, resulting in a gentle, gut-friendly sourdough of pure nourishment.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-bakery-cream-light border border-bakery-cream-dark rounded-2xl p-8 space-y-4 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-bakery-gold/10 rounded-xl flex items-center justify-center text-bakery-gold">
              <HeartHandshake size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg text-bakery-brown-dark">Micro-Batch Exclusivity</h3>
            <p className="text-xs text-bakery-brown-light font-light leading-relaxed">
              We bake only on demand. Pre-ordering ensures zero waste and ensures your delicacies were loaded in the hearth exactly a few hours prior to receipt.
            </p>
          </div>
        </div>
      </section>

      {/* The 2-Day Pre-order Explanation Banner */}
      <section className="bg-bakery-brown-dark text-bakery-cream rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-bakery-gold/20">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-12 translate-x-12">
          <Clock size={320} className="text-bakery-gold" />
        </div>
        <div className="max-w-2xl space-y-6 relative z-10">
          <span className="text-xs font-bold tracking-widest text-bakery-gold uppercase">Why 2 Days Prior?</span>
          <h3 className="font-serif text-3xl font-bold tracking-tight text-white">
            Honoring the Timing of Live Yeast and Cultured Ferments
          </h3>
          <p className="text-sm text-bakery-cream-dark/80 leading-relaxed font-light">
            Real baking requires patient preparation. It takes a full 36 hours for our sourdough, brioche doughs, and premium pastries to ferment, prove, and develop to full flavor complexity.
          </p>
          <p className="text-sm text-bakery-cream-dark/80 leading-relaxed font-light">
            When you place your pre-order, you trigger a chain of meticulous preparation stages specifically allocated for your selection. That is why we cannot offer same-day fulfillment, and why your patience yields unmatched flavor.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-bakery-gold">
            <span className="bg-bakery-gold/10 px-3 py-1 rounded-full border border-bakery-gold/20 text-white">48h Minimum Prep</span>
            <span className="text-bakery-cream-dark/70">•</span>
            <span>Micro-batch Freshness Guaranteed</span>
          </div>
        </div>
      </section>

      {/* Contact Coordination Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-bakery-cream-light border border-bakery-cream-dark rounded-2xl p-8 flex gap-5 items-start">
          <div className="p-3 bg-bakery-gold/10 rounded-xl text-bakery-gold flex-shrink-0">
            <Phone size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-lg text-bakery-brown-dark">Give Us a Ring</h4>
            <p className="text-xs text-bakery-brown-light font-light leading-relaxed">
              Have questions regarding bespoke events, weddings, or dietary configurations? Call our head baker directly.
            </p>
            <p className="text-lg font-mono font-bold text-bakery-brown-dark">
              <a href="tel:03276930916" className="hover:text-bakery-gold transition-colors">
                03276930916
              </a>
            </p>
          </div>
        </div>

        <div className="bg-bakery-cream-light border border-bakery-cream-dark rounded-2xl p-8 flex gap-5 items-start">
          <div className="p-3 bg-bakery-gold/10 rounded-xl text-bakery-gold flex-shrink-0">
            <Mail size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-lg text-bakery-brown-dark">Bespoke Catering Inquiries</h4>
            <p className="text-xs text-bakery-brown-light font-light leading-relaxed">
              We specialize in premium corporate gifts, luxury high-tea boxes, and custom dessert boards.
            </p>
            <p className="text-base font-semibold text-bakery-brown-dark underline decoration-bakery-gold decoration-2 underline-offset-4">
              <a href="mailto:goldilocksmicrobakery@gmail.com" className="hover:text-bakery-gold transition-colors">
                goldilocksmicrobakery@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

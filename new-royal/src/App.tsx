import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Instagram, Facebook, ArrowRight, Clock, Star, ShieldCheck, Sparkles, Award, Menu, X, Crown, ChevronsLeftRight, Send } from 'lucide-react';
import { AssetProvider, useAsset, useAssetMap } from './imageRegistry';
import EditPanel from './EditPanel';

const WHATSAPP_NUMBER = '9779813451412';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_LINK = 'https://www.instagram.com/newroyalunisex/';
const FACEBOOK_LINK = 'https://www.facebook.com/NewRoyalBeautysalon12345/';

function TopBar() {
  const items = [
    '✨ NEW ROYAL BEAUTY & UNISEX SALON · NEW BANESHWOR',
    '💖 OPEN EVERYDAY 9:00 AM – 8:00 PM',
    '📞 BOOK HOTLINE: 981-3451412',
    '👰 ROYAL BRIDAL MAKEUP & SAREE DRAPING',
    '🌟 PREMIUM BALAYAGE & BLONDE HIGHLIGHTS',
    
  ];
  return (
    <div className="relative overflow-hidden border-b border-brand-500/20 bg-linear-to-r from-brand-700/40 via-brand-500/30 to-accent-500/30 backdrop-blur-sm">
      <div className="flex w-max animate-ticker">
        {[...Array(2)].map((_, g) => (
          <div key={g} className="flex shrink-0 items-center">
            {items.map((it, i) => (
              <span key={`${g}-${i}`} className="px-6 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-white/90 uppercase whitespace-nowrap">
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#celebs', label: 'Celebrity Wall' },
    { href: '#before-after', label: 'Before / After' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#location', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 w-full z-50 bg-dark-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          <a href="#top" className="shrink-0 flex items-center space-x-2.5 sm:space-x-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-500/60 animate-spin-slow"></div>
              <div className="text-white font-serif text-sm sm:text-base lg:text-lg leading-none relative z-10 w-full h-full flex items-center justify-center rounded-full bg-linear-to-br from-brand-500 to-brand-700 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-white text-xs sm:text-sm lg:text-base font-bold tracking-[0.12em] flex items-center gap-1.5">
                NEW ROYAL <Star className="w-3 h-3 text-brand-500 fill-brand-500" />
              </span>
              <span className="font-sans text-brand-400 text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-[0.22em] font-semibold">Beauty & Unisex Salon</span>
            </div>
          </a>

          <div className="hidden lg:flex space-x-8 xl:space-x-10 items-center">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium tracking-wide text-white/75 hover:text-brand-400 transition-colors">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-blue-400 transition-colors hover:scale-110">
                <Facebook className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-pink-400 transition-colors hover:scale-110">
                <Instagram className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-4 lg:px-5 py-2 lg:py-2.5 rounded-full text-[11px] lg:text-xs font-bold uppercase tracking-[0.18em] btn-glow transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Message WhatsApp</span>
            </a>
            <button className="lg:hidden text-white hover:text-brand-400 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full bg-dark-950/95 backdrop-blur-xl border-b border-brand-500/10 shadow-2xl origin-top"
          >
            <div className="flex flex-col px-5 py-3">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="text-sm font-medium tracking-wide text-white hover:text-brand-400 transition-colors block py-3.5 border-b border-white/5">{l.label}</a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-4 mb-2 inline-flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-[0.18em] btn-glow"
              >
                <Send className="w-4 h-4" />
                <span>Message WhatsApp</span>
              </a>
              <div className="flex items-center space-x-4 pt-3 pb-2">
                <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-blue-400 transition-colors hover:scale-110">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-pink-400 transition-colors hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const heroSrc = useAsset('hero.main');
  return (
    <section id="top" className="relative pt-10 sm:pt-12 lg:pt-16 pb-20 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-7 lg:space-y-8 order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 border border-brand-500/30 rounded-full px-3 py-1.5 sm:px-4 bg-brand-500/10 backdrop-blur">
            <div className="flex text-brand-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />)}
            </div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-white/90">4.9 · Rating <span className="text-white/50">(259 Genuine Reviews)</span></span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] xl:text-[5rem] font-serif text-white leading-[1.05] font-bold tracking-tight">
            Best Unisex Salon<br />
            <span className="text-gradient-pink">in New Baneshwor</span><br />
            <span className="text-white/85">Kathmandu</span>
          </h1>

          <p className="max-w-xl text-sm sm:text-base lg:text-lg text-white/65 leading-relaxed font-light">
            Professional hair, beauty, and makeup services with 12+ years of experience. We offer haircuts, styling, color, keratin treatments, nano plasia, bridal makeup, facials, nails, and more. Premium products, certified stylists, and affordable prices.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-xl border border-brand-500/20 bg-dark-800/60 backdrop-blur p-3.5 sm:p-5">
              <div className="text-brand-400 text-sm sm:text-base font-bold">Opens 9 AM</div>
              <div className="text-[10px] sm:text-xs text-white/45 uppercase tracking-wider mt-2 font-medium">Everyday</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-dark-800/60 backdrop-blur p-3.5 sm:p-5">
              <div className="text-white text-sm sm:text-base font-bold">981-345-1412</div>
              <div className="text-[10px] sm:text-xs text-white/45 uppercase tracking-wider mt-2 font-medium">Call Us</div>
            </div>
            <div className="hidden md:block rounded-xl border border-white/10 bg-dark-800/60 backdrop-blur p-3.5 sm:p-5">
              <div className="text-white text-sm sm:text-base font-bold">1.3 km</div>
              <div className="text-[10px] sm:text-xs text-white/45 uppercase tracking-wider mt-2 font-medium">From Center</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-6 py-4 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.18em] btn-glow transition-all group"
            >
              <Send className="w-4 h-4" />
              <span>Message WhatsApp</span>
            </a>
            <a
              href={`tel:+9779813451412`}
              className="hidden sm:flex items-center justify-center gap-2 border border-white/15 bg-white/5 text-white px-6 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.18em] hover:border-green-400/50 hover:bg-white/10 transition-all group"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-x-3 gap-y-2.5 text-[10px] sm:text-xs font-medium text-white/50 pt-4 sm:pt-6">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-green-400/80" /> Certified & Safe</span>
            <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-brand-400" /> 1000+ Clients</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-accent-400" /> Premium Products</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative aspect-4/5 sm:aspect-5/6 rounded-2xl lg:rounded-3xl overflow-hidden ring-glow border border-white/10 group">
            <img
              src={heroSrc}
              alt="New Royal Salon Interior"
              className="w-full h-full object-cover object-center premium-filter transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark-950 via-dark-950/40 to-transparent"></div>
            <div className="absolute inset-0 bg-linear-to-br from-brand-500/10 via-transparent to-transparent mix-blend-overlay"></div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-dark-900/70 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-right">
              <div className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-brand-400">Royal Rating</div>
              <div className="text-xl sm:text-2xl font-bold text-white">4.9<span className="text-xs sm:text-sm text-white/40 ml-1">/ 5</span></div>
            </div>

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 bg-dark-900/85 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 shrink-0" />
                  <span className="text-white text-sm sm:text-base font-bold hidden sm:inline">New Baneshwor, Kathmandu</span>
                  <span className="text-white text-xs sm:hidden font-bold">Get Directions</span>
                </div>
                <a href="#location" className="text-brand-400 hover:text-brand-300 transition-colors text-xs sm:text-sm font-bold whitespace-nowrap">→</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  const assets = useAssetMap();
  const googleLink = 'https://www.google.com/maps/search/?api=1&query=New+Royal+Beauty+Salon+New+Baneshwor+Kathmandu';
  const YEARS = '10+';
  const CLIENTS = '1000+';
  const RATING = '4.9';

  return (
    <section id="trust" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="rounded-2xl p-6 bg-dark-800/60 backdrop-blur border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-5 h-5 text-brand-400" />
                <div>
                  <div className="text-xs text-white/70 uppercase tracking-[0.18em] font-bold">Google Rating</div>
                  <div className="text-2xl text-white font-bold">{RATING} <span className="text-sm text-white/50">/ 5</span></div>
                </div>
              </div>
              <p className="text-white/60 text-sm">See genuine reviews and recent feedback from our clients.</p>
            </div>
            <a href={googleLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-300 hover:text-brand-400">
              View on Google →
            </a>
          </div>

          <div className="rounded-2xl p-6 bg-dark-800/60 backdrop-blur border border-white/10 flex flex-col">
            <div className="text-xs text-white/70 uppercase tracking-[0.18em] font-bold mb-3">Transformations</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <img src={assets['beforeAfter.0.before']} alt="Before sample" className="w-full h-28 object-cover rounded-lg" />
              <img src={assets['beforeAfter.0.after']} alt="After sample" className="w-full h-28 object-cover rounded-lg" />
              <img src={assets['beforeAfter.1.before']} alt="Before sample 2" className="w-full h-28 object-cover rounded-lg" />
              <img src={assets['beforeAfter.1.after']} alt="After sample 2" className="w-full h-28 object-cover rounded-lg" />
            </div>
            <a href="#before-after" className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-white/90 hover:text-brand-400">Explore Before / After →</a>
          </div>

          <div className="rounded-2xl p-6 bg-dark-800/60 backdrop-blur border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-xs text-white/70 uppercase tracking-[0.18em] font-bold mb-3">Our Trust</div>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold text-white">{CLIENTS}</div>
                <div className="text-sm text-white/60">Happy Clients</div>
              </div>
              <div className="flex items-baseline gap-3 mt-3">
                <div className="text-3xl font-bold text-white">{YEARS}</div>
                <div className="text-sm text-white/60">Years Experience</div>
              </div>
            </div>
            <a href={googleLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-300 hover:text-brand-400">Find Us on Map →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const images = [
    useAsset('marquee.0'),
    useAsset('marquee.1'),
    useAsset('marquee.2'),
    useAsset('marquee.3'),
    useAsset('marquee.4'),
    useAsset('marquee.5'),
  ];

  return (
    <div className="py-10 sm:py-14 bg-linear-to-r from-brand-600 via-brand-500 to-brand-700 overflow-hidden relative -rotate-2 scale-[1.04] border-y border-brand-400/40 shadow-[0_0_60px_-10px_rgba(236,72,153,0.6)]">
      <div className="flex w-max animate-marquee space-x-5 sm:space-x-8 px-4">
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex space-x-5 sm:space-x-8">
            {images.map((src, i) => (
              <div key={`${groupIndex}-${i}`} className="inline-block w-[180px] h-[230px] sm:w-60 sm:h-[300px] lg:w-[280px] lg:h-[350px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shrink-0 border border-white/20">
                <img src={src} className="w-full h-full object-cover hover:scale-105 transition-all duration-700" alt="Salon Vibes" loading="lazy" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-dark-950/40 via-transparent to-dark-950/40"></div>
    </div>
  );
}

const CELEB_LABELS = [
  { name: 'Royal Glam Session', tag: 'Editorial' },
  { name: 'Signature Bridal Glow', tag: 'Bridal' },
  { name: 'Red-Carpet Blowout', tag: 'Hair' },
  { name: 'Custom Color Reveal', tag: 'Color' },
  { name: 'Velvet Smokey Lash', tag: 'Makeup' },
  { name: 'Designer Highlights', tag: 'Color' },
  { name: 'Bollywood Saree Drape', tag: 'Bridal' },
  { name: 'Couture Cut & Style', tag: 'Hair' },
  { name: 'Glass Skin Finish', tag: 'Skin' },
];

function CelebrityWall() {
  const assets = useAssetMap();
  return (
    <section id="celebs" className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold tracking-[0.22em] text-brand-400 uppercase flex items-center justify-center gap-2">
            <Crown className="w-3.5 h-3.5" /> Our Work
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Professional <span className="text-gradient-pink">Hair & Beauty</span> Services
          </h2>
          <p className="text-white/60 font-light text-sm sm:text-base lg:text-lg px-2">
            See some of our best transformations and styling work from clients in Kathmandu.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {CELEB_LABELS.map((meta, i) => {
            const src = assets[`celeb.${i}`];
            const tall = i % 3 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-dark-800 ${tall ? 'aspect-3/4 sm:row-span-2 sm:aspect-3/5' : 'aspect-4/5'} hover:border-brand-500/50 transition-colors`}
              >
                <img
                  src={src}
                  alt={meta.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover premium-filter transition-all duration-700 group-hover:scale-[1.06]"
                />
                {/* premium tint overlay */}
                <div className="absolute inset-0 bg-linear-to-tr from-brand-700/25 via-transparent to-accent-500/10 mix-blend-overlay pointer-events-none"></div>
                {/* bottom gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-dark-950 via-dark-950/30 to-transparent"></div>
                {/* tag */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-dark-950/70 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] text-brand-300">
                  {meta.tag}
                </div>
                {/* heart icon */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-950/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                {/* caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div className="text-white font-serif text-sm sm:text-base lg:text-lg leading-tight">{meta.name}</div>
                  <div className="text-brand-300 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold mt-1">New Royal · Studio</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const BEFORE_AFTER_META = [
  {
    label: 'Blonde Highlights',
    beforeKey: 'beforeAfter.0.before',
    afterKey: 'beforeAfter.0.after',
    report: 'Client had dry hair and frizz. We applied custom blonde highlights with keratin treatment. Results: shiny, healthy, soft hair.',
    minutes: '120 Minutes',
    stylist: 'Hair Color specialist',
    products: 'Keratin treatment & premium color',
  },
  {
    label: 'Bridal Makeup & Hair',
    beforeKey: 'beforeAfter.1.before',
    afterKey: 'beforeAfter.1.after',
    report: 'Complete bridal package: professional makeup, saree draping, and hair styling. Bride looked beautiful and felt confident.',
    minutes: '180 Minutes',
    stylist: 'Bridal specialist',
    products: 'Professional makeup & styling',
  },
];

function BeforeAfter() {
  const assets = useAssetMap();
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) updateFromClientX(e.touches[0].clientX); };
    const stop = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', stop);
    };
  }, [dragging, updateFromClientX]);

  const set = BEFORE_AFTER_META[active];
  const beforeSrc = assets[set.beforeKey];
  const afterSrc = assets[set.afterKey];

  return (
    <section id="before-after" className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-dark-900/40">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold tracking-[0.22em] text-brand-400 uppercase flex items-center justify-center gap-2">
            <ChevronsLeftRight className="w-3.5 h-3.5" /> Real Results
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            <span className="text-gradient-pink">Before / After</span> Examples
          </h2>
          <p className="text-white/60 font-light text-sm sm:text-base lg:text-lg px-2">Drag the handle to see real transformations from our recent clients.</p>
        </div>

        {/* selector pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {BEFORE_AFTER_META.map((s, i) => (
            <button
              key={s.label}
              onClick={() => { setActive(i); setPos(50); }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] border transition-all ${
                active === i
                  ? 'bg-linear-to-r from-brand-500 to-brand-600 text-white border-brand-400 btn-glow'
                  : 'border-white/15 text-white/70 hover:border-brand-400/50 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
          {/* Slider */}
          <div
            ref={containerRef}
            className="relative w-full aspect-4/5 sm:aspect-5/4 lg:aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden ring-glow border border-white/10 select-none touch-none"
          >
            {/* AFTER (base) */}
            <img src={afterSrc} alt="After transformation" className="absolute inset-0 w-full h-full object-cover premium-filter" />
            {/* BEFORE (clipped from left) */}
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <img src={beforeSrc} alt="Before transformation" className="absolute inset-0 w-full h-full object-cover premium-filter" />
            </div>

            {/* Labels */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-dark-950/75 backdrop-blur-md border border-white/15 text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
              Before
            </div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-linear-to-r from-brand-500 to-brand-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
              After
            </div>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-linear-to-b from-accent-400 via-brand-400 to-accent-400 shadow-[0_0_18px_rgba(236,72,153,0.7)]"
              style={{ left: `${pos}%`, transform: 'translateX(-1px)' }}
            >
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); setDragging(true); }}
                onTouchStart={(e) => { setDragging(true); if (e.touches[0]) updateFromClientX(e.touches[0].clientX); }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-accent-400 to-brand-500 text-white flex items-center justify-center cursor-grab active:cursor-grabbing border-2 border-white/80 shadow-[0_0_24px_rgba(236,72,153,0.8)] animate-pulse-glow"
                aria-label="Drag to compare before and after"
              >
                <ChevronsLeftRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* range fallback for accessibility / mobile tap */}
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              aria-label="Before after position"
            />
          </div>

          {/* Stylist Report */}
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-dark-800/60 backdrop-blur p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2 text-brand-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">Stylist Report</span>
            </div>
            <p className="text-white/75 text-sm leading-relaxed">{set.report}</p>
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="text-white/55">Time Taken</span>
                <span className="text-brand-400 font-semibold">{set.minutes}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="text-white/55">Main Stylist</span>
                <span className="text-white font-semibold text-right">{set.stylist}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="text-white/55">Products</span>
                <span className="text-white font-semibold text-right">{set.products}</span>
              </div>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-5 py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] btn-glow transition-all"
            >
              <Send className="w-3.5 h-3.5" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function getServiceWhatsappLink(serviceName: string) {
  const text = `Hello New Royal Beauty, I am interested in booking the "${serviceName}" service. Could you provide more details?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function Services() {
  const services = [
    { title: "Classic Precision Haircut", desc: "Personalized haircut suited to your face structure, including dry styling and a calming hot towel finish.", category: "Hair" },
    { title: "Master Hair Styling & Blowdry", desc: "Elite washing, deep conditioning, and glamorous round-brush blowdry or dynamic waves for special occasions.", category: "Hair" },
    { title: "Global Royal Color", desc: "Complete grey coverage or vibrant base change using top-tier ammonia-free professional colors.", category: "Color & Highlights" },
    { title: "Premium Balayage & Highlights", desc: "Pawan's signature hand-painted highlights with custom blonde or gold tones for a dimensional sun-kissed finish.", category: "Color & Highlights" },
    { title: "Beard Sculpture & Royal Shave", desc: "Clean edges, personalized trimming with professional clippers, followed by a soothing organic aftershave massage.", category: "Men's Grooming" },
    { title: "Royal Saree Draping & Hair Care", desc: "Flawless traditional accordion draping with perfectly aligned pleats, including a hair-glamour updo with style pins.", category: "Bridal" },
    { title: "Ultimate Elite Royal Bridal Package", desc: "High-definition airbrush bridal makeup, royal saree draping, lash extensions, and custom hair styling.", category: "Bridal" },
    { title: "Herbal Glow Facial & Skin Polish", desc: "Deep cleansing, organic fruit scrubs, high-frequency steam extraction, and a gold-infused cooling face mask.", category: "Skin Care" },
    { title: "Golden Hair Spa & Keratin Restorer", desc: "Intense deep conditioning therapy that restores damaged roots, controls frizz, and leaves hair silky smooth for up to 6 months.", category: "Treatment" },
    { title: "Threading & Eyebrow Shaping", desc: "Quick, customized symmetry eyebrow shaping and forehead threading with cotton organic threads.", category: "Skin Care" }
  ];

  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32 bg-dark-900/40 px-4 sm:px-6 lg:px-8 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold tracking-[0.22em] text-brand-400 uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Our Services
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Hair, Beauty & <span className="text-gradient-pink">Makeup</span> Services
          </h2>
          <p className="text-white/60 font-light text-sm sm:text-base lg:text-lg px-2">We offer professional hair care, beauty treatments, and makeup services.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 4) * 0.08 }}
              className="group p-5 sm:p-6 lg:p-7 rounded-2xl bg-dark-800/60 backdrop-blur border border-white/10 hover:border-brand-500/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 bg-linear-to-br from-brand-500/0 via-transparent to-brand-500/0 group-hover:from-brand-500/10 group-hover:to-accent-500/5 transition-all duration-500 pointer-events-none"></div>
              <div className="relative z-10">
                <span className="inline-block text-brand-300 text-[9px] sm:text-[10px] bg-brand-500/15 border border-brand-500/30 px-2.5 py-1 rounded-full font-bold tracking-[0.16em] uppercase mb-3 sm:mb-4">{s.category}</span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-serif text-white mb-2.5 sm:mb-3 leading-tight">{s.title}</h3>
                <p className="text-white/55 font-light leading-relaxed mb-5 text-xs sm:text-sm">{s.desc}</p>
              </div>
              <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10 relative z-10">
                <a href={getServiceWhatsappLink(s.title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-brand-300 hover:text-brand-400 transition-colors">
                  Book Service <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const assets = useAssetMap();
  const layout = [
    { type: 'video', key: 'gallery.0', span: 'md:col-span-2 md:row-span-2' },
    { type: 'image', key: 'gallery.1', span: 'col-span-1' },
    { type: 'image', key: 'gallery.2', span: 'col-span-1' },
    { type: 'video', key: 'gallery.3', span: 'col-span-1' },
    { type: 'video', key: 'gallery.4', span: 'col-span-1' },
    { type: 'image', key: 'gallery.5', span: 'md:col-span-2' },
    { type: 'video', key: 'gallery.6', span: 'col-span-1 md:col-span-2' },
    { type: 'image', key: 'gallery.7', span: 'col-span-1' },
  ] as const;
  const mediaItems = layout.map((m) => ({ ...m, src: assets[m.key] }));

  return (
    <section id="gallery" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
       <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
         <h3 className="text-xs sm:text-sm font-bold tracking-[0.22em] text-brand-400 uppercase flex items-center justify-center gap-2">
           <Instagram className="w-3.5 h-3.5" /> Gallery
         </h3>
         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
           Latest <span className="text-gradient-pink">Salon Photos</span> & Videos
         </h2>
         <p className="text-white/60 font-light text-sm sm:text-base lg:text-lg px-2">Check out our recent client transformations and salon work on Instagram.</p>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[250px] gap-3 sm:gap-4">
         {mediaItems.map((item, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: '-50px' }}
             transition={{ delay: (i % 4) * 0.05 }}
             className={`rounded-xl sm:rounded-2xl overflow-hidden bg-dark-800 relative group cursor-pointer border border-white/10 hover:border-brand-500/40 transition-colors ${item.span}`}
           >
             {item.type === 'video' ? (
               <video
                 src={item.src}
                 autoPlay loop muted playsInline
                 className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 premium-filter"
               />
             ) : (
               <img
                 src={item.src}
                 loading="lazy"
                 alt="Gallery Media"
                 className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 premium-filter"
               />
             )}
             <div className="absolute inset-0 bg-linear-to-tr from-brand-700/20 via-transparent to-accent-500/10 mix-blend-overlay pointer-events-none"></div>
             <div className="absolute inset-0 bg-linear-to-t from-dark-950/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-3 sm:p-5">
                   <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-500/30 backdrop-blur-md border border-white/20 flex items-center justify-center mb-2">
                     <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                   </div>
                   <span className="text-white font-medium text-xs sm:text-sm">View on Instagram</span>
                </div>
             </div>
           </motion.div>
         ))}
       </div>

       <div className="text-center mt-10 sm:mt-12">
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-brand-500/60 text-brand-300 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.18em] hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all">
            <Instagram className="w-4 h-4" />
            <span>Follow Our Journey</span>
          </a>
       </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    { name: "Sneha Thapa", text: "Absolutely in love with my haircut and balayage. The team in New Baneshwor is incredibly professional and skilled. Best salon experience!", rating: 5 },
    { name: "Pooja Gurung", text: "Got my bridal makeup done here and I couldn't be happier. The premium products and meticulous attention to detail made me feel like royalty.", rating: 5 },
    { name: "Anjali Shrestha", text: "The nanoplastia treatment completely transformed my frizzy hair. It's so smooth and shiny now. The salon's ambiance is also very relaxing.", rating: 5 },
  ];

  return (
    <section id="reviews" className="py-20 sm:py-24 lg:py-32 bg-dark-900/40 border-t border-white/5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold tracking-[0.22em] text-brand-400 uppercase flex items-center justify-center gap-2">
            <Star className="w-3.5 h-3.5 fill-brand-400" /> Client Reviews
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            What Our <span className="text-gradient-pink">Clients Say</span>
          </h2>
          <p className="text-white/60 font-light text-sm sm:text-base lg:text-lg px-2">Read honest reviews from our satisfied customers in Kathmandu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12 }}
              className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-dark-800/60 backdrop-blur border border-white/10 hover:border-brand-500/40 transition-all duration-300 relative group"
            >
              <div className="flex gap-1 mb-4 sm:mb-6 text-brand-400">
                {[...Array(r.rating)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />)}
              </div>
              <p className="text-white/75 font-light leading-relaxed mb-6 sm:mb-8 italic text-sm sm:text-base">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium text-xs sm:text-sm">{r.name}</div>
                  <div className="text-brand-400 text-[9px] sm:text-[10px] uppercase tracking-[0.18em]">Verified Client</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="py-20 sm:py-24 lg:py-32 bg-dark-900/40 border-t border-white/5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h3 className="text-xs sm:text-sm font-bold tracking-[0.22em] text-brand-400 uppercase flex items-center justify-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Contact Us
          </h3>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
            Visit Us in <span className="text-gradient-pink">New Baneshwor</span>
          </h2>
          <p className="text-white/60 font-light text-sm sm:text-base lg:text-lg px-2">Call or message us on WhatsApp to book an appointment. We are open every day.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4 sm:space-y-5">
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2 sm:space-y-3 p-4 sm:p-5 bg-dark-800/60 backdrop-blur rounded-2xl border border-white/10">
                <div className="w-9 h-9 rounded-full bg-brand-500/15 border border-brand-500/30 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-1 text-white">Location</h4>
                  <p className="text-white/55 font-light text-xs sm:text-sm">New Baneshwor, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 p-4 sm:p-5 bg-dark-800/60 backdrop-blur rounded-2xl border border-white/10">
                <div className="w-9 h-9 rounded-full bg-brand-500/15 border border-brand-500/30 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm sm:text-base mb-1 text-white">Opening Hours</h4>
                  <p className="text-white/55 font-light text-xs sm:text-sm">Everyday<br />9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-linear-to-br from-brand-500/15 to-brand-700/15 backdrop-blur rounded-2xl border border-brand-500/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-brand-300" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm sm:text-base text-white">Direct Contact</h4>
                  <p className="text-brand-200 font-light text-xs sm:text-sm mt-0.5">WhatsApp / Call: +977 981-3451412</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-linear-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white px-5 py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] btn-glow transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Message on WhatsApp
                </a>
                <a
                  href="tel:+9779813451412"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-white/15 bg-white/5 text-white px-5 py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] hover:border-brand-400/50 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Now
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-dark-800/40 backdrop-blur rounded-2xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
              <p className="text-white/60 text-xs sm:text-sm font-light">Sanitised studio with imported products and certified expert stylists.</p>
            </div>
          </div>

          <div className="h-[360px] sm:h-[440px] lg:h-[560px] w-full rounded-2xl sm:rounded-3xl overflow-hidden relative ring-glow border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7065.591528343253!2d85.3349222494948!3d27.692706588092697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19db421230f3%3A0xf00df6878dde6c13!2sNew%20Royal%20Beauty%20and%20Unisex%20Salon!5e0!3m2!1sen!2snp!4v1781413576708!5m2!1sen!2snp"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Royal Beauty Salon Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 sm:py-12 bg-dark-950/90 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-6">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-[0_0_18px_rgba(236,72,153,0.5)]">
            <Crown className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl text-white">New Royal Beauty</span>
            <span className="text-brand-400 text-[9px] sm:text-[10px] tracking-[0.22em] uppercase mt-0.5">Unisex Salon · Kathmandu</span>
          </div>
        </div>
        <p className="text-white/40 text-xs sm:text-sm font-light text-center">© {new Date().getFullYear()} New Royal Beauty Salon. All rights reserved.</p>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white/20 flex items-center justify-center text-white/80 hover:text-blue-400 hover:border-blue-400 hover:scale-110 transition-all" title="Follow on Facebook">
            <Facebook className="w-5 h-5" />
          </a>
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-white/20 flex items-center justify-center text-white/80 hover:text-pink-400 hover:border-pink-400 hover:scale-110 transition-all" title="Follow on Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto mt-6 pt-5 border-t border-white/5 flex justify-center">
        <a
          href="/edit"
          className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/45 hover:text-brand-400 border border-white/10 hover:border-brand-500/40 rounded-full px-4 py-2 transition-colors"
        >
          <Sparkles className="w-3 h-3" /> Admin · Edit Images
        </a>
      </div>
    </footer>
  );
}

function useIsEditRoute() {
  const [isEdit, setIsEdit] = useState(
    typeof window !== 'undefined' && window.location.pathname.replace(/\/+$/, '') === '/edit',
  );
  useEffect(() => {
    const onChange = () => setIsEdit(window.location.pathname.replace(/\/+$/, '') === '/edit');
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);
  return isEdit;
}

export default function App() {
  const isEdit = useIsEditRoute();

  if (isEdit) {
    return (
      <AssetProvider>
        <EditPanel />
      </AssetProvider>
    );
  }

  return (
    <AssetProvider>
      <div className="min-h-screen selection:bg-brand-500 selection:text-white overflow-x-hidden pb-24 lg:pb-0">
        <TopBar />
        <Navbar />
        <main>
          <Hero />
          <TrustSection />
          <Marquee />
          <CelebrityWall />
          <BeforeAfter />
          <Services />
          <Gallery />
          <Reviews />
          <Location />
        </main>
        <Footer />

        {/* Mobile Sticky CTA */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-green-500 to-green-600 text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] btn-glow"
          >
            <Send className="w-4 h-4" />
            <span>Message WhatsApp</span>
          </a>
        </div>

        {/* Floating Quick Buttons: WhatsApp, Call, Google Maps */}
        <div className="fixed right-4 bottom-20 z-50 flex flex-col gap-3">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-12 h-12 rounded-full bg-linear-to-r from-green-500 to-green-600 text-white flex items-center justify-center shadow-lg hover:scale-115 transition-transform" title="Chat on WhatsApp">
            <Send className="w-5 h-5" />
          </a>
          <a href="tel:+9779813451412" aria-label="Call Now" className="w-12 h-12 rounded-full bg-white/6 border border-white/10 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <Phone className="w-5 h-5" />
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=New+Royal+Beauty+Salon+New+Baneshwor+Kathmandu" target="_blank" rel="noopener noreferrer" aria-label="Google Maps" className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5" />
          </a>
        </div>

      </div>
    </AssetProvider>
  );
}

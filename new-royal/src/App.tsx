import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Instagram, Facebook, ArrowRight, Clock, Star, ShieldCheck, Sparkles, Award, Menu, X } from 'lucide-react';

const WHATSAPP_NUMBER = '9779813451412';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_LINK = 'https://www.instagram.com/newroyalunisex/';
const FACEBOOK_LINK = 'https://www.facebook.com/NewRoyalBeautysalon12345/';

function TopBar() {
  return (
    <div className="hidden lg:flex justify-between items-center px-8 py-2 bg-dark-950 text-xs font-medium tracking-wide text-brand-200/80 border-b border-white/5">
      <div className="flex items-center space-x-2">
        <Star className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
        <span>Top Rated Salon in New Baneshwor: 4.9 <span className="text-brand-500">★</span> (259 Reviews)</span>
      </div>
      <div className="flex items-center space-x-6">
        <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1.5" /> 981-3451412</span>
        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-brand-500" /> Today: 8 AM - 8 PM</span>
      </div>
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 bg-dark-900/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center relative">
               <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-500/50 animate-spin-slow"></div>
               <div className="text-brand-500 font-serif text-base lg:text-lg leading-none relative z-10 w-full h-full flex items-center justify-center rounded-full bg-brand-500/10">NR</div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-brand-500 text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-semibold">New Royal</span>
              <span className="font-serif text-xs lg:text-sm tracking-[0.15em] text-white">BEAUTY & UNISEX SALON</span>
            </div>
          </div>
          <div className="hidden lg:flex space-x-10 items-center">
            <a href="#services" className="text-sm font-medium tracking-wide text-white/80 hover:text-brand-500 transition-colors">Services</a>
            <a href="#gallery" className="text-sm font-medium tracking-wide text-white/80 hover:text-brand-500 transition-colors">Gallery</a>
            <a href="#reviews" className="text-sm font-medium tracking-wide text-white/80 hover:text-brand-500 transition-colors">Reviews</a>
            <a href="#location" className="text-sm font-medium tracking-wide text-white/80 hover:text-brand-500 transition-colors">Location</a>
          </div>
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="hidden sm:flex items-center space-x-4 lg:border-r lg:border-white/10 lg:pr-6">
              <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-500 transition-colors">
                <Facebook className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-500 transition-colors">
                <Instagram className="w-4 h-4 lg:w-5 lg:h-5" />
              </a>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center space-x-2 text-white font-medium hover:text-brand-500 transition-colors">
              <Phone className="w-4 h-4 fill-current text-brand-500" />
              <span>Call 981-3451412</span>
            </a>
            <button className="lg:hidden text-white hover:text-brand-500 transition-colors" onClick={() => setIsOpen(!isOpen)}>
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
            className="lg:hidden absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-md border-b border-white/5 shadow-2xl origin-top"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              <a href="#services" onClick={() => setIsOpen(false)} className="text-sm font-medium tracking-wide text-white hover:text-brand-500 transition-colors block py-3 border-b border-white/5">Services</a>
              <a href="#gallery" onClick={() => setIsOpen(false)} className="text-sm font-medium tracking-wide text-white hover:text-brand-500 transition-colors block py-3 border-b border-white/5">Gallery</a>
              <a href="#reviews" onClick={() => setIsOpen(false)} className="text-sm font-medium tracking-wide text-white hover:text-brand-500 transition-colors block py-3 border-b border-white/5">Reviews</a>
              <a href="#location" onClick={() => setIsOpen(false)} className="text-sm font-medium tracking-wide text-white hover:text-brand-500 transition-colors block py-3 border-b border-white/5">Location</a>
              <div className="flex items-center space-x-6 pt-4 pb-2">
                <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-500 transition-colors">
                  <Instagram className="w-5 h-5" />
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
  return (
    <section className="relative pt-6 lg:pt-12 pb-24 px-6 lg:px-8 max-w-[1400px] mx-auto min-h-[85vh] flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 space-y-6 lg:space-y-8 order-2 lg:order-1 w-full"
      >
        <div className="inline-flex items-center space-x-2 border border-brand-500/30 rounded-full px-3 py-1.5 lg:px-4 bg-brand-500/10">
          <Sparkles className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-brand-500" />
          <span className="text-[10px] lg:text-xs font-semibold tracking-widest uppercase text-brand-500">Perfect Salon Sanctuary</span>
        </div>
        
        <div className="space-y-3 lg:space-y-4">
          <h2 className="text-xs lg:text-sm font-bold tracking-[0.2em] text-brand-500 uppercase">Welcome to Absolute Elegance</h2>
          <h1 className="text-[3.25rem] sm:text-6xl lg:text-[5.5rem] font-serif text-white leading-[1.05] font-bold tracking-tight">
            NEW ROYAL <br className="hidden sm:block" /> SALON
          </h1>
        </div>

        <p className="max-w-xl text-base lg:text-lg text-white/60 leading-relaxed font-light">
          Experience prestige hair styling, custom balayage highlights, and expert fashion hair blowouts. Let our 4.9-star specialized team elevate and restore your hair's royal strength and premium glow.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6 border-y border-white/10">
          <div className="flex items-center gap-4">
            <div className="flex text-brand-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />)}
            </div>
            <div>
               <div className="font-bold text-white tracking-wide text-sm lg:text-base">4.9 Star Rating</div>
               <div className="text-[10px] lg:text-xs text-white/50">259 Google Map Reviews</div>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10"></div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-brand-900/50 border border-brand-500/30 flex items-center justify-center">
              <Award className="w-4 h-4 lg:w-5 lg:h-5 text-brand-500" />
            </div>
            <div>
              <div className="font-bold text-white tracking-wide text-sm lg:text-base">#1 Salon Choice</div>
              <div className="text-[10px] lg:text-xs text-white/50">New Baneshwor Neighborhood</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-3 bg-brand-500 text-dark-950 px-6 py-4 lg:px-8 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-brand-400 transition-colors group">
            <span>Call to Book Right Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#services" className="inline-flex items-center justify-center space-x-2 border border-white/20 text-white px-6 py-4 lg:px-8 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
            <span>Explore Services List</span>
          </a>
        </div>

        <div className="flex flex-wrap gap-4 text-[10px] lg:text-xs font-medium text-white/40">
           <span className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500/80" /> Fully Sanitary & Masked</span>
           <span className="flex items-center gap-2"><Star className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-500/80" /> Happy Transformations</span>
           <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-500/80" /> Imported Products Only</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 w-full relative order-1 lg:order-2"
      >
        <div className="relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-white/10 group max-h-[50vh] sm:max-h-[60vh] lg:max-h-[80vh]">
          <img 
            src="https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780710967644-BZv0z3Qo.jpg"
            alt="Salon styling session"
            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-900/20 to-transparent"></div>
          
          {/* Floating Badges */}
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6 text-right">
             <div className="text-[9px] lg:text-[10px] font-bold tracking-widest uppercase text-brand-500">Review Star</div>
             <div className="text-2xl lg:text-3xl font-bold text-white flex items-center justify-end">4.9 <span className="text-sm lg:text-xl text-white/50 ml-1">/ 5</span></div>
          </div>

          <div className="absolute bottom-6 left-5 lg:bottom-10 lg:left-8 max-w-[240px] lg:max-w-[280px]">
             <div className="bg-brand-500 text-dark-950 text-[10px] lg:text-xs font-bold px-2 py-1 uppercase tracking-widest inline-block mb-2 lg:mb-3 rounded-sm text-center">Featured Client</div>
             <h3 className="text-xl lg:text-3xl font-serif text-white leading-tight mb-1 lg:mb-2">Chic Highlights & Color Style</h3>
             <p className="text-xs lg:text-sm text-white/70 font-light hidden sm:block">Total transformation with vibrant color tones styled perfectly at New Baneshwor salon.</p>
          </div>
        </div>

        {/* Overlapping small badge */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: [0, -10, 0] }}
           transition={{ opacity: { duration: 0.8, delay: 0.8 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.6 } }}
           className="absolute -bottom-5 right-5 lg:-bottom-6 lg:-left-12 lg:right-auto bg-dark-800 border border-white/10 rounded-xl p-3 lg:p-5 shadow-2xl flex items-center gap-3 lg:gap-4 z-10">
           <div className="w-10 h-10 lg:w-12 h-12 lg:w-12 lg:h-12 rounded-full border border-brand-500/50 flex flex-shrink-0 items-center justify-center">
              <Award className="w-4 h-4 lg:w-5 lg:h-5 text-brand-500" />
           </div>
           <div>
              <div className="text-[9px] lg:text-[10px] text-brand-500 uppercase tracking-widest font-bold">Hair Specialists</div>
              <div className="text-xs lg:text-sm text-white font-medium">Custom Color & Cut</div>
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const images = [
    "https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/royal_bride_1780677236702-DtnfrWoW.png",
    "https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/styling_blowdry_1780677263541-DR4ku7VN.png",
    "https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/salon_interior_1780677288182-Cdx7sXtJ.png",
    "https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/hairstylist_cutting_hair_1780683711133-Dj7VEaxz.png",
    "https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780710973845-CLwz5PCE.webp",
    "https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780715097350-BvG1HgsH.jpg"
  ];
  
  return (
    <div className="py-20 bg-brand-500 overflow-hidden relative rotate-[-2deg] scale-[1.05] border-y border-white/20">
      <div className="flex w-max animate-marquee space-x-8 px-4">
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex} className="flex space-x-8">
            {images.map((src, i) => (
              <div key={`${groupIndex}-${i}`} className="inline-block w-[280px] h-[350px] rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 border border-dark-900/10">
                <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Salon Vibes" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-dark-900 via-transparent to-dark-900 opacity-20"></div>
    </div>
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
    <section id="services" className="py-32 bg-dark-800 px-6 lg:px-8 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h3 className="text-sm font-bold tracking-[0.2em] text-brand-500 uppercase">Premium Offerings</h3>
          <h2 className="text-4xl sm:text-5xl font-serif text-white">Our Royal Services</h2>
          <p className="text-white/60 font-light text-lg">Discover our range of premium beauty treatments designed for perfection.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="group p-8 rounded-2xl bg-dark-900 border border-white/5 hover:border-brand-500/50 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="relative z-10">
                <span className="inline-block text-brand-500 text-[10px] bg-brand-500/10 px-3 py-1 rounded-full font-bold tracking-widest uppercase mb-4">{s.category}</span>
                <h3 className="text-2xl font-serif text-white mb-4 pr-4">{s.title}</h3>
                <p className="text-white/50 font-light leading-relaxed mb-8 text-sm">{s.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/5">
                <a href={getServiceWhatsappLink(s.title)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-200 hover:text-brand-500 transition-colors">
                  Book Service <ArrowRight className="w-4 h-4 ml-2" />
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
  const mediaItems = [
    { type: 'video', src: 'https://salon-95dg.vercel.app/assets/beautiful_girl_haircut.mp4', span: 'md:col-span-2 md:row-span-2' },
    { type: 'image', src: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/hairstylist_cutting_hair_1780683711133-Dj7VEaxz.png', span: 'col-span-1' },
    { type: 'image', src: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780710973845-CLwz5PCE.webp', span: 'col-span-1' },
    { type: 'video', src: 'https://salon-95dg.vercel.app/assets/highlight.mp4', span: 'col-span-1' },
    { type: 'video', src: 'https://salon-95dg.vercel.app/assets/good_hair_curl.mp4', span: 'col-span-1' },
    { type: 'image', src: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780715097350-BvG1HgsH.jpg', span: 'md:col-span-2' },
    { type: 'video', src: 'https://salon-95dg.vercel.app/assets/beautiful_girl_hair.mp4', span: 'col-span-1 md:col-span-2' },
    { type: 'image', src: 'https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/regenerated_image_1780713789497-BpvGDGYg.jpg', span: 'col-span-1' },
  ];

  return (
    <section id="gallery" className="py-32 px-6 lg:px-8 max-w-[1400px] mx-auto">
       <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
         <h3 className="text-sm font-bold tracking-[0.2em] text-brand-500 uppercase">Portfolio</h3>
         <h2 className="text-4xl sm:text-5xl font-serif text-white">Our Masterpieces</h2>
         <p className="text-white/60 font-light text-lg">A glimpse into our luxurious transformations.</p>
       </div>
       <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4">
         {mediaItems.map((item, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.05 }}
             className={`rounded-2xl overflow-hidden bg-dark-800 relative group cursor-pointer ${item.span}`}
           >
             {item.type === 'video' ? (
               <video 
                 src={item.src} 
                 autoPlay loop muted playsInline
                 className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
               />
             ) : (
               <img 
                 src={item.src} 
                 alt="Gallery Media"
                 className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
               />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6">
                   <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-2">
                     <Instagram className="w-4 h-4 text-white" />
                   </div>
                   <span className="text-white font-medium text-sm">View on Instagram</span>
                </div>
             </div>
           </motion.div>
         ))}
       </div>
       
       <div className="text-center mt-12">
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 border border-brand-500 text-brand-500 px-8 py-4 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-brand-500 hover:text-dark-950 transition-colors">
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
    <section id="reviews" className="py-32 bg-dark-900 border-t border-white/5 px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h3 className="text-sm font-bold tracking-[0.2em] text-brand-500 uppercase">Testimonials</h3>
          <h2 className="text-4xl sm:text-5xl font-serif text-white">Client Love</h2>
          <p className="text-white/60 font-light text-lg">Hear what our clients have to say about their royal glow-up.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl bg-dark-800 border border-white/5 hover:border-brand-500/30 transition-all duration-300 relative group"
            >
              <div className="flex gap-1 mb-6 text-brand-500">
                {[...Array(r.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-white/70 font-light leading-relaxed mb-8 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{r.name}</div>
                  <div className="text-brand-500 text-[10px] uppercase tracking-widest">Verified Client</div>
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
    <section id="location" className="py-32 bg-dark-800 border-t border-white/5 px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-[0.2em] text-brand-500 uppercase">Contact & Visit</h3>
              <h2 className="text-4xl sm:text-5xl font-serif text-white">Our Sanctuary</h2>
              <p className="text-white/60 font-light text-lg">Step into a world of elegance. Book your appointment today and let our experts pamper you.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 bg-dark-900 rounded-2xl border border-white/5">
                <MapPin className="w-8 h-8 text-brand-500" />
                <div>
                  <h4 className="font-medium text-lg mb-2 text-white">Location</h4>
                  <p className="text-white/60 font-light">Near B&B Hospital<br />New Baneshwor<br />Kathmandu 44600</p>
                </div>
              </div>
              
              <div className="space-y-4 p-6 bg-dark-900 rounded-2xl border border-white/5">
                <Clock className="w-8 h-8 text-brand-500" />
                <div>
                  <h4 className="font-medium text-lg mb-2 text-white">Opening Hours</h4>
                  <p className="text-white/60 font-light">Everyday<br />9:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="sm:col-span-2 space-y-4 p-6 bg-brand-500/10 rounded-2xl border border-brand-500/20">
                <Phone className="w-8 h-8 text-brand-500" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-lg mb-1 text-white">Direct Contact</h4>
                    <p className="text-brand-200/80 font-light">WhatsApp: +977 9813451412</p>
                  </div>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2 bg-brand-500 text-dark-950 px-6 py-3 rounded-md text-sm font-bold uppercase tracking-widest hover:bg-brand-400 transition-colors">
                    <span>Message Us</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[500px] w-full rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/10">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3813.4523396235722!2d85.33347647565463!3d27.691077326208543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19db421230f3%3A0xf00df6878dde6c13!2sNew%20Royal%20Beauty%20and%20Unisex%20Salon!5e1!3m2!1sen!2snp!4v1781077000376!5m2!1sen!2snp" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-dark-950 px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col text-center sm:text-left">
           <span className="font-serif text-2xl text-white">New Royal Beauty</span>
           <span className="text-brand-500 text-[10px] tracking-widest uppercase mt-1">Premium Salon</span>
        </div>
        <p className="text-white/40 text-sm font-light">© {new Date().getFullYear()} New Royal Beauty Salon. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <a href={FACEBOOK_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-500 hover:border-brand-500 transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-500 hover:border-brand-500 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-500 selection:text-dark-950 overflow-x-hidden pb-20 lg:pb-0">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <Reviews />
        <Location />
      </main>
      <Footer />
      
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 w-full bg-brand-500 text-dark-950 px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-2xl">
          <Phone className="w-4 h-4 fill-current" />
          <span>Book Appointment Here</span>
        </a>
      </div>
    </div>
  );
}

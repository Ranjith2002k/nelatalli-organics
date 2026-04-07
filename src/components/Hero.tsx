import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[600px] md:h-[819px] flex items-center overflow-hidden bg-surface-container-low">
      <div className="grain-overlay absolute inset-0 z-0"></div>
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 py-12 md:py-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 md:space-y-8"
        >
          <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container text-[10px] md:text-xs font-label tracking-[0.2em] uppercase rounded-full">
            Ethically Sourced
          </span>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary leading-tight font-extrabold tracking-tighter">
            A Range of Best <br/> 
            <span className="italic font-light text-secondary">Quality Products!!</span>
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg max-w-md leading-relaxed">
            Hand-curated botanical remedies and artisanal kitchen staples, crafted for the conscious home. Experience the essence of nature's purity.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary px-8 md:px-10 py-3 md:py-4 rounded-lg font-label font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-primary-container transition-all editorial-shadow">
              Explore Collection
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-secondary-container/20 blur-3xl rounded-full opacity-50"></div>
          <img 
            alt="Artisanal wellness products" 
            className="relative z-10 w-full h-[400px] md:h-[600px] object-cover rounded-2xl editorial-shadow transition-transform duration-700 group-hover:scale-[1.02]" 
            src="https://picsum.photos/seed/apothecary/800/1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
        <span className="w-8 md:w-12 h-1 bg-primary rounded-full"></span>
        <span className="w-8 md:w-12 h-1 bg-primary/20 rounded-full"></span>
        <span className="w-8 md:w-12 h-1 bg-primary/20 rounded-full"></span>
      </div>
    </section>
  );
}

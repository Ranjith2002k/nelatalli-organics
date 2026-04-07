import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface"
    >
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-surface-container-low overflow-hidden">
        <div className="grain-overlay absolute inset-0 z-0"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-xs font-label tracking-[0.4em] uppercase text-secondary font-bold">Get In Touch</span>
          <h1 className="font-headline text-5xl md:text-7xl text-primary font-bold mt-4 tracking-tighter">
            Connect With <br/> 
            <span className="italic font-light text-secondary">The Apothecary</span>
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold">We'd love to hear from you.</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Whether you have a question about our products, an order, or just want to share your wellness journey, we're here to help.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Email Us</p>
                  <p className="text-lg font-bold text-primary">hello@cottagewellness.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Call Us</p>
                  <p className="text-lg font-bold text-primary">+1 800-COTTAGE</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Visit Us</p>
                  <p className="text-lg font-bold text-primary">123 Farmhouse Lane, Vermont, USA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl editorial-shadow">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Full Name</label>
                  <input className="w-full bg-surface border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary outline-none" type="text" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Email Address</label>
                  <input className="w-full bg-surface border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary outline-none" type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Subject</label>
                <input className="w-full bg-surface border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary outline-none" type="text" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label tracking-widest uppercase text-primary/60 font-bold">Message</label>
                <textarea className="w-full bg-surface border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary outline-none min-h-[150px]" placeholder="Tell us more..."></textarea>
              </div>
              <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-label font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary-container transition-all editorial-shadow">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

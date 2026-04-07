import { Search, ShoppingBag, Menu, Home, ChevronDown, LayoutGrid, Heart, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-surface-container-low py-2 px-4 md:px-8 flex justify-between items-center text-[10px] md:text-xs font-label tracking-widest uppercase text-primary/70 border-b border-outline-variant/10">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">call</span> +91 98765-43210
          </span>
          <span className="flex items-center gap-2 hidden sm:flex">
            <span className="material-symbols-outlined text-sm">location_on</span> Andhra Pradesh, India
          </span>
        </div>
        <div className="flex gap-4">
          <a className="hover:text-primary transition-colors" href="#">Store Locator</a>
          <a className="hover:text-primary transition-colors hidden sm:inline" href="#">Track Order</a>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-surface border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-full">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-xl md:text-2xl font-serif italic text-primary"
            >
              <Home className="text-primary" size={28} />
              <span className="font-headline font-bold italic tracking-tight">Nelatalli Organics</span>
            </motion.div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-12">
            <div className="relative w-full group">
              <input 
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-2 pl-4 pr-12 text-sm focus:ring-2 focus:ring-secondary/10 transition-all outline-none" 
                placeholder="Search for items..." 
                type="text"
              />
              <button className="absolute right-1 top-1 bottom-1 px-3 bg-secondary text-on-secondary rounded-md flex items-center justify-center hover:bg-secondary/90 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Trailing Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/profile" className="text-primary hover:text-secondary transition-all relative group">
              <User size={24} className="group-hover:scale-110 transition-transform" />
            </Link>
            <Link to="/wishlist" className="text-primary hover:text-secondary transition-all relative group">
              <Heart size={24} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <button className="text-primary hover:text-secondary transition-all relative group">
              <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
            <button className="md:hidden text-primary">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex justify-center border-t border-outline-variant/10 py-4">
          <div className="flex gap-12">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`text-lg font-headline italic transition-all relative pb-1 ${
                  location.pathname === item.path 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-primary/60 hover:text-primary'
                }`} 
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

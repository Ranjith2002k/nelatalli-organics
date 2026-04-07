import { motion } from 'motion/react';
import { ALL_PRODUCTS, PRODUCT_CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Products() {
  const [priceRange, setPriceRange] = useState(70);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface min-h-screen"
    >
      <main className="pt-12 pb-20 max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-[220px] flex-shrink-0 space-y-12">
            <section className="w-[220px]">
              <h3 className="font-label tracking-widest uppercase text-[10px] font-bold text-primary mb-8 opacity-50">Categories</h3>
              <ul className="space-y-4">
                {PRODUCT_CATEGORIES.map((cat, idx) => (
                  <li key={cat.name}>
                    <button className={`font-headline italic text-[18px] block hover:translate-x-1 transition-transform text-left w-full ${idx === 0 ? 'text-primary font-bold' : 'text-primary/60 hover:text-primary'}`}>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="w-[220px]">
              <h3 className="font-label tracking-widest uppercase text-[10px] font-bold text-primary mb-8 opacity-50">Price Range</h3>
              <div className="px-2">
                <input 
                  className="w-full h-1 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary" 
                  max="100" 
                  min="0" 
                  type="range" 
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                />
                <div className="flex justify-between mt-4 font-label text-[10px] text-primary/40 font-bold uppercase tracking-widest">
                  <span>$0</span>
                  <span>$100+</span>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/5 w-[220px]">
              <h3 className="font-headline italic text-2xl text-primary mb-3">Our Promise</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed opacity-80">
                Small batches, ethically sourced, and hand-packed with care in our countryside atelier.
              </p>
            </section>
          </aside>

          {/* Product Listing */}
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-12 border-b border-outline-variant/10 pb-8">
              <div>
                <h1 className="font-headline text-5xl font-bold text-primary tracking-tighter mb-2">Organic Harvest</h1>
                <p className="font-label text-[10px] uppercase tracking-widest text-primary/40 font-bold">Showing {ALL_PRODUCTS.length} handcrafted products</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-label text-[10px] uppercase tracking-widest text-primary/40 font-bold">Sort By</span>
                <div className="relative group">
                  <select className="bg-transparent border-none font-headline italic text-xl focus:ring-0 cursor-pointer outline-none pr-8 appearance-none text-primary">
                    <option>Curated Favorites</option>
                    <option>Newest Harvest</option>
                    <option>Price: Low to High</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">expand_more</span>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {ALL_PRODUCTS.map((product) => (
                <div key={product.id} className={`group relative ${(product as any).asymmetry ? 'lg:mt-12' : ''}`}>
                  <div className="aspect-[4/5] bg-surface-variant rounded-2xl overflow-hidden relative mb-6 transition-transform duration-700 group-hover:-translate-y-2 editorial-shadow">
                    <Link to={`/products/${product.id}`}>
                      <img 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                        src={product.image}
                        referrerPolicy="no-referrer"
                      />
                    </Link>
                    {(product as any).isTopRated && (
                      <div className="absolute top-6 left-6">
                        <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">Top Rated</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-headline text-2xl text-primary font-bold hover:text-secondary transition-colors leading-tight">{product.title}</h3>
                      </Link>
                      <span className="font-body font-bold text-primary text-xl">₹{product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className="material-symbols-outlined text-sm" 
                          style={{ fontVariationSettings: `'FILL' ${i < Math.floor(product.rating) ? 1 : 0}` }}
                        >
                          {i < Math.floor(product.rating) ? 'star' : (product.rating % 1 !== 0 && i === Math.floor(product.rating) ? 'star_half' : 'star')}
                        </span>
                      ))}
                      <span className="text-[10px] font-bold ml-2 uppercase tracking-widest text-primary/40">({product.reviews})</span>
                    </div>
                    <p className="font-body text-sm text-on-surface-variant line-clamp-2 leading-relaxed opacity-70">{product.description}</p>
                    <button className="w-full mt-6 py-4 bg-primary text-on-primary rounded-xl font-label text-[10px] uppercase tracking-widest font-bold hover:bg-primary-container transition-all shadow-lg shadow-primary/10 active:scale-[0.98]">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="mt-24 flex justify-center items-center gap-6">
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/20 text-primary hover:bg-surface-container-low transition-all hover:scale-110">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-8 font-label text-sm font-bold">
                <span className="text-primary border-b-2 border-primary pb-1">1</span>
                <button className="text-primary/40 hover:text-primary transition-colors">2</button>
                <button className="text-primary/40 hover:text-primary transition-colors">3</button>
                <span className="text-primary/20">...</span>
                <button className="text-primary/40 hover:text-primary transition-colors">8</button>
              </div>
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant/20 text-primary hover:bg-surface-container-low transition-all hover:scale-110">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

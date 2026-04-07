import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: 'The Benefits of Raw Forest Honey',
    category: 'Wellness',
    date: 'Oct 12, 2024',
    image: 'https://picsum.photos/seed/blog1/800/600',
    excerpt: 'Discover why raw honey is more than just a sweetener. From antibacterial properties to seasonal allergy relief.'
  },
  {
    id: 2,
    title: 'Traditional Ghee Clarification',
    category: 'Recipes',
    date: 'Oct 08, 2024',
    image: 'https://picsum.photos/seed/blog2/800/600',
    excerpt: 'A step-by-step guide to clarifying butter at home using traditional Ayurvedic methods.'
  },
  {
    id: 3,
    title: 'Autumn Apothecary Rituals',
    category: 'Lifestyle',
    date: 'Oct 01, 2024',
    image: 'https://picsum.photos/seed/blog3/800/600',
    excerpt: 'Transitioning your wellness routine for the cooler months with seasonal botanicals and warming staples.'
  }
];

export default function Blog() {
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
          <span className="text-xs font-label tracking-[0.4em] uppercase text-secondary font-bold">The Journal</span>
          <h1 className="font-headline text-5xl md:text-7xl text-primary font-bold mt-4 tracking-tighter">
            Apothecary <br/> 
            <span className="italic font-light text-secondary">Notes</span>
          </h1>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 md:py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow">
          <div className="h-[400px] md:h-full">
            <img 
              src="https://picsum.photos/seed/featured/1000/800" 
              alt="Featured post" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-8 md:p-12 space-y-6">
            <span className="text-xs font-label tracking-widest uppercase text-secondary font-bold">Featured Article</span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-bold leading-tight">The Art of Slow Living & Wellness</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              In a world that never stops, we explore the importance of slowing down and reconnecting with the natural rhythms of life.
            </p>
            <button className="flex items-center gap-2 text-primary font-bold font-label tracking-widest uppercase text-sm group">
              Read More <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Grid of Posts */}
      <section className="py-16 md:py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {POSTS.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer space-y-6"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden editorial-shadow">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-label tracking-widest uppercase text-primary/60">
                  <span className="font-bold text-secondary">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                  {post.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-primary font-bold font-label tracking-widest uppercase text-xs group">
                  Read Article <ArrowRight className="group-hover:translate-x-2 transition-transform" size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

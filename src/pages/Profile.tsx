import { motion } from 'motion/react';
import { User, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const user = {
    name: 'Raj Rajendar',
    email: 'rajrajendar331@gmail.com',
    memberSince: 'October 2024',
    avatar: 'https://picsum.photos/seed/user/200/200'
  };

  const recentOrders = [
    { id: '#CW-8902', date: 'Oct 05, 2024', status: 'Delivered', total: 1240.00 },
    { id: '#CW-8741', date: 'Sep 28, 2024', status: 'Processing', total: 895.00 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface min-h-screen"
    >
      {/* Breadcrumbs */}
      <div className="bg-surface-container-low py-4 border-b border-outline-variant/10">
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-2 text-sm font-label text-primary/60">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-secondary font-bold">Account</span>
        </div>
      </div>

      <section className="py-12 md:py-20 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-surface-container-low p-8 rounded-3xl editorial-shadow text-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h2 className="font-headline text-2xl font-bold text-primary">{user.name}</h2>
                <p className="text-xs font-label text-primary/40 uppercase tracking-widest">Member since {user.memberSince}</p>
              </div>
            </div>

            <nav className="bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow">
              {[
                { name: 'Dashboard', icon: User, active: true },
                { name: 'My Orders', icon: Package },
                { name: 'Addresses', icon: MapPin },
                { name: 'Payment Methods', icon: CreditCard },
                { name: 'Account Settings', icon: Settings },
                { name: 'Logout', icon: LogOut, danger: true },
              ].map((item) => (
                <button 
                  key={item.name}
                  className={`w-full flex items-center gap-4 px-8 py-4 text-sm font-bold transition-all border-l-4 ${
                    item.active 
                      ? 'bg-surface-container-high border-secondary text-secondary' 
                      : 'border-transparent text-primary/60 hover:bg-surface-container-high hover:text-primary'
                  } ${item.danger ? 'hover:text-red-500' : ''}`}
                >
                  <item.icon size={18} />
                  {item.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Orders', value: '12', icon: Package },
                { label: 'Wishlist Items', value: '5', icon: Clock },
                { label: 'Store Credits', value: '₹450', icon: CreditCard },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-container-low p-8 rounded-3xl editorial-shadow flex items-center gap-6">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-label text-primary/40 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-surface-container-low rounded-3xl overflow-hidden editorial-shadow">
              <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="font-headline text-2xl font-bold text-primary">Recent Orders</h3>
                <button className="text-xs font-label font-bold text-secondary uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high text-primary/60 text-[10px] font-label tracking-widest uppercase">
                      <th className="px-8 py-4">Order ID</th>
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4">Total</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="px-8 py-6 font-bold text-primary">{order.id}</td>
                        <td className="px-8 py-6 text-sm text-primary/60">{order.date}</td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] font-label font-bold tracking-widest uppercase px-2 py-1 rounded ${
                            order.status === 'Delivered' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 font-bold text-primary">₹{order.total.toFixed(2)}</td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-xs font-label font-bold text-secondary uppercase tracking-widest hover:underline">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-surface-container-low p-8 md:p-12 rounded-3xl editorial-shadow space-y-8">
              <h3 className="font-headline text-2xl font-bold text-primary border-b border-outline-variant/10 pb-4">Account Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-label tracking-widest uppercase text-primary/40 font-bold">Full Name</label>
                  <p className="text-lg font-bold text-primary">{user.name}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label tracking-widest uppercase text-primary/40 font-bold">Email Address</label>
                  <p className="text-lg font-bold text-primary">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label tracking-widest uppercase text-primary/40 font-bold">Phone Number</label>
                  <p className="text-lg font-bold text-primary">+91 98765 43210</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label tracking-widest uppercase text-primary/40 font-bold">Default Address</label>
                  <p className="text-lg font-bold text-primary">45, Green Valley, Bangalore, KA</p>
                </div>
              </div>
              <button className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label font-bold text-xs tracking-widest uppercase hover:bg-primary/90 transition-all">
                Edit Profile
              </button>
            </div>
          </main>
        </div>
      </section>
    </motion.div>
  );
}

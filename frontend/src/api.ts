/**
 * API service layer for communication with the FastAPI backend.
 * All API calls go through this module.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ───────────────── Auth Token Management ─────────────────

let authToken: string | null = localStorage.getItem('auth_token');

export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem('auth_token', token);
}

export function clearAuthToken() {
  authToken = null;
  localStorage.removeItem('auth_token');
}

export function getAuthToken(): string | null {
  return authToken;
}

// ───────────────── Base Fetch Helpers ─────────────────

async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(error.detail || `API error: ${res.status}`);
  }

  return res.json();
}

// ───────────────── Type Definitions ─────────────────

export interface Category {
  id: number;
  slug: string;
  name: string;
  count_label: string;
  image: string;
  highlight: boolean;
  icon: string;
  product_count: number;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  is_top_rated: boolean;
  is_featured: boolean;
  is_top_selling: boolean;
  is_recently_added: boolean;
  asymmetry: boolean;
  in_stock: boolean;
}

export interface ProductBrief {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  is_featured: boolean;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  member_since: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export interface WishlistItem {
  id: number;
  product: ProductBrief;
  created_at: string;
}

export interface CartItem {
  id: number;
  product: ProductBrief;
  quantity: number;
}

// ───────────────── Products API ─────────────────

export const productsApi = {
  getAll: (params?: { category?: string; min_price?: number; max_price?: number; sort_by?: string }) => {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.min_price != null) query.set('min_price', String(params.min_price));
    if (params?.max_price != null) query.set('max_price', String(params.max_price));
    if (params?.sort_by) query.set('sort_by', params.sort_by);
    const qs = query.toString();
    return apiFetch<Product[]>(`/api/products${qs ? `?${qs}` : ''}`);
  },
  getBySlug: (slug: string) => apiFetch<Product>(`/api/products/${slug}`),
  getFeatured: () => apiFetch<ProductBrief[]>('/api/products/featured'),
  getTopSelling: () => apiFetch<ProductBrief[]>('/api/products/top-selling'),
  getRecentlyAdded: () => apiFetch<ProductBrief[]>('/api/products/recently-added'),
  getTopRated: () => apiFetch<ProductBrief[]>('/api/products/top-rated'),
};

// ───────────────── Categories API ─────────────────

export const categoriesApi = {
  getAll: () => apiFetch<Category[]>('/api/categories'),
};

// ───────────────── Search API ─────────────────

export const searchApi = {
  search: (q: string) => apiFetch<ProductBrief[]>(`/api/search?q=${encodeURIComponent(q)}`),
};

// ───────────────── Blog API ─────────────────

export const blogApi = {
  getPosts: () => apiFetch<BlogPost[]>('/api/blog/posts'),
  getFeatured: () => apiFetch<BlogPost>('/api/blog/posts/featured'),
  getPost: (id: number) => apiFetch<BlogPost>(`/api/blog/posts/${id}`),
};

// ───────────────── Contact API ─────────────────

export const contactApi = {
  submit: (data: ContactPayload) => apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(data) }),
};

// ───────────────── Auth API ─────────────────

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    apiFetch<AuthResponse>('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    apiFetch<AuthResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

// ───────────────── User API ─────────────────

export const usersApi = {
  getProfile: () => apiFetch<UserProfile>('/api/users/me'),
  updateProfile: (data: Partial<UserProfile>) =>
    apiFetch<UserProfile>('/api/users/me', { method: 'PUT', body: JSON.stringify(data) }),
};

// ───────────────── Orders API ─────────────────

export const ordersApi = {
  getAll: () => apiFetch<Order[]>('/api/orders'),
  getById: (id: number) => apiFetch<Order>(`/api/orders/${id}`),
  place: () => apiFetch<Order>('/api/orders', { method: 'POST' }),
};

// ───────────────── Wishlist API ─────────────────

export const wishlistApi = {
  getAll: () => apiFetch<WishlistItem[]>('/api/wishlist'),
  add: (productId: number) =>
    apiFetch<WishlistItem>('/api/wishlist', { method: 'POST', body: JSON.stringify({ product_id: productId }) }),
  remove: (productId: number) =>
    apiFetch('/api/wishlist/' + productId, { method: 'DELETE' }),
};

// ───────────────── Cart API ─────────────────

export const cartApi = {
  getAll: () => apiFetch<CartItem[]>('/api/cart'),
  add: (productId: number, quantity = 1) =>
    apiFetch<CartItem>('/api/cart', { method: 'POST', body: JSON.stringify({ product_id: productId, quantity }) }),
  update: (itemId: number, quantity: number) =>
    apiFetch<CartItem>(`/api/cart/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  remove: (itemId: number) =>
    apiFetch(`/api/cart/${itemId}`, { method: 'DELETE' }),
};

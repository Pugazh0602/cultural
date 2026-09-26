export interface Product {
  id: string;
  title: string;
  category: 'outerwear' | 'performance' | 'footwear' | 'limited';
  categoryLabel: string;
  price: number;
  badge?: string;
  badgeType?: 'core' | 'new' | 'limited' | 'experimental';
  image: string;
  alt: string;
  description: string;
  colors: string[];
  sizes: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Athlete {
  id: string;
  name: string;
  tagline: string;
  location: string;
  badge: string;
  badgeColor: string;
  quote: string;
  image: string;
  alt: string;
  bio: string;
  stats: { label: string; value: string }[];
  featuredGear: string[];
}

export interface FieldEvent {
  id: string;
  title: string;
  month: string;
  day: string;
  status: 'open' | 'warning' | 'upcoming';
  statusLabel: string;
  typeLabel: string;
  location: string;
  bibsLeft?: number;
  description: string;
}

export interface LeaderboardEntry {
  rank: string;
  callsign: string;
  initials: string;
  node: string;
  points: number;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  categoryColor: string;
  excerpt: string;
  image: string;
  alt: string;
  content: string[];
}

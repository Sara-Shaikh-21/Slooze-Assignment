export type User = {
  id: string;
  email: string;
  name: string;
  role: 'manager' | 'storekeeper';
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  lastUpdated: string;
};

export type DashboardStats = {
  totalProducts: number;
  lowStock: number;
  totalValue: number;
  categories: number;
};
import { Product, DashboardStats } from '../types';

// Mock products for demo
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rice (Premium)',
    category: 'Grains',
    price: 24.99,
    stock: 156,
    description: 'Premium quality basmati rice, 5kg package',
    lastUpdated: '2025-03-15',
  },
  {
    id: '2',
    name: 'Wheat Flour',
    category: 'Baking',
    price: 12.50,
    stock: 78,
    description: 'All-purpose wheat flour, 2kg package',
    lastUpdated: '2025-03-14',
  },
  {
    id: '3',
    name: 'Sugar',
    category: 'Baking',
    price: 8.99,
    stock: 212,
    description: 'Refined white sugar, 1kg package',
    lastUpdated: '2025-03-12',
  },
  {
    id: '4',
    name: 'Coffee Beans',
    category: 'Beverages',
    price: 18.99,
    stock: 43,
    description: 'Premium Arabica coffee beans, 500g package',
    lastUpdated: '2025-03-10',
  },
  {
    id: '5',
    name: 'Olive Oil',
    category: 'Cooking Oils',
    price: 15.75,
    stock: 68,
    description: 'Extra virgin olive oil, 750ml bottle',
    lastUpdated: '2025-03-09',
  },
  {
    id: '6',
    name: 'Salt',
    category: 'Spices',
    price: 3.25,
    stock: 189,
    description: 'Iodized table salt, 500g package',
    lastUpdated: '2025-03-08',
  },
  {
    id: '7',
    name: 'Black Pepper',
    category: 'Spices',
    price: 6.50,
    stock: 12,
    description: 'Ground black pepper, 100g package',
    lastUpdated: '2025-03-07',
  },
];

// Mock dashboard stats
export const DASHBOARD_STATS: DashboardStats = {
  totalProducts: PRODUCTS.length,
  lowStock: PRODUCTS.filter(p => p.stock < 50).length,
  totalValue: PRODUCTS.reduce((sum, product) => sum + (product.price * product.stock), 0),
  categories: new Set(PRODUCTS.map(p => p.category)).size,
};

// Mock API functions
export const getProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...PRODUCTS]);
    }, 800);
  });
};

export const getProduct = (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = PRODUCTS.find(p => p.id === id) || null;
      resolve(product ? {...product} : null);
    }, 500);
  });
};

export const updateProduct = (product: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update a database
      const index = PRODUCTS.findIndex(p => p.id === product.id);
      if (index >= 0) {
        PRODUCTS[index] = {...product, lastUpdated: new Date().toISOString().split('T')[0]};
      }
      resolve({...product, lastUpdated: new Date().toISOString().split('T')[0]});
    }, 800);
  });
};

export const createProduct = (product: Omit<Product, 'id' | 'lastUpdated'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would create in a database
      const newProduct = {
        ...product,
        id: String(PRODUCTS.length + 1),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      PRODUCTS.push(newProduct);
      resolve(newProduct);
    }, 800);
  });
};

export const getDashboardStats = (): Promise<DashboardStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Recalculate in case products have changed
      const stats: DashboardStats = {
        totalProducts: PRODUCTS.length,
        lowStock: PRODUCTS.filter(p => p.stock < 50).length,
        totalValue: PRODUCTS.reduce((sum, product) => sum + (product.price * product.stock), 0),
        categories: new Set(PRODUCTS.map(p => p.category)).size,
      };
      resolve(stats);
    }, 600);
  });
};
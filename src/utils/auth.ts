import { User } from '../types';

// Mock users for demo purposes
const USERS: User[] = [
  {
    id: '1',
    email: 'manager@example.com',
    name: 'John Manager',
    role: 'manager',
  },
  {
    id: '2',
    email: 'storekeeper@example.com',
    name: 'Jane Keeper',
    role: 'storekeeper',
  },
];

export const login = (email: string, password: string): Promise<User | null> => {
  // In a real app, this would be an API call to authenticate
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, any password works with the mock emails
      const user = USERS.find((u) => u.email === email);
      if (user) {
        // Store user in localStorage for session management
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      } else {
        resolve(null);
      }
    }, 800);
  });
};

export const logout = (): void => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser();
};

export const hasAccess = (requiredRole?: 'manager' | 'storekeeper'): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  if (!requiredRole) return true;
  if (requiredRole === 'storekeeper') return true; // Both roles can access storekeeper pages
  return user.role === requiredRole; // Only managers can access manager pages
};
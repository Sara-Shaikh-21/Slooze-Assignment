import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Home,
  Package,
  PlusCircle,
  LogOut,
  Moon,
  Sun,
  User
} from 'lucide-react';

interface SidebarProps {
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${isActive
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      {/* Logo and app name */}
      <div className="p-4 border-b dark:border-gray-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Package className="text-blue-600 dark:text-blue-400" />
          <span>Commodities</span>
        </h1>
      </div>

      {/* User info */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <User size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {/* Manager only sees dashboard */}
        {user?.role === 'manager' && (
          <NavLink to="/" className={navLinkClass} onClick={closeSidebar}>
            <Home size={18} className="mr-3" />
            Dashboard
          </NavLink>
        )}

        {/* Both roles can see products */}
        <NavLink to="/products" className={navLinkClass} onClick={closeSidebar}>
          <Package size={18} className="mr-3" />
          Products
        </NavLink>

        {/* Both roles can add products */}
        <NavLink to="/products/add" className={navLinkClass} onClick={closeSidebar}>
          <PlusCircle size={18} className="mr-3" />
          Add Product
        </NavLink>
      </nav>

      {/* Theme toggle and logout */}
      <div className="p-4 border-t dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center px-4 py-2 w-full rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 mb-2 transition-colors"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={18} className="mr-3" />
              Light Mode
            </>
          ) : (
            <>
              <Moon size={18} className="mr-3" />
              Dark Mode
            </>
          )}
        </button>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 w-full text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
import React, { useEffect, useState } from 'react';
import { Package, AlertTriangle, DollarSign, Tag } from 'lucide-react';
import { getDashboardStats } from '../utils/mockData';
import { DashboardStats, Product } from '../types';
import StatCard from '../components/StatCard';
import { getProducts } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  console.log("Dashboard loaded")
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const stats = await getDashboardStats();
        const products = await getProducts();

        if (!stats || !products) {
          console.error("Data fetch returned null or undefined", { stats, products });
        }

        const sortedProducts = [...products].sort((a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        ).slice(0, 5);

        setStats(stats);
        setRecentProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome to the Commodities Management System</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            color="bg-blue-600"
          />
          <StatCard
            title="Low Stock Items"
            value={stats.lowStock}
            icon={AlertTriangle}
            color="bg-amber-500"
          />
          <StatCard
            title="Total Inventory Value"
            value={`$${stats.totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`}
            icon={DollarSign}
            color="bg-green-600"
          />
          <StatCard
            title="Product Categories"
            value={stats.categories}
            icon={Tag}
            color="bg-purple-600"
          />
        </div>
      )}

      {/* Recent Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
        <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">{product.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{product.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center ${product.stock < 50
                      ? 'text-amber-800 dark:text-amber-400'
                      : 'text-green-800 dark:text-green-400'
                      }`}>
                      {product.stock < 50 && (
                        <AlertTriangle size={14} className="mr-1" />
                      )}
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{product.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
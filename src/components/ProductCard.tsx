import React from 'react';
import { Product } from '../types';
import { Edit, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isLowStock = product.stock < 50;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-200 hover:shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <Link 
          to={`/products/edit/${product.id}`}
          className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Edit size={18} />
        </Link>
      </div>
      
      <div className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="text-sm">
          <span className="block text-gray-500 dark:text-gray-400">Category</span>
          <span className="font-medium">{product.category}</span>
        </div>
        <div className="text-sm">
          <span className="block text-gray-500 dark:text-gray-400">Price</span>
          <span className="font-medium">${product.price.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="block text-gray-500 dark:text-gray-400">Last Updated</span>
          <span className="font-medium">{product.lastUpdated}</span>
        </div>
        <div className="flex items-center">
          {isLowStock && <AlertTriangle size={16} className="text-amber-500 mr-1" />}
          <span className={`text-sm font-medium ${
            isLowStock ? 'text-amber-600 dark:text-amber-400' : 'text-green-600 dark:text-green-400'
          }`}>
            {product.stock} in stock
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Redirect based on user role
const RoleRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  return user.role === 'manager'
    ? <Navigate to="/dashboard" />
    : <Navigate to="/products" />;
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<RoleRedirect />} />

            {/* Manager only routes */}
            <Route element={<ProtectedRoute requiredRole="manager" />}>
              <Route path="/dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
              </Route>
            </Route>

            {/* Routes for both roles */}
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<Layout />}>
                <Route index element={<Products />} />
                <Route path="add" element={<ProductForm />} />
                <Route path="edit/:id" element={<ProductForm />} />
              </Route>
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
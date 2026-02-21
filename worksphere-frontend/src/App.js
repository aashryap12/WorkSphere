import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PricingPage from './pages/navbar-items/PricingPage';
import ProductsPage from './pages/navbar-items/ProductsPage';
import UseCasesPage from './pages/navbar-items/UseCasesPage';
import RolesPage from './pages/navbar-items/RolesPage';
import CustomersPage from './pages/navbar-items/CustomersPage';
import EmployeeDashboard from './pages/dashboards/EmployeeDashboard';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';
import HRDashboard from './pages/dashboards/HRDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="use-cases" element={<UseCasesPage />} />
          <Route path="roles" element={<RolesPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute allowedRole="employee" />}>
          <Route path="employee-dashboard" element={<EmployeeDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="manager" />}>
          <Route path="manager-dashboard" element={<ManagerDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="hr" />}>
          <Route path="hr-dashboard" element={<HRDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

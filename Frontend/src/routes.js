import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import InventoryPage from './pages/InventoryPage'; 

import DashboardAppPage from './pages/DashboardAppPage';
import SignUp from './sections/auth/signup/SignUp';
import OrdersPage from './pages/OrdersPage';

// ----------------------------------------------------------------------

export default function Router() {

  const user = JSON.parse(localStorage.getItem('user'));

  const routes =  useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'inventory', element: <InventoryPage /> },
        {path: 'orders', element: <OrdersPage/>}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUp/>,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ])
  
  const authRoutes =  useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUp/>,
    },
    {
      path: '',
      element: <LoginPage />,
    },
    { 
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ])

  return user ? routes : authRoutes;
}

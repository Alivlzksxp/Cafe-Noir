import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import DashLayout from './components/DashLayout';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import ArticlePage from './pages/LandingPages/ArticlePage';
import ContactPage from './pages/LandingPages/ContactUsPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import UsersPage from './pages/DashboardPage/UsersPage';
import ReportsPage from './pages/DashboardPage/ReportsPage';
import DashArticleListPage from './pages/DashboardPage/DashArticleListPage'; 

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/articles', element: <ArticleListPage /> },
      { path: '/articles/:name', element: <ArticlePage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/welcome', element: <WelcomePage /> },
    ],
  },

  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegistrationPage /> },

  {
    path: '/dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'articles', element: <DashArticleListPage /> }, 
      { path: 'reports', element: <ReportsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

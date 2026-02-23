
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layout/MainLayout';
import Login from './components/Login';
import Registration from './components/Registration';
import Admin from './components/Admin';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';

const PagePlaceholder = ({ title }) => (
  <div className="min-h-screen bg-slate-50 pt-40 px-6 flex flex-col items-center relative overflow-hidden">
     <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-100/40 via-transparent to-transparent" />
    <h1 className="text-4xl font-bold text-slate-800 relative z-10">{title}</h1>
    <p className="mt-4 text-slate-500 relative z-10">Content coming soon...</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
       {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/registration",
        element: <Registration />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/member",
        element: <PagePlaceholder title="member Page" />
      },
      {
        path: "/contact",
        element: <PagePlaceholder title="About Page" />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)

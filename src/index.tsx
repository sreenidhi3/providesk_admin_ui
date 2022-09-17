import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routeConfig from 'routes/routeConfig';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const router = createBrowserRouter(routeConfig);
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

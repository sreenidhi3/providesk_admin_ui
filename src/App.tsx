import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routeConfig from 'routes/routeConfig';
import { GOOGLE_CLIENT_ID } from 'shared/appConstants';

import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(routeConfig);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

import { createContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "theme";

import { userContextType } from "modules/Auth/auth.types";
import { routeConfig } from "routes/routeConfig";
import { GOOGLE_CLIENT_ID, LOCAL_STORAGE_KEYS } from "shared/appConstants";
import { loadLocalStorage } from "shared/localStorageHelpers";

import "./App.css";

// Create a client
const queryClient = new QueryClient();

// Create a context
export const UserContext = createContext<userContextType>({
  userAuth: { message: "", auth_token: "" },
  userProfile: { name: "", email: "", picture: "" },
});

function App() {
  const router = createBrowserRouter(routeConfig);

  const userDetails = {
    userAuth: loadLocalStorage(LOCAL_STORAGE_KEYS.USER_AUTH),
    userProfile: loadLocalStorage(LOCAL_STORAGE_KEYS.USER_PROFILE),
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={userDetails}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </UserContext.Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

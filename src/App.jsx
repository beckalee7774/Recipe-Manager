import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import Nutrition from "./pages/Nutrition";
import ReviewRecipes from "./pages/ReviewRecipes";
import SearchRecipes from "./pages/SearchRecipes";
import Signup from "./pages/Signup";
import TodoRecipes from "./pages/TodoRecipes";
import UserSettings from "./pages/UserSettings";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./ui/PageNotFound";
import Equipment from "./pages/Equipment";
import { SidebarProvider } from "./contexts/SidebarContext";
import { Toaster } from "react-hot-toast";
import LoggedOutLayout from "./ui/LoggedOutLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // data is valid for 1 minute
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SidebarProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<LoggedOutLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="search" />} />
                <Route path="search" element={<SearchRecipes />} />
                <Route path="recipe/:id" element={<Recipe />} />
                <Route path="recipe/nutrition/:id" element={<Nutrition />} />
                <Route path="recipe/equipment/:id" element={<Equipment />} />
                <Route path="reviews" element={<ReviewRecipes />} />
                <Route path="todo" element={<TodoRecipes />} />
                <Route path="settings" element={<UserSettings />} />

                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </SidebarProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "rgb(255 237 213)",
            color: "rgb(154 52 18)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

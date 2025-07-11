
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute, RestaurantRoute, PlatformRoute, PublicRoute } from "@/components/routing/RouteGuards";
import Index from "./pages/Index";
import Platform from "./pages/Platform";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Dashboard } from "@/components/Dashboard";
import { PlatformLayout } from "@/components/platform/PlatformLayout";
import { PlatformOverview } from "@/components/platform/dashboard/PlatformOverview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <PublicRoute>
                <Index />
              </PublicRoute>
            } />
            <Route path="/platform" element={
              <PublicRoute>
                <Platform />
              </PublicRoute>
            } />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/auth" element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            } />

            {/* 🏪 Restaurant Manager Routes (RESTAURANT-SPECIFIC DATA ONLY) */}
            <Route path="/restaurant/*" element={
              <RestaurantRoute>
                <Dashboard />
              </RestaurantRoute>
            } />

            {/* Legacy dashboard route - redirect to restaurant */}
            <Route path="/dashboard/*" element={
              <RestaurantRoute>
                <Dashboard />
              </RestaurantRoute>
            } />

            {/* 👤 Platform Owner Routes (ALL RESTAURANTS DATA) */}
            <Route path="/platform/dashboard" element={
              <PlatformRoute>
                <PlatformLayout>
                  <PlatformOverview />
                </PlatformLayout>
              </PlatformRoute>
            } />
            <Route path="/platform/restaurants" element={
              <PlatformRoute>
                <PlatformLayout>
                  <div>Restaurant Management - Coming Soon</div>
                </PlatformLayout>
              </PlatformRoute>
            } />
            <Route path="/platform/financial" element={
              <PlatformRoute>
                <PlatformLayout>
                  <div>Financial Management - Coming Soon</div>
                </PlatformLayout>
              </PlatformRoute>
            } />
            <Route path="/platform/configuration" element={
              <PlatformRoute>
                <PlatformLayout>
                  <div>Platform Configuration - Coming Soon</div>
                </PlatformLayout>
              </PlatformRoute>
            } />
            <Route path="/platform/support" element={
              <PlatformRoute>
                <PlatformLayout>
                  <div>Support Management - Coming Soon</div>
                </PlatformLayout>
              </PlatformRoute>
            } />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

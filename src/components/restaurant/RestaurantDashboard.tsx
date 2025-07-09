import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { RestaurantDashboardLayout } from './RestaurantDashboardLayout';
import { RestaurantOverview } from './dashboard/RestaurantOverview';
import { OrderManagement } from './dashboard/OrderManagement';
import { MenuManagement } from './dashboard/MenuManagement';
import { TableManagement } from './dashboard/TableManagement';
import { PaymentProcessing } from './dashboard/PaymentProcessing';
import { StaffManagement as RestaurantStaffManagement } from './dashboard/StaffManagement';
import { RestaurantSettings } from './dashboard/RestaurantSettings';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  timezone: string;
  currency: string;
  is_active: boolean;
}

export const RestaurantDashboard = () => {
  const { user, loading } = useAuth();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user && !loading) {
      fetchRestaurant();
    }
  }, [user, loading]);

  const fetchRestaurant = async () => {
    try {
      // First check if user owns a restaurant
      const { data: ownedRestaurant, error: ownerError } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user?.id)
        .eq('is_active', true)
        .maybeSingle();

      if (!ownerError && ownedRestaurant) {
        setRestaurant(ownedRestaurant);
        setRestaurantLoading(false);
        return;
      }

      // If not owner, check if they're a staff member
      const { data: staffMember, error: staffError } = await supabase
        .from('staff_members')
        .select(`
          *,
          restaurants (*)
        `)
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .maybeSingle();

      if (!staffError && staffMember) {
        setRestaurant(staffMember.restaurants as Restaurant);
      } else {
        // No restaurant access found
        setRestaurant(null);
      }
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      toast({
        title: "Error",
        description: "Failed to load restaurant information",
        variant: "destructive",
      });
    } finally {
      setRestaurantLoading(false);
    }
  };

  if (loading || restaurantLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading restaurant dashboard...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No Restaurant Access</h2>
            <p className="text-gray-600 mb-4">
              You don't have access to any restaurant. Please contact your administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <RestaurantDashboardLayout restaurant={restaurant}>
      <Routes>
        <Route path="/" element={<RestaurantOverview restaurant={restaurant} />} />
        <Route path="/orders" element={<OrderManagement restaurant={restaurant} />} />
        <Route path="/menu" element={<MenuManagement restaurant={restaurant} />} />
        <Route path="/tables" element={<TableManagement restaurant={restaurant} />} />
        <Route path="/payments" element={<PaymentProcessing restaurant={restaurant} />} />
        <Route path="/staff" element={<RestaurantStaffManagement restaurant={restaurant} />} />
        <Route path="/settings" element={<RestaurantSettings restaurant={restaurant} />} />
      </Routes>
    </RestaurantDashboardLayout>
  );
};
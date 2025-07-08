
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { AdminDashboard } from './AdminDashboard';
import { CustomerDashboard } from './CustomerDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const Dashboard = () => {
  const { loading, fynloUserData } = useAuth();
  const { isPlatformOwner, getRestaurantId } = useFeatureAccess();

  if (loading || !fynloUserData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading your dashboard...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Platform owner gets admin dashboard
  if (isPlatformOwner()) {
    return <AdminDashboard />;
  }

  // Restaurant users get customer dashboard
  if (getRestaurantId()) {
    return <CustomerDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600">Unable to determine your access level.</p>
        </CardContent>
      </Card>
    </div>
  );
};

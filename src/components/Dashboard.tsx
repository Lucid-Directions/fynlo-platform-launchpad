
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { DashboardLayout } from './DashboardLayout';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { BusinessManagement } from './dashboard/BusinessManagement';
import { AnalyticsDashboard } from './dashboard/AnalyticsDashboard';
import { PaymentSettings } from './dashboard/PaymentSettings';
import { SubscriptionManagement } from './dashboard/SubscriptionManagement';
import { SystemHealth } from './dashboard/SystemHealth';
import { DashboardSettings } from './dashboard/DashboardSettings';
import { InventoryManagement } from './dashboard/InventoryManagement';
import { StaffManagement } from './dashboard/StaffManagement';
import { CustomerDatabase } from './dashboard/CustomerDatabase';
import { LocationManagement } from './dashboard/LocationManagement';
import { ApiAccess } from './dashboard/ApiAccess';
import { ReportsPage } from './dashboard/ReportsPage';
import { UpgradePrompt } from './dashboard/UpgradePrompt';
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

  // Check access permissions
  if (!isPlatformOwner() && !getRestaurantId()) {
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
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        
        {/* Platform Owner Routes */}
        {isPlatformOwner() && (
          <>
            <Route path="/businesses" element={<BusinessManagement />} />
            <Route path="/subscriptions" element={<SubscriptionManagement />} />
            <Route path="/system" element={<SystemHealth />} />
          </>
        )}
        
        {/* Shared Routes */}
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/payments" element={<PaymentSettings />} />
        <Route path="/settings" element={<DashboardSettings />} />
        <Route path="/reports" element={<ReportsPage />} />
        
        {/* Customer Portal Routes (Feature-Gated) */}
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/staff" element={<StaffManagement />} />
        <Route path="/customers" element={<CustomerDatabase />} />
        <Route path="/locations" element={<LocationManagement />} />
        <Route path="/api" element={<ApiAccess />} />
      </Routes>
    </DashboardLayout>
  );
};

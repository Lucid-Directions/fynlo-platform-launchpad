import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  TrendingUp, 
  Building2, 
  CreditCard,
  Users,
  Activity,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  Plus
} from 'lucide-react';

export const DashboardOverview = () => {
  const { fynloUserData } = useAuth();
  const { isPlatformOwner, hasFeature, getSubscriptionPlan } = useFeatureAccess();

  const subscriptionPlan = getSubscriptionPlan();
  const showUpgrade = !isPlatformOwner() && subscriptionPlan !== 'omega';

  if (isPlatformOwner()) {
    return <PlatformOwnerOverview />;
  }

  return <CustomerPortalOverview subscriptionPlan={subscriptionPlan} showUpgrade={showUpgrade} />;
};

const PlatformOwnerOverview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
        <p className="text-gray-600">Monitor your Fynlo platform performance and growth</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Businesses</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+12% vs yesterday</span>
                </div>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                <p className="text-2xl font-bold text-gray-900">£24,589.23</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+8.3%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">1,847</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-600 ml-1">+156 today</span>
                </div>
              </div>
              <CreditCard className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-lg font-semibold text-green-600">Operational</span>
                </div>
                <p className="text-sm text-gray-500">99.9% uptime</p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="h-20 flex flex-col items-center justify-center space-y-2">
          <Plus className="w-5 h-5" />
          <span>Add Business</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <Activity className="w-5 h-5" />
          <span>View Reports</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <CreditCard className="w-5 h-5" />
          <span>Payment Settings</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
          <Building2 className="w-5 h-5" />
          <span>System Status</span>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { icon: Building2, text: 'New business "Mario\'s Pizza" registered', time: '2 minutes ago', type: 'success' },
              { icon: AlertTriangle, text: 'High transaction volume detected', time: '15 minutes ago', type: 'warning' },
              { icon: Users, text: '5 new restaurant users this hour', time: '1 hour ago', type: 'info' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-100' :
                  activity.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <activity.icon className={`w-4 h-4 ${
                    activity.type === 'success' ? 'text-green-600' :
                    activity.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface CustomerPortalOverviewProps {
  subscriptionPlan: 'alpha' | 'beta' | 'omega';
  showUpgrade: boolean;
}

const CustomerPortalOverview: React.FC<CustomerPortalOverviewProps> = ({ subscriptionPlan, showUpgrade }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Here's what's happening with your restaurant today</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {subscriptionPlan.toUpperCase()} Plan
        </Badge>
      </div>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                <p className="text-2xl font-bold text-gray-900">£1,247.89</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Orders Count</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Order</p>
                <p className="text-2xl font-bold text-gray-900">£29.71</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Item</p>
                <p className="text-lg font-bold text-gray-900">Fish & Chips</p>
                <p className="text-sm text-gray-500">12 sold</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Prompt */}
      {showUpgrade && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Unlock More Features
                </h3>
                <p className="text-blue-700">
                  Upgrade to {subscriptionPlan === 'alpha' ? 'Beta' : 'Omega'} for advanced analytics, inventory management, and more.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
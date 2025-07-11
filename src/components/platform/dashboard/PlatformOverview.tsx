import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  AlertCircle
} from 'lucide-react';

// 👤 PLATFORM OWNER DASHBOARD - Overview of ALL restaurants
export const PlatformOverview = () => {
  // TODO: Replace with API calls
  const platformMetrics = {
    totalRestaurants: 42,
    activeRestaurants: 38,
    totalRevenue: 125000,
    totalTransactions: 2840,
    averageRestaurantRevenue: 2976,
    newSignupsThisMonth: 8,
    churnRate: 2.3,
    platformHealth: {
      apiUptime: 99.9,
      averageResponseTime: 120,
      errorRate: 0.1
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Platform Overview</h1>
          <p className="text-muted-foreground">
            Monitor all restaurants and platform performance
          </p>
        </div>
        <Button>
          <Activity className="mr-2 h-4 w-4" />
          View System Health
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Restaurants</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalRestaurants}</div>
            <p className="text-xs text-muted-foreground">
              {platformMetrics.activeRestaurants} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              £{platformMetrics.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformMetrics.totalTransactions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Signups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.newSignupsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Churn rate: {platformMetrics.churnRate}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Health */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Health</CardTitle>
          <CardDescription>
            Real-time system performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm font-medium">API Uptime</p>
                <p className="text-2xl font-bold text-green-600">
                  {platformMetrics.platformHealth.apiUptime}%
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Excellent
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm font-medium">Avg Response Time</p>
                <p className="text-2xl font-bold">
                  {platformMetrics.platformHealth.averageResponseTime}ms
                </p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Good
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="text-sm font-medium">Error Rate</p>
                <p className="text-2xl font-bold">
                  {platformMetrics.platformHealth.errorRate}%
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Low
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common platform management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Building2 className="h-6 w-6" />
              <span>Add Restaurant</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="h-6 w-6" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <AlertCircle className="h-6 w-6" />
              <span>Support Tickets</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert about implementation */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Implementation Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-orange-700">
            This is the Platform Owner Dashboard (👤). This view shows aggregated data from ALL restaurants.
            Platform owners can see system-wide metrics, manage all restaurants, and configure platform settings.
            This is completely separate from the Restaurant Manager Dashboard (🏪).
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
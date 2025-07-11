import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Users, 
  Calendar,
  Download,
  AlertCircle
} from "lucide-react";

const FinancialManagement = () => {
  // Mock data - in real implementation, fetch from API
  const platformMetrics = {
    totalRevenue: 125780.50,
    monthlyGrowth: 12.5,
    totalRestaurants: 47,
    activeSubscriptions: 42,
    transactionFees: 8456.30,
    subscriptionRevenue: 2940.00
  };

  const subscriptionBreakdown = [
    { plan: 'Alpha (Free)', count: 18, revenue: 0, color: 'bg-gray-500' },
    { plan: 'Beta (£49)', count: 20, revenue: 980, color: 'bg-blue-500' },
    { plan: 'Omega (£119)', count: 9, revenue: 1071, color: 'bg-purple-500' }
  ];

  const recentTransactions = [
    { restaurant: 'The Local Bistro', amount: 458.20, type: 'Transaction Fee', date: '2 hours ago' },
    { restaurant: 'Pizza Corner', amount: 49.00, type: 'Subscription', date: '1 day ago' },
    { restaurant: 'Curry House', amount: 119.00, type: 'Subscription', date: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
          <p className="text-muted-foreground">Platform revenue and commission tracking</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{platformMetrics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +{platformMetrics.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Restaurants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              of {platformMetrics.totalRestaurants} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{platformMetrics.transactionFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              1% of all transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{platformMetrics.subscriptionRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Monthly recurring revenue
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="transactions">Transaction Fees</TabsTrigger>
          <TabsTrigger value="commissions">Commission Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan Breakdown</CardTitle>
                <CardDescription>Revenue distribution by plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscriptionBreakdown.map((plan, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${plan.color}`} />
                      <span className="font-medium">{plan.plan}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">£{plan.revenue}</div>
                      <div className="text-sm text-muted-foreground">{plan.count} restaurants</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest platform revenue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <div className="font-medium">{transaction.restaurant}</div>
                      <div className="text-sm text-muted-foreground">{transaction.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">£{transaction.amount}</div>
                      <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Manage platform subscription plans and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Plan Configuration</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Subscription plan management will be available in the configuration section.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Fee Analytics</CardTitle>
              <CardDescription>1% transaction fee breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Transaction Fee Structure</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Current platform fee: 1% on all transactions across all subscription plans
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Tracking</CardTitle>
              <CardDescription>Monthly platform fees and collection status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Automated Billing</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    All subscription fees and transaction commissions are automatically collected.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialManagement;
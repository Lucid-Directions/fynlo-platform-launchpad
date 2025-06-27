
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Settings, BarChart3, CreditCard, FileText, Shield } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Fynlo platform and customer accounts</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-slate-900">0</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">£0</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Plans</p>
                  <p className="text-2xl font-bold text-slate-900">0</p>
                </div>
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                  <p className="text-2xl font-bold text-slate-900">0</p>
                </div>
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Customer Management
              </CardTitle>
              <CardDescription>
                Manage customer accounts and subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                View All Customers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-2" />
                Manage Subscriptions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Customer Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Platform Settings
              </CardTitle>
              <CardDescription>
                Configure platform settings and content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Edit Website Content
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Pricing & Plans
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activity and customer actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              No recent activity to display
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

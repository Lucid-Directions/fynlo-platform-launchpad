import React from 'react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { UpgradePrompt } from './UpgradePrompt';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package2, Plus, TrendingDown } from 'lucide-react';

export const InventoryManagement = () => {
  const { hasFeature } = useFeatureAccess();

  if (!hasFeature('inventory_management')) {
    return (
      <UpgradePrompt
        title="Inventory Management"
        description="Track stock levels, set reorder points, and manage suppliers with advanced inventory tools."
        requiredPlan="beta"
        features={[
          'Real-time stock tracking',
          'Low stock alerts',
          'Supplier management',
          'Purchase orders',
          'Inventory reports',
          'Cost tracking'
        ]}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your restaurant inventory</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="font-semibold text-red-900">Low Stock</span>
                </div>
                <p className="text-2xl font-bold text-red-900">5 Items</p>
                <p className="text-sm text-red-700">Need immediate attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <TrendingDown className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-semibold text-yellow-900">Reorder Soon</span>
                </div>
                <p className="text-2xl font-bold text-yellow-900">12 Items</p>
                <p className="text-sm text-yellow-700">Below reorder point</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Package2 className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-900">Total Items</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">127</p>
                <p className="text-sm text-blue-700">In inventory</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Tomatoes', category: 'Vegetables', current: 5, minimum: 20, status: 'critical' },
              { name: 'Mozzarella Cheese', category: 'Dairy', current: 15, minimum: 10, status: 'warning' },
              { name: 'Pizza Dough', category: 'Ingredients', current: 25, minimum: 15, status: 'good' },
              { name: 'Olive Oil', category: 'Condiments', current: 8, minimum: 5, status: 'good' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{item.current} units</p>
                    <p className="text-sm text-gray-500">Min: {item.minimum}</p>
                  </div>
                  <Badge variant={
                    item.status === 'critical' ? 'destructive' :
                    item.status === 'warning' ? 'secondary' : 'default'
                  }>
                    {item.status === 'critical' ? 'Low Stock' :
                     item.status === 'warning' ? 'Reorder Soon' : 'In Stock'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
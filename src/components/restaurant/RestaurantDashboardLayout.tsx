import React, { useState } from 'react';
import { RestaurantSidebar } from './RestaurantSidebar';
import { RestaurantTopBar } from './RestaurantTopBar';

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  is_active: boolean;
}

interface RestaurantDashboardLayoutProps {
  children: React.ReactNode;
  restaurant: Restaurant;
}

export const RestaurantDashboardLayout: React.FC<RestaurantDashboardLayoutProps> = ({ 
  children, 
  restaurant 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <RestaurantSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        restaurant={restaurant}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <RestaurantTopBar restaurant={restaurant} />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Menu as MenuIcon,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Store,
  Table
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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

interface RestaurantSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  restaurant: Restaurant;
}

export const RestaurantSidebar: React.FC<RestaurantSidebarProps> = ({ 
  collapsed, 
  onToggle, 
  restaurant 
}) => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const navigationItems = [
    { 
      title: 'Overview', 
      href: '/restaurant', 
      icon: LayoutDashboard,
      exact: true 
    },
    { 
      title: 'Orders', 
      href: '/restaurant/orders', 
      icon: ShoppingCart 
    },
    { 
      title: 'Menu', 
      href: '/restaurant/menu', 
      icon: MenuIcon 
    },
    { 
      title: 'Tables', 
      href: '/restaurant/tables', 
      icon: Table 
    },
    { 
      title: 'Payments', 
      href: '/restaurant/payments', 
      icon: CreditCard 
    },
    { 
      title: 'Staff', 
      href: '/restaurant/staff', 
      icon: Users 
    },
    { 
      title: 'Settings', 
      href: '/restaurant/settings', 
      icon: Settings 
    },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 truncate">{restaurant.name}</h2>
              <p className="text-xs text-gray-500">Restaurant POS</p>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive: navIsActive }) => `
              flex items-center p-3 rounded-lg transition-all duration-200
              ${(navIsActive && item.exact) || (!item.exact && isActive(item.href)) 
                ? 'bg-primary text-white' 
                : 'text-gray-700 hover:bg-gray-100'
              }
              ${collapsed ? 'justify-center' : 'space-x-3'}
            `}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-white text-sm">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500">Staff Member</p>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full mt-3 justify-start text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  Star,
  DollarSign
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  cost: number;
  image_url?: string;
  is_available: boolean;
  is_featured: boolean;
  allergens?: string[];
  tags?: string[];
  menu_categories?: {
    name: string;
  };
}

interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
}

interface MenuManagementProps {
  restaurant: Restaurant;
}

export const MenuManagement: React.FC<MenuManagementProps> = ({ restaurant }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([fetchMenuItems(), fetchCategories()]);
  }, [restaurant.id]);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select(`
          *,
          menu_categories (name)
        `)
        .eq('restaurant_id', restaurant.id)
        .order('name');

      if (error) {
        throw error;
      }

      setMenuItems(data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast({
        title: "Error",
        description: "Failed to load menu items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_categories')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .eq('is_active', true)
        .order('sort_order');

      if (error) {
        throw error;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const toggleItemAvailability = async (itemId: string, currentAvailability: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_available: !currentAvailability })
        .eq('id', itemId);

      if (error) {
        throw error;
      }

      await fetchMenuItems();
      toast({
        title: "Success",
        description: `Item ${!currentAvailability ? 'enabled' : 'disabled'}`,
      });
    } catch (error) {
      console.error('Error updating item availability:', error);
      toast({
        title: "Error",
        description: "Failed to update item availability",
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (itemId: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ is_featured: !currentFeatured })
        .eq('id', itemId);

      if (error) {
        throw error;
      }

      await fetchMenuItems();
      toast({
        title: "Success",
        description: `Item ${!currentFeatured ? 'featured' : 'unfeatured'}`,
      });
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           item.menu_categories?.name === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="p-6">Loading menu...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant's menu items and categories</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{menuItems.length}</p>
              </div>
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {menuItems.filter(item => item.is_available).length}
                </p>
              </div>
              <Eye className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {menuItems.filter(item => item.is_featured).length}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`${!item.is_available ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {item.is_featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  {item.menu_categories && (
                    <Badge variant="outline" className="text-xs mb-2">
                      {item.menu_categories.name}
                    </Badge>
                  )}
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xl font-bold text-green-600">£{item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Cost: £{item.cost.toFixed(2)}</p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleItemAvailability(item.id, item.is_available)}
                  >
                    {item.is_available ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatured(item.id, item.is_featured)}
                  >
                    <Star className={`w-4 h-4 ${item.is_featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {item.allergens && item.allergens.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      Allergens: {item.allergens.join(', ')}
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No menu items found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
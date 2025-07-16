import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Heart, 
  Plus, 
  Search, 
  Settings,
  Users,
  Building2,
  Gift,
  TrendingUp,
  Calendar,
  Award,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoyaltyProgram {
  id: string;
  name: string;
  description?: string;
  program_type: string;
  is_active: boolean;
  restaurant_id: string;
  settings?: any;
  created_at: string;
  updated_at: string;
}

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  is_active: boolean;
}

export const PlatformLoyaltyPrograms: React.FC = () => {
  const [programs, setPrograms] = useState<LoyaltyProgram[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurants, setSelectedRestaurants] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    program_type: 'points',
    settings: {
      points_per_purchase: 1,
      redemption_threshold: 100,
      reward_value: 10
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch loyalty programs
      const { data: programsData, error: programsError } = await supabase
        .from('loyalty_programs')
        .select('*')
        .order('created_at', { ascending: false });

      if (programsError) throw programsError;

      // Fetch restaurants
      const { data: restaurantsData, error: restaurantsError } = await supabase
        .from('restaurants')
        .select('id, name, slug, is_active')
        .order('name');

      if (restaurantsError) throw restaurantsError;

      setPrograms(programsData || []);
      setRestaurants(restaurantsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createLoyaltyProgram = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Program name is required",
        variant: "destructive",
      });
      return;
    }

    if (selectedRestaurants.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one restaurant",
        variant: "destructive",
      });
      return;
    }

    try {
      const programPromises = selectedRestaurants.map(restaurantId => 
        supabase
          .from('loyalty_programs')
          .insert({
            name: formData.name,
            description: formData.description,
            program_type: formData.program_type,
            restaurant_id: restaurantId,
            settings: formData.settings,
            is_active: true
          })
      );

      const results = await Promise.all(programPromises);
      
      // Check for errors
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        throw errors[0].error;
      }

      await fetchData();
      setIsCreateDialogOpen(false);
      resetForm();
      
      toast({
        title: "Success",
        description: `Loyalty program created for ${selectedRestaurants.length} restaurant(s)`,
      });
    } catch (error) {
      console.error('Error creating loyalty program:', error);
      toast({
        title: "Error",
        description: "Failed to create loyalty program",
        variant: "destructive",
      });
    }
  };

  const toggleProgramStatus = async (programId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('loyalty_programs')
        .update({ is_active: !currentStatus })
        .eq('id', programId);

      if (error) throw error;

      await fetchData();
      toast({
        title: "Success",
        description: `Program ${!currentStatus ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      console.error('Error updating program status:', error);
      toast({
        title: "Error",
        description: "Failed to update program status",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      program_type: 'points',
      settings: {
        points_per_purchase: 1,
        redemption_threshold: 100,
        reward_value: 10
      }
    });
    setSelectedRestaurants([]);
  };

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRestaurantName = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    return restaurant?.name || 'Unknown Restaurant';
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB');

  if (loading) {
    return <div className="p-6">Loading loyalty programs...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loyalty Programs</h1>
          <p className="text-gray-600">Create and manage loyalty programs across all restaurants</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Loyalty Program Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  placeholder="e.g., Summer Rewards Campaign"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  placeholder="Describe your loyalty program..."
                />
              </div>

              <div>
                <Label htmlFor="program_type">Program Type</Label>
                <Select 
                  value={formData.program_type} 
                  onValueChange={(value) => setFormData(prev => ({...prev, program_type: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="points">Points-Based</SelectItem>
                    <SelectItem value="cashback">Cashback</SelectItem>
                    <SelectItem value="visit">Visit-Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Points per £1</Label>
                  <Input
                    type="number"
                    value={formData.settings.points_per_purchase}
                    onChange={(e) => setFormData(prev => ({
                      ...prev, 
                      settings: {...prev.settings, points_per_purchase: Number(e.target.value)}
                    }))}
                  />
                </div>
                <div>
                  <Label>Redemption Threshold</Label>
                  <Input
                    type="number"
                    value={formData.settings.redemption_threshold}
                    onChange={(e) => setFormData(prev => ({
                      ...prev, 
                      settings: {...prev.settings, redemption_threshold: Number(e.target.value)}
                    }))}
                  />
                </div>
                <div>
                  <Label>Reward Value (£)</Label>
                  <Input
                    type="number"
                    value={formData.settings.reward_value}
                    onChange={(e) => setFormData(prev => ({
                      ...prev, 
                      settings: {...prev.settings, reward_value: Number(e.target.value)}
                    }))}
                  />
                </div>
              </div>

              <div>
                <Label>Assign to Restaurants</Label>
                <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                  {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="flex items-center space-x-2 py-2">
                      <Checkbox
                        id={restaurant.id}
                        checked={selectedRestaurants.includes(restaurant.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRestaurants(prev => [...prev, restaurant.id]);
                          } else {
                            setSelectedRestaurants(prev => prev.filter(id => id !== restaurant.id));
                          }
                        }}
                      />
                      <Label htmlFor={restaurant.id} className="flex-1 cursor-pointer">
                        {restaurant.name}
                        <Badge 
                          variant={restaurant.is_active ? 'default' : 'secondary'}
                          className="ml-2"
                        >
                          {restaurant.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createLoyaltyProgram}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Programs</p>
                <p className="text-2xl font-bold">{programs.length}</p>
              </div>
              <Heart className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Programs</p>
                <p className="text-2xl font-bold text-green-600">
                  {programs.filter(p => p.is_active).length}
                </p>
              </div>
              <Award className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Restaurants</p>
                <p className="text-2xl font-bold">{restaurants.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Program Types</p>
                <p className="text-2xl font-bold">
                  {new Set(programs.map(p => p.program_type)).size}
                </p>
              </div>
              <Gift className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search loyalty programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Programs List */}
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Programs ({filteredPrograms.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No loyalty programs found</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Campaign
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrograms.map((program) => (
                <div key={program.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{program.name}</h3>
                        <Badge 
                          variant={program.is_active ? 'default' : 'secondary'}
                          className={program.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                        >
                          {program.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline">
                          {program.program_type}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{program.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Building2 className="w-3 h-3 mr-1" />
                          {getRestaurantName(program.restaurant_id)}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Created {formatDate(program.created_at)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleProgramStatus(program.id, program.is_active)}
                      >
                        {program.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
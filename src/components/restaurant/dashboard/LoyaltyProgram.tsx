import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Gift, 
  Star, 
  TrendingUp, 
  Users, 
  Calendar,
  Target,
  Award,
  Percent,
  Heart,
  Coffee,
  CreditCard,
  Share2,
  UserPlus,
  Cake,
  Snowflake,
  Sun,
  Moon,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  id: string;
  name: string;
}

interface LoyaltyProgram {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  program_type: 'points' | 'visits' | 'spending' | 'tiered';
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  points_per_dollar: number;
  dollar_value_per_point: number;
  visits_required?: number;
  reward_after_visits?: number;
  spending_threshold?: number;
  spending_reward_type?: 'percentage' | 'fixed_amount' | 'free_item';
  spending_reward_value?: number;
  tier_thresholds: any[];
  tier_benefits: any[];
  created_at: string;
  updated_at: string;
}

interface LoyaltyCampaign {
  id: string;
  restaurant_id: string;
  loyalty_program_id?: string;
  name: string;
  description: string;
  campaign_type: 'double_points' | 'bonus_visit' | 'happy_hour' | 'birthday' | 'referral' | 'social_media' | 'first_visit' | 'seasonal';
  multiplier: number;
  bonus_points: number;
  bonus_visits: number;
  discount_percentage?: number;
  discount_amount?: number;
  start_date: string;
  end_date?: string;
  days_of_week: number[];
  start_time?: string;
  end_time?: string;
  min_purchase_amount?: number;
  max_uses_per_customer?: number;
  max_total_uses?: number;
  current_uses: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface LoyaltyProgramProps {
  restaurant: Restaurant;
}

// Preset loyalty program templates
const PROGRAM_PRESETS = [
  {
    name: "Points Rewards",
    type: "points" as const,
    description: "Customers earn points for every purchase and can redeem them for rewards",
    points_per_dollar: 1.0,
    dollar_value_per_point: 0.01,
    icon: Star
  },
  {
    name: "Visit Stamp Card",
    type: "visits" as const,
    description: "Buy 10 get 1 free - Classic stamp card system",
    visits_required: 10,
    reward_after_visits: 1,
    icon: Coffee
  },
  {
    name: "Spending Milestone",
    type: "spending" as const,
    description: "Spend £100 and get 20% off your next order",
    spending_threshold: 100,
    spending_reward_type: "percentage" as const,
    spending_reward_value: 20,
    icon: Target
  },
  {
    name: "VIP Tiers",
    type: "tiered" as const,
    description: "Bronze, Silver, Gold tiers with increasing benefits",
    tier_thresholds: [0, 100, 500, 1000],
    tier_benefits: [
      { tier: "Bronze", benefits: ["5% discount"] },
      { tier: "Silver", benefits: ["10% discount", "Free delivery"] },
      { tier: "Gold", benefits: ["15% discount", "Free delivery", "Priority support"] }
    ],
    icon: Award
  }
];

// Preset campaign templates
const CAMPAIGN_PRESETS = [
  {
    name: "Double Points Weekend",
    type: "double_points" as const,
    description: "Earn 2x points on all purchases during weekends",
    multiplier: 2.0,
    days_of_week: [0, 6], // Sunday and Saturday
    icon: TrendingUp
  },
  {
    name: "Happy Hour",
    type: "happy_hour" as const,
    description: "20% off all orders between 3-5 PM",
    discount_percentage: 20,
    start_time: "15:00",
    end_time: "17:00",
    days_of_week: [1, 2, 3, 4, 5], // Weekdays
    icon: Sun
  },
  {
    name: "Birthday Special",
    type: "birthday" as const,
    description: "Free dessert on your birthday month",
    discount_percentage: 100,
    max_uses_per_customer: 1,
    icon: Cake
  },
  {
    name: "Refer a Friend",
    type: "referral" as const,
    description: "Get £5 off when you refer a friend who makes their first order",
    discount_amount: 5,
    bonus_points: 500,
    icon: UserPlus
  },
  {
    name: "Social Media Share",
    type: "social_media" as const,
    description: "Get 10% off when you share us on social media",
    discount_percentage: 10,
    max_uses_per_customer: 1,
    icon: Share2
  },
  {
    name: "First Time Customer",
    type: "first_visit" as const,
    description: "Welcome! Get 15% off your first order",
    discount_percentage: 15,
    max_uses_per_customer: 1,
    icon: Heart
  },
  {
    name: "Winter Special",
    type: "seasonal" as const,
    description: "Warm up with 25% off hot drinks this winter",
    discount_percentage: 25,
    icon: Snowflake
  },
  {
    name: "Summer Bonus",
    type: "seasonal" as const,
    description: "Beat the heat with triple points on cold beverages",
    multiplier: 3.0,
    bonus_points: 100,
    icon: Sun
  }
];

export const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({ restaurant }) => {
  const [programs, setPrograms] = useState<LoyaltyProgram[]>([]);
  const [campaigns, setCampaigns] = useState<LoyaltyCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProgramDialog, setShowProgramDialog] = useState(false);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<any>(null);
  const [selectedCampaignPreset, setSelectedCampaignPreset] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPrograms();
    fetchCampaigns();
  }, [restaurant.id]);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('loyalty_programs')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms((data || []) as LoyaltyProgram[]);
    } catch (error) {
      console.error('Error fetching loyalty programs:', error);
      toast({
        title: "Error",
        description: "Failed to load loyalty programs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('loyalty_campaigns')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns((data || []) as LoyaltyCampaign[]);
    } catch (error) {
      console.error('Error fetching loyalty campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to load loyalty campaigns",
        variant: "destructive",
      });
    }
  };

  const createProgramFromPreset = async (preset: any) => {
    try {
      const programData = {
        restaurant_id: restaurant.id,
        name: preset.name,
        description: preset.description,
        program_type: preset.type,
        is_active: true,
        points_per_dollar: preset.points_per_dollar || 1.0,
        dollar_value_per_point: preset.dollar_value_per_point || 0.01,
        visits_required: preset.visits_required,
        reward_after_visits: preset.reward_after_visits,
        spending_threshold: preset.spending_threshold,
        spending_reward_type: preset.spending_reward_type,
        spending_reward_value: preset.spending_reward_value,
        tier_thresholds: preset.tier_thresholds || [],
        tier_benefits: preset.tier_benefits || []
      };

      const { error } = await supabase
        .from('loyalty_programs')
        .insert([programData]);

      if (error) throw error;

      await fetchPrograms();
      setShowProgramDialog(false);
      setSelectedPreset(null);
      
      toast({
        title: "Success",
        description: `${preset.name} program created successfully!`,
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

  const createCampaignFromPreset = async (preset: any) => {
    try {
      const campaignData = {
        restaurant_id: restaurant.id,
        name: preset.name,
        description: preset.description,
        campaign_type: preset.type,
        multiplier: preset.multiplier || 1.0,
        bonus_points: preset.bonus_points || 0,
        bonus_visits: preset.bonus_visits || 0,
        discount_percentage: preset.discount_percentage,
        discount_amount: preset.discount_amount,
        start_date: new Date().toISOString().split('T')[0],
        days_of_week: preset.days_of_week || [0, 1, 2, 3, 4, 5, 6],
        start_time: preset.start_time,
        end_time: preset.end_time,
        max_uses_per_customer: preset.max_uses_per_customer,
        current_uses: 0,
        is_active: true
      };

      const { error } = await supabase
        .from('loyalty_campaigns')
        .insert([campaignData]);

      if (error) throw error;

      await fetchCampaigns();
      setShowCampaignDialog(false);
      setSelectedCampaignPreset(null);
      
      toast({
        title: "Success",
        description: `${preset.name} campaign created successfully!`,
      });
    } catch (error) {
      console.error('Error creating loyalty campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create loyalty campaign",
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

      await fetchPrograms();
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

  const toggleCampaignStatus = async (campaignId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('loyalty_campaigns')
        .update({ is_active: !currentStatus })
        .eq('id', campaignId);

      if (error) throw error;

      await fetchCampaigns();
      toast({
        title: "Success",
        description: `Campaign ${!currentStatus ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      console.error('Error updating campaign status:', error);
      toast({
        title: "Error",
        description: "Failed to update campaign status",
        variant: "destructive",
      });
    }
  };

  const getProgramTypeIcon = (type: string) => {
    switch (type) {
      case 'points': return <Star className="w-4 h-4" />;
      case 'visits': return <Coffee className="w-4 h-4" />;
      case 'spending': return <Target className="w-4 h-4" />;
      case 'tiered': return <Award className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const getCampaignTypeIcon = (type: string) => {
    switch (type) {
      case 'double_points': return <TrendingUp className="w-4 h-4" />;
      case 'happy_hour': return <Sun className="w-4 h-4" />;
      case 'birthday': return <Cake className="w-4 h-4" />;
      case 'referral': return <UserPlus className="w-4 h-4" />;
      case 'social_media': return <Share2 className="w-4 h-4" />;
      case 'first_visit': return <Heart className="w-4 h-4" />;
      case 'seasonal': return <Snowflake className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loyalty programs...</p>
        </div>
      </div>
    );
  }

  const activePrograms = programs.filter(p => p.is_active);
  const activeCampaigns = campaigns.filter(c => c.is_active);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Gift className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Loyalty Program</h1>
            <p className="text-gray-600">Engage customers with rewards and campaigns</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Gift className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Programs</p>
                <p className="text-2xl font-bold text-gray-900">{activePrograms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{activeCampaigns.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Enrolled Customers</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Points Redeemed</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="programs" className="flex items-center space-x-2">
            <Gift className="w-4 h-4" />
            <span>Programs</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Campaigns</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Loyalty Programs</h2>
            
            <Dialog open={showProgramDialog} onOpenChange={setShowProgramDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Program</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Choose a Loyalty Program Template</DialogTitle>
                  <DialogDescription>
                    Select from our pre-built templates to get started quickly
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {PROGRAM_PRESETS.map((preset, index) => {
                    const IconComponent = preset.icon;
                    return (
                      <Card 
                        key={index} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedPreset === preset ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedPreset(preset)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{preset.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{preset.description}</p>
                              <Badge className="mt-2" variant="secondary">
                                {preset.type}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowProgramDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => selectedPreset && createProgramFromPreset(selectedPreset)}
                    disabled={!selectedPreset}
                  >
                    Create Program
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.id} className={`${!program.is_active ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getProgramTypeIcon(program.program_type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{program.name}</h3>
                        <Badge variant="secondary">{program.program_type}</Badge>
                      </div>
                    </div>
                    <Switch
                      checked={program.is_active}
                      onCheckedChange={() => toggleProgramStatus(program.id, program.is_active)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">{program.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    {program.program_type === 'points' && (
                      <>
                        <p>Points per £: {program.points_per_dollar}</p>
                        <p>Point value: £{program.dollar_value_per_point}</p>
                      </>
                    )}
                    {program.program_type === 'visits' && (
                      <>
                        <p>Visits required: {program.visits_required}</p>
                        <p>Reward after: {program.reward_after_visits} visits</p>
                      </>
                    )}
                    {program.program_type === 'spending' && (
                      <>
                        <p>Threshold: £{program.spending_threshold}</p>
                        <p>Reward: {program.spending_reward_value}% off</p>
                      </>
                    )}
                  </div>

                  <div className="flex justify-between pt-3 border-t mt-3">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {programs.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No loyalty programs yet</h3>
                <p className="text-gray-500 mb-4">Create your first loyalty program to start engaging customers</p>
                <Button onClick={() => setShowProgramDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Program
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Marketing Campaigns</h2>
            
            <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Campaign</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Choose a Campaign Template</DialogTitle>
                  <DialogDescription>
                    Select from our proven campaign templates to boost customer engagement
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {CAMPAIGN_PRESETS.map((preset, index) => {
                    const IconComponent = preset.icon;
                    return (
                      <Card 
                        key={index} 
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedCampaignPreset === preset ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedCampaignPreset(preset)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{preset.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{preset.description}</p>
                              <Badge className="mt-2" variant="secondary">
                                {preset.type.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCampaignDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => selectedCampaignPreset && createCampaignFromPreset(selectedCampaignPreset)}
                    disabled={!selectedCampaignPreset}
                  >
                    Create Campaign
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className={`${!campaign.is_active ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getCampaignTypeIcon(campaign.campaign_type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <Badge variant="secondary">{campaign.campaign_type.replace('_', ' ')}</Badge>
                      </div>
                    </div>
                    <Switch
                      checked={campaign.is_active}
                      onCheckedChange={() => toggleCampaignStatus(campaign.id, campaign.is_active)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-3">{campaign.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <p>Start: {new Date(campaign.start_date).toLocaleDateString()}</p>
                    {campaign.end_date && (
                      <p>End: {new Date(campaign.end_date).toLocaleDateString()}</p>
                    )}
                    {campaign.discount_percentage && (
                      <p>Discount: {campaign.discount_percentage}% off</p>
                    )}
                    {campaign.discount_amount && (
                      <p>Discount: £{campaign.discount_amount} off</p>
                    )}
                    {campaign.bonus_points > 0 && (
                      <p>Bonus: {campaign.bonus_points} points</p>
                    )}
                    <p>Uses: {campaign.current_uses}/{campaign.max_total_uses || '∞'}</p>
                  </div>

                  <div className="flex justify-between pt-3 border-t mt-3">
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {campaigns.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
                <p className="text-gray-500 mb-4">Create marketing campaigns to drive customer engagement</p>
                <Button onClick={() => setShowCampaignDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
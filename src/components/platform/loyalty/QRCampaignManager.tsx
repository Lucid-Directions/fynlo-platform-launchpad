import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Eye, Copy, Download, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QRCampaign {
  id: string;
  name: string;
  description: string;
  campaign_type: string;
  qr_data: any;
  is_active: boolean;
  restaurant_id: string;
  program_id: string;
  created_at: string;
}

interface QRCampaignManagerProps {
  restaurants: Array<{ id: string; name: string }>;
  programs: Array<{ id: string; name: string; restaurant_id: string }>;
}

const QR_CAMPAIGN_TEMPLATES = [
  // 1. Print QR codes on receipts with "Scan for a free coffee!" to drive instant signups
  {
    id: 'receipt_free_coffee',
    name: 'Receipt Free Coffee',
    description: 'Print QR on receipts with "Scan for a free coffee!" to drive instant signups',
    type: 'receipt_signup',
    placement: 'receipt',
    defaultReward: { type: 'free_item', value: 'coffee', message: 'Scan for a free coffee!' }
  },
  
  // 2. Offer a one-time discount (like 10% off) for scanning and joining the loyalty program
  {
    id: 'signup_discount',
    name: 'One-Time Signup Discount',
    description: 'Offer 10% off for scanning and joining the loyalty program',
    type: 'signup_discount',
    placement: 'any',
    defaultReward: { type: 'percentage', value: 10, oneTime: true }
  },
  
  // 3. Add QR codes to table tents with "Unlock a surprise reward!" to grab attention
  {
    id: 'table_tent_surprise',
    name: 'Table Tent Surprise',
    description: 'QR codes on table tents with "Unlock a surprise reward!" to grab attention',
    type: 'surprise_reward',
    placement: 'table_tent',
    defaultReward: { type: 'mystery', options: ['free_appetizer', 'free_drink', '15_percent_off'], message: 'Unlock a surprise reward!' }
  },
  
  // 4. Use a digital loyalty card customers add to Apple or Google Wallet via QR scan
  {
    id: 'digital_wallet_card',
    name: 'Digital Wallet Loyalty Card',
    description: 'Digital loyalty card for Apple/Google Wallet via QR scan',
    type: 'digital_wallet',
    placement: 'any',
    defaultReward: { type: 'wallet_integration', platforms: ['apple_wallet', 'google_pay'], points: 100 }
  },
  
  // 5. Link QR scans to a gamified wheel-spin for random rewards
  {
    id: 'wheel_spin_game',
    name: 'Gamified Wheel Spin',
    description: 'QR scans trigger a wheel-spin game for random rewards',
    type: 'gamification',
    placement: 'any',
    defaultReward: { type: 'wheel_spin', prizes: ['free_side', 'double_points', '20_percent_off', 'free_dessert', 'free_drink'] }
  },
  
  // 6. Place QR codes on menus with "Join our loyalty club for exclusive deals!"
  {
    id: 'menu_exclusive_deals',
    name: 'Menu Exclusive Deals',
    description: 'QR codes on menus with "Join our loyalty club for exclusive deals!"',
    type: 'exclusive_membership',
    placement: 'menu',
    defaultReward: { type: 'membership_perks', benefits: ['exclusive_deals', 'early_access', 'member_pricing'] }
  },
  
  // 7. Offer double points for the first purchase after scanning to join
  {
    id: 'double_points_first_purchase',
    name: 'First Purchase Double Points',
    description: 'Double points for the first purchase after scanning to join',
    type: 'first_purchase_bonus',
    placement: 'any',
    defaultReward: { type: 'points_multiplier', value: 2, oneTime: true, duration: '7_days' }
  },
  
  // 8. Integrate QR scans with partnered payment processor to link purchase data
  {
    id: 'payment_integration',
    name: 'Payment Processor Integration',
    description: 'QR scans integrate with payment processor to link purchase data',
    type: 'payment_integration',
    placement: 'pos_system',
    defaultReward: { type: 'automatic_points', integration: 'stripe', points_per_dollar: 1 }
  },
  
  // 9. Display QR codes on takeout bags with "Scan to earn points on your next order!"
  {
    id: 'takeout_next_order_points',
    name: 'Takeout Next Order Points',
    description: 'QR on takeout bags: "Scan to earn points on your next order!"',
    type: 'next_order_incentive',
    placement: 'takeout_bag',
    defaultReward: { type: 'future_points', value: 50, message: 'Scan to earn points on your next order!' }
  },
  
  // 10. Create a "Loyalty Starter" campaign—first QR scan gives 100 bonus points
  {
    id: 'loyalty_starter_100',
    name: 'Loyalty Starter 100',
    description: 'First QR scan gives 100 bonus points as loyalty starter',
    type: 'starter_bonus',
    placement: 'any',
    defaultReward: { type: 'points', value: 100, firstScanOnly: true }
  },
  
  // 11. Use QR codes at the counter with "Scan to enter a weekly prize draw!"
  {
    id: 'weekly_prize_draw',
    name: 'Weekly Prize Draw',
    description: 'Counter QR codes: "Scan to enter a weekly prize draw!"',
    type: 'prize_draw',
    placement: 'counter',
    defaultReward: { type: 'contest_entry', frequency: 'weekly', prizes: ['free_meal', 'gift_card', 'merchandise'] }
  },
  
  // 12. Tie QR scans to multi-venue promos like "Visit our sister restaurant for 20% off!"
  {
    id: 'sister_restaurant_promo',
    name: 'Sister Restaurant Promo',
    description: 'Multi-venue QR: "Visit our sister restaurant for 20% off!"',
    type: 'cross_venue_promotion',
    placement: 'any',
    defaultReward: { type: 'cross_promotion', discount: 20, venues: 'sister_restaurants' }
  },
  
  // 13. Offer a free menu item after three QR-linked purchases
  {
    id: 'three_purchase_free_item',
    name: 'Three Purchase Free Item',
    description: 'Free menu item after three QR-linked purchases',
    type: 'purchase_milestone',
    placement: 'any',
    defaultReward: { type: 'milestone_reward', purchases_required: 3, reward: 'free_menu_item' }
  },
  
  // 14. Place QR codes on in-store signage with "Join now for a free dessert!"
  {
    id: 'signage_free_dessert',
    name: 'In-Store Signage Free Dessert',
    description: 'In-store signage QR: "Join now for a free dessert!"',
    type: 'signage_promotion',
    placement: 'in_store_signage',
    defaultReward: { type: 'free_item', value: 'dessert', message: 'Join now for a free dessert!' }
  },
  
  // 15. Link QR scans to a tiered loyalty system—higher tiers unlock bigger rewards
  {
    id: 'tiered_loyalty_system',
    name: 'Tiered Loyalty System',
    description: 'QR scans linked to tiered system—higher tiers unlock bigger rewards',
    type: 'tier_progression',
    placement: 'any',
    defaultReward: { type: 'tier_benefits', tiers: ['bronze', 'silver', 'gold', 'platinum'], escalating_rewards: true }
  },
  
  // 16. Enable QR-based check-ins at the restaurant to earn points without a purchase
  {
    id: 'checkin_no_purchase',
    name: 'Check-in Without Purchase',
    description: 'QR-based check-ins earn points without requiring a purchase',
    type: 'location_checkin',
    placement: 'entrance',
    defaultReward: { type: 'checkin_points', value: 25, no_purchase_required: true }
  },
  
  // 17. Offer a "bring a friend" bonus—scan QR to refer someone for shared rewards
  {
    id: 'bring_friend_shared_rewards',
    name: 'Bring a Friend Shared Rewards',
    description: 'Scan QR to refer someone—both get shared rewards',
    type: 'referral_program',
    placement: 'any',
    defaultReward: { type: 'shared_reward', referrer_points: 75, referee_points: 75 }
  },
  
  // 18. Use QR codes for limited-time campaigns like "Scan for a seasonal taco discount!"
  {
    id: 'seasonal_taco_discount',
    name: 'Seasonal Taco Discount',
    description: 'Limited-time QR: "Scan for a seasonal taco discount!"',
    type: 'seasonal_campaign',
    placement: 'any',
    defaultReward: { type: 'seasonal_discount', item: 'tacos', discount: 25, time_limited: true }
  },
  
  // 19. Add QR codes to emailed receipts from any payment system for post-purchase signup
  {
    id: 'email_receipt_signup',
    name: 'Email Receipt Signup',
    description: 'QR codes in emailed receipts for post-purchase signup',
    type: 'post_purchase_signup',
    placement: 'email_receipt',
    defaultReward: { type: 'retroactive_points', value: 50, for_current_purchase: true }
  },
  
  // 20. Create a loyalty app homepage with a QR scanner for in-store deals
  {
    id: 'app_scanner_deals',
    name: 'App QR Scanner Deals',
    description: 'Loyalty app homepage QR scanner for exclusive in-store deals',
    type: 'app_integration',
    placement: 'mobile_app',
    defaultReward: { type: 'app_exclusive_deals', scanner_required: true, deals: ['daily_specials', 'flash_sales'] }
  },
  
  // 21. Offer a "mystery reward" for scanning, revealed after signup
  {
    id: 'mystery_post_signup',
    name: 'Mystery Reward Post-Signup',
    description: 'Mystery reward for scanning, revealed after completing signup',
    type: 'mystery_signup',
    placement: 'any',
    defaultReward: { type: 'mystery_reveal', options: ['free_drink', 'free_appetizer', '20_percent_off'], reveal_after_signup: true }
  },
  
  // 22. Place QR codes on to-go cups with "Scan to join and get 10% off next time!"
  {
    id: 'cup_next_visit_discount',
    name: 'To-Go Cup Next Visit Discount',
    description: 'QR on cups: "Scan to join and get 10% off next time!"',
    type: 'next_visit_incentive',
    placement: 'to_go_cup',
    defaultReward: { type: 'next_visit_discount', discount: 10, expires_in: '30_days' }
  },
  
  // 23. Link QR scans to a points-per-visit system, not tied to purchases
  {
    id: 'visit_based_points',
    name: 'Visit-Based Points System',
    description: 'QR scans earn points per visit, not tied to purchase amounts',
    type: 'visit_rewards',
    placement: 'any',
    defaultReward: { type: 'visit_points', points_per_visit: 30, purchase_independent: true }
  },
  
  // 24. Use QR codes to unlock exclusive menu items only for loyalty members
  {
    id: 'exclusive_menu_items',
    name: 'Member Exclusive Menu Items',
    description: 'QR codes unlock exclusive menu items only for loyalty members',
    type: 'exclusive_menu',
    placement: 'menu',
    defaultReward: { type: 'menu_access', exclusive_items: ['secret_burger', 'member_special', 'chef_choice'] }
  },
  
  // 25. Offer a birthday reward—scan QR to input birthdate for a freebie
  {
    id: 'birthday_freebie_input',
    name: 'Birthday Freebie Setup',
    description: 'Scan QR to input birthdate and set up birthday freebie',
    type: 'birthday_setup',
    placement: 'any',
    defaultReward: { type: 'birthday_program', setup_reward: 'free_appetizer', birthday_reward: 'free_entree' }
  },
  
  // 26. Create QR-linked social media challenges like "Share and scan for bonus points!"
  {
    id: 'social_media_challenge',
    name: 'Social Media Challenge',
    description: 'QR-linked social challenges: "Share and scan for bonus points!"',
    type: 'social_engagement',
    placement: 'any',
    defaultReward: { type: 'social_points', share_bonus: 50, platforms: ['instagram', 'facebook', 'tiktok'] }
  },
  
  // 27. Place QR codes on loyalty-branded napkins with "Join the taco club now!"
  {
    id: 'napkin_taco_club',
    name: 'Napkin Taco Club',
    description: 'QR on loyalty-branded napkins: "Join the taco club now!"',
    type: 'branded_napkin_promo',
    placement: 'napkin',
    defaultReward: { type: 'club_membership', club: 'taco_club', benefits: ['exclusive_tacos', 'taco_tuesday_deals'] }
  },
  
  // 28. Offer a "first scan" reward tied to multi-venue deal like "Try our new location!"
  {
    id: 'first_scan_new_location',
    name: 'First Scan New Location',
    description: 'First scan reward tied to multi-venue: "Try our new location!"',
    type: 'location_promotion',
    placement: 'any',
    defaultReward: { type: 'location_incentive', new_location_discount: 25, first_scan_bonus: 100 }
  },
  
  // 29. Link QR scans to a referral program—existing members get points for new signups
  {
    id: 'member_referral_points',
    name: 'Member Referral Points',
    description: 'Existing members get points when their QR referrals sign up new people',
    type: 'member_referral_system',
    placement: 'any',
    defaultReward: { type: 'referral_points', existing_member_bonus: 100, new_member_bonus: 50 }
  },
  
  // 30. Use QR codes at events or pop-ups with "Scan for a limited-time offer!"
  {
    id: 'event_limited_offer',
    name: 'Event Limited-Time Offer',
    description: 'QR at events/pop-ups: "Scan for a limited-time offer!"',
    type: 'event_promotion',
    placement: 'event_popup',
    defaultReward: { type: 'event_exclusive', discount: 30, time_limited: true, event_only: true }
  },
  
  // 31. Enable QR-based feedback surveys that reward loyalty points upon completion
  {
    id: 'feedback_survey_points',
    name: 'Feedback Survey Points',
    description: 'QR-based feedback surveys reward loyalty points upon completion',
    type: 'survey_rewards',
    placement: 'any',
    defaultReward: { type: 'survey_points', points_for_completion: 40, survey_types: ['experience', 'food_quality', 'service'] }
  },
  
  // 32. Offer a "family plan" loyalty tier—scan QR to link multiple accounts for shared points
  {
    id: 'family_plan_shared_points',
    name: 'Family Plan Shared Points',
    description: 'Family loyalty tier—QR links multiple accounts for shared points',
    type: 'family_program',
    placement: 'any',
    defaultReward: { type: 'family_tier', shared_points: true, max_accounts: 6, family_bonuses: true }
  },
  
  // 33. Place QR codes on packaging with "Scan to unlock a secret menu item!"
  {
    id: 'packaging_secret_menu',
    name: 'Packaging Secret Menu',
    description: 'QR on packaging: "Scan to unlock a secret menu item!"',
    type: 'secret_menu_unlock',
    placement: 'packaging',
    defaultReward: { type: 'secret_access', secret_items: ['hidden_burger', 'chef_special', 'off_menu_dessert'] }
  },
  
  // 34. Tie QR scans to a "streak" system—consecutive scans increase rewards
  {
    id: 'consecutive_scan_streak',
    name: 'Consecutive Scan Streak',
    description: 'Streak system where consecutive QR scans increase reward multipliers',
    type: 'streak_multiplier',
    placement: 'any',
    defaultReward: { type: 'streak_rewards', day_1: 25, day_3: 50, day_7: 100, day_14: 200, multiplier_increase: true }
  }
];

export function QRCampaignManager({ restaurants, programs }: QRCampaignManagerProps) {
  const [campaigns, setCampaigns] = useState<QRCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    restaurant_id: '',
    program_id: '',
    campaign_type: '',
    reward: { type: 'points', value: 100 },
    placement: 'receipt',
    expiry_date: '',
    max_uses: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('*')
        .eq('setting_key', 'qr_campaigns');

      if (error) throw error;

      const campaignsData = (data?.[0]?.setting_value as any)?.campaigns || [];
      setCampaigns(campaignsData);
    } catch (error) {
      console.error('Error fetching QR campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to load QR campaigns",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async () => {
    try {
      const campaignData = {
        id: crypto.randomUUID(),
        ...formData,
        qr_data: {
          url: `${window.location.origin}/loyalty/scan?campaign=${crypto.randomUUID()}`,
          template: selectedTemplate,
          reward: formData.reward,
          placement: formData.placement
        },
        is_active: true,
        created_at: new Date().toISOString()
      };

      const { data: existing } = await supabase
        .from('platform_settings')
        .select('setting_value')
        .eq('setting_key', 'qr_campaigns')
        .single();

      const currentCampaigns = (existing?.setting_value as any)?.campaigns || [];
      const updatedCampaigns = [...currentCampaigns, campaignData];

      const { error } = await supabase
        .from('platform_settings')
        .upsert({
          setting_key: 'qr_campaigns',
          setting_value: { campaigns: updatedCampaigns }
        });

      if (error) throw error;

      await fetchCampaigns();
      setShowCreateDialog(false);
      resetForm();
      
      toast({
        title: "Success",
        description: "QR campaign created successfully",
      });
    } catch (error) {
      console.error('Error creating QR campaign:', error);
      toast({
        title: "Error",
        description: "Failed to create QR campaign",
        variant: "destructive",
      });
    }
  };

  const generateQRCode = (campaign: QRCampaign) => {
    const qrData = encodeURIComponent(JSON.stringify({
      campaignId: campaign.id,
      type: campaign.campaign_type,
      restaurantId: campaign.restaurant_id,
      programId: campaign.program_id
    }));
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;
  };

  const copyQRUrl = (campaign: QRCampaign) => {
    navigator.clipboard.writeText(campaign.qr_data.url);
    toast({
      title: "Copied",
      description: "QR code URL copied to clipboard",
    });
  };

  const downloadQR = (campaign: QRCampaign) => {
    const qrUrl = generateQRCode(campaign);
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qr-${campaign.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.click();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      restaurant_id: '',
      program_id: '',
      campaign_type: '',
      reward: { type: 'points', value: 100 },
      placement: 'receipt',
      expiry_date: '',
      max_uses: ''
    });
    setSelectedTemplate(null);
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      name: template.name,
      description: template.description,
      campaign_type: template.type,
      reward: template.defaultReward
    }));
  };

  const filteredPrograms = programs.filter(p => p.restaurant_id === formData.restaurant_id);

  if (loading) {
    return <div className="p-6">Loading QR campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">QR Code Campaigns</h2>
          <p className="text-muted-foreground">Create and manage QR code loyalty campaigns</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create QR Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create QR Campaign</DialogTitle>
              <DialogDescription>
                Set up a new QR code campaign to engage customers
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="template" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="template">Choose Template</TabsTrigger>
                <TabsTrigger value="configure">Configure</TabsTrigger>
              </TabsList>
              
              <TabsContent value="template" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {QR_CAMPAIGN_TEMPLATES.map((template) => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer border-2 transition-colors ${
                        selectedTemplate?.id === template.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <Badge variant="secondary" className="mt-2">
                          {template.type}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="configure" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter campaign name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant">Restaurant</Label>
                    <Select 
                      value={formData.restaurant_id} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, restaurant_id: value, program_id: '' }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select restaurant" />
                      </SelectTrigger>
                      <SelectContent>
                        {restaurants.map((restaurant) => (
                          <SelectItem key={restaurant.id} value={restaurant.id}>
                            {restaurant.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">Loyalty Program</Label>
                    <Select 
                      value={formData.program_id} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, program_id: value }))}
                      disabled={!formData.restaurant_id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredPrograms.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="placement">QR Placement</Label>
                    <Select 
                      value={formData.placement} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, placement: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receipt">Receipt</SelectItem>
                        <SelectItem value="table_tent">Table Tent</SelectItem>
                        <SelectItem value="menu">Menu</SelectItem>
                        <SelectItem value="takeout_bag">Takeout Bag</SelectItem>
                        <SelectItem value="counter">Counter Display</SelectItem>
                        <SelectItem value="cup">To-Go Cup</SelectItem>
                        <SelectItem value="napkin">Napkin</SelectItem>
                        <SelectItem value="packaging">Packaging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the campaign"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={createCampaign}
                    disabled={!formData.name || !formData.restaurant_id || !formData.program_id}
                  >
                    Create Campaign
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <CardDescription>{campaign.description}</CardDescription>
                </div>
                <Badge variant={campaign.is_active ? "default" : "secondary"}>
                  {campaign.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <img 
                  src={generateQRCode(campaign)} 
                  alt="QR Code" 
                  className="w-32 h-32 border rounded"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => copyQRUrl(campaign)}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy URL
                </Button>
                <Button variant="outline" size="sm" onClick={() => downloadQR(campaign)}>
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>

              <div className="text-sm space-y-1">
                <p><strong>Type:</strong> {campaign.campaign_type}</p>
                <p><strong>Restaurant:</strong> {restaurants.find(r => r.id === campaign.restaurant_id)?.name}</p>
                <p><strong>Created:</strong> {new Date(campaign.created_at).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {campaigns.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No QR Campaigns</CardTitle>
            <CardDescription>
              Create your first QR code campaign to start engaging customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowCreateDialog(true)}>
              <QrCode className="w-4 h-4 mr-2" />
              Create Your First QR Campaign
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
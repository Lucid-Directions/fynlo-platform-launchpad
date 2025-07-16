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
  {
    id: 'signup_bonus',
    name: 'Signup Bonus',
    description: 'Scan QR to join loyalty program and get instant reward',
    type: 'signup',
    defaultReward: { type: 'points', value: 100 }
  },
  {
    id: 'instant_discount',
    name: 'Instant Discount',
    description: 'Scan for immediate discount on current order',
    type: 'discount',
    defaultReward: { type: 'percentage', value: 10 }
  },
  {
    id: 'mystery_reward',
    name: 'Mystery Reward',
    description: 'Scan to reveal a surprise reward',
    type: 'mystery',
    defaultReward: { type: 'random', options: ['free_drink', 'free_side', '15_percent_off'] }
  },
  {
    id: 'check_in_points',
    name: 'Check-in Points',
    description: 'Earn points for visiting without purchase',
    type: 'checkin',
    defaultReward: { type: 'points', value: 25 }
  },
  {
    id: 'referral_bonus',
    name: 'Bring a Friend',
    description: 'Refer friends and both get rewards',
    type: 'referral',
    defaultReward: { type: 'points', value: 50 }
  },
  {
    id: 'birthday_reward',
    name: 'Birthday Special',
    description: 'Birthday month exclusive reward',
    type: 'birthday',
    defaultReward: { type: 'free_item', value: 'dessert' }
  },
  {
    id: 'multi_venue',
    name: 'Multi-Venue Promo',
    description: 'Visit partner locations for bonus rewards',
    type: 'cross_venue',
    defaultReward: { type: 'percentage', value: 20 }
  },
  {
    id: 'streak_bonus',
    name: 'Visit Streak',
    description: 'Consecutive visit rewards',
    type: 'streak',
    defaultReward: { type: 'multiplier', value: 2 }
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
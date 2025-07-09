import React from 'react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DashboardSettings = () => {
  const { getSubscriptionPlan, isPlatformOwner, fynloUserData } = useFeatureAccess();
  const { toast } = useToast();
  const currentPlan = getSubscriptionPlan();

  const handleUpgrade = (targetPlan: 'beta' | 'omega') => {
    // For demo purposes, simulate upgrade without payment
    toast({
      title: "Demo Mode",
      description: `This would normally redirect to Stripe checkout for ${targetPlan} plan. In demo mode, we'll simulate the upgrade.`,
    });
    
    // In a real implementation, this would:
    // 1. Create Stripe checkout session
    // 2. Redirect to Stripe
    // 3. Handle success/cancel callbacks
    console.log(`Would upgrade to ${targetPlan} plan`);
  };

  const plans = [
    {
      id: 'alpha',
      name: 'Alpha',
      price: 'Free',
      description: 'Basic features for getting started',
      features: ['Basic dashboard', 'Up to 5 orders/day', 'Email support'],
      current: currentPlan === 'alpha',
      icon: Zap,
      color: 'bg-gray-100 text-gray-800'
    },
    {
      id: 'beta',
      name: 'Beta',
      price: '£59.99/month',
      description: 'Advanced features for growing businesses',
      features: ['Advanced analytics', 'Unlimited orders', 'Staff management', 'Inventory tracking', 'Priority support'],
      current: currentPlan === 'beta',
      icon: Crown,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'omega',
      name: 'Omega',
      price: '£99.99/month',
      description: 'Full feature access for enterprise',
      features: ['Everything in Beta', 'Multi-location management', 'Custom integrations', 'API access', 'White-label options', '24/7 phone support'],
      current: currentPlan === 'omega',
      icon: Crown,
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your subscription and account preferences</p>
      </div>

      {/* Current Plan Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Badge className={plans.find(p => p.id === currentPlan)?.color}>
              {plans.find(p => p.id === currentPlan)?.name} Plan
            </Badge>
            {isPlatformOwner() && (
              <Badge variant="outline">Platform Owner</Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {plans.find(p => p.id === currentPlan)?.description}
          </p>
        </CardContent>
      </Card>

      {/* Subscription Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card key={plan.id} className={`relative ${plan.current ? 'ring-2 ring-primary' : ''}`}>
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Current Plan</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{plan.price}</div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {!plan.current && plan.id !== 'alpha' && (
                    <Button 
                      className="w-full"
                      onClick={() => handleUpgrade(plan.id as 'beta' | 'omega')}
                    >
                      Upgrade to {plan.name}
                    </Button>
                  )}
                  
                  {plan.current && (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Demo Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-yellow-800">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-800">Demo Mode</h3>
              <p className="text-sm text-yellow-700 mt-1">
                This is a demonstration. In a real implementation, upgrade buttons would redirect to Stripe checkout. 
                For testing, you can manually change the subscription level in the user data or implement a demo toggle.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
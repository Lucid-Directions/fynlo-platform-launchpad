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
      name: 'α Alpha',
      symbol: 'α',
      price: 'Free',
      fee: '1% transaction fee',
      description: 'Essential features for new restaurants',
      features: ['Basic POS system', 'Up to 100 orders/month', 'Email support', 'Basic reporting'],
      current: currentPlan === 'alpha',
      gradient: 'from-gray-100 to-gray-200',
      textColor: 'text-gray-700',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'beta',
      name: 'β Beta',
      symbol: 'β',
      price: '£39/month',
      fee: '1% transaction fee',
      description: 'Advanced features for growing restaurants',
      features: ['Everything in Alpha', 'Unlimited orders', 'Staff management', 'Inventory tracking', 'Advanced analytics', 'Priority support'],
      current: currentPlan === 'beta',
      gradient: 'from-brand-orange/20 to-brand-orange/10',
      textColor: 'text-brand-orange',
      bgColor: 'bg-brand-orange/5'
    },
    {
      id: 'omega',
      name: 'Ω Omega',
      symbol: 'Ω',
      price: '£99/month',
      fee: '1% transaction fee',
      description: 'Complete platform control for enterprise',
      features: ['Everything in Beta', 'Multi-location management', 'Custom integrations', 'API access', 'White-label options', 'Platform ownership', '24/7 phone support'],
      current: currentPlan === 'omega',
      gradient: 'from-brand-black/20 to-brand-black/10',
      textColor: 'text-brand-black',
      bgColor: 'bg-brand-black/5'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-orange to-brand-black bg-clip-text text-transparent">
          Fynlo Settings
        </h1>
        <p className="text-muted-foreground">Manage your subscription and account preferences</p>
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
            <Badge className="bg-brand-orange text-white">
              {plans.find(p => p.id === currentPlan)?.name} Plan
            </Badge>
            {isPlatformOwner() && (
              <Badge variant="outline" className="border-brand-black text-brand-black">
                Platform Owner
              </Badge>
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
            return (
              <Card key={plan.id} className={`relative overflow-hidden ${plan.current ? 'ring-2 ring-brand-orange' : ''} ${plan.bgColor}`}>
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-brand-orange text-white">Current Plan</Badge>
                  </div>
                )}
                
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50`} />
                
                <CardHeader className="text-center relative z-10">
                  {/* Greek symbol */}
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${plan.gradient} border-2 border-white shadow-lg`}>
                    <span className={`text-2xl font-bold ${plan.textColor}`}>
                      {plan.symbol}
                    </span>
                  </div>
                  <CardTitle className={`text-xl ${plan.textColor}`}>{plan.name}</CardTitle>
                  <div className="space-y-1">
                    <div className={`text-3xl font-bold ${plan.textColor}`}>{plan.price}</div>
                    <div className="text-sm text-muted-foreground">{plan.fee}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-brand-orange mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {!plan.current && plan.id !== 'alpha' && (
                    <Button 
                      className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white border-0"
                      onClick={() => handleUpgrade(plan.id as 'beta' | 'omega')}
                    >
                      Upgrade to {plan.name.split(' ')[1]}
                    </Button>
                  )}
                  
                  {plan.current && (
                    <Button variant="outline" className={`w-full border-2 ${plan.textColor} bg-white/50`} disabled>
                      Current Plan
                    </Button>
                  )}
                  
                  {plan.id === 'alpha' && !plan.current && (
                    <Button variant="outline" className="w-full" disabled>
                      Free Plan
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
import React, { useState } from 'react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DashboardSettings = () => {
  const { getSubscriptionPlan, isPlatformOwner } = useFeatureAccess();
  const { toast } = useToast();
  const currentPlan = getSubscriptionPlan();
  const [selectedPlan, setSelectedPlan] = useState<'alpha' | 'beta' | 'omega'>(currentPlan);

  const handleUpgrade = (targetPlan: 'beta' | 'omega') => {
    toast({
      title: "Demo Mode",
      description: `This would normally redirect to Stripe checkout for ${targetPlan} plan. In demo mode, we'll simulate the upgrade.`,
    });
    console.log(`Would upgrade to ${targetPlan} plan`);
  };

  const handlePlanClick = (planKey: 'alpha' | 'beta' | 'omega') => {
    setSelectedPlan(planKey);
  };

  const pricingPlans = [
    {
      name: "Alpha",
      symbol: "α",
      price: "£0",
      period: "per month + 1%",
      description: "Perfect for new restaurants & food trucks",
      features: [
        "All transactions at 1% (paid by customer)",
        "Up to 500 transactions/month",
        "Basic POS functions",
        "Digital receipts",
        "QR code ordering",
        "Single location",
        "Single user account",
        "Email support",
        "Basic sales reports"
      ],
      highlighted: false,
      buttonText: "Get Started Free",
      planKey: 'alpha' as const
    },
    {
      name: "Beta",
      symbol: "β", 
      price: "£49",
      period: "per month + 1%",
      description: "For growing restaurants (Competitors: £69-89/month)",
      features: [
        "All transactions at 1% (paid by customer)",
        "Unlimited transactions",
        "Everything in Alpha PLUS:",
        "Full kitchen display system",
        "Station-based order routing",
        "Up to 5 staff accounts",
        "Staff scheduling & time tracking",
        "Inventory management with alerts",
        "Xero accounting integration",
        "Real-time analytics",
        "Waste tracking",
        "Priority email & chat support",
        "2 locations included"
      ],
      highlighted: true,
      buttonText: "Most Popular",
      planKey: 'beta' as const
    },
    {
      name: "Omega",
      symbol: "Ω",
      price: "£119",
      period: "per month + 1%",
      description: "For restaurant groups & franchises (Competitors: £165-399/month)",
      features: [
        "All transactions at 1% (paid by customer)",
        "Unlimited everything",
        "Everything in Beta PLUS:",
        "Unlimited staff accounts",
        "Unlimited locations",
        "White-label options",
        "Advanced analytics & forecasting",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Staff performance analytics",
        "Payroll integration",
        "Bulk menu management",
        "Custom training"
      ],
      highlighted: false,
      buttonText: "Contact Sales",
      planKey: 'omega' as const
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-orange-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/lovable-uploads/ae344ce5-1c9f-41c8-b990-94ddff083a5a.png" 
              alt="Fynlo Logo" 
              className="h-16 w-auto"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-brand-black">Settings</h1>
          </div>
          <Badge variant="secondary" className="mb-4 bg-orange-100 text-brand-orange">Subscription Management</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-6">
            Choose the plan that's right
            <span className="block text-brand-orange mt-2">
              for your business
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto leading-relaxed">
            Industry-leading 1% transaction fee across all tiers. No hidden costs, no setup fees. 
            Start free or choose a plan that grows with your business.
          </p>
        </div>

        {/* Current Plan Status */}
        <div className="text-center mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-brand-orange" />
            <h3 className="text-2xl font-bold text-brand-black">Current Plan</h3>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge className="bg-brand-orange text-white">
              {pricingPlans.find(p => p.planKey === currentPlan)?.name} Plan
            </Badge>
            {isPlatformOwner() && (
              <Badge variant="outline" className="border-brand-black text-brand-black">
                Platform Owner
              </Badge>
            )}
          </div>
          <p className="text-lg text-brand-gray">
            {pricingPlans.find(p => p.planKey === currentPlan)?.description}
          </p>
        </div>

        {/* Competitive Advantage Highlight */}
        <div className="text-center mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-bold text-brand-black mb-4">Industry-Leading Transaction Rates</h3>
          <p className="text-lg text-brand-gray mb-4">
            Just 1% transaction fee across all tiers - while competitors charge 2.9%+
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
              <span className="text-brand-black font-semibold">Fynlo: 1%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-brand-gray">Competitors: 2.9%+</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards - Exact copy from pricing page */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group ${
                currentPlan === plan.planKey
                  ? 'ring-4 ring-brand-orange shadow-xl' 
                  : plan.highlighted 
                    ? 'ring-2 ring-brand-orange shadow-xl' 
                    : 'hover:shadow-lg hover:ring-2 hover:ring-orange-300'
              }`}
              onClick={() => handlePlanClick(plan.planKey)}
            >
              {currentPlan === plan.planKey && (
                <div className="absolute top-0 right-0 px-3 py-1 text-sm font-semibold bg-brand-orange text-white">
                  Current Plan
                </div>
              )}
              
              {plan.highlighted && currentPlan !== plan.planKey && (
                <div className="absolute top-0 right-0 px-3 py-1 text-sm font-semibold bg-brand-orange text-white">
                  Most Popular
                </div>
              )}

              {plan.planKey === 'alpha' && (
                <div className="absolute top-0 left-0 px-3 py-1 text-sm font-semibold bg-green-500 text-white">
                  🆓 FREE
                </div>
              )}

              {plan.planKey === 'omega' && (
                <div className="absolute top-0 left-0 px-3 py-1 text-sm font-semibold bg-purple-600 text-white">
                  🚀 ENTERPRISE
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  {/* Symbol in Box - matching brand theme */}
                  <div className={`text-6xl font-bold mb-4 transition-all duration-300 border-2 border-gray-300 rounded-lg w-24 h-24 flex items-center justify-center mx-auto ${
                    currentPlan === plan.planKey 
                      ? 'scale-110 text-brand-orange border-brand-orange' 
                      : 'group-hover:scale-110 text-brand-black group-hover:border-brand-orange'
                  } ${plan.planKey === 'beta' ? 'text-5xl' : ''}`}>
                    {plan.symbol}
                  </div>
                  
                  {/* Plan Name with brand styling */}
                  <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                    currentPlan === plan.planKey 
                      ? 'text-brand-black' 
                      : 'text-brand-black group-hover:text-brand-orange'
                  }`}>
                    <span className="text-brand-black">{plan.name.slice(0, -1)}</span><span className="text-brand-orange">{plan.name.slice(-1)}</span>
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-lg mb-4 transition-colors duration-300 ${
                    currentPlan === plan.planKey 
                      ? 'text-brand-gray' 
                      : 'text-brand-gray group-hover:text-brand-black'
                  }`}>
                    {plan.description}
                  </p>
                  
                  {/* Price */}
                  <div className="text-4xl font-bold text-brand-black mb-2">
                    {plan.price}
                    <span className="text-lg font-normal text-brand-gray">/{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 max-h-80 overflow-y-auto">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className={`text-brand-gray ${feature.includes('PLUS:') ? 'font-semibold text-brand-black' : ''}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {currentPlan !== plan.planKey && plan.planKey !== 'alpha' && (
                  <Button 
                    size="lg" 
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white transition-all duration-300"
                    onClick={() => handleUpgrade(plan.planKey as 'beta' | 'omega')}
                  >
                    Upgrade to {plan.name}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                )}

                {currentPlan === plan.planKey && (
                  <Button 
                    size="lg" 
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white shadow-lg"
                    disabled
                  >
                    Current Plan
                  </Button>
                )}

                {plan.planKey === 'alpha' && currentPlan !== plan.planKey && (
                  <Button 
                    size="lg" 
                    className="w-full bg-brand-black hover:bg-gray-800 text-white"
                  >
                    {plan.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-brand-black mb-4">All plans include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-brand-gray">
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span>No monthly minimums</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
            <p className="text-brand-black font-semibold">
              💰 Save thousands compared to competitors charging 2.9%+ transaction fees
            </p>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="flex items-start justify-center gap-3">
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
        </div>
      </div>
    </div>
  );
};
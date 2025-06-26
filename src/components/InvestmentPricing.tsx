
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export const InvestmentPricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('beta'); // Default to beta (most popular)

  const pricingPlans = [
    {
      name: "Alpha",
      symbol: "α",
      price: "2%",
      period: "per transaction",
      description: "Perfect for small businesses getting started",
      features: [
        "Employee Management",
        "QR Scanner for inventory",
        "Basic Reports",
        "No hardware required",
        "Email support",
        "No monthly fees - pay as you go"
      ],
      highlighted: false,
      buttonText: "Get Started",
      planKey: 'alpha'
    },
    {
      name: "Beta",
      symbol: "β", 
      price: "£19",
      period: "per month + 1.8%",
      description: "Complete business solution for growing operations",
      features: [
        "Everything in Alpha",
        "Advanced Inventory management",
        "Employee Scheduling system", 
        "Advanced Reports & analytics",
        "Priority support",
        "1.8% transaction fee"
      ],
      highlighted: true,
      buttonText: "Most Popular",
      planKey: 'beta'
    },
    {
      name: "Omega",
      symbol: "Ω",
      price: "£30",
      period: "per month + 1.5%",
      description: "Enterprise solution with dedicated support",
      features: [
        "Everything in Beta",
        "Xero integration",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "1.5% transaction fee"
      ],
      highlighted: false,
      buttonText: "Contact Sales",
      planKey: 'omega'
    }
  ];

  // Listen for plan selection changes from other components
  useEffect(() => {
    const handlePlanChange = (event: CustomEvent) => {
      setSelectedPlan(event.detail.plan);
    };

    window.addEventListener('planSelected', handlePlanChange as EventListener);
    return () => {
      window.removeEventListener('planSelected', handlePlanChange as EventListener);
    };
  }, []);

  const handlePlanClick = (planKey: string) => {
    setSelectedPlan(planKey);
    // Dispatch event to sync with other components
    window.dispatchEvent(new CustomEvent('planSelected', { detail: { plan: planKey } }));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Simple Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Choose the plan that's right
            <span className="block text-blue-600">for your business</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. Start with pay-as-you-go or choose a monthly plan for better rates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${
                selectedPlan === plan.planKey
                  ? 'ring-4 ring-emerald-400 shadow-xl scale-105' 
                  : plan.highlighted 
                    ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                    : 'hover:scale-105'
              }`}
              onClick={() => handlePlanClick(plan.planKey)}
            >
              {selectedPlan === plan.planKey && (
                <div className="absolute top-0 left-0 right-0 bg-emerald-600 text-white text-center py-2 text-sm font-semibold">
                  Selected
                </div>
              )}
              
              {plan.highlighted && selectedPlan !== plan.planKey && (
                <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardContent className={`p-8 ${(plan.highlighted && selectedPlan !== plan.planKey) || selectedPlan === plan.planKey ? 'pt-16' : ''}`}>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    <span className="text-slate-900">{plan.name}</span><span className="text-orange-500">{plan.symbol}</span>
                  </h3>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    {plan.price}
                    <span className="text-lg font-normal text-slate-600">/{plan.period}</span>
                  </div>
                  <p className="text-slate-600">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg" 
                  className={`w-full ${
                    selectedPlan === plan.planKey
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : plan.highlighted 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">All plans include:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-700">
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600 mr-2" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600 mr-2" />
              <span>No monthly minimums</span>
            </div>
            <div className="flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

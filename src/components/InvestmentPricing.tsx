
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Users, TrendingUp, Zap } from "lucide-react";

export const InvestmentPricing = () => {
  const pricingTiers = [
    {
      name: "Starter",
      price: "£89",
      period: "/month",
      description: "Perfect for new restaurants getting started",
      restaurants: "1 location",
      features: [
        "Complete POS system",
        "Payment processing included",
        "Basic reporting",
        "Email support",
        "Staff management",
        "Menu management"
      ],
      popular: false,
      icon: <Zap className="h-6 w-6 text-blue-600" />
    },
    {
      name: "Professional",
      price: "£159",
      period: "/month",
      description: "Ideal for growing restaurant businesses",
      restaurants: "Up to 3 locations",
      features: [
        "Everything in Starter",
        "Advanced analytics",
        "Inventory management",
        "Online ordering integration",
        "Priority phone support",
        "Custom reporting",
        "Multi-location management"
      ],
      popular: true,
      icon: <TrendingUp className="h-6 w-6 text-emerald-600" />
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For restaurant groups and franchises",
      restaurants: "Unlimited locations",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced API access",
        "24/7 phone support",
        "Training and onboarding",
        "Custom reporting suite"
      ],
      popular: false,
      icon: <Users className="h-6 w-6 text-purple-600" />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Simple Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Choose the plan that's
            <span className="block text-blue-600">right for your business</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            No setup fees, no hidden costs. Just straightforward pricing that grows with your restaurant.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                tier.popular ? 'border-2 border-blue-500 scale-105' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-6 py-2">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">{tier.icon}</div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {tier.price}
                  <span className="text-lg font-normal text-slate-600">{tier.period}</span>
                </div>
                <p className="text-slate-600 mb-4">{tier.description}</p>
                <div className="text-sm text-blue-600 font-medium">{tier.restaurants}</div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-3 text-lg font-semibold ${
                    tier.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200'
                  }`}
                >
                  {tier.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer testimonials */}
        <div className="bg-slate-50 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            What our customers say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="/placeholder.svg" 
                alt="Marcus Johnson" 
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-slate-600 mb-4">
                "Switching to Fynlo was the best decision we made. Our efficiency increased by 40%."
              </p>
              <div className="font-semibold text-slate-900">Marcus Johnson</div>
              <div className="text-sm text-slate-500">The Burger Joint, Manchester</div>
            </div>
            <div className="text-center">
              <img 
                src="/placeholder.svg" 
                alt="Emma Wilson" 
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-slate-600 mb-4">
                "The support team is amazing. They're always there when we need them."
              </p>
              <div className="font-semibold text-slate-900">Emma Wilson</div>
              <div className="text-sm text-slate-500">Café Bella, Edinburgh</div>
            </div>
            <div className="text-center">
              <img 
                src="/placeholder.svg" 
                alt="David Chen" 
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-slate-600 mb-4">
                "Simple, reliable, and cost-effective. Everything we needed in one place."
              </p>
              <div className="font-semibold text-slate-900">David Chen</div>
              <div className="text-sm text-slate-500">Noodle Express, Birmingham</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

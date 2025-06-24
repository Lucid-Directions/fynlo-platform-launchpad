
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export const InvestmentPricing = () => {
  const pricingTiers = [
    {
      name: "Starter Platform",
      price: "$2,500",
      period: "/month",
      description: "Perfect for entering the restaurant technology market",
      restaurants: "Up to 25 restaurants",
      commission: "1.2% processing",
      features: [
        "Complete POS platform access",
        "Basic analytics and reporting",
        "Standard payment processing",
        "Email support",
        "Training materials and documentation",
        "Marketing asset library"
      ],
      roi: "$150K+ annual potential",
      popular: false
    },
    {
      name: "Growth Platform",
      price: "$7,500",
      period: "/month",
      description: "Ideal for serious restaurant technology entrepreneurs",
      restaurants: "Up to 100 restaurants",
      commission: "1.1% processing",
      features: [
        "Everything in Starter",
        "Advanced analytics and insights",
        "Priority customer support",
        "Custom branding options",
        "Account management support",
        "Monthly business reviews",
        "Lead generation assistance"
      ],
      roi: "$600K+ annual potential",
      popular: true
    },
    {
      name: "Enterprise Platform",
      price: "Custom",
      period: "",
      description: "For established operators seeking market dominance",
      restaurants: "Unlimited restaurants",
      commission: "Negotiated rates",
      features: [
        "Everything in Growth",
        "White-label platform options",
        "Dedicated success manager",
        "Custom feature development",
        "Regional territory protection",
        "Marketing co-investment",
        "Executive business planning"
      ],
      roi: "$2M+ annual potential",
      popular: false
    }
  ];

  const supportServices = [
    {
      title: "Platform Deployment",
      description: "Complete technical setup and configuration within 30 days",
      timeline: "2-4 weeks"
    },
    {
      title: "Training & Certification",
      description: "Comprehensive education program for your team",
      timeline: "1-2 weeks"
    },
    {
      title: "Marketing Support",
      description: "Professional materials and go-to-market strategy",
      timeline: "Ongoing"
    },
    {
      title: "Business Development",
      description: "Account management and growth strategy support",
      timeline: "Ongoing"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Investment & Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Flexible Partnership Models
            <span className="block text-blue-600">for Market Growth</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the platform tier that matches your market ambitions and growth timeline. All plans include comprehensive support and proven business development resources.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                tier.popular ? 'border-2 border-blue-500 scale-105' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-6 py-2">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</CardTitle>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {tier.price}
                  <span className="text-lg font-normal text-slate-600">{tier.period}</span>
                </div>
                <p className="text-slate-600">{tier.description}</p>
                
                {/* Key Metrics */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">{tier.restaurants}</div>
                  <div className="text-sm text-slate-600 mb-2">{tier.commission}</div>
                  <div className="text-lg font-semibold text-emerald-600">{tier.roi}</div>
                </div>
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
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ROI Calculator Preview */}
        <div className="mb-20 p-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-8">Revenue Projection Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">50</div>
              <div className="text-slate-600 mb-2">Restaurant Partners</div>
              <div className="text-sm text-slate-500">Year 1 Target</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 mb-2">$650K</div>
              <div className="text-slate-600 mb-2">Avg Restaurant Revenue</div>
              <div className="text-sm text-slate-500">Annual per location</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">1.2%</div>
              <div className="text-slate-600 mb-2">Platform Commission</div>
              <div className="text-sm text-slate-500">Processing rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">$390K</div>
              <div className="text-slate-600 mb-2">Annual Revenue</div>
              <div className="text-sm text-slate-500">Conservative estimate</div>
            </div>
          </div>
        </div>

        {/* Support Services */}
        <div>
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Implementation & Support Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportServices.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <h4 className="text-lg font-semibold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 mb-4">{service.description}</p>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  {service.timeline}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

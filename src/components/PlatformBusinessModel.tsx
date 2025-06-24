
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, Users } from "lucide-react";

export const PlatformBusinessModel = () => {
  const revenueStreams = [
    {
      title: "Processing Revenue",
      percentage: "1.2%",
      description: "Industry-leading processing rates with transparent pricing",
      potential: "$2.4M ARR per 1,000 restaurants"
    },
    {
      title: "Platform Licensing",
      percentage: "Monthly",
      description: "Scalable SaaS model with tiered pricing options",
      potential: "$480K ARR per 1,000 restaurants"
    },
    {
      title: "Integration Fees",
      percentage: "Per Connection",
      description: "Third-party integrations and premium features",
      potential: "$240K ARR per 1,000 restaurants"
    },
    {
      title: "Support Services",
      percentage: "Premium",
      description: "Enterprise support and consulting services",
      potential: "$360K ARR per 1,000 restaurants"
    }
  ];

  const competitiveAdvantages = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Multi-Tenant Architecture",
      description: "Serve multiple restaurants from a single platform instance, reducing operational costs by 75%"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-emerald-600" />,
      title: "Superior Economics",
      description: "1.2% processing vs industry standard 2.9%, creating immediate value proposition"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Scalable Growth",
      description: "Add new restaurant partners with minimal infrastructure investment"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Business Model</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Build Recurring Revenue Through
            <span className="block text-blue-600">Restaurant Partnerships</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A proven platform business model that generates predictable, scalable revenue while delivering exceptional value to restaurant partners.
          </p>
        </div>

        {/* Revenue Model Overview */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Revenue Streams & Scaling Potential</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {revenueStreams.map((stream, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{stream.title}</CardTitle>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {stream.percentage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{stream.description}</p>
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <div className="text-sm font-semibold text-emerald-800">{stream.potential}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Total Addressable Market */}
        <div className="mb-20 p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-8">Total Addressable Market Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-slate-900">US Restaurant Locations</span>
                  <span className="text-2xl font-bold text-blue-600">1.2M</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg">
                  <span className="font-semibold text-slate-900">Average Annual Revenue</span>
                  <span className="text-2xl font-bold text-emerald-600">$650K</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-slate-900">Platform Opportunity</span>
                  <span className="text-2xl font-bold text-purple-600">$9.4B</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-slate-900">Market Penetration Scenarios</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">1% Market Share</span>
                  <span className="font-bold text-slate-900">$94M ARR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">5% Market Share</span>
                  <span className="font-bold text-slate-900">$470M ARR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">10% Market Share</span>
                  <span className="font-bold text-emerald-600 text-lg">$940M ARR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Platform Competitive Advantages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-6">{advantage.icon}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{advantage.title}</h4>
                <p className="text-slate-600">{advantage.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
            Explore Partnership Opportunities
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

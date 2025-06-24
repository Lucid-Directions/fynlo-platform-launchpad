
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Clock, Award } from "lucide-react";

export const PlatformBusinessModel = () => {
  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Built for Restaurants",
      description: "Designed by restaurant professionals who understand your daily challenges and needs."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure & Reliable",
      description: "Bank-level security with 99.9% uptime. Your business operations are always protected."
    },
    {
      icon: <Clock className="h-8 w-8 text-emerald-600" />,
      title: "Save Time Daily",
      description: "Automate routine tasks and focus on what matters most - serving great food to your customers."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Award-Winning Support",
      description: "UK-based support team ready to help you succeed, with an average response time of under 2 minutes."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Why Choose Fynlo</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Everything you need to run
            <span className="block text-blue-600">a successful restaurant</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From taking your first order to managing multiple locations, Fynlo grows with your business every step of the way.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-20">
          <div className="relative max-w-4xl mx-auto">
            <img 
              src="/placeholder.svg" 
              alt="Restaurant team using Fynlo POS system during busy service" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h4>
              <p className="text-slate-600">{benefit.description}</p>
            </Card>
          ))}
        </div>

        {/* Success Story */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-emerald-100 text-emerald-800">Customer Success</Badge>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                From struggling to thriving in 6 months
              </h3>
              <p className="text-lg text-slate-600 mb-6">
                "Before Fynlo, we were drowning in paperwork and losing track of orders. Now we serve 40% more customers with the same staff, and our profit margins have improved dramatically."
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/placeholder.svg" 
                  alt="James Mitchell, Owner of The Crown Pub" 
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <div className="text-lg font-semibold text-slate-900">James Mitchell</div>
                  <div className="text-slate-600">Owner, The Crown Pub, Leeds</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">40%</div>
                  <div className="text-sm text-slate-600">More customers served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">25%</div>
                  <div className="text-sm text-slate-600">Increase in profit margins</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/placeholder.svg" 
                alt="The Crown Pub bustling with happy customers" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
            Start Your Success Story
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-slate-600 mt-4">14-day free trial • No setup fees • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};

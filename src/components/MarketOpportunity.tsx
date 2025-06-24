
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Globe } from "lucide-react";

export const MarketOpportunity = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Market Opportunity</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Growing Payment Solutions
            <span className="block text-blue-600">Market</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The digital payment industry continues to expand rapidly, creating significant opportunities for innovative solutions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-slate-600">Businesses prefer digital payments</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">2M+</div>
              <div className="text-slate-600">Small businesses need payment solutions</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">£12B</div>
              <div className="text-slate-600">Digital payment market value</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-slate-600">Always-on payment processing</div>
            </CardContent>
          </Card>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Why Businesses Choose Fynlo</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Instant Activation</h4>
                  <p className="text-slate-600">Sign up today, start accepting payments immediately. No waiting for hardware or complex setup processes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Competitive Rates</h4>
                  <p className="text-slate-600">1.5% per transaction with no monthly fees or hidden costs. Transparent pricing that grows with your business.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Complete Solution</h4>
                  <p className="text-slate-600">Everything you need in one platform: payments, reporting, customer management, and business insights.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:pl-8">
            <Card className="p-8 bg-gradient-to-br from-blue-600 to-emerald-600 text-white">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-blue-100 mb-6">
                  Join thousands of businesses already using Fynlo to streamline their payment processing and grow their revenue.
                </p>
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <div className="text-sm text-blue-100 mb-1">Average setup time</div>
                  <div className="text-2xl font-bold">5 minutes</div>
                </div>
                <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                  Start Your Free Trial
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

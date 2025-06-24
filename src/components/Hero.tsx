
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users, Check } from "lucide-react";

export const Hero = () => {
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'block';
    }
  };

  return (
    <section className="relative bg-white">
      {/* Header Navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ae344ce5-1c9f-41c8-b990-94ddff083a5a.png" 
                alt="Fynlo Logo" 
                className="w-auto"
                style={{ height: '150px' }}
                onError={handleLogoError}
              />
              <div className="text-3xl font-bold text-blue-600" style={{display: 'none'}}>Fynlo</div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#solutions" className="text-gray-700 hover:text-blue-600 font-medium">Solutions</a>
              <a href="#business" className="text-gray-700 hover:text-blue-600 font-medium">Business Types</a>
              <a href="#resources" className="text-gray-700 hover:text-blue-600 font-medium">Resources</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
            </nav>
            
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              Get Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Your All-in-One Payment Solution
            </h1>
            
            {/* Pricing Highlight */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-600">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">1.5%</div>
                  <div className="text-sm text-gray-600">per transaction</div>
                </div>
                <div className="text-gray-400">+</div>
                <div>
                  <div className="text-lg font-semibold text-slate-900">No monthly fees</div>
                  <div className="text-sm text-gray-600">No setup costs</div>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find the right solution to power your business with instant payment processing, 
              no hardware required, and bank-level security.
            </p>

            {/* Pricing Tiers Preview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Your Plan:</h3>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white border-2 border-blue-200 rounded-lg px-4 py-3 text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-slate-900">
                    Alph<span className="text-orange-500">α</span>
                  </div>
                  <div className="text-sm text-blue-600">£89/month</div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-500 rounded-lg px-4 py-3 text-center min-w-[120px] relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Popular</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    Bet<span className="text-orange-500">β</span>
                  </div>
                  <div className="text-sm text-emerald-600">£159/month</div>
                </div>
                <div className="bg-white border-2 border-purple-200 rounded-lg px-4 py-3 text-center min-w-[120px]">
                  <div className="text-2xl font-bold text-slate-900">
                    Omeg<span className="text-orange-500">Ω</span>
                  </div>
                  <div className="text-sm text-purple-600">Custom</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Get Your Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </div>

            {/* Quick Benefits */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                Accept all payment methods
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                Instant setup
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                24/7 support
              </div>
            </div>
          </div>

          {/* Right Content - Payment Methods */}
          <div className="lg:pl-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Payment Terminal</h3>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Card payments</span>
                    <span className="font-semibold">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Contactless</span>
                    <span className="font-semibold">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Mobile wallets</span>
                    <span className="font-semibold">✓</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Method Icons */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Accept most popular payment methods</p>
                <div className="flex justify-center space-x-4 opacity-60">
                  <div className="w-8 h-8 bg-blue-100 rounded"></div>
                  <div className="w-8 h-8 bg-red-100 rounded"></div>
                  <div className="w-8 h-8 bg-yellow-100 rounded"></div>
                  <div className="w-8 h-8 bg-green-100 rounded"></div>
                  <div className="w-8 h-8 bg-purple-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

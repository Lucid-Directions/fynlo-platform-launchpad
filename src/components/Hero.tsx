import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [selectedPlan, setSelectedPlan] = useState('beta'); // Default to beta (most popular)

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'block';
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    // Dispatch event to sync with other components
    window.dispatchEvent(new CustomEvent('planSelected', { detail: { plan } }));
  };

  return (
    <section className="relative bg-white hero-section">
      {/* Header Navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <img 
                src="/lovable-uploads/ae344ce5-1c9f-41c8-b990-94ddff083a5a.png" 
                alt="Fynlo Logo" 
                className="w-auto"
                style={{ height: '140px' }}
                onError={handleLogoError}
              />
              <div className="text-3xl font-bold text-blue-600" style={{display: 'none'}}>Fynlo</div>
            </div>
            
            <nav className="flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <button 
                onClick={() => scrollToSection('product-showcase')} 
                className="text-gray-700 hover:text-blue-600 font-medium hover:scale-110 transition-all duration-300"
              >
                Solutions
              </button>
              <button 
                onClick={() => scrollToSection('business-solutions')} 
                className="text-gray-700 hover:text-blue-600 font-medium hover:scale-110 transition-all duration-300"
              >
                Business Types
              </button>
              <button 
                onClick={() => scrollToSection('resource-center')} 
                className="text-gray-700 hover:text-blue-600 font-medium hover:scale-110 transition-all duration-300"
              >
                Resources
              </button>
              <button 
                onClick={() => scrollToSection('market-opportunity')} 
                className="text-gray-700 hover:text-blue-600 font-medium hover:scale-110 transition-all duration-300"
              >
                About
              </button>
            </nav>

            <div className="w-[140px]"></div> {/* Spacer to balance the logo */}
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4 hover:text-blue-600 transition-colors duration-500">
            Your All-in-One Payment Solution
          </h1>
          
          <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
            Find the right solution to power your business with instant payment processing, 
            no hardware required, and bank-level security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            {/* Pricing Highlight */}
            <div className="bg-blue-50 rounded-lg p-5 mb-6 border-l-4 border-blue-600 hover:bg-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600 hover:scale-110 transition-transform duration-300">2%</div>
                  <div className="text-sm text-gray-600">per transaction</div>
                </div>
                <div className="text-gray-400">+</div>
                <div>
                  <div className="text-lg font-semibold text-slate-900">No monthly fees</div>
                  <div className="text-sm text-gray-600">Pay as you go</div>
                </div>
              </div>
            </div>

            {/* Pricing Tiers Preview with Subtle Animations */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Choose Your Plan:</h3>
              <div className="flex flex-wrap gap-3">
                <div 
                  className={`bg-white border-2 rounded-lg px-3 py-2 text-center min-w-[110px] cursor-pointer group transition-all duration-300 ${
                    selectedPlan === 'alpha' 
                      ? 'border-blue-500 shadow-lg ring-2 ring-blue-300' 
                      : 'border-blue-200 hover:border-blue-400 hover:shadow-lg'
                  } hover:scale-105`}
                  onClick={() => handlePlanSelect('alpha')}
                >
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    selectedPlan === 'alpha' ? 'text-slate-900 animate-shake' : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    <span className="text-slate-900">Alph</span><span className="text-orange-500">a</span>
                  </div>
                  <div className="text-sm text-blue-600">2% per transaction</div>
                </div>
                <div 
                  className={`bg-blue-50 border-2 rounded-lg px-3 py-2 text-center min-w-[110px] relative cursor-pointer group transition-all duration-300 ${
                    selectedPlan === 'beta' 
                      ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-300' 
                      : 'border-blue-500 hover:border-blue-600 hover:shadow-xl'
                  } hover:scale-105`}
                  onClick={() => handlePlanSelect('beta')}
                >
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className={`bg-blue-600 text-white text-xs px-2 py-1 rounded transition-all duration-300 ${
                      selectedPlan === 'beta' ? 'bg-emerald-600' : 'group-hover:bg-blue-700'
                    }`}>Popular</span>
                  </div>
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    selectedPlan === 'beta' ? 'text-slate-900 animate-shake' : 'text-slate-900 group-hover:text-emerald-600'
                  }`}>
                    <span className="text-slate-900">Bet</span><span className="text-orange-500">a</span>
                  </div>
                  <div className="text-sm text-emerald-600">£19/month</div>
                </div>
                <div 
                  className={`bg-white border-2 rounded-lg px-3 py-2 text-center min-w-[110px] cursor-pointer group transition-all duration-300 ${
                    selectedPlan === 'omega' 
                      ? 'border-purple-500 shadow-lg ring-2 ring-purple-300' 
                      : 'border-purple-200 hover:border-purple-400 hover:shadow-lg'
                  } hover:scale-105`}
                  onClick={() => handlePlanSelect('omega')}
                >
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    selectedPlan === 'omega' ? 'text-slate-900 animate-shake' : 'text-slate-900 group-hover:text-purple-600'
                  }`}>
                    <span className="text-slate-900">Omeg</span><span className="text-orange-500">a</span>
                  </div>
                  <div className="text-sm text-purple-600">£30/month</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group">
                Get Your Login
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-lg hover:scale-110 hover:shadow-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Quick Benefits */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center hover:text-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                Accept all payment methods
              </div>
              <div className="flex items-center hover:text-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                Instant setup
              </div>
              <div className="flex items-center hover:text-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer">
                <Check className="w-4 h-4 text-emerald-600 mr-2" />
                24/7 support
              </div>
            </div>
          </div>

          {/* Right Content - Mobile Payment Methods */}
          <div className="lg:pl-6">
            <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 hover:shadow-xl transition-all duration-500">
              <div className="bg-white rounded-xl p-5 shadow-sm mb-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Mobile Payment Solution</h3>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 hover:scale-105 transition-all duration-300 rounded px-2">
                    <span className="text-gray-600">Phone-based payments</span>
                    <span className="font-semibold text-emerald-600 hover:scale-125 transition-transform duration-300">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 hover:scale-105 transition-all duration-300 rounded px-2">
                    <span className="text-gray-600">No hardware required</span>
                    <span className="font-semibold text-emerald-600 hover:scale-125 transition-transform duration-300">✓</span>
                  </div>
                  <div className="flex justify-between items-center py-2 hover:bg-gray-50 hover:scale-105 transition-all duration-300 rounded px-2">
                    <span className="text-gray-600">All payment methods</span>
                    <span className="font-semibold text-emerald-600 hover:scale-125 transition-transform duration-300">✓</span>
                  </div>
                </div>
              </div>
              
              {/* Payment Method Icons */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Accept most popular payment methods</p>
                <div className="flex justify-center space-x-3 opacity-60">
                  <div className="w-7 h-7 bg-blue-100 rounded hover:bg-blue-200 hover:scale-125 hover:opacity-100 transition-all duration-300 cursor-pointer"></div>
                  <div className="w-7 h-7 bg-red-100 rounded hover:bg-red-200 hover:scale-125 hover:opacity-100 transition-all duration-300 cursor-pointer"></div>
                  <div className="w-7 h-7 bg-yellow-100 rounded hover:bg-yellow-200 hover:scale-125 hover:opacity-100 transition-all duration-300 cursor-pointer"></div>
                  <div className="w-7 h-7 bg-green-100 rounded hover:bg-green-200 hover:scale-125 hover:opacity-100 transition-all duration-300 cursor-pointer"></div>
                  <div className="w-7 h-7 bg-purple-100 rounded hover:bg-purple-200 hover:scale-125 hover:opacity-100 transition-all duration-300 cursor-pointer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

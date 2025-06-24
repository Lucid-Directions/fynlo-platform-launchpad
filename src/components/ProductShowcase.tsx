
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export const ProductShowcase = () => {
  const [selectedPlan, setSelectedPlan] = useState('beta'); // Default to beta (most popular)

  const products = [
    {
      name: "Alpha",
      symbol: "α",
      subtitle: "Essential business solution",
      description: "Perfect for small businesses getting started with comprehensive payment processing and basic management tools.",
      features: ["Employee Management", "QR Scanner for inventory", "Basic Reports", "No hardware required"],
      highlighted: false,
      planKey: 'alpha'
    },
    {
      name: "Beta",
      symbol: "β",
      subtitle: "Advanced business management",
      description: "Complete business solution with advanced features for growing restaurants and retail businesses.",
      features: ["Everything in Alpha", "Advanced Inventory management", "Employee Scheduling system", "Advanced Reports & analytics"],
      highlighted: true,
      planKey: 'beta'
    },
    {
      name: "Omega",
      symbol: "Ω",
      subtitle: "Enterprise solution",
      description: "Full-featured business management with custom integrations and dedicated support for large operations.",
      features: ["Everything in Beta", "Xero integration", "Custom integrations", "Priority support"],
      highlighted: false,
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
    <section id="product-showcase" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Subtle Animations */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className={`transition-all duration-300 cursor-pointer inline-block ${
              selectedPlan === 'alpha' 
                ? 'text-slate-900 animate-shake' 
                : 'text-slate-900 hover:scale-105'
            }`}
            onClick={() => handlePlanClick('alpha')}>
              <span className="text-slate-900">Alph</span><span className="inline-block bg-orange-500 text-white px-2 py-1 rounded text-lg font-bold ml-1">a</span>
            </span>
            <span className={`mx-8 transition-all duration-300 cursor-pointer inline-block ${
              selectedPlan === 'beta' 
                ? 'text-slate-900 animate-shake' 
                : 'text-slate-900 hover:scale-105'
            }`}
            onClick={() => handlePlanClick('beta')}>
              <span className="text-slate-900">Bet</span><span className="inline-block bg-orange-500 text-white px-2 py-1 rounded text-lg font-bold ml-1">a</span>
            </span>
            <span className={`transition-all duration-300 cursor-pointer inline-block ${
              selectedPlan === 'omega' 
                ? 'text-slate-900 animate-shake' 
                : 'text-slate-900 hover:scale-105'
            }`}
            onClick={() => handlePlanClick('omega')}>
              <span className="text-slate-900">Omeg</span><span className="inline-block bg-orange-500 text-white px-2 py-1 rounded text-lg font-bold ml-1">a</span>
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the perfect payment solution for your business needs
          </p>
        </div>

        {/* Products Grid with Subtle Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer group ${
                selectedPlan === product.planKey
                  ? 'ring-4 ring-emerald-400 shadow-xl'
                  : 'hover:shadow-lg hover:ring-2 hover:ring-blue-300'
              }`}
              onClick={() => handlePlanClick(product.planKey)}
            >
              {selectedPlan === product.planKey && (
                <div className="absolute top-0 right-0 px-3 py-1 text-sm font-semibold bg-emerald-500 text-white">
                  Selected
                </div>
              )}
              
              {product.highlighted && selectedPlan !== product.planKey && (
                <div className="absolute top-0 right-0 px-3 py-1 text-sm font-semibold bg-blue-500 text-white">
                  Most Popular
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className={`text-8xl font-bold mb-4 transition-all duration-300 ${
                    selectedPlan === product.planKey 
                      ? 'scale-110 text-orange-500' 
                      : 'group-hover:scale-110 text-slate-700'
                  }`}>
                    {product.symbol}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                    selectedPlan === product.planKey 
                      ? 'text-slate-900' 
                      : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    <span className="text-slate-900">{product.name.slice(0, -1)}</span><span className="inline-block bg-orange-500 text-white px-2 py-1 rounded text-lg font-bold ml-1">{product.name.slice(-1)}</span>
                  </h3>
                  <p className={`text-lg mb-4 transition-colors duration-300 ${
                    selectedPlan === product.planKey 
                      ? 'text-slate-800' 
                      : 'text-slate-600 group-hover:text-slate-800'
                  }`}>
                    {product.subtitle}
                  </p>
                </div>

                <p className={`mb-6 text-center transition-colors duration-300 ${
                  selectedPlan === product.planKey 
                    ? 'text-slate-800' 
                    : 'text-slate-600 group-hover:text-slate-800'
                }`}>
                  {product.description}
                </p>

                <div className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center text-sm transition-all duration-300 ${
                        selectedPlan === product.planKey 
                          ? 'text-slate-800' 
                          : 'text-slate-600 group-hover:text-slate-800'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                        selectedPlan === product.planKey 
                          ? 'bg-emerald-600' 
                          : 'bg-emerald-500 group-hover:bg-emerald-600'
                      }`}></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button 
                  variant={selectedPlan === product.planKey ? "default" : "outline"} 
                  className={`w-full transition-all duration-300 ${
                    selectedPlan === product.planKey 
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg' 
                      : 'hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 hover:text-blue-600 transition-colors duration-300">
            Accept most popular payment methods
          </h3>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2 hover:scale-110 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
                VISA
              </div>
            </div>
            <div className="flex items-center space-x-2 hover:scale-110 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-8 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold hover:bg-red-600 hover:shadow-lg transition-all duration-300">
                MC
              </div>
            </div>
            <div className="flex items-center space-x-2 hover:scale-110 hover:opacity-100 transition-all duration-300 cursor-pointer">  
              <div className="w-12 h-8 bg-blue-400 rounded text-white text-xs flex items-center justify-center font-bold hover:bg-blue-500 hover:shadow-lg transition-all duration-300">
                AMEX
              </div>
            </div>
            <div className="flex items-center space-x-2 hover:scale-110 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-8 bg-gray-600 rounded text-white text-xs flex items-center justify-center font-bold hover:bg-gray-700 hover:shadow-lg transition-all duration-300">
                DISC
              </div>
            </div>
            <div className="flex items-center space-x-2 hover:scale-110 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 hover:shadow-lg transition-all duration-300">
                📱
              </div>
            </div>
            <div className="flex items-center space-x-2 hover:scale-110 hover:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 hover:shadow-lg transition-all duration-300">
                💳
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

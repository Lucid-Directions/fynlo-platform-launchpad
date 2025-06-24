
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const ProductShowcase = () => {
  const [selectedPlan, setSelectedPlan] = useState('beta'); // Default to beta (most popular)

  const products = [
    {
      name: "Alpha",
      symbol: "α",
      subtitle: "Essential business solution",
      description: "Perfect for small businesses getting started with comprehensive payment processing and basic management tools.",
      features: ["Employee Management", "QR Scanner for inventory", "Basic Reports", "No hardware required"],
      image: "📱",
      highlighted: false,
      planKey: 'alpha'
    },
    {
      name: "Beta",
      symbol: "β",
      subtitle: "Advanced business management",
      description: "Complete business solution with advanced features for growing restaurants and retail businesses.",
      features: ["Everything in Alpha", "Advanced Inventory management", "Employee Scheduling system", "Advanced Reports & analytics"],
      image: "💻",
      highlighted: true,
      planKey: 'beta'
    },
    {
      name: "Omega",
      symbol: "Ω",
      subtitle: "Enterprise solution",
      description: "Full-featured business management with custom integrations and dedicated support for large operations.",
      features: ["Everything in Beta", "Xero integration", "Custom integrations", "Priority support"],
      image: "🖥️",
      highlighted: false,
      planKey: 'omega'
    }
  ];

  const handlePlanClick = (planKey: string) => {
    setSelectedPlan(planKey);
    // Scroll to hero section to show the updated selection
    const heroElement = document.querySelector('.hero-section');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="product-showcase" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Interactive Animation */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className={`transition-all duration-500 cursor-pointer inline-block ${
              selectedPlan === 'alpha' 
                ? 'text-emerald-600 scale-110 animate-pulse' 
                : 'text-emerald-600 hover:scale-110 hover:text-emerald-700'
            }`}
            onClick={() => handlePlanClick('alpha')}>
              Alph<span className={`transition-all duration-300 ${
                selectedPlan === 'alpha' ? 'text-orange-500 animate-bounce' : 'text-orange-500 animate-pulse'
              }`}>α</span>
            </span>
            <span className={`mx-8 transition-all duration-500 cursor-pointer inline-block ${
              selectedPlan === 'beta' 
                ? 'text-emerald-600 scale-110 animate-pulse' 
                : 'text-gray-300 hover:text-gray-600 hover:scale-110'
            }`}
            onClick={() => handlePlanClick('beta')}>
              Bet<span className={`transition-all duration-300 ${
                selectedPlan === 'beta' ? 'text-orange-500 animate-spin' : 'text-orange-500 hover:animate-bounce'
              }`}>β</span>
            </span>
            <span className={`transition-all duration-500 cursor-pointer inline-block ${
              selectedPlan === 'omega' 
                ? 'text-purple-600 scale-110 animate-pulse' 
                : 'text-gray-300 hover:text-gray-600 hover:scale-110'
            }`}
            onClick={() => handlePlanClick('omega')}>
              Omeg<span className={`transition-all duration-300 ${
                selectedPlan === 'omega' ? 'text-orange-500 animate-bounce' : 'text-orange-500 hover:animate-spin'
              }`}>Ω</span>
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-fade-in">
            Choose the perfect payment solution for your business needs
          </p>
        </div>

        {/* Products Grid with Enhanced Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-500 cursor-pointer group ${
                selectedPlan === product.planKey
                  ? 'ring-4 ring-emerald-400 shadow-2xl -translate-y-3 rotate-1 animate-pulse'
                  : product.highlighted 
                    ? 'ring-2 ring-emerald-500 shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:rotate-1 hover:ring-4 hover:ring-emerald-400' 
                    : 'hover:shadow-xl hover:ring-2 hover:ring-blue-300 hover:-translate-y-3 hover:rotate-1'
              }`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
              onClick={() => handlePlanClick(product.planKey)}
            >
              {(product.highlighted || selectedPlan === product.planKey) && (
                <div className={`absolute top-0 right-0 px-3 py-1 text-sm font-semibold ${
                  selectedPlan === product.planKey 
                    ? 'bg-emerald-500 text-white animate-bounce' 
                    : 'bg-emerald-500 text-white animate-bounce'
                }`}>
                  {selectedPlan === product.planKey ? 'Selected' : 'Most Popular'}
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className={`text-6xl mb-4 transition-all duration-300 ${
                    selectedPlan === product.planKey 
                      ? 'scale-125 rotate-12 animate-bounce' 
                      : 'group-hover:scale-125 group-hover:rotate-12'
                  }`}>
                    {product.image}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                    selectedPlan === product.planKey 
                      ? 'text-emerald-600' 
                      : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    {product.name}<span className={`transition-all duration-300 ${
                      selectedPlan === product.planKey 
                        ? 'text-orange-500 animate-pulse' 
                        : 'text-orange-500 group-hover:animate-pulse'
                    }`}>{product.symbol}</span>
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
                          ? 'text-slate-800 translate-x-2' 
                          : 'text-slate-600 group-hover:text-slate-800 hover:translate-x-2'
                      }`}
                      style={{
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                        selectedPlan === product.planKey 
                          ? 'bg-emerald-600 scale-150' 
                          : 'bg-emerald-500 group-hover:bg-emerald-600 group-hover:scale-150'
                      }`}></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button 
                  variant={product.highlighted || selectedPlan === product.planKey ? "default" : "outline"} 
                  className={`w-full transition-all duration-300 ${
                    selectedPlan === product.planKey 
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg scale-105' 
                      : product.highlighted 
                        ? 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg group-hover:scale-105' 
                        : 'hover:bg-blue-50 hover:border-blue-300 group-hover:scale-105'
                  }`}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods Section with Hover Effects */}
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

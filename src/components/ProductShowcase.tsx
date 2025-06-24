
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ProductShowcase = () => {
  const products = [
    {
      name: "Alpha",
      symbol: "α",
      subtitle: "Essential business solution",
      description: "Perfect for small businesses getting started with comprehensive payment processing and basic management tools.",
      features: ["Employee Management", "QR Scanner for inventory", "Basic Reports", "No hardware required"],
      image: "📱",
      highlighted: false
    },
    {
      name: "Beta",
      symbol: "β",
      subtitle: "Advanced business management",
      description: "Complete business solution with advanced features for growing restaurants and retail businesses.",
      features: ["Everything in Alpha", "Advanced Inventory management", "Employee Scheduling system", "Advanced Reports & analytics"],
      image: "💻",
      highlighted: true
    },
    {
      name: "Omega",
      symbol: "Ω",
      subtitle: "Enterprise solution",
      description: "Full-featured business management with custom integrations and dedicated support for large operations.",
      features: ["Everything in Beta", "Xero integration", "Custom integrations", "Priority support"],
      image: "🖥️",
      highlighted: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Interactive Animation */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="text-emerald-600 hover:scale-110 transition-all duration-300 cursor-pointer inline-block hover:text-emerald-700">
              Alph<span className="text-orange-500 animate-pulse">α</span>
            </span>
            <span className="text-gray-300 mx-8 hover:text-gray-600 hover:scale-110 transition-all duration-300 cursor-pointer inline-block">
              Bet<span className="text-orange-500 hover:animate-bounce">β</span>
            </span>
            <span className="text-gray-300 hover:text-gray-600 hover:scale-110 transition-all duration-300 cursor-pointer inline-block">
              Omeg<span className="text-orange-500 hover:animate-spin">Ω</span>
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
              className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:rotate-1 group cursor-pointer ${
                product.highlighted 
                  ? 'ring-2 ring-emerald-500 shadow-lg animate-pulse hover:ring-4 hover:ring-emerald-400' 
                  : 'hover:shadow-xl hover:ring-2 hover:ring-blue-300'
              }`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {product.highlighted && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-sm font-semibold animate-bounce">
                  Most Popular
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {product.image}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}<span className="text-orange-500 group-hover:animate-pulse">{product.symbol}</span>
                  </h3>
                  <p className="text-lg text-slate-600 mb-4 group-hover:text-slate-800 transition-colors duration-300">
                    {product.subtitle}
                  </p>
                </div>

                <p className="text-slate-600 mb-6 text-center group-hover:text-slate-800 transition-colors duration-300">
                  {product.description}
                </p>

                <div className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center text-sm text-slate-600 group-hover:text-slate-800 transition-all duration-300 hover:translate-x-2"
                      style={{
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover:bg-emerald-600 group-hover:scale-150 transition-all duration-300"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button 
                  variant={product.highlighted ? "default" : "outline"} 
                  className={`w-full group-hover:scale-105 transition-all duration-300 ${
                    product.highlighted 
                      ? 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg' 
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

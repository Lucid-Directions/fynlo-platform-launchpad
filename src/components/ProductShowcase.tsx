
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const ProductShowcase = () => {
  const products = [
    {
      name: "Flex",
      subtitle: "Portable card machine",
      description: "Take your business mobile with our handheld POS solution. Perfect for businesses on the go.",
      features: ["Portable", "All-day battery", "4G connectivity", "Receipt printer"],
      image: "📱",
      highlighted: true
    },
    {
      name: "Mini",
      subtitle: "Compact countertop solution",
      description: "Small POS for your countertop that doesn't need much space but delivers full functionality.",
      features: ["Compact design", "WiFi enabled", "Touch screen", "Card reader"],
      image: "💻",
      highlighted: false
    },
    {
      name: "Duo",
      subtitle: "Full-featured POS system",
      description: "Complete business management with advanced reporting and inventory tracking.",
      features: ["Full POS", "Inventory management", "Staff management", "Analytics"],
      image: "🖥️",
      highlighted: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="text-emerald-600">Flex</span>
            <span className="text-gray-300 mx-8">Mini</span>
            <span className="text-gray-300">Duo</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the perfect payment solution for your business needs
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
              product.highlighted ? 'ring-2 ring-emerald-500 shadow-lg' : 'hover:shadow-lg'
            }`}>
              {product.highlighted && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white px-3 py-1 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{product.image}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-lg text-slate-600 mb-4">{product.subtitle}</p>
                </div>

                <p className="text-slate-600 mb-6 text-center">{product.description}</p>

                <div className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button 
                  variant={product.highlighted ? "default" : "outline"} 
                  className={`w-full ${product.highlighted ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Accept most popular payment methods</h3>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-8 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
            </div>
            <div className="flex items-center space-x-2">  
              <div className="w-12 h-8 bg-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-8 bg-gray-600 rounded text-white text-xs flex items-center justify-center font-bold">DISC</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">📱</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">💳</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

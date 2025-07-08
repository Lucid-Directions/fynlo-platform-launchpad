
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, BarChart3, CreditCard, Users, Settings } from "lucide-react";
import platformManagementDemo from "@/assets/platform-management-demo.jpg";
import restaurantPosDemo from "@/assets/restaurant-pos-demo.jpg";
import paymentProcessingDemo from "@/assets/payment-processing-demo.jpg";
import businessIntelligenceDemo from "@/assets/business-intelligence-demo.jpg";

export const ProductDemo = () => {
  const platformFeatures = [
    {
      id: "dashboard",
      label: "Platform Management",
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Multi-Location Dashboard",
      description: "Comprehensive oversight and analytics across all restaurant locations",
      image: platformManagementDemo,
      features: [
        "Real-time performance monitoring",
        "Cross-location analytics and reporting",
        "Centralized menu and pricing management",
        "Staff performance tracking",
        "Revenue optimization insights"
      ]
    },
    {
      id: "pos",
      label: "Restaurant Operations",
      icon: <CreditCard className="h-5 w-5" />,
      title: "Advanced Point-of-Sale",
      description: "Intuitive POS system designed for high-volume restaurant operations",
      image: restaurantPosDemo,
      features: [
        "Lightning-fast order processing",
        "Split payments and custom modifications",
        "Kitchen display system integration",
        "Inventory management automation",
        "Staff scheduling and time tracking"
      ]
    },
    {
      id: "payments",
      label: "Payment Processing",
      icon: <CreditCard className="h-5 w-5" />,
      title: "Integrated Payment Solutions",
      description: "Secure, low-cost payment processing with multiple payment options",
      image: paymentProcessingDemo,
      features: [
        "1% processing rates (vs 2.9% industry standard)",
        "Contactless and mobile payments",
        "Split billing and group payments",
        "Automatic tip distribution",
        "Comprehensive payment analytics"
      ]
    },
    {
      id: "analytics",
      label: "Business Intelligence",
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Advanced Analytics Suite",
      description: "Data-driven insights to optimize restaurant performance and profitability",
      image: businessIntelligenceDemo,
      features: [
        "Real-time sales and performance metrics",
        "Customer behavior analysis",
        "Predictive inventory management",
        "Profit margin optimization",
        "Custom reporting and dashboards"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Animation */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-orange-100 text-brand-orange hover:bg-orange-200 hover:scale-105 transition-all duration-300">
            Product Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-6 hover:text-brand-orange transition-colors duration-500">
            Complete Restaurant
            <span className="block text-brand-orange hover:text-orange-600 hover:scale-105 transition-all duration-300">
              Operations Platform
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto mb-8 animate-fade-in">
            Experience the power of our integrated platform through interactive demonstrations and real-world use cases.
          </p>
          
          {/* Demo CTA with Enhanced Animation */}
          <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold hover:scale-110 hover:shadow-xl transition-all duration-300 group">
            <Play className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Watch Interactive Demo
          </Button>
        </div>

        {/* Product Feature Tabs with Animations */}
        <div className="mb-20">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-white shadow-lg rounded-xl p-2">
              {platformFeatures.map((feature, index) => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className="flex items-center space-x-2 text-sm font-medium hover:scale-105 transition-all duration-300 data-[state=active]:bg-orange-100 data-[state=active]:text-brand-orange rounded-lg hover:shadow-md"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span className="hover:rotate-12 transition-transform duration-300">{feature.icon}</span>
                  <span className="hidden sm:inline">{feature.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {platformFeatures.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <Card className="p-8 hover:shadow-2xl transition-all duration-500 group">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold text-brand-black mb-4 group-hover:text-brand-orange transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-xl text-brand-gray mb-8 group-hover:text-brand-black transition-colors duration-300">
                        {feature.description}
                      </p>
                      
                      <div className="space-y-4">
                        {feature.features.map((item, index) => (
                          <div 
                            key={index} 
                            className="flex items-start space-x-3 hover:translate-x-2 transition-all duration-300 group/item"
                            style={{
                              animationDelay: `${index * 0.1}s`
                            }}
                          >
                            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-orange-200 group-hover/item:scale-110 transition-all duration-300">
                              <div className="w-2 h-2 bg-brand-orange rounded-full group-hover/item:bg-orange-700"></div>
                            </div>
                            <span className="text-brand-gray group-hover/item:text-brand-black transition-colors duration-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Demo Interface with Professional Images and Animations */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500">
                      <img 
                        src={feature.image} 
                        alt={`${feature.title} Demo`}
                        className="w-full h-64 object-cover rounded-lg hover:scale-110 transition-transform duration-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Key Benefits Summary with Enhanced Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-xl hover:-translate-y-3 hover:rotate-1 transition-all duration-500 group cursor-pointer">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              <div className="text-2xl group-hover:animate-bounce">💰</div>
            </div>
            <h4 className="text-xl font-bold text-brand-black mb-4 group-hover:text-green-600 transition-colors duration-300">
              Reduce Operating Costs
            </h4>
            <p className="text-brand-gray group-hover:text-brand-black transition-colors duration-300">
              Save up to 40% on processing fees and operational expenses
            </p>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl hover:-translate-y-3 hover:rotate-1 transition-all duration-500 group cursor-pointer">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              <div className="text-2xl group-hover:animate-pulse">📈</div>
            </div>
            <h4 className="text-xl font-bold text-brand-black mb-4 group-hover:text-brand-orange transition-colors duration-300">
              Increase Revenue
            </h4>
            <p className="text-brand-gray group-hover:text-brand-black transition-colors duration-300">
              Data-driven insights help optimize pricing and operations
            </p>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl hover:-translate-y-3 hover:rotate-1 transition-all duration-500 group cursor-pointer">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              <div className="text-2xl group-hover:animate-spin">⚡</div>
            </div>
            <h4 className="text-xl font-bold text-brand-black mb-4 group-hover:text-gray-600 transition-colors duration-300">
              Streamline Operations
            </h4>
            <p className="text-brand-gray group-hover:text-brand-black transition-colors duration-300">
              Integrated platform eliminates manual processes and errors
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

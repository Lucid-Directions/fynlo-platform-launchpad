
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, BarChart3, CreditCard, Users, Settings } from "lucide-react";

export const ProductDemo = () => {
  const platformFeatures = [
    {
      id: "dashboard",
      label: "Platform Management",
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Multi-Location Dashboard",
      description: "Comprehensive oversight and analytics across all restaurant locations",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      features: [
        "1.2% processing rates (vs 2.9% industry standard)",
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
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
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
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Animation */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 hover:scale-105 transition-all duration-300">
            Product Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 hover:text-blue-600 transition-colors duration-500">
            Complete Restaurant
            <span className="block text-blue-600 hover:text-blue-700 hover:scale-105 transition-all duration-300">
              Operations Platform
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 animate-fade-in">
            Experience the power of our integrated platform through interactive demonstrations and real-world use cases.
          </p>
          
          {/* Demo CTA with Enhanced Animation */}
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold hover:scale-110 hover:shadow-xl transition-all duration-300 group">
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
                  className="flex items-center space-x-2 text-sm font-medium hover:scale-105 transition-all duration-300 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 rounded-lg hover:shadow-md"
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
                      <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-xl text-slate-600 mb-8 group-hover:text-slate-800 transition-colors duration-300">
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
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-blue-200 group-hover/item:scale-110 transition-all duration-300">
                              <div className="w-2 h-2 bg-blue-600 rounded-full group-hover/item:bg-blue-700"></div>
                            </div>
                            <span className="text-slate-700 group-hover/item:text-slate-900 transition-colors duration-300">
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
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              <div className="text-2xl group-hover:animate-bounce">💰</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
              Reduce Operating Costs
            </h4>
            <p className="text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
              Save up to 40% on processing fees and operational expenses
            </p>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl hover:-translate-y-3 hover:rotate-1 transition-all duration-500 group cursor-pointer">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              <div className="text-2xl group-hover:animate-pulse">📈</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
              Increase Revenue
            </h4>
            <p className="text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
              Data-driven insights help optimize pricing and operations
            </p>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl hover:-translate-y-3 hover:rotate-1 transition-all duration-500 group cursor-pointer">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
              <div className="text-2xl group-hover:animate-spin">⚡</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              Streamline Operations
            </h4>
            <p className="text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
              Integrated platform eliminates manual processes and errors
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

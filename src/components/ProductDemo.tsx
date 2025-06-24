
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
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Product Demo</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Complete Restaurant
            <span className="block text-blue-600">Operations Platform</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Experience the power of our integrated platform through interactive demonstrations and real-world use cases.
          </p>
          
          {/* Demo CTA */}
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
            <Play className="mr-2 h-5 w-5" />
            Watch Interactive Demo
          </Button>
        </div>

        {/* Product Feature Tabs */}
        <div className="mb-20">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {platformFeatures.map((feature) => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className="flex items-center space-x-2 text-sm font-medium"
                >
                  {feature.icon}
                  <span className="hidden sm:inline">{feature.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {platformFeatures.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <Card className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                      <p className="text-xl text-slate-600 mb-8">{feature.description}</p>
                      
                      <div className="space-y-4">
                        {feature.features.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            </div>
                            <span className="text-slate-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Demo Interface with actual images */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border">
                      <img 
                        src={feature.image} 
                        alt={`${feature.title} Demo`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Key Benefits Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">💰</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">Reduce Operating Costs</h4>
            <p className="text-slate-600">Save up to 40% on processing fees and operational expenses</p>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">📈</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">Increase Revenue</h4>
            <p className="text-slate-600">Data-driven insights help optimize pricing and operations</p>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">⚡</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">Streamline Operations</h4>
            <p className="text-slate-600">Integrated platform eliminates manual processes and errors</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

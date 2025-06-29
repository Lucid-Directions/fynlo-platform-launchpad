
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const KeyFeatures = () => {
  const features = [
    {
      title: "Multi-Tenant Architecture",
      description: "Serve multiple restaurant brands from a single platform with complete data isolation and customization capabilities.",
      icon: "🏢",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "1% Processing Rates",
      description: "Industry-leading payment processing rates that significantly reduce transaction costs compared to traditional providers.",
      icon: "💳",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Zero Hardware Investment",
      description: "Cloud-based infrastructure eliminates the need for expensive hardware purchases and maintenance.",
      icon: "☁️",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security with PCI DSS compliance, encryption, and comprehensive audit trails.",
      icon: "🔒",
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Real-Time Analytics",
      description: "Advanced reporting and analytics dashboards providing insights across all restaurant operations.",
      icon: "📊",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      title: "Seamless Integrations",
      description: "Connect with leading restaurant technology partners through our comprehensive API ecosystem.",
      icon: "🔗",
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Key Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Why Choose Fynlo
            <span className="block text-brand-orange">Platform Solutions</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Built specifically for restaurant technology companies, our platform delivers enterprise-grade capabilities with the flexibility to scale your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-0 shadow-sm">
              <CardContent className="p-0">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

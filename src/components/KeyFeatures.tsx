
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
</rov-write>

Let's create a TrustedPartners component:

<lov-write file_path="src/components/TrustedPartners.tsx">
import { Badge } from "@/components/ui/badge";

export const TrustedPartners = () => {
  const stats = [
    { number: "12+", label: "Markets Served", description: "Across North America" },
    { number: "500K+", label: "Transactions Daily", description: "Processed securely" },
    { number: "99.9%", label: "Uptime", description: "Enterprise reliability" },
    { number: "24/7", label: "Support", description: "Technical assistance" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Trusted Performance</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Platform You Can
            <span className="block text-brand-orange">Count On</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our track record speaks for itself. Join restaurant technology leaders who trust Fynlo to power their growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-brand-orange mb-2">{stat.number}</div>
              <div className="text-xl font-semibold text-slate-900 mb-1">{stat.label}</div>
              <div className="text-slate-600">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant Technology Business?</h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join the leading restaurant technology companies who have chosen Fynlo as their platform partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="text-left">
              <div className="text-2xl font-bold text-brand-orange">Enterprise Grade</div>
              <div className="text-slate-300">Multi-tenant architecture</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-green-400">Cost Effective</div>
              <div className="text-slate-300">1% processing rates</div>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-blue-400">Scalable</div>
              <div className="text-slate-300">Zero hardware investment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

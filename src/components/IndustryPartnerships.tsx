
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const IndustryPartnerships = () => {
  const paymentPartners = [
    "Stripe", "Square", "PayPal", "SumUp"
  ];

  const integrationPartners = [
    "Xero", "Mailchimp", "Slack", "Zapier"
  ];

  const technologyStack = [
    { name: "AWS", category: "Cloud Infrastructure", description: "Enterprise-grade hosting and scalability" },
    { name: "MongoDB", category: "Database", description: "High-performance, scalable data storage" },
    { name: "React", category: "Frontend", description: "Modern, responsive user interfaces" },
    { name: "Node.js", category: "Backend", description: "Fast, scalable server architecture" },
    { name: "Redis", category: "Caching", description: "High-speed data caching and sessions" },
    { name: "Docker", category: "Containerization", description: "Consistent deployment and scaling" }
  ];

  const certifications = [
    { name: "PCI DSS Level 1", description: "Highest level payment security compliance" },
    { name: "SOC 2 Type II", description: "Security, availability, and confidentiality" },
    { name: "GDPR Compliant", description: "European data protection standards" },
    { name: "ISO 27001", description: "Information security management" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">Partnerships & Integrations</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Integrated Ecosystem of
            <span className="block text-blue-600">Industry Leaders</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Built on enterprise-grade technology with deep integrations to the tools and services restaurants rely on every day.
          </p>
        </div>

        {/* Payment Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Payment Processing Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paymentPartners.map((partner, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-all duration-300">
                <CardContent className="p-0">
                  <div className="font-semibold text-slate-700">{partner}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Business Application Integrations</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {integrationPartners.map((partner, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-md transition-all duration-300">
                <CardContent className="p-0">
                  <div className="font-semibold text-slate-700">{partner}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Enterprise Technology Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologyStack.map((tech, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{tech.name}</h4>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {tech.category}
                  </Badge>
                </div>
                <p className="text-slate-600">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications & Compliance */}
        <div className="p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">Security Certifications & Compliance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-6 border-2 border-emerald-100 rounded-lg hover:border-emerald-300 transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🛡️</div>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{cert.name}</h4>
                <p className="text-slate-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API & Developer Resources */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">🔗</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">RESTful APIs</h4>
            <p className="text-slate-600">Comprehensive API documentation with SDKs and code samples</p>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">⚡</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">Webhook Support</h4>
            <p className="text-slate-600">Real-time event notifications for seamless data synchronization</p>
          </Card>
          
          <Card className="text-center p-8 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl">📚</div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-4">Developer Portal</h4>
            <p className="text-slate-600">Dedicated support and resources for technical integrations</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

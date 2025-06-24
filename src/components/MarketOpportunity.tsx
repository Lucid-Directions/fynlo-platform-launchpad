
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const MarketOpportunity = () => {
  const marketData = [
    { metric: "$240B", description: "Global Restaurant Technology Market", growth: "+12.4% CAGR" },
    { metric: "78%", description: "Restaurants Using Legacy Systems", growth: "Modernization Gap" },
    { metric: "2.9%", description: "Average Processing Fees", growth: "Industry Standard" },
    { metric: "43%", description: "Revenue Loss from Inefficiency", growth: "Operational Cost" }
  ];

  const painPoints = [
    {
      title: "High Processing Costs",
      description: "Traditional POS systems charge 2.9% processing fees, significantly impacting restaurant margins",
      impact: "2.4x Higher Than Fynlo"
    },
    {
      title: "Hardware Investment Burden",
      description: "Legacy systems require substantial upfront capital for hardware and ongoing maintenance",
      impact: "$15K-50K Per Location"
    },
    {
      title: "Limited Scalability",
      description: "Single-tenant architecture prevents efficient multi-location management and growth",
      impact: "Operational Complexity"
    },
    {
      title: "Poor Integration",
      description: "Siloed systems create data fragmentation and operational inefficiencies",
      impact: "43% Revenue Impact"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Market Analysis</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            The $240B Restaurant Technology 
            <span className="block text-blue-600">Market Opportunity</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A massive, underserved market with significant inefficiencies and technological gaps creating unprecedented opportunities for platform innovation.
          </p>
        </div>

        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {marketData.map((item, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-blue-600 mb-2">{item.metric}</div>
                <div className="text-slate-900 font-semibold mb-2">{item.description}</div>
                <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                  {item.growth}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pain Point Analysis */}
        <div>
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Critical Industry Pain Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold text-slate-900">{point.title}</h4>
                  <Badge variant="destructive" className="ml-4">
                    {point.impact}
                  </Badge>
                </div>
                <p className="text-slate-600 leading-relaxed">{point.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Trends */}
        <div className="mt-20 p-8 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Key Market Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">☁️</div>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Cloud Migration</h4>
              <p className="text-slate-600">85% of restaurants planning cloud adoption by 2025</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">📱</div>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Mobile Integration</h4>
              <p className="text-slate-600">67% increase in mobile payment adoption</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">📊</div>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Data Analytics</h4>
              <p className="text-slate-600">Platform-driven insights becoming essential</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

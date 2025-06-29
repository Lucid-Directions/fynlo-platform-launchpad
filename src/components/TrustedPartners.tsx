
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

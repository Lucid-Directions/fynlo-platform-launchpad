
import { Card, CardContent } from "@/components/ui/card";

export const MarketOpportunity = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Simple, clean section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Why businesses choose Fynlo
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From cafés to retail shops, service providers to market stalls – we make payments simple for every business.
          </p>
        </div>

        {/* Clean benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">💱</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lower fees</h3>
              <p className="text-slate-600">Keep more of what you earn with transparent, competitive pricing.</p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">📱</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">No hardware</h3>
              <p className="text-slate-600">Your phone or tablet is all you need. Set up in minutes, not days.</p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">🛡️</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Always secure</h3>
              <p className="text-slate-600">Bank-level security with 24/7 UK support for peace of mind.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

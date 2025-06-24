
import { Card, CardContent } from "@/components/ui/card";

export const MarketOpportunity = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Simple, clean section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Why restaurants choose Fynlo
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We understand the challenges of running a restaurant. That's why we built a system that just works.
          </p>
        </div>

        {/* Clean benefits grid - much simpler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">💷</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Save money</h3>
              <p className="text-slate-600">Lower processing fees and no hidden costs mean more profit for your business.</p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">⚡</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Save time</h3>
              <p className="text-slate-600">Streamlined operations mean you can serve more customers with less effort.</p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">🛡️</div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Stay secure</h3>
              <p className="text-slate-600">Bank-level security with 24/7 UK support keeps your business protected.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};


import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const MarketOpportunity = () => {
  return (
    <>
      {/* Business Investment Highlight */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-emerald-100 text-lg mb-2">Business Capital</div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Fynlo has invested £10 Million to empower UK SMB growth in 2024
              </h2>
              <p className="text-emerald-100 text-lg mb-8">
                Supporting small businesses with the technology and resources they need to thrive in today's digital economy.
              </p>
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2">£10M</div>
              <div className="text-emerald-100">Investment in UK businesses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Don't just take our word section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Don't just take our word for how we could help your business...
            </h2>
          </div>

          {/* Business Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">💱</div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Find out</h3>
                <p className="text-slate-600 text-sm">how much you could save compared to your current provider</p>
                <div className="mt-4">
                  <Badge variant="outline" className="text-xs">7 minutes</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">📱</div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Discover</h3>
                <p className="text-slate-600 text-sm">the payment solution that works best for your business</p>
                <div className="mt-4">
                  <Badge variant="outline" className="text-xs">3 minutes</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🛡️</div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Request</h3>
                <p className="text-slate-600 text-sm">information about our business solutions</p>
                <div className="mt-4">
                  <Badge variant="outline" className="text-xs">5 minutes</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">💬</div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Chat to us</h3>
                <p className="text-slate-600 text-sm">about your specific business requirements</p>
                <div className="mt-4">
                  <Badge variant="outline" className="text-xs">2 minutes</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Testimonial */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400">★</div>
                  ))}
                </div>
              </div>
              <blockquote className="text-xl text-slate-700 mb-6 max-w-3xl mx-auto italic">
                "What a difference this solution has made to our business! They provide incredible technology and it is a pleasure to work with their extremely knowledgeable and friendly team."
              </blockquote>
              <cite className="text-slate-600">
                <strong>Maria</strong> - Great Britain
              </cite>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

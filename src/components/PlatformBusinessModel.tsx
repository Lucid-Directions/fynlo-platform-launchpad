
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const PlatformBusinessModel = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Clean hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Built for every business
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Whether you're running a coffee shop, retail store, or service business, 
              Fynlo adapts to how you work.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              See how it works
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=800&q=80" 
              alt="Various businesses using payment solutions" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Simple business types showcase */}
        <div className="bg-slate-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Perfect for any business</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-4xl mb-4">☕</div>
              <h4 className="font-semibold text-slate-900 mb-2">Cafés & Food</h4>
              <p className="text-slate-600 text-sm">Quick service and takeaways</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-4xl mb-4">🛍️</div>
              <h4 className="font-semibold text-slate-900 mb-2">Retail</h4>
              <p className="text-slate-600 text-sm">Shops and boutiques</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-4xl mb-4">✂️</div>
              <h4 className="font-semibold text-slate-900 mb-2">Services</h4>
              <p className="text-slate-600 text-sm">Salons, repairs, and more</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg">
              <div className="text-4xl mb-4">🏪</div>
              <h4 className="font-semibold text-slate-900 mb-2">Markets</h4>
              <p className="text-slate-600 text-sm">Stalls and pop-ups</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const PlatformBusinessModel = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Clean hero section with real person */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Built by restaurant people, for restaurant people
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We know what it's like to run a busy restaurant. That's why Fynlo is designed 
              to handle the real challenges you face every day.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              See how it works
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
              alt="Restaurant team working together" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Simple success story */}
        <div className="bg-slate-50 rounded-2xl p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
                alt="Sarah, restaurant owner" 
                className="w-full h-auto rounded-xl"
              />
            </div>
            <div>
              <blockquote className="text-2xl text-slate-700 mb-6 italic">
                "Fynlo helped us increase our revenue by 30% in just 3 months. 
                The team actually understands restaurants."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-blue-600">SC</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Sarah Chen</div>
                  <div className="text-slate-600">The Spice Garden, London</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

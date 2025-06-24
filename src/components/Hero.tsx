
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="/placeholder.svg" 
          alt="Restaurant team working together" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Logo */}
        <div className="mb-12">
          <img 
            src="/placeholder.svg" 
            alt="Fynlo Logo" 
            className="h-12 w-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
              Trusted by 1,000+ restaurants across the UK
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Everything your restaurant needs to 
              <span className="text-blue-600"> succeed</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Join thousands of restaurant owners who trust Fynlo to run their business. 
              From taking orders to managing staff, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold">
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-slate-300 hover:bg-slate-50 px-8 py-4 text-lg font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </Button>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-200">
              <div>
                <div className="text-2xl font-bold text-slate-900 mb-1">£89</div>
                <div className="text-sm text-slate-600">per month, all inclusive</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 mb-1">24/7</div>
                <div className="text-sm text-slate-600">UK-based support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/placeholder.svg" 
                alt="Restaurant owner using Fynlo POS system" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Floating testimonial */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <p className="text-sm text-slate-600 mb-2">
                "Fynlo helped us increase our revenue by 30% in just 3 months."
              </p>
              <div className="flex items-center space-x-2">
                <img 
                  src="/placeholder.svg" 
                  alt="Sarah Chen" 
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Sarah Chen</div>
                  <div className="text-xs text-slate-500">The Spice Garden, London</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};


import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

export const Hero = () => {
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'block';
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/3 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-20">
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl mb-8">
            <img 
              src="/lovable-uploads/ae344ce5-1c9f-41c8-b990-94ddff083a5a.png" 
              alt="Fynlo Logo" 
              className="w-auto"
              style={{ height: '150px' }}
              onError={handleLogoError}
            />
            <div className="text-4xl font-bold text-white" style={{display: 'none'}}>Fynlo</div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Simple Payments.
            <span className="block text-blue-200">Real Results.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto mb-12">
            Transform your business with instant payment processing. 
            No hardware, no setup fees, no complications.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-lg font-semibold">Instant Setup</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-lg font-semibold">Bank-Level Security</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-lg font-semibold">24/7 Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 text-lg font-semibold shadow-xl">
              Get Your Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              See How It Works
            </Button>
          </div>

          {/* Simple Pricing */}
          <div className="mt-16 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-md mx-auto">
            <p className="text-blue-200 text-sm mb-2">Simple Pricing</p>
            <div className="text-4xl font-bold text-white mb-1">2.9%</div>
            <p className="text-blue-200 text-sm">per transaction • No monthly fees</p>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-20">
          <path d="M0,120 L0,60 Q300,0 600,60 T1200,60 L1200,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'block';
    }
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Clean background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
      
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-20">
        {/* Logo */}
        <div className="mb-16">
          <img 
            src="/lovable-uploads/ae344ce5-1c9f-41c8-b990-94ddff083a5a.png" 
            alt="Fynlo Logo" 
            className="w-auto"
            style={{ height: '75px' }}
            onError={handleLogoError}
          />
          <div className="text-2xl font-bold text-blue-600" style={{display: 'none'}}>Fynlo</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Your business. Your payments. Simplified.
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              The smart payment app that works for every business. No hardware needed – just download, set up, and start selling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </Button>
            </div>

            {/* Simple pricing highlight */}
            <div className="pt-8">
              <p className="text-slate-500 text-sm mb-2">Starting from</p>
              <div className="text-3xl font-bold text-slate-900">£29<span className="text-lg font-normal text-slate-500">/month</span></div>
              <p className="text-slate-500 text-sm">All inclusive • No setup fees</p>
            </div>
          </div>

          {/* Right Content - Better image for payment systems */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" 
                alt="Business owner using mobile payment system" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

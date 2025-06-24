
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Professional background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Industry credentials bar */}
        <div className="mb-8">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
            Trusted by restaurant groups across 12+ markets
          </Badge>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          The Next Generation
          <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Restaurant Platform
          </span>
        </h1>

        {/* Supporting headline */}
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Join industry leaders building scalable restaurant technology businesses with proven platform economics and enterprise-grade infrastructure
        </p>

        {/* Dual CTA approach */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Request Enterprise Demo
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
          >
            <Play className="mr-2 h-5 w-5" />
            View Platform Overview
          </Button>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">1.2%</div>
            <div className="text-slate-300">Processing Rate vs Industry 2.9%</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">$0</div>
            <div className="text-slate-300">Hardware Investment Required</div>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">$240B</div>
            <div className="text-slate-300">Restaurant Tech Market Size</div>
          </div>
        </div>
      </div>
    </section>
  );
};
